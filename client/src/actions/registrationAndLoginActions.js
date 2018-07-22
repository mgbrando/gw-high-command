//import 'whatwg-fetch';
import "isomorphic-fetch";
import $ from "jquery";

export const RESET_REGISTRATION = "RESET_REGISTRATION";
export const registrationReset = () => ({
  type: RESET_REGISTRATION
});

export const SWITCH_TO_REGISTRATION_SUCCESS = "SWITCH_TO_REGISTRATION_SUCCESS";
export const switchToRegistrationSuccessSection = () => ({
  type: SWITCH_TO_REGISTRATION_SUCCESS
});
export const SWITCH_TO_GUILD_SELECTION = "SWITCH_TO_GUILD_SELECTION";
export const switchToGuildSelectionSection = () => ({
  type: SWITCH_TO_GUILD_SELECTION
});
export const SWITCH_TO_KEY_SUBMISSION = "SWITCH_TO_KEY_SUBMISSION";
export const switchToKeySubmissionSection = () => ({
  type: SWITCH_TO_KEY_SUBMISSION
});

export const SWITCH_TO_LOGIN_CREDENTIALS = "SWITCH_TO_LOGIN_CREDENTIALS";
export const switchToLoginCredentialsSection = () => ({
  type: SWITCH_TO_LOGIN_CREDENTIALS
});

export const changeSection = (stepIndex, isLeader = false) => {
  return dispatch => {
    if (stepIndex === 0) {
      return dispatch(switchToKeySubmissionSection());
    } else if (stepIndex === 1) {
      return dispatch(switchToGuildSelectionSection());
    } else if (stepIndex === 2 && isLeader) {
      return dispatch(switchToLoginCredentialsSection());
    } else {
      return dispatch(switchToRegistrationSuccessSection());
    }
  };
};

export const SET_ACTIVE_GUILD = "SET_ACTIVE_GUILD";
export const setActiveGuild = guild => ({
  type: SET_ACTIVE_GUILD,
  guild
});
//Set Rank
export const SET_RANK = "SET_RANK";
export const setRank = isLeader => ({
  type: SET_RANK,
  isLeader
});

export const getMemberRank = rank => {
  return dispatch => {
    if (rank === "leader") return dispatch(setRank(true));
    else return dispatch(setRank(false));
  };
};

export const RESET_LOGIN_STATE = "RESET_LOGIN_STATE";
export const resetLoginState = () => ({
  type: RESET_LOGIN_STATE
});

//User Name Input
export const LOGIN_USERNAME_INPUT = "LOGIN_USERNAME_INPUT";
export const getLoginUsernameInput = usernameInput => ({
  type: LOGIN_USERNAME_INPUT,
  usernameInput
});

//Password Input
export const LOGIN_PASSWORD_INPUT = "LOGIN_PASSWORD_INPUT";
export const getLoginPasswordInput = passwordInput => ({
  type: LOGIN_PASSWORD_INPUT,
  passwordInput
});

//User Name Input
export const USERNAME_INPUT = "USERNAME_INPUT";
export const getUsernameInput = (
  usernameInput,
  invalidMessage = "",
  passwordDisabled = true,
  confirmPasswordDisabled = true,
  credentialsSubmitDisabled = true
) => ({
  type: USERNAME_INPUT,
  usernameInput,
  invalidMessage,
  passwordDisabled,
  confirmPasswordDisabled,
  credentialsSubmitDisabled
});

//Password Input
export const PASSWORD_INPUT = "PASSWORD_INPUT";
export const getPasswordInput = (
  passwordInput,
  invalidMessage = "",
  confirmPasswordDisabled = true
) => ({
  type: PASSWORD_INPUT,
  passwordInput,
  invalidMessage,
  confirmPasswordDisabled
});

export const CONFIRM_PASSWORD_INPUT = "CONFIRM_PASSWORD_INPUT";
export const getConfirmPasswordInput = (
  confirmPasswordInput,
  invalidMessage = "",
  credentialsSubmitDisabled = true
) => ({
  type: CONFIRM_PASSWORD_INPUT,
  confirmPasswordInput,
  invalidMessage,
  credentialsSubmitDisabled
});

export const SET_VALID_CREDENTIALS = "SET_VALID_CREDENTIALS";
export const setValidCredentials = (username, password, confirmPassword) => ({
  type: SET_VALID_CREDENTIALS,
  username,
  password,
  confirmPassword
});

export const SET_INVALID_CREDENTIALS = "SET_INVALID_CREDENTIALS";
export const setInvalidCredentials = () => ({
  type: SET_INVALID_CREDENTIALS
});

export const registerGuildLeader = (
  username,
  password,
  confirmPassword,
  handleName,
  apiKey,
  guilds
) => {
  return dispatch => {
    const validationErrors = ["", "", ""];
    if (
      username.length >= 8 &&
      password.length >= 8 &&
      confirmPassword === password
    ) {
      console.log(guilds);
      fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          password,
          handleName,
          apiKey,
          guilds
        })
      })
        .then(response => {
          if (!response.ok) throw Error("Username already exists");
          //if(response.status === 500){
          //validationErrors[]
          //  return dispatch(setInvalidCredentials());
          // }
          else return dispatch(switchToRegistrationSuccessSection());
        })
        .catch(err => {
          return dispatch(setInvalidCredentials());
        });
    } else {
      if (username.length <= 8) {
        validationErrors[0] =
          "Invalid Username: must be at least 8 characters long";
      }
      if (password.length <= 8) {
        validationErrors[1] =
          "Invalid password: must be at least 8 characters long";
      }
      if (confirmPassword <= 8 || confirmPassword !== password) {
        validationErrors[2] =
          "Invalid confirmation: must be equal to the password field and be at least 8 characters long";
      }
      return dispatch(setInvalidCredentials(validationErrors));
    }
  };
};

//Member Key Validation
export const VALIDATE_MEMBER_KEY_FAILURE = "VALIDATE_MEMBER_KEY_FAILURE";
export const validateMemberKeyError = errorMessage => ({
  type: VALIDATE_MEMBER_KEY_FAILURE,
  errorMessage
});

export const VALIDATE_MEMBER_KEY_SUCCESS = "VALIDATE_MEMBER_KEY_SUCCESS";
export const validateMemberKeySuccess = (
  memberName,
  memberApiKey,
  memberGuildChoices
) => ({
  type: VALIDATE_MEMBER_KEY_SUCCESS,
  memberName,
  memberApiKey,
  memberGuildChoices
});

function diff(arr1, arr2) {
  return arr1.filter(item => arr2.indexOf(item) < 0);
}
/*Array.prototype.diff = function(a) {
  return this.filter(function(i) {
    return a.indexOf(i) < 0;
  });
};*/

export const validateMemberAPIKey = access_token => {
  return dispatch => {
    //let memberGuilds;
    fetch("https://api.guildwars2.com/v2/account?access_token=" + access_token)
      .then(response => response.json())
      .then(responseObject => {
        //memberGuilds = responseObject.guilds;
        //if(responseObject.text === 'invalid key')
        if (Object.keys(responseObject).length === 1)
          return dispatch(validateMemberKeyError(responseObject.text));
        //throw new Error(responseObject.text);
        else {
          let guildsQuery = "";
          for (let i = 0; i < responseObject.guilds.length; i++) {
            guildsQuery += "guildids=" + responseObject.guilds[i] + "&";
          }
          guildsQuery += "membername=" + responseObject.name;
          fetch("/api/guilds?" + guildsQuery)
            .then(response => response.json())
            .then(_response => {
              if (_response.guilds.length === 0) {
                return dispatch(
                  validateMemberKeyError(
                    "This API Key is already associated with all of the registered guilds it is allowed."
                  )
                );
                //throw new Error('This API Key is already associated with all of the registered guilds it is allowed.');
              }
              /*if(_response.status === 500){
    				const errorMessage = _response.message;
    			}*/
              //memberGuilds = memberGuilds.diff(_response.guilds);
              return dispatch(
                validateMemberKeySuccess(
                  responseObject.name,
                  access_token,
                  _response.guilds
                )
              ); //memberGuilds));
            });
        }
      });
    //.catch(errorMessage => dispatch(validateMemberKeyError(errorMessage)));
  };
};

//Leader Key Validation

export const validateLeaderAPIKey = access_token => {
  return dispatch => {
    let leaderGuilds;
    fetch("https://api.guildwars2.com/v2/account?access_token=" + access_token)
      .then(response => response.json())
      .then(responseObject => {
        leaderGuilds = responseObject.guild_leader;
        if (Object.keys(responseObject).length === 1)
          return dispatch(validateMemberKeyError(responseObject.text));
        else if (!responseObject.guild_leader) {
          return dispatch(
            validateMemberKeyError("API Key provided is not a Leader's API Key")
          );
        } else {
          let leadersQuery = "";
          for (let i = 0; i < responseObject.guild_leader.length; i++) {
            leadersQuery += "guildids=" + responseObject.guild_leader[i] + "&";
          }
          leadersQuery += "apikey=" + access_token;
          fetch("/api/leaders?" + leadersQuery)
            .then(response => response.json())
            .then(_response => {
              leaderGuilds = diff(leaderGuilds, _response.guilds);
              if (leaderGuilds.length === 0) {
                return dispatch(
                  validateMemberKeyError(
                    "This API Key is already associated with all of the registered guilds it is allowed."
                  )
                );
                //throw new Error('This API Key is already associated with all of the registered guilds it is allowed.');
              }
              /*if(_response.status === 500){
            const errorMessage = _response.message;
          }*/
              return dispatch(
                validateMemberKeySuccess(
                  responseObject.name,
                  access_token,
                  leaderGuilds
                )
              ); //memberGuilds));
            });
          //.catch(error => { const errorMessage = error;});
        }
      });
  };
};

//Add Member Key to guilds - (change localhost:8080 dependent on config file)
export const ADD_MEMBER_SUCCESS = "ADD_MEMBER_SUCCESS";
export const addMemberSuccess = message => ({
  type: ADD_MEMBER_SUCCESS,
  message
});

export const ADD_MEMBER_FAILURE = "ADD_MEMBER_FAILURE";
export const addMemberFailure = error => ({
  type: ADD_MEMBER_FAILURE,
  error
});

export const addMemberToGuilds = (member, guilds) => {
  return dispatch => {
    fetch("http://localhost:8080/guilds/bulk-update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        member,
        guilds
      })
    })
      .then(response => response.json())
      .then(() => {
        let successMessage = "Successfully added member to";
        for (let i = 0; i < guilds.length; i++) {
          successMessage += ` ${guilds[i].name}`;
        }
        return dispatch(addMemberSuccess(successMessage));
      })
      .catch(error => dispatch(addMemberFailure(error)));
  };
};

//Add Member Key to guilds - (change localhost:8080 dependent on config file)
export const REGISTER_GUILD_LEADER_SUCCESS = "REGISTER_GUILD_LEADER_SUCCESS";
export const registerGuildLeaderSuccess = message => ({
  type: REGISTER_GUILD_LEADER_SUCCESS,
  message
});
export const REGISTER_GUILD_LEADER_FAILURE = "REGISTER_GUILD_LEADER_FAILURE";
export const registerGuildLeaderFailure = error => ({
  type: REGISTER_GUILD_LEADER_FAILURE
});

export const LOGOUT_USER = "LOGOUT_USER";
export const logOutUser = () => ({
  type: LOGOUT_USER
});

export const userLogOut = () => {
  return dispatch => {
    const settings = {
      url: "/api/logout",
      method: "POST",
      headers: {
        "content-type": "application/json"
      }
    };

    $.ajax(settings).done(response => {
      return dispatch(logOutUser());
    });
  };
};
export const LOGIN_GUILD_LEADER_SUCCESS = "LOGIN_GUILD_LEADER_SUCCESS";
export const loginGuildLeaderSuccess = user => ({
  type: LOGIN_GUILD_LEADER_SUCCESS,
  user
});
export const LOGIN_GUILD_LEADER_FAILURE = "REGISTER_GUILD_LEADER_FAILURE";
export const loginGuildLeaderFailure = errorMessage => ({
  type: LOGIN_GUILD_LEADER_FAILURE,
  errorMessage
});

export const AUTHENTICATION_CLEARED = "AUTHENTICATION_CLEARED";
export const authenticationCleared = (user, guilds, activeGuild) => ({
  type: AUTHENTICATION_CLEARED,
  user,
  guilds,
  activeGuild
});

export const AUTHENTICATION_FAILED = "AUTHENTICATION_FAILED";
export const authenticationFailed = errorMessage => ({
  type: AUTHENTICATION_FAILED,
  errorMessage
});

export const loginGuildLeader = (username, password) => {
  return dispatch => {
    const settings = {
      url: "/api/login",
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      data: JSON.stringify({
        username,
        password
      })
    };

    $.ajax(settings)
      .done(_response => {
        if (!_response.success) {
          //throw new Error(_response.message);
          return dispatch(authenticationFailed(_response.message));
        }
        let currentUserKey = _response.user.apiKey;
        let queryString = "?";
        for (let j = 0; j < _response.user.guildIds.length; j++) {
          if (j === 0) {
            queryString += `guildids=${_response.user.guildIds[0]}`;
          } else queryString += `&guildids=${_response.user.guildIds[j]}`;
        }
        /*fetch('https://api.guildwars2.com/v2/account?access_token='+currentUserKey)
      .then(response => response.json())
      .then(accountInfo => {*/
        fetch("/api/guilds" + queryString)
          .then(response => response.json())
          .then(guildsResponse => {
            let guildPromises = [];
            for (let i = 0; i < guildsResponse.guilds.length; i++) {
              guildPromises.push(
                fetch(
                  "https://api.guildwars2.com/v2/guild/" +
                    guildsResponse.guilds[i] +
                    "?access_token=" +
                    currentUserKey
                ).then(response => response.json())
              );
            }

            Promise.all(guildPromises).then(guilds => {
              return dispatch(
                authenticationCleared(_response.user, guilds, guilds[0].id)
              );
            });
          });
      })
      .catch(error => dispatch(authenticationFailed(error.message)));
  };
};

export const checkAuthentication = () => {
  return dispatch => {
    const settings = {
      url: "/api/authorization",
      method: "GET",
      headers: {
        "content-type": "application/json"
      }
    };

    $.ajax(settings)
      .done(response => {
        if (response.user) {
          let currentUserKey = response.user.apiKey;
          fetch(
            "https://api.guildwars2.com/v2/account?access_token=" +
              currentUserKey
          )
            .then(response => response.json())
            .then(accountInfo => {
              let guildPromises = [];
              for (let i = 0; i < accountInfo.guilds.length; i++) {
                guildPromises.push(
                  fetch(
                    "https://api.guildwars2.com/v2/guild/" +
                      accountInfo.guilds[i] +
                      "?access_token=" +
                      currentUserKey
                  ).then(response => response.json())
                );
              }

              Promise.all(guildPromises).then(guilds => {
                return dispatch(
                  authenticationCleared(response.user, guilds, guilds[0].id)
                );
              });
            });
        } else window.location = "/login";
      })
      .catch(error => {
        console.log(error.message);
        return dispatch(authenticationFailed(error.message));
      });
  };
};

export const completeLeaderRegistration = (
  userName,
  password,
  leaderName,
  apiKey,
  guilds
) => {};
export const completeMemberRegistration = (memberName, apiKey, guilds) => {
  return dispatch => {
    let guildIds = [];
    for (let i = 0; i < guilds.length; i++) guildIds.push(guilds[i].guildId);

    fetch("/api/guilds/bulk-update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        memberName,
        apiKey,
        guildIds
      })
    }).then(reponseMessage => dispatch(switchToRegistrationSuccessSection()));
  };
};
export const changeMemberRegistrationSection = (section, leader = false) => {
  return dispatch => {
    if (section === "keySubmission") {
      return dispatch(switchToKeySubmissionSection());
    } else if (section === "guildSelection") {
      return dispatch(switchToGuildSelectionSection());
    } else if (section === "loginCredentials") {
      return dispatch(switchToLoginCredentialsSection());
    } else {
      if (leader) {
      } else {
        return dispatch(switchToRegistrationSuccessSection());
      }
    }
  };
};

export const GET_MEMBER_KEY_INPUT = "GET_MEMBER_KEY_INPUT";
export const getAPIKeyInput = apiKey => ({
  type: GET_MEMBER_KEY_INPUT,
  apiKey
});

export const GET_GUILD_SUCCESS = "GET_GUILD_SUCCESS";
export const getGuildSuccess = guild => ({
  type: GET_GUILD_SUCCESS,
  guild
});

export const GET_GUILD_FAILURE = "GET_GUILD_FAILURE";
export const getGuildFailure = errorMessage => ({
  type: GET_GUILD_FAILURE,
  errorMessage
});

export const getGuilds = guildId => {
  return dispatch => {
    let apiCall = "https://api.guildwars2.com/v2/guild/";
    fetch(apiCall + guildId)
      .then(response => response.json())
      .then(guild => {
        return dispatch(
          getGuildSuccess({
            guildId: guild.id,
            guildName: guild.name,
            guildTag: guild.tag
          })
        );
      });
  };
};
export const CHANGE_SELECTED_GUILDS = "CHANGE_SELECTED_GUILDS";
export const changeSelectedGuilds = (selectedGuilds, nextArrowDisabled) => ({
  type: CHANGE_SELECTED_GUILDS,
  selectedGuilds,
  nextArrowDisabled
});

export const toggleGuild = (selectedGuilds, guilds, guildId) => {
  return dispatch => {
    for (let i = 0; i < selectedGuilds.length; i++) {
      if (selectedGuilds[i].guildId === guildId) {
        selectedGuilds.splice(i, 1);

        if (selectedGuilds.length === 0)
          return dispatch(changeSelectedGuilds(selectedGuilds, true));
        else return dispatch(changeSelectedGuilds(selectedGuilds, false));
      }
    }
    let guild;
    for (let j = 0; j < guilds.length; j++) {
      if (guilds[j].guildId === guildId) {
        guild = guilds[j];
        break;
      }
    }
    return dispatch(changeSelectedGuilds([...selectedGuilds, guild], false));
  };
};
