import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../actions/guildActions';
//import GuildDetails from './GuildDetails';
//import GuildUpgrades from './GuildUpgrades';
import SectionBar from '../SectionBar';
import GuildDetails from './GuildDetails';
import GuildUpgrades from './GuildUpgrades';
import CircularProgress from 'material-ui/CircularProgress';
import './Guild.css';

class Guild extends Component {

  constructor(props) {
    super(props);

    this.descriptionToggle = this.descriptionToggle.bind(this);
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
  componentDidMount(){
      /*  this.props.dispatch('https://api.guildwars2.com/v2/account?access_token='+this.props.activeUser.apiKey)
        .then(accountInfo => {
          this.props.dispatch(actions.getGuildDetails(accountInfo.guilds[0]));
          this.props.dispatch(actions.getGuildUpgrades(accountInfo.guilds[0], this.props.activeUser.apiKey));
        })*/
    this.props.dispatch(actions.getGuildInfo(this.props.activeGuild, this.props.activeUser.apiKey));
  }
  componentWillUnmount(){
    this.props.dispatch(actions.setGuildLoadingStates());
  }
  /*componentDidUpdate(){
    this.props.dispatch(actions.getGuildInfo(this.props.activeGuild, this.props.activeUser.apiKey));
  }*/
  componentWillReceiveProps(nextProps) {
    if(nextProps.activeGuild !== this.props.activeGuild)
      this.props.dispatch(actions.getGuildInfo(nextProps.activeGuild, nextProps.activeUser.apiKey));
    else if(nextProps.refreshGuild)
      this.props.dispatch(actions.getGuildInfo(nextProps.activeGuild, nextProps.activeUser.apiKey));
  }

  descriptionToggle(){
    this.props.dispatch(actions.descriptionToggle());
  }

  render() {
    if(this.props.guildDetailsLoading || this.props.guildUpgradesLoading || this.props.guildCoinsLoading){
      return (
      <section className="guildLoadingScreen">
          <CircularProgress size={80} thickness={5} />
      </section>
      );
    }

    /*if(this.props.guildUpgrades.length > 20){
      const guildUpgrades 
    }*/

    return (
      <section className="guild">
        <SectionBar title="Guild Details" />
        <GuildDetails 
          loading={this.props.guildDetailsLoading} 
          display={this.props.displayGuildDetails} 
          guildDetails={this.props.guildDetails} 
          coins={this.props.coins}
        />
        <SectionBar title="Upgrades" />
        <GuildUpgrades 
          loading={this.props.guildUpgradesLoading} 
          display={this.props.displayGuildUpgrades} 
          guildUpgrades={this.props.guildUpgrades} 
          guildCompletedUpgrades={this.props.guildCompletedUpgrades}
          descriptionToggle={this.descriptionToggle}
        />
      </section>
    );
  }
}

//        <GuildDetails details={this.props.details} />
//        <GuildUpgrades upgrades={this.props.upgrades} />

const mapStateToProps = (state, props) => ({
    //activeUser: state.registrationAndLogin.activeUser,
    activeGuild: state.registrationAndLogin.activeGuild,
    guildDetails: state.guild.guildDetails,
    guildUpgrades: state.guild.guildUpgrades,
    guildCompletedUpgrades: state.guild.guildCompletedUpgrades,
    displayGuildDetails: state.guild.displayGuildDetails,
    displayGuildUpgrades: state.guild.displayGuildUpgrades,
    guildDetailsLoading: state.guild.guildDetailsLoading,
    guildUpgradesLoading: state.guild.guildUpgradesLoading,
    guildCoinsLoading: state.guild.guildCoinsLoading,
    coins: state.guild.coins,
    refreshGuild: state.guild.refreshGuild
});

export default connect(mapStateToProps)(Guild);