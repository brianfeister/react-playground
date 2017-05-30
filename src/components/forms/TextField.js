'use strict';
import { connect } from 'react-redux';

import TextField from 'material-ui/TextField';

import { getFieldValue } from 'state/forms';
import { setFieldValue } from 'state/forms';

export default connect(
  (state, { form, field }) => {
    return {
      value: getFieldValue(form, field, state) || ''
    };
  },
  (dispatch, { form, field }) => {
    return {
      onChange: event => dispatch(
        setFieldValue(form, field, event.target.value)
      )
    }
  }
)(({ label, value, onChange }) => (
  <TextField
    label={label}
    value={value}
    onChange={onChange}
    />
));
