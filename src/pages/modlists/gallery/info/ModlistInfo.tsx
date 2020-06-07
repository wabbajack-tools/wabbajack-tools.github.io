import * as React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { v4 as uuidv4 } from 'uuid';
import _ from 'underscore';
import Markdown from 'markdown-to-jsx';

import { ApplicationState } from 'store';
import * as ModlistInfoStore from 'store/ModlistInfoStore';

import { getGameName } from 'utils/games';
import { ModlistMetaData } from 'types/modlist';
import options from 'utils/markdown.config';

import { ReactAxiosComponent } from 'types/axios';
import { Loading, Error, DataError } from 'components/Fetching';
import MaterialLink from 'components/MaterialLink';

import { Grid, Typography, Button, Chip, Divider } from '@material-ui/core';

type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props {
  modlists: ModlistMetaData[];
}

type ModlistInfoProps = Props &
  typeof ModlistInfoStore.actionCreator &
  ModlistInfoStore.ModlistInfoState &
  PropsFromRedux &
  RouteComponentProps<{ url: string }>;

interface ModlistInfoState {
  currentModlist: ModlistMetaData | undefined;
}

export class ModlistInfo extends ReactAxiosComponent<
  ModlistInfoProps,
  ModlistInfoState
> {
  constructor(props: ModlistInfoProps) {
    super(props);

    this.state = {
      currentModlist: undefined,
    };
  }

  ensureDataFetched(): void {
    if (this.props.modlists && this.props.modlists.length >= 0) {
      const modlist = _.find(this.props.modlists, (current) => {
        return current.links.machineURL === this.props.match.params.url;
      });

      if (modlist === undefined) return;
      if (!modlist.links.readme.endsWith('.md')) return;

      this.setState({
        ...this.state,
        currentModlist: modlist,
      });

      this.props.requestModlistInfo(
        modlist.links.readme,
        modlist.links.machineURL
      );
    }
    return;
  }

  showError(): JSX.Element | undefined {
    if (this.props.isLoading) return;
    if (!this.props.error) return;

    if (
      this.props.error.extraData === this.state.currentModlist?.links.machineURL
    )
      return <Error error={this.props.error} />;
  }

  showLoading(): JSX.Element | undefined {
    if (this.props.error) {
      if (
        this.props.error.extraData ===
        this.state.currentModlist?.links.machineURL
      )
        return;
    }
    if (!this.props.isLoading) return;
    return <Loading message="Loading Modlist Readme" />;
  }

  showContent(): JSX.Element | undefined {
    if (this.props.error) {
      if (
        this.props.error.extraData ===
        this.state.currentModlist?.links.machineURL
      )
        return;
    }
    if (this.props.isLoading) return;

    if (!this.props.modlists) return <DataError />;
    if (this.props.modlists.length === 0) return <DataError />;

    if (!this.state.currentModlist) return <DataError />;
    if (!this.props.infoMap) return <DataError />;

    if (!this.props.infoMap.has(this.state.currentModlist.links.machineURL))
      return <DataError />;

    const {
      title,
      description,
      version,
      author,
      game,
      tags,
      links,
    } = this.state.currentModlist;
    const { image } = links;

    return (
      <React.Fragment>
        {' '}
        <Typography variant="h4" style={{ marginBottom: '8px' }}>
          {title}
        </Typography>
        <img
          alt={title}
          src={image}
          style={{ width: '100%', borderRadius: '1%' }}
        />
        <Typography variant="caption">
          Created by {author}, current version: {version}
        </Typography>
        <Grid container spacing={1}>
          <Grid item key={uuidv4()}>
            <Chip size="small" label={getGameName(game)} color="primary" />
          </Grid>
          {_.map(tags, (tag) => {
            return (
              <Grid item key={uuidv4()}>
                <Chip size="small" label={tag} color="primary" />
              </Grid>
            );
          })}
        </Grid>
        <Divider style={{ marginTop: '8px', marginBottom: '8px' }} />
        <Typography variant="subtitle2">{description}</Typography>
        <Divider style={{ marginTop: '8px', marginBottom: '8px' }} />
        <Markdown
          options={options(
            `/modlists/gallery/${this.state.currentModlist.links.machineURL}`,
            `${this.state.currentModlist.links.readme}`
          )}
        >
          {this.props.infoMap.get(this.state.currentModlist.links.machineURL)}
        </Markdown>
        <Divider style={{ marginTop: '8px', marginBottom: '8px' }} />
        {/*<Button href={download} color="secondary">
          Download
          </Button>*/}
      </React.Fragment>
    );
  }

  render(): JSX.Element {
    return (
      <React.Fragment>
        <MaterialLink href="/modlists/gallery">Back to Gallery</MaterialLink>
        {this.showLoading()}
        {this.showError()}
        {this.showContent()}
      </React.Fragment>
    );
  }
}

const connector = connect(
  (state: ApplicationState, ownProps: Props) => ({
    ...state.modlistInfo,
    ...ownProps,
  }),
  ModlistInfoStore.actionCreator
);

export default connector(ModlistInfo as any);
