'use strict';

import generateConnector from './generateConnector';

export default generateConnector(
  ({ namespace, path }, state) => {},
  ({ namespace }, state) => {},
  ({ namespace, path }) => {},
  ({ namespace }) => {}
);
