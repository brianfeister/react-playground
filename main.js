'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from 'redux';
import { AppContainer } from 'react-hot-loader'; // AppContainer is simply passthrough in production.

import App from 'core/App';
import reducers from 'reducers';


const store = createStore(reducers);
import { Provider } from 'react-redux';

import Theme from 'material-ui/styles/MuiThemeProvider';

ReactDOM.render((
  <AppContainer>
    <Provider store={store}>
      <Theme>
        <App/>
      </Theme>
    </Provider>
  </AppContainer>
), document.getElementById('main'));

// Hot Module Replacement API
if (module.hot) module.hot.accept();
