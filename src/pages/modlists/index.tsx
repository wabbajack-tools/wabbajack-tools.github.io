import * as React from 'react';

import { Container } from '@material-ui/core';

import Route from '../../components/Route';

import Gallery from './gallery';
import InfoPage from './info';
import StatusPage from './status';
import DetailedStatusPage from './detailed-status';
import SearchPage from './search';
import ManifestPage from './manifest';

const ModlistsPage: React.FC = () => {
  return (
    <React.Fragment>
      <Container maxWidth="lg">
        <Route exact name="modlists.gallery" component={<Gallery />} />
        <Route exact name="modlists.info" component={<InfoPage />} />
        <Route exact name="modlists.status" component={<StatusPage />} />
        <Route
          exact
          name="modlists.status.detailed"
          component={<DetailedStatusPage />}
        />
      </Container>
      <Route name="modlists.search" component={<SearchPage />} />
      <Route exact name="modlists.manifest" component={<ManifestPage />} />
    </React.Fragment>
  );
};

export default ModlistsPage;
