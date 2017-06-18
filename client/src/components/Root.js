import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import {BrowserRouter, Route} from 'react-router-dom';
import { Switch } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './App';
import RankSelection from './rankselection/RankSelection';
import MemberRegistration from './rankselection/MemberRegistration';
import LeaderRegistration from './rankselection/LeaderRegistration';
import LeaderLogin from './rankselection/LeaderLogin';
import Dashboard from './private/Dashboard';
import Guild from './private/guild/Guild';
import GuildMembers from './private/members/GuildMembers';
import GuildTeams from './private/teams/GuildTeams';
import Authorization from './Authorization';
import { instanceOf } from 'prop-types';
import { CookiesProvider, withCookies, Cookies } from 'react-cookie';
//import {ConnectedRouter} from 'react-router-redux';
//import {withRouter} from 'react-router';

//{ /* ConnectedRouter will use the store from Provider automatically */ }
const Root = ({store, history}) => (
  <Provider store={store}>
	  <MuiThemeProvider>
        <BrowserRouter history={history}>
          <div>
            <Route path="/" component={App}>
              <Route component={RankSelection}/>
              <Route path='/registration/:rank' component={MemberRegistration}></Route>
              <Route path="/login" component={LeaderLogin}></Route>
              <Route component={Authorization}>
                <Route path='/dashboard' component={Dashboard} />
              </Route>
            </Route>
          </div>
        </BrowserRouter>
  	</MuiThemeProvider>
  </Provider>
);
/*<Route path="/leader-registration" component={LeaderRegistration}></Route>*/
/*    					<Route path="/apikey-submission" component={KeySubmissionForm}></Route>
    					<Route path="/guilds-selection" component={KeySubmissionForm}></Route>*/
Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
  //cookies: instanceOf(Cookies).isRequired
};

export default Root;