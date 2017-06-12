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

//        <GuildDetails details={this.props.details} />
//        <GuildUpgrades upgrades={this.props.upgrades} />

const mapStateToProps = (state, props) => ({
    /*memberDetails: state.members.memberDetails,
    memberPVPStats: state.members.memberPVPStats,
    memberPVEStats: state.members.memberPVEStats,*/
    registeredMembers: state.members.registeredMembers,
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
