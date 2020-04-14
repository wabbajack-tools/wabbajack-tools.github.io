/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';

import { Grid, Paper, Typography } from '@material-ui/core';

const clickableTitle = {
  color: 'white',
  textTransform: 'uppercase'
};

const dot = {
  marginRight: '8px',
  height: '25px',
  width: '25px',
  borderRadius: '50%',
  display: 'inline-block'
};

const greenDot = {
  ...dot,
  backgroundColor: 'green'
};

const redDot = {
  ...dot,
  backgroundColor: 'red'
};

export default function StatusCard(props) {
  const { status } = props;
  const { name, checked, failed, passed, has_failures, machineURL } = status;
  const date = new Date(checked);
  return (
    <Paper style={{ marginTop: '8px', marginBottom: '8px' }}>
      <Grid style={{ padding: '8px' }}>
        {has_failures ? <span style={redDot} /> : <span style={greenDot} />}
        <Typography
          variant="h6"
          component="a"
          href={`/status/${machineURL}`}
          style={clickableTitle}
        >
          {name}
        </Typography>
        <Typography variant="body1">passed: {passed}</Typography>
        <Typography variant="body1">failed: {failed}</Typography>
        <Typography variant="body2">Last checked: {date}</Typography>
      </Grid>
    </Paper>
  );
}

StatusCard.propTypes = {
  status: PropTypes.any.isRequired
};
