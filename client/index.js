import React from "react";
import ReactDOM, { render } from "react-dom";
import App from './views/App.js';

import { Provider } from 'react-redux';
import store from './store.js'

render(
  <Provider store={store}>
    <App />
  </Provider>,document.getElementById('root')
);