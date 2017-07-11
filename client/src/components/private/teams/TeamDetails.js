import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import CircularProgress from 'material-ui/CircularProgress';
import {List, ListItem, makeSelectable} from 'material-ui/List';
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
  //<FlatButton label="Log Out" onClick={props.logOut}/>
}

/*      <AppBar
        title={<span>{props.title}</span>}
        iconElementLeft={<span></span>}
        iconElementRight={<FloatingActionButton style={style}>
                            <ContentAdd />
                          </FloatingActionButton>}
      />*/
export default TeamDetails; 