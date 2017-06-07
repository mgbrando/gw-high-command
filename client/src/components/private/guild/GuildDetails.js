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

//{props.guildDetails.guildName}
function GuildDetails(props){
  if(props.loading && props.display){
    return (
      <div className="guildDetails">
        <Paper className="infoSection" zDepth={2}>
          <CircularProgress size={80} thickness={5} />
        </Paper>
      </div>
    );
  }
  else if(props.display){
    return (
      <div className="guildDetails">
        <Paper className="infoSection" zDepth={2}>
          <h1>Guild Name</h1>
          <Subheader>{props.guildDetails.name}</Subheader>
          Level: {props.guildDetails.level}  Aetherium: {props.guildDetails.aetherium}
          Influence: {props.guildDetails.influence} Favor: {props.guildDetails.favor}
        </Paper>
      </div>
    );
  }
  else{
    return false;
  }
}
  //<FlatButton label="Log Out" onClick={props.logOut}/>

/*      <AppBar
        title={<span>{props.title}</span>}
        iconElementLeft={<span></span>}
        iconElementRight={<FloatingActionButton style={style}>
                            <ContentAdd />
                          </FloatingActionButton>}
      />*/
export default GuildDetails; 