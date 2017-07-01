//import 'whatwg-fetch';
import 'isomorphic-fetch';

export const DESELECT_TEAM = 'DESELECT_TEAM';
export const deselectTeam = () => ({
  type: DESELECT_TEAM
});

export const SELECT_TEAM = 'SELECT_TEAM';
export const selectTeam = team => ({
  type: SELECT_TEAM,
  team
});
//Teams
export const GET_TEAMS_SUCCESS = 'GET_TEAMS_SUCCESS';
export const getTeamsSuccess = teams => ({
	type: GET_TEAMS_SUCCESS,
	teams
});

export const GET_TEAMS_FAILURE = 'GET_TEAMS_FAILURE';
export const getTeamsFailure = error => ({
	type: GET_TEAMS_FAILURE,
	error
});

export const getGuildTeams = (guildID, access_token) => {
  return dispatch => {
    fetch('https://api.guildwars2.com/v2/guild/'+guildID+'/teams?access_token='+access_token)
    .then(response => response.json())
    .then(teams => dispatch(getTeamsSuccess(teams)))
    .catch(error => dispatch(getTeamsFailure(error)));
  }	
};

export const REFRESH_TEAMS = 'REFRESH_TEAMS';
export const refreshTeams = () => ({
  type: REFRESH_TEAMS
});

export const RESET_TEAMS_REFRESH = 'RESET_TEAMS_REFRESH';
export const resetTeamsRefresh = () => ({
    type: RESET_TEAMS_REFRESH
});

export const RESET_GUILD_TEAMS = 'RESET_GUILD_TEAMS';
export const resetGuildTeams = () => ({
  type: RESET_GUILD_TEAMS
});
//Team Details
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


