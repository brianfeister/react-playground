'use strict';

import { getValue } from 'selectors/forms';
import { getMetadata } from 'selectors/forms';
import { getOptions } from 'selectors/forms';

import { wrapError } from 'lib/errorUtils';
import { GENERIC } from 'store/ACTIONS'


const onStart = ({ name }) => ({
  type: GENERIC,
  steps: [
    {
      type: 'set',
      path: ['forms', name, 'metadata', 'submitting'],
      value: true
    },
  ]
});


const onSuccess = ({ name, response }) => ({
  type: GENERIC,
  steps: [
    {
      type: 'set',
      path: ['forms', name, 'metadata', 'submitting'],
      value: false
    },
    {
      type: 'set',
      path: ['forms', name, 'metadata', 'submitted'],
      value: true
    },
    {
      type: 'set',
      path: ['forms', name, 'metadata', 'result'],
      value: response
    },
  ]
});


const onError = ({ name, error }) => ({
  type: GENERIC,
  steps: [
    {
      type: 'set',
      path: ['forms', name, 'metadata', 'submitting'],
      value: false
    },
    {
      type: 'set',
      path: ['forms', name, 'metadata', 'error'],
      value: wrapError(error).serialize()
    },
  ]
});


export default action => name => {
  return async (dispatch) => {
    console.debug('Starting form submissions.');
    dispatch(onStart({ name }));
    let result;
    try {
      console.debug('Submitting form.');
      result = await dispatch(action({
        getValue: state => getValue(state, { name }),
        getMetadata: state => getMetadata(state, { name }),
        getOptions: state => getOptions(state, { name })
      }));
    } catch (error) {
      dispatch(onError({ name, error }))
      throw error;
    }
    dispatch(onSuccess({ name, result }));
  };
}
