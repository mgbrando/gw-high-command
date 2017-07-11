import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Paper from 'material-ui/Paper';
import CircularProgress from 'material-ui/CircularProgress';
import {List, ListItem, makeSelectable} from 'material-ui/List';

function MemberPVEStats(props){
  let count = 0;
  const raidListItems = props.raids.map(raid => (<ListItem primaryText={raid} disabled={true} key={count++}/>));
  let raidListLeft;
  let raidListRight;
  if(raidListItems.length > 1){
    if((raidListItems.length % 2) === 0){
      raidListLeft = raidListItems.slice(0, raidListItems.length/2);
      raidListRight = raidListItems.slice(raidListItems.length/2, raidListItems.length);
    }
    else{
      raidListLeft = raidListItems.slice(0, Math.ceil(raidListItems.length/2));
      raidListRight = raidListItems.slice(Math.ceil(raidListItems.length/2), raidListItems.length);
    }

    return (
      <div className="memberPVEStats">
        <Paper className="infoSection" zDepth={2}>
          <Paper className="memberPVEStatsInfo" zDepth={5}>
          <h1 className="sectionHeader">Completed Weekly Raids</h1>
          <List className="raidListLeft">
            {raidListLeft}
          </List>
          <List className="raidListRight">
            {raidListRight}
          </List>
          </Paper>
        </Paper>
      </div>
    );    
  }
  else{
    return (
      <div className="memberPVEStats">
        <Paper className="infoSection" zDepth={2}>
          <h1>Completed Weekly Raids</h1>
          <List>
            {raidListItems}
          </List>
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
export default MemberPVEStats; 