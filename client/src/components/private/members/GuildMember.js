import React, { Component } from 'react';
import {connect} from 'react-redux';
//import GuildDetails from './GuildDetails';
//import GuildUpgrades from './GuildUpgrades';
import * as actions from '../../../actions/membersActions';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import Refresh from 'material-ui/svg-icons/navigation/refresh';
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

    this.state = {
      pvpTypeValue: 1,
      professionTypeValue: "",
      charactersWithStats: [],
      charactersWithoutStats: [],
      characterData: null
    };

    console.log("In GuildMember");
    this.deselectMember = this.deselectMember.bind(this);
    this.refreshMember = this.refreshMember.bind(this);
    this.handlePVPTypeChange = this.handlePVPTypeChange.bind(this);
    this.handleProfessionChange = this.handleProfessionChange.bind(this);
    this.hasStatistics = this.hasStatistics.bind(this);
    this.sortCharacters = this.sortCharacters.bind(this);
    this.setProfessionTypeValue = this.setProfessionTypeValue.bind(this);
  }
  componentDidMount(){
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.activeGuild !== this.props.activeGuild){
      this.deselectMember();
    }
    else if(Object.keys(this.props.accountInfo).length === 0 && this.props.accountInfo.constructor === Object){
      if(this.props.registeredMembers !== nextProps.registeredMembers){
        const selectedMember = nextProps.registeredMembers.filter(member => {
          return member.name.toLowerCase() === decodeURIComponent(nextProps.match.params.member);
        });
        nextProps.dispatch(actions.selectMember(selectedMember[0].apiKey, nextProps.registeredMembers));
      }
    }
    else if(this.state.professionTypeValue === ""){
      let charactersWithStats =[];
      for(let property in nextProps.pvpStats.professions){
        charactersWithStats.push(property.charAt(0).toUpperCase() + property.slice(1));
      }
      let charactersWithoutStats = nextProps.characters.filter(character => {
        return (charactersWithStats.indexOf(character.profession) === -1) ? true : false;
      });
      charactersWithoutStats = charactersWithoutStats.map(character => {
        return character.profession;
      });
      charactersWithStats.sort(this.sortCharacters);
      /*if(this.state.professionTypeValue === ""){
        this.setProfessionTypeValue(charactersWithStats[0]);
      }*/
      const characterData = Object.keys(nextProps.pvpStats.professions[charactersWithStats[0].toLowerCase()]).map(stat => {
        return {value: nextProps.pvpStats.professions[charactersWithStats[0].toLowerCase()][stat], numberLabel: nextProps.pvpStats.professions[charactersWithStats[0].toLowerCase()][stat], statLabel: stat};
      });
      this.setState({professionTypeValue: charactersWithStats[0], charactersWithStats: charactersWithStats, charactersWithoutStats: charactersWithoutStats, 
      characterData: characterData});
    }
    /*else if(!nextProps.selectedMember)
      this.props.history.replace('/dashboard/members');*/
  }
  componentWillUnmount(){
    this.props.dispatch(actions.deselectMember());
  }
  /*componentDidMount(){
    this.setState
  }*/
  deselectMember(){
    this.props.dispatch(actions.deselectMember());
    this.props.history.push('/dashboard/members');
  }
  refreshMember(){
    this.props.dispatch(actions.refreshMembers());
  }
  handlePVPTypeChange(event, selectedIndex, menuItem){
    this.setState({pvpTypeValue: menuItem});
  }
  handleProfessionChange(event, selectedIndex, menuItem){
    let characterData;
    if(this.props.pvpStats.professions[menuItem.toLowerCase()]){
      characterData = Object.keys(this.props.pvpStats.professions[menuItem.toLowerCase()]).map(stat => {
        return {value: this.props.pvpStats.professions[menuItem.toLowerCase()][stat], numberLabel: this.props.pvpStats.professions[menuItem.toLowerCase()][stat], statLabel: stat};
      });
    }
    else{
      characterData = null;
    }
    this.setState({professionTypeValue: menuItem, characterData: characterData});
  }
  hasStatistics(stats){
    if(stats.wins !== 0 || 
      stats.losses !== 0 ||
      stats.desertions !== 0 ||
      stats.byes !== 0 ||
      stats.forfeits !== 0){
      return true;
    }
    else 
      return false;
  }
  sortCharacters(professionA, professionB){
    professionA = professionA.toLowerCase();
    professionB = professionB.toLowerCase();
    let {wins, losses} = this.props.pvpStats.professions[professionA];
    let winPercentageA = wins/(wins + losses) * 100;
    winPercentageA = Math.round(winPercentageA * 100) / 100;
    wins = this.props.pvpStats.professions[professionB].wins;
    losses = this.props.pvpStats.professions[professionB].losses;
    let winPercentageB = wins/(wins + losses) * 100;
    winPercentageB = Math.round(winPercentageB * 100) / 100;
    return winPercentageB - winPercentageA;
  }
  setProfessionTypeValue(professionType){
    this.setState({professionTypeValue: professionType});
  }

  render() {
    /*if(this.props.selectedMember === false)
      return (<Redirect to="/dashboard/members" />);*/

    if(this.props.memberDetailsLoading || this.props.memberPVPStatsLoading || this.props.memberPVEStatsLoading){
      return (
      <section className="memberLoadingScreen">
        <SectionBar additionalClasses="backNavigation loading" rightIcon={<button type='button' onClick={this.refreshMember} className="backSection"><Refresh className="refreshArrow" /></button>} title={<span></span>} />
        <div className="memberLoadingSpinnerSection">
          <CircularProgress className="middleVert" size={80} thickness={5} />
        </div>
      </section>
      );
    }
//<SectionBar additionalClasses="backNavigation" leftIcon={<button type='button' onClick={this.deselectMember} className="backSection"><NavigationArrowBack className="backArrow" /><div className="returnTo"> Return to members</div></button>} title={<span></span>} />
    return (
      <section className="guildMember">
        <SectionBar additionalClasses="backNavigation" rightIcon={<button type='button' onClick={this.refreshMember} className="backSection"><Refresh className="refreshArrow" /></button>} title={<span></span>} />
        <div className="mainDetails">
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
          pvpTypeValue={this.state.pvpTypeValue}
          handlePVPTypeChange = {this.handlePVPTypeChange}
          professionTypeValue = {this.state.professionTypeValue}
          handleProfessionChange = {this.handleProfessionChange}
          hasStatistics={this.hasStatistics}
          charactersWithStats={this.state.charactersWithStats}
          charactersWithoutStats={this.state.charactersWithoutStats}
          characterData={this.state.characterData}
        />
        <SectionBar title="PvE Stats" />
        <MemberPVEStats 
          loading={this.props.memberPVEStatsLoading}
          raids={this.props.raids} 
          display={this.props.displayMemberPVEStats} 
        />
        </div>
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
    selectedMember: state.members.selectedMember,
    activeGuild: state.registrationAndLogin.activeGuild
});

export default connect(mapStateToProps)(GuildMember);
