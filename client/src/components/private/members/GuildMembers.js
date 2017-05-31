import React, { Component } from 'react';
import {connect} from 'react-redux';
//import GuildDetails from './GuildDetails';
//import GuildUpgrades from './GuildUpgrades';
import SectionBar from '../SectionBar';
import './GuildMembers.css';

class GuildMembers extends Component {

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
      <section className="guildMembers">
        <SectionBar title="Guild Members" />

      </section>
    );
  }
}

//        <GuildDetails details={this.props.details} />
//        <GuildUpgrades upgrades={this.props.upgrades} />

const mapStateToProps = (state, props) => ({
  guildMembers: state.members.guildMembers,
});

export default connect(mapStateToProps)(GuildMembers);
