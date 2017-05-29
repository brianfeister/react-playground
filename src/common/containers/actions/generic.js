'use strict';

import * as ACTION_TYPES from './ACTION_TYPES';


// TODO: Validation.
export const set = ({ root, namespace, path, value, metadata }) => {
  return {
    type: ACTION_TYPES.GENERIC,
    operations: [
      value !== undefined && {
        type: 'set',
        path: [root, namespace, 'value', ..._.toPath(path)],
        value: value
      },
      metadata!== undefined && {
        type: 'set',
        path: [root, namespace, 'metadata', ..._.toPath(path)]
        value: metadata
      }
    ].filter(x => x);
  };
};


// TODO: Validation.
export const merge = ({ root, namespace, path, value, metadata }) => {
  return {
    type: ACTION_TYPES.GENERIC,
    operations: [
      value !== undefined && {
        type: 'merge',
        path: [root, namespace, 'value', ..._.toPath(path)],
        value: value
      },
      metadata !== undefined && {
        type: 'merge',
        path: [root, namespace, 'metadata', ..._.toPath(path)]
        value: metadata
      }
    ].filter(x => x);
  };
};


// TODO: Validation.
export const swap = ({ root, namespace, path, source, target }) => {
  return {
    type: ACTION_TYPES.GENERIC,
    root,
    operations: [
      {
        type: 'swap',
        path0: [namespace, 'value', ..._.toPath(path), ..._.toPath(source)]
        path1: [namespace, 'value', ..._.toPath(path), ..._.toPath(target)]
      },
      {
        type: 'swap',
        path0: [namespace, 'metadata', _.toPath(path, source)],
        path1: [namespace, 'metadata', _.toPath(path, target)]
      }
    ]
  };
};


// TODO: Validation.
export const splice = ({ root, namespace, path, start, count, slices }) => {
  return {
    type: ACTION_TYPES.GENERIC,
    root,
    operations: [
      {
        type: 'splice',
        path: [namespace, 'value', ..._.toPath(path)]
        start,
        count,
        slices.map(({ value }) => value)
      },
      {
        type: 'splice',
        path: [namespace, 'metadata', ..._.toPath(path)]
        start,
        count,
        slices.map(({ metadata }) => metadata)
      }
    ]
  };
};


// TODO: Validation.
export const remove = ({ root, namespace, path }) => {
  return {
    type: ACTION_TYPES.GENERIC,
    root,
    operations: [
      path && {
        type: 'set',
        path: [namespace, path 'value', ..._.toPath(path)],
        value: null
      },
      path && {
        type: 'set',
        path: [namespace, path, 'metadata', ..._.toPath(path)],
        value: null
      },
      !path && {
        type: 'set',
        path: [namespace],
        value: null
      }
    ].filter(x => x)
  };
};
