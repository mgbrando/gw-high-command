import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import {BrowserRouter, Route, Redirect} from 'react-router-dom';
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
                <Route path='/dashboard' component={Dashboard}>
                  <Redirect from="/dashboard" to="/dashboard/guild" />
                  <Switch>
                  <Route path="/" render={() => <Redirect to="/dashboard/guild" />}></Route>
                  <Route exact path="dashboard/guild" render={(props) => { console.log(...props); return(<Guild {...props} />);}}></Route>
                  <Route exact path="/members" render={(props) => <GuildMembers {...props} />} >
                    <Route path="/:member" component={GuildMember} />
                  </Route>
                  <Route exact path="/teams" render={(props) => <GuildTeams {...props} />}></Route>
                  <Route path="*" render={() => <Guild />}></Route>
                  </Switch>
                </Route>
              </Route>
            </Route>
          </div>
        </BrowserRouter>
  	</MuiThemeProvider>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
  //cookies: instanceOf(Cookies).isRequired
};

export default Root;