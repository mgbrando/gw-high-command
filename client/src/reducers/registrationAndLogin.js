import * as actions from '../actions/registrationAndLoginActions';

const initialRepositoryState = {
	guildId: "",
	members: [],
	isValidMember: false,
	memberGuilds: [],
	memberApiKey: "",
	userInput: "",
	userPassword:""
};

const registrationAndLogin = (state=initialRepositoryState, action) => {
	return state;
};

export default registrationAndLogin;