'use strict';

import _ from 'lodash/fp';


export const set = (state, { operations }) => {
  return operations.reduce((state, { path, value }) => {
    return _.set(path, value, state)
  }, state)
};


export const merge = (state, { operations }) => {
  return operations.reduce((state, { path, value }) => {
    return _.merge(_.set(path, value, {}), state)
  }, state);
};


export const swap = (state, { operations }) => {
  return operations.reduce((newstate, { source, target }) => {
    return _.set(source, _.get(target, state), newstate);
  }, state);
};


export const splice = (state, { operations }) => {
  return operations.reduce((state, { path, start, count, items }) => {
    const arr = (_.get(path, state) || []).map(x => x);
    arr.splice(start, count, ...items);
    return _.set(path, arr, state);
  }, state);
};


export const remove = (state, { operations }) => {
  return operations.reduce((state, { path }) => {
    return _.set(path, undefined, state);
  });
};


export const register = (state, { operations }) => {
  return operations.reduce((state, { path }) => {
    return _.set(path, (_.get(path, state) || 0) + 1, state);
  }, state);
};


export const unregister = (state, { operations }) => {
  return operations.reduce((state, { path, target }) => {
    if ((_.get(path, state) || 0) - 1 <= 0) return _.set(target, undefined, state);
    else return _.set(path, (_.get(path, state) || 0) - 1, state);
  }, state);
};
