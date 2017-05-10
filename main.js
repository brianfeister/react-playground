import React from 'react';
import ReactDOM from 'react-dom';

// AppContainer is simply passthrough in production.
import { AppContainer } from 'react-hot-loader';
import App from './core/components/App';

import { createStore } from 'redux';
import reducers from './core/reducers';

const store = createStore(reducers);

ReactDOM.render((
  <AppContainer>
    <App store={store} />
  </AppContainer>
), document.getElementById('main'));

// Hot Module Replacement API
if (module.hot) module.hot.accept();
