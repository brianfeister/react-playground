'use strict';

import React from 'react';



import { Field } from 'redux-form';

import { TextField as MaterialTextField } from 'material-ui';


const Renderer = ({ input, meta, options }) => (
  <MaterialTextField
    label={options.label}
    onChange={input.onChange}
    />
);

const Input = ({ options }) => (
  <Field
    name={options.key}
    component={Renderer}
    options={options}
    />
);



export default Input;
