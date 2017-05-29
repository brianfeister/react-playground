'use strict';

import { BaseError } from 'lib/errors';
import { getToken } from 'common/auth/lib/selectors';


export class NotLoggedInError extends BaseError {
  constructor () {
    super({
      message: 'The user is not logged in.',
      code: 'auth.notLoggedIn',
    });
  }
}


export const sign = state => method => request => {
  const token = getToken()(state);
  if (!token) throw new NotLoggedInError();
  const clone = request.clone();
  clone.headers.set('Authorization', `Bearer ${ token }`);
  return method(new Request(clone.url, {
    method: clone.method,
    headers: clone.headers,
    mode: clone.mode,
    credentials: clone.credentials,
    cache: clone.cache,
    redirect: clone.redirect,
    referrer: clone.referrer,
    integrity: clone.integrity
  }));
};
