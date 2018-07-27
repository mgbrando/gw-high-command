import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { userLogOut } from "../../actions/registrationAndLoginActions";
//import SwipeableRoutes from "react-swipeable-routes";
import Guilds from "./Guilds";
import Guild from "./guild/Guild";
import GuildMembers from "./members/GuildMembers";
import GuildTeams from "./teams/GuildTeams";
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
    let count = 0;
    const guildMenuOptions = this.props.activeUserGuilds.map(guild => {
      return (
        <MenuItem value={guild.id} primaryText={guild.name} key={count++} />
      );
    });
    const routes = [
      <Route
        path="/guilds/:guild/summary"
        render={() => <Guild activeUser={this.props.activeUser} />}
        key={0}
      />,
      <Route
        path="/guilds/:guild/members"
        render={() => <GuildMembers activeUser={this.props.activeUser} />}
        key={1}
      />,
      <Route
        path="/guilds/:guild/teams"
        render={() => <GuildTeams activeUser={this.props.activeUser} />}
        key={2}
      />,
      <Route
        exact
        path="/guilds"
        render={() => <Redirect to="/guilds" />}
        key={3}
      />
    ];
    return (
      <div className="guilds">
        <div className={"welcomeBar " + classFix} ref="fixedWelcome">
          <AppBar
            title={<span>Welcome, {this.props.user.username}!</span>}
            iconElementLeft={
              <IconMenu
                iconButtonElement={
                  <IconButton>
                    <MoreVertIcon />
                  </IconButton>
                }
                onChange={this.handleChangeSingle}
                value={this.state.valueSingle}
              >
                {guildMenuOptions}
              </IconMenu>
            }
            iconElementRight={
              <div className="rightAppbar">
                <FlatButton
                  label="Log Out"
                  style={{ color: "white" }}
                  onClick={this.props.logOut}
                />
                <IconButton
                  className="iconButton"
                  style={{ fill: "white" }}
                  onClick={this.props.togglePanel}
                >
                  <ActionList />
                </IconButton>
              </div>
            }
          />
        </div>
        <TabNavigation
          activeUser={this.props.activeUser}
          activeGuild={this.props.activeGuild}
        />
        <div className="guild-content">{routes}</div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  activeUser: state.registrationAndLogin.activeUser,
  activeGuild: state.registrationAndLogin.activeGuild,
  activeUserGuilds: state.registrationAndLogin.activeUserGuilds
});

export default withRouter(connect(mapStateToProps)(Guilds));
