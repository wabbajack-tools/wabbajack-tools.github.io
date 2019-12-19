import React from 'react';
import PropTypes from 'prop-types';

import ListItem from '@material-ui/core/ListItem';

import 'Assets/css/components/FooterItem.css';

export default function FooterItem(props) {
  const { link, name } = props;
  return (
    <ListItem className="listItem">
      <a href={link} className="link" target="_blank" rel="noopener noreferrer">
        {name}
      </a>
    </ListItem>
  );
}

FooterItem.propTypes = {
  link: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};
