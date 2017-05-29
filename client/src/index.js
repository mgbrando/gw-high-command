require('babel-polyfill');

import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import history from './history';
import store from './store';
import './index.css';
import {BrowserRouter, Route} from 'react-router-dom';
import { Switch } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './components/App';
import RankSelection from './components/rankselection/RankSelection';
import MemberRegistration from './components/rankselection/MemberRegistration';
import LeaderRegistration from './components/rankselection/LeaderRegistration';
import LeaderLogin from './components/rankselection/LeaderLogin';
import Dashboard from './components/private/Dashboard';
import Guild from './components/private/guild/Guild';
import GuildMembers from './components/private/members/GuildMembers';
import GuildTeams from './components/private/teams/GuildTeams';
import Authorization from './components/Authorization';

import injectTapEventPlugin from 'react-tap-event-plugin';
//import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
//import {Router, Route, browserHistory} from 'react-router';
//import Root from './components/Root';
import 'typeface-roboto';
//import { browserHistory } from 'react-router';
//export const history = browserHistory;
console.log('index.js: '+history);

injectTapEventPlugin();
//hashHistory vs browserHistory
//import ContactListContainer from './components/contact-list-container';
//console.log(store.getState());
//ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
/*              <Route component={RankSelection}/>
              <Route path='/registration/:rank' component={MemberRegistration}></Route>
              <Route path="/login" component={LeaderLogin}></Route>
              <Route component={Authorization}>
                <Route path='/dashboard' component={Dashboard}>
                  <Route path="/guild" component={Guild}></Route>
                  <Route path="/members" component={GuildMembers}></Route>
                  <Route path="/teams" component={GuildTeams}></Route>
                </Route>
              </Route>*/
document.addEventListener('DOMContentLoaded', () => render(  <Provider store={store}>
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