import * as React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useLocalStore, Observer, useObserver } from 'mobx-react';

import { useStores } from '../../../hooks/use-stores';
import ErrorDisplay from '../../../components/ErrorDisplay';
import { getGameName } from '../../../utils/games';

import {
  Container,
  Grid,
  FormControl,
  MenuItem,
  Select,
  Typography,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';

import { Game } from '../../../types/game';

import GalleryCard from './GalleryCard';

const ModlistsGalleryPage: React.FC = () => {
  const store = useLocalStore(() => ({ showNSFW: false, selectedGame: '' }));
  const { modlistsStore } = useStores();
  const { modlists } = modlistsStore;

  if (modlistsStore.shouldFetch()) {
    modlistsStore.fetchModlists();
  }

  const loading = useObserver(() => {
    if (modlistsStore.isLoading.get('modlists') === true) {
      return <Typography>Loading Modlists</Typography>;
    }

    if (modlistsStore.axiosError) {
      return <ErrorDisplay axiosError={modlistsStore.axiosError} />;
    }
    if (modlists === undefined) {
      return (
        <ErrorDisplay message="Fetched modlists without an error but array is still undefined!" />
      );
    }

    return undefined;
  });

  if (loading) return loading;

  const changeSelectedGame = (
    event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>
  ) => {
    if (event.target.value === undefined) return;
    store.selectedGame = event.target.value as string;
  };

  const gamesList: Array<{ gameID: Game; gameName: string }> = [];
  modlistsStore.modlists?.map((modlist) => {
    const foundGame = gamesList.find((game) => game.gameID === modlist.game);
    if (!foundGame) {
      const gameName = getGameName(modlist.game);
      if (gameName === 'UNKNOWN')
        console.log(`${modlist.game} was converted to ${gameName}!`);
      gamesList.push({
        gameID: modlist.game,
        gameName: getGameName(modlist.game),
      });
    }
  });

  return (
    <React.Fragment>
      <Container
        maxWidth="lg"
        style={{ paddingTop: '16px', paddingBottom: '16px' }}
      >
        <Typography variant="h4">Gallery</Typography>
        <Grid container alignItems="flex-start" justify="flex-end">
          <Grid item>
            <Observer>
              {() => (
                <FormControlLabel
                  control={
                    <Checkbox
                      name="enableNSFW"
                      checked={store.showNSFW}
                      onChange={() => (store.showNSFW = !store.showNSFW)}
                    />
                  }
                  label="Show NSFW"
                />
              )}
            </Observer>
          </Grid>
          <Grid item>
            <Observer>
              {() => (
                <FormControl>
                  <Select
                    autoWidth
                    displayEmpty
                    value={store.selectedGame}
                    onChange={(event) => changeSelectedGame(event)}
                  >
                    <MenuItem value="">All</MenuItem>
                    {gamesList.map((game) => {
                      return (
                        <MenuItem value={game.gameID} key={uuidv4()}>
                          {game.gameName}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              )}
            </Observer>
          </Grid>
          <Grid
            container
            direction="row"
            spacing={4}
            style={{ marginTop: '16px' }}
          >
            <Observer>
              {() => {
                if (modlists === undefined) return <React.Fragment />;
                return (
                  <React.Fragment>
                    {modlists
                      .filter((modlist) => {
                        //filter hidden modlists
                        if (modlist.tags.includes('hidden')) return false;
                        //filter NSFW modlists if we are not showing those
                        if (modlist.nsfw && !store.showNSFW) return false;
                        //filter modlists based on the selected game
                        if (
                          store.selectedGame !== '' &&
                          modlist.game !== store.selectedGame
                        )
                          return false;
                        return true;
                      })
                      .map((modlist) => {
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
                  </React.Fragment>
                );
              }}
            </Observer>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default ModlistsGalleryPage;
