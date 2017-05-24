'use strict';

import React from 'react';
import PropTypes from 'prop-types';

export default class Namespace extends React.Component {

  static childContextTypes = {
    uiStateNamespacer: PropTypes.string
  };

  getChildContext() {
    return {
      uiStateNamespace: this.props.name
    }
  }

  render ({ children }) {
    return (<div>{children}</div>);
  }

};
