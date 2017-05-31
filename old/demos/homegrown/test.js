'use strict';

import { connect } from 'react-redux';

import * as slicers from './state/slicers';
import * as actions from './state/actions';


export default connect((state, { namespace }) => ({
  username: slicers.getValue({ namespace, path: 'username', state }),
  password: slicers.getValue({ namespace, path: 'password', state })
}), dispatch => ({
  submit: () => {},
  prepit: () => dispatch(actions.set({
    namespace: 'default',
    value: { text1: 'TEXT1', text2: 'TEXT2' }
  })),
  swapit: () => dispatch(actions.swap({
    namespace: 'default',
    source: 'text1',
    target: 'text2'
  }))
}))(({ text1, text2, prepit, swapit }) => {
  return (
    <div>
      <div><button onClick={add}>ADD</button></div>


      <div onClick={prepit}>{text1}</div>
      <div><button onClick={add}>ADD</button></div>

      <div onClick={swapit}>{text2}</div>
    </div>
  );
});



