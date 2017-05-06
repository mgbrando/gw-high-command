import * as actions from '../actions/leaderRegistrationAndLoginActions';

const initialRepositoryState = {
	guildId: "",
	//members: [],
	isValidMember: false,
	memberGuildChoices: [],
	selectedMemberGuilds: [],
	//selectedGuilds: [],
	memberApiKey: "",
	memberApiKeyInput: "",
	memberName: "",
	isValidLeader: false,
	leaderApiKey: "",
	userInput: "",
	userPassword: "",
	memberValidationMessage: {},
	addMemberMessage: {},
	leaderValidationMessage: {},
	registerGuildLeaderMessage: {},
	nextButtonDisabled: true,
	memberRegistrationSection: "keySubmission",
	guilds: [],
	getGuildErrorMessage: ""
};

const registrationAndLogin = (state=initialRepositoryState, action) => {
	if(action.type === actions.USERNAME_INPUT){
		return Object.assign({}, state, {input: action.usernameInput});
	}
	else if(action.type === actions.PASSWORD_INPUT){
		return Object.assign({}, state, {input: action.passwordInput});
	}
	else if(action.type === actions.VALIDATE_MEMBER_KEY_SUCCESS){
		return Object.assign({}, state, {memberName: action.memberName, memberApiKey: action.memberApiKey, memberValidationMessage: 'API key is Valid', 
			isValidMember: true, memberGuildChoices: action.memberGuildChoices, nextButtonDisabled: false});
	}
	else if(action.type === actions.VALIDATE_MEMBER_KEY_FAILURE){
		return Object.assign({}, state, {memberValidationMessage: action.errorResponse.error, isValidMember: false});
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
		return Object.assign({}, state, {isValidLeader: true, leaderApiKey: action.leaderApiKey, leaderValidationMessage: {type: 'success', message:action.message}});
	}
	else if(action.type === actions.REGISTER_GUILD_LEADER_SUCCESS){
		return Object.assign({}, state, {registerGuildLeaderMessage: {type: 'success', message:action.message}});
	}
	else if(action.type === actions.REGISTER_GUILD_LEADER_FAILURE){
		return Object.assign({}, state, {registerGuildLeaderMessage: {type: 'error', message:action.error}});
	}
	else if(action.type === actions.SWITCH_TO_REGISTRATION_SUCCESS){
		return Object.assign({}, state, {memberRegistrationSection: "registrationSuccess", nextButtonDisabled: true});
	}
	else if(action.type === actions.SWITCH_TO_GUILD_SELECTION){
		return Object.assign({}, state, {memberRegistrationSection: "guildSelection", nextButtonDisabled: true});
	}
	else if(action.type === actions.SWITCH_TO_KEY_SUBMISSION){
		return Object.assign({}, state, {memberRegistrationSection: "keySubmission", nextButtonDisabled: true, guilds: []});
	}
	else if(action.type === actions.GET_MEMBER_KEY_INPUT){
		//console.log(action.apiKey);
		return Object.assign({}, state, {memberApiKeyInput: action.apiKey});
	}
	else if(action.type === actions.GET_GUILD_SUCCESS){
		//console.log(action.apiKey);
		return Object.assign({}, state, {guilds: [...state.guilds, action.guild]});
	}
	else if(action.type === actions.GET_GUILD_FAILURE){
		//console.log(action.apiKey);
		return Object.assign({}, state, {getGuildErrorMessage: action.errorMessage});
	}
	else if(action.type === actions.CHANGE_SELECTED_GUILDS){
		//console.log(action.apiKey);
		return Object.assign({}, state, {selectedMemberGuilds: action.selectedGuilds});
	}
	return state;
};

export default registrationAndLogin;