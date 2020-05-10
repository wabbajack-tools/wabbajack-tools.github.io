import * as React from 'react';
import { Route } from 'react-router';

import GeneralInfoPage from './general';
import ModAuthorInfoPage from './modauthors';

const InfoPage: React.FC = () => {
  return (
    <React.Fragment>
      <Route exact path="/info/general" component={GeneralInfoPage} />
      <Route exact path="/info/modauthors" component={ModAuthorInfoPage} />
    </React.Fragment>
  );
};

export default InfoPage;
