'use strict';

import React from 'react';

import Input from './Input'

const types = {};
types.input = Input;
types.unknown = () => (<div>IT DIDNT WORK</div>);


export default ({ key, type, config, state }) => (
  <div>
    {
      config.children.map(child => {
        const Type = types[child.type] || types.unknown;
        return (<Type key={child.key} type={child.type} config={child.config} state={child.state}></Type>);
      })
    }
  </div>
)
