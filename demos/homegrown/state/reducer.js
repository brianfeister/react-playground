'use strict';

import _ from 'lodash/fp';

const set = (state, { path, value }) => _.set(path, value, state)
const merge = (state, { path, value }) => _.merge(_.set(path, value, {}), state);
const swap = (state, { path0, path1 }) => {
  return _.set(path1, _.get(path0, state), _.set(path0, _.get(path1, state), state))
};
const splice = (state, { path, start, count, items }) => {
  const arr = (_.get(path, state) || []).map(x => x);
  arr.splice(start, count, ...items);
  return _.set(path, arr, state);
};

export default root => (state={}, action) => {
  if (action.type !== '@@:SLICER') return state;
  if (action.root !== root) return state;
  return action.operations.reduce((state, { type, ...options }) => {
    switch (type) {
    case 'set':
      return set(state, options);
    case 'merge':
      return merge(state, options);
    case 'swap':
      return swap(state, options);
    case 'splice':
      return splice(state, options);
    default:
      return state; // Should this throw or log an error?
    }
  }, state);
};
