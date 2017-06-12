import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../actions/membersActions';
import { Redirect } from 'react-router-dom';
import SectionBar from '../SectionBar';
import greenRect from '../../assets/green-rectangle.png';
import pieChart from '../../assets/pie-chart.png';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
//import GuildDetails from './GuildDetails';
//import GuildUpgrades from './GuildUpgrades';
import './GuildMembers.css';

class MembersTable extends Component {

  constructor(props) {
    super(props);
    //this.displayPage = this.displayPage.bind(this);
  }

  componentWillMount(){
    let rows = [];
    for(let i=0; i < this.props.registeredMembers.length; i++)
      rows.push(<TableRow>
                  <TableRowColumn>{this.props.registeredMembers[i].handleName}</TableRowColumn>
                  <TableRowColumn>{this.props.registeredMembers[i].rank}</TableRowColumn>
                  <TableRowColumn>{this.props.registeredMembers[i].joined}</TableRowColumn>
                  <TableRowColumn><input type="image" onClick={this.statsClick} src={pieChart} alt="stats icon" value={this.props.registeredMembers[i].apiKey} /></TableRowColumn>
                </TableRow>);
    this.setState({ rows: rows });
    //this.props.dispatch(actions.getMembersInfo(this.props.activeUser.apiKey));
  }

  statsClick(apiKey){
    this.props.dispatch(actions.selectMember(apiKey, this.props.registeredMembers));
  }

  render() {
    if(this.props.selectedMember){
      const url="/dashboard/members/"+this.props.selectedMember.handleName;
      return (
        <Redirect to={url} />
      );
    }
    else{
    return (
      <section className="membersTable">
        <SectionBar title="Guild Members" />
        <SectionBar additionalClasses="onTeam" title={<div>On team <img className="greenRectIcon" src={greenRect} alt="green highlight" /></div>} />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>Handle</TableHeaderColumn>
              <TableHeaderColumn>Rank</TableHeaderColumn>
              <TableHeaderColumn>Joined</TableHeaderColumn>
              <TableHeaderColumn>Stats</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody> 
            {this.state.rows}
          </TableBody>
        </Table>
      </section>
    );
    }
  }
}


const mapStateToProps = (state, props) => ({
  unregisteredMembers: state.members.unregisteredMembers,
  registeredMembers: state.members.registeredMembers,
  selectedMember: state.members.selectedMember
});

export default connect(mapStateToProps)(MembersTable);