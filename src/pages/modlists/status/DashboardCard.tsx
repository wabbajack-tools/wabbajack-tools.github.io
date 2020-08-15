import * as React from 'react';

import RoutedLink from '../../../components/RoutedLink';

import { IModlistSummary } from '../../../types/modlists';
import { getDateString } from '../../../utils/other';

import { Grid, Paper, Typography } from '@material-ui/core';

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

interface IDashboardCardProps {
  status: IModlistSummary;
}

const DashboardCard: React.FC<IDashboardCardProps> = (props) => {
  const { status } = props;
  const { name, checked, failed, passed, has_failures, machineURL } = status;
  const date = new Date(checked);
  const dateString = getDateString(date);

  return (
    <Paper style={{ marginTop: '8px', marginBottom: '8px' }}>
      <Grid style={{ padding: '8px' }}>
        <Grid container alignItems="center" style={{ paddingBottom: '8px' }}>
          {has_failures ? <span style={redDot} /> : <span style={greenDot} />}
          <RoutedLink
            routeName="modlists.status.detailed"
            routeParams={{ machineURL }}
            style={clickableTitle}
          >
            {name}
          </RoutedLink>
        </Grid>
        <Typography variant="body1">Passed: {passed}</Typography>
        <Typography variant="body1">Failed: {failed}</Typography>
        <Typography variant="body2">Last checked: {dateString}</Typography>
      </Grid>
    </Paper>
  );
};

export default DashboardCard;
