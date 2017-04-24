require('babel-polyfill');

import React from 'react';
import {render} from 'react-dom';
//import {Provider} from 'react-redux';
//import App from './components/App';
import store from './store';
import './index.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
//import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
//import {Router, Route, browserHistory} from 'react-router';
import Root from './components/Root'

injectTapEventPlugin();
//hashHistory vs browserHistory
//import ContactListContainer from './components/contact-list-container';

//ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
render(<Root store={store} />, document.getElementById('root'));