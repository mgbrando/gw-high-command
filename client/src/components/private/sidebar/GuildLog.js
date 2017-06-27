import React, { Component } from 'react';
import {connect} from 'react-redux';
import {List, ListItem, makeSelectable} from 'material-ui/List';
import CircularProgress from 'material-ui/CircularProgress';
import * as actions from '../../../actions/logAndTasksActions';
import './SideBar.css';

//let logWorker = require("../../workers/logWorker.js");

class GuildLog extends Component {

  constructor(props) {
    super(props);

    this.getLog = this.getLog.bind(this);
  }

  componentWillMount(){
   /* let worker = new logWorker();

    worker.onmessage = function(e){
      this.props.dispatch(actions.getLogEntries(e.data));
    }*/
  }
  componentDidMount(){
    this.getLog();
  }
  componentWillReceiveProps(nextProps){
    if(this.props.logMounted !== nextProps.logMounted)
      setInterval(this.getLog(nextProps), 5000);
    /*if(this.props.log.length > 0)
      setInterval(this.props.dispatch(actions.getLogEntries(this.props.activeGuild, this.props.activeUser.apiKey, this.props.log[this.props.log.length-1].id)) ,5000);*/
  }

  getLog(nextProps = null){
      if(nextProps){
        nextProps.dispatch(actions.getNewLogEntries(nextProps.activeGuild, nextProps.activeUser.apiKey, nextProps.log[nextProps.log.length-1].id));
      }
      else if(this.props.log.length === 0){
      //const getLogEntriesPromise = new Promise(resolve, re)
        this.props.dispatch(actions.getLogEntries(this.props.activeGuild, this.props.activeUser.apiKey));
      }
      else{
        setInterval(this.props.dispatch(actions.getNewLogEntries(this.props.activeGuild, this.props.activeUser.apiKey, this.props.log[this.props.log.length-1].id)), 5000);
      }
  }

  render() {
    if(this.props.logHasBeenFetched && this.props.log.length > 0){
    let count = 0;
    const logItems = this.props.log.map(logEntry => {
      switch(logEntry.type){
        case 'joined':
          const text = (<span></span>);
          return (<ListItem 
            primaryText='[ NEW MEMBER ]: ' 
            secondaryText={<span>{logEntry.user} has joined the guild.</span>}
            key={count++}
          />);
          break;
        case 'invited':
          return (<ListItem 
            primaryText='[ INVITE ]: ' 
            secondaryText={<span>{logEntry.user} has been invited by {logEntry.invited_by} to join the guild.</span>}
            key={count++} 
          />);
          break;
        case 'kick':
          return (<ListItem 
            primaryText='[ KICK ]: ' 
            secondaryText={<span>{logEntry.user} has been kicked from the guild by {logEntry.kicked_by}.</span>}
            key={count++} 
          />);
          break;
        case 'rank_change':
          return (<ListItem 
            primaryText='[ RANK CHANGE ]: ' 
            secondaryText={<span>{logEntry.user} has had their ranked changed from {logEntry.old_rank} to {logEntry.new_rank} by {logEntry.changed_by || 'SYSTEM'}.</span>}
            key={count++} 
          />);
          break;
        case 'treasury':
          return (<ListItem 
            primaryText='[ TREASURY ]: ' 
            secondaryText={<span>{logEntry.user} has deposited {logEntry.count} {logEntry.item_name}.</span>}
            key={count++} 
          />);
          break;
        case 'stash':
          if(logEntry.operation === 'deposit'){
            if(logEntry.hasOwnProperty('item_name'))
              return (<ListItem 
                primaryText='[ STASH ]: ' 
                secondaryText={<span>{logEntry.user} has deposited {logEntry.count} {logEntry.item_name} and {logEntry.coins} coins.</span>}
                key={count++} 
              />);
            else
              return (<ListItem 
                primaryText='[ STASH ]: ' 
                secondaryText={<span>{logEntry.user} has deposited {logEntry.coins} coins.</span>}
                key={count++} 
              />);
          }
          else{
            if(logEntry.hasOwnProperty('item_name'))
              return (<ListItem 
                primaryText='[ STASH ]: ' 
                secondaryText={<span>{logEntry.user} has withdrawn {logEntry.count} {logEntry.item_name} and {logEntry.coins} coins.</span>}
                key={count++} 
              />);
            else
              return (<ListItem 
                primaryText='[ STASH ]: ' 
                secondaryText={<span>{logEntry.user} has withdrawn {logEntry.coins} coins.</span>}
                key={count++} 
              />);
          }
          break;
        case 'motd':
          return (<ListItem 
            primaryText='[ MOTD ]: ' 
            secondaryText={<span>{logEntry.user} has changed the message of the day to {logEntry.motd}.</span>}
            key={count++} 
          />);
          break;
        case 'upgrade':
          if(logEntry.action === 'queued')
            return (<ListItem 
            primaryText='[ UPGRADE ]: ' 
            secondaryText={<span>{logEntry.user} has queued the {logEntry.upgrade_name} upgrade for completion.</span>}
            key={count++} 
          />);
          else if(logEntry.action === 'cancelled')
            return (<ListItem 
            primaryText='[ UPGRADE ]: ' 
            secondaryText={<span>{logEntry.user} has cancelled the {logEntry.upgrade_name} upgrade.</span>}
            key={count++} 
          />);
          else if(logEntry.action === 'completed')
            return (<ListItem 
            primaryText='[ UPGRADE ]: ' 
            secondaryText={<span>{logEntry.user} has completed the {logEntry.upgrade_name} upgrade.</span>}
            key={count++} 
          />);          
          else{
            return (<ListItem 
              primaryText='[ UPGRADE ]: ' 
              secondaryText={<span>{logEntry.user} has sped up the completion of the {logEntry.upgrade_name} upgrade.</span>}
              key={count++} 
            />);            
          }
          break;

        default:
            return (<ListItem 
              primaryText='[ ERROR ]: ' 
              secondaryText={<span>Unknown log entry type.</span>}
              key={count++} 
            />);   
        }
    });
    
      return (
        <List className="guildLogList">
          {logItems}
        </List>
      );
    }
    else{
      return (<div className="guildLogList">No guild log entries available.</div>);
    }
  }
}
//        <Paper className="infoSection" zDepth={2}>        </Paper>
const mapStateToProps = (state, props) => ({
    log: state.logAndTasks.log,
    logHasBeenFetched: state.logAndTasks.logHasBeenFetched,
    activeGuild: state.registrationAndLogin.activeGuild,
    activeUser: state.registrationAndLogin.activeUser,
    logMounted: state.logAndTasks.logMounted
});

export default connect(mapStateToProps)(GuildLog);