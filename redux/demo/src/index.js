import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import Toggle from './toggle';

import {Provider} from 'react-redux'
import store from './store'

ReactDOM.render(
  <Provider store={store}>
    <App />
    <Toggle/>
  </Provider>,
  document.getElementById('root')
);