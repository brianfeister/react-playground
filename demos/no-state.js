'use strict';

import React from 'react';

import TextField from 'exp/components/basic/TextField';
import ErrorText from 'exp/components/basic/ErrorText';
import Button from 'exp/components/basic/Button';



export default class extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      username: { active: false, touched: false, error: null, value: '' },
      password: { active: false, touched: false, error: null, value: '' },
      form: { valid: false, error: null, submitting: false }
    }
  }

  submit () {
    console.log('SUBMITTING!');
    this.setState({
      form: {
        ...this.state.form,
        submitting: true
      }
    });
    setTimeout(() => {
      this.setState({
        form: {
          ...this.state.form,
          submitting: false,
          error: 'The username or password is wrong!.',
          touched: false
        }
      });
    }, 3000);

  }

  onFieldFocus (name) {
    this.setState({
      ...this.state,
      [name]: {
        ...this.state[name],
        active: true,
        error: null
      }
    });
  }

  onFieldBlur (name) {
    this.setState({
      ...this.state,
      [name]: {
        ...this.state[name],
        active: false,
        touched: true // Touch on blur?
      },
      form: {
        ...this.state.form,
        error: null // Clear form error on change?
      }

    });
    setTimeout(() => this.validate());
  }

  onFieldChange (name, value) {
    this.setState({
      [name]: {
        ...this.state[name],
        value: value,
        error: null // Clear field error on change?
      }
    });
  }


  validate () {
    const state = { ...this.state, form: { ...this.state.form, valid: true }}; // This is a shitty way to do this.
    const { username, password } = this.state;
    if (username.touched) {
      if (!username.value) {
        state.username = { ...this.state.username, error: 'Please enter a username.' };
        state.form.valid = false;
      }
    }
    if (password.touched) {
      if (!password.value) {
        state.password = { ...this.state.password, error: 'Please enter a password.' };
        state.form.valid = false;
      } else if (password.value.length < 5) {
        state.password = { ...this.state.password, error: 'Thats a shit password mate.' };
        state.form.valid = false;
      }
    }
    this.setState(state);
  }



  render () {
    const { username, password, form } = this.state;
    console.log(this.state);
    return (
      <div>
        <TextField
          label="username"
          value={username.value}
          onChange={event => this.onFieldChange('username', event.target.value)}
          onBlur={()=>this.onFieldBlur('username')}
          onFocus={()=>this.onFieldFocus('username')}
          />
        <ErrorText enabled={!!(username.error)} message={username.error}/>
        <TextField
          label="Password"
          value={password.value}
          onChange={event => this.onFieldChange('password', event.target.value)}
          onBlur={()=>this.onFieldBlur('password')}
          onFocus={()=>this.onFieldFocus('password')}
          />
        <ErrorText enabled={!!(password.error)} message={password.error}/>
        <Button onClick={() => this.submit()} primary raised disabled={form.submitting || !(form.valid)} >Login</Button>
        <ErrorText enabled={!!(form.error)} message={form.error}/>
      </div>

    );

  }

}
