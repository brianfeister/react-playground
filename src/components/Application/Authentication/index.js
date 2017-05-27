'use strict';

import { connect } from 'react-redux';

import login from 'actions/forms/authentication/login';

const submit = login('loginForm');

export default connect(
  () => {
    return {};
  },
  (dispatch, props) => {
    return {
      submit: () => dispatch(submit)
    };
  }
)(({ children, submit }) => (
  <div>
    <div>
      <label>Username</label>
      <input/>
    </div>
    <div>
      <label>Password</label>
      <input/>
    </div>
    <button onClick={submit}>Login</button>
  </div>
));
