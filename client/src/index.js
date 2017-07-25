require('babel-polyfill');

import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import history from './history';
import store from './store';
import './index.css';
import {BrowserRouter, Route} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './components/App';
import injectTapEventPlugin from 'react-tap-event-plugin';
import 'typeface-roboto';

injectTapEventPlugin();

document.addEventListener('DOMContentLoaded', () => render(<Provider store={store}>
	  <MuiThemeProvider>
        <BrowserRouter history={history}>
          <div>
            <Route path="/" component={App}>
            </Route>
          </div>
        </BrowserRouter>
  	</MuiThemeProvider>
  </Provider>, 
  document.getElementById('root')));