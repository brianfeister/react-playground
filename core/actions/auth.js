'use strict';


function ErrorWrapper ({ code, messaage, data, error }) {
  this.code = code || 'system.error';
  this.message = message || 'An unknown error has occured.';
  this.data = data || {};
  this.original = error;
  this.stack = (new Error()).stack;
  this.serialize = () => { code, message, data, error };
}

ErrorWrapper.serialize = ()

APIError.prototype = new Error();



function executeAction (namespace, executor, args, dispatch, getState) {
  try {
    await dispatch({ type: `${ namespace }.START`, args });
    const result = await executor(state, ...args);
    await dispatch({ type: `${ namespace }.SUCCESS`, result, args });
  } catch (error) {
    if (!(error instanceof ErrorWrapper)) error = new ErrorWrapper({ error });
    await dispatch({ type: `${ namespace }.ERROR`, error, args });
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

function fetchWrapper (request) {
  let response;
  try {
    response = await fetch(request);
  } catch (error) {
    error.code = 'network.unavailable';
    error.text = 'Unable to connect to EXP.';
    throw error;
  }

  if (response.ok) {
    if (response.headers['content-type'] === 'application/json') {
      try {
        return await response.json();
      } catch (error) {
      }
    } else {
      const error = new Error('Unexpected content type in response.');
      error.code = 'api.unexpected.contentType';
      error.status = response.status;
      error.text = 'An unexpected error has occurred.';
    }
  }


  const error = new Error('Error communicating with the API.');
  error.name = 'HTTP'
  error.code = 'api.error';
  error.status = response.status;
  error.text = 'Error communicating with the API.';
  if (response.headers['content-type'] === 'application/json') {
    try {
      const body = await response.json();
      error.code = body.code || error.code;
      error.text = body.message || error.text;
    } catch (error) { /* Unexpected */ }
  }

  throw error;

}


export const login = createAsyncAction('LOGIN', async (state, username, password, organization) => {
  const response = await fetch('/api/auth/login', {});
  return await response.json();
});






export function login () {}
export function logout () {}
export function refresh () {}
