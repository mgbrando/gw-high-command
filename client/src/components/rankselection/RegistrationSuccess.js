import React from 'react';
//import React, { Component } from 'react';
//import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {List, ListItem, makeSelectable} from 'material-ui/List';
//import * as actions from '../../actions/registrationAndLoginActions';
import './RankSelection.css';

function RegistrationSuccess(props){


  /*login(event){
    this.props.onSubmit();
  }
  submitCredentials(event){
    this.props.onSubmit();
  }*/
  let guilds = [];
  for(let i=0; i < props.guilds.length; i++){
    console.log(props.guilds[i].guildName);
    guilds.push(<ListItem primaryText={props.guilds[i].guildName} disabled={true} key={i}></ListItem>);
  }
	 if(props.leader){
        return (
          <div className="leaderLoginCredentials">
            <p>{props.memberName} has been added to the list of registered leaders and can now view the details of the following guilds: </p>
            {guilds}
          <div className="buttonContainer">
            <Link to='/' className="memberButtonContainer">
              <button>Return to Front Page</button>
            </Link>
            <Link to='/login' className="memberButtonContainer">
              <button>Login as Leader</button>
            </Link>
          </div>
        </div>
        );
    }
    else{
        return (
          <div className="leaderLogin">
            <p>{props.memberName} has been added to the following guilds: {props.guilds[0].guildName}</p>
            <List>
              {guilds}
            </List>
          <div className="buttonContainer">
            <Link to='/' className="memberButtonContainer">
              <button>Return to Front Page</button>
            </Link>
          </div>
          </div>
        );
    }
}

export default RegistrationSuccess;