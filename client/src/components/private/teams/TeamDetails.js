import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import {List, ListItem} from 'material-ui/List';
import Paper from 'material-ui/Paper';

function TeamDetails(props){

  if(props.loading && props.display){
    return (
      <div className="teamDetails">
        <Paper className="infoSection" zDepth={2}>
          <CircularProgress size={80} thickness={5} />
        </Paper>
      </div>
    );
  }
  else if(props.display){
    let count = 0;
    const memberListItems = props.members.map(member => {
      return (<ListItem primaryText={member.name} secondaryText={member.role} disabled={true} key={count++}/>);
    });
    return (
      <div className="teamDetails">
        <Paper className="infoSection" zDepth={2}>
          <Paper className="teamDetailsInfo" zDepth={5}>
          <h1 className="sectionHeader">Team</h1>
          <h2 className="teamName">{props.name}</h2>
          <List className="teamMembersList">
            {memberListItems}
          </List>
          </Paper>
        </Paper>
      </div>
    );
  }
  else
    return false;
}

export default TeamDetails; 