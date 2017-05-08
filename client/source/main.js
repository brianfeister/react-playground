'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import Index from '../../components/Index';

import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';

import test1 from '../../core/reducers/test1';

const store = createStore(test1);

const App = connect((state, props) => {
  console.log(state);
  return {
    s3: state
  }
}, dispatch => {
  return {
    onclick: () => dispatch({ type: 'TEST1_TOGGLE' })
  };
})(class extends React.Component {

  render () {
    console.log(this)
    return (
      <div onClick={ event => this.props.onclick() }>
        <span>{ this.props.s3 }</span>
        <span>HI</span>
      </div>
    )
  }

});

window.onload = () => {
  const II = Index();
  ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>,
    document.getElementById('main')
  )
};
