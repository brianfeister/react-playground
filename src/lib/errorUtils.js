'use strict';

import { BaseError } from 'lib/errors';
import { ExternalWrappingError } from 'lib/errors';

export const wrapError = error => {
  if (error instanceof BaseError) {
    return error;
  }
  else {
    return new ExternalWrappingError(error);
  }
};
