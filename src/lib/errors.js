'use strict';

export class BaseError  {
  constructor (message='An unknown error has occurred.', code='unknown', metadata, stack) {
    this.message = message;
    this.code = code;
    this.metadata = metadata;
    this.stack = stack || this.stack;
  }

  serialize () {
    return {
      code: this.code,
      message: this.message,
      metadata: this.metadata
    };
  }

}


export class ExternalWrappingError extends BaseError {
  constructor (error) {
    super(error.message, 'unknown', {}, error.stack);
  }
}


export class WrappingError extends BaseError {
  constructor (message, code, error) {
    super (message, code, {
      name: error.name,
      message: error.message,
      stack: error.stack,
      metadata: error.metadata
    });
  }
}
