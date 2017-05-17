'use strict';

import { Field } from 'redux-form';
import { TextField } from 'material-ui';

const MaterialTextField = ({ label, input, meta }) => {
  console.log(label);
  console.log(input);
  return (

  <TextField
    name={input.name}
    label={label}
    onChange={input.onChange}
    onBlur={input.onBlur}
    onFocus={input.onFocus}
    value={input.value}
    type="text"
    />
  );
}

export default  ({
  name,
  label,
  format,
  normalize,
  onBlur,
  onChange,
  onDragStart,
  onDragStop,
  onDrop,
  onFocus,
  parse,
  validate,
  warn,
}) => {
  console.log('----', name);
  return (
  <Field

    // Passthrough Properties
    label={label}

    // Redux-Form Properties
    name={name}
    component={MaterialTextField}
    format={format}
    normalize={normalize}
    onBlur={onBlur}
    onChange={onChange}
    onDragStart={onDragStart}
    onDragStop={onDragStop}
    onDrop={onDrop}
    onFocus={onFocus}
    parse={parse}
    validate={validate}
    warn={warn}


    />);
}
