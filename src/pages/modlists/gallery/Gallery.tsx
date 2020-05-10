import * as React from 'react';
import { v4 as uuidv4 } from 'uuid';
import _ from 'underscore';

import { getGameName } from 'utils/games';
import { ModlistMetaData } from 'types/modlist';

import GalleryCard, { SkeletonCard } from './GalleryCard';

import {
  Grid,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  Typography,
  Link,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';

interface ModlistGalleryProps {
  modlists: ModlistMetaData[];
  isLoading: boolean;
}

interface ModlistsGalleryState {
  selectedGame: string;
  showNSFW: boolean;
}

class ModlistGallery extends React.PureComponent<
  ModlistGalleryProps,
  ModlistsGalleryState
> {
  constructor(props: ModlistGalleryProps) {
    super(props);

    this.state = {
      selectedGame: '',
      showNSFW: false,
    };
  }

  private onChange(
    event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>
  ): void {
    this.setState({
      ...this.state,
      selectedGame: event.target.value as string,
    });
  }

  private onCheck(): void {
    this.setState({
      ...this.state,
      showNSFW: !this.state.showNSFW,
    });
  }

  private skeletons = (count: number): JSX.Element[] => {
    const list = [];
    for (let i = 0; i < count; i++) {
      list.push(
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} key={uuidv4()}>
          <SkeletonCard />
        </Grid>
      );
    }
    return list;
  };

  render(): JSX.Element {
    const gamesList: Array<string> = [];

    if (this.props.modlists) {
      _.map(this.props.modlists, (modlist) => {
        if (!gamesList.includes(modlist.game)) gamesList.push(modlist.game);
        gamesList.sort();
      });
    }
    return (
      <React.Fragment>
        <Typography variant="h4">Gallery</Typography>
        <Grid container alignItems="flex-start" justify="flex-end">
          <Grid item>
            <FormControlLabel
              control={
                <Checkbox
                  name="enableNSFW"
                  checked={this.state.showNSFW}
                  onChange={this.onCheck.bind(this)}
                />
              }
              label="Show NSFW"
            />
          </Grid>
          <Grid item>
            <FormControl>
              <Select
                autoWidth
                displayEmpty
                value={this.state.selectedGame}
                onChange={this.onChange.bind(this)}
              >
                <MenuItem value="">All</MenuItem>
                {_.map(gamesList, (game) => {
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
        <Grid
          container
          direction="row"
          spacing={4}
          style={{ marginTop: '16px' }}
        >
          {this.props.isLoading
            ? this.skeletons(5)
            : _.filter(this.props.modlists, (modlist) => {
                if (modlist.tags.includes('hidden')) return false;
                if (!this.state.showNSFW && modlist.nsfw) return false;
                if (
                  this.state.selectedGame !== '' &&
                  modlist.game !== this.state.selectedGame
                )
                  return false;

                return true;
              }).map((modlist) => {
                return (
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={6}
                    lg={6}
                    xl={6}
                    key={uuidv4()}
                  >
                    <GalleryCard modlist={modlist} />
                  </Grid>
                );
              })}
        </Grid>
        <Typography variant="h6" style={{ marginTop: '16px' }}>
          Want your Modlist to appear in this Gallery?
        </Typography>
        <Typography variant="body1">
          Simply head over to our{' '}
          <Link href={process.env.REACT_APP_DISCORD_LINK}>Discord</Link> server
          and go to the <b>#modlist-development-info</b> channel to fill out the
          submission.
        </Typography>
      </React.Fragment>
    );
  }
}

export default ModlistGallery;
