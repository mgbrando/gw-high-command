import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { userLogOut } from "../../actions/registrationAndLoginActions";
//import SwipeableRoutes from "react-swipeable-routes";
import Guilds from "./Guilds";
/*import Guild from "./guild/Guild";
import GuildMembers from "./members/GuildMembers";
import GuildTeams from "./teams/GuildTeams";*/
import Authorization from "./Authorization";
import WelcomeBar from "./WelcomeBar";
import TabNavigation from "./TabNavigation";
import { withRouter } from "react-router-dom";
import SideBar from "./sidebar/SideBar";
//import {Tabs, Tab} from 'material-ui/Tabs';
import "./Dashboard.css";

class Guilds extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sidePanel: { open: false, section: "Log" }
    };

    this.togglePanel = this.togglePanel.bind(this);
    this.logOut = this.logOut.bind(this);
    this.tabChange = this.tabChange.bind(this);
    this.handleChangeSingle = this.handleChangeSingle.bind(this);
  }

  tabChange(routePath) {
    //this.props.history.push('routePath');
  }
  handleChangeSingle(event, value) {
    //console.log(this.state.valueSingle);
    this.setState({
      sidePanel: Object.assign({}, this.state.sidePanel, { section: value })
    });
  }
  logOut() {
    this.props.dispatch(userLogOut());
  }
  togglePanel() {
    if (this.state.sidePanel.open) {
      this.setState({
        sidePanel: Object.assign({}, this.state.sidePanel, { open: false })
      });
    } else {
      this.setState({
        sidePanel: Object.assign({}, this.state.sidePanel, { open: true })
      });
    }
  }
  /*  componentDidMount(){
    if(this)
  }*/
  //<TabNavigation currentTab={} />
  //  <SwipeableRoutes></SwipeableRoutes>
  /* const routes = [(<Route path='/dashboard/guild' render={() => <Guild activeUser={this.props.activeUser} />} key={0} />),
        (<Route path='/dashboard/members' render={() => <GuildMembers activeUser={this.props.activeUser} />} key={1} />),
        (<Route path='/dashboard/teams' render={() => <GuildTeams activeUser={this.props.activeUser} />} key={2} />),
        (<Route exact path='/dashboard' render={() => <Redirect to="/guilds" />} key={3} />)];*/
  render() {
    if (this.props.isAuthenticated) {
      return (
        <div className="dashboard">
          <WelcomeBar
            user={this.props.activeUser}
            activeGuild={this.props.activeGuild}
            logOut={this.logOut}
            togglePanel={this.togglePanel}
          />
          <SideBar
            title={this.state.sidePanel.section}
            open={this.state.sidePanel.open}
            togglePanel={this.togglePanel}
            handleChangeSingle={this.handleChangeSingle}
          />
          <main className="main-content">
            <Guilds />
          </main>
        </div>
      );
    } else if (!this.props.authorizationChecked) {
      return <Authorization />;
    } else {
      return <Redirect to="/login" />;
    }
  }
}

const mapStateToProps = (state, props) => ({
  isAuthenticated: state.registrationAndLogin.isAuthenticated,
  authorizationChecked: state.registrationAndLogin.authorizationChecked,
  activeUser: state.registrationAndLogin.activeUser,
  activeGuild: state.registrationAndLogin.activeGuild
  //sidePanel: state.logAndTasks.sidePanel
  //slideIndex: state.dashboard.slideIndex
});

export default withRouter(connect(mapStateToProps)(Dashboard));
