import * as React from 'react';
import { Route } from 'react-router';

import { Box } from '@material-ui/core';

import Header from './components/Header';
import Footer from './components/Footer';
import StartSection from './sections/StartSection';
import InfoSections from './sections/InfoSections';
import Gallery from './sections/Gallery';
import ModlistInfo from './sections/ModlistInfo';
import StatusDashboard from './sections/StatusDashboard';
import StatusPage from './sections/StatusPage';
import SearchPage from './sections/SearchPage';

import { elevation2 } from './assets/jss/theme';

const mainRaised = {
  background: elevation2,
  borderRadius: '6px',
  boxShadow:
    '0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)',
};

export default () => (
  <div>
    <Header />
    <Box style={mainRaised} m={4}>
      <Route exact path="/" component={StartSection} />
      <Route path="/info/:url" component={InfoSections} />
      <Route exact path="/gallery" component={Gallery} />
      <Route path="/modlist/:url" component={ModlistInfo} />
      <Route exact path="/status" component={StatusDashboard} />
      <Route path="/status/:url" component={StatusPage} />
      <Route path="/search/:url" component={SearchPage} />
    </Box>
    <Footer />
  </div>
);
