'use strict';

import React from 'react';
import { Provider } from 'react-redux';

export default ({ store }) => (
  <Provider store={store}>
    <div>I am the application!</div>
  </Provider>
)

