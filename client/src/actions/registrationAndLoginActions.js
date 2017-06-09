//import 'whatwg-fetch';
import 'isomorphic-fetch';
import { getCookie, setCookie, expireCookie, removeCookie } from 'redux-cookie';
//import { CookiesProvider, withCookies, Cookies } from 'react-cookie';
//import Cookies from 'universal-cookie';


//Set Rank
export const SET_RANK = 'SET_RANK';
export const setRank = isLeader => ({
  type: SET_RANK,
  isLeader
});

export const getMemberRank = rank => {
  return dispatch => {
    if(rank === 'leader')
      return dispatch(setRank(true));
    else
      return dispatch(setRank(false));
  }
};

//User Name Input
export const USERNAME_INPUT = 'USERNAME_INPUT';
export const getUsernameInput = (usernameInput, invalidMessage = "", passwordDisabled = true, confirmPasswordDisabled = true, credentialsSubmitDisabled = true) => ({
	type: USERNAME_INPUT,
	usernameInput,
  invalidMessage,
  passwordDisabled,
  confirmPasswordDisabled,
  credentialsSubmitDisabled
});

//Password Input
export const PASSWORD_INPUT = 'PASSWORD_INPUT';
export const getPasswordInput = (passwordInput, invalidMessage = "", confirmPasswordDisabled = true) => ({
	type: PASSWORD_INPUT,
	passwordInput,
  invalidMessage,
  confirmPasswordDisabled
});

export const CONFIRM_PASSWORD_INPUT = 'CONFIRM_PASSWORD_INPUT';
export const getConfirmPasswordInput = (confirmPasswordInput, invalidMessage = "", credentialsSubmitDisabled = true) => ({
  type: CONFIRM_PASSWORD_INPUT,
  confirmPasswordInput,
  invalidMessage,
  credentialsSubmitDisabled
});

export const SET_VALID_CREDENTIALS = 'SET_VALID_CREDENTIALS';
export const setValidCredentials = (username, password, confirmPassword) => ({
  type: SET_VALID_CREDENTIALS,
  username,
  password,
  confirmPassword
});

export const SET_INVALID_CREDENTIALS = 'SET_INVALID_CREDENTIALS';
export const setInvalidCredentials = () => ({
  type: SET_INVALID_CREDENTIALS
});

export const registerGuildLeader = (username, password, confirmPassword, handleName, apiKey, guilds) => {
  return dispatch => {
    const validationErrors = ["", "", ""];
    if(username.length >= 8 && password.length >= 8 && confirmPassword === password){
      /*fetch('/api/leaders?username='+username)
      .then(response => response.json())
      .then(_response => {
        if(_response.unique){*/
          console.log(guilds);
          fetch('/api/register', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username,
            password,
            handleName,
            apiKey,
            guilds
          })
        })
        .then((response) => {
            if(!response.ok)
              throw Error('Username already exists');
            //if(response.status === 500){
              //validationErrors[]
            //  return dispatch(setInvalidCredentials());
           // }
            else
              return dispatch(switchToRegistrationSuccessSection());
            //console.log(message);
            //return dispatch(setValidCredentials(username, password, confirmPassword));
        })
        .catch(err =>{
          return dispatch(setInvalidCredentials());
        //}
        //validationErrors[0] = 'Username already exists';
        //return dispatch(setInvalidCredentials(validationErrors));
      });
      //});      
    }
    else{
      if(username.length <= 8){
        validationErrors[0] = 'Invalid Username: must be at least 8 characters long';
      }
      if(password.length <= 8){
        validationErrors[1] = 'Invalid password: must be at least 8 characters long';
      }
      if(confirmPassword <= 8 || confirmPassword !== password){
        validationErrors[2] = 'Invalid confirmation: must be equal to the password field and be at least 8 characters long';
      }
      return dispatch(setInvalidCredentials(validationErrors));
    }
  }
};

//Member Key Validation
export const VALIDATE_MEMBER_KEY_FAILURE = 'VALIDATE_MEMBER_KEY_FAILURE';
export const validateMemberKeyError = (errorMessage) => ({
	type: VALIDATE_MEMBER_KEY_FAILURE,
	errorMessage
});

export const VALIDATE_MEMBER_KEY_SUCCESS = 'VALIDATE_MEMBER_KEY_SUCCESS';
export const validateMemberKeySuccess = (memberName, memberApiKey, memberGuildChoices) => ({
	type: VALIDATE_MEMBER_KEY_SUCCESS,
	memberName,
	memberApiKey,
	memberGuildChoices
});

Array.prototype.diff = function(a) {
    return this.filter(function(i) {return a.indexOf(i) < 0;});
};

export const validateMemberAPIKey = access_token => {
  return dispatch => {
  	let memberGuilds; 
    fetch('https://api.guildwars2.com/v2/account?access_token='+access_token)
    .then(response => response.json())
    .then(responseObject => {
    	memberGuilds = responseObject.guilds;
      //if(responseObject.text === 'invalid key')
      if(Object.keys(responseObject).length === 1)
        return dispatch(validateMemberKeyError(responseObject.text));
        //throw new Error(responseObject.text);
    	else{
    		let guildsQuery="";
    		for(let i=0; i < responseObject.guilds.length; i++){
    			guildsQuery+="guildids="+responseObject.guilds[i]+"&";
    		}
    		guildsQuery+="membername="+responseObject.name;
    		fetch('/api/guilds?'+guildsQuery)
    		.then(response => response.json())
    		.then(_response => {
          if(_response.guilds.length === 0){
            return dispatch(validateMemberKeyError('This API Key is already associated with all of the registered guilds it is allowed.'));
            //throw new Error('This API Key is already associated with all of the registered guilds it is allowed.');
          }
    			/*if(_response.status === 500){
    				const errorMessage = _response.message;
    			}*/
    			//memberGuilds = memberGuilds.diff(_response.guilds);
    			return dispatch(validateMemberKeySuccess(responseObject.name, access_token, _response.guilds));//memberGuilds));
    		});
    	}
    });
    //.catch(errorMessage => dispatch(validateMemberKeyError(errorMessage)));
  }	
};

//Leader Key Validation
/*export const VALIDATE_LEADER_KEY_FAILURE = 'VALIDATE_LEADER_KEY_FAILURE';
export const validateLeaderKeyError = (errorResponse) => ({
  type: VALIDATE_LEADER_KEY_FAILURE,
  errorResponse
});*/

/*export const VALIDATE_LEADER_KEY_SUCCESS = 'VALIDATE_LEADER_KEY_SUCCESS';
export const validateLeaderKeySuccess = (memberName, memberApiKey, memberGuildChoices) => ({
  type: VALIDATE_MEMBER_KEY_SUCCESS,
  memberName,
  memberApiKey,
  memberGuildChoices
});*/

export const validateLeaderAPIKey = access_token => {
  return dispatch => {
    let leaderGuilds; 
    fetch('https://api.guildwars2.com/v2/account?access_token='+access_token)
    .then(response => response.json())
    .then(responseObject => {
      leaderGuilds = responseObject.guild_leader;
      if(Object.keys(responseObject).length === 1)
        return dispatch(validateMemberKeyError(responseObject.text));
      else if(!responseObject.guild_leader){
        return dispatch(validateMemberKeyError("API Key provided is not a Leader's API Key"));
      }
      else{
        let leadersQuery="";
        for(let i=0; i < responseObject.guild_leader.length; i++){
          leadersQuery+="guildids="+responseObject.guild_leader[i]+"&";
        }
        leadersQuery+="apikey="+access_token;
        fetch('/api/leaders?'+leadersQuery)
        .then(response => response.json())
        .then(_response => {
          leaderGuilds = leaderGuilds.diff(_response.guilds);
          if(leaderGuilds.length === 0){
            return dispatch(validateMemberKeyError('This API Key is already associated with all of the registered guilds it is allowed.'));
            //throw new Error('This API Key is already associated with all of the registered guilds it is allowed.');
          }
          /*if(_response.status === 500){
            const errorMessage = _response.message;
          }*/
          return dispatch(validateMemberKeySuccess(responseObject.name, access_token, leaderGuilds));//memberGuilds));
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
/*export const VALIDATE_LEADER_KEY_FAILURE = 'VALIDATE_LEADER_KEY_FAILURE';
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
};*/

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

/*export const registerGuildLeader = (apiKey, userName, password) => {
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
};*/
export const LOGOUT_USER = 'LOGOUT_USER';
export const logOutUser = () => ({
  type: LOGOUT_USER
});

export const userLogOut = () => {
  return dispatch => {
    fetch('/api/logout')
    .then(() => {
      //removeCookie('gw2highcommand', {path: '/'});
      //localStorage.removeItem('gw2highcommand');
      return dispatch(logOutUser())
    });
  }
}
export const LOGIN_GUILD_LEADER_SUCCESS = 'LOGIN_GUILD_LEADER_SUCCESS';
export const loginGuildLeaderSuccess = user => ({
	type: LOGIN_GUILD_LEADER_SUCCESS,
	user
});
export const LOGIN_GUILD_LEADER_FAILURE = 'REGISTER_GUILD_LEADER_FAILURE';
export const loginGuildLeaderFailure = errorMessage => ({
	type: LOGIN_GUILD_LEADER_FAILURE,
  errorMessage
});

export const loginGuildLeader = (username, password) => {
  return dispatch => {
    /*let formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);*/

    let user;
    let guildDetails;
    let guildUpgrades;
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
     credentials: 'same-origin',
     body: JSON.stringify({
        username,
        password
      })
      //body: formData
    })
    .then(response => response.json())
    .then(_response => {
      console.log(_response.user);
      //setCookie('gw2highcommand', 'value', { expires: 7 });
      //localStorage.setItem('gw2highcommand', {userID: _response.user.id, sessionID: _response.sessionID});
      /*user = _response.user;
      guildDetails = await fetch('https://api.guildwars2.com/v2/guild/'+user.guildIds[0]);
      guildUpgrades = await fetch('https://api.guildwars2.com/v2/guild/'+user.guildIds[0]);*/
      //fetch()
      return dispatch(authenticationCleared(_response.user))
    })
    .catch(error => dispatch(authenticationFailed(error.message)));
  }	
};

export const AUTHENTICATION_CLEARED = 'AUTHENTICATION_CLEARED';
export const authenticationCleared = (user) => ({
  type: AUTHENTICATION_CLEARED,
  user
  //welcomeMessage
});

export const AUTHENTICATION_FAILED = 'AUTHENTICATION_FAILED';
export const authenticationFailed = (errorMessage) => ({
  type: AUTHENTICATION_FAILED,
  errorMessage
});

export const checkAuthentication = () => {
  return dispatch => {
    /*if(getCookie('gw2highcommand')){
      fetch('/api/authorization')
      .then(response => dispatch(authenticationCleared(response.user)))
      .catch(error => dispatch(authenticationFailed(error.message)));
    }
    else
      return dispatch(authenticationFailed("User is not logged in."));*/
    /*const userID = localStorage.getItem('gw2highcommand').userID;
    const sessionID = localStorage.getItem('gw2highcommand').sessionID;
    if(!userId)
      return dispatch(authenticationFailed("Unauthorized user"));*/

    console.log("LINE 416 ");
    //console.log(localStorage.getItem('gw2highcommand'));
    let myHeaders = new Headers();
    myHeaders.append('pragma', 'no-cache');
    myHeaders.append('cache-control', 'no-cache');

    const myInit = {
      method: 'GET',
      headers: myHeaders,
      credentials: 'same-origin'
      /*body: JSON.stringify({
        userId: userID,
        sessionID: sessionID
      })*/
    };
    //fetch('/api/authorization')
    fetch('/api/authorization', myInit)
    .then(response => {
      if(response.status === 401)
        throw new Error('User not authenticated');
      else if(response.status === 200 || response.status === 304){
        console.log("RESPUSER: "+response.user);
        return response.json();
      }
      else
        throw new Error('Internal service error');
    })
    .then(_response => {
      console.log("CHECKED: "+_response.user.username);
      return dispatch(authenticationCleared(_response.user));        
    })
    .catch((error) => {
      console.log(error.message);
      return dispatch(authenticationFailed(error.message));
    });
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

export const SWITCH_TO_LOGIN_CREDENTIALS = 'SWITCH_TO_LOGIN_CREDENTIALS';
export const switchToLoginCredentialsSection = () => ({
  type: SWITCH_TO_LOGIN_CREDENTIALS
});

export const completeLeaderRegistration = (userName, password, leaderName, apiKey, guilds) => {

}
export const completeMemberRegistration = (memberName, apiKey, guilds) => {
  return dispatch => {
    let guildIds = [];
    for(let i=0; i < guilds.length; i++)
      guildIds.push(guilds[i].guildId);

    fetch('/api/guilds/bulk-update', 
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          memberName,
          apiKey,
          guildIds
        })
      }
    )
    .then(reponseMessage => dispatch(switchToRegistrationSuccessSection()));
  }
}
export const changeMemberRegistrationSection = (section, leader=false) => {
  return dispatch => {
    if(section==="keySubmission"){
		return dispatch(switchToKeySubmissionSection());
    }
    else if(section==="guildSelection"){
		return dispatch(switchToGuildSelectionSection());
    }
    else if(section==="loginCredentials"){
    return dispatch(switchToLoginCredentialsSection());
    }
    else{
      if(leader){

      }
      else{
        //queryParameters
        /*fetch('/api/guilds/members', {
          method: 'PUT',
          headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          apiKey,
          memberName
        })
      });*/
		    return dispatch(switchToRegistrationSuccessSection());
      }
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
export const changeSelectedGuilds = (selectedGuilds, nextArrowDisabled) => ({
  type: CHANGE_SELECTED_GUILDS,
  selectedGuilds,
  nextArrowDisabled
});

/*export const selectGuild = (selectedGuilds, guild) => {
  return dispatch => dispatch(changeSelectedGuilds([...selectedGuilds, guild], false));
};

export const deselectGuild = (selectedGuilds, guild) => {
  return dispatch => {
    for(let i=0; i < selectedGuilds.length; i++){
      if(selectedGuilds[i].guildId === guild.guildId){
        selectedGuilds.splice(i, 1);
        break;
      }
    }*/
    /*const index = selectedGuilds.indexOf(guildId);
    selectedGuilds.splice(index, 1);*/
   /* if(selectedGuilds.length === 0)
      return dispatch(changeSelectedGuilds(selectedGuilds, true));
    else
      return dispatch(changeSelectedGuilds(selectedGuilds, false));
  } 
};*/

export const toggleGuild = (selectedGuilds, guilds, guildId) => {
  return dispatch => {
    for(let i=0; i < selectedGuilds.length; i++){
      if(selectedGuilds[i].guildId === guildId){
        selectedGuilds.splice(i, 1);

        if(selectedGuilds.length === 0)
          return dispatch(changeSelectedGuilds(selectedGuilds, true));
        else
          return dispatch(changeSelectedGuilds(selectedGuilds, false));
        break;
      }
    }
    let guild;
    for(let j=0; j < guilds.length; j++){
      if(guilds[j].guildId === guildId){
        guild = guilds[j];
        break;
      }
    }
    /*const index = selectedGuilds.indexOf(guildId);
    selectedGuilds.splice(index, 1);*/
    /*if(selectedGuilds.length === 0)
      return dispatch(changeSelectedGuilds(selectedGuilds, true));
    else
      return dispatch(changeSelectedGuilds(selectedGuilds, false));*/
    return dispatch(changeSelectedGuilds([...selectedGuilds, guild], false));
  } 
};
