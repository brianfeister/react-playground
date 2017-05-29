'use strict';

import _ from 'lodash/fp';
import thunk from 'redux-thunk';

import { createStore } from 'redux';
import { compose } from 'redux';
import { applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import { GENERIC } from 'lib/ACTION_TYPES';


const set = (state, [path, value]) => _.set(path, value, state);
const merge = (state, [path, value]) => _.merge(_.set(path, value, {}), state);
const swap = (state, [path0, path1]) => {
  const intermediate = _.set(path0, _.get(path1, state), state);
  return _.set(path1, _.get(path0, state), intermediate);
};
const splice = (state, [path, start, count, items=[]]) => {
  const array = (_.get(path, state) || []).map(x => x);
  array.splice(start, count, ...items);
  return _.set(path, arr, state);
};

const operations = { set, merge, swap, splice };
const operate = (state, [type, ...args]) => operations[type](state, args);

const reducer = (state={}, { type, steps }) => {
  return type === GENERIC ? steps.reduce(operate, state) : state;
};


// Redux devtools injects some variables onto the window when its
// available. If it is there, we use the compose function offered by
// the devtools to create the enhancer. This automatically enables the
// dev tools. Otherwise we use the redux compose function to create
// the enhancer.
const composer = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose);

// Add thunk IOC control to the dispatcher.
const enhancer = composer(applyMiddleware(thunk));


const store = createStore(reducer, enhancer);


export default ({ children }) => <Provider store={store}>{ children }</Provider>;
