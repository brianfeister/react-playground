'use strict';

import {reduxForm} from 'redux-form';

import Resolver from './Resolver';

import React from 'react';


const cache = new Map();

const Dynamic = ({

  // The config for the root field of the form.
  config,

  // See redux-form configuration options. We should wrap some of
  // these to suit our specific purposes.
  ...other

}) => {

  const Form = reduxForm({

    // Pass the other options through to redux-form.
    ...other

  })(() => (

    // Hand off control to the resolver. The passed in config should
    // resolve directly to a field type.
    <Resolver type={config.type} options={config.options}/>

  ));

  return <Form/>

};


export default Dynamic;
