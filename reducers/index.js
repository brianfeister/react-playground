'use strict';

import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  form: formReducer,
  auth: () => { return { document: null }; }
});
