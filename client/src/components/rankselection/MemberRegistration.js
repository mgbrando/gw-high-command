import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import * as actions from '../../actions/registrationAndLoginActions';
import RegistrationSuccess from './RegistrationSuccess';
import KeySubmissionForm from './KeySubmissionForm';
import GuildSelectionForm from './GuildSelectionForm';
import SectionNavigation from './SectionNavigation';
import GuildList from './GuildList';
import LeaderLoginCredentials from './LeaderLoginCredentials';
import UserNameAndPasswordForm from './UserNameAndPasswordForm';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
//import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import './RankSelection.css';

const previousIconButton = <FontIcon className="material-icons">Previous</FontIcon>;
const nextIconButton = <FontIcon className="material-icons">Next</FontIcon>;

class MemberRegistration extends Component {

  constructor(props) {
    super(props);
    //remember you have the method getPage as a prop
    this.validateAPIKey = this.validateAPIKey.bind(this);
    //this.addMemberToGuilds = this.addMemberToGuilds.bind(this);
    //this.showGuilds = this.showGuilds.bind(this);
    this.getUsernameInput = this.getUsernameInput.bind(this);
    this.getPasswordInput = this.getPasswordInput.bind(this);
    this.getConfirmPasswordInput = this.getConfirmPasswordInput.bind(this);
    this.changeSection = this.changeSection.bind(this);
    this.getAPIKeyInput = this.getAPIKeyInput.bind(this);
    this.registerGuildLeader = this.registerGuildLeader.bind(this);
  }
  componentWillMount(){
    this.props.dispatch(actions.getMemberRank(this.props.params.rank));
  }
  validateAPIKey(){
    /*action to check for an account with the apiKey and the store the api key
    in the database if you get back an account and that account is in the guild 
    Saves the account name and the API Key*/
    /*Validate the user and that he is in a guild that is registered with the app*/
    console.log(this.props.memberApiKeyInput);
    const apiKey = this.props.memberApiKeyInput.trim();
    if(this.props.isLeader)
      this.props.validateLeaderAPIKey(apiKey);
    else
      this.props.dispatch(actions.validateMemberAPIKey(apiKey));
  }
  //New 3 things
  getUsernameInput(event){
    this.props.dispatch(actions.getUserNameInput(event.target.value));
  }
  getPasswordInput(event){
    this.props.dispatch(actions.getPasswordInput(event.target.value));
  }
  getConfirmPasswordInput(event){
    this.props.dispatch(actions.getConfirmPasswordInput(event.target.value));
  }
  /*showGuilds(){
    if(this.props.isValidMember){
      this.props.dispatch(actions.memberGuildChoices(this.props.memberGuildIds))
        .then( () =>
             (
              <div>

              </div>
            ));
            //api call for the guilds`
    }
  }*/
  getAPIKeyInput(event){
  //  console.log(event.target.value);
  //  console.log(this.props.memberApiKeyInput);
    this.props.dispatch(actions.getAPIKeyInput(event.target.value));
  }

  changeSection(section){
    //this.props.dispatch(actions.changeMemberRegistrationSection(this.props.memberRegistrationSection, section));
    if(section === "registrationSuccess"){
      if(this.props.isLeader){
        this.props.dispatch(actions.completeLeaderRegistration(section, true));
      }
      else{
        this.props.dispatch(actions.completeMemberRegistration(section, true));
      }
      //this.props.dispatch(actions.changeMemberRegistrationSection(section, true));
    }
    else
      this.props.dispatch(actions.changeMemberRegistrationSection(section));
  }
  registerGuildLeader(){
    this.props.dispatch(actions.registerGuildLeader(this.props.userNameInput, this.props.passwordInput));
  }
  /*backToMain(){
    this.props.dispatch(actions.backToMain());
  }*/
  goBack(){
    //Action to set isValidMember to false and memberGuilds to []
    this.props.getPage('rankSelection');
  }

  render() {
    if(this.props.memberRegistrationSection === "registrationSuccess"){
      return(
        <div className="MemberRegistration">
          <div className="MemberRegistrationHeader">
            <h2>Registration Success</h2>
          </div>
          <RegistrationSuccess leader={this.props.isLeader} memberName={this.props.memberName} guilds={this.props.selectedMemberGuilds} />
        </div>
      );
    }
    else if(this.props.memberRegistrationSection === "guildSelection" && this.props.isLeader){
      return(
        <div className="MemberRegistration">
          <div className="MemberRegistrationHeader">
            <h2>Registration</h2>
          </div>
          <GuildList 
            title="Registered Guilds" 
            guildIds={this.props.memberGuildChoices} 
            />
        <SectionNavigation 
            previous={true} 
            next={true} 
            nextButtonDisabled={this.props.nextButtonDisabled}
            changeSection={this.changeSection}
            previousSection="keySubmission"
            nextSection="loginCredentials"
          />
        </div>  
      );
    }
    else if(this.props.memberRegistrationSection === "guildSelection"){
      return(
        <div className="MemberRegistration">
          <div className="MemberRegistrationHeader">
            <h2>Registration</h2>
          </div>
          <GuildList 
            title="Registered Guilds" 
            guildIds={this.props.memberGuildChoices} 
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
    else if(this.props.memberRegistrationSection === "loginCredentials"){
      return(
        <div className="MemberRegistration">
          <div className="MemberRegistrationHeader">
            <h2>Registration</h2>
          </div>
          <LeaderLoginCredentials
            title="Registered Guilds" 
            guildIds={this.props.memberGuildChoices} 
            />
        <SectionNavigation 
            previous={true} 
            next={true} 
            nextButtonDisabled={this.props.nextButtonDisabled}
            changeSection={this.changeSection}
            previousSection="guildSelection"
            nextSection="registrationSuccess"
          />
        </div>  
      );
    }
    else if(this.props.memberRegistrationSection === "loginCredentials"){
      return(
        <div className="MemberRegistration">
          <div className="MemberRegistrationHeader">
            <h2>Registration</h2>
          </div>
          <UserNameAndPasswordForm 
            type="loginCredentials"
            getUsernameInput = {this.getUsernameInput}
            getPasswordInput = {this.getPasswordInput}
            getConfirmPasswordInput = {this.getConfirmPasswordInput}
            onSubmit={this.registerGuildLeader}
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
        <div className="MemberRegistration">
          <div className="MemberRegistrationHeader">
            <h2>Registration</h2>
          </div>
          <KeySubmissionForm apiKey={this.props.memberApiKey} getAPIKeyInput={this.getAPIKeyInput} validateAPIKey={this.validateAPIKey}/>
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
/*Goes at 84
        <BottomNavigation selectedIndex={this.state.selectedIndex}>
          <BottomNavigationItem
            label="Previous"
            icon={previousIconButton}
            onTouchTap={() => this.select(0)}
          />
          <BottomNavigationItem
            label="Next"
            icon={nextIconButton}
            onTouchTap={() => this.select(1)}
          />
        </BottomNavigation>
*/
/*  Goes at 102  
        <BottomNavigation selectedIndex={this.state.selectedIndex}>
          <BottomNavigationItem
            label="Next"
            icon={nextIconButton}
            onTouchTap={() => this.select(2)}
          />
        </BottomNavigation>       
*/
  //<Link to="/" className="backButton"><button type="button">Back</button></Link>
  //<Link to="/" className="backButton"><button type="button">Back</button></Link>
  /*  return (
      <div className="MemberRegistration">
        {this.props.children}
        <Link to="/" className="backButton"><button type="button">Back</button></Link>
        <Link to="/" className="backButton"><button type="button">Back</button></Link>
        <div className="MemberRegistrationHeader">
          <h2>Member Registration</h2>
        </div>
        <form onSubmit={event => {event.preventDefault(); this.validateMemberAPIKey(event.target.value);}}>
          <label htmlFor="memberApiKey">Enter your API Key</label>
          <input id="memberApiKey" type="text" name="memberApiKey" placeholder={this.props.memberApiKey} required />
          <button type="submit">Submit</button>
          {this.showGuilds()}
        </form>
        <GuildSelectionForm />
      </div>
    );
  }*/
}

const mapStateToProps = (state, props) => ({
    //isValidMember: state.isValidMember,
    isLeader: state.registrationAndLogin.isLeader,
    memberRegistrationSection: state.registrationAndLogin.memberRegistrationSection,
    memberGuildChoices: state.registrationAndLogin.memberGuildChoices, //Object with name and id
    selectedMemberGuilds: state.registrationAndLogin.selectedMemberGuilds,
    memberApiKey: state.registrationAndLogin.memberApiKey,
    memberApiKeyInput: state.registrationAndLogin.memberApiKeyInput,
    //memberRegistrationComplete: state.memberRegistrationComplete,
    nextButtonDisabled: state.registrationAndLogin.nextButtonDisabled,
    userNameInput: state.registrationAndLogin.userNameInput,
    passwordInput: state.registrationAndLogin.passwordInput,
    confirmPasswordInput: state. registrationAndLogin.confirmPasswordInput,
    memberName: state.registrationAndLogin.memberName,
    guilds: state.registrationAndLogin.guilds
    //previousButtonDisabled: state.previousButtonDisabled
});

export default connect(mapStateToProps)(MemberRegistration);