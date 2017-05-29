'use strict';

import { connect } from 'react-redux';

import { createLoginSubmitter } from 'common/forms/actions/auth';
import { getMetadata } from 'common/forms/selectors';

import { getErrorMessage } from 'common/forms/selectors';

import { getFieldValue } from 'common/forms/selectors';
import { updateField } from 'common/forms/actions';

const name = 'LOGIN_FORM';
const submit = createLoginSubmitter(name);

export default connect(
  (state, props) => {
    console.debug('COMPONENT UPDATE');
    return {
      username: getFieldValue({ form: name, field: 'username' })(state) || '',
      password: getFieldValue({ form: name, field: 'password' })(state) || '',
      errorMessage: getErrorMessage({ name })(state)
    };
  },
  (dispatch, { metadata }) => {
    return {
      submit: () => dispatch(submit).catch(() => {}),
      updateField: (name, value) => dispatch(updateField({ form: 'LOGIN_FORM', field: name })(value))
    };
  }
)(({ children, submit, username, password, errorMessage, updateField }) => (
  <div>
    <div>
      <label>Username</label>
      <input value={ username } onChange={
               evt => {
                 console.log('WHAT', evt.target.value);
                 updateField('username', evt.target.value)
               }
        }/>
    </div>
    <div>
      <label>Password</label>
      <input value={ password } onChange={ evt => updateField('password', evt.target.value)}/>
        
    </div>
    <div>ERROR:</div>
    <div>{ errorMessage }</div>
    <button onClick={submit}>Login</button>
  </div>
));
