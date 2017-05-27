'use strict';

import _ from 'lodash/fp';

import * as operations from './operations';
import { GENERIC } from './ACTIONS';


export default (
  state={
    auth : {},
    forms: {}
  },
  { type, steps }
) => {
  if (type !== GENERIC) return state;
  return steps.reduce((state, { type, ...options }) => {
    return (operations[type] || (() => state))(options, state);
  }, state);
};
