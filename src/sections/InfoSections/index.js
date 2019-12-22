import React from 'react';
import PropTypes from 'prop-types';

import General from './General';
import ModAuthors from './ModAuthors';
import ModlistAuthors from './ModlistAuthors';

export default function InfoSections(props) {
  const { url } = props;
  const param = url.match.params.url;

  switch (param) {
    case 'general':
      return <General />;
    case 'modauthors':
      return <ModAuthors />;
    case 'modlistauthors':
      return <ModlistAuthors />;
    default:
      return (
        <div>
          <h1>/info/{param} not found</h1>
        </div>
      );
  }
}

InfoSections.propTypes = {
  url: PropTypes.object.isRequired
};
