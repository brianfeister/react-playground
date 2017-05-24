'use strict';

import * as operations from './operations';
import * as ACTION_TYPES from './ACTION_TYPES';


export default (state={}, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET:
      return operations.set(state, action);
    case ACTION_TYPES.MERGE:
      return operations.merge(state, action);
    case ACTION_TYPES.SWAP:
      return operations.swap(state, action);
    case ACTION_TYPES.SPLICE:
      return operations.splice(state, action);
    case ACTION_TYPES.REMOVE:
      return operations.remove(state, action);
    case ACTION_TYPES.REGISTER:
      return operations.register(state, action);
    case ACTION_TYPES.UNREGISTER:
      return operations.uregister(state, action);
    default:
      return state;
  }
}
