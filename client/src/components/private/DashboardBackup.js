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
      sidePanel: {open: false, section: "Log"},
      startGuild: ''
    }

    this.togglePanel = this.togglePanel.bind(this);
    this.logOut = this.logOut.bind(this);
    this.tabChange = this.tabChange.bind(this);
    this.handleChangeSingle = this.handleChangeSingle.bind(this);
  }
  componentDidMount(){
  /*    let guild = this.props.activeUserGuilds[0];
      guild = encodeURIComponent(guild.name);
      this.setState({startGuild: guild});*/
  }
  componentWillReceiveProps(nextProps){
    /*if(this.state.startGuild === '' && nextProps.activeUserGuilds && (nextProps.activeUserGuilds !== this.props.activeUserGuilds)){
      let guild = nextProps.activeUserGuilds[0];
      guild = encodeURIComponent(guild.name);
      this.setState({startGuild: guild});
    }*/
    //else if(this.props.startGuild !== nextProps.)
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
    /*let guild = this.props.activeUserGuilds.filter(guild => {
      return guild.id === this.props.activeGuild;
    });*/
    const startGuild = encodeURIComponent(this.props.activeUserGuilds[0].name);
      const routes = [(<Route path={'/dashboard/channel/:guildName/guild'} render={() => <Guild activeUser={this.props.activeUser} />} key={0} />),
                      (<Route path={'/dashboard/channel/:guildName/members'} render={() => <GuildMembers activeUser={this.props.activeUser} />} key={1} />),
                      (<Route path={'/dashboard/channel/:guildName/teams'} render={() => <GuildTeams activeUser={this.props.activeUser} />} key={2} />),
                      (<Route exact path='/dashboard' render={() => <Redirect to={`/dashboard/channel/${startGuild}/guild`} />} key={3} />)];
      return (<div className="dashboard">
        <WelcomeBar user={this.props.activeUser} logOut={this.logOut} togglePanel={this.togglePanel} guildName={this.state.startGuild}/>
          <TabNavigation activeUser={this.props.activeUser} activeGuild={this.props.activeGuild} guildName={this.state.startGuild} />
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
  activeUserGuilds: state.registrationAndLogin.activeUserGuilds
  //sidePanel: state.logAndTasks.sidePanel
  //slideIndex: state.dashboard.slideIndex
});

export default withRouter(connect(mapStateToProps)(Dashboard));