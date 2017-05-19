'use strict';

import React from 'react';


export default ({ message, enabled }) => {
  const style = {};
  style.color = 'red';
  style['font-size'] = '10px';
  style['visibility'] = enabled ? 'visible' : 'hidden';
  return (
    <div>
      <span style={style}>{message}</span>
    </div>
  );
}
