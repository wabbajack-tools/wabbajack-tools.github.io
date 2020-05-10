import * as React from 'react';
import { v4 as uuidv4 } from 'uuid';
import _ from 'underscore';

import { ModlistStatus } from 'types/modlist';

import DashboardCard from './DashboardCard';

import { Grid, Typography } from '@material-ui/core';

interface DashboardProps {
  statusList: ModlistStatus[];
}

const Dashboard: React.FC<DashboardProps> = (props) => {
  const failed: ModlistStatus[] = _.chain(props.statusList)
    .filter((status) => status.has_failures)
    .sortBy((status) => status.name)
    .value();

  const success: ModlistStatus[] = _.chain(props.statusList)
    .filter((status) => !status.has_failures)
    .sortBy((status) => status.name)
    .value();

  return (
    <React.Fragment>
      <Typography variant="h6">Failing Modlists: {failed.length}</Typography>
      <Typography variant="h6">Working Modlists: {success.length}</Typography>
      <Grid container direction="row" spacing={3}>
        {_.map(failed, (status: ModlistStatus) => {
          return (
            <Grid item key={uuidv4()} xs={12} sm={6} md={4} lg={4} xl={4}>
              <DashboardCard status={status} />
            </Grid>
          );
        })}
        {_.map(success, (status: ModlistStatus) => {
          return (
            <Grid item key={uuidv4()} xs={12} sm={6} md={4} lg={4} xl={4}>
              <DashboardCard status={status} />
            </Grid>
          );
        })}
      </Grid>
    </React.Fragment>
  );
};

export default Dashboard;
