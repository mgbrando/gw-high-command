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
import SimplePieChart from 'react-simple-pie-chart';
import BarChart from 'react-bar-chart';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

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
  /*const aggregatePVPStats = Object.keys(props.pvpStats.aggregate).map((stat) => {
    console.log(props.pvpStats.aggregate[stat]);
    let color;
    switch(colorCount++){
      case 0:
        color='blue';
        break; 
      case 1:
        color='green';
        break;
      case 2:
        color='red';
        break;
      case 3:
        color='orange';
        break;
      case 4:
        color='yellow';
        break;
      default:
        color: 'black'
        break;
    }
    return {value: props.pvpStats.aggregate[stat], color: color};
  });*/
  /*const aggregatePVPStats2 = Object.keys(props.pvpStats.aggregate).map((stat) => {
    console.log(props.pvpStats.aggregate[stat]);
    return {value: props.pvpStats.aggregate[stat], label: stat};
  });*/
  const margin = {top: 20, right: 20, bottom: 30, left: 40};
  //let colorCount = 0;
  //let barChartHeader='';
  let stats;
  let barChart;
  switch(props.pvpTypeValue){
    case 1:
      //barChartHeader = 'Aggregate';
      if(props.hasStatistics(props.pvpStats.aggregate)){
        stats = Object.keys(props.pvpStats.aggregate).map((stat) => {
          console.log(props.pvpStats.aggregate[stat]);
          return {value: props.pvpStats.aggregate[stat], text: stat};
        });
      }
      else
        stats = 'No aggregate stats available';
      break;
    case 2:
      //barChartHeader = 'Ranked';
      if(props.hasStatistics(props.pvpStats.ladders.ranked)){
        stats = Object.keys(props.pvpStats.ladders.ranked).map((stat) => {
          console.log(props.pvpStats.ladders.ranked[stat]);
          return {value: props.pvpStats.ladders.ranked[stat], text: stat};
        });
      }
      else
        stats = 'No ranked stats available';
      break;
    case 3:
      //barChartHeader = 'Unranked';
      if(props.hasStatistics(props.pvpStats.ladders.unranked)){
        stats = Object.keys(props.pvpStats.ladders.unranked).map((stat) => {
          return {value: props.pvpStats.ladders.unranked[stat], text: stat};
        });
      }
      else
        stats = 'No unranked stats available'; 
      break;
    default:
      //barChartHeader = 'Aggregate';
      if(props.hasStatistics(props.pvpStats.aggregate)){
        stats = Object.keys(props.pvpStats.aggregate).map((stat) => {
          console.log(props.pvpStats.aggregate[stat]);
          return {value: props.pvpStats.aggregate[stat], text: stat};
        });
      }
      else
        stats = 'No aggregate stats available';
      break;
    }

    const barChartStats = Array.isArray(stats) ? (<BarChart
                  width={500}
                  height={300}
                  margin={margin}
                  data={stats}
                />) :
                (<div>{stats}</div>);
  //colorCount = 0;


  /*let characterPieCharts = [];
  let characterCount = 0;
  let charactersWithStats =[];
  for(let property in props.pvpStats.professions){
    charactersWithStats.push(property.charAt(0).toUpperCase() + property.slice(1));
  }*/
  /*  const character = Object.keys(props.pvpStats.professions[property]).map(stat => {
      return {value: props.pvpStats.professions[property][stat], label: props.pvpStats.professions[property][stat]}
    });
    characterPieCharts.push(<div className="characterChart" 
                                 key={property}>
                                 <h4>{property.charAt(0).toUpperCase() + property.slice(1)}</h4>
                                 <Piechart 
                                    x={150}
                                    y={75}
                                    outerRadius={50}
                                    innerRadius={10}
                                    data={character}
                                  />
                            </div>);
  }*/
  /*let charactersWithoutStats = props.characters.filter(character => {
    return (charactersWithStats.indexOf(character.profession) === -1) ? true : false;
  });
  charactersWithoutStats = charactersWithoutStats.map(character => {
    return character.profession;
  });*/
  /*const noStatsData = [
                        {value: 0, label: 'wins'}, 
                        {value: 0, label: 'losses'}, 
                        {value: 0, label: 'desertions'}, 
                        {value: 0, label: 'byes'}, 
                        {value: 0, label: 'forfeits'}
                      ];*/
  /*for(let i = 0; i < charactersWithoutStats.length; i++){
    characterPieCharts.push(<div className="characterChart" 
                                 key={charactersWithoutStats[i].toLowerCase()}>
                              <h4>{charactersWithoutStats[i]}</h4>
                              <div><span>No PVP data recorded for this profession</span></div>
                            </div>);
  }*/

  /*charactersWithStats.sort(props.sortCharacters);
  if(props.professionTypeValue === ""){
    props.setProfessionTypeValue(charactersWithStats[0]);
  }
  const character = Object.keys(props.pvpStats.professions[props.professionTypeValue.toLowerCase()]).map(stat => {
    return {value: props.pvpStats.professions[props.professionTypeValue.toLowerCase()][stat], label: props.pvpStats.professions[props.professionTypeValue.toLowerCase()][stat]}
  });*/
  const characterPieChart = (props.charactersWithStats.indexOf(props.professionTypeValue) === -1) ? 
    (<div className="characterChart"> 
      <h4>{props.professionTypeValue}</h4>
      <div><span>No PVP data recorded for this profession</span></div>
    </div>) : 
    (<div className="characterChart">
      <h4>{props.professionTypeValue}</h4>
        <Piechart 
          x={150}
          y={75}
          outerRadius={50}
          innerRadius={10}
          data={props.characterData}
        />
    </div>);

  const allCharacters=[...props.charactersWithStats, ...props.charactersWithoutStats];
  //allCharacters.sort(props.sortCharacters);
  //let allCharactersCount = 1;
  allCharacters = allCharacters.map(character => {
    console.log(character);
    return (<MenuItem value={character} primaryText={character} />);
  });

           /*   <Piechart 
                x={100}
                y={100}
                outerRadius={100}
                innerRadius={50}
                data={aggregatePVPStats}
              />*/
          /*              <SimplePieChart 
                className="memberChart"
                size={50}
                style={{width: '50px', height: '50px'}}
                slices={aggregatePVPStats}
              />*/

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
          <div className="textCenter overallChart">
            <h2 className="sectionHeader">sPvP win ratios</h2>
            <div className='barChartDisplay'>
              <h3><DropDownMenu value={props.pvpTypeValue} onChange={props.handlePVPTypeChange}>
                <MenuItem value={1} primaryText="Aggregate" />
                <MenuItem value={2} primaryText="Ranked" />
                <MenuItem value={3} primaryText="Unranked" />
              </DropDownMenu></h3>
              {barChartStats}
            </div>
          </div>
          <div>
            <h2 className="sectionHeader">sPvP win ratios by character (all seasons)</h2>
            <div className="pieChartDisplay">
              <h3><DropDownMenu value={props.professionTypeValue} onChange={props.handleProfessionChange}>
                {allCharacters}
              </DropDownMenu></h3>
              {characterPieChart}
            </div>
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
/*          <div className="left50">
              <h3>Ranked</h3>
              <BarChart
                  width={500}
                  height={200}
                  margin={margin}
                  data={rankedPVPStats}
              />
            </div>
            <div className="right50">
              <h3>Unranked</h3>
              <BarChart
                  width={500}
                  height={200}
                  margin={margin}
                  data={unrankedPVPStats}
              />
            </div>*/
/*      <AppBar
        title={<span>{props.title}</span>}
        iconElementLeft={<span></span>}
        iconElementRight={<FloatingActionButton style={style}>
                            <ContentAdd />
                          </FloatingActionButton>}
      />*/
export default MemberPVPStats; 