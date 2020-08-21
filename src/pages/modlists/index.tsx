import * as React from 'react';

import Route from '../../components/Route';

import Gallery from './gallery';
import InfoPage from './info';
import StatusPage from './status';
import DetailedStatusPage from './detailed-status';
import SearchPage from './search';
import { Container } from '@material-ui/core';

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
      <Route exact name="modlists.search" component={<SearchPage />} />
    </React.Fragment>
  );
};

export default ModlistsPage;
