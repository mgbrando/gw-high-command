import React, { Component } from 'react';
import {connect} from 'react-redux';
//import GuildDetails from './GuildDetails';
//import GuildUpgrades from './GuildUpgrades';
import SectionBar from '../SectionBar';
import GuildDetails from './GuildDetails';
import GuildUpgrades from './GuildUpgrades';
import './Guild.css';



class Guild extends Component {

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
      <section className="guild">
        <SectionBar title="Guild Details" />
        <GuildDetails content={this.props.guildDetails} visible={this.props.displayGuildDetails} />
        <SectionBar title="Upgrades" />
        <GuildUpgrades content={this.props.guildUpgrades} visible={this.props.displayGuildUpgrades} />
      </section>
    );
  }
}

//        <GuildDetails details={this.props.details} />
//        <GuildUpgrades upgrades={this.props.upgrades} />

const mapStateToProps = (state, props) => ({
    guildDetails: state.guild.guildDetails,
    guildUpgrades: state.guild.guildUpgrades,
    displayGuildDetails: state.guild.displayGuildDetails,
    displayGuildUpgrades: state.guild.displayGuildUpgrades
});

export default connect(mapStateToProps)(Guild);
