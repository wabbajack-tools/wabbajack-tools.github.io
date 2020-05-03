import * as React from 'react';
import { RouteComponentProps, match } from 'react-router';

import General from './General';
import ModAuthors from './ModAuthors';

interface IProps extends RouteComponentProps {
  match: match<{ url: string }>;
}

const InfoSections: React.FC<IProps> = (props) => {
  const { url } = props.match.params;

  switch (url) {
    case 'general':
      return <General />;
    case 'modauthors':
      return <ModAuthors />;
    default:
      return (
        <div>
          <h1>/info/{url} not found</h1>
        </div>
      );
  }
};

export default InfoSections;
