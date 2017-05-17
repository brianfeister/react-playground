import React from 'react';


import Dynamic from 'exp/common/Dynamic';

const config = {
  type: 'Array',
  options: {
    children: [
      {
        type: 'Input',
        options: {
          key: 'login.username',
          label: 'Username'
        }
      },
      {
        type: 'Input',
        options: {
          key: 'login.password',
          label: 'Password'
        }
      }
    ]
  }
};


export default () => (
  <div>
    <Dynamic form="test1" config={config}/>
  </div>
);
