import * as actions from '../actions/registrationAndLoginActions';

const initialRepositoryState = {
	guildId: "",
	//members: [],
	isValidMember: false,
	memberGuilds: [],
	//selectedGuilds: [],
	memberApiKey: "",
	isValidLeader: false,
	leaderApiKey: "",
	userInput: "",
	userPassword: "",
	memberValidationMessage: {},
	addMemberMessage: {},
	leaderValidationMessage: {},
	registerGuildLeaderMessage: {}
};

const registrationAndLogin = (state=initialRepositoryState, action) => {
	if(action.type === actions.USERNAME_INPUT){
		return Object.assign({}, state, {input: action.usernameInput});
	}
	else if(action.type === actions.PASSWORD_INPUT){
		return Object.assign({}, state, {input: action.passwordInput});
	}
	else if(action.type === actions.VALIDATE_MEMBER_KEY_SUCCESS){
		return Object.assign({}, state, {memberApiKey: action.memberApiKey, memberValidationMessage: 'API key is Valid', isValidMember: true, memberGuilds: [...state.memberGuilds, action.accountInfo.guilds]});
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
	return state;
};

export default registrationAndLogin;