/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'redux-zero/react';
import underscore from 'underscore';
import uuid from 'uuid';

import { Box, Container, Grid, Typography } from '@material-ui/core';

import StatusCard from 'Components/StatusCard';

import actions from 'Src/store/actions.js';

const mapToProps = ({ status }) => ({ status });

class StatusDashboard extends Component {
  componentDidMount() {
    if (this.props.status.length === 0) this.props.loadStatus();
  }

  render() {
    const failed = underscore
      .chain(this.props.status)
      .filter(status => {
        return status.has_failures;
      })
      .sortBy(status => {
        return status.name;
      })
      .value();
    const success = underscore
      .chain(this.props.status)
      .filter(status => {
        return !status.has_failures;
      })
      .sortBy(status => {
        return status.name;
      })
      .value();
    return (
      <Box m={2}>
        <Typography variant="h4" style={{ paddingTop: '8px' }}>
          Modlist Status
        </Typography>
        <Container maxWidth="xl">
          <Typography variant="h6">
            Failing Modlists: {failed.length}
          </Typography>
          <Typography variant="h6">
            Working Modlists: {success.length}
          </Typography>
        </Container>
        <Grid container direction="row" spacing={3}>
          {underscore.map(failed, status => {
            return (
              <Grid item key={uuid.v4()} xs={12} sm={6} md={4} lg={4} xl={4}>
                <StatusCard status={status} />
              </Grid>
            );
          })}
          {underscore.map(success, status => {
            return (
              <Grid item key={uuid.v4()} xs={12} sm={6} md={4} lg={4} xl={4}>
                <StatusCard status={status} />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    );
  }
}

StatusDashboard.propTypes = {
  loadStatus: PropTypes.func.isRequired,
  status: PropTypes.any.isRequired
};

export default connect(mapToProps, actions)(StatusDashboard);
