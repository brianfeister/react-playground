'use strict';

import  { BaseError } from 'lib/errors';

import { HttpNetworkError } from 'lib/http';
import { HttpParseError } from 'lib/http';
import { HttpStatusError } from 'lib/http';
import { HttpContentTypeError } from 'lib/http';
import { HttpStatusJsonError } from 'lib/http';

import { fetch as httpFetch } from 'lib/http';
import { json as httpJson } from 'lib/http';


class ApiStatusJsonError extends BaseError {
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


class ApiStatusError extends BaseError {
  constructor (request, response) {
    const message = 'An error occurred fulfilling the request.';
    const code = `api.status`;
    const metadata = { request, response };
    super(message, code, metadata);
  }
}


function trap (promise) {
  return promise.catch(error => {
    if (error instanceof HttpStatusJsonError) throw new ApiStatusJsonError(error);
    else if (error instanceof HttpStatusError) throw new ApiStatusError(error);
    throw error;
  });
}

function sign (state, request) {
  if (!state.authentication.document) throw new ApiNoAuthError();
  request.headers.set('authorization', `Bearer ${ state.auth.document.token }`);
}

function fetch_ (state, request, options) {
  sign(request, state);
  return trap(httpFetch(request));
}

function json (state, request, options) {
  sign(request, state);
  return trap(httpJson(request));
}

function jsonUnauthenticated (request) {
  return trap(httpJson(request));
}


export { ApiStatusError }
export { ApiStatusJsonError }
export { ApiNoAuthError }

export { fetch_ as fetch };
export { json };
export { jsonUnauthenticated };
