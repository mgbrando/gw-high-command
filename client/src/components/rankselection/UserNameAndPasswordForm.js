import React from 'react';
//import React, { Component } from 'react';
//import {connect} from 'react-redux';
//import {Link} from 'react-router';
//import * as actions from '../../actions/registrationAndLoginActions';
import './RankSelection.css';

function UserNameAndPasswordForm(props){


  /*login(event){
    this.props.onSubmit();
  }
  submitCredentials(event){
    this.props.onSubmit();
  }*/
	 if(props.type === 'loginCredentials'){
        return (
          <div className="leaderLoginCredentials">
            <h2>Login Credentials</h2>
            <form className="userNameAndPasswordForm" onSubmit={(event) => {event.preventDefault(); props.onSubmit();}}>
          		<label for="userName">Username</label>
          		<input id="userName" type="text" name="userName" onChange={this.getUserNameInput} required />
          		<label for="password">Password</label>
          		<input id="password" type="password" name="password" onChange={this.getPasswordInput} required />
          		<label for="confirmPassword">Confirm password:</label>
				      <input id="confirmPassword" type="password" name="confirmPassword" onChange={this.getConfirmPasswordInput} required />
          		<button type="submit">Submit</button>
            </form>
          </div>
        );
    }
    else if(props.type === 'login'){
        return (
          <div className="leaderLogin">
            <h2>Login</h2>
            <form className="userNameAndPasswordForm" onSubmit={(event) => {event.preventDefault(); props.onSubmit();}}>
          		<label htmlFor="loginUserName">Username</label>
          		<input id="loginUserName" type="text" name="loginUserName" onChange={props.getUserNameInput} required />
          		<label htmlFor="loginPassword">Password</label>
          		<input id="loginPassword" type="password" name="loginPassword" onChange={props.getPasswordInput} required />
          		<button type="submit">Submit</button>
            </form>
          </div>
        );
    }
}

export default UserNameAndPasswordForm;