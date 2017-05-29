'use strict';


export class BaseError {

  constructor ({ message, code, metadata, stack }) {
    this.message = message || 'An unknown error has occurred.';
    this.code = code || 'unknown';
    this.metadata = metadata;
    this.stack = stack || this.stack;
  }

}


export const serialize = error => error instanceof BaseError ? {
  message: error.message,
  code: error.code
} : {
  message: error.message,
  code: 'unknown'
};
