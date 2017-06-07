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
        <WelcomeBar user={this.props.activeUser.username} logOut={this.logOut} />

        <main className="main-content">

            <Switch>
              <Route exact path='/dashboard/members' component={GuildMembers} />
              <Route exact path='/dashboard/teams' component={GuildTeams} />
              <Route exact path='/dashboard/guild' component={Guild} />
              <Route path='/dashboard' render={() => (<Redirect to="/dashboard/guild" />)} />
            </Switch>
          
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
  slideIndex: state.dashboard.slideIndex
});

export default connect(mapStateToProps)(Dashboard);