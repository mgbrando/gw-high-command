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
        <MemberDetails content={this.props.memberDetails} visible={this.props.displayMemberDetails} />
        <SectionBar title="PvP Stats" />
        <MemberPVPStats content={this.props.memberPVPStats} visible={this.props.displayMemberPVPStats} />
        <SectionBar title="PvE Stats" />
        <MemberPVEStats content={this.props.memberPVEStats} visible={this.props.displayMemberPVEStats} />
      </section>
    );
  }
}

//        <GuildDetails details={this.props.details} />
//        <GuildUpgrades upgrades={this.props.upgrades} />

const mapStateToProps = (state, props) => ({
    memberDetails: state.members.memberDetails,
    memberPVPStats: state.members.memberPVPStats,
    memberPVEStats: state.members.memberPVEStats,
    displayMemberDetails: state.members.displayMemberDetails,
    displayMemberPVPStats: state.members.displayMemberPVPStats,
    displayMembersPVEStats: state.members.displayMemberPVPStats
});

export default connect(mapStateToProps)(GuildMember);
