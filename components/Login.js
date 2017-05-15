'use strict';

import React from 'react';
import Input from 'material-ui/Input';
import InputLabel from 'material-ui/Input/InputLabel';
import FormControl from 'material-ui/Form/FormControl';

import Dynamic from 'components/Dynamic';

const config = {
  children: [
    {
      key: 'username',
      type: 'input',
      config: {
        label: 'Test'
      }
    },
    {
      key: 'password',
      type: 'googlamesh'
    }

  ]
};

export default () => {
  return (<Dynamic config={config}></Dynamic>)
}

/*
export default ({ isLoggedIn, onPropertyChange }) => {
  if (isLoggedIn) {
    return (<div>Logged IN</div>)
  } else {
    return (
      <div>
        <FormControl>
          <InputLabel
            htmlFor="username"
            required={true}>
            Username
          </InputLabel>
          <Input
            id="name"
            onChange={(event, a, b) => { console.log(event, event.persist(), a, b); }}
            />
        </FormControl>
        <FormControl>
          <InputLabel
            required={true}>
            Password
          </InputLabel>
          <Input
            value="test"
            type="password"
            />
        </FormControl>
      </div>
    )

  }
};
*/
