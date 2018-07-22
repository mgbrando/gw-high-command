import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions/membersActions";
import { Route, withRouter } from "react-router-dom";
import { Switch } from "react-router";
import MembersTable from "./MembersTable";
import GuildMember from "./GuildMember";
import "./GuildMembers.css";

class GuildMembers extends Component {
  componentDidMount() {
    this.props.dispatch(
      actions.getGuildMembers(
        this.props.activeGuild,
        this.props.activeUser.apiKey
      )
    );
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.activeGuild !== this.props.activeGuild)
      this.props.dispatch(
        actions.getGuildMembers(
          nextProps.activeGuild,
          nextProps.activeUser.apiKey
        )
      );
    else if (nextProps.refreshMembers) {
      this.props.dispatch(
        actions.getGuildMembers(
          nextProps.activeGuild,
          nextProps.activeUser.apiKey,
          this.props.selectedMember,
          this.props.selectedMemberAPIKey
        )
      );
    }
  }
  componentWillUnmount() {
    this.props.dispatch(actions.resetGuildMembers());
  }

  render() {
    return (
      <section className="guildMembers">
        <Switch>
          <Route exact path="/dashboard/members" component={MembersTable} />
          <Route path="/dashboard/members/:member" component={GuildMember} />
        </Switch>
      </section>
    );
  }
}

const mapStateToProps = (state, props) => ({
  guildDetails: state.guild.guildDetails,
  activeGuild: state.registrationAndLogin.activeGuild,
  registeredMembers: state.members.registeredMembers,
  refreshMembers: state.members.refreshMembers,
  selectedMember: state.members.selectedMember,
  selectedMemberAPIKey: state.members.selectedMemberAPIKey,
  accountInfo: state.members.accountInfo
});

export default withRouter(connect(mapStateToProps)(GuildMembers));
