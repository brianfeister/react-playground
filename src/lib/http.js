'use strict';

import { BaseError } from 'lib/errors';
import { WrappingError } from 'lib/errors';


class HttpNetworkError extends BaseError {
  constructor (error) {
    const message = 'Cannot connect to the internet or EXP.';
    const code = 'http.network';
    const metadata = { error };
    super(message, code, metadat);
  }
}

class HttpStatusError extends BaseError {
  constructor (request, response) {
    const message = 'An error occurred fulfilling the request.';
    const code = `http.status`;
    const metadata = { request, response };
    super(message, code, metadata);
  }
}


class HttpParseError extends BaseError {
  constructor (request, response, error) {
    const message = 'Failed to parse response.';
    const code = 'http.parse';
    const metadata = { request, response, error };
    super(message, code, metadata, error.stack);
  }
}


class HttpStatusJsonError extends BaseError {
  constructor (request, response, document) {
    const message = 'An error occurred fulfilling the request.';
    const code = 'http.status.json';
    const metadata = { request, response, document };
    super(message, code, metadata);
  }
}


class HttpContentTypeError extends BaseError {
  constructor (request, response) {
    const message = 'Received unexpected content type.';
    const code = 'http.contentType';
    const metadata = { request, response };
    super(message, code, metadata);
  }
}


function fetch_ (request) {
  return fetch(request).catch(error => {
    throw new HttpNetworkError(error);
  });
}


async function json_ (request) {
  const response = await fetch_(request);
  if (response.headers.get('content-type') !== 'application/json') {
    if (response.ok) throw new HttpContentTypeError()
    throw new HttpStatusError(request, response);
  }
  const document = await response.json().catch(error => {
    throw new HttpParseError(request, response, error);
  });
  if (!response.ok) throw new HttpStatusJsonError(request, response, document);
  return document;
}


export { HttpNetworkError }
export { HttpParseError }
export { HttpStatusError }
export { HttpContentTypeError }
export { HttpStatusJsonError }

export { fetch_ as fetch }
export { json_ as json }
