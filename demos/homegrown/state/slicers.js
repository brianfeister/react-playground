'use strict';

import _ from 'lodash/fp';

export const getValue = ({ root, namespace, path, state }) => {
  const value = _.get(['ui', namespace, 'value', ..._.toPath(path)], state);
  console.log('HERE', value);
  return value;
}

const withOption = (key, value) => method => ({ ...opts }) => method({ [key]: value, ...opts });

// State is
// Namespace is root slice.

// Relative path
// slice.get() => { value, metadata }
// slice.set({ value, metadata });
// slice.swap(i, j)
// slice.splice(start, count, [{value, metadata }])
// slice.remove()
// slice.slice(path)

export const Namespace = {};
export const Slice = {};


export const createNamespaceSlice = ({ root, namespace }) => {
  const withOptions = withOption('root', root)(withOption('namespace', namespace));
  return {
    getValue: withRootAndNamespace(getValue),
    getMetadata: withRootAndNamespace(getMetadata)
  }
}


export const createPathSlice = ({ root, namespace, path }) => {
  const withOptions = withOption('root', root)(withOption('namespace', namespace)(withOption('path', path)))
  return {
    getValue: withOptions(getValue),
    getMetadata: withOptions(getMetadata)
  };
};


export const slice = ({ root, namespace, path }) => {
  return {
    get: () => get({ root, namespace, path }),
    set: ({ value, metadata }) => actions.set({ root, namespace, path, value, metadata }),
    swap: (i, j) => actions.swap({ root, namespace, path, i, j }),
    splice: (start, count, ...items) => actions.splice({ root, namespace, path, start, count, items }),
    delete: () => actions.delete({ root, namespace, path }),
    slice: suffix => slice({ root, namespace, path: [...path, ..._.toPath(suffix)] }),
  };
});
