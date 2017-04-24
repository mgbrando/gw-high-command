import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './App';
import MemberRegistration from './rankselection/MemberRegistration';
import LeaderRegistration from './rankselection/LeaderRegistration';
import LeaderLogin from './rankselection/LeaderLogin';

const Root = ({store}) => (
	<MuiThemeProvider>	
  		<Provider store={store}>
  			<Router history={browserHistory}>
    			<Route path="/" component={App}>
    				<Route path="/member-registration" component={MemberRegistration}></Route>
    				<Route path="/leader-registration" component={LeaderRegistration}></Route>
    				<Route path="/login" component={LeaderLogin}></Route>
    			</Route>
  			</Router>
  		</Provider>
  	</MuiThemeProvider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;