'use strict';

// mark form as SUBMIT_START
// mark form as SUBMIT_SUCCESS
// mark form as SUBMIT_ERROR

const createFormSubmitter = ({ form }, executor) {
  return (...args) => {
    dispatch(actions.merge({
      root: 'forms',
      namespace: form,
      metadata: { submitting: true, error: null }
    });
             
  };
  

  // set "submitting"
  // get form slice
  // execute by passing in form slice
  // when success
  // set "submitted"
  // when fails
  // set "error"

}

async function executeAction (namespace, executor, args, dispatch, getState) {
  try {
    await dispatch({ type: `${ namespace }.START`, args });
    const result = await executor(state, ...args);
    await dispatch({ type: `${ namespace }.SUCCESS`, result, args });
  } catch (error) {
    if (!(error instanceof StandardError)) error = new ErrorWrapper({ error });
    await dispatch({ type: `${ namespace }.ERROR`, error.serialize(), args });
  }
}

function createAction (namespace, executor) {
  return (...args) => (dispatch, getState) => {
    return executeAsyncAction(namespace, executor, args, dispatch, getState);
  };
}

function serializeError (error) {
  return {
    name: error.name,
    message: error.message,
    stack: error.stack,
    code: error.code || 'unknown.error',
    text: error.text || 'An unknown error has occurred.',
    data: error.data
  }
}
