'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { AppContainer } from 'react-hot-loader'; // AppContainer is simply passthrough in production.
import { Provider } from 'react-redux';

import { MuiThemeProvider } from 'material-ui/styles';

import App from 'exp/core/App';
import reducers from 'exp/reducers';

const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());




ReactDOM.render((
  <AppContainer>
    <Provider store={store}>
      <MuiThemeProvider>
        <App/>
      </MuiThemeProvider>
    </Provider>
  </AppContainer>
), document.getElementById('main'));

// Hot Module Replacement API
if (module.hot) module.hot.accept();
