import React, { Component } from 'react';
import {connect} from 'react-redux';
//import GuildDetails from './GuildDetails';
//import GuildUpgrades from './GuildUpgrades';
import * as actions from '../../../actions/membersActions';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router';
import MembersTable from './MembersTable';
import GuildMember from './GuildMember';
import './GuildMembers.css';

class GuildMembers extends Component {

  constructor(props) {
    super(props);

    //this.displayPage = this.displayPage.bind(this);
  }
  componentWillMount(){
    //if()
    this.props.dispatch(actions.getGuildMembers(this.props.guildDetails.id, this.props.activeUser.apiKey));
  }
  componentDidMount(){
    //this.props.dispatch(actions.getMembersInfo(this.props.activeUser.apiKey));
  }

  render() {
    return (
      <section className="guildMembers">
        <Switch>
          <Route exact path='/dashboard/members' component={MembersTable} />
          <Route exact path='dashboard/members/:member' component={GuildMember} />
        </Switch>
      </section>
    );
  }
}

//        <GuildDetails details={this.props.details} />
//        <GuildUpgrades upgrades={this.props.upgrades} />

const mapStateToProps = (state, props) => ({
  guildDetails: state.guild.guildDetails
});

export default connect(mapStateToProps)(GuildMembers);
