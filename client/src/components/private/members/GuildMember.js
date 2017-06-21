import React, { Component } from 'react';
import {connect} from 'react-redux';
//import GuildDetails from './GuildDetails';
//import GuildUpgrades from './GuildUpgrades';
import SectionBar from '../SectionBar';
import MemberDetails from './MemberDetails';
import MemberPVPStats from './MemberPVPStats';
import MemberPVEStats from './MemberPVEStats';
//import './GuildMembers.css';

class GuildMember extends Component {

  constructor(props) {
    super(props);

    console.log("In GuildMember");
  }

  render() {
    return (
      <section className="guildMember">
        <SectionBar title="Member Details" />
        <MemberDetails 
          loading={this.props.memberDetailsLoading}
          accountInfo={this.props.accountInfo}
          memberGuildNames={this.props.memberGuildNames}
          joined={this.props.joined} 
          characters={this.props.characters} 
          isCommander={this.props.accountInfo.commander ? "Yes" : "No"}
          display={this.props.displayMemberDetails} 
        />
        <SectionBar title="PvP Stats" />
        <MemberPVPStats 
          loading={this.props.memberPVPStatsLoading}
          pvpStats={this.props.pvpStats} 
          pvpStandings={this.props.pvpStandings} 
          wvwRank={this.props.accountInfo.wvw_rank}
          display={this.props.displayMemberPVPStats} 
        />
        <SectionBar title="PvE Stats" />
        <MemberPVEStats 
          loading={this.props.memberPVEStatsLoading}
          raids={this.props.raids} 
          display={this.props.displayMemberPVEStats} 
        />
      </section>
    );
  }
}

const mapStateToProps = (state, props) => ({
    displayMemberDetails: state.members.displayMemberDetails,
    displayMemberPVPStats: state.members.displayMemberPVPStats,
    displayMembersPVEStats: state.members.displayMemberPVPStats,
    memberDetailsLoading: state.members.memberDetailsLoading,
    memberPVPStatsLoading: state.members.memberPVPStatsLoading,
    memberPVEStatsLoading: state.members.memberPVEStatsLoading,
    accountInfo: state.members.accountInfo,
    memberGuildNames: state.members.memberGuildNames,
    joined: state.members.joined,
    characters: state.members.characters,
    pvpStats: state.members.pvpStats,
    pvpStandings: state.members.pvpStandings,
    raids: state.members.raids
});

export default connect(mapStateToProps)(GuildMember);
