import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions/membersActions";
import { withRouter } from "react-router-dom";
import SectionBar from "../SectionBar";
//import greenRect from '../../assets/green-rectangle.png';
import pieChart from "../../assets/pie-chart.png";
import CircularProgress from "material-ui/CircularProgress";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";
import "./GuildMembers.css";

class MembersTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rows: []
    };
    this.statsClick = this.statsClick.bind(this);
    this.getAPIKey = this.getAPIKey.bind(this);
  }

  componentDidMount() {
    let rows = [];
    for (let i = 0; i < this.props.registeredMembers.length; i++) {
      const apiKey = this.getAPIKey(this.props, i);
      let date = new Date(this.props.registeredMembers[i].joined);
      const joinDate =
        date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
      rows.push(
        <TableRow className="memberRow" key={i}>
          <TableRowColumn style={{ textAlign: "center" }}>
            {this.props.registeredMembers[i].name}
          </TableRowColumn>
          <TableRowColumn
            className="tableColumnToHide"
            style={{ textAlign: "center" }}
          >
            {this.props.registeredMembers[i].rank}
          </TableRowColumn>
          <TableRowColumn
            className="tableColumnToHide"
            style={{ textAlign: "center" }}
          >
            {joinDate}
          </TableRowColumn>
          <TableRowColumn style={{ textAlign: "center" }}>
            <button
              className="statsButton"
              type="button"
              name="statsButton"
              value={apiKey + "|" + i}
              onClick={this.statsClick}
            >
              <img className="statsImage" src={pieChart} alt="stats icon" />
            </button>
          </TableRowColumn>
        </TableRow>
      );
    }
    let secondCount = rows.length;
    for (let j = 0; j < this.props.unregisteredMembers.length; j++) {
      let date = new Date(this.props.unregisteredMembers[j].joined);
      const joinDate =
        date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
      rows.push(
        <TableRow className="memberRow" key={secondCount++}>
          <TableRowColumn style={{ textAlign: "center" }}>
            {this.props.unregisteredMembers[j].name}
          </TableRowColumn>
          <TableRowColumn
            className="tableColumnToHide"
            style={{ textAlign: "center" }}
          >
            {this.props.unregisteredMembers[j].rank}
          </TableRowColumn>
          <TableRowColumn
            className="tableColumnToHide"
            style={{ textAlign: "center" }}
          >
            {joinDate}
          </TableRowColumn>
          <TableRowColumn style={{ textAlign: "center" }}>N/A</TableRowColumn>
        </TableRow>
      );
    }
    this.setState({ rows: rows });
    console.log(this.state.rows);
    console.log(rows);
    //this.props.dispatch(actions.getMembersInfo(this.props.activeUser.apiKey));
  }
  componentWillReceiveProps(nextProps) {
    /*if(nextProps.selectedMember){
      nextProps.history.push("/dashboard/members/"+nextProps.accountInfo.name.toLowerCase());
    }*/
    if (this.props.registeredMembers !== nextProps.registeredMembers) {
      let rows = [];
      for (let i = 0; i < nextProps.registeredMembers.length; i++) {
        const apiKey = this.getAPIKey(nextProps, i);
        let date = new Date(nextProps.registeredMembers[i].joined);
        const joinDate =
          date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
        rows.push(
          <TableRow className="memberRow" key={i}>
            <TableRowColumn style={{ textAlign: "center" }}>
              {nextProps.registeredMembers[i].name}
            </TableRowColumn>
            <TableRowColumn
              className="tableColumnToHide"
              style={{ textAlign: "center" }}
            >
              {nextProps.registeredMembers[i].rank}
            </TableRowColumn>
            <TableRowColumn
              className="tableColumnToHide"
              style={{ textAlign: "center" }}
            >
              {joinDate}
            </TableRowColumn>
            <TableRowColumn style={{ textAlign: "center", padding: 0 }}>
              <button
                className="statsButton"
                type="button"
                name="statsButton"
                value={apiKey + "|" + i}
                onClick={this.statsClick}
              >
                <img className="statsImage" src={pieChart} alt="stats icon" />
              </button>
            </TableRowColumn>
          </TableRow>
        );
      }
      let secondCount = rows.length;
      for (let j = 0; j < nextProps.unregisteredMembers.length; j++) {
        let date = new Date(nextProps.unregisteredMembers[j].joined);
        const joinDate =
          date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
        rows.push(
          <TableRow className="memberRow" key={secondCount++}>
            <TableRowColumn style={{ textAlign: "center" }}>
              {nextProps.unregisteredMembers[j].name}
            </TableRowColumn>
            <TableRowColumn
              className="tableColumnToHide"
              style={{ textAlign: "center" }}
            >
              {nextProps.unregisteredMembers[j].rank}
            </TableRowColumn>
            <TableRowColumn
              className="table tableColumnToHide"
              style={{ textAlign: "center" }}
            >
              {joinDate}
            </TableRowColumn>
            <TableRowColumn style={{ textAlign: "center" }}>N/A</TableRowColumn>
          </TableRow>
        );
      }
      this.setState({ rows: rows });
      console.log(this.state.rows);
      console.log(rows);
    }
  }
  getAPIKey(props, memberIndex) {
    return props.registeredMembers[memberIndex].apiKey;
  }
  statsClick(event) {
    const statsValue = event.currentTarget.value;
    console.log(statsValue);
    const options = statsValue.split("|");
    this.props.dispatch(
      actions.selectMember(options[0], this.props.registeredMembers)
    );
    this.props.history.push(
      "/dashboard/members/" +
        encodeURIComponent(
          this.props.registeredMembers[
            parseInt(options[1], 10)
          ].name.toLowerCase()
        )
    );
  }
  render() {
    if (this.props.membersLoading) {
      return (
        <section className="membersLoadingScreen">
          <CircularProgress size={80} thickness={5} />
        </section>
      );
    }

    //<SectionBar additionalClasses="onTeam" title={<div>On team <img className="greenRectIcon" src={greenRect} alt="green highlight" /></div>} />
    return (
      <section className="membersTable">
        <SectionBar title="Guild Members" />
        <Table selectable={false}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn style={{ textAlign: "center" }}>
                Handle
              </TableHeaderColumn>
              <TableHeaderColumn
                className="tableColumnToHide"
                style={{ textAlign: "center" }}
              >
                Rank
              </TableHeaderColumn>
              <TableHeaderColumn
                className="tableColumnToHide"
                style={{ textAlign: "center" }}
              >
                Joined
              </TableHeaderColumn>
              <TableHeaderColumn style={{ textAlign: "center" }}>
                Stats
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>{this.state.rows}</TableBody>
        </Table>
      </section>
    );
  }
}

const mapStateToProps = (state, props) => ({
  unregisteredMembers: state.members.unregisteredMembers,
  registeredMembers: state.members.registeredMembers,
  selectedMember: state.members.selectedMember,
  accountInfo: state.members.accountInfo,
  callsFinished: state.members.callsFinished,
  guildDetails: state.guild.guildDetails,
  activeGuild: state.registrationAndLogin.activeGuild,
  activeUser: state.registrationAndLogin.activeUser,
  membersLoading: state.members.membersLoading
});

export default withRouter(connect(mapStateToProps)(MembersTable));
