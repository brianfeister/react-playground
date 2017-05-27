'use strict';

import React from 'react';
import PropTypes from 'prop-types';

// Pass namespace slice to child component
// Pass slice to all components

// "slice" gets "namespace, type, and, path"

const getSlice({}, state) = () => {
  return { value, metadata, nsValue, nsMetadata }
};

const getActions(props) = () => {
  return { blah }
}







export default class Namespace extends React.Component {

  // pass down the slice to the component

  static propTypes = {
    type: PropTypes.oneOf(['form', 'ui', 'auth', 'resource', 'collection']),
    root: PropTypes.string,
    name: PropTypes.string
  };

  static childContextTypes = {
    namespace: {
      type: PropTypes.oneOf(['form', 'ui', 'auth', 'resource', 'collection']),
      root: PropTypes.string,
      name: PropTypes.string
    }
  };


  // Do not allow component to update. Namespaces are immutable.
  // TODO: Better forced immutability.
  shouldComponentUpdate() { return false; }

  getChildContext() {
    return {
      namespace: {
        type: this.props.type,
        root: this.props.root,
        name: this.props.name
      }
    };
  }

  render ({ children }) {
    return (
      <div>
        {
          children.map(child => React.cloneElement(child, {
            path
            slice: null,
            ...props
          }))
          children
        }
      </div>
    )
  )


};
