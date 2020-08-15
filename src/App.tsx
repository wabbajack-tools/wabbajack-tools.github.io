import * as React from 'react';

import { ThemeProvider } from '@material-ui/core/styles';
import { Box, Container } from '@material-ui/core';

import Header from './components/Header';
import Footer from './components/Footer';
import Route from './components/Route';

import { elevation2 } from './assets/jss/theme';

import HomePage from './pages/home';
import TestPage from './pages/testpage';
import ModlistsPage from './pages/modlists';

import { createTheme, darkTheme } from './assets/jss/theme';

const mainRaised = {
  background: elevation2,
  borderRadius: '6px',
  boxShadow:
    '0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)',
};

const App: React.FC = () => {
  return (
    <ThemeProvider theme={createTheme(darkTheme)}>
      <Header />
      <Box style={mainRaised} m={4}>
        <Container
          maxWidth="lg"
          style={{ paddingTop: '16px', paddingBottom: '16px' }}
        >
          <Route exact name="home" component={<HomePage />} />
          <Route name="test" component={<TestPage />} />
          <Route name="modlists" component={<ModlistsPage />} />
        </Container>
      </Box>
      <Footer />
    </ThemeProvider>
  );
};

export default App;
