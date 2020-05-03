import * as React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import underscore from 'underscore';
import { ApplicationState } from '../../store';
import * as GalleryStore from '../../store/ModlistsStore';
import getGameName from '../../utils/games';
import { ReactAxiosComponent } from '../../utils/axios';

import {
  Container,
  Grid,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  Typography,
  Link,
} from '@material-ui/core';

import GalleryCard from './GalleryCard';

type PropsFromRedux = ConnectedProps<typeof connector>;

type ModlistGalleryProps = PropsFromRedux & typeof GalleryStore.actionCreator;

interface IState {
  selectedGame?: string;
}

export class ModlistGallery extends ReactAxiosComponent<
  ModlistGalleryProps,
  IState
> {
  constructor(props: ModlistGalleryProps) {
    super(props);

    this.state = {
      selectedGame: '',
    };
  }

  public ensureDataFetched() {
    this.props.requestModlists();
  }

  private onChange(
    event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>
  ) {
    this.setState({
      ...this.state,
      selectedGame: event.target.value as string,
    });
  }

  public showContent() {
    if (this.props.modlists && !this.props.error) {
      return (
        <Grid
          container
          direction="row"
          spacing={4}
          style={{ marginTop: '16px' }}
        >
          {underscore.map(this.props.modlists, (modlist) => {
            if (
              (modlist !== undefined && this.state.selectedGame === '') ||
              this.state.selectedGame === modlist.game
            )
              return (
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} key={uuidv4()}>
                  <GalleryCard modlist={modlist} />
                </Grid>
              );
            return <div key={uuidv4()}></div>;
          })}
        </Grid>
      );
    }
  }

  public showLoading() {
    if (this.props.isLoading) {
      return (
        <React.Fragment>
          <Typography variant="h6">Loading modlists...</Typography>
        </React.Fragment>
      );
    }
  }

  public showError() {
    if (this.props.error) {
      const error = this.props.error;
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
    }
  }

  public render() {
    const gamesList: Array<string> = [];

    if (this.props.modlists) {
      underscore.map(this.props.modlists, (modlist) => {
        if (!gamesList.includes(modlist.game)) gamesList.push(modlist.game);
        gamesList.sort();
      });
    }

    return (
      <Container
        maxWidth="lg"
        style={{ paddingTop: '16px', paddingBottom: '16px' }}
      >
        <Typography variant="h4">Gallery</Typography>
        <Grid container alignItems="flex-start" justify="flex-end">
          <Grid item>
            <FormControl>
              <Select
                autoWidth
                displayEmpty
                value={this.state.selectedGame}
                onChange={this.onChange.bind(this)}
              >
                <MenuItem value="">All</MenuItem>
                {underscore.map(gamesList, (game) => {
                  return (
                    <MenuItem value={game} key={uuidv4()}>
                      {getGameName(game)}
                    </MenuItem>
                  );
                })}
              </Select>
              <FormHelperText>Filter by game</FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
        {this.showLoading()}
        {this.showError()}
        {this.showContent()}
        <Typography variant="h6" style={{ marginTop: '16px' }}>
          Want your Modlist to appear in this Gallery?
        </Typography>
        <Typography variant="body1">
          Simply head over to our{' '}
          <Link href={process.env.REACT_APP_DISCORD_LINK}>Discord</Link> server
          and go to the <b>#modlist-development-info</b> channel to fill out the
          submission.
        </Typography>
      </Container>
    );
  }
}

const connector = connect(
  (state: ApplicationState) => state.modlists,
  GalleryStore.actionCreator
);

export default connector(ModlistGallery as any);
