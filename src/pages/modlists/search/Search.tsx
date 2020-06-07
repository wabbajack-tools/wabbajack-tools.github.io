import * as React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { v4 as uuidv4 } from 'uuid';
import _ from 'underscore';
import Markdown from 'markdown-to-jsx';

import { ApplicationState } from 'store';
import * as DetailedStatusStore from 'store/DetailedStatusStore';

import { getGameName } from 'utils/games';
import { ModlistMetaData, ModlistStatus } from 'types/modlist';
import {
  State,
  Archive,
  HTTPDownloaderState,
  MetaState,
  NexusDownloaderState,
  GoogleDriveDownloaderState,
} from 'types/archive';
import options from 'utils/markdown.config';

import { ReactAxiosComponent } from 'types/axios';
import { Loading, Error, DataError } from 'components/Fetching';
import MaterialLink from 'components/MaterialLink';

import { toFileSizeString } from 'utils/other';

import {
  Box,
  Typography,
  Link,
  Container,
  FormControlLabel,
  Grid,
  Checkbox,
} from '@material-ui/core';

import MaterialTable, { MTableToolbar } from 'material-table';

type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props {
  modlists: ModlistMetaData[];
}

type ModlistSearchProps = Props &
  typeof DetailedStatusStore.actionCreator &
  DetailedStatusStore.ModlistStatusState &
  PropsFromRedux &
  RouteComponentProps<{ url: string }>;

interface ModlistsSearchState {
  archives?: Archive[] | undefined;
  showNSFW: boolean;
  showImages: boolean;
}

class ModlistSearch extends ReactAxiosComponent<
  ModlistSearchProps,
  ModlistsSearchState
> {
  constructor(props: ModlistSearchProps) {
    super(props);

    this.state = {
      showNSFW: false,
      showImages: true,
    };
  }

  private onCheckNSFW() {
    this.setState({
      ...this.state,
      showNSFW: !this.state.showNSFW,
    });
  }

  private onCheckImages() {
    this.setState({
      ...this.state,
      showImages: !this.state.showImages,
    });
  }

  public renderState(state: State | undefined) {
    if (!state) return;
    return state.$type.replace(', Wabbajack.Lib', '');
  }

  public onClick = (data: Archive) => {
    const type = data.State.$type.replace(', Wabbajack.Lib', '');
    if (type === 'LoversLabDownloader' || type === 'VectorPlexusDownloader') {
      const metaState = data.State as MetaState;
      if (metaState.URL) window.open(metaState.URL, 'blank');
      return;
    }

    if (type === 'HttpDownloader' || type === 'MegaDownloader') {
      const httpState = data.State as HTTPDownloaderState;
      window.open(httpState.Url, '_blank');
      return;
    }

    switch (type) {
      case 'NexusDownloader':
        const nexusState = data.State as NexusDownloaderState;
        window.open(
          `https://www.nexusmods.com/${nexusState.GameName.toLowerCase()}/mods/${
            nexusState.ModID
          }/`
        );
        return;
      case 'GoogleDriveDownloader':
        const gDriveState = data.State as GoogleDriveDownloaderState;
        window.open(
          `https://drive.google.com/uc?id=${gDriveState.Id}`,
          '_blank'
        );
    }
  };

  public disabled(state: State) {
    const type = state.$type.replace(', Wabbajack.Lib', '');
    if (type === 'LoversLabDownloader' || type === 'VectorPlexusDownloader') {
      const metaState = state as MetaState;
      return metaState.URL === undefined;
    }

    if (
      type === 'MegaDownloader' ||
      type === 'HttpDownloader' ||
      type === 'GoogleDriveDownloader' ||
      type === 'NexusDownloader'
    )
      return false;

    return true;
  }

  public disabledDetailPanel(rowData: Archive) {
    const type = rowData.State.$type.replace(', Wabbajack.Lib', '');
    const metaStates = [
      'LoversLabDownloader',
      'NexusDownloader',
      'VectorPlexusDownloader',
    ];
    return !metaStates.includes(type);
  }

  public renderDetailPanel = (rowData: Archive) => {
    const metaState = rowData.State as MetaState;
    return (
      <Container>
        <Typography variant="h6">
          {metaState.Name} by {metaState.Author}
        </Typography>
        {metaState.Version ? (
          <Typography variant="subtitle1">
            Version: {metaState.Version}
          </Typography>
        ) : (
          <React.Fragment />
        )}
        {metaState.Description ? (
          <Typography variant="body1">{metaState.Description}</Typography>
        ) : (
          <React.Fragment />
        )}

        {metaState.ImageURL && this.state.showImages ? (
          <img
            style={{ width: '100%' }}
            src={metaState.ImageURL}
            alt={metaState.Name}
          />
        ) : (
          <React.Fragment />
        )}
      </Container>
    );
  };

  ensureDataFetched(): void {
    this.props.requestDetailedStatus(this.props.match.params.url);

    if (!this.props.statusMap) return;

    if (!this.props.statusMap.has(this.props.match.params.url)) return;

    const status = this.props.statusMap.get(this.props.match.params.url);

    if (!status) return;

    if (this.state.archives) return;

    const archives = _.map(status.Archives, (a) => {
      return a.Archive;
    });

    this.setState({
      ...this.state,
      archives: archives,
    });
  }

  showError(): JSX.Element | undefined {
    if (this.props.isLoading) return;
    if (!this.props.error) return;
    return <Error error={this.props.error} />;
  }

  showLoading(): JSX.Element | undefined {
    if (this.props.error) return;
    if (!this.props.isLoading) return;
    return <Loading message="Loading Modlist Status" />;
  }

  showContent(): JSX.Element | undefined {
    if (this.props.error) return;
    if (this.props.isLoading) return;

    if (!this.props.modlists) return <DataError />;
    if (this.props.modlists.length === 0) return <DataError />;

    if (!this.props.statusMap) return <DataError />;

    if (!this.props.statusMap.has(this.props.match.params.url))
      return <DataError />;

    const status = this.props.statusMap.get(this.props.match.params.url);

    if (!status) return <DataError />;

    return (
      <React.Fragment>
        <MaterialTable
          components={{
            Toolbar: (props) => (
              <div style={{ backgroundColor: '#1F1B24' }}>
                <MTableToolbar {...props} />
                <Grid container alignItems="flex-start" justify="flex-end">
                  <Grid item>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="enableNSFW"
                          checked={this.state.showNSFW}
                          onChange={this.onCheckNSFW.bind(this)}
                        />
                      }
                      label="Show NSFW"
                    />
                  </Grid>
                  <Grid item>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="enableImages"
                          checked={this.state.showImages}
                          onChange={this.onCheckImages.bind(this)}
                        />
                      }
                      label="Show Images"
                    />
                  </Grid>
                </Grid>
              </div>
            ),
          }}
          options={{
            sorting: true,
            headerStyle: {
              backgroundColor: '#242424',
            },
          }}
          columns={[
            { title: 'Name', field: 'Name', defaultSort: 'asc' },
            {
              title: 'Size',
              field: 'Size',
              render: (rowData) => toFileSizeString(rowData.Size),
            },
            { title: 'Hash', field: 'Hash' },
            {
              title: 'State',
              field: 'State',
              customSort: (a: Archive, b: Archive) =>
                a.State.$type.length - b.State.$type.length,
              render: (rowData) => this.renderState(rowData.State),
            },
          ]}
          //data={FakeArchiveList(100)}
          data={this.state.archives!}
          actions={[
            (rowData) => ({
              icon: 'link',
              tooltip: 'Visit',
              onClick: () => this.onClick(rowData),
              disabled: this.disabled(rowData.State),
            }),
          ]}
          detailPanel={[
            (rowData) => ({
              tooltip: 'Show Metadata',
              render: (rowData) => this.renderDetailPanel(rowData),
              disabled: this.disabledDetailPanel(rowData),
            }),
          ]}
          title={`Archive Search for ${status.Name}`}
        />
      </React.Fragment>
    );

    return;
  }

  render(): JSX.Element {
    return (
      <React.Fragment>
        <MaterialLink href="/modlists/gallery">
          Back to the Gallery
        </MaterialLink>
        {this.showLoading()}
        {this.showError()}
        {this.showContent()}
      </React.Fragment>
    );
  }
}
const connector = connect(
  (state: ApplicationState, ownProps: Props) => ({
    ...state.modlistStatus,
    ...ownProps,
  }),
  DetailedStatusStore.actionCreator
);

export default connector(ModlistSearch as any);
