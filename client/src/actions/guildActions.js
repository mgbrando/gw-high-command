//import 'whatwg-fetch';
import 'isomorphic-fetch';


//Guild Details
export const GET_GUILD_DETAILS_SUCCESS = 'GET_GUILD_DETAILS_SUCCESS';
export const getGuildDetailsSuccess = guildDetails => ({
	type: GET_GUILD_DETAILS_SUCCESS,
	guildDetails
});

export const GET_GUILD_DETAILS_FAILURE = 'GET_GUILD_DETAILS_FAILURE';
export const getGuildDetailsFailure = error => ({
	type: GET_GUILD_DETAILS_FAILURE,
	error
});

export const getGuildDetails = guildID => {
  return dispatch => {
    fetch('https://api.guildwars2.com/v2/guild/${guildID}')
    .then(response => response.json())
    .then(guildDetails => dispatch(getGuildDetailsSuccess(guildDetails)))
    .catch(error => dispatch(getGuildDetailsFailure(error)))
  }	
};

//Guild Upgrades - NEED HELP
export const GET_GUILD_UPGRADES_SUCCESS = 'GET_GUILD_UPGRADES_SUCCESS';
export const getGuildUpgradesSuccess = (upgrades, completedUpgrades) => ({
	type: GET_GUILD_UPGRADES_SUCCESS,
	upgrades,
	completedUpgrades
});

export const GET_GUILD_UPGRADES_FAILURE = 'GET_GUILD_UPGRADES_FAILURE';
export const getGuildUpgradesFailure = (error) => ({
	type: GET_GUILD_UPGRADES_FAILURE,
	error
});

export const getGuildUpgrades = (guildID, access_token) => {
  return dispatch => {
  	//let completedUpgrades=[];
  	//let inProgressUpgrades=[];

  	const upgradesPromise = fetch('https://api.guildwars2.com/v2/guild/upgrades');
    /*.then(response => response.json())
    .then(upgrades => dispatch(getGuildUpgradesSuccess(upgrades)))
    .catch(error => dispatch(getGuildUpgradesFailure(error)));*/
    /*const guildUpgradesPromise = fetch('https://api.guildwars2.com/v2/guild/${guildID}/upgrades?access_token=${access_token}')
    							 .then(guildUpgrades => {
    							 	let ids = '';
    							 	for(let i = 0; i <guildUpgrades.length; i++)
    							 		ids+=guildUpgrades[i]+',';

    							 	return fetch('https://api.guildwars2.com/v2/guild/upgrades?ids=${ids}');
    							 });*/
    const guildUpgradesPromise = fetch('https://api.guildwars2.com/v2/guild/${guildID}/upgrades?access_token=${access_token}');
    //.then(response => response.json())
    /*.then(upgrades => {
    	for(i = 0; i < upgrades.length; i++)
    		completedUpgrades.push(upgrades[i]);*/
    	/*if(Object.keys(reponseObject) ===1)
    		dispatch(validateMemberKeyError(responseObject));
    	else
    		dispatch(validateMemberKeySuccess(responseObject));*/
    //})

    Promise.all([upgradesPromise, guildUpgradesPromise])
    .then(promiseArray => {
    	const [upgrades, completedUpgrades] = promiseArray;
    	return dispatch(getGuildUpgradesSuccess(upgrades, completedUpgrades));
    })
    .catch(error => dispatch(getGuildUpgradesFailure(error)));
  }	
};