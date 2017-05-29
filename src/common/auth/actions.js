'use strict';

import { generic } from 'lib/actions';
import { withJsonBody } from 'lib/http';

import { login as login_ } from 'common/auth/lib/api';


export const login = credentials => dispatch => {
  dispatch(generic([
    ['set', ['auth', 'active'], true ]
  ]));
  return login_(credentials).then(payload => {
    dispatch(generic([
      ['set', ['auth', 'active'], false],
      ['set', ['auth', 'payload'], payload]
    ]));
    return payload;
  }, error  => {
    dispatch(generic([
      ['set', ['auth', 'active'], false],
      ['set', ['auth', 'payload'], null]
    ]));
    throw error;
  });
};


export const logout = () => generic([
  ['set', ['auth', 'payload'], null]
]);
