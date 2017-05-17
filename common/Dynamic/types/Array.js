'use strict';

import React from 'react';

import Resolver from '../Resolver';

export default ({ options }) => (
  <div>
    {
      options.children.map(({ type, options }, i) => (
        <Resolver
          key={i}
          type={type}
          options={options}
          />
      ))

    }
  </div>
);
