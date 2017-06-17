/*import React, { Component } from 'react';
import {connect} from 'react-redux';
import SectionBar from '../SectionBar';
import './GuildTeams.css';

class GuildTeam extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section className="guildTeam">
        <SectionBar title="Team Details" />
        <TeamDetails content={this.props.teamDetails} visible={this.props.displayTeamDetails} />
        <SectionBar title="PvP Stats" />
        <TeamPVPStats content={this.props.teamPVPStats} visible={this.props.displayTeamPVPStats} />
        <SectionBar title="Recent Matches" />
        <TeamRecentMatches content={this.props.teamRecentMatches} visible={this.props.displayTeamRecentMatches} />
      </section>
    );
  }
}

const mapStateToProps = (state, props) => ({
    teamDetails: state.teams.teamDetails,
    teamPVPStats: state.teams.teamPVPStats,
    teamRecentMatches: state.teams.teamRecentMatches,
    displayTeamDetails: state.teams.displayTeamDetails,
    displayTeamPVPStats: state.teams.displayTeamPVPStats,
    displayTeamRecentMatches:state.teams.displayTeamRecentMatches
});

export default connect(mapStateToProps)(GuildTeam);*/
