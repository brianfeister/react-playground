'use strict';

/*import React from 'react';
import { Button } from 'material-ui';

import Demo0 from 'exp/demos/no-state';
import Demo1 from 'exp/demos/homegrown/test';

const demos = [(<Demo0/>),(<Demo1/>)];


export default class Portal extends React.Component {

  constructor (props) {
    super(props);
    this.state = { demo: 1 };
  }

  render () {
    console.log('REDNERING');
    console.log(this.state);

    return (
      <div>
        {
          demos.map((x, i) => (
            <Button
              key={i}
              onClick={() => this.setState({ demo: i })}
              primary
              raised
              style={{ margin: '8px', display: 'inline-block' }}
              >
              {`Demo ${i}`}
            </Button>
          ))
        }
      {demos[this.state.demo]}
      </div>
    )
  }


}
*/

export default () => (
  <div>HELLO!</div>
);
