import * as React from 'react';
import { Route } from 'react-router';

import { Box, Container } from '@material-ui/core';

import Header from 'components/Header';
import Footer from 'components/Footer';

import HomePage from 'pages/home';
import InfoPage from 'pages/info';
import ModlistsPage from 'pages/modlists';

import { elevation2 } from 'assets/jss/theme';

const mainRaised = {
  background: elevation2,
  borderRadius: '6px',
  boxShadow:
    '0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)',
};

const App: React.FC = () => {
  return (
    <React.Fragment>
      <Header />
      <Box style={mainRaised} m={4}>
        <Container
          maxWidth="lg"
          style={{ paddingTop: '16px', paddingBottom: '16px' }}
        >
          <Route exact path="/" component={HomePage} />
          <Route path="/info" component={InfoPage} />
          <Route path="/modlists" component={ModlistsPage} />
        </Container>
      </Box>
      <Footer />
    </React.Fragment>
  );
};

export default App;
