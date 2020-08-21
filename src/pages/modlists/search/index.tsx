import * as React from 'react';
import { useRouteNode } from 'react-router5';
import { observer, useLocalStore, Observer, useObserver } from 'mobx-react';
import { v4 as uuidv4 } from 'uuid';

import RoutedLink from '../../../components/RoutedLink';

import { useStores } from '../../../hooks/use-stores';
import ErrorDisplay from '../../../components/ErrorDisplay';

import {
  Box,
  Typography,
  Link,
  Container,
  FormControlLabel,
  Grid,
  Checkbox,
  Tooltip,
} from '@material-ui/core';

import MaterialTable, { MTableToolbar } from 'material-table';

import { getDateString, toFileSizeString } from '../../../utils/other';
import {
  tryGetMetaState,
  tryGetName,
  tryGetURL,
} from '../../../utils/archiveUtils';
import {
  IArchive,
  MetaStateType,
  IMetaState,
  IAbstractIPS4DownloaderState,
} from '../../../types/archives';

const ModlistSearchPage: React.FC = () => {
  const { machineURL } = useRouteNode('modlists.status.detailed').route.params;
  const store = useLocalStore(() => ({
    showNSFW: false,
    showImages: false,
    renderMetaNames: true,
    archives: new Array<IArchive>(),
  }));
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
  const updateArchives = () => {
    if (status === undefined) return undefined;
    store.archives = status.Archives.map((a) => a.Archive).filter((a) => {
      //no need to filter if we show everything
      if (store.showNSFW) return true;
      if (a.State.$type === 'LoversLabDownloader, Wabbajack.Lib')
        return store.showNSFW;

      const metaState = tryGetMetaState(a.State);
      if (metaState === undefined) return true;
      return !metaState.IsNSFW;
    });
  };
  //calling this once so store.archives gets populated
  updateArchives();

  const renderName = (rowData: IArchive): string => {
    return tryGetName(rowData, store.renderMetaNames);
  };

  const sortName = (data1: IArchive, data2: IArchive): number => {
    const name1 = tryGetName(data1, store.renderMetaNames);
    const name2 = tryGetName(data2, store.renderMetaNames);
    return name1.localeCompare(name2);
  };

  const filterName = (filter: any, rowData: IArchive): boolean => {
    const sFilter = filter as string;
    if (sFilter === undefined) return true;
    const name = tryGetName(rowData, store.renderMetaNames).toLocaleLowerCase();
    return name.includes(sFilter.toLocaleLowerCase());
  };

  const renderType = (rowData: IArchive): string => {
    return rowData.State.$type.replace(', Wabbajack.Lib', '');
  };

  const archiveLinkAction = (rowData: IArchive | IArchive[]) => {
    const archive = rowData as IArchive;
    if (archive === undefined) return;
    const url = tryGetURL(archive);
    if (url === undefined) return;
    window.open(url, '_blank');
  };

  const archiveLinkActionDisabled = (rowData: IArchive): boolean => {
    const url = tryGetURL(rowData);
    return url === undefined;
  };

  const toggleNSFW = useObserver(() => {
    if (status === undefined) return undefined;
    return (
      <FormControlLabel
        control={
          <Checkbox
            name="enableNSFW"
            checked={store.showNSFW}
            onChange={() => {
              store.showNSFW = !store.showNSFW;
              updateArchives();
            }}
          />
        }
        label="Show NSFW"
      />
    );
  });

  const toggleImages = (
    <FormControlLabel
      control={
        <Checkbox
          name="enableImages"
          checked={store.showImages}
          onChange={() => (store.showImages = !store.showImages)}
        />
      }
      label="Show Images"
    />
  );

  const toggleMetaNames = (
    <FormControlLabel
      control={
        <Checkbox
          name="toggleMetaNames"
          checked={store.renderMetaNames}
          onChange={() => {
            store.renderMetaNames = !store.renderMetaNames;
            updateArchives();
          }}
        />
      }
      label="Render Meta Names"
    />
  );

  const content = useObserver(() => {
    if (loadingDetailedStatus !== undefined) return undefined;
    if (status === undefined) return undefined;

    return (
      <React.Fragment>
        <MaterialTable
          title={`Archive Search for ${status.Name}`}
          data={store.archives}
          options={{
            sorting: true,
            headerStyle: { backgroundColor: '#242424' },
            pageSize: 10,
            pageSizeOptions: [5, 10, 20, 50],
          }}
          components={{
            Toolbar: (props) => (
              <Observer>
                {() => (
                  <div style={{ backgroundColor: '#1F1B24' }}>
                    <MTableToolbar {...props} />
                    <Grid container alignItems="flex-start" justify="flex-end">
                      <Tooltip
                        title="This will toggle the showcase of NSFW mods."
                        placement="top"
                      >
                        <Grid item>{toggleNSFW}</Grid>
                      </Tooltip>
                      <Tooltip
                        title="This will toggle the use of images in the details panel."
                        placement="top"
                      >
                        <Grid item>{toggleImages}</Grid>
                      </Tooltip>
                      <Tooltip
                        title="This will toggle the use of meta names instead of the archive file name."
                        placement="top"
                      >
                        <Grid item>{toggleMetaNames}</Grid>
                      </Tooltip>
                    </Grid>
                  </div>
                )}
              </Observer>
            ),
          }}
          columns={[
            {
              title: 'Name',
              field: 'Name',
              render: (rowData) => renderName(rowData),
              defaultSort: 'asc',
              sorting: true,
              customSort: (data1: IArchive, data2: IArchive) =>
                sortName(data1, data2),
              searchable: true,
              customFilterAndSearch: (filter: any, rowData: IArchive) =>
                filterName(filter, rowData),
            },
            {
              title: 'Archive Name',
              field: 'Name',
              hidden: !store.renderMetaNames,
            },
            {
              title: 'Size',
              field: 'Size',
              searchable: false,
              render: (rowData) => (
                <Typography style={{ color: '#DDDDDD' }}>
                  {toFileSizeString(rowData.Size)}
                </Typography>
              ),
              width: 100,
            },
            {
              title: 'Hash',
              field: 'Hash',
              sorting: false,
              searchable: true,
              render: (rowData) => (
                <Typography style={{ color: '#DDDDDD' }}>
                  {rowData.Hash}
                </Typography>
              ),
              width: 120,
            },
            {
              title: 'Type',
              field: 'State',
              searchable: false,
              render: (rowData) => (
                <Typography style={{ color: '#DDDDDD' }}>
                  {renderType(rowData)}
                </Typography>
              ),
            },
          ]}
          actions={[
            (rowData: IArchive) => ({
              icon: 'link',
              tooltip: 'Visit',
              onClick: () => archiveLinkAction(rowData),
              disabled: archiveLinkActionDisabled(rowData),
            }),
          ]}
        />
      </React.Fragment>
    );
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
