'use strict';

export default (namespace, reducers) => (state={}, action) => {
  if (!action.type.startsWith(namespace)) return state;
  return combineReducers(reducers);
};
