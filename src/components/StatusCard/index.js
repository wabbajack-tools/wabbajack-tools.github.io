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
  const { Name, Checked, Failed, Passed, HasFailures } = status;
  return (
    <Paper style={{ marginTop: '8px', marginBottom: '8px' }}>
      <Grid style={{ padding: '8px' }}>
        {HasFailures ? <span style={redDot} /> : <span style={greenDot} />}
        <Typography
          variant="h6"
          component="a"
          href={`/status/${Name}`}
          style={clickableTitle}
        >
          {Name}
        </Typography>
        <Typography variant="body1">Passed: {Passed}</Typography>
        <Typography variant="body1">Failed: {Failed}</Typography>
        <Typography variant="body2">Last checked: {Checked}</Typography>
      </Grid>
    </Paper>
  );
}

StatusCard.propTypes = {
  status: PropTypes.any.isRequired
};
