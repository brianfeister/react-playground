'use strict';

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
