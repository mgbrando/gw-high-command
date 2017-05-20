import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions/registrationAndLoginActions';
import Subheader from 'material-ui/Subheader';
import {List, ListItem} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import 'typeface-roboto';
import './RankSelection.css';


class Authorization extends Component {
	constructor(props) {
    	super(props);
  	}
  componentWillReceiveProps(nextProps)
      if(nextProps.isAuthenticated){
        //redirect to guilds route of dashboard
      }
      else{
        this.props.dispatch(actions.checkAuthentication());
      }
    }

	render(){

	}
}
const mapStateToProps = (state, props) => ({
    isAuthenticated: state.registrationAndLogin.isAuthenticated
});

export default connect(mapStateToProps)(Authorization);