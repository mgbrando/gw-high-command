import React, { Component } from 'react';
import {connect} from 'react-redux';
//import GuildDetails from './GuildDetails';
//import GuildUpgrades from './GuildUpgrades';
import * as actions from '../../../actions/membersActions';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import SectionBar from '../SectionBar';
import MemberDetails from './MemberDetails';
import MemberPVPStats from './MemberPVPStats';
import MemberPVEStats from './MemberPVEStats';
import CircularProgress from 'material-ui/CircularProgress';
/*import {
  BrowserRouter as Router, Route, Link, Switch
} from 'react-router-dom';*/
import {Link, Redirect} from 'react-router-dom';
//import './GuildMembers.css';

class GuildMember extends Component {

  constructor(props) {
    super(props);

    console.log("In GuildMember");
    this.deselectMember = this.deselectMember.bind(this);
  }
  componentWillReceiveProps(nextProps){
    if(Object.keys(this.props.accountInfo).length === 0 && this.props.accountInfo.constructor === Object){
      if(this.props.registeredMembers !== nextProps.registeredMembers){
        const selectedMember = nextProps.registeredMembers.filter(member => {
          return member.name.toLowerCase() === decodeURIComponent(nextProps.match.params.member);
        });
        nextProps.dispatch(actions.selectMember(selectedMember[0].apiKey, nextProps.registeredMembers))
      }
    }
  }
  deselectMember(){
    this.props.dispatch(actions.deselectMember());
  }
  /*componentWillUnmount(){
    this.deselectMember();
  }*/
  render() {
    if(this.props.selectedMember === false)
      return (<Redirect to="/dashboard/members" />);

    if(this.props.memberDetailsLoading || this.props.memberPVPStatsLoading || this.props.memberPVEStatsLoading){
      return (
      <section className="memberLoadingScreen">
          <CircularProgress size={80} thickness={5} />
      </section>
      );
    }

    return (
      <section className="guildMember">
        <SectionBar additionalClasses="backNavigation" leftIcon={<button type='button' onClick={this.deselectMember} className="backSection"><NavigationArrowBack className="backArrow" /><div className="returnTo"> Return to members</div></button>} title={<span></span>} />
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
    registeredMembers: state.members.registeredMembers,
    memberGuildNames: state.members.memberGuildNames,
    joined: state.members.joined,
    characters: state.members.characters,
    pvpStats: state.members.pvpStats,
    pvpStandings: state.members.pvpStandings,
    raids: state.members.raids,
    selectedMember: state.members.selectedMember
});

export default connect(mapStateToProps)(GuildMember);
