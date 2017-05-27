'use strict';

import React from 'react';

import { reduxForm } from 'redux-form';
import { stopSubmit } from 'redux-form';
import { SubmissionError } from 'redux-form';

import TextField from 'exp/components/fields/TextField';
import Button from 'exp/components/basic/Button';
import ErrorText from 'exp/components/basic/ErrorText';


export default reduxForm({
  form: 'login',
  onChange: (values, dispatch, props) => {

  },
  onSubmit: (test, other) => {
    console.log(test, other);
    return new Promise((resolve, reject) => {
      setTimeout(() => reject(new SubmissionError({
        _error: 'Nope',
        username: 'Definitely not right.'
      })), 3000);
    });
    console.log('ON SUBMIT', test);
  },
  onSubmitSuccess: (result, dispatch, props) => {

    // Reset the entire form. Likely unecessary security.
    props.reset();

  },
  onSubmitFail: (errors, dispatch, submitError, props) => {

    // Reset the password when submission fails.
    props.change('password', '');

  }
})(({
  submitting,
  handleSubmit,
  error,
  touched,
  dirty
}) => (
  <div>
    <TextField name="username" label="Username" />
    <TextField name="password" label="Password" />
    <ErrorText enabled={!!(error && dirty)} message={error}/>
    <Button onClick={handleSubmit} disabled={!!(!dirty || submitting)} raised primary >Login</Button>
  </div>
));
