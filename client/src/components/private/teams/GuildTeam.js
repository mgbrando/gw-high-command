import React, { Component } from 'react';
import {connect} from 'react-redux';
import SectionBar from '../SectionBar';
import TeamDetails from './TeamDetails';
import TeamPVPStats from './TeamPVPStats';
import * as actions from '../../../actions/teamsActions';
import TeamRecentMatches from './TeamRecentMatches';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import {Link, Redirect} from 'react-router-dom';
import Refresh from 'material-ui/svg-icons/navigation/refresh';
import CircularProgress from 'material-ui/CircularProgress';
import './GuildTeams.css';

class GuildTeam extends Component {

  constructor(props) {
    super(props);

    this.state = {
      pvpTypeValue: 1
    };

    this.handlePVPTypeChange = this.handlePVPTypeChange.bind(this);
    this.deselectTeam = this.deselectTeam.bind(this);
    this.refreshTeam = this.refreshTeam.bind(this);
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
  componentWillUnmount(){
    this.props.dispatch(actions.deselectTeam());
  }
  deselectTeam(){
    this.props.dispatch(actions.deselectTeam());
    this.props.history.push(`/dashboard/channel/${this.props.guild}/teams`);
  }
  refreshTeam(){
    this.props.dispatch(actions.refreshTeams());
  }
  handlePVPTypeChange(event, selectedIndex, menuItem){
    this.setState({pvpTypeValue: menuItem});
  }
  render() {
    /*if(this.props.selectedTeam === false)
      return (<Redirect to="/dashboard/teams" />);*/

    if(this.props.teamLoading){
      return (
      <section className="teamLoadingScreen">
        <SectionBar additionalClasses="backNavigation loading" rightIcon={<button type='button' onClick={this.refreshTeam} className="backSection"><Refresh className="refreshArrow" /></button>} title={<span></span>} />
        <div className="teamLoadingSpinnerSection">
          <CircularProgress size={80} thickness={5} />
        </div>
      </section>
      );
    }

    if(!(Object.keys(this.props.selectedTeamInfo).length === 0 && this.props.selectedTeamInfo.constructor === Object)){
      
      let aggregatePVPStats = 'No aggregate stats available';
      if(this.props.selectedTeamInfo.aggregate.wins !== 0 || 
          this.props.selectedTeamInfo.aggregate.losses !== 0 ||
          this.props.selectedTeamInfo.aggregate.desertions !== 0 ||
          this.props.selectedTeamInfo.aggregate.byes !== 0 ||
          this.props.selectedTeamInfo.aggregate.forfeits !== 0)
        aggregatePVPStats = this.props.selectedTeamInfo.aggregate;

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
          <SectionBar additionalClasses="backNavigation" rightIcon={<button type='button' onClick={this.refreshTeam} className="backSection"><Refresh className="refreshArrow" /></button>} title={<span></span>} />
          <div className="mainDetails">
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
              aggregatePVPStats={aggregatePVPStats}
              pvpTypeValue={this.state.pvpTypeValue}
              handlePVPTypeChange={this.handlePVPTypeChange}
            />
            <SectionBar title="Recent Matches" />
            <TeamRecentMatches 
              loading={this.props.teamRecentMatchesLoading} 
              display={this.props.displayTeamRecentMatches}
              matches={this.props.selectedTeamInfo.games} 
            />
          </div>
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
