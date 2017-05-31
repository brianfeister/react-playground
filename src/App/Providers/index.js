'use strict';

import Store from './Store';
import Theme from './Theme';
import HotLoader from './HotLoader';


export default ({ children }) => (
  <Store>
    <HotLoader>
      <Theme>
        { children }
      </Theme>
    </HotLoader>
  </Store>
);
