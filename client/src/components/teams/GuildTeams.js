import React, { Component } from 'react';
import {connect} from 'react-redux';
import Guild from './guild/Guild';
import GuildMembers from './members/GuildMembers';
import GuildTeams from './teams/GuildTeams';
import './App.css';

class GuildTeams extends Component {

  constructor(props) {
    super(props);

    this.displayPage = this.displayPage.bind(this);
  }

  displayPage(page){
    switch(page){
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
      /*case "MemberRegistration":
        return (<MemberRegistration />);
        break;
      case "LeaderRegistration":
        return (<LeaderRegistration />);
        break;
      case "LeaderRegistration":
        return (<LeaderRegistration />);
        break;*/
      default:
        return (<RankSelection />);
        break;
    }
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>GW2 High Command</h2>
        </div>
        {this.displayPage(this.props.page))}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
    page: state.page
});

export default connect(mapStateToProps)(GuildTeams);
