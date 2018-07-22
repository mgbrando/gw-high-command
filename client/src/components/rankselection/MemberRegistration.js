import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/registrationAndLoginActions";
import RegistrationSuccess from "./RegistrationSuccess";
import KeySubmissionForm from "./KeySubmissionForm";
import GuildList from "./GuildList";
import UserNameAndPasswordForm from "./UserNameAndPasswordForm";
import { Step, Stepper, StepLabel } from "material-ui/Stepper";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import ExpandTransition from "material-ui/internal/ExpandTransition";
import "./RankSelection.css";

class MemberRegistration extends Component {
  constructor(props) {
    super(props);

    this.validateAPIKey = this.validateAPIKey.bind(this);
    this.getUsernameInput = this.getUsernameInput.bind(this);
    this.getPasswordInput = this.getPasswordInput.bind(this);
    this.getConfirmPasswordInput = this.getConfirmPasswordInput.bind(this);
    this.changeSection = this.changeSection.bind(this);
    this.getAPIKeyInput = this.getAPIKeyInput.bind(this);
    this.registerGuildLeader = this.registerGuildLeader.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.handleNext = this.handleNext.bind(this);
  }
  componentWillMount() {
    this.props.dispatch(actions.getMemberRank(this.props.match.params.rank));
  }
  componentWillUnmount() {
    this.props.dispatch(actions.registrationReset());
  }
  validateAPIKey() {
    /*action to check for an account with the apiKey and the store the api key
    in the database if you get back an account and that account is in the guild 
    Saves the account name and the API Key*/
    /*Validate the user and that he is in a guild that is registered with the app*/
    const apiKey = this.props.memberApiKeyInput.trim();
    if (this.props.isLeader)
      this.props.dispatch(actions.validateLeaderAPIKey(apiKey));
    else this.props.dispatch(actions.validateMemberAPIKey(apiKey));
  }

  getUsernameInput(event) {
    if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(event.target.value)) {
      this.props.dispatch(
        actions.getUsernameInput(event.target.value, "", false, false, false)
      );
    } else {
      this.props.dispatch(
        actions.getUsernameInput(
          event.target.value,
          "Username must be at least 8 characters long and be made of letters and digits only"
        )
      );
    }
  }
  getPasswordInput(event) {
    if (
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(event.target.value)
    ) {
      this.props.dispatch(
        actions.getPasswordInput(event.target.value, "", false)
      );
    } else {
      this.props.dispatch(
        actions.getPasswordInput(
          event.target.value,
          "Password must be at least 8 characters long and contain 1 Uppercase letter, 1 lowercase letter, and 1 digit"
        )
      );
    }
  }
  getConfirmPasswordInput(event) {
    if (
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(
        event.target.value
      ) &&
      event.target.value === this.props.passwordInput
    ) {
      this.props.dispatch(
        actions.getConfirmPasswordInput(event.target.value, "", false)
      );
    } else {
      this.props.dispatch(
        actions.getConfirmPasswordInput(
          event.target.value,
          "Confirm password does not currently match the password field."
        )
      );
    }
  }

  getAPIKeyInput(event) {
    this.props.dispatch(actions.getAPIKeyInput(event.target.value));
  }

  changeSection(section) {
    if (section === "registrationSuccess") {
      if (!this.props.isLeader) {
        this.props.dispatch(
          actions.completeMemberRegistration(
            this.props.memberName,
            this.props.memberApiKey,
            this.props.selectedMemberGuilds
          )
        );
      } else {
        this.props.dispatch(
          actions.registerGuildLeader(
            this.props.usernameInput,
            this.props.passwordInput,
            this.props.confirmPasswordInput,
            this.props.memberName,
            this.props.memberApiKey,
            this.props.selectedMemberGuilds
          )
        );
      }
    } else
      this.props.dispatch(actions.changeMemberRegistrationSection(section));
  }
  registerGuildLeader(event) {
    event.preventDefault();
    this.props.dispatch(
      actions.registerGuildLeader(
        this.props.usernameInput,
        this.props.passwordInput,
        this.props.confirmPasswordInput,
        this.props.memberName,
        this.props.memberApiKey,
        this.props.selectedMemberGuilds
      )
    );
  }
  goBack() {
    this.props.getPage("rankSelection");
  }
  handleNext = () => {
    const { stepIndex, isLeader } = this.props;
    if (stepIndex >= 1 && !isLeader) {
      this.props.dispatch(
        actions.completeMemberRegistration(
          this.props.memberName,
          this.props.memberApiKey,
          this.props.selectedMemberGuilds
        )
      );
    } else if (stepIndex >= 2 && isLeader) {
      this.props.dispatch(
        actions.registerGuildLeader(
          this.props.usernameInput,
          this.props.passwordInput,
          this.props.confirmPasswordInput,
          this.props.memberName,
          this.props.memberApiKey,
          this.props.selectedMemberGuilds
        )
      );
    } else this.props.dispatch(actions.changeSection(stepIndex + 1, isLeader));
  };

  handlePrev = () => {
    this.props.dispatch(actions.changeSection(this.props.stepIndex - 1));
  };
  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <div className="">
            <div className="MemberRegistrationHeader">
              <h2>Registration</h2>
            </div>
            <KeySubmissionForm
              apiKey={this.props.memberApiKey}
              getAPIKeyInput={this.getAPIKeyInput}
              validateAPIKey={this.validateAPIKey}
              memberValidationMessage={this.props.memberValidationMessage}
            />
          </div>
        );
      case 1:
        return (
          <div className="">
            <div className="MemberRegistrationHeader">
              <h2>Registration</h2>
            </div>
            <GuildList
              title="Registered Guilds"
              guildIds={this.props.memberGuildChoices}
            />
          </div>
        );
      case 2:
        if (this.props.isLeader) {
          return (
            <div className="">
              <div className="MemberRegistrationHeader">
                <h2>Registration</h2>
              </div>
              <UserNameAndPasswordForm
                type="loginCredentials"
                getUsernameInput={this.getUsernameInput}
                getPasswordInput={this.getPasswordInput}
                getConfirmPasswordInput={this.getConfirmPasswordInput}
                usernameErrorMessage={this.props.usernameErrorMessage}
                passwordErrorMessage={this.props.passwordErrorMessage}
                confirmPasswordErrorMessage={
                  this.props.confirmPasswordErrorMessage
                }
                registerGuildLeader={this.registerGuildLeader}
                passwordDisabled={this.props.passwordDisabled}
                confirmPasswordDisabled={this.props.confirmPasswordDisabled}
                credentialsSubmitDisabled={this.props.credentialsSubmitDisabled}
                usernameValue={this.props.usernameInput}
                passwordValue={this.props.passwordInput}
                confirmPasswordValue={this.props.confirmPasswordInput}
              />
            </div>
          );
        }
        break;
      default:
        return "Something went horribly wrong.";
    }
  }

  renderContent() {
    const { finished, stepIndex } = this.props;

    if (finished) {
      return (
        <div className="MemberRegistration">
          <div className="MemberRegistrationHeader">
            <h2>Registration Success</h2>
          </div>
          <RegistrationSuccess
            leader={this.props.isLeader}
            memberName={this.props.memberName}
            guilds={this.props.selectedMemberGuilds}
          />
        </div>
      );
    }

    return (
      <div className="MemberRegistration">
        <div>{this.getStepContent(stepIndex)}</div>
        <div style={{ marginTop: 24, marginBottom: 12 }}>
          <FlatButton
            label="Back"
            disabled={this.props.backButtonDisabled}
            onTouchTap={this.handlePrev}
            style={{ marginRight: 12 }}
          />
          <RaisedButton
            label={
              (stepIndex === 1 && !this.props.isLeader) ||
              (stepIndex === 2 && this.props.isLeader)
                ? "Finish"
                : "Next"
            }
            disabled={this.props.nextButtonDisabled}
            primary={true}
            onTouchTap={this.handleNext}
          />
        </div>
      </div>
    );
  }

  render() {
    const { loading, stepIndex } = this.props;
    const additionalStep = this.props.isLeader ? (
      <Step>
        <StepLabel className="stepLabel">Submit login credentials</StepLabel>
      </Step>
    ) : (
      false
    );
    if (additionalStep)
      return (
        <div
          className="stepper"
          style={{ width: "100%", maxWidth: 700, margin: "auto" }}
        >
          <Stepper activeStep={stepIndex}>
            <Step>
              <StepLabel className="stepLabel">Submit API Key</StepLabel>
            </Step>
            <Step>
              <StepLabel className="stepLabel">
                Select guilds to register
              </StepLabel>
            </Step>
            {additionalStep}
          </Stepper>
          <ExpandTransition loading={loading} open={true}>
            {this.renderContent()}
          </ExpandTransition>
        </div>
      );
    else
      return (
        <div
          className="stepper"
          style={{ width: "100%", maxWidth: 700, margin: "auto" }}
        >
          <Stepper activeStep={stepIndex}>
            <Step>
              <StepLabel className="stepLabel">Submit API Key</StepLabel>
            </Step>
            <Step>
              <StepLabel className="stepLabel">
                Select guilds to register
              </StepLabel>
            </Step>
          </Stepper>
          <ExpandTransition loading={loading} open={true}>
            {this.renderContent()}
          </ExpandTransition>
        </div>
      );
  }
}

const mapStateToProps = (state, props) => ({
  isLeader: state.registrationAndLogin.isLeader,
  memberRegistrationSection:
    state.registrationAndLogin.memberRegistrationSection,
  memberGuildChoices: state.registrationAndLogin.memberGuildChoices,
  selectedMemberGuilds: state.registrationAndLogin.selectedMemberGuilds,
  memberApiKey: state.registrationAndLogin.memberApiKey,
  memberApiKeyInput: state.registrationAndLogin.memberApiKeyInput,
  usernameInput: state.registrationAndLogin.usernameInput,
  passwordInput: state.registrationAndLogin.passwordInput,
  confirmPasswordInput: state.registrationAndLogin.confirmPasswordInput,
  memberName: state.registrationAndLogin.memberName,
  guilds: state.registrationAndLogin.guilds,
  memberValidationMessage: state.registrationAndLogin.memberValidationMessage,
  validationErrors: state.registrationAndLogin.validationErrors,
  passwordDisabled: state.registrationAndLogin.passwordDisabled,
  confirmPasswordDisabled: state.registrationAndLogin.confirmPasswordDisabled,
  credentialsSubmitDisabled:
    state.registrationAndLogin.credentialsSubmitDisabled,
  usernameErrorMessage: state.registrationAndLogin.usernameErrorMessage,
  passwordErrorMessage: state.registrationAndLogin.passwordErrorMessage,
  confirmPasswordErrorMessage:
    state.registrationAndLogin.confirmPasswordErrorMessage,
  loading: state.registrationAndLogin.loading,
  finished: state.registrationAndLogin.finished,
  stepIndex: state.registrationAndLogin.stepIndex,
  backButtonDisabled: state.registrationAndLogin.backButtonDisabled,
  nextButtonDisabled: state.registrationAndLogin.nextButtonDisabled
});

export default connect(mapStateToProps)(MemberRegistration);
