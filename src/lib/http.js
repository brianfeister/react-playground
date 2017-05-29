'use strict';

import { BaseError } from 'lib/errors';


export class HttpError extends BaseError {
  constructor ({ code, ...pass }) {
    super({ code: `http.${code}`, ...pass });
  }
}


export class NetworkError extends HttpError {
  constructor ({ error, ...pass }) {
    super({
      message: 'Cannot connect to the internet or EXP.',
      code: 'network',
      metadata: { error, ...pass },
      stack: error.stack
    });
  }
}


export class StatusError extends HttpError {
  constructor ({ response, ...pass }) {
    super({
      message: 'An error occurred fulfilling the request.',
      code: `status.${response.status}`,
      metadata: { response, ...pass }
    });
  }
}


export class ParseError extends HttpError {
  constructor ({ error, ...pass }) {
    super({
      message: 'Failed to parse response.',
      code: 'parse',
      metadata: { error, ...pass },
      stack: error.stack
    })
  }
}






/* Decorators */

export const trap = () => method => async (...args) => {
  const { response, ...pass } = await method(...args);
  if (!response.ok) throw new StatusError({ response, ...pass });
  return { response, ...pass };
};


export const parse = () => method => async (...args) => {
  const { response, ...pass } = await method(...args);
  const document = await response.json().catch(error => {
    throw new ParseError({ response, error, ...pass });
  });
  return { response, document, ...pass };
};


export const withJsonBody = document => method => request => {
  const clone = request.clone();
  clone.headers.set('content-type', 'application/json');
  return method(new Request(clone.url, {
    method: clone.method,
    headers: clone.headers,
    body: JSON.stringify(document),
    mode: clone.mode,
    credentials: clone.credentials,
    cache: clone.cache,
    redirect: clone.redirect,
    referrer: clone.referrer,
    integrity: clone.integrity
  }));
};




/* Fetch */

export const send = async (request) => {
  const response = await fetch(request).catch(error => {
    throw new NetworkError({ request, error });
  });
  return { request, response };
};
