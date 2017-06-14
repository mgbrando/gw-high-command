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
      const routes = [(<Route exact path='/dashboard/guild' render={() => <Guild activeUser={this.props.activeUser} />} key={0} />),
                      (<Route exact path='/dashboard/members' render={() => <GuildMembers activeUser={this.props.activeUser} />} key={1} />),
                      (<Route exact path='/dashboard/teams' render={() => <GuildTeams activeUser={this.props.activeUser}  activeGuild={this.props.activeGuild} />} key={2} />)];
      return (<div className="dashboard">
        <WelcomeBar user={this.props.activeUser} activeGuild={this.props.activeGuild} logOut={this.logOut} />
        <main className="main-content">
          <Route exact path='/dashboard' render={() => (<Redirect to="/dashboard/guild" />)} />
          <TabNavigation routes={routes} />
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

export default connect(mapStateToProps)(Dashboard);