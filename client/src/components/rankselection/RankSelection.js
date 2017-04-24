import React, { Component } from 'react';
import {Link} from 'react-router';
/*import {connect} from 'react-redux';
import GuildDetails from './GuildDetails';
import GuildUpgrades from './GuildUpgrades';
import '/Guild.css';*/

function RankSelection(props){
    return (
      <div className="RankSelection">
        <h2><span>What is your Rank?</span></h2>
        <div className="buttonContainer">
          <Link to='login' className="leaderButtonContainer">
            <button>Guild Leader</button>
          </Link>
          <Link to='member-registration' className="memberButtonContainer">
            <button>Guild Member</button>
          </Link>
        </div>
      </div>
    );
}

   /*       <button onClick={props.getPage('leaderLogin')}>Guild Leader</button>
          <button onClick={props.getPage('memberRegistration')}>Guild Member</button>*/
export default RankSelection;