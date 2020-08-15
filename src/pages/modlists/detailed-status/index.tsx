import * as React from 'react';
import { useRouteNode } from 'react-router5';
import { observer } from 'mobx-react';

import RoutedLink from '../../../components/RoutedLink';

import { useStores } from '../../../hooks/use-stores';
import ErrorDisplay from '../../../components/ErrorDisplay';

import { Typography } from '@material-ui/core';
import { getDateString } from '../../../utils/other';

import VirtualizedList from './VirtualizedList';

const DetailedStatusPage = observer(() => {
  const { machineURL } = useRouteNode('modlists.status.detailed').route.params;
  if (!machineURL) return <ErrorDisplay message="Back URL!" />;

  const { detailedStatusStore } = useStores();
  if (detailedStatusStore.shouldFetch(machineURL)) {
    detailedStatusStore.fetchDetailedStatus(machineURL);
  }
  if (detailedStatusStore.isLoading.get(machineURL)) {
    return (
      <React.Fragment>Loading Detailed Status for {machineURL}</React.Fragment>
    );
  }
  if (detailedStatusStore.axiosError) {
    return <ErrorDisplay axiosError={detailedStatusStore.axiosError} />;
  }

  const status = detailedStatusStore.detailedStatusMap.get(machineURL);
  if (status === undefined) {
    return (
      <ErrorDisplay message="Fetched status without an error but is still undefined!" />
    );
  }

  const { Name, Checked, HasFailures, Archives } = status;
  const date = new Date(Checked);
  const dateString = getDateString(date);

  const failing = Archives.filter((a) => a.IsFailing);
  const passing = Archives.filter((a) => !a.IsFailing);

  return (
    <React.Fragment>
      <RoutedLink routeName="modlists.status">Back to the Dashboard</RoutedLink>
      <React.Fragment>
        <Typography variant="h4">{Name}</Typography>
        <Typography variant="h6" color={HasFailures ? 'error' : 'secondary'}>
          Status: {HasFailures ? 'Failing' : 'Working'}
        </Typography>
        <Typography variant="h6">Last Checked: {dateString}</Typography>
        {HasFailures ? (
          <React.Fragment>
            <Typography variant="h6" style={{ marginBottom: '8px' }}>
              Failing:{' '}
            </Typography>
            <VirtualizedList items={failing} />
          </React.Fragment>
        ) : (
          <React.Fragment />
        )}
        <React.Fragment>
          <Typography variant="h6" style={{ margin: '8px 0' }}>
            Passing:{' '}
          </Typography>
          <VirtualizedList items={passing} />
        </React.Fragment>
      </React.Fragment>
    </React.Fragment>
  );
});

export default DetailedStatusPage;
