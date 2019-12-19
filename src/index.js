import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import store from './store/store';
import history from './store/history';

import 'Assets/scss/wabbajack.scss';
import 'Assets/css/global.css';

ReactDOM.render(
  <App store={store} history={history} />,
  document.getElementById('root')
);
