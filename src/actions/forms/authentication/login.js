'use strict';

import { createSubmitter } from 'actions/forms/utils';

import { login } from 'actions/authentication';

export default createSubmitter(({ getValue }) => {
  console.debug('Login submitter dispatched. Dispatching login action.')
  return (dispatch, getState) => dispatch(login(getValue(getState())));
});
