import _ from 'lodash/fp';


export const getValue = ({ namespace, name }) => state => {
  if (!name) return _.get([namespace, 'value'], state);
  else return _.get([namespace, 'value', ..._.toPath(name)], state);
}

export const genPaths = (namespace, path) => {
  const branch = path ? _.toPath(path) : [];
  return {
    value: [namespace, 'value', ...branch],
    metadata: [namespace, 'metadata', ...branch],
    registration: [namespace, 'metadata', ...branch]
  };
}


/*
namespace: {
 registrations
 values: Mixed
 metadata
}
*/

const pathify = (ns, prefix, key) => [ns, prefix, ..._.toPath(key)];

const get = (ns, prefix, key) => state => _.get(pathify(ns, prefix, key), state);
const set = (ns, prefix, key, value) => state => _.set(pathify(ns, prefix, key), value, state);

const getMeta = (ns, key) => get(ns, 'metadata', key);
const setMeta = (ns, key, value) => set(ns, 'metadata', value);

const getValue = (ns, key) => get(ns, 'values', key);
const setValue = (ns, key, value) => set(ns, 'values', key, value);

const swap = (ns, key1, key2) => state => setValue(ns, key1)(getValue(ns, key2)(state))(setValue(ns, key2)(getValue(ns, key1)(state)));

const splice = (ns, key, index) => state => setValue(ns, key, getValue(ns, key)(state).filter((x, i) => i !== index))(state)


const insert = (ns, key, index, value) => state => {
  const previous = getValue(ns, key)(state);
  return setValue(ns, key, [...previous.slice(0, index), val, ...previous.slice(index)])(state);
};


const register = ns => state => set(ns, 'registrations'), (get(ns, 'registrations')(state) || 0) + 1)(state)

const unregister = ns => state => {
  const value = (get(ns, 'registrations')(state) || 1) - 1;
  if (value <= 0) return set(ns, undefined)(state);
  return set(ns, 'registrations'path, value, state);
}
