import * as React from 'react';

import Route from '../../components/Route';

import Gallery from './gallery';
import InfoPage from './info';
import StatusPage from './status';
import DetailedStatusPage from './detailed-status';
import SearchPage from './search';

const ModlistsPage: React.FC = () => {
  return (
    <React.Fragment>
      <Route exact name="modlists.gallery" component={<Gallery />} />
      <Route exact name="modlists.info" component={<InfoPage />} />
      <Route exact name="modlists.status" component={<StatusPage />} />
      <Route
        exact
        name="modlists.status.detailed"
        component={<DetailedStatusPage />}
      />
      <Route exact name="modlists.search" component={<SearchPage />} />
    </React.Fragment>
  );
};

export default ModlistsPage;
