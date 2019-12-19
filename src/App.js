import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'redux-zero/react';
import { Router } from 'react-router-dom';

export default function App(props) {
  const { store, history } = props;
  return (
    <Provider store={store}>
      <Router history={history}>
        <div>
          <h1>Hi</h1>
        </div>
      </Router>
    </Provider>
  );
}

App.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};
