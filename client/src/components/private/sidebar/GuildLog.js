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

    this.state ={
      shouldCallInterval: false
    }

    this.getLog = this.getLog.bind(this);
    this.grabLog = this.grabLog.bind(this);
  }

  componentWillMount(){
   /* let worker = new logWorker();

    worker.onmessage = function(e){
      this.props.dispatch(actions.getLogEntries(e.data));
    }*/
  }
  componentDidMount(){
    //if(this.props.log.length === 0){
      setInterval(this.getLog, 5000);
      /*if()
      setInterval(this.props.dispatch(actions.getNewLogEntries(this.props.activeGuild, this.props.activeUser.apiKey, this.props.log[this.props.log.length-1].id)), 5000);*/
    //}
    /*const logPromise = new Promise(resolve, reject){
      this.props.dispatch(actions.getLogEntries(this.props.activeGuild, this.props.activeUser.apiKey));
    }
    this.getLog();*/
  }
  /*componentDidUpdate(){
    if(this.state.shouldCallInterval){
      this.setState({shouldCallInterval: false});
      setInterval(this.props.dispatch(actions.getNewLogEntries(this.props.activeGuild, this.props.activeUser.apiKey, this.props.log[this.props.log.length-1].id)), 5000);
    }
  }*/
  /*componentWillReceiveProps(nextProps){
    if(this.props.logMounted !== nextProps.logMounted)
      this.setState({shouldCallInterval: true});
    //if(this.props.log.length > 0)
     // setInterval(this.props.dispatch(actions.getLogEntries(this.props.activeGuild, this.props.activeUser.apiKey, this.props.log[this.props.log.length-1].id)) ,5000);
  }*/

  grabLog = async () => {
    await this.props.dispatch(actions.getLogEntries(this.props.activeGuild, this.props.activeUser.apiKey));
    setInterval(this.props.dispatch(actions.getNewLogEntries(this.props.activeGuild, this.props.activeUser.apiKey, this.props.log[this.props.log.length-1].id)), 5000);
  };

  getLog(){
    this.props.dispatch(actions.getLogEntries(this.props.activeGuild, this.props.activeUser.apiKey, this.props.log));
      /*if(nextProps){
        nextProps.dispatch(actions.getNewLogEntries(nextProps.activeGuild, nextProps.activeUser.apiKey, nextProps.log[nextProps.log.length-1].id));
      }
      else if(this.props.log.length === 0){
      //const getLogEntriesPromise = new Promise(resolve, re)
        this.props.dispatch(actions.getLogEntries(this.props.activeGuild, this.props.activeUser.apiKey));
      }
      else{
        setInterval(this.props.dispatch(actions.getNewLogEntries(this.props.activeGuild, this.props.activeUser.apiKey, this.props.log[this.props.log.length-1].id)), 5000);
      }*/
  }

  render() {
    if(this.props.logHasBeenFetched && this.props.log.length > 0){
    let count = 0;
    const logItems = this.props.log.map(logEntry => {
      switch(logEntry.type){
        case 'joined':
          const text = (<span></span>);
          return (<ListItem 
            primaryText={<div className="logEntry"><strong>[ NEW MEMBER ]:</strong> <span>{logEntry.user} has joined the guild.</span></div> }
            key={count++}
          />);
          break;
        case 'invited':
          return (<ListItem 
            primaryText={<div className="logEntry"><strong>[ INVITE ]:</strong> <span>{logEntry.user} has been invited by {logEntry.invited_by} to join the guild.</span></div>}
            key={count++} 
          />);
          break;
        case 'kick':
          return (<ListItem 
            primaryText={<div className="logEntry"><strong>[ KICK ]:</strong> <span>{logEntry.user} has been kicked from the guild by {logEntry.kicked_by}.</span></div>} 
            key={count++} 
          />);
          break;
        case 'rank_change':
          return (<ListItem 
            primaryText={<div className="logEntry"><strong>[ RANK CHANGE ]:</strong> <span>{logEntry.user} has had their ranked changed from {logEntry.old_rank} to {logEntry.new_rank} by {logEntry.changed_by || 'SYSTEM'}.</span></div>} 
            key={count++} 
          />);
          break;
        case 'treasury':
          return (<ListItem 
            primaryText={<div className="logEntry"><strong>[ TREASURY ]:</strong> <span>{logEntry.user} has deposited {logEntry.count} {logEntry.item_name}.</span></div>}
            key={count++} 
          />);
          break;
        case 'stash':
          if(logEntry.operation === 'deposit'){
            if(logEntry.hasOwnProperty('item_name'))
              return (<ListItem 
                primaryText={<div className="logEntry"><strong>[ STASH ]:</strong> <span>{logEntry.user} has deposited {logEntry.count} {logEntry.item_name} and {logEntry.coins} coins.</span></div>}
                key={count++} 
              />);
            else
              return (<ListItem 
                primaryText={<div className="logEntry"><strong>[ STASH ]:</strong> <span>{logEntry.user} has deposited {logEntry.coins} coins.</span></div>} 
                key={count++} 
              />);
          }
          else{
            if(logEntry.hasOwnProperty('item_name'))
              return (<ListItem 
                primaryText={<div className="logEntry"><strong>[ STASH ]:</strong> <span>{logEntry.user} has withdrawn {logEntry.count} {logEntry.item_name} and {logEntry.coins} coins.</span></div>}
                key={count++} 
              />);
            else
              return (<ListItem 
                primaryText={<div className="logEntry"><strong>[ STASH ]:</strong> <span>{logEntry.user} has withdrawn {logEntry.coins} coins.</span></div>}
                key={count++} 
              />);
          }
          break;
        case 'motd':
          return (<ListItem 
            style={{width: '100%'}}
            primaryText={<div className="logEntry"><strong>[ MOTD ]:</strong> <span>{logEntry.user} has changed the message of the day to {logEntry.motd}.</span></div>} 
            key={count++} 
          />);
          break;
        case 'upgrade':
          if(logEntry.action === 'queued')
            return (<ListItem 
            primaryText={<div className="logEntry"><strong>[ UPGRADE ]:</strong> <span>{logEntry.user} has queued the {logEntry.upgrade_name} upgrade for completion.</span></div>} 
            key={count++} 
          />);
          else if(logEntry.action === 'cancelled')
            return (<ListItem 
            primaryText={<div className="logEntry"><strong>[ UPGRADE ]:</strong> <span>{logEntry.user} has cancelled the {logEntry.upgrade_name} upgrade.</span></div>} 
            key={count++} 
          />);
          else if(logEntry.action === 'completed')
            return (<ListItem 
            primaryText={<div className="logEntry"><strong>[ UPGRADE ]:</strong> <span>{logEntry.user} has completed the {logEntry.upgrade_name} upgrade.</span></div>} 
            key={count++} 
          />);          
          else{
            return (<ListItem 
              primaryText={<div className="logEntry"><strong>[ UPGRADE ]:</strong> <span>{logEntry.user} has sped up the completion of the {logEntry.upgrade_name} upgrade.</span></div>} 
              key={count++} 
            />);            
          }
          break;

        default:
            return (<ListItem 
              primaryText={<div className="logEntry"><strong>[ ERROR ]:</strong> <span>Unknown log entry type.</span></div>}
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