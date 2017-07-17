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
import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import FlatButton from 'material-ui/FlatButton';
import NavigationArrowDropDown from 'material-ui/svg-icons/navigation/arrow-drop-down';
import SideBar from './sidebar/SideBar'; 
//import {Tabs, Tab} from 'material-ui/Tabs';
import './Dashboard.css';

class Dashboard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      sidePanel: {open: false, section: "Log"}
    }

    this.togglePanel = this.togglePanel.bind(this);
    this.logOut = this.logOut.bind(this);
    this.tabChange = this.tabChange.bind(this);
    this.handleChangeSingle = this.handleChangeSingle.bind(this);
  }

  tabChange(routePath){
    //this.props.history.push('routePath');
  }
  handleChangeSingle(event, value){
    //console.log(this.state.valueSingle);
    this.setState({sidePanel: Object.assign({}, this.state.sidePanel, {section: value})});
  }
  logOut(){
    this.props.dispatch(userLogOut());
  }
  togglePanel(){
    if(this.state.sidePanel.open){
      this.setState({sidePanel: Object.assign({}, this.state.sidePanel, {open: false})});
    }
    else{
      this.setState({sidePanel: Object.assign({}, this.state.sidePanel, {open: true})});
    }  
  }
/*  componentDidMount(){
    if(this)
  }*/
//<TabNavigation currentTab={} />
        //  <SwipeableRoutes></SwipeableRoutes>
  render() {

    if(this.props.isAuthenticated){
      let currentGuild;
      const pathGuild = this.props.location.pathname.split('/')[3];
      const activeSetGuild = this.props.activeUserGuilds.filter(guild => {
        return guild.id === this.props.activeGuild;
      });
      if(this.props.location.pathname === '/dashboard' || (activeSetGuild[0].name === pathGuild)){
        /*currentGuild = this.props.activeUserGuilds.filter((guild) => {
          return guild.id === this.props.activeGuild;
        });*/
        currentGuild = encodeURIComponent(activeSetGuild[0].name);
      }
      else{
        /*const pathArray = this.props.location.pathname.split('/');
        console.log(pathArray[3]);*/
        currentGuild = encodeURIComponent(pathGuild);
      }
      /*if(this.props.match.params.guildName){
        currentGuild = this.props.match.params.guildName;
      }
      else{
        currentGuild = this.props.activeUserGuilds.filter((guild) => {
          return guild.id === this.props.activeGuild;
        });
        currentGuild = encodeURIComponent(currentGuild[0].name);
      }*/
      console.log(this.props.match.params);
      const routes = [(<Route path='/dashboard/channel/:guildName/guild' render={() => <Guild activeUser={this.props.activeUser} />} key={0} />),
                      (<Route path='/dashboard/channel/:guildName/members' render={() => <GuildMembers activeUser={this.props.activeUser} />} key={1} />),
                      (<Route path='/dashboard/channel/:guildName/teams' render={() => <GuildTeams activeUser={this.props.activeUser} />} key={2} />),
                      (<Route exact path='/dashboard' render={() => <Redirect to={`/dashboard/channel/${currentGuild}/guild`} />} key={3} />)];
      return (<div className="dashboard">
        <WelcomeBar user={this.props.activeUser} activeGuild={this.props.activeGuild} logOut={this.logOut} togglePanel={this.togglePanel} guildName={currentGuild}/>
          <TabNavigation activeUser={this.props.activeUser} activeGuild={this.props.activeGuild} guildName={currentGuild}/>
          <SideBar
            title={this.state.sidePanel.section}
            open={this.state.sidePanel.open}
            togglePanel={this.togglePanel}
            handleChangeSingle={this.handleChangeSingle}
         />
        <main className="main-content">
          {routes}
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
  activeUserGuilds: state.registrationAndLogin.activeUserGuilds,
  activeGuild: state.registrationAndLogin.activeGuild
  //sidePanel: state.logAndTasks.sidePanel
  //slideIndex: state.dashboard.slideIndex
});

export default withRouter(connect(mapStateToProps)(Dashboard));