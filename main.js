import React from 'react';
import ReactDOM from 'react-dom';
import { Helmet } from 'react-helmet';

// AppContainer is simply passthrough in production.
import { AppContainer } from 'react-hot-loader';
import App from './core/components/App';

import { createStore } from 'redux';
import reducers from './core/reducers';

const store = createStore(reducers);

const element = (
  <AppContainer>
    <div>Test</div>

    <App store={store} />
  </AppContainer>
);

ReactDOM.render(element, document.getElementById('main'));

// Hot Module Replacement API
if (module.hot) module.hot.accept();
