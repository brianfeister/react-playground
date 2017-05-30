'use strict';

import { connect } from 'react-redux';

//import { createLoginSubmitter } from 'common/forms/actions/auth';
//import { getMetadata } from 'common/forms/selectors';

//import { getErrorMessage } from 'common/forms/selectors';

//import { getFieldValue } from 'common/forms/selectors';
//import { updateField } from 'common/forms/actions';

import { submit } from 'state/forms';
import { login } from 'state/auth';



import TextField from 'components/forms/TextField';
import FormError from 'components/forms/FormError';

import Button from 'material-ui/Button';




const onSubmit = () => submit('login', ({ getValue }) => (dispatch, getState) =>  {
  return dispatch(login(getValue(getState())));
});




export default connect(
  () => ({}),
  dispatch => ({
    submit: () => dispatch(onSubmit())
  })
)
(({ submit }) => (
    <div>
      <TextField label="Username" form="login" field="username"/>
      <TextField label="Password" form="login" field="password"/>
      <FormError form="login"></FormError>
      <Button raised primary onClick={submit}>Login</Button>
    </div>
  )
);

/*





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
*/
