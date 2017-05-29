import React, { Component } from 'react';
import {connect} from 'react-redux';
//import GuildDetails from './GuildDetails';
//import GuildUpgrades from './GuildUpgrades';
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
      <div className="Guild">
        <h1>Guild</h1>
      </div>
    );
  }
}

//        <GuildDetails details={this.props.details} />
//        <GuildUpgrades upgrades={this.props.upgrades} />

const mapStateToProps = (state, props) => ({
    details: state.details,
    upgrades: state.upgrades
});

export default connect(mapStateToProps)(Guild);
