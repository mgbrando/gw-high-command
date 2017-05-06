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
export const validateMemberKeySuccess = (memberName, memberApiKey, memberGuildChoices) => ({
	type: VALIDATE_MEMBER_KEY_SUCCESS,
	memberName,
	memberApiKey,
	memberGuildChoices
});

/*Array.prototype.diff = function(a) {
    return this.filter(function(i) {return a.indexOf(i) < 0;});
};*/

export const validateMemberAPIKey = access_token => {
  return dispatch => {
  	let memberGuilds; 
    fetch('https://api.guildwars2.com/v2/account?access_token='+access_token)
    .then(response => response.json())
    .then(responseObject => {
    	memberGuilds = responseObject.guilds;
    	if(Object.keys(responseObject) === 1)
    		return dispatch(validateMemberKeyError(responseObject));
    	else{
    		let guildsQuery="";
    		for(let i=0; i < responseObject.guilds.length; i++){
    			guildsQuery+="guildids="+responseObject.guilds[i]+"&";
    		}
    		guildsQuery+="membername="+responseObject.name;
    		fetch('http://localhost:8080/api/guilds?'+guildsQuery)
    		.then(response => response.json())
    		.then(_response => {
    			/*if(_response.status === 500){
    				const errorMessage = _response.message;
    			}*/
    			//memberGuilds = memberGuilds.diff(_response.guilds);
    			return dispatch(validateMemberKeySuccess(responseObject.name, access_token, _response.guilds));//memberGuilds));
    		});
    		//.catch(error => { const errorMessage = error;});
    	}
    });
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
    	else{
    		return dispatch(validateLeaderKeySuccess(responseObject, access_token));
    	}
    });
  }	
};

//Add Member Key to guilds - (change localhost:8080 dependent on config file)
export const REGISTER_GUILD_LEADER_SUCCESS = 'REGISTER_GUILD_LEADER_SUCCESS';
export const registerGuildLeaderSuccess = message => ({
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

export const SWITCH_TO_REGISTRATION_SUCCESS = 'SWITCH_TO_REGISTRATION_SUCCESS';
export const switchToRegistrationSuccessSection = () => ({
	type: SWITCH_TO_REGISTRATION_SUCCESS
});
export const SWITCH_TO_GUILD_SELECTION = 'SWITCH_TO_GUILD_SELECTION';
export const switchToGuildSelectionSection = () => ({
	type: SWITCH_TO_GUILD_SELECTION
});
export const SWITCH_TO_KEY_SUBMISSION = 'SWITCH_TO_KEY_SUBMISSION';
export const switchToKeySubmissionSection = () => ({
	type: SWITCH_TO_KEY_SUBMISSION
});

export const changeMemberRegistrationSection = section => {
  return dispatch => {
    if(section==="keySubmission"){
		return dispatch(switchToKeySubmissionSection());
    }
    else if(section==="guildSelection"){
		return dispatch(switchToGuildSelectionSection());
    }
    else{
		return dispatch(switchToRegistrationSuccessSection());
    }
  }	
};

export const GET_MEMBER_KEY_INPUT = 'GET_MEMBER_KEY_INPUT';
export const getAPIKeyInput = apiKey => ({
	type: GET_MEMBER_KEY_INPUT,
	apiKey
});

export const GET_GUILD_SUCCESS = 'GET_GUILD_SUCCESS';
export const getGuildSuccess = guild => ({
	type: GET_GUILD_SUCCESS,
	guild
});

export const GET_GUILD_FAILURE = 'GET_GUILD_FAILURE';
export const getGuildFailure = errorMessage => ({
	type: GET_GUILD_FAILURE,
	errorMessage
});

export const getGuilds = guildId => {
  return dispatch => {
  	//let fetchPromises = [];
  	let apiCall='https://api.guildwars2.com/v2/guild/';
  	//Come back to this with the callable functions
  	//for(let i = 0; i < guildIds.length; i++){
  		//fetchPromises.push(fetch(apiCall+guildIds[0]).then(guild => {return {guildId: guild.id, guildName: guild.name};}));
  		//fetchPromises.push(() => fetch(apiCall+guildIds[i]));
  		//this["promise"+i]=
  		/*	.then(guild => {
  				return {guildId: guild.id, guildName: guild.name};
  			}));*/
	fetch(apiCall+guildId)
		.then(response => response.json())//apiCall+guildId)
		.then(guild => { 
			return dispatch(getGuildSuccess({guildId: guild.id, guildName: guild.name, guildTag: guild.tag}));
		});
		//.catch(error => {return dispatch(getGuildFailure(error));})//+guildId+'. '+'ERROR: '+error)));
  	//Promise.all(fetchPromises.map(p => {
  		/*p.then(guildValues => {
  			console.log(guildValues);
  		})*/
  	//	console.dir(p);
  	//}))
  	/*.then(guilds =>{
  		const gID=guilds[0].id;
  		const gName=guilds[0].name;
  		return dispatch(saveGuilds(guilds));
  	})*/
  	//.catch(err => err);
  }	
};
export const CHANGE_SELECTED_GUILDS = 'CHANGE_SELECTED_GUILDS';
export const changeSelectedGuilds = selectedGuilds => ({
  type: CHANGE_SELECTED_GUILDS,
  selectedGuilds
});

export const selectGuild = (selectedGuilds, guildId) => {
  return dispatch => dispatch(changeSelectedGuilds([...selectedGuilds, guildId]));
};

export const deselectGuild = (selectedGuilds, guildId) => {
  return dispatch => {
    const index = selectedGuilds.indexOf(guildId);
    selectedGuilds.splice(index, 1);
    return dispatch(changeSelectedGuilds(selectedGuilds));
  } 
};