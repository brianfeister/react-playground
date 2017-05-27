'use strict';

import { createStore } from 'redux';
import { compose as reduxCompose } from 'redux';
import { applyMiddleware } from 'redux';

import thunk from 'redux-thunk';

import reducer from './reducer';

const compose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || reduxCompose

export default createStore(
  reducer,
  compose(applyMiddleware(thunk))
);
