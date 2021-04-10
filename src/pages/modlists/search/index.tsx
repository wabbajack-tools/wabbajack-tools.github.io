import * as React from 'react';

import Route from '../../../components/Route';

import ModlistSearchPage from './ModlistSearchPage';
import ArchiveSearchPage from './ArchiveSearchPage';

const SearchPage: React.FC = () => {
  return (
    <React.Fragment>
      <Route exact name="modlists.search" component={<ModlistSearchPage />} />
      <Route
        exact
        name="modlists.search.all"
        component={<ArchiveSearchPage />}
      />
    </React.Fragment>
  );
};

export default SearchPage;
