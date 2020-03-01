/* eslint-disable node/no-extraneous-import */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'redux-zero/react';
import underscore from 'underscore';

import { Box, Container, Typography, Button } from '@material-ui/core';

import actions from 'Src/store/actions.js';

import StatusList from './StatusList';

const mapToProps = ({ modlistStatus }) => ({ modlistStatus });

class StatusDashboard extends Component {
  componentDidMount() {
    if (this.props.modlistStatus.length === 0) {
      this.props.loadModlistStatus(this.props.url.match.params.url);
    }
  }

  render() {
    // const { url } = this.props.url.match.params;
    const { Name, Checked, HasFailures, Archives } = this.props.modlistStatus;

    const date = new Date(Checked);
    let failing = [];
    let passing = [];
    if (this.props.modlistStatus.length !== 0 && Archives !== undefined) {
      failing = underscore.filter(Archives.$values, a => {
        return a.IsFailing;
      });
      passing = underscore.filter(Archives.$values, a => {
        return !a.IsFailing;
      });
    }

    return (
      <Box m={2} style={{ padding: '16px 0' }}>
        <Button href="/status">Back to the Dashboard</Button>
        <Typography variant="h4">{Name}</Typography>
        <Container maxWidth="xl">
          <Typography variant="h6" color={HasFailures ? 'error' : 'secondary'}>
            Status: {HasFailures ? 'Failing' : 'Working'}
          </Typography>
          <Typography variant="h6">
            Last Checked: {date.toDateString()}
          </Typography>
          {HasFailures ? (
            <div>
              <Typography variant="h6" style={{ marginBottom: '8px' }}>
                Failing:{' '}
              </Typography>
              <StatusList list={failing} />
            </div>
          ) : (
            <div></div>
          )}
          <div>
            <Typography variant="h6" style={{ margin: '8px 0' }}>
              Passing:{' '}
            </Typography>
            <StatusList list={passing} />
          </div>
        </Container>
      </Box>
    );
  }
}

StatusDashboard.propTypes = {
  loadModlistStatus: PropTypes.func.isRequired,
  url: PropTypes.object.isRequired,
  modlistStatus: PropTypes.any.isRequired
};

export default connect(mapToProps, actions)(StatusDashboard);
