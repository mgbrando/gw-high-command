import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Router, Route, IndexRoute, browserHistory, Redirect } from 'react-router';
import * as actions from '../actions/registrationAndLoginActions';
import Subheader from 'material-ui/Subheader';
import {List, ListItem} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import 'typeface-roboto';


class Authorization extends Component {
	constructor(props) {
    	super(props);
  	}
  componentWillMount(){
  }

	render(){
    if(this.props.isAuthenticated){
        return (<Redirect to="/dashboard"/>);
    }
    else if(!this.props.authorizationChecked){
      this.props.dispatch(actions.checkAuthentication());
    }
    else{
        return(<Redirect to="/login"/>);
    }
	}
}
const mapStateToProps = (state, props) => ({
    isAuthenticated: state.registrationAndLogin.isAuthenticated,
    authorizationChecked: state.registrationAndLogin.authorizationChecked
});

export default connect(mapStateToProps)(Authorization);