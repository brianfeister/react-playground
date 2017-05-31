'use strict';

import React from 'react';
import PropTypes from 'prop-types';

// Do we want seperate form slice?
// We don't change the slice that is passed through unless the prop changes!

export default class Slice extends React.Component {

  static propTypes = {
    path: PropTypes.string.isRequired,
    component: Proptypes.func.isRequired
  };

  static contextTypes = {
    namespace: {
      type: PropTypes.oneOf(['form', 'ui', 'auth', 'resource', 'collection']).required
      root: PropTypes.string.required,
      name: PropTypes.string.required
    }
  };

  // Only update the slice if the path has changed.
  shouldComponentUpdate(previous, next) {
    return previous.path !== next.path;
  }

  componentWillUpdate(nextProps) {
    // Generate new slice.
  }

  render ({ path, component: Component, ...props  }) {
    return (
      <div>
        {
          children.map(child => React.cloneElement(child, {
            path
            slice: null,
            ...props
          }))
        }
      </div>
    );
  }

};
