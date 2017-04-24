//import 'whatwg-fetch';
import 'isomorphic-fetch';

//Log
export const GET_LOG_SUCCESS = 'GET_TEAMS_SUCCESS';
export const getTeamsSuccess = teams => ({
	type: GET_LOG_SUCCESS,
	teams
});

export const GET_LOG_FAILURE = 'GET_LOG_FAILURE';
export const getTeamsFailure = error => ({
	type: GET_LOG_FAILURE,
	error
});

export const getLog = (guildID, access_token) => {
  return dispatch => {
   /* fetch('https://api.guildwars2.com/v2/guild/${guildID}/teams?access_token=${access_token}')
    .then(response => response.json())
    .then(teams => dispatch(getTeamsSuccess(registeredMembers)))
    .catch(error => dispatch(getTeamsFailure(error)))*/
  }	
};

//Tasks
export const GET_TEAM_DETAILS_SUCCESS = 'GET_TEAM_DETAILS_SUCCESS';
export const getTeamDetailsSuccess = teamDetails => ({
	type: GET_TEAM_DETAILS_SUCCESS,
	teamDetails
});

export const GET_TEAM_DETAILS_FAILURE = 'GET_TEAM_DETAILS_FAILURE';
export const getTeamDetailsFailure = error => ({
	type: GET_TEAM_DETAILS_FAILURE,
	error
});

export const getTeamDetails = (teamID, teams) => {
  return dispatch => {
  	for(let i = 0; i < teams.length; i++){
  		if(teams[i].id === teamID){
  			return dispatch(getTeamDetailsSuccess(teams[i]));
  		}
  	}
    /*fetch('https://api.guildwars2.com/v2/guild/${guildID}/teams?access_token=${access_token}')
    .then(response => response.json())
    .then(teamsDetails => dispatch(getTeamDetailsSuccess(teamsDetails)))
    .catch(error => dispatch(getTeamDetailsFailure(error)))*/
  }	
};