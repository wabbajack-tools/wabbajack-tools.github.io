import * as React from 'react';
import { useRouteNode } from 'react-router5';
import { useLocalStore, Observer, useObserver } from 'mobx-react';

import RoutedLink from '../../../components/RoutedLink';

import { useStores } from '../../../hooks/use-stores';
import ErrorDisplay from '../../../components/ErrorDisplay';

import {
  Typography,
  FormControlLabel,
  Grid,
  Checkbox,
  Tooltip,
} from '@material-ui/core';

import MaterialTable, { MTableToolbar } from 'material-table';

import { toFileSizeString } from '../../../utils/other';
import {
  tryGetMetaState,
  tryGetName,
  tryGetURL,
} from '../../../utils/archiveUtils';
import { IArchive } from '../../../types/archives';

import ArchiveTable from './ArchiveTable';

const ModlistSearchPage: React.FC = () => {
  const { machineURL } = useRouteNode('modlists.status.detailed').route.params;
  const { detailedStatusStore } = useStores();

  const urlError = useObserver(() => {
    if (!machineURL) return <ErrorDisplay message="Back URL!" />;
    return undefined;
  });

  const loadingDetailedStatus = useObserver(() => {
    if (urlError !== undefined) return undefined;
    if (detailedStatusStore.shouldFetch(machineURL)) {
      detailedStatusStore.fetchDetailedStatus(machineURL);
    }

    if (detailedStatusStore.isLoading.get(machineURL)) {
      return <Typography>Loading Detailed Status for {machineURL}</Typography>;
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

    return undefined;
  });

  const status = detailedStatusStore.detailedStatusMap.get(machineURL);

  const content = useObserver(() => {
    if (status === undefined) return undefined;
    const archives = status.Archives.map((a) => a.Archive);
    const title = `Archive Search for ${status.Name}`;

    return <ArchiveTable archives={archives} title={title} />;
  });

  return (
    <React.Fragment>
      <RoutedLink routeName="modlists.gallery">Back to the Gallery</RoutedLink>
      {urlError}
      {loadingDetailedStatus}
      {content}
    </React.Fragment>
  );
};

export default ModlistSearchPage;
