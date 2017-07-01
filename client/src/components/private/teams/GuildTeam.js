import React, { Component } from 'react';
import {connect} from 'react-redux';
import SectionBar from '../SectionBar';
import TeamDetails from './TeamDetails';
import TeamPVPStats from './TeamPVPStats';
import * as actions from '../../../actions/teamsActions';
import TeamRecentMatches from './TeamRecentMatches';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import {Link, Redirect} from 'react-router-dom';
import CircularProgress from 'material-ui/CircularProgress';
import './GuildTeams.css';

class GuildTeam extends Component {

  constructor(props) {
    super(props);

    this.deselectTeam = this.deselectTeam.bind(this);
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.activeGuild !== this.props.activeGuild){
      this.deselectTeam();
    }
    else if(Object.keys(this.props.selectedTeamInfo).length === 0 && this.props.selectedTeamInfo.constructor === Object){
      if(this.props.guildTeams !== nextProps.guildTeams){
        const selectedTeam = nextProps.guildTeams.filter(team => {
          return team.name.toLowerCase() === decodeURIComponent(nextProps.match.params.team);
        });
        nextProps.dispatch(actions.selectTeam(selectedTeam[0]));
      }
    }
  }
  deselectTeam(){
    this.props.dispatch(actions.deselectTeam());
    this.props.history.push('/dashboard/teams');
  }
  render() {
    /*if(this.props.selectedTeam === false)
      return (<Redirect to="/dashboard/teams" />);*/

    if(this.props.teamLoading){
      return (
      <section className="teamLoadingScreen">
          <CircularProgress size={80} thickness={5} />
      </section>
      );
    }

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
        <SectionBar additionalClasses="backNavigation" leftIcon={<button type='button' onClick={this.deselectTeam} className="backSection"><NavigationArrowBack className="backArrow" /><div className="returnTo"> Return to teams</div></button>} title={<span></span>} />
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
    displayTeamRecentMatches:state.teams.displayTeamRecentMatches,
    selectedTeam: state.teams.selectedTeam,
    teamLoading: state.teams.teamLoading,
    activeGuild: state.registrationAndLogin.activeGuild
});

export default connect(mapStateToProps)(GuildTeam);
