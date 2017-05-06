/*import React, { Component } from 'react';
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
    this.props.getPage('rankSelection');*/ /*rankSelection will need to have
    a message of member being successfully added to a guild or guilds */
 /* }
  goBack(){
    //Action to set isValidMember to false and memberGuilds to []
    this.props.getPage('rankSelection');
  }



  render() {
    if(this.props.leaderRegistrationSection === "registrationSuccess"){
      return(
          <RegistrationSuccess type="member" guilds={this.props.selectedMemberGuilds} />
      );
    }
    else if(this.props.leaderRegistrationSection === "guildSelection"){
      return(
        <div className="LeaderRegistration">
          <div className="LeaderRegistrationHeader">
            <h2>Leader Registration</h2>
          </div>
          <GuildList 
            title="Registered Guilds" 
            guildIds={this.props.memberGuildChoices} 
            addMemberToGuilds={this.addMemberToGuilds}
            />
        <SectionNavigation 
            previous={true} 
            next={true} 
            nextButtonDisabled={this.props.nextButtonDisabled}
            changeSection={this.changeSection}
            previousSection="keySubmission"
            nextSection="registrationSuccess"
          />
        </div>  
      );
    }
    else{
      return(
        <div className="LeaderRegistration">
          <div className="LeaderRegistrationHeader">
            <h2>Leader Registration</h2>
          </div>
          <KeySubmissionForm apiKey={this.props.memberApiKey} getAPIKeyInput={this.getAPIKeyInput} validateMemberAPIKey={this.validateMemberAPIKey}/>
          <SectionNavigation 
            previous={false} 
            next={true} 
            nextButtonDisabled={this.props.nextButtonDisabled}
            changeSection={this.changeSection}
            nextSection="guildSelection"
          />
        </div>  
      );
    }
  }
}

const mapStateToProps = (state, props) => ({
    isValidLeader: state.leaderRegistrationAndLoginisValidLeader,
    guild: state.leaderRegistrationAndLoginmemberGuilds,
    memberApiKey: state.leaderRegistrationAndLogin.memberApiKey,
    userNameInput: state.leaderRegistrationAndLogin.userNameInput,
    passwordInput: state.leaderRegistrationAndLogin.passwordInput
});

export default connect(mapStateToProps)(LeaderRegistration);*/