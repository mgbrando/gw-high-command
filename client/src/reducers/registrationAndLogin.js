import * as actions from '../actions/registrationAndLoginActions';

const initialRepositoryState = {
	guildId: "",
	isLeader: false,
	isValidMember: false,
	memberGuildChoices: [],
	selectedMemberGuilds: [],
	memberApiKey: "",
	memberApiKeyInput: "",
	memberName: "",
	isValidLeader: false,
	leaderApiKey: "",
	usernameInput: "",
	passwordInput: "",
	confirmPasswordInput: "",
	memberValidationMessage: "",
	addMemberMessage: {},
	leaderValidationMessage: {},
	registerGuildLeaderMessage: {},
	guilds: [],
	getGuildErrorMessage: "",
	usernameErrorMessage: "",
	passwordErrorMessage: "",
	confirmPasswordErrorMessage: "",
	passwordDisabled: true,
    confirmPasswordDisabled: true,
    credentialsSubmitDisabled: true,
    activeUser: {},
    authorizationErrorMessage: "",
    isAuthenticated: false,
    authorizationChecked: false,
    activeUserGuilds: [],
    activeGuild: "",
    loading: false,
    finished: false,
    stepIndex: 0,
    backButtonDisabled: true,
    nextButtonDisabled: true
};

const registrationAndLogin = (state=initialRepositoryState, action) => {
	if(action.type === actions.USERNAME_INPUT){
		return Object.assign({}, state, {usernameInput: action.usernameInput, usernameErrorMessage: action.invalidMessage,
		 passwordDisabled: action.passwordDisabled, passwordInput: "", confirmPasswordInput: "", confirmPasswordDisabled: true, nextButtonDisabled: true});
	}
	else if(action.type === actions.RESET_LOGIN_STATE){
		return Object.assign({}, state, {usernameInput: '', passwordInput: '', authorizationErrorMessage: ''});
	}
	else if(action.type === actions.LOGIN_USERNAME_INPUT){
		return Object.assign({}, state, {usernameInput: action.usernameInput});
	}
	else if(action.type === actions.LOGIN_PASSWORD_INPUT){
		return Object.assign({}, state, {passwordInput: action.passwordInput});
	}
	else if(action.type === actions.SET_RANK){
		return Object.assign({}, state, {isLeader: action.isLeader});
	}
	else if(action.type === actions.PASSWORD_INPUT){
		return Object.assign({}, state, {passwordInput: action.passwordInput, passwordErrorMessage: action.invalidMessage, 
			confirmPasswordDisabled: action.confirmPasswordDisabled, nextButtonDisabled: true, confirmPasswordInput: ""});
	}
	else if(action.type === actions.CONFIRM_PASSWORD_INPUT){
		return Object.assign({}, state, {confirmPasswordInput: action.confirmPasswordInput, confirmPasswordErrorMessage: action.invalidMessage, 
			nextButtonDisabled: action.credentialsSubmitDisabled});
	}
	else if(action.type === actions.VALIDATE_MEMBER_KEY_SUCCESS){
		return Object.assign({}, state, {memberName: action.memberName, memberApiKey: action.memberApiKey, memberValidationMessage: 'API key is Valid', 
			isValidMember: true, memberGuildChoices: action.memberGuildChoices, nextButtonDisabled: false});
	}
	else if(action.type === actions.VALIDATE_MEMBER_KEY_FAILURE){
		return Object.assign({}, state, {memberValidationMessage: action.errorMessage, isValidMember: false});
	}
	else if(action.type === actions.SET_VALID_CREDENTIALS){
		return Object.assign({}, state, {usernameInput: action.username, passwordInput: action.password, confirmPasswordInput: action.confirmPassword, nextButtonDisabled: false});
	}
	else if(action.type === actions.SET_INVALID_CREDENTIALS){
		return Object.assign({}, state, {usernameInput: "", usernameErrorMessage: 'Username: '+state.usernameInput+' is already taken',
		 passwordDisabled: true, passwordInput: "", confirmPasswordInput: "", confirmPasswordDisabled: true, nextButtonDisabled: true});
	}
	else if(action.type === actions.ADD_MEMBER_SUCCESS){
		return Object.assign({}, state, {addMemberMessage: {type: 'success', message:action.message}});
	}
	else if(action.type === actions.ADD_MEMBER_FAILURE){
		return Object.assign({}, state, {addMemberMessage: {type: 'error', message:action.error}});
	}
	else if(action.type === actions.VALIDATE_LEADER_KEY_FAILURE){
		return Object.assign({}, state, {isValidLeader: false, leaderValidationMessage: {type: 'error', message:action.error.text}});
	}
	else if(action.type === actions.VALIDATE_LEADER_KEY_NOT_LEADER){
		return Object.assign({}, state, {isValidLeader: false, leaderValidationMessage: {type: 'invalid', message:action.message}});
	}
	else if(action.type === actions.VALIDATE_LEADER_KEY_SUCCESS){
		return Object.assign({}, state, {isValidLeader: true, leaderApiKey: action.leaderApiKey, leaderValidationMessage: {type: 'success', message:action.message}, nextButtonDisabled: false});
	}
	else if(action.type === actions.REGISTER_GUILD_LEADER_SUCCESS){
		return Object.assign({}, state, {registerGuildLeaderMessage: {type: 'success', message:action.message}});
	}
	else if(action.type === actions.REGISTER_GUILD_LEADER_FAILURE){
		return Object.assign({}, state, {registerGuildLeaderMessage: {type: 'error', message:action.error}});
	}
	else if(action.type === actions.SWITCH_TO_REGISTRATION_SUCCESS){
		return Object.assign({}, state, {
			stepIndex: 0, 
			backButtonDisabled: true, 
			nextButtonDisabled: true, 
			finished:true,
			isValidMember: false,
			memberGuildChoices: [],
			memberApiKey: "",
			memberApiKeyInput: "",
			isValidLeader: false,
			leaderApiKey: "",
			usernameInput: "",
			passwordInput: "",
			confirmPasswordInput: "",
			memberValidationMessage: "",
			addMemberMessage: {},
			leaderValidationMessage: {},
			registerGuildLeaderMessage: {},
			guilds: [],
			usernameErrorMessage: "",
			passwordErrorMessage: "",
			confirmPasswordErrorMessage: "",
			passwordDisabled: true,
    		confirmPasswordDisabled: true,
    		credentialsSubmitDisabled: true
    	});
	}
	else if(action.type === actions.SWITCH_TO_GUILD_SELECTION){
		return Object.assign({}, state, {stepIndex: 1, selectedMemberGuilds: [], backButtonDisabled: false, nextButtonDisabled: true});
	}
	else if(action.type === actions.SWITCH_TO_KEY_SUBMISSION){
		return Object.assign({}, state, {stepIndex: 0, backButtonDisabled: true, nextButtonDisabled: true, guilds: [],
		memberName: '', memberApiKey: '', memberValidationMessage: '', memberGuildChoices: ''});
	}
	else if(action.type === actions.SWITCH_TO_LOGIN_CREDENTIALS){
		return Object.assign({}, state, {stepIndex: 2, nextButtonDisabled: true, guilds: []});
	}
	else if(action.type === actions.GET_MEMBER_KEY_INPUT){
		return Object.assign({}, state, {memberApiKeyInput: action.apiKey});
	}
	else if(action.type === actions.GET_GUILD_SUCCESS){
		return Object.assign({}, state, {guilds: [...state.guilds, action.guild]});
	}
	else if(action.type === actions.GET_GUILD_FAILURE){
		return Object.assign({}, state, {getGuildErrorMessage: action.errorMessage});
	}
	else if(action.type === actions.CHANGE_SELECTED_GUILDS){
		return Object.assign({}, state, {selectedMemberGuilds: action.selectedGuilds, nextButtonDisabled: action.nextArrowDisabled});
	}
	else if(action.type=== actions.AUTHENTICATION_CLEARED){
		return Object.assign({}, state, {isAuthenticated: true, authorizationChecked: true, activeUser: action.user, activeUserGuilds: action.guilds, activeGuild: action.activeGuild});
	}
	else if(action.type=== actions.AUTHENTICATION_FAILED){
		return Object.assign({}, state, {isAuthenticated: false, authorizationChecked: true, authorizationErrorMessage: action.errorMessage});
	}
	else if(action.type === actions.LOGOUT_USER){
		return Object.assign({}, state, {isAuthenticated: false, authorizationChecked: true, activeUser: {}});
	}
	else if(action.type === actions.SET_ACTIVE_GUILD){
		return Object.assign({}, state, {activeGuild: action.guild});
	}
	else if(action.type === actions.CHANGE_SECTION_SUCCESS){
		return Object.assign({}, state, {stepIndex: action.stepIndex, backButtonDisabled: ((action.stepIndex === 0) ? true : false)});
	}
	else if(action.type === actions.LOAD_FINISH_SCREEN_SUCCESS){
		return Object.assign({}, state, {stepIndex: 0, finished: true});
	}
	else if(action.type === actions.RESET_REGISTRATION){
		return Object.assign({}, state, {
			stepIndex: 0, 
			backButtonDisabled: true, 
			nextButtonDisabled: true, 
			finished: false, 
			isLeader: false,
			isValidMember: false,
			memberGuildChoices: [],
			selectedMemberGuilds: [],
			memberApiKey: "",
			memberApiKeyInput: "",
			memberName: "",
			isValidLeader: false,
			leaderApiKey: "",
			usernameInput: "",
			passwordInput: "",
			confirmPasswordInput: "",
			memberValidationMessage: "",
			addMemberMessage: {},
			leaderValidationMessage: {},
			registerGuildLeaderMessage: {},
			guilds: [],
			usernameErrorMessage: "",
			passwordErrorMessage: "",
			confirmPasswordErrorMessage: "",
			passwordDisabled: true,
    		confirmPasswordDisabled: true,
    		credentialsSubmitDisabled: true
		});
	}
	return state;
};

export default registrationAndLogin;