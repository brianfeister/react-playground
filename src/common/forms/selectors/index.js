'use strict';

import _ from 'lodash';

export const getValue = ({ name }) => state => {
  return _.get(state, ['forms', name, 'value']) || {};
};
export const getMetadata = ({ name }) => state => {
  return _.get(state, ['forms', name, 'metadata']) || {};
};
export const getOptions = () => state => {};

export const getErrorMessage = ({ name }) => state => {
  return _.get(state, ['forms', name, 'metadata', 'error', 'message']);
};


export const getFieldValue = ({ form, field }) => state => {
  return _.get(state, ['forms', form, 'value', _.toPath(field)]);
};
