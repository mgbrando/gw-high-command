import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Paper from 'material-ui/Paper';

const style = {
  height: 100,
  width: 100,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};

function GuildUpgrades(props){
  return (
    <div className="guildUpgrades">
      <Paper className="infoSection" zDepth={2}>
        <h1>Guild Name</h1>
      </Paper>
    </div>
  );
  //<FlatButton label="Log Out" onClick={props.logOut}/>
}
 /*     <AppBar
        title={<span>{props.title}</span>}
        iconElementLeft={<span></span>}
        iconElementRight={<FloatingActionButton style={style}>
                            <ContentAdd />
                          </FloatingActionButton>}
      />*/
export default GuildUpgrades; 