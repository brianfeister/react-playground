'use strict';

import { Provider as Redux } from 'react-redux';

import store from 'store';


export default ({ children }) => <Redux store={store}>{ children }</Redux>;
