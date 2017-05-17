'use strict';

import {reduxForm} from 'redux-form';

const forms = {};

export default ({ name, children, ...other }) => {
  if (!forms[name]) forms[name] = reduxForm({ form: name })(() => (<div>{children}</div>));
  const Form = forms[name];
  return <Form/>;
};
