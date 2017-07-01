import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../actions/membersActions';
import { Redirect, withRouter } from 'react-router-dom';
import SectionBar from '../SectionBar';
import greenRect from '../../assets/green-rectangle.png';
import pieChart from '../../assets/pie-chart.png';
import CircularProgress from 'material-ui/CircularProgress';
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
    this.props.dispatch(actions.getGuildMembers(this.props.activeGuild, this.props.activeUser.apiKey));
    /*let rows = [];
    for(let i=0; i < this.props.registeredMembers.length; i++){
      const apiKey = this.getAPIKey(this.props, i);
      let date = new Date(this.props.registeredMembers[i].joined);
      const joinDate = (date.getMonth()+1)+'/'+date.getDate()+'/'+date.getFullYear();
      rows.push(<TableRow className="memberRow" key={i}>
                  <TableRowColumn style={{textAlign: 'center'}}>{this.props.registeredMembers[i].name}</TableRowColumn>
                  <TableRowColumn style={{textAlign: 'center'}}>{this.props.registeredMembers[i].rank}</TableRowColumn>
                  <TableRowColumn style={{textAlign: 'center'}}>{joinDate}</TableRowColumn>
                  <TableRowColumn style={{textAlign: 'center'}}><button className="statsButton" type="button" name="statsButton" value={apiKey+"|"+i} onClick={this.statsClick}><img className="statsImage" src={pieChart} /></button></TableRowColumn>
                </TableRow>);
    }
    this.setState({ rows: rows });
    console.log(this.state.rows);
    console.log(rows);*/
    //this.props.dispatch(actions.getMembersInfo(this.props.activeUser.apiKey));
  }
  componentWillReceiveProps(nextProps){
    /*else if(nextProps.selectedMember){
      nextProps.history.push("/dashboard/members/"+nextProps.accountInfo.name.toLowerCase());
    }*/
    if(nextProps.activeGuild !== this.props.activeGuild)
      this.props.dispatch(actions.getGuildMembers(nextProps.activeGuild, nextProps.activeUser.apiKey));
    else if(this.props.registeredMembers !== nextProps.registeredMembers){
      let rows = [];
      for(let i=0; i < nextProps.registeredMembers.length; i++){
        const apiKey = this.getAPIKey(nextProps, i);
        let date = new Date(nextProps.registeredMembers[i].joined);
        const joinDate = (date.getMonth()+1)+'/'+date.getDate()+'/'+date.getFullYear();
        rows.push(<TableRow className="memberRow" key={i}>
                  <TableRowColumn style={{textAlign: 'center'}}>{nextProps.registeredMembers[i].name}</TableRowColumn>
                  <TableRowColumn style={{textAlign: 'center'}}>{nextProps.registeredMembers[i].rank}</TableRowColumn>
                  <TableRowColumn style={{textAlign: 'center'}}>{joinDate}</TableRowColumn>
                  <TableRowColumn style={{textAlign: 'center'}}><button className="statsButton" type="button" name="statsButton" value={apiKey+"|"+i} onClick={this.statsClick}><img className="statsImage" src={pieChart} /></button></TableRowColumn>
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
    const statsValue = event.currentTarget.value;
    console.log(statsValue);
    const options = statsValue.split('|');
    this.props.dispatch(actions.selectMember(options[0], this.props.registeredMembers));
    this.props.history.push("/dashboard/members/"+encodeURIComponent((this.props.registeredMembers[parseInt(options[1])].name).toLowerCase()));
  }

  render() {
    /*if(this.props.selectedMember){
      const url="/dashboard/members/"+encodeURIComponent((this.props.accountInfo.name).toLowerCase());
      return (
        <Redirect to={url} />
      );
    }
    else{*/
    if(this.props.teamsLoading){
      return (
      <section className="memberLoadingScreen">
          <CircularProgress size={80} thickness={5} />
      </section>
      );
    }

    return (
      <section className="membersTable">
        <SectionBar title="Guild Members" />
        <SectionBar additionalClasses="onTeam" title={<div>On team <img className="greenRectIcon" src={greenRect} alt="green highlight" /></div>} />
        <Table selectable={false}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn style={{textAlign: 'center'}}>Handle</TableHeaderColumn>
              <TableHeaderColumn style={{textAlign: 'center'}}>Rank</TableHeaderColumn>
              <TableHeaderColumn style={{textAlign: 'center'}}>Joined</TableHeaderColumn>
              <TableHeaderColumn style={{textAlign: 'center'}}>Stats</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}> 
            {this.state.rows}
          </TableBody>
        </Table>
      </section>
    );
    //}
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
  activeUser: state.registrationAndLogin.activeUser
});

export default withRouter(connect(mapStateToProps)(MembersTable));