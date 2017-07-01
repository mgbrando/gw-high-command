import React, { Component } from 'react';
import {connect} from 'react-redux';
//import GuildDetails from './GuildDetails';
//import GuildUpgrades from './GuildUpgrades';
import * as actions from '../../../actions/membersActions';
import { Route, withRouter } from 'react-router-dom';
import { Switch } from 'react-router';
import MembersTable from './MembersTable';
import GuildMember from './GuildMember';
import './GuildMembers.css';

class GuildMembers extends Component {

  constructor(props) {
    super(props);

    //this.displayPage = this.displayPage.bind(this);
  }
  componentDidMount(){
    //if()
    this.props.dispatch(actions.getGuildMembers(this.props.activeGuild, this.props.activeUser.apiKey));
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.activeGuild !== this.props.activeGuild)
      this.props.dispatch(actions.getGuildMembers(nextProps.activeGuild, nextProps.activeUser.apiKey));
    else if(nextProps.refreshMembers)
      this.props.dispatch(actions.getGuildMembers(nextProps.activeGuild, nextProps.activeUser.apiKey));
  }
  componentWillUnmount(){
    this.props.dispatch(actions.resetGuildMembers());
  }
  /*componentDidMount(){
    //this.props.dispatch(actions.getMembersInfo(this.props.activeUser.apiKey));
  }*/

  render() {
    return (
      <section className="guildMembers">
        <Switch>
          <Route exact path='/dashboard/members' component={MembersTable} />
          <Route path='/dashboard/members/:member' component={GuildMember} />
        </Switch>
      </section>
    );
  }
}

//        <GuildDetails details={this.props.details} />
//        <GuildUpgrades upgrades={this.props.upgrades} />

const mapStateToProps = (state, props) => ({
  guildDetails: state.guild.guildDetails,
  activeGuild: state.registrationAndLogin.activeGuild,
  refreshMembers: state.navigation.refreshMembers
});

export default withRouter(connect(mapStateToProps)(GuildMembers));