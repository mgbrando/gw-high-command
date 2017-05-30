import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
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
       /*     <form className="userNameAndPasswordForm" onSubmit={(event) => {event.preventDefault(); props.onSubmit();}}>
              <label for="userName">Username</label>
              <input id="userName" type="text" name="userName" onChange={props.getUserNameInput} required pattern="^[a-zA-Z0-9]{8}$"/>
              <label for="password">Password</label>
              <input id="password" type="password" name="password" onChange={props.getPasswordInput} required pattern="^[a-zA-Z0-9]{8}$"/>
              <label for="confirmPassword">Confirm password:</label>
              <input id="confirmPassword" type="password" name="confirmPassword" onChange={props.getConfirmPasswordInput} required />
            </form>*/
  //<button type="submit" disabled={props.credentialsSubmitDisabled}>Submit</button>
	 if(props.type === 'loginCredentials'){
        return (
          <div className="leaderLoginCredentials">
            <h2>Login Credentials</h2>
              <form className="userNameAndPasswordForm" onSubmit={props.registerGuildLeader}>
                <TextField
                  hintText="Must be 8 characters long"
                  floatingLabelText="Username"
                  floatingLabelFixed={true}
                  errorText={props.usernameErrorMessage}
                  onChange={props.getUsernameInput}
                  value={props.usernameValue}
                />
                <TextField
                  type="password"
                  hintText="Must be 8 characters long"
                  floatingLabelText="Password"
                  floatingLabelFixed={true}
                  errorText={props.passwordErrorMessage}
                  onChange={props.getPasswordInput}
                  disabled={props.passwordDisabled}
                  value={props.passwordValue}
                />
                <TextField
                  type="password"
                  hintText="Must be 8 characters long"
                  floatingLabelText="Confirm Password"
                  floatingLabelFixed={true}
                  errorText={props.confirmPasswordErrorMessage}
                  onChange={props.getConfirmPasswordInput} 
                  disabled={props.confirmPasswordDisabled}
                  value={props.confirmPasswordValue}
                />
              </form>
          </div>
        );
       //<button type="submit" disabled={props.credentialsSubmitDisabled}>Submit</button>
    }
    else if(props.type === 'login'){
        return (
          <div className="leaderLogin">
            <h2>Login</h2>
            <form className="userNameAndPasswordForm" onSubmit={(event) => {event.preventDefault(); props.onSubmit();}}>
                <TextField
                  floatingLabelText="Username"
                  floatingLabelFixed={true}
                  errorText={props.usernameErrorMessage}
                  onChange={props.getUsernameInput}
                  value={props.usernameValue}
                />
                <TextField
                  type="password"
                  floatingLabelText="Password"
                  floatingLabelFixed={true}
                  errorText={props.passwordErrorMessage}
                  onChange={props.getPasswordInput}
                  disabled={props.passwordDisabled}
                  value={props.passwordValue}
                />
              <RaisedButton className="loginButton" type="submit" primary={true} label="Submit" />
            </form>
          </div>
        );
    }
}
//<button type="submit">Submit</button>

export default UserNameAndPasswordForm;