import React, { Component } from 'react';
import {connect} from 'react-redux';
import UserNameAndPasswordForm from './UserNameAndPasswordForm';
import './RankSelection.css';
import * as actions from '../../actions/registrationAndLoginActions';

class LeaderRegistration extends Component {

  constructor(props) {
    super(props);
    //remember you have the method getPage as a prop
    this.getUsernameInput = this.getUsernameInput.bind(this);
    this.getPasswordInput = this.getPasswordInput.bind(this);
    this.getConfirmPasswordInput = this.getConfirmPasswordInput.bind(this);
    this.registerGuildLeader = this.registerGuildLeader.bind(this);
  }

  checkAPIKey(APIKey){
    /*action to check for an account with the apiKey and the store the api key
    in the database if you get back an account and that account is in the guild 
    Saves the account name and the API Key*/
    /*Validate the user and that he is in a guild that is registered with the app*/

  }
  showUserNameAndPassword(){
    if(this.props.isValidLeader){
      return (<UserNameAndPasswordForm registerGuildLeader={this.registerGuildLeader} 
                                 getUsernameInput={this.getUsernameInput}
                                 getPasswordInput={this.getPasswordInput} 
                                 getConfirmPasswordInput={this.getConfirmPasswordInput}
                                 getPage={this.props.getPage}
                                 currentPage="leaderRegistration"
                                  />);
    }
  }
  getUsernameInput(event){
    this.props.dispatch(actions.getUserNameInput(event.target.value));
  }
  getPasswordInput(event){
    this.props.dispatch(actions.getPasswordInput(event.target.value));
  }
  getConfirmPasswordInput(event){
    this.props.dispatch(actions.getConfirmPasswordInput(event.target.value));
  }
  registerGuildLeader(){
    this.props.dispatch(actions.registerGuildLeader(this.props.userNameInput, this.props.passwordInput));
  }
  addMemberToGuilds(){
    //Action to add a member to the guild and then do the below
    this.props.getPage('rankSelection'); /*rankSelection will need to have
    a message of member being successfully added to a guild or guilds */
  }
  goBack(){
    //Action to set isValidMember to false and memberGuilds to []
    this.props.getPage('rankSelection');
  }



  render() {
    return (
      <div className="LeaderRegistration">
        <button type="button" onclick={this.goBack()}>Back</button>
        <div className="LeaderRegistrationHeader">
          <h2>Leader Registration</h2>
        </div>
        <form onSubmit={event => {event.preventDefault(); this.checkAPIKey;}}>
          <label for="leaderApiKey">Enter your API Key</label>
          <input id="leaderApiKey" type="text" name="leaderApiKey" required />
          <button type="submit">Submit</button>
        </form>
        {this.showUserNameAndPassword()}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
    isValidLeader: state.isValidLeader,
    guild: state.memberGuilds,
    memberApiKey: state.memberApiKey,
    userNameInput: state.userNameInput,
    passwordInput: state.passwordInput,
});

export default connect(mapStateToProps)(LeaderRegistration);