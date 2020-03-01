import React from 'react';
import PropTypes from 'prop-types';

import { List, ListItem, ListItemText } from '@material-ui/core';

export default function StatusList(props) {
  const { list } = props;

  return (
    <List>
      {list.map(item => {
        return (
          <ListItem key={item.Archive.Hash}>
            <ListItemText primary={item.Archive.Name} />
          </ListItem>
        );
      })}
    </List>
  );
}

StatusList.propTypes = {
  list: PropTypes.array.isRequired
};
