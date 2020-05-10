import * as React from 'react';

import { ModlistDetailedStatusItem } from 'types/modlist';

import { ListItem, ListItemText } from '@material-ui/core';

import { FixedSizeList, ListChildComponentProps } from 'react-window';

interface VirtualizedListProps {
  list: ModlistDetailedStatusItem[];
}

const VirtualizedList: React.FC<VirtualizedListProps> = (props) => {
  const { list } = props;
  const renderRow = (componentProps: ListChildComponentProps) => {
    const { index, style } = componentProps;
    const item = list[index];
    return (
      <ListItem button style={style} key={index}>
        <ListItemText primary={item.Archive.Name} />
      </ListItem>
    );
  };

  return (
    <FixedSizeList
      itemCount={list.length}
      height={list.length >= 100 ? 400 : list.length * 20}
      width="100%"
      itemSize={20}
    >
      {renderRow}
    </FixedSizeList>
  );
};

export default VirtualizedList;
