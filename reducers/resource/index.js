'use strict';
/* Work in progress */

export default (state, action) => {
  if (state[action.uuid] && state[action.uuid].busy) throw new Error('Model is busy.');

  switch (action.type) {
    case 'MODEL.READ':
    case 'MODEL.READ.START':
      return { ...state, [action.uuid]: { busy: true }};
    case 'MODEL.READ.SUCCESS':
      return { ...state, [action.uuid]: { document: action.document }};
    case 'MODEL.READ.ERROR':
      return { ...state, [action.uuid]: { error: action.error }};
    default:
      return state;
  }
};


