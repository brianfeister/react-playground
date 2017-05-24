'use strict';

import _ from 'lodash/fp';

export const getValue = ({ namespace, path, state }) => {
  const value = _.get(['ui', namespace, 'value', ..._.toPath(path)], state);
  console.log('HERE', value);
  return value;
}
