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
import TabNavigation from './TabNavigation';
import './Dashboard.css';
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
      return (<div className="dashboard">
        <WelcomeBar user={this.props.activeUser.username} logOut={this.logOut} />
        <TabNavigation currentTab={} />
        <main className="main-content">
                <SwipeableViews
          index={props.slideIndex}
          onChangeIndex={props.tabChange}
        >
          <div>
            <h2 style={styles.headline}>Tabs with slide effect</h2>
            Swipe to see the next slide.<br />
          </div>
          <div style={styles.slide}>
            slide n°2
          </div>
          <div style={styles.slide}>
            slide n°3
          </div>
        </SwipeableViews>
        <Switch>
          <Route exact path='dashboard/members' component={GuildMembers} />
          <Route exact path='dashboard/teams' component={GuildTeams} />
          <Route path='/dashboard' component={Guild} />
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
  activeUser: state.registrationAndLogin.activeUser
});

export default connect(mapStateToProps)(Dashboard);