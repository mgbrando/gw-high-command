//import 'whatwg-fetch';
import 'isomorphic-fetch';

//User Name Input
export const USERNAME_INPUT = 'USERNAME_INPUT';
export const getUserNameInput = (usernameInput) => ({
	type: USERNAME_INPUT,
	usernameInput
});

//Password Input
export const PASSWORD_INPUT = 'PASSWORD_INPUT';
export const getPasswordInput = (passwordInput) => ({
	type: PASSWORD_INPUT,
	passwordInput
});

//Member Key Validation
export const VALIDATE_MEMBER_KEY_FAILURE = 'VALIDATE_MEMBER_KEY_FAILURE';
export const validateMemberKeyError = (errorResponse) => ({
	type: VALIDATE_MEMBER_KEY_FAILURE,
	errorResponse
});

export const VALIDATE_MEMBER_KEY_SUCCESS = 'VALIDATE_MEMBER_KEY_SUCCESS';
export const validateMemberKeySuccess = (accountInfo, memberApiKey) => ({
	type: VALIDATE_MEMBER_KEY_SUCCESS,
	accountInfo,
	memberApiKey
});

export const validateMemberAPIKey = (access_token) => {
  return dispatch => {
    fetch('https://api.guildwars2.com/v2/account?access_token=${access_token}')
    .then(response => response.json())
    .then(responseObject => {
    	if(Object.keys(responseObject) === 1)
    		return dispatch(validateMemberKeyError(responseObject));
    	else
    		return dispatch(validateMemberKeySuccess(responseObject, access_token));
    })
  }	
};

//Add Member Key to guilds - (change localhost:8080 dependent on config file)
export const ADD_MEMBER_SUCCESS = 'ADD_MEMBER_SUCCESS';
export const addMemberSuccess = (message) => ({
	type: ADD_MEMBER_SUCCESS,
	message
});

export const ADD_MEMBER_FAILURE = 'ADD_MEMBER_FAILURE';
export const addMemberFailure = error => ({
	type: ADD_MEMBER_FAILURE,
	error
});

export const addMemberToGuilds = (member, guilds) => {
  return dispatch => {
    fetch('http://localhost:8080/guilds/bulk-update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
      	member,
        guilds
      })
    })
    .then(response => response.json())
    .then(() => {
    	let successMessage = 'Successfully added member to';
    	for(let i=0; i < guilds.length; i++){
    		successMessage+=' ${guilds[i].name}';
    	}
    	return dispatch(addMemberSuccess(successMessage));
    })	
    .catch(error => dispatch(addMemberFailure(error)));
  }	
};


//Leader Key Validation
export const VALIDATE_LEADER_KEY_FAILURE = 'VALIDATE_LEADER_KEY_FAILURE';
export const validateLeaderKeyError = error => ({
	type: VALIDATE_LEADER_KEY_FAILURE,
	error
});

export const VALIDATE_LEADER_KEY_NOT_LEADER = 'VALIDATE_LEADER_KEY_NOT_LEADER';
export const validateLeaderKeyNotLeader = (message = 'Invalid Token') => ({
	type: VALIDATE_LEADER_KEY_NOT_LEADER,
	message
});

export const VALIDATE_LEADER_KEY_SUCCESS = 'VALIDATE_LEADER_KEY_SUCCESS';
export const validateLeaderKeySuccess = (successResponse, leaderApiKey, message = 'Valid leader token') => ({
	type: VALIDATE_LEADER_KEY_SUCCESS,
	successResponse,
	leaderApiKey,
	message
});

export const validateLeaderAPIKey = access_token => {
  return dispatch => {
    fetch('https://api.guildwars2.com/v2/account?access_token=${access_token}')
    .then(response => response.json())
    .then(responseObject => {
    	if(Object.keys(responseObject) === 1)
    		return dispatch(validateLeaderKeyError(responseObject));
    	else if(responseObject.guild_leader.length === 0)
    		return dispatch(validateLeaderKeyNotLeader());
    	else
    		return dispatch(validateLeaderKeySuccess(responseObject, access_token));
    });
  }	
};

//Add Member Key to guilds - (change localhost:8080 dependent on config file)
export const REGISTER_GUILD_LEADER_SUCCESS = 'REGISTER_GUILD_LEADER_SUCCESS';
export const registerGuildLeaderSuccess = (message) => ({
	type: REGISTER_GUILD_LEADER_SUCCESS,
	message
});
export const REGISTER_GUILD_LEADER_FAILURE = 'REGISTER_GUILD_LEADER_FAILURE';
export const registerGuildLeaderFailure = error => ({
	type: REGISTER_GUILD_LEADER_FAILURE
});

export const registerGuildLeader = (apiKey, userName, password) => {
  return dispatch => {
    fetch('http://localhost:8080/leaders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
      	apiKey,
        userName,
        password
      })
    })
    .then(response => response.json())
    .then(() => {
    	return dispatch(registerGuildLeaderSuccess('Successfully registered as a guild leader.'));
    })
    .catch(error => dispatch(registerGuildLeaderFailure(error)))
  }	
};

export const LOGIN_GUILD_LEADER_SUCCESS = 'REGISTER_GUILD_LEADER_SUCCESS';
export const loginGuildLeaderSuccess = (message) => ({
	type: REGISTER_GUILD_LEADER_SUCCESS,
	message
});
export const LOGIN_GUILD_LEADER_FAILURE = 'REGISTER_GUILD_LEADER_FAILURE';
export const loginGuildLeaderFailure = error => ({
	type: REGISTER_GUILD_LEADER_FAILURE
});

export const loginGuildLeader = (userName, password) => {
  return dispatch => {
    fetch('http://localhost:8080/login/authorization', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
      	//apiKey,
        userName,
        password
      })
    })
    .then(response => response.json())
    .then(() => {
    	return dispatch(registerGuildLeaderSuccess('Successfully registered as a guild leader.'));
    })
    .catch(error => dispatch(registerGuildLeaderFailure(error)))
  }	
};
