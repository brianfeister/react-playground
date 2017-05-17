'use strict';

import React from 'react';

import { PropTypes } from 'react';
import { connect } from 'react-redux';

import Login from 'components/Login';

import { reduxForm } from 'redux-form';
import { Field } from 'redux-form';

import { TextField as MaterialTextField } from 'material-ui';


const ExpTextField = ({
  name,
  label,
  input
}) => (
  <MaterialTextField
    name={name}
    label={label}
    onChange={input.onChange}
    value={input.value}
    />
);


const MyForm = props => (
  <form>
    <div>
      <Field
        name="username"
        label="Username"
        component={ExpTextField}
        />
    </div>
    <div>
      <Field
        name="password"
        label="Password"
        component={ExpTextField}
        type="password"
        />
    </div>
  </form>
);


export default reduxForm({
  form: 'login'
})(MyForm);
