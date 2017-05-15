'use struct';

import React from 'react';

import Input from './Input'

const types = {};
types.input = Input;
types.unknown = () => (<div>IT DIDNT WORK</div>);

// Mapped properties:
// dirty/clean
// valid/invalid
// onchange



// onblur/onfocus



export default class Group extends React.Component {

  constructor (props) {
    super(props);
    this.state = {};
    this.state.clean = true;
    this.state.valid = true;
    this.state.active = false;
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }


  render () {


    config.children.map(config_ => {
        const Type = types[config_.type] || types.unknown;
        return (
          <Type
            options={options_}

            onblur={onblur}
            onfocus={onfocus}

            ondirty={ondirty}
            onclean={onclean}

            onchange={onchange}

            onvalid={onvalid}
            oninvalid={oninvalid}

            ></Type>);
      })

  }

}


export default ({ config, values, onvalid, oninvalid }) => {



  if (!Array.isArray(config.children)) return (<div>Group Requires children object</div>);
  if (shouldHide(values, config.options.hide)) return ();



  (
  <div>
    {


    }
    </div>
);
