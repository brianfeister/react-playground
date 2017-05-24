'use strict';

import * as ACTION_TYPES from './ACTION_TYPES';


// TODO: Validation and some guardrails/strictness.

// Calls method with paths figured all out.

const generatePathArray = ({ path }) => path ? _.toPath(path) : [];

export const withPathArray = method => ({ path, ...other }) => method({
  path,
  pathArray: generatePathArray({ path }),
  ...other
});


const generatePath = withPathArray(({ namespace, pathArray, prefix, }) => {
  return ([namespace, prefix, ...pathArray].filter(x => x));
});


const generatePaths = ({
  namespace,
  path,
  prefixes
}) => prefixes.map(prefix => generatePath({ namespace, path, prefix }));


/* Adds path object with deconstructed paths to method call. */
export const withPaths = (...options) => method => ({
  namespace,
  ...other
}) => method({
  namespace,
  paths: options.map(({
    key='path',
    prefixes=['value', 'metadata']
  }) => generatePaths({ namespace, path: other[key], prefixes })),
  ...other
});


export const merge = withPaths({ key: 'path', prefixes: ['value', 'metadata']})(({
  paths: [[valuePath, metdataPath]],
  value,
  metadata
}) => ({
  type: ACTION_TYPES.MERGE,
  operations: [
    value !== undefined && [valuePath, value],
    metadata !== undefined && [metadataPath, metadata]
  ].filter(x => x)
}));



export const swap = withPaths(
  { key: 'source', prefixes: ['value', 'metadata'] },
  { key: 'target', prefixes: ['value', 'metadata'] }
)(({
  paths: [
    [sourceValuePath, sourceMetadataPath],
    [targetValuePath, targetMetadataPath]
  ]
}) => ({
  type: ACTION_TYPES.SWAP,
  operations: [
    { source: sourceValuePath, target: targetValuePath },
    { source: sourceMetadataPath, target: targetMetadataPath },
    { source: targetValuePath, target: sourceValuePath },
    { source: targetMetadataPath, target: sourceMetadataPath }
  ]
}));




export const splice = withPaths({ key: 'path', prefixes: ['value', 'metadata']})(({
  paths: [[valuePath, metadataPath]],
  start,
  count,
  items
}) => ({
  type: ACTION_TYPES.SPLICE,
  operations: [
    { path: valuePath, start, count, items: items.map(x => x.value) },
    { path: metadataPath, start, count, items: items.map(x => x.value) }
  ]
}));


export const remove = withPaths({ key: 'path', prefixes: ['value', 'metadata']})(({
  paths: [[vPath, mPath]]
}) => ({
  type: ACTION_TYPES.REMOVE,
  operations: [{ path: valuePath }, { path: metadataPath }]
}));



export const register = withPaths({ key: 'path',  prefixes: ['registration'] })(({
  paths: [[path]]
}) => ({
  type: ACTION_TYPES.REGISTER,
  operations: [{ path }]
}));


export const unregister = withPaths({ key: 'path', prefixes: ['registration', null] })(({
  paths: [[path, target]]
}) => ({
  type: ACTION_TYPES.UNREGISTER,
  operations: [{ path, target }]
}));
