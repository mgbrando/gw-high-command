import React, { Component } from 'react';
import {connect} from 'react-redux';
//import GuildDetails from './GuildDetails';
//import GuildUpgrades from './GuildUpgrades';
import SectionBar from '../SectionBar';
import GuildDetails from './GuildDetails';
import GuildUpgrades from './GuildUpgrades';
//import './GuildMembers.css';

class GuildTeam extends Component {

  constructor(props) {
    super(props);

    //this.displayPage = this.displayPage.bind(this);
  }

  /*displayPage(){
    switch(props.page){
      case "rankSelection":
        return (<RankSelection />);
        break;
      case "registration":
        return (<Registration />);
        break;
      case "guild":
        return (<Guild />);
        break;
      case "guildMembers":
        return (<GuildMembers />);
        break;
      case "guildTeams":
        return (<GuildTeams />);
        break;
      default:
        return (<RankSelection />);
    }
  }*/
  render() {
    return (
      <section className="guildTeam">
        <SectionBar title="Team Details" />
        <MemberDetails content={this.props.memberDetails} visible={this.props.displayMemberDetails} />
        <SectionBar title="PvP Stats" />
        <MemberPVPStats content={this.props.memberPVPStats} visible={this.props.displayPVPStats} />
        <SectionBar title="Recent Matches" />
        <MemberPVEStats content={this.props.memberPVEStats} visible={this.props.displayPVEStats} />
      </section>
    );
  }
}

//        <GuildDetails details={this.props.details} />
//        <GuildUpgrades upgrades={this.props.upgrades} />

const mapStateToProps = (state, props) => ({
    teamDetails: state.teams.teamDetails,
    teamPVPStats: state.teams.teamPVPStats,
    teamRecentMatches: state.teams.teamRecentMatches,
    displayTeamDetails: state.teams.displayTeamDetails,
    displayTeamPVPStats: state.teams.displayTeamPVPStats,
    displayTeamRecentMatches:state.teams.displayTeamRecentMatches
});

export default connect(mapStateToProps)(GuildTeam);
