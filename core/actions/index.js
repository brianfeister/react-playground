'use strict';

import api from '../api';

function onReadError (uuid, error) {
  return { type: 'MODEL.READ.ERROR', uuid, error };
}

function onReadStart (uuid) {
  return { type: 'MODEL.READ.START', uuid };
}

function onReadSuccess (uuid, document) {
  return { type: 'MODEL.READ.SUCCESS', uuid, document };
}

export async function read ({ uuid, type }) {
  return (dispatch, getState) => {
    let document;
    dispatch(onReadStart(uuid));
    try {
      document = await api.read(getState(), type, uuid);
    } catch (error) {
      dispatch(onReadError(uuid, error));
      throw error;
    }
    dispatch(onReadSuccess(uuid, document))
    return document;
  };
}
