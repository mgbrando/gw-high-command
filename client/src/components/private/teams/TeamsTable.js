/*import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../actions/teamsActions';
import { Redirect } from 'react-router-dom';
import SectionBar from '../SectionBar';
import pieChart from '../../assets/pie-chart.png';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import './GuildTeams.css';

class TeamsTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      rows: []
    };
    this.statsClick = this.statsClick.bind(this);
    this.getAPIKey = this.getAPIKey.bind(this);
  }

  componentDidMount(){

  }
  componentWillReceiveProps(nextProps){
    if(this.props.guildTeams != nextProps.guildTeams){
      let rows = [];
      for(let i=0; i < nextProps.guildTeams.length; i++){
        const apiKey = this.getAPIKey(nextProps, i);
        rows.push(<TableRow className="memberRow" key={i}>
                  <TableRowColumn>{nextProps.guildTeams[i].name}</TableRowColumn>
                  <TableRowColumn>{nextProps.guildTeams[i].seasons[nextProps.guildTeams[i].seasons.length-1].rating}</TableRowColumn>
                  <TableRowColumn><button type="button" name="statsButton" value={apiKey} onClick={this.statsClick}><img className="statsImage" src={pieChart} /></button></TableRowColumn>
                </TableRow>);
        }
      this.setState({ rows: rows });
      console.log(this.state.rows);
      console.log(rows);  
    }
  }
  getAPIKey(props, memberIndex){
    return props.registeredMembers[memberIndex].apiKey;
  }
  statsClick(event){
    const apiKey = event.currentTarget.value;
    console.log(apiKey);
    this.props.dispatch(actions.selectTeam(apiKey, this.props.registeredMembers));
  }

  render() {
    if(this.props.selectedTeam){
      const url="/dashboard/teams/"+encodeURIComponent((this.props.accountInfo.name).toLowerCase());
      return (
        <Redirect to={url} />
      );
    }
    else{
    return (
      <section className="teamsTable">
        <SectionBar title="Guild Members" />
        <Table selectable={false}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Rating</TableHeaderColumn>
              <TableHeaderColumn>Stats</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}> 
            {this.state.rows}
          </TableBody>
        </Table>
      </section>
    );
    }
  }
}


const mapStateToProps = (state, props) => ({
  guildTeams: state.teams.guildTeams,
  selectedMember: state.teams.selectedTeam,
  //accountInfo: state.members.accountInfo
});

export default connect(mapStateToProps)(TeamsTable);