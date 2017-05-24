'use strict';

import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import uiReducer from 'exp/demos/homegrown/state/reducer';

export default combineReducers({
  ui: uiReducer,
  form: formReducer,
  auth: () => { return { document: null }; }
});
