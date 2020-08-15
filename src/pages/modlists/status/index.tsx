import * as React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { observer } from 'mobx-react';

import { useStores } from '../../../hooks/use-stores';
import ErrorDisplay from '../../../components/ErrorDisplay';
import { IModlistSummary } from '../../../types/modlists';

import { Grid, Typography } from '@material-ui/core';

import DashboardCard from './DashboardCard';

const ModlistsStatusPage = observer(() => {
  const { modlistsStore, modlistsStatusStore } = useStores();
  const { modlists } = modlistsStore;
  if (modlistsStore.shouldFetch()) {
    modlistsStore.fetchModlists();
  }
  if (modlistsStore.isLoading.get('modlists')) {
    return <React.Fragment>Loading Modlists</React.Fragment>;
  }
  if (modlistsStore.axiosError) {
    return <ErrorDisplay axiosError={modlistsStore.axiosError} />;
  }
  if (modlists === undefined) {
    return (
      <ErrorDisplay message="Fetched modlists without an error but array is still undefined!" />
    );
  }

  const { statusList } = modlistsStatusStore;
  if (modlistsStatusStore.shouldFetch()) {
    modlistsStatusStore.fetchStatus();
  }
  if (modlistsStatusStore.isLoading.get('status')) {
    return <React.Fragment>Loading Status</React.Fragment>;
  }
  if (modlistsStatusStore.axiosError) {
    return <ErrorDisplay axiosError={modlistsStatusStore.axiosError} />;
  }
  if (statusList === undefined) {
    return (
      <ErrorDisplay message="Fetched modlists without an error but array is still undefined!" />
    );
  }

  const failed: IModlistSummary[] = statusList
    .filter((status) => status.has_failures)
    .sort((a, b) => a.name.localeCompare(b.name));

  const success: IModlistSummary[] = statusList
    .filter((status) => !status.has_failures)
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <React.Fragment>
      <Typography variant="h6">Failing Modlists: {failed.length}</Typography>
      <Typography variant="h6">Working Modlists: {success.length}</Typography>
      <Grid container direction="row" spacing={3}>
        {failed.map((status: IModlistSummary) => {
          return (
            <Grid item key={uuidv4()} xs={12} sm={6} md={4} lg={4} xl={4}>
              <DashboardCard status={status} />
            </Grid>
          );
        })}
        {success.map((status: IModlistSummary) => {
          return (
            <Grid item key={uuidv4()} xs={12} sm={6} md={4} lg={4} xl={4}>
              <DashboardCard status={status} />
            </Grid>
          );
        })}
      </Grid>
    </React.Fragment>
  );
});

export default ModlistsStatusPage;
