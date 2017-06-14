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
    this.state = {
      rows: []
    };
    this.statsClick = this.statsClick.bind(this);
    this.getAPIKey = this.getAPIKey.bind(this);
  }

  componentDidMount(){
    let rows = [];
    for(let i=0; i < this.props.registeredMembers.length; i++){
      const apiKey = this.getAPIKey(i);
      rows.push(<TableRow className="memberRow" key={i}>
                  <TableRowColumn>{this.props.registeredMembers[i].name}</TableRowColumn>
                  <TableRowColumn>{this.props.registeredMembers[i].rank}</TableRowColumn>
                  <TableRowColumn>{this.props.registeredMembers[i].joined}</TableRowColumn>
                  <TableRowColumn><button type="button" name="statsButton" value={apiKey} onClick={this.statsClick}><img className="statsImage" src={pieChart} /></button></TableRowColumn>
                </TableRow>);
    }
    this.setState({ rows: rows });
    console.log(this.state.rows);
    console.log(rows);
    //this.props.dispatch(actions.getMembersInfo(this.props.activeUser.apiKey));
  }
  getAPIKey(memberIndex){
    return this.props.registeredMembers[memberIndex].apiKey;
  }
  statsClick(event){
    const apiKey = event.currentTarget.value;
    console.log(apiKey);
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