import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import Paper from 'material-ui/Paper';
import BarChart from 'react-bar-chart';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

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
    const margin = {top: 20, right: 20, bottom: 30, left: 40};
    let stats;

    switch(props.pvpTypeValue){
      case 1:
        if(typeof props.aggregatePVPStats === 'object'){  
          stats = Object.keys(props.aggregatePVPStats).map((stat) => {
            return {value: props.aggregatePVPStats[stat], text: stat.charAt(0).toUpperCase()};
          });
        }
        else
          stats = props.aggregatePVPStats;
        break;
      case 2:
        if(typeof props.seasonPVPStats === 'object'){
          stats = [{value: props.seasonPVPStats.wins, text: 'wins'}, {value: props.seasonPVPStats.losses, text: 'losses'}];
        }
        else
          stats = props.seasonPVPStats;
        break;
      case 3:
        if(typeof props.rankedPVPStats === 'object'){
          stats = Object.keys(props.rankedPVPStats).map((stat) => {
            return {value: props.rankedPVPStats[stat], text: stat.charAt(0).toUpperCase()};
          });
        }
        else
          stats = props.rankedPVPStats;
        break;
      case 4:
        if(typeof props.unrankedPVPStats === 'object'){
          stats = Object.keys(props.unrankedPVPStats).map((stat) => {
            return {value: props.unrankedPVPStats[stat], text: stat.charAt(0).toUpperCase()};
          });
        }
        else
          stats = props.unrankedPVPStats;
        break;
      default:
        if(typeof props.aggregatePVPStats === 'object'){
          stats = Object.keys(props.aggregatePVPStats).map((stat) => {
            //console.log(props.pvpStats.aggregate[stat]);
            return {value: props.aggregatePVPStats[stat], text: stat.charAt(0).toUpperCase()};
          });
        }
        else
          stats = props.aggregatePVPStats;
        break;
    }

    seasonRating = (typeof props.seasonPVPStats === 'object') ? props.seasonPVPStats.rating : 'N/A';
    const barChartStats = Array.isArray(stats) ? (<BarChart
                  width={270}
                  height={300}
                  margin={margin}
                  data={stats}
                />) :
                (<div>{stats}</div>);
    
    return (
      <div className="teamPVPStats">
        <Paper className="infoSection" zDepth={2}>
          <Paper className="teamPVPStatsInfo" zDepth={5}>
          <h1 className="sectionHeader">Season Rating</h1>
          <h2 className="seasonRating">{seasonRating}</h2>
          <div className="textCenter teamStatistics">
            <h2 className="sectionHeader">sPvP win ratios</h2>
              <div className='barChartDisplay'>
                <h3><DropDownMenu value={props.pvpTypeValue} onChange={props.handlePVPTypeChange}>
                  <MenuItem value={1} primaryText="Aggregate" />
                  <MenuItem value={2} primaryText="Season" />
                  <MenuItem value={3} primaryText="Ranked" />
                  <MenuItem value={4} primaryText="Unranked" />
                </DropDownMenu></h3>
                {barChartStats}
              </div>
          </div>
          </Paper>
        </Paper>
      </div>
    );
  }
  else
    return false;
}

export default TeamPVPStats; 