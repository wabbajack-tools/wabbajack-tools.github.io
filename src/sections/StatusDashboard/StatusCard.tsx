import * as React from 'react';
import { ModlistStatus } from '../../utils/modlist';

import { Grid, Paper, Typography } from '@material-ui/core';

import { getDateString } from '../../utils/other';

const clickableTitle: React.CSSProperties = {
  color: 'white',
  textTransform: 'uppercase',
};

const dot: React.CSSProperties = {
  marginRight: '8px',
  height: '25px',
  width: '25px',
  borderRadius: '50%',
  display: 'inline-block',
};

const greenDot: React.CSSProperties = {
  ...dot,
  backgroundColor: 'green',
};

const redDot: React.CSSProperties = {
  ...dot,
  backgroundColor: 'red',
};

interface IStatusCardProps {
  status: ModlistStatus;
}

export const StatusCard: React.FC<IStatusCardProps> = (props) => {
  const { status } = props;
  const { name, checked, failed, passed, has_failures, machineURL } = status;
  const date = new Date(checked);
  const dateString = getDateString(date);

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
        <Typography variant="body2">Last checked: {dateString}</Typography>
      </Grid>
    </Paper>
  );
};

export default StatusCard;
