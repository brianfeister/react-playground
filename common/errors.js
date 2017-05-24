'use strict';

class BaseError extends Error {
  constructor (message='An unknown error has occurred.', code='unknown', metadata, stack) {
    super(message);
    this.code = code;
    this.metadata = metadata;
    this.stack = stack || this.stack;
  }
}


class WrappingError extends BaseError {
  constructor (message, code, error) {
    super (message, code, {
      name: error.name,
      message: error.message,
      stack: error.stack,
      metadata: error.metadata
    });
  }
}

export { BaseError }
export { WrappingError }

