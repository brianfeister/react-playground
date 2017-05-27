'use strict';

import _ from 'lodash/fp';


export const merge = ({ path, value }, state) => {
  return _.merge(_.set(path, value, {}), state);
};


export const swap = ({ path0, path1 }, state) => {
  const intermediate = _.set(path0, _.get(path1, state), state);
  return _.set(path1, _.get(path0, state), intermediate);
};


export const splice = ({ path, start, count, items }, state) => {
  const array = (_.get(path, state) || []).map(x => x);
  array.splice(start, count, ...items);
  return _.set(path, arr, state);
};


export const set = ({ path, value }, state) => {
  return _.set(path, value, state);
}
