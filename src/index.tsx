import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import './assets/scss/wabbajack.scss';

import configureStore from 'store/configureStore';
import { theme } from 'assets/jss/theme';

import App from './App';

import { ThemeProvider } from '@material-ui/core/styles';

// Create browser history to use in the Redux store
const baseUrl = document
  .getElementsByTagName('base')[0]
  .getAttribute('href') as string;
const history = createBrowserHistory({ basename: baseUrl });

// Get the application-wide store instance, prepopulating with state from the server where available.
const store = configureStore(history);

const { userAgent } = window.navigator;
const isIE = /MSIE|Trident/.test(userAgent);

if (isIE) {
  ReactDOM.render(
    <div>
      <h1>Stop using IE!</h1>
      <img src="https://i.imgflip.com/ywgpb.jpg" alt="STOP IT!"></img>
    </div>,
    document.getElementById('root')
  );
} else {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
  );

  //registerServiceWorker();
}
