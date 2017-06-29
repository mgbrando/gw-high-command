import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import CircularProgress from 'material-ui/CircularProgress';
import Paper from 'material-ui/Paper';

function TeamPVPStats(props){
  if(props.loading && props.display){
    return (
      <div className="teamPVPStats">
        <Paper className="infoSection" zDepth={2}>
          <CircularProgress size={80} thickness={5} />
        </Paper>
      </div>
    );
  }
  else if(props.display){
    let seasonRating;
    if(typeof props.seasonPVPStats === 'object')
      seasonRating = props.seasonPVPStats.rating;
    else
      seasonRating = 'N/A';

    return (
      <div className="teamPVPStats">
        <Paper className="infoSection" zDepth={2}>
          <Paper className="teamPVPStatsInfo" zDepth={5}>
          <h1 className="sectionHeader">Season Rating</h1>
          <h2 className="seasonRating">{seasonRating}</h2>
          <div className="teamStatistics">
            <h2 className="sectionHeader">sPvP win ratios</h2>
            <div className="teamSPVPSection">
              <h3>This Season</h3>
              <div className="piechart"></div>
            </div>
            <div className="teamSPVPSection">
              <h3>Ranked</h3>
              <div className="piechart"></div>
            </div>
            <div className="teamSPVPSection">
              <h3>Unranked</h3>
              <div className="piechart"></div>
            </div>
          </div>
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
export default TeamPVPStats; 