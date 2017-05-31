import React, { Component } from 'react';
import {connect} from 'react-redux';
import SectionBar from '../SectionBar';
//import './App.css';
import './GuildTeams.css';

class GuildTeams extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section className="guildTeams">
        <SectionBar title="Guild Teams" />
    
      </section>
    );
  }
}

const mapStateToProps = (state, props) => ({
  guildTeams: state.teams.guildTeams
});

export default connect(mapStateToProps)(GuildTeams);
