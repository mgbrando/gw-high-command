import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Paper from 'material-ui/Paper';
import CircularProgress from 'material-ui/CircularProgress';
import Subheader from 'material-ui/Subheader';
import {List, ListItem, makeSelectable} from 'material-ui/List';
import './GuildMembers.css';

function MemberDetails(props){
  if(props.loading && props.display){
    return (
      <div className="memberDetails">
        <Paper className="infoSection" zDepth={2}>
          <CircularProgress size={80} thickness={5} />
        </Paper>
      </div>
    );
  }
  else if(props.display){
    let isCommander;
    if(props.accountInfo.commander)
      isCommander = "Yes";
    else
      isCommander = "No";

  return (
      <div className="memberDetails">
        <Paper className="infoSection" zDepth={2}>
          <Paper className="memberDetailsInfo" zDepth={5}>
          <h1 className="sectionHeader">Player Handle</h1>
          <h2 className="guildName">{props.accountInfo.name}</h2>
          <List className="membersDetailsList">
            <ListItem primaryText="Member Since: " secondaryText={props.joined} disabled={true}/>
            <ListItem primaryText="Guilds: " secondaryText={props.accountInfo.guilds} disabled={true}/>
          </List>
          <List className="membersDetailsList">
            <ListItem primaryText="Player Access: " secondaryText={props.accountInfo.access} disabled={true}/>
            <ListItem primaryText="Commander: " secondaryText={isCommander} disabled={true}/>
          </List>
          </Paper>
        </Paper>
      </div>
  );
}
  //<FlatButton label="Log Out" onClick={props.logOut}/>
}

/*      <AppBar
        title={<span>{props.title}</span>}
        iconElementLeft={<span></span>}
        iconElementRight={<FloatingActionButton style={style}>
                            <ContentAdd />
                          </FloatingActionButton>}
      />*/
export default MemberDetails; 