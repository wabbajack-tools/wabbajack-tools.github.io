import 'mobx-react-lite/batchingForReactDom';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { RouterProvider } from 'react-router5';

import './assets/scss/wabbajack.scss';

import App from './App';
import { configureRouter } from './routes';

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
  const router = configureRouter();
  if (!router.isStarted()) router.start();

  ReactDOM.render(
    <RouterProvider router={router}>
      <App />
    </RouterProvider>,
    document.getElementById('root')
  );
}
