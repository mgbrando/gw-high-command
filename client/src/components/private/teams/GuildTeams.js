import React, { Component } from 'react';
import {connect} from 'react-redux';
//import GuildDetails from './GuildDetails';
//import GuildUpgrades from './GuildUpgrades';
import * as actions from '../../../actions/teamsActions';
import { Route, withRouter } from 'react-router-dom';
import { Switch } from 'react-router';
import TeamsTable from './TeamsTable';
import GuildTeam from './GuildTeam';
import './GuildTeams.css';

class GuildTeams extends Component {

  constructor(props) {
    super(props);

    //this.displayPage = this.displayPage.bind(this);
  }
  componentDidMount(){
    //if()
    this.props.dispatch(actions.getGuildTeams(this.props.activeGuild, this.props.activeUser.apiKey));
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.activeGuild !== this.props.activeGuild)
      this.props.dispatch(actions.getGuildTeams(nextProps.activeGuild, nextProps.activeUser.apiKey));
    else if(nextProps.refreshTeams)
      this.props.dispatch(actions.getGuildTeams(nextProps.activeGuild, nextProps.activeUser.apiKey, this.props.selectedTeam, this.props.selectedTeamInfo.id));
     //if(nextProps.selectedMember === true)
  }
  /*componentDidMount(){
    //this.props.dispatch(actions.getMembersInfo(this.props.activeUser.apiKey));
  }*/
  componentWillUnmount(){
    this.props.dispatch(actions.resetGuildTeams());
  }
  render() {
    let guild = this.props.activeUserGuilds.filter(guild => {
      return guild.id === this.props.activeGuild;
    });
    guild = encodeURIComponent(guild[0].name);
    return (
      <section className="guildTeams">
        <Switch>
          <Route exact path='/dashboard/channel/:guildName/teams' render={() => <TeamsTable guild={guild} />} />
          <Route exact path='/dashboard/channel/:guildName/teams/:team' render={() => <GuildTeam guild={guild} />} />
        </Switch>
      </section>
    );
  }
}

//        <GuildDetails details={this.props.details} />
//        <GuildUpgrades upgrades={this.props.upgrades} />

const mapStateToProps = (state, props) => ({
  guildDetails: state.guild.guildDetails,
  activeGuild: state.registrationAndLogin.activeGuild,
  activeUserGuilds: state.registrationAndLogin.activeUserGuilds,
  refreshTeams: state.teams.refreshTeams,
  selectedTeam: state.teams.selectedTeam,
  selectedTeamInfo: state.teams.selectedTeamInfo
  /*selectedMember: state.members.selectedMember,
  characters: state.members.characters*/
});

export default withRouter(connect(mapStateToProps)(GuildTeams));