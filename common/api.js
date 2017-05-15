'use strict';

import  { BaseError } from 'common/errors';

import { HttpNetworkError } from 'common/http';
import { HttpParseError } from 'common/http';
import { HttpStatusError } from 'common/http';
import { HttpContentTypeError } from 'common/http';
import { HttpJsonError } from 'common/http';

import { fetch as httpFetch } from 'common/http';
import { json as httpJson } from 'common/http';


class ApiJsonError extends BaseError {
  constructor (error) {
    const { metadata } = error;
    const code = `api.${ metadata.document.code }`;
    const message = metadata.document.message;
    super(message, code, metadata, error.stack);
  }
}

class ApiNoAuthError extends BaseError {
  constructor () {
    const message = 'Attempted to make an authenticated request with no credentials.';
    const code = 'auth.notLoggedIn';
    super(message, code);
  }
}

function trap (promise) {
  return promise.catch(error => {
    if (error instanceof HttpJsonError) throw ApiJsonError(error);
    else if (error instanceof HttpStatusError) throw ApiStatusError(error);
    throw error;
  });
}

function sign (state, request) {
  if (!state.auth.document) throw new ApiNoAuthError();
  request.headers.set('authorization', `Bearer ${ state.auth.document.token }`);
}

function fetch_ (state, request) {
  sign(request, state);
  return trap(httpFetch(request));
}

function json (state, request) {
  sign(request, state);
  return trap(httpJson(request));
}


export { ApiStatusError }
export { ApiJsonError }
export { ApiNoAuthError }

export { fetch_ as fetch };
export { json }
