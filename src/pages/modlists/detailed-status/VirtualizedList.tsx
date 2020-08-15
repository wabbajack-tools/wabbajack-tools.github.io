import * as React from 'react';

import { IDetailedStatusItem } from '../../../types/modlists';

import { ListItem, ListItemText } from '@material-ui/core';

import { FixedSizeList, ListChildComponentProps } from 'react-window';

interface IVirtualizedListProps {
  items: IDetailedStatusItem[];
}

const VirtualizedList: React.FC<IVirtualizedListProps> = (props) => {
  const { items } = props;
  const renderRow = (componentProps: ListChildComponentProps) => {
    const { index, style } = componentProps;
    const item = items[index];
    return (
      <ListItem button style={style} key={index}>
        <ListItemText primary={item.Archive.Name} />
      </ListItem>
    );
  };

  return (
    <FixedSizeList
      itemCount={items.length}
      height={items.length >= 100 ? 400 : items.length * 20}
      width="100%"
      itemSize={20}
    >
      {renderRow}
    </FixedSizeList>
  );
};

export default VirtualizedList;
