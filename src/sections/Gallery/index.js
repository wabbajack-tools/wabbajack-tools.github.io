/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'redux-zero/react';
import uuid from 'uuid';
import underscore from 'underscore';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import config from 'Config';

import GalleryCard from 'Components/GalleryCard';

import actions from 'Src/store/actions';

const mapToProps = ({ modlists }) => ({ modlists });

class Gallery extends Component {
  componentDidMount() {
    if (this.props.modlists.length === 0) this.props.loadModlists();
  }

  render() {
    const { modlists } = this.props;
    return (
      <Container
        maxWidth="lg"
        style={{ paddingTop: '16px', paddingBottom: '16px' }}
      >
        <Typography variant="h4">Gallery</Typography>
        <Grid
          container
          direction="row"
          spacing={4}
          justify="space-around"
          alignItems="center"
          style={{ marginTop: '16px' }}
        >
          {underscore.map(modlists, modlist => {
            if (modlist !== undefined)
              return (
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} key={uuid.v4()}>
                  <GalleryCard modlist={modlist} />
                </Grid>
              );
            return <div></div>;
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
  modlists: PropTypes.array.isRequired
};

export default connect(mapToProps, actions)(Gallery);
