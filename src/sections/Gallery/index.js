/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'redux-zero/react';
import uuid from 'uuid';
import underscore from 'underscore';

import {
  Container,
  Grid,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  Typography,
  Link
} from '@material-ui/core';

import config from 'Config';

import GalleryCard from 'Components/GalleryCard';

import actions from 'Src/store/actions';
import getGameName from 'Utils/games';

const mapToProps = ({ modlists, selectedGame }) => ({ modlists, selectedGame });

class Gallery extends Component {
  componentDidMount() {
    if (this.props.modlists.length === 0) this.props.loadModlists();
  }

  render() {
    const { modlists, selectedGame } = this.props;
    const gamesList = [];
    underscore.map(modlists, modlist => {
      if (!gamesList.includes(modlist.game)) gamesList.push(modlist.game);
      gamesList.sort();
    });
    const filterByGame = event => {
      this.props.filterGame(event.target.value);
    };
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
                value={selectedGame}
                onChange={filterByGame}
                inputProps={{ name: 'game', id: 'selected-game' }}
              >
                <MenuItem value="">All</MenuItem>
                {underscore.map(gamesList, game => {
                  return (
                    <MenuItem value={game} key={uuid.v4()}>
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
          {underscore.map(modlists, modlist => {
            if (
              (modlist !== undefined && selectedGame === '') ||
              selectedGame === modlist.game
            )
              return (
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} key={uuid.v4()}>
                  <GalleryCard modlist={modlist} />
                </Grid>
              );
            return <div key={uuid.v4()}></div>;
          })}
        </Grid>
        <Typography variant="h6" style={{ marginTop: '16px' }}>
          Want your Modlist to appear in this Gallery?
        </Typography>
        <Typography variant="body1">
          Simply head over to our <Link href={config.discord}>Discord</Link>{' '}
          server and go to the <b>#modlist-development-info</b> channel to fill
          out the submission.
        </Typography>
      </Container>
    );
  }
}

Gallery.propTypes = {
  loadModlists: PropTypes.func.isRequired,
  filterGame: PropTypes.func.isRequired,
  modlists: PropTypes.array.isRequired,
  selectedGame: PropTypes.any.isRequired
};

export default connect(mapToProps, actions)(Gallery);
