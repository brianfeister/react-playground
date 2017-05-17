'use strict';

import React from 'react';
import * as types from './types';
import Unknown from './Unknown';


const Component = ({ type, options }) => {
  const Type = types[type] || Unknown;
  return (<Type options={options}/>)
};


export default Component;
