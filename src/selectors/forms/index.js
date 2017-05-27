'use strict';

import _ from 'lodash';

export const getValue = (state, { name }) => {
  return _.get(['forms', name, 'value'], state) || {};
};
export const getMetadata = () => {};
export const getOptions = () => {};
