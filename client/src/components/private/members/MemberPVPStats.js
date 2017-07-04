import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Paper from 'material-ui/Paper';
import CircularProgress from 'material-ui/CircularProgress';
import {List, ListItem, makeSelectable} from 'material-ui/List';
import Piechart from '../piechart/Piechart';

function MemberPVPStats(props){

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
  /*let memberPVPStandings;
  if(Array.isArray(props.pvpStandings) && props.pvpStandings.length === 0){
    memberPVPStandings = 'N/A';
  }
  else{
    memberPVPStandings = props.pvpStandings;
  }*/
  const aggregatePVPStats = Object.keys(props.pvpStats.aggregate).map((stat) => {
    console.log(props.pvpStats.aggregate[stat]);
    return {value: props.pvpStats.aggregate[stat], label: stat};
  });
  const rankedPVPStats = Object.keys(props.pvpStats.ladders.ranked).map((stat) => {
    console.log(props.pvpStats.ladders.ranked[stat]);
    return {value: props.pvpStats.ladders.ranked[stat], label: stat};
  });
  const unrankedPVPStats = Object.keys(props.pvpStats.ladders.unranked).map((stat) => {
    return {value: props.pvpStats.ladders.ranked[stat], label: stat};
  });

  return (
      <div className="memberPVPStats">
        <Paper className="infoSection" zDepth={2}>
          <Paper className="memberPVPStatsInfo" zDepth={5}>
          <List className="membersPVPStatsList">
            <ListItem 
              primaryText="Season Standing: " 
              secondaryText={(Array.isArray(props.pvpStandings) && props.pvpStandings.legnth === 0) ? props.pvpStandings.current.rating : 'N/A' } 
            />
            <ListItem 
              primaryText="Season Points: " 
              secondaryText={ (Array.isArray(props.pvpStandings) && props.pvpStandings.legnth === 0) ? props.pvpStandings.current.points : 'N/A' }
            />
          </List>
          <List className="membersPVPStatsList">
            <ListItem primaryText="sPvP Rank: " secondaryText={props.pvpStats.rank || 'N/A'} />
            <ListItem primaryText="WvW Rank: " secondaryText={props.wvwRank || 'N/A'} />
          </List>
          <div>
            <h2 className="sectionHeader">sPvP win ratios</h2>
            <div className="left50">
              <h3>Ranked</h3>
              <Piechart 
                x={100}
                y={100}
                outerRadius={100}
                innerRadius={50}
                data={aggregatePVPStats}
              />
            </div>
            <div className="right50">
              <h3>Unranked</h3>
              <Piechart 
                x={50}
                y={50}
                outerRadius={50}
                innerRadius={25}
                data={unrankedPVPStats}
              />
            </div>
          </div>
          <div>
            <h2 className="sectionHeader">sPvP win ratios by character</h2>
            <span>placeholder</span>
          </div>
          </Paper>
        </Paper>
      </div>
  );
}
else{
  return false;
  //<FlatButton label="Log Out" onClick={props.logOut}/>
}
}

/*      <AppBar
        title={<span>{props.title}</span>}
        iconElementLeft={<span></span>}
        iconElementRight={<FloatingActionButton style={style}>
                            <ContentAdd />
                          </FloatingActionButton>}
      />*/
export default MemberPVPStats; 