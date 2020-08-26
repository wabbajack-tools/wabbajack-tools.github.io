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

import { getGameName } from '../utils/games';

import { IModlistMetadata } from '../types/modlists';

interface IModlistTableProps {
  modlists: IModlistMetadata[];
  updateSelection: (modlists: IModlistMetadata[]) => void;
  loadModlists: () => void;
}

const ModlistTable: React.FC<IModlistTableProps> = (props) => {
  const filterModlists = (modlists: IModlistMetadata[], showNSFW: boolean) => {
    if (showNSFW) return modlists;
    return modlists.filter((x) => {
      return !x.nsfw;
    });
  };

  const store = useLocalStore(() => {
    return {
      showNSFW: false,
      modlists: filterModlists(props.modlists, false),
      selectedModlists: new Array<IModlistMetadata>(),
    };
  });

  const renderGame = (rowData: IModlistMetadata) => {
    return getGameName(rowData.game);
  };

  const sortGame = (data1: IModlistMetadata, data2: IModlistMetadata) => {
    const g1 = getGameName(data1.game);
    const g2 = getGameName(data2.game);

    return g1.localeCompare(g2);
  };

  const toggleNSFW = useObserver(() => {
    return (
      <FormControlLabel
        control={
          <Checkbox
            name="enableNSFW"
            checked={store.showNSFW}
            onChange={() => {
              store.showNSFW = !store.showNSFW;
              store.modlists = filterModlists(props.modlists, store.showNSFW);
            }}
          />
        }
        label="Show NSFW"
      />
    );
  });

  return useObserver(() => {
    return (
      <React.Fragment>
        <Typography style={{ marginTop: '8px', marginBottom: '16px' }}>
          Select Modlists from the table below and then click the purple cloud
          icon in the top right corner left of the search bar. I can't get the
          highlighted color to change so have fun with some eye bleach.
        </Typography>
        <MaterialTable
          title="Select Modlists"
          data={store.modlists}
          options={{
            sorting: true,
            headerStyle: { backgroundColor: '#242424' },
            pageSize: 10,
            pageSizeOptions: [5, 10, 20, 50],
            selection: true,
          }}
          onSelectionChange={(rows) => {
            store.selectedModlists = rows;
            props.updateSelection(rows);
          }}
          actions={[
            {
              tooltip: 'Load Selected Modlists',
              icon: 'clouddownload',
              iconProps: { color: 'primary' },
              onClick: (event, data) => props.loadModlists(),
            },
          ]}
          components={{
            Toolbar: (props) => (
              <Observer>
                {() => (
                  <div style={{ backgroundColor: '#1F1B24' }}>
                    <MTableToolbar {...props} />
                    <Grid container alignItems="flex-start" justify="flex-end">
                      <Tooltip
                        title="This will toggle the showcase of NSFW Modlists."
                        placement="top"
                      >
                        <Grid item>{toggleNSFW}</Grid>
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
              field: 'title',
              sorting: true,
              searchable: true,
              defaultSort: 'asc',
            },
            {
              title: 'Game',
              render: (rowData) => renderGame(rowData),
              sorting: true,
              customSort: (data1: IModlistMetadata, data2: IModlistMetadata) =>
                sortGame(data1, data2),
              searchable: false,
            },
          ]}
        />
      </React.Fragment>
    );
  });
};

export default ModlistTable;
