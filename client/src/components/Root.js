import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './App';
import RankSelection from './rankselection/RankSelection';
import MemberRegistration from './rankselection/MemberRegistration';
import LeaderRegistration from './rankselection/LeaderRegistration';
import LeaderLogin from './rankselection/LeaderLogin';

const Root = ({store}) => (
	<MuiThemeProvider>
  		<Provider store={store}>
  			<Router history={browserHistory}>
    			<Route path="/" component={App}>
    				<IndexRoute component={RankSelection}/>
    				<Route path='/registration/:rank' component={MemberRegistration}></Route>
    				<Route path="/login" component={LeaderLogin}></Route>
    			</Route>
  			</Router>
  		</Provider>
  	</MuiThemeProvider>
);
/*<Route path="/leader-registration" component={LeaderRegistration}></Route>*/
/*    					<Route path="/apikey-submission" component={KeySubmissionForm}></Route>
    					<Route path="/guilds-selection" component={KeySubmissionForm}></Route>*/
Root.propTypes = {
  store: PropTypes.object.isRequired
};

export default Root;