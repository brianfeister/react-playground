'use strict';

import Provider from './Provider';
import Authentication from './Authentication';
import Portal from './Portal';


export default () => (
  <Provider>
    <Authentication>
      <Portal/>
    </Authentication>
  </Provider>
);
