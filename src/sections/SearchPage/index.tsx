import * as React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import underscore from 'underscore';
import { ApplicationState } from '../../store';
import * as StatusStore from '../../store/ModlistStatusStore';
import * as DetailedStatusStore from '../../store/DetailedStatusStore';
import { ModlistStatus } from '../../utils/modlist';
import { ReactAxiosComponent, AxiosError } from '../../utils/axios';
import {
  State,
  Archive,
  HTTPDownloaderState,
  MetaState,
  NexusDownloaderState,
  GoogleDriveDownloader,
} from '../../utils/types';
import _ from 'underscore';

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

import { FakeArchiveList } from '../../__mocks__/archives';
import { toFileSizeString } from '../../utils/other';

type PropsFromRedux = ConnectedProps<typeof connector>;

type SearchPageProps = PropsFromRedux &
  typeof StatusStore.actionCreator &
  typeof DetailedStatusStore.actionCreator &
  RouteComponentProps<{ url: string }>;

interface SearchPageState {
  currentStatus?: ModlistStatus | undefined;
  archives?: Archive[] | undefined;
  showNSFW: boolean;
  showImages: boolean;
}

export class SearchPage extends ReactAxiosComponent<
  SearchPageProps,
  SearchPageState
> {
  constructor(props: SearchPageProps) {
    super(props);
    this.state = {
      currentStatus: undefined,
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

  ensureDataFetched(): void {
    if (this.props.statusList) {
      if (this.props.statusList.length === 0) this.props.requestStatusList();
    }

    if (
      !this.props.status &&
      this.props.statusList &&
      this.props.statusList.length >= 0
    ) {
      const findStatus = underscore.find(this.props.statusList, (current) => {
        return current.machineURL === this.props.match.params.url;
      });

      if (findStatus === undefined) return;

      this.setState({
        ...this.state,
        currentStatus: findStatus,
      });

      this.props.requestDetailedStatus(
        `https://build.wabbajack.org/lists/status/${findStatus.machineURL}.json`
      );
    }

    if (this.props.status && !this.state.archives) {
      const archives = _.map(this.props.status.Archives, (a) => {
        return a.Archive;
      });
      this.setState({
        ...this.state,
        archives: archives,
      });
    }
  }

  public showError() {
    if (!this.props.errorModlists && !this.props.errorStatus) return;

    let error: AxiosError;
    if (this.props.errorModlists) {
      error = this.props.errorModlists;
      return (
        <React.Fragment>
          <Typography variant="h6">Error</Typography>
          <Typography variant="body1">
            An error occurred while loading the modlists. Please report this on
            the <Link href={process.env.REACT_APP_DISCORD_LINK}>Discord</Link>{' '}
            server.
          </Typography>
          <Typography variant="subtitle1">Message: {error.message}</Typography>
        </React.Fragment>
      );
    } else if (this.props.errorStatus) {
      error = this.props.errorStatus;
      return (
        <React.Fragment>
          <Typography variant="h6">Error</Typography>
          <Typography variant="body1">
            An error occurred while loading the status. Please report this on
            the <Link href={process.env.REACT_APP_DISCORD_LINK}>Discord</Link>{' '}
            server.
          </Typography>
          <Typography variant="subtitle1">Message: {error.message}</Typography>
        </React.Fragment>
      );
    }
  }

  public showLoading() {
    if (this.props.isLoadingModlists) {
      return (
        <React.Fragment>
          <Typography variant="h6">Loading status list...</Typography>
        </React.Fragment>
      );
    }

    if (this.props.isLoadingStatus) {
      return (
        <React.Fragment>
          <Typography variant="h6">Loading status...</Typography>
        </React.Fragment>
      );
    }
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
        const gDriveState = data.State as GoogleDriveDownloader;
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

  showContent() {
    if (this.props.errorStatus || this.props.errorModlists) return;
    if (this.props.isLoadingStatus || this.props.isLoadingModlists) return;
    if (this.props.statusList?.length === 0) return;

    if (!this.state.currentStatus) {
      return (
        <React.Fragment>
          <Typography variant="h6">Error</Typography>
          <Typography variant="body1">
            Unable to find modlist with this URL: {this.props.match.params.url}
          </Typography>
        </React.Fragment>
      );
    }

    if (!this.props.status) {
      return (
        <React.Fragment>
          <Typography variant="h6">Error</Typography>
          <Typography variant="body1">
            Internal error please report this on the{' '}
            <Link href={process.env.REACT_APP_DISCORD_LINK}>Discord</Link>{' '}
            server.
          </Typography>
        </React.Fragment>
      );
    }

    if (!this.state.archives) return;

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
          data={this.state.archives}
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
          title="Archive Search"
        />
      </React.Fragment>
    );
  }

  render() {
    return (
      <Box m={2}>
        {this.showLoading()}
        {this.showError()}
        {this.showContent()}
      </Box>
    );
  }
}

const connector = connect(
  (state: ApplicationState) => {
    const { modlistStatusList, modlistStatus } = state;
    return {
      isLoadingModlists: modlistStatusList?.isLoading,
      statusList: modlistStatusList?.statusList,
      errorModlists: modlistStatusList?.error,

      isLoadingStatus: modlistStatus?.isLoading,
      status: modlistStatus?.status,
      errorStatus: modlistStatus?.error,
    };
  },
  { ...StatusStore.actionCreator, ...DetailedStatusStore.actionCreator }
);

export default connector(SearchPage as any);
