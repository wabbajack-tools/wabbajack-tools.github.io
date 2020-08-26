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

import {
  filterArchives,
  filterName,
  archiveLinkAction,
  archiveLinkActionDisabled,
  renderName,
  sortName,
} from '../utils/archiveUtils';
import { IModlistMetadata } from '../types/modlists';
import { IArchive } from '../types/archives';

interface IModlistArchiveTableProps {
  data: [IModlistMetadata, IArchive[]][];
}

interface Item {
  hash: string;
  modlists: string[];
}

const ModlistArchiveTable: React.FC<IModlistArchiveTableProps> = (props) => {
  const updateItems = (showNSFW: boolean) => {
    const items = new Array<Item>();

    props.data.forEach((val) => {
      const modlist = val[0];
      const archives = filterArchives(val[1], showNSFW);

      archives.forEach((a) => {
        const prevIndex = items.findIndex((x) => x.hash === a.Hash);
        if (prevIndex === -1) {
          items.push({ hash: a.Hash, modlists: [modlist.links.machineURL] });
        } else {
          const prev = items[prevIndex];
          prev.modlists.push(modlist.links.machineURL);
          items[prevIndex] = prev;
        }
      });
    });

    return items;
  };

  const store = useLocalStore(() => {
    const modlists = props.data.map((x) => x[0]).flat();
    const modlistMap = new Map<string, IModlistMetadata>();
    modlists.forEach((modlist) =>
      modlistMap.set(modlist.links.machineURL, modlist)
    );

    const archiveMap = props.data
      .map((x) => x[1])
      .flat()
      .reduce((acc, cur) => {
        acc.set(cur.Hash, cur);
        return acc;
      }, new Map<string, IArchive>());

    const items = updateItems(false);

    return {
      archiveMap: archiveMap,
      modlistMap: modlistMap,
      items: items,
      showNSFW: false,
      renderMetaNames: true,
    };
  });

  const renderNameByHash = (hash: string, renderMetaName: boolean) => {
    const archive = store.archiveMap.get(hash);
    return archive === undefined ? hash : renderName(archive, renderMetaName);
  };

  const sortNameByHash = (
    data1: Item,
    data2: Item,
    renderMetaName: boolean
  ) => {
    const a1 = store.archiveMap.get(data1.hash);
    const a2 = store.archiveMap.get(data2.hash);

    if (a1 === undefined || a2 === undefined) {
      return data1.hash.localeCompare(data2.hash);
    }

    return sortName(a1, a2, renderMetaName);
  };

  const filterNameByHash = (
    filter: any,
    rowData: Item,
    renderMetaName: boolean
  ) => {
    const archive = store.archiveMap.get(rowData.hash);
    if (archive === undefined) {
      const sFilter = filter as string;
      if (sFilter === undefined) return true;
      return rowData.hash.includes(sFilter.toLocaleLowerCase());
    }

    return filterName(filter, archive, renderMetaName);
  };

  const renderModlists = (rowData: Item) => {
    const names = rowData.modlists.map((x) => {
      const name = store.modlistMap.get(x);
      if (name === undefined) {
        console.log(`Unknown machineURL: ${x}`);
        return 'UNKNOWN OPEN CONSOLE!';
      }
      return name.title;
    });
    const s = names.reduce((acc, cur) => {
      if (acc[acc.length - 1] !== ' ') acc = `${acc} ${cur},`;
      else acc = `${acc}${cur},`;
      return acc;
    }, '');
    if (s[s.length - 1] === ',') return s.slice(0, s.length - 1);
    return s;
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
              store.items = updateItems(store.showNSFW);
            }}
          />
        }
        label="Show NSFW"
      />
    );
  });

  const toggleMetaNames = (
    <FormControlLabel
      control={
        <Checkbox
          name="toggleMetaNames"
          checked={store.renderMetaNames}
          onChange={() => {
            store.renderMetaNames = !store.renderMetaNames;
            //updateArchives();
            //updateItems(store.showNSFW);
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
          title="Global Archive Search"
          data={store.items}
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
              render: (rowData) =>
                renderNameByHash(rowData.hash, store.renderMetaNames),
              defaultSort: 'asc',
              sorting: true,
              customSort: (data1: Item, data2: Item) =>
                sortNameByHash(data1, data2, store.renderMetaNames),
              searchable: true,
              customFilterAndSearch: (filter: any, rowData: Item) =>
                filterNameByHash(filter, rowData, store.renderMetaNames),
            },
            {
              title: 'Archive Name',
              hidden: !store.renderMetaNames,
              render: (rowData) => renderNameByHash(rowData.hash, false),
              sorting: true,
              customSort: (data1: Item, data2: Item) =>
                sortNameByHash(data1, data2, false),
              searchable: true,
              customFilterAndSearch: (filter: any, rowData: Item) =>
                filterNameByHash(filter, rowData, false),
            },
            {
              title: 'Hash',
              field: 'Hash',
              sorting: false,
              searchable: true,
              render: (rowData) => (
                <Typography style={{ color: '#DDDDDD' }}>
                  {rowData.hash}
                </Typography>
              ),
              width: 120,
            },
            {
              title: 'Modlists',
              render: (rowData) => renderModlists(rowData),
            },
          ]}
        />
      </React.Fragment>
    );
  });
};

export default ModlistArchiveTable;
