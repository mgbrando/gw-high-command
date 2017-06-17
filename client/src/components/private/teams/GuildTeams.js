/*import React, { Component } from 'react';
import {connect} from 'react-redux';
//import GuildDetails from './GuildDetails';
//import GuildUpgrades from './GuildUpgrades';
import * as actions from '../../../actions/teamsActions';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router';
import TeamsTable from './TeamsTable';
import GuildTeam from './GuildTeam';
import './GuildTeam.css';

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
        this.props.dispatch(actions.getGuildMembers(nextProps.activeGuild, nextProps.activeUser.apiKey));
     //if(nextProps.selectedMember === true)
  }
  /*componentDidMount(){
    //this.props.dispatch(actions.getMembersInfo(this.props.activeUser.apiKey));
  }*/

  /*render() {
    return (
      <section className="guildTeams">
        <Switch>
          <Route exact path='/dashboard/teams' component={TeamsTable} />
          <Route exact path='/dashboard/teams/:team' component={GuildTeam} />
        </Switch>
      </section>
    );
  }
}

//        <GuildDetails details={this.props.details} />
//        <GuildUpgrades upgrades={this.props.upgrades} />

const mapStateToProps = (state, props) => ({
  guildDetails: state.guild.guildDetails,
  activeGuild: state.registrationAndLogin.activeGuild,*/
  /*selectedMember: state.members.selectedMember,
  characters: state.members.characters*/
/*});

export default connect(mapStateToProps)(GuildTeams);*/