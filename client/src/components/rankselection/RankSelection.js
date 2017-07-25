import React from 'react';
import {Link} from 'react-router-dom';
import AboutDialog from './AboutDialog';

function RankSelection(props){
    return (
      <div className="RankSelection">
        <h2><span>What is your Rank?</span></h2>
        <div className="buttonContainer">
          <Link to='/login' className="leaderButtonContainer">
            <button>Guild Leader</button>
          </Link>
          <Link to='/registration/member' className="memberButtonContainer">
            <button>Guild Member</button>
          </Link>
        </div>
        <div className="frontPageDialog">
          <AboutDialog />
        </div>
      </div>
    );
}

   /*       <button onClick={props.getPage('leaderLogin')}>Guild Leader</button>
          <button onClick={props.getPage('memberRegistration')}>Guild Member</button>*/
export default RankSelection;