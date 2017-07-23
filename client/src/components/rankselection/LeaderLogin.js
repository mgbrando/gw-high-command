import React, { Component } from 'react';
import {connect} from 'react-redux';
import UserNameAndPasswordForm from './UserNameAndPasswordForm';
import './RankSelection.css';
import {Link} from 'react-router-dom';
import * as actions from '../../actions/registrationAndLoginActions';
import { browserHistory, Redirect } from 'react-router';


class LeaderLogin extends Component {

  constructor(props) {
    super(props);
    //remember you have the method getPage as a prop
    this.getUsernameInput = this.getUsernameInput.bind(this);
    this.getPasswordInput = this.getPasswordInput.bind(this);
    //this.registerGuildLeader = this.registerGuildLeader.bind(this);
    this.authorizeGuildLeader = this.authorizeGuildLeader.bind(this);
  }
  componentWillUnmount(){
    this.props.dispatch(actions.resetLoginState());
  }
  checkAPIKey(APIKey){
    /*action to check for an account with the apiKey and the store the api key
    in the database if you get back an account and that account is in the guild 
    Saves the account name and the API Key*/
    /*Validate the user and that he is in a guild that is registered with the app*/

  }
  getUsernameInput(event){
    this.props.dispatch(actions.getLoginUsernameInput(event.target.value));
  }
  getPasswordInput(event){
    this.props.dispatch(actions.getLoginPasswordInput(event.target.value));
  }
  authorizeGuildLeader(){
    this.props.dispatch(actions.loginGuildLeader(this.props.usernameInput, this.props.passwordInput));
  }
  /*componentWillReceiveProps(nextProps){
    console.log(nextProps);
    if(nextProps.isAuthenticated){
      //browserHistory.push('/dashboard');
      this.props.history.push('/authorization');
    }
  }*/
 /*       <div className="LeaderRegistrationHeader">
          <h2>Login</h2>
        </div>*/

  render() {
    if (this.props.isAuthenticated) {
      return (<Redirect to="/dashboard" push />);
    }
    else{
    /*let errorDisplay;
    if(this.props.authorizationErrorMessage !=="")
      errorDisplay = (<div>{this.props.authorizationErrorMessage}</div>);*/

    return (
      <div className="LeaderLogin">
        <UserNameAndPasswordForm
            type="login"
            getUsernameInput = {this.getUsernameInput}
            getPasswordInput = {this.getPasswordInput}
            errorMessage = {this.props.authorizationErrorMessage}
            onSubmit = {this.authorizeGuildLeader}
        />
        <Link to="/registration/leader" className="leaderRegistrationButton">Register Leader</Link>
      </div>
    );
  }
  }
}

const mapStateToProps = (state, props) => ({
    isAuthenticated: state.registrationAndLogin.isAuthenticated,
    guilds: state.registrationAndLogin.memberGuilds,
    usernameInput: state.registrationAndLogin.usernameInput,
    passwordInput: state.registrationAndLogin.passwordInput,
    authorizationErrorMessage: state.registrationAndLogin.authorizationErrorMessage
});

export default connect(mapStateToProps)(LeaderLogin);