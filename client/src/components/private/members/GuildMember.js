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
          accountInfo={this.props.accountInfo}
          joined={this.props.joined} 
          characters={this.props.characters} 
          visible={this.props.displayMemberDetails} 
        />
        <SectionBar title="PvP Stats" />
        <MemberPVPStats 
          pvpStats={this.props.pvpStats} 
          pvpStandings={this.props.pvpStandings} 
          visible={this.props.displayMemberPVPStats} 
        />
        <SectionBar title="PvE Stats" />
        <MemberPVEStats 
          raids={this.props.raids} 
          visible={this.props.displayMemberPVEStats} 
        />
      </section>
    );
  }
}

const mapStateToProps = (state, props) => ({
    displayMemberDetails: state.members.displayMemberDetails,
    displayMemberPVPStats: state.members.displayMemberPVPStats,
    displayMembersPVEStats: state.members.displayMemberPVPStats,
    accountInfo: state.members.accountInfo,
    joined: state.members.joined,
    characters: state.members.characters,
    pvpStats: state.members.pvpStats,
    pvpStandings: state.members.pvpStandings,
    raids: state.members.raids
});

export default connect(mapStateToProps)(GuildMember);
