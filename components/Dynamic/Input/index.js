'use strict';

import React from 'react';

export default ({ key, type, config, state }) => (
  <div>
    <div>
      <label>{ config.label }</label>
    </div>
    <div>
      <input type="text"></input>
    </div>
  </div>
);
