import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import CircularProgress from 'material-ui/CircularProgress';
import Paper from 'material-ui/Paper';
import SimplePieChart from 'react-simple-pie-chart';
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
    let seasonBarChart;
    let rankedBarChart;
    let unrankedBarChart;
    let stats;
    console.log('SEASON');
    console.log(props.seasonPVPStats);

    switch(props.pvpTypeValue){
      case 1:
        //barChartHeader = 'Aggregate';
        //if(Object.keys(props.aggregatePVPStats).length > 0 && typeof props.aggregatePVPStats === 'object'){
        if(typeof props.aggregatePVPStats === 'object'){  
          stats = Object.keys(props.aggregatePVPStats).map((stat) => {
            //console.log(props.pvpStats.aggregate[stat]);
            return {value: props.aggregatePVPStats[stat], text: stat};
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
        //barChartHeader = 'Ranked';
        /*stats = Object.keys(props.pvpStats.ladders.ranked).map((stat) => {
          console.log(props.pvpStats.ladders.ranked[stat]);
          return {value: props.pvpStats.ladders.ranked[stat], text: stat};
        });*/
        break;
      case 3:
        if(typeof props.rankedPVPStats === 'object'){
          stats = Object.keys(props.rankedPVPStats).map((stat) => {
            //console.log(props.pvpStats.aggregate[stat]);
            return {value: props.rankedPVPStats[stat], text: stat};
          });
        }
        else
          stats = props.rankedPVPStats;
        break;
      case 4:
        if(typeof props.unrankedPVPStats === 'object'){
          stats = Object.keys(props.unrankedPVPStats).map((stat) => {
            //console.log(props.pvpStats.aggregate[stat]);
            return {value: props.unrankedPVPStats[stat], text: stat};
          });
        }
        else
          stats = props.unrankedPVPStats;
        break;
      default:
        if(typeof props.aggregatePVPStats === 'object'){
          stats = Object.keys(props.aggregatePVPStats).map((stat) => {
            //console.log(props.pvpStats.aggregate[stat]);
            return {value: props.aggregatePVPStats[stat], text: stat};
          });
        }
        else
          stats = props.aggregatePVPStats;
        break;
    }

    seasonRating = (typeof props.seasonPVPStats === 'object') ? props.seasonPVPStats.rating : 'N/A';
    const barChartStats = Array.isArray(stats) ? (<BarChart
                  width={500}
                  height={300}
                  margin={margin}
                  data={stats}
                />) :
                (<div>{stats}</div>);
    /*if(typeof props.seasonPVPStats === 'object'){
      seasonRating = props.seasonPVPStats.rating;
      const seasonPVPStats = [{value: props.seasonPVPStats.wins, text: 'wins'}, {value: props.seasonPVPStats.losses, text: 'losses'}];
      seasonBarChart = (<BarChart
                  width={500}
                  height={200}
                  margin={margin}
                  data={seasonPVPStats}
              />);
    }
    else{
      seasonRating = 'N/A';
      seasonBarChart = props.seasonPVPStats;
    }*/

    /*console.log(props.rankedPVPStats); 
    if(typeof props.rankedPVPStats === 'object'){
      const rankedPVPStats = Object.keys(props.rankedPVPStats).map((stat) => {
        //console.log(props.pvpStats.aggregate[stat]);
        return {value: props.rankedPVPStats[stat], text: stat};
      });
      rankedBarChart = (<BarChart
                  width={500}
                  height={200}
                  margin={margin}
                  data={rankedPVPStats}
              />);
    }
    else{
      rankedBarChart = props.rankedPVPStats;
    }

    if(typeof props.unrankedPVPStats === 'object'){
      const unrankedPVPStats = Object.keys(props.unrankedPVPStats).map((stat) => {
        //console.log(props.pvpStats.aggregate[stat]);
        return {value: props.unrankedPVPStats[stat], text: stat};
      });
      unrankedBarChart = (<BarChart
                  width={500}
                  height={200}
                  margin={margin}
                  data={unrankedPVPStats}
              />);
    }
    else{
      unrankedBarChart = props.unrankedPVPStats;
    }*/
    /*if(seasonPVPStats.length === 0){
      seasonBarChart = '';
    }
    else{
      const seasonPVPStats = [{value: props.seasonPVPStats.wins, text: 'wins'}, {value: props.seasonPVPStats.losses, text: 'losses'}];
      seasonBarChart = (<BarChart
                  width={500}
                  height={200}
                  margin={margin}
                  data={seasonPVPStats}
              />);
    }*/
    
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