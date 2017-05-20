require('babel-polyfill');

import React from 'react';
import {render} from 'react-dom';
//import {Provider} from 'react-redux';
//import App from './components/App';
import store, {history} from './store';
import './index.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
//import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
//import {Router, Route, browserHistory} from 'react-router';
import Root from './components/Root';
import 'typeface-roboto';
//import { browserHistory } from 'react-router';
//export const history = browserHistory;
console.log('index.js: '+history);
injectTapEventPlugin();
//hashHistory vs browserHistory
//import ContactListContainer from './components/contact-list-container';
console.log(store.getState());
//ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
render(<Root store={store} history={history} />, document.getElementById('root'));