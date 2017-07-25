import React, { Component } from 'react';
import {connect} from 'react-redux';
import UserNameAndPasswordForm from './UserNameAndPasswordForm';
import './RankSelection.css';
import {Link} from 'react-router-dom';
import * as actions from '../../actions/registrationAndLoginActions';
import { Redirect } from 'react-router';


class LeaderLogin extends Component {

  constructor(props) {
    super(props);
    this.getUsernameInput = this.getUsernameInput.bind(this);
    this.getPasswordInput = this.getPasswordInput.bind(this);
    this.authorizeGuildLeader = this.authorizeGuildLeader.bind(this);
  }
  componentWillUnmount(){
    this.props.dispatch(actions.resetLoginState());
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

  render() {
    if (this.props.isAuthenticated) {
      return (<Redirect to="/dashboard" push />);
    }
    else{

    return (
      <div className="LeaderLogin">
        <UserNameAndPasswordForm
            type="login"
            getUsernameInput={this.getUsernameInput}
            getPasswordInput={this.getPasswordInput}
            errorMessage={this.props.authorizationErrorMessage}
            onSubmit={this.authorizeGuildLeader}
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