'use strict';

import { OPERATE } from 'state/GENERIC_TYPES';

export const operate = (...steps) => {
  return { type: OPERATE, steps };
};
