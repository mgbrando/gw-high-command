import React, { Component } from 'react';
import {connect} from 'react-redux';
import Guild from '../guild/Guild';
import GuildMembers from '../members/GuildMembers';
//import './App.css';

class GuildTeams extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>GW2 High Command</h2>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
});

export default connect(mapStateToProps)(GuildTeams);
