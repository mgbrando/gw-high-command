import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import * as actions from '../../actions/registrationAndLoginActions';
import './RankSelection.css';

class MemberRegistration extends Component {

  constructor(props) {
    super(props);
    //remember you have the method getPage as a prop
    this.addMemberToGuilds = this.addMemberToGuilds.bind(this);
    this.showGuilds = this.showGuilds.bind(this);
  }

  validateMemberAPIKey(apiKey){
    /*action to check for an account with the apiKey and the store the api key
    in the database if you get back an account and that account is in the guild 
    Saves the account name and the API Key*/
    /*Validate the user and that he is in a guild that is registered with the app*/
    apiKey = apiKey.trim();
    this.props.dispatch(actions.validateMemberAPIKey(apiKey));
  }
  showGuilds(){
    if(this.props.isValidMember){
      const guilds = '';//api call for the guilds`
      return (
          <div>
          </div>
      );
    }
  }
  addMemberToGuilds(guilds){
    //Action to add a member to the guild and then do the below
    this.props.getPage('rankSelection'); /*rankSelection will need to have
    a message of member being successfully added to a guild or guilds */
    this.props.dispatch(actions.addMemberToGuilds(guilds));
  }
  goBack(){
    //Action to set isValidMember to false and memberGuilds to []
    this.props.getPage('rankSelection');
  }



  render() {
    return (
      <div className="MemberRegistration">
        <Link to="/" className="backButton"><button type="button">Back</button></Link>
        <div className="MemberRegistrationHeader">
          <h2>Member Registration</h2>
        </div>
        <form onSubmit={event => {event.preventDefault(); this.validateMemberAPIKey(event.target.value);}}>
          <label htmlFor="memberApiKey">Enter your API Key</label>
          <input id="memberApiKey" type="text" name="memberApiKey" required />
          <button type="submit">Submit</button>
          {this.showGuilds()}
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
    isValidMember: state.isValidMember,
    memberGuilds: state.memberGuilds,
    memberApiKey: state.memberApiKey
});

export default connect(mapStateToProps)(MemberRegistration);