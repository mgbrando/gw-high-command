import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
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
import {ConnectedRouter} from 'react-router-redux';
//import {withRouter} from 'react-router';

//{ /* ConnectedRouter will use the store from Provider automatically */ }
const Root = ({store, history}) => (
	<MuiThemeProvider>
  		<Provider store={store}>
  			<ConnectedRouter history={history}>
    			<Route path="/" component={App}>
    				<IndexRoute component={RankSelection}/>
    				<Route path='/registration/:rank' component={MemberRegistration}></Route>
    				<Route path="/login" component={LeaderLogin}></Route>
            <Route component={Authorization}>
              <Route path='/dashboard' component={Dashboard}>
                <Route path="/guild" component={Guild}></Route>
                <Route path="/members" component={GuildMembers}></Route>
                <Route path="/teams" component={GuildTeams}></Route>
              </Route>
            </Route>
    			</Route>
  			</ConnectedRouter>
  		</Provider>
  	</MuiThemeProvider>
);
/*<Route path="/leader-registration" component={LeaderRegistration}></Route>*/
/*    					<Route path="/apikey-submission" component={KeySubmissionForm}></Route>
    					<Route path="/guilds-selection" component={KeySubmissionForm}></Route>*/
Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default Root;