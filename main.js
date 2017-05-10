import React from 'react';
import ReactDOM from 'react-dom';

import { AppContainer } from 'react-hot-loader';
import App from './core/components/App';

import { createStore } from 'redux';
import reducers from './core/reducers';

const store = createStore(reducers);

const renderApp = (Component) => {
  const element = (
    <AppContainer>
      <Component store={store} />
    </AppContainer>
  );
  ReactDOM.render(element, document.getElementById('main'));
};

renderApp(App);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept();
}
