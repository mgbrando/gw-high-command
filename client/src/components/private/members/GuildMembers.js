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
    else if(nextProps.refreshMembers){
      this.props.dispatch(actions.getGuildMembers(nextProps.activeGuild, nextProps.activeUser.apiKey, this.props.selectedMember, this.props.selectedMemberAPIKey));
    }
    /*else if(nextProps.refreshMember && !nextProps.refreshMembers && selectedMember)
      this.props.dispatch(actions.selectMember(this.props.selectedMemberAPIKey, this.props.registeredMembers));*/
  }
  componentWillUnmount(){
    this.props.dispatch(actions.resetGuildMembers());
  }
  /*componentDidMount(){
    //this.props.dispatch(actions.getMembersInfo(this.props.activeUser.apiKey));
  }*/

  render() {
    /*let guild = this.props.activeUserGuilds.filter(guild => {
      return guild.id === this.props.activeGuild;
    });
    guild = encodeURIComponent(guild[0].name);*/
    let guild = this.props.activeUserGuilds.filter(guild => {
      return guild.id === this.props.activeGuild;
    });
    guild = encodeURIComponent(guild[0].name);
    return (
      <section className="guildMembers">
        <Switch>
          <Route exact path={`/dashboard/channel/:guildName/members`} render={() => <MembersTable guild={guild} key={0} />} />
          <Route path={`/dashboard/channel/:guildName/members/:member`} render={() => <GuildMember guild={guild} key={1} />} />
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
  activeUserGuilds: state.registrationAndLogin.activeUserGuilds,
  registeredMembers: state.members.registeredMembers,
  refreshMembers: state.members.refreshMembers,
  selectedMember: state.members.selectedMember,
  selectedMemberAPIKey: state.members.selectedMemberAPIKey,
  accountInfo: state.members.accountInfo
});

export default withRouter(connect(mapStateToProps)(GuildMembers));