/* eslint-disable node/no-extraneous-import */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'redux-zero/react';

import { Box, Container, Typography, Button } from '@material-ui/core';

import actions from 'Src/store/actions.js';

import VirtualizedList from './VirtualizedList';

const mapToProps = ({ modlistStatus }) => ({ modlistStatus });

class StatusDashboard extends Component {
  componentDidMount() {
    if (this.props.modlistStatus.length === 0)
      this.props.loadModlistStatus(this.props.url.match.params.url);
  }

  render() {
    // const { url } = this.props.url.match.params;
    const { Name, Checked, Failed, Passed } = this.props.modlistStatus;
    const hasFailed = Failed !== undefined && Failed.$values.length !== 0;
    return (
      <Box m={2} style={{ padding: '16px 0' }}>
        <Button href="/status">Back to the Dashboard</Button>
        <Typography variant="h4">{Name}</Typography>
        <Container maxWidth="xl">
          <Typography variant="h6" color={hasFailed ? 'error' : 'secondary'}>
            Status: {hasFailed ? 'Failing' : 'Working'}
          </Typography>
          <Typography variant="h6">Last Checked: {Checked}</Typography>
          {hasFailed ? (
            <div>
              <Typography variant="h6" style={{ marginBottom: '8px' }}>
                Failing:{' '}
              </Typography>
              <VirtualizedList list={Failed.$values} />
            </div>
          ) : (
            <div></div>
          )}
          {Passed !== undefined ? (
            <div>
              <Typography variant="h6" style={{ margin: '8px 0' }}>
                Passing:{' '}
              </Typography>
              <VirtualizedList list={Passed.$values} />
            </div>
          ) : (
            <div></div>
          )}
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
