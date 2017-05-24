'use strict';

import React from 'react';
import { Field } from 'redux-form';

import TextField from 'exp/components/basic/TextField';
import ErrorText from 'exp/components/basic/ErrorText';

const FormTextField = ({ input, meta, ...other }) => (
  <div>
    <TextField
      name={input.name}
      error={Boolean(meta.error || meta.invalid)}
      onChange={input.onChange}
      onBlur={input.onBlur}
      onFocus={input.onFocus}
      value={input.value}
      disabled={meta.submitting}
      {...other}
      />
    <ErrorText enabled={!!meta.error} message={meta.error}/>
  </div>
);


export default (props) => (<Field component={FormTextField} {...props} />)
