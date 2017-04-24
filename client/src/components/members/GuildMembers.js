import React, { Component } from 'react';
import {connect} from 'react-redux';
//import MemberList from './MemberList';
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
      <div className="Members">
        
      </div>
    );
  }
}

//<MemberList members={this.props.members} />

const mapStateToProps = (state, props) => ({
    members: state.members,
    section: state.section
});

export default connect(mapStateToProps)(GuildMembers);
