import * as React from 'react';
import { useObserver, useLocalStore } from 'mobx-react';

import RoutedLink from '../../../components/RoutedLink';

import { useStores } from '../../../hooks/use-stores';
import ErrorDisplay from '../../../components/ErrorDisplay';

import { Typography } from '@material-ui/core';

import ModlistTable from '../../../components/ModlistTable';
import { notUndefined } from '../../../utils/other';
import { IDetailedStatus, IModlistMetadata } from '../../../types/modlists';
import { IArchive } from '../../../types/archives';

const ArchiveSearchPage: React.FC = () => {
  const { modlistsStore, detailedStatusStore } = useStores();
  const store = useLocalStore(() => {
    return {
      currentIndex: -1,
      length: -1,
    };
  });

  const loadingModlists = useObserver(() => {
    if (modlistsStore.shouldFetch()) {
      modlistsStore.fetchModlists();
    }

    if (modlistsStore.isLoading.get('modlists')) {
      return <Typography>Loading Modlists</Typography>;
    }

    if (modlistsStore.axiosError) {
      return <ErrorDisplay axiosError={modlistsStore.axiosError} />;
    }

    if (modlistsStore.modlists === undefined) {
      return (
        <ErrorDisplay message="Fetched modlists without an error but is still undefined!" />
      );
    }

    //if (store.length != 2) store.length = 2;

    if (store.length != modlistsStore.modlists.length)
      store.length = modlistsStore.modlists.length;

    return undefined;
  });

  const loadingDetailedStatus = useObserver(() => {
    if (loadingModlists !== undefined) return undefined;
    if (modlistsStore.modlists === undefined) return undefined;

    if (store.length === -1) return <ErrorDisplay message="Lenght is -1!" />;
    if (store.currentIndex >= store.length) return undefined;
    if (store.currentIndex === -1) store.currentIndex = 0;

    const currentModlist = modlistsStore.modlists[store.currentIndex];
    const machineURL = currentModlist.links.machineURL;
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

    store.currentIndex = store.currentIndex + 1;
    if (store.currentIndex >= store.length) return undefined;
    return <Typography>Loading Detailed Status</Typography>;
  });

  const content = useObserver(() => {
    if (loadingModlists !== undefined) return undefined;
    if (loadingDetailedStatus !== undefined) return undefined;
    if (modlistsStore.modlists === undefined) return undefined;

    //TODO: labeled tuple elements with TS 4.0
    const data: [IModlistMetadata, IArchive[]][] = modlistsStore.modlists
      .map((modlist) => {
        const status = detailedStatusStore.detailedStatusMap.get(
          modlist.links.machineURL
        );
        if (status === undefined) return [modlist, undefined];
        const archives = status.Archives.map((a) => a.Archive);

        return [modlist, archives];
      })
      .filter((x) => {
        return x[1] !== undefined;
      }) as [IModlistMetadata, IArchive[]][];

    return <ModlistTable data={data} />;
  });

  return (
    <React.Fragment>
      <RoutedLink routeName="modlists.gallery">Back to the Gallery</RoutedLink>
      {loadingModlists}
      {loadingDetailedStatus}
      {content}
    </React.Fragment>
  );
};

export default ArchiveSearchPage;
