'use strict';

import React from 'react';

import Input from './Input'

const types = {};
types.input = Input;
type.default = () => (<div>IT DIDNT WORK</div>);


// Dirty
// Touched
// Valid


export default ({ config }) => (
  <div>
    {
      config.items.map(config_ => {
        const Type = mapping.get(type) || mapping.get('default');
        return (<Type config={itemConfig}></Type>);
      })
    }
    </div>
);
