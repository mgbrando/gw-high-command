import React from 'react';
import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';

function GuildDetails(props){

  if(props.display){
    /*let coins = props.coins;
    const gold = Math.floor(coins/10000);
    coins -= gold*10000;
    const silver = Math.floor(coins/100);
    coins -= silver*100;
    const copper = coins;*/
    let totalCoinsElement;
    if(Object.keys(props.coins).length > 0){
      totalCoinsElement = (          
          <div className="totalCoins">
            <span className="category">Total Coins: </span>
            <div className="coinAmount"><img src={require('../../assets/gold.png')} alt="gold" /><span>{props.coins.gold}</span></div>
            <div className="coinAmount"><img src={require('../../assets/silver.png')} alt="silver" /><span>{props.coins.silver}</span></div>
            <div className="coinAmount"><img src={require('../../assets/bronze.png')} alt="copper" /><span>{props.coins.copper}</span></div>
          </div>);
    }
    else{
      totalCoinsElement = (          
          <div className="totalCoins">
            <span className="category">Total Coins: </span>
            <div className="coinAmount"><img src={require('../../assets/gold.png')} alt="gold" /><span>0</span></div>
            <div className="coinAmount"><img src={require('../../assets/silver.png')} alt="silver" /><span>0</span></div>
            <div className="coinAmount"><img src={require('../../assets/bronze.png')} alt="copper" /><span>0</span></div>
          </div>);
    }


    return (
      <div className="guildDetails">
        <Paper className="infoSection" zDepth={2}>
          <Paper className="guildDetailsInfo" zDepth={5}>
          <h1 className="sectionHeader">Guild Name</h1>
          <h2 className="guildName">{props.guildDetails.name}</h2>
          <List className="guildDetailsList">
            <ListItem primaryText="Level" secondaryText={props.guildDetails.level} disabled={true}/>
            <ListItem primaryText="Influence" secondaryText={props.guildDetails.influence} disabled={true}/>
          </List>
          <List className="guildDetailsList">
            <ListItem primaryText="Favor" secondaryText={props.guildDetails.favor} disabled={true}/>
            <ListItem primaryText="Aetherium" secondaryText={props.guildDetails.aetherium} disabled={true}/>
          </List>
            {totalCoinsElement}
          </Paper>
        </Paper>
      </div>
    );
  }
  else{
    return false;
  }
}

export default GuildDetails; 