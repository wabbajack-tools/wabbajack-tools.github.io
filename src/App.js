import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'redux-zero/react';
import { Router } from 'react-router-dom';

import Footer from './Components/Footer';

export default function App(props) {
  const { store, history } = props;
  return (
    <Provider store={store}>
      <Router history={history}>
        <div>
          <div>
            <h1>Hi</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis quis
              erat dignissim, lobortis risus vel, semper orci. Sed sed cursus
              nibh. Quisque blandit sagittis eros sit amet tristique. Etiam
              placerat elementum eros eget sollicitudin. Nam finibus sed risus
              id vulputate. Nullam congue, lorem sed commodo euismod, diam ante
              pharetra dolor, nec pretium mauris tellus vel nisl. Nunc in
              tincidunt leo, eget lacinia massa. Praesent at ex diam. In id
              viverra nibh, vel euismod sem. In aliquet ante nullam.{' '}
            </p>
          </div>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

App.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};
