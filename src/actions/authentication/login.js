'use strict';

import { login } from 'lib/auth';
import { GENERIC } from 'store/ACTIONS';


const onStart = () => ({
  type: GENERIC,
  steps: [
    {
      type: 'set',
      path: ['authentication', 'active'],
      value: true
    }
  ]
});


const onStop = ({ payload }) => ({
  type: GENERIC,
  steps: [
    {
      type: 'set',
      path: ['authentication', 'active'],
      value: false
    },
    {
      type: 'set',
      path: ['authentication', 'payload'],
      value: payload
    }
  ]
});


export default credentials => async (dispatch, getState) => {
  console.debug('Login action starting.');
  dispatch(onStart());
  let payload;
  try {
    console.debug('Making login call.', credentials);
    payload = await login(credentials);
  } catch (error) {
    dispatch(onStop({}));
    throw error
  }
  dispatch(onStop({ payload }));
};
