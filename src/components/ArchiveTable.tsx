import * as React from 'react';
import { useLocalStore, Observer, useObserver } from 'mobx-react';

import {
  Typography,
  FormControlLabel,
  Grid,
  Checkbox,
  Tooltip,
} from '@material-ui/core';

import MaterialTable, { MTableToolbar } from 'material-table';

import { toFileSizeString } from '../utils/other';
import {
  filterArchives,
  filterName,
  archiveLinkAction,
  archiveLinkActionDisabled,
  renderName,
  renderType,
  sortName,
} from '../utils/archiveUtils';
import { IArchive } from '../types/archives';

interface IArchiveTableProps {
  archives: Array<IArchive>;
  title: string;
}

const ArchiveTable: React.FC<IArchiveTableProps> = (props) => {
  const store = useLocalStore(() => {
    const archives = filterArchives(props.archives, false);
    return {
      showNSFW: false,
      showImages: false,
      renderMetaNames: true,
      archives: archives,
    };
  });

  const updateArchives = () => {
    store.archives = filterArchives(props.archives, store.showNSFW);
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

  return useObserver(() => {
    return (
      <React.Fragment>
        <MaterialTable
          title={props.title}
          data={store.archives}
          options={{
            sorting: true,
            headerStyle: { backgroundColor: '#242424' },
            pageSize: 10,
            pageSizeOptions: [10,50,100,250,500,1000],
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
                      {/*<Tooltip
                        title="This will toggle the use of images in the details panel."
                        placement="top"
                      >
                        <Grid item>{toggleImages}</Grid>
                      </Tooltip>*/}
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
              render: (rowData) => renderName(rowData, store.renderMetaNames),
              defaultSort: 'asc',
              sorting: true,
              customSort: (data1: IArchive, data2: IArchive) =>
                sortName(data1, data2, store.renderMetaNames),
              searchable: true,
              customFilterAndSearch: (filter: any, rowData: IArchive) =>
                filterName(filter, rowData, store.renderMetaNames),
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
};

export default ArchiveTable;
