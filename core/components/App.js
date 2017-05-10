import React from 'react';
import { Provider } from 'react-redux';

import OtherComponent from './OtherComponent';
import OtherComponent2 from './OtherComponent2';

export default () => (
  <div>
    I am the application! TEST 3
    <OtherComponent />
    <OtherComponent2 />
  </div>
);
