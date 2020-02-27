import React from 'react';
import PropTypes from 'prop-types';

import { ListItem, ListItemText } from '@material-ui/core';
import { FixedSizeList } from 'react-window';

export default function VirtualizedList(props) {
  const { list } = props;

  const renderRow = stuff => {
    const { index, style } = stuff;
    const item = list[index];

    if (item === undefined) return <div></div>;
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
}

VirtualizedList.propTypes = {
  list: PropTypes.array.isRequired
};
