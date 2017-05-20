'use strict';


export default (state, action) => {

  switch (action.type) {
    case 'UI_STATE.REGISTER':
      const registrations = ((state[action.namespace] || {}).registrations || 0) + 1;
      if (registrations === 1) return { ...state, [action.namespace]: { values: {}, metadata: {}, registrations } };
      else return {
        ...state,
        [action.namespace]: {
          ...state[action.namespace],
          registrations
        }
      };
    case 'UI_STATE.UNREGISTER':
      const registrations = ((state[action.namespace] || {}).registrations || 0) - 1;
      if (registrations <= 0) return { ...state, [action.namespace]: undefined };
      else return {
        ...state,
        [action.namespace]: {
          ...state[action.namespace],
          registrations
        }
      };

    case 'UI_STATE.INITIALIZE':
      return {
        ...state,
        [actions.namespace]: {
          ...state[action.namespace],
          values: action.values,
          metadata: action.metadata
        }
      };


    case 'UI_STATE.SET_VALUE':
      return {
        ...state,
        [action.namespace]: {
          ...state[action.namespace],
          values: {
            ...state[action.namespace].values,
            [action.key]: action.value
          }
        }
      };
    case 'UI_STATE.SET_METADATA':
      return {
        ...state,
        [action.namespace]: {
          ...state[action.namespace],
          metadata: {
            ...state[action.namespace].metadata,
            [action.key]: {
              ...state[action.namespace].metadata[action.key]
              [action.name]: action.value
            }
          }
        }
      };
    case 'UI_STATE.CREATE_NAMESPACE':
    case 'UI_STATE.DELETE_NAMESPACE':

    default:
      return state;
  }



}
