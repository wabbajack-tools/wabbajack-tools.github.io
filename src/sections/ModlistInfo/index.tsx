import * as React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { v4 as uuidv4 } from 'uuid';
import underscore from 'underscore';
import Markdown from 'markdown-to-jsx';
import { ApplicationState } from '../../store';
import * as ModlistInfoStore from '../../store/ModlistInfoStore';
import * as ModlistsStore from '../../store/ModlistsStore';
import { getGameName } from '../../utils/games';
import { ModlistMetaData } from '../../utils/modlist';
import { ReactAxiosComponent, AxiosError } from '../../utils/axios';
import options from '../../utils/markdown.config';

import {
  Container,
  Grid,
  Typography,
  Button,
  Chip,
  Divider,
  Link,
} from '@material-ui/core';

type ModlistInfoProps = typeof ModlistInfoStore.actionCreator &
  typeof ModlistsStore.actionCreator &
  PropsFromRedux &
  RouteComponentProps<{ url: string }>;

interface IState {
  currentModlist?: ModlistMetaData | undefined;
}

type PropsFromRedux = ConnectedProps<typeof connector>;

export class ModlistInfo extends ReactAxiosComponent<ModlistInfoProps, IState> {
  constructor(props: ModlistInfoProps) {
    super(props);

    this.state = {
      currentModlist: undefined,
    };
  }

  public ensureDataFetched() {
    if (this.props.modlists) {
      if (this.props.modlists.length === 0) this.props.requestModlists();
    }

    if (
      !this.props.readme &&
      this.props.modlists &&
      this.props.modlists.length >= 0
    ) {
      const findModlist = underscore.find(this.props.modlists, (current) => {
        return current.links.machineURL === this.props.match.params.url;
      });

      if (findModlist === undefined) return;

      this.setState({
        ...this.state,
        currentModlist: findModlist,
      });

      this.props.requestModlistInfo(findModlist.links.readme);
    }
  }

  public showLoading() {
    if (this.props.isLoadingModlists) {
      return (
        <React.Fragment>
          <Typography variant="h6">Loading modlists...</Typography>
        </React.Fragment>
      );
    }

    if (this.props.isLoadingModlistInfo) {
      return (
        <React.Fragment>
          <Typography variant="h6">Loading modlist readme...</Typography>
        </React.Fragment>
      );
    }
  }

  public showError() {
    if (!this.props.errorModlists && !this.props.errorModlistInfo) return;

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
    } else if (this.props.errorModlistInfo) {
      error = this.props.errorModlistInfo;
      return (
        <React.Fragment>
          <Typography variant="h6">Error</Typography>
          <Typography variant="body1">
            An error occurred while loading the readme. Please report this on
            the <Link href={process.env.REACT_APP_DISCORD_LINK}>Discord</Link>{' '}
            server.
          </Typography>
          <Typography variant="subtitle1">Message: {error.message}</Typography>
        </React.Fragment>
      );
    }
  }

  public showContent() {
    if (this.props.errorModlists || this.props.errorModlistInfo) return;
    if (this.props.isLoadingModlists || this.props.isLoadingModlistInfo) return;
    if (this.props.modlists?.length === 0) return;

    if (!this.state.currentModlist) {
      return (
        <React.Fragment>
          <Typography variant="h6">Error</Typography>
          <Typography variant="body1">
            Unable to find modlist with this URL: {this.props.match.params.url}
          </Typography>
        </React.Fragment>
      );
    }

    if (!this.props.readme) {
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

    const {
      title,
      description,
      version,
      author,
      game,
      tags,
      links,
    } = this.state.currentModlist;
    const { image, download } = links;
    const readme = this.props.readme;

    return (
      <React.Fragment>
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
          {underscore.map(tags, (tag) => {
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
            `/modlist/${this.state.currentModlist.links.machineURL}`,
            `${this.state.currentModlist.links.readme}`
          )}
        >
          {readme}
        </Markdown>

        <Divider style={{ marginTop: '8px', marginBottom: '8px' }} />

        <Button href={download} color="secondary">
          Download
        </Button>
      </React.Fragment>
    );
  }

  public render() {
    return (
      <Container
        maxWidth="lg"
        style={{ paddingTop: '16px', paddingBottom: '16px' }}
      >
        <Button href="/gallery">Back to Gallery</Button>
        {this.showLoading()}
        {this.showError()}
        {this.showContent()}
      </Container>
    );
  }
}

const connector = connect(
  (state: ApplicationState) => {
    const { modlists, modlistInfo } = state;
    return {
      isLoadingModlists: modlists?.isLoading,
      modlists: modlists?.modlists,
      errorModlists: modlists?.error,

      isLoadingModlistInfo: modlistInfo?.isLoading,
      errorModlistInfo: modlistInfo?.error,
      readme: modlistInfo?.info,
    };
  },
  { ...ModlistInfoStore.actionCreator, ...ModlistsStore.actionCreator }
);

export default connector(ModlistInfo as any);
