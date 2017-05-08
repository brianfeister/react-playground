'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from 'redux';

import reducers from './core/reducers';
import App from './core/components/App';

const store = createStore(reducers);

window.onload = () => {
  ReactDOM.render((<App store={store}></App>), document.getElementById('main'));
};




