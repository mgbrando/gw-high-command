import React from 'react';
import Paper from 'material-ui/Paper';
import CircularProgress from 'material-ui/CircularProgress';
import {List, ListItem} from 'material-ui/List';
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
    let count = 0;
    const memberCharacters = props.characters.map(character => {
      return <ListItem secondaryText={`${character.name}: Level ${character.level} ${character.profession}`} disabled={true} key={count++} />;
    });
    const access = props.accountInfo.access.replace(/([A-Z])/g, ' $1').trim();
  return (
      <div className="memberDetails">
        <Paper className="infoSection" zDepth={2}>
          <Paper className="memberDetailsInfo" zDepth={5}>
          <h1 className="sectionHeader">Player Handle</h1>
          <h2 className="memberName">{props.accountInfo.name}</h2>
          <List className="membersDetailsList">
            <ListItem primaryText="Member Since " secondaryText={props.joined} secondaryTextLines={2} disabled={true}/>
            <ListItem primaryText="Guilds " secondaryText={props.memberGuildNames} secondaryTextLines={2} disabled={true}/>
          </List>
          <List className="membersDetailsList">
            <ListItem primaryText="Player Access " secondaryText={access} secondaryTextLines={2} disabled={true}/>
            <ListItem primaryText="Commander " secondaryText={props.isCommander} secondaryTextLines={2} disabled={true}/>
          </List>
          <List className="charactersList">
            Characters
            {memberCharacters}
          </List>
          </Paper>
        </Paper>
      </div>
  );
}
else{
  return false;
}
}

export default MemberDetails; 