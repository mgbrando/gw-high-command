import React, { Component } from 'react';
import {connect} from 'react-redux';
import SectionBar from '../SectionBar';
import TeamDetails from './TeamDetails';
import TeamPVPStats from './TeamPVPStats';
import * as actions from '../../../actions/teamsActions';
import TeamRecentMatches from './TeamRecentMatches';
import './GuildTeams.css';

class GuildTeam extends Component {

  constructor(props) {
    super(props);
  }
  componentWillReceiveProps(nextProps){
    if(Object.keys(this.props.selectedTeamInfo).length === 0 && this.props.selectedTeamInfo.constructor === Object){
      if(this.props.guildTeams !== nextProps.guildTeams){
        const selectedTeam = nextProps.guildTeams.filter(team => {
          return team.name.toLowerCase() === decodeURIComponent(nextProps.match.params.team);
        });
        nextProps.dispatch(actions.selectTeam(selectedTeam[0]));
      }
    }
  }
  render() {
    if(!(Object.keys(this.props.selectedTeamInfo).length === 0 && this.props.selectedTeamInfo.constructor === Object)){
    let seasonPVPStats = 'No season stats available';
    if(this.props.selectedTeamInfo.hasOwnProperty('seasons'))
      seasonPVPStats = this.props.selectedTeamInfo.seasons[this.props.selectedTeamInfo.seasons.length-1];

    let unrankedPVPStats = 'No unranked stats available';
    if(this.props.selectedTeamInfo.hasOwnProperty('ladders') && this.props.selectedTeamInfo.ladders.hasOwnProperty('unranked'))
      unrankedPVPStats = this.props.selectedTeamInfo.ladders.unranked;

    let rankedPVPStats = 'No ranked stats available';
    if(this.props.selectedTeamInfo.hasOwnProperty('ladders') && this.props.selectedTeamInfo.ladders.hasOwnProperty('ranked'))
      rankedPVPStats = this.props.selectedTeamInfo.ladders.ranked;

    return (
      <section className="guildTeam">
        <SectionBar title="Team Details" />
        <TeamDetails 
          loading={this.props.teamDetailsLoading} 
          display={this.props.displayTeamDetails} 
          name={this.props.selectedTeamInfo.name}
          members={this.props.selectedTeamInfo.members}
        />
        <SectionBar title="PvP Stats" />
        <TeamPVPStats 
          loading={this.props.teamPVPStatsLoading} 
          display={this.props.displayTeamPVPStats}
          unrankedPVPStats = {unrankedPVPStats}
          rankedPVPStats={rankedPVPStats}
          seasonPVPStats={seasonPVPStats} 
        />
        <SectionBar title="Recent Matches" />
        <TeamRecentMatches 
          loading={this.props.teamRecentMatchesLoading} 
          display={this.props.displayTeamRecentMatches}
          matches={this.props.selectedTeamInfo.games} 
        />
      </section>
    );
  }
  else{
    return false;
  }
  }
}

const mapStateToProps = (state, props) => ({
    selectedTeamInfo: state.teams.selectedTeamInfo,
    guildTeams: state.teams.guildTeams,
    teamDetails: state.teams.teamDetails,
    teamPVPStats: state.teams.teamPVPStats,
    teamRecentMatches: state.teams.teamRecentMatches,
    displayTeamDetails: state.teams.displayTeamDetails,
    displayTeamPVPStats: state.teams.displayTeamPVPStats,
    displayTeamRecentMatches:state.teams.displayTeamRecentMatches
});

export default connect(mapStateToProps)(GuildTeam);
