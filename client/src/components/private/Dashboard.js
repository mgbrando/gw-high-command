import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link, BrowserRouter, Route, Redirect} from 'react-router-dom';
import { Switch } from 'react-router';
import {userLogOut} from '../../actions/registrationAndLoginActions';
/*import GuildSelectionForm from './GuildSelectionForm';
import SectionNavigation from './SectionNavigation';
import GuildList from './GuildList';
import LeaderLoginCredentials from './LeaderLoginCredentials';
import UserNameAndPasswordForm from './UserNameAndPasswordForm';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';*/
//import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import Guild from './guild/Guild';
import GuildMembers from './members/GuildMembers';
import GuildTeams from './teams/GuildTeams';
import Authorization from './Authorization';
import WelcomeBar from './WelcomeBar';
//import '../RankSelection.css';
//<Route exact path='dashboard/guild' component={Guild}/>
//<h2>Welcome, {this.props.activeUser.username}!</h2>
class Dashboard extends Component {

  constructor(props) {
    super(props);

    this.logOut = this.logOut.bind(this);
  }

  logOut(){
    this.props.dispatch(userLogOut());
  }

  render() {
    if(this.props.isAuthenticated){
      return(<div>
        <WelcomeBar user={this.props.activeUser.username} logOut={this.logOut}/>
        <Switch>
          <Route exact path='dashboard/members' component={GuildMembers}/>
          <Route exact path='dashboard/teams' component={GuildTeams}/>
          <Route path='/dashboard' component={Guild} />
        </Switch>
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
  activeUser: state.registrationAndLogin.activeUser
});

export default connect(mapStateToProps)(Dashboard);