'use strict';

import React from 'react';

export default ({ manifest }) => {
  console.log(manifest);

  return (
    <div>
      { manifest.map(child => {
        console.log(child);
        return (<div>TEST</div>);
      })}
    </div>
  )
};
