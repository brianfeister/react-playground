'use strict';

import { operate } from 'state/generic';
import api from 'lib/api';


export const login = credentials => dispatch => {
  dispatch(operate(
    ['set', ['auth', 'active'], true ]
  ));
  return api.fetch(new Request(
    'https://eagle.goexp.io/api/auth/login',
    {
      headers: { 'content-type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(credentials)
    }
  )).then(({ document }) => {
    dispatch(operate(
      ['set', ['auth', 'active'], false],
      ['set', ['auth', 'document'], document]
    ));
    return payload;
  }, error  => {
    dispatch(operate(
      ['set', ['auth', 'active'], false],
      ['set', ['auth', 'document'], null]
    ));
    throw error;
  });
};


export const logout = () => operate(
  ['set', ['auth', 'document'], null]
);
