'use strict';

import Providers from './Providers';
import Auth from './Auth';
import Portal from './Portal';


export default () => (
  <Providers>
    <Auth>
      <Portal/>
    </Auth>
  </Providers>
);
