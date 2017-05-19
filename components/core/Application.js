'use strict';

import React from 'react';

import { connect } from 'react-redux';

import Login from 'exp/components/core/Login';
import Portal from 'exp/components/core/Portal';

export default connect(state => {
  return { isLoggedIn: !!state.auth.document };
})(({ isLoggedIn }) => {
  if (isLoggedIn) return (<Portal/>);
  else return (<Login/>)
});
