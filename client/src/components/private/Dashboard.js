import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link, BrowserRouter, Route, Redirect} from 'react-router-dom';
import { Switch } from 'react-router';
import {userLogOut} from '../../actions/registrationAndLoginActions';
import SwipeableRoutes from "react-swipeable-routes";
import FontIcon from 'material-ui/FontIcon';
import Guild from './guild/Guild';
import GuildMembers from './members/GuildMembers';
import GuildTeams from './teams/GuildTeams';
import Authorization from './Authorization';
import WelcomeBar from './WelcomeBar';
import TabNavigation from './TabNavigation';
import { withRouter } from 'react-router-dom';
//import {Tabs, Tab} from 'material-ui/Tabs';
import './Dashboard.css';

class Dashboard extends Component {

  constructor(props) {
    super(props);

    this.logOut = this.logOut.bind(this);
    this.tabChange = this.tabChange.bind(this);
  }
  tabChange(routePath){
    //this.props.history.push('routePath');
  }

  logOut(){
    this.props.dispatch(userLogOut());
  }
/*  componentDidMount(){
    if(this)
  }*/
//<TabNavigation currentTab={} />
        //  <SwipeableRoutes></SwipeableRoutes>
  render() {
    if(this.props.isAuthenticated){
      return (<div className="dashboard">
        <WelcomeBar user={this.props.activeUser} activeGuild={this.props.activeGuild} logOut={this.logOut} />
        <main className="main-content">
          <TabNavigation />
            {this.props.children && React.cloneElement(this.props.children, {
              activeUser: this.props.activeUser
            })}
        </main>
      </div>
      );
    }
    else if(!this.props.authorizationChecked){
      return (<Authorization />);
    }
    else{
      return (<Redirect to="/login" />);
    }
  }
}

const mapStateToProps = (state, props) => ({
  isAuthenticated: state.registrationAndLogin.isAuthenticated,
  authorizationChecked: state.registrationAndLogin.authorizationChecked,
  activeUser: state.registrationAndLogin.activeUser,
  activeGuild: state.registrationAndLogin.activeGuild
  //slideIndex: state.dashboard.slideIndex
});

export default withRouter(connect(mapStateToProps)(Dashboard));