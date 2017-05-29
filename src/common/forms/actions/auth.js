'use strict';

import { createSubmitter} from 'common/forms/lib/submit';

import { login } from 'common/auth/actions';
import { logout } from 'common/auth/actions';


export const createLogoutSubmitter = createSubmitter(() => {
  return (dispatch, getState) => dispatch(logout());
});

export const createLoginSubmitter = createSubmitter(({ getValue }) => {
  return (dispatch, getState) => dispatch(login(getValue(getState())));
});
