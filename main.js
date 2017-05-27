'use strict';

import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

import Application from 'components/Application';

window.React = React;

// Entry point for entire application.
ReactDOM.render(<Application/>, document.getElementById('main'));

// Hot Module Replacement API
if (module.hot) module.hot.accept();
