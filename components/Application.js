'use strict';

import SwitchGenerator from 'exp/components/Switch';
import Input from 'exp/components/Input';
import Form from 'exp/components/Form';

import { connect } from 'react-redux';

const Login = connect(() => {
}, () => {


})(() => (
  <Form name="login">
    <Input name="username" label="Username"/>
    <Input name="password" label="Password"/>
  </Form>
);
const Portal = () => (<div>Portal</div>);

const Switch = SwitchGenerator(Login, Portal);


export default connect(state => {
  return { value: !!state.auth.document.token };
})(Switch);
