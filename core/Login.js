'use strict';

import React from 'react';
import { PropTypes } from 'react';
import { connect } from 'react-redux';

import Login from 'components/Login';

export default connect(state => {
  return {
    isLoggedIn: !!state.auth.document
  }
}, () => {
  return {};
})(Login);
