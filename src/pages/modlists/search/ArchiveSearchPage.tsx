import * as React from 'react';
import { useObserver, useLocalStore } from 'mobx-react';

import RoutedLink from '../../../components/RoutedLink';

import { useStores } from '../../../hooks/use-stores';
import ErrorDisplay from '../../../components/ErrorDisplay';

import {
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Button,
  Container,
} from '@material-ui/core';

import ModlistTable from '../../../components/ModlistTable';
import ModlistArchiveTable from '../../../components/ModlistArchiveTable';
import { IModlistMetadata } from '../../../types/modlists';
import { IArchive } from '../../../types/archives';

const ArchiveSearchPage: React.FC = () => {
  const { modlistsStore, detailedStatusStore } = useStores();
  const store = useLocalStore(() => {
    return {
      currentIndex: -1,
      selectedModlists: new Array<IModlistMetadata>(),
      didSelectModlists: false,
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

    return undefined;
  });

  const selectModlist = useObserver(() => {
    if (loadingModlists !== undefined) return undefined;
    if (modlistsStore.modlists === undefined) return undefined;
    if (store.didSelectModlists) return undefined;

    return (
      <ModlistTable
        modlists={modlistsStore.modlists}
        updateSelection={(modlists) => (store.selectedModlists = modlists)}
        loadModlists={() => (store.didSelectModlists = true)}
      />
    );
  });

  const loadingDetailedStatus = useObserver(() => {
    if (loadingModlists !== undefined) return undefined;
    if (modlistsStore.modlists === undefined) return undefined;
    if (selectModlist !== undefined) return undefined;

    if (store.currentIndex >= store.selectedModlists.length) return undefined;
    if (store.currentIndex === -1) store.currentIndex = 0;

    const currentModlist = store.selectedModlists[store.currentIndex];
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
    if (store.currentIndex >= store.selectedModlists.length) return undefined;
    return <Typography>Loading Detailed Status</Typography>;
  });

  const content = useObserver(() => {
    if (loadingModlists !== undefined) return undefined;
    if (modlistsStore.modlists === undefined) return undefined;
    if (selectModlist !== undefined) return undefined;
    if (loadingDetailedStatus !== undefined) return undefined;

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

    return (
      <React.Fragment>
        <Button
          color="secondary"
          onClick={() => (store.didSelectModlists = false)}
        >
          Back to Modlist Selection
        </Button>
        <ModlistArchiveTable data={data} />
      </React.Fragment>
    );
  });

  return (
    <React.Fragment>
      <RoutedLink routeName="modlists.gallery">Back to the Gallery</RoutedLink>
      {loadingModlists}
      {loadingDetailedStatus}
      {selectModlist}
      {content}
    </React.Fragment>
  );
};

export default ArchiveSearchPage;
