//import 'whatwg-fetch';
import 'isomorphic-fetch';

//Registered Members
export const GET_REGISTERED_MEMBERS_SUCCESS = 'GET_REGISTERED_MEMBERS_SUCCESS';
export const getRegisteredMembersSuccess = members => ({
	type: GET_REGISTERED_MEMBERS_SUCCESS,
	members
});

export const GET_REGISTERED_MEMBERS_FAILURE = 'GET_REGISTERED_MEMBERS_FAILURE';
export const getRegisteredMembersFailure = error => ({
	type: GET_REGISTERED_MEMBER_DETAILS_FAILURE,
	error
});

export const getRegisteredMembers = guildID => {
  return dispatch => {
    fetch('http://localhost:8080/guilds/${guildID}/members')
    .then(response => response.json())
    .then(registeredMembers => dispatch(getRegisteredMembersSuccess(registeredMembers)))
    .catch(error => dispatch(getRegisteredMembersFailure(error)))
  }	
};

//Registered Member Details
export const GET_REGISTERED_MEMBER_DETAILS_SUCCESS = 'GET_REGISTERED_MEMBER_DETAILS_SUCCESS';
export const getRegisteredMemberDetailsSuccess = memberDetails => ({
	type: GET_REGISTERED_MEMBER_DETAILS_SUCCESS,
	memberDetails
});

export const GET_REGISTERED_MEMBER_DETAILS_FAILURE = 'GET_REGISTERED_MEMBER_DETAILS_FAILURE';
export const getRegisteredMemberDetailsFailure = error => ({
	type: GET_REGISTERED_MEMBER_DETAILS_FAILURE,
	error
});

export const getRegisteredMemberDetails = memberApiKey => {
  return dispatch => {
    fetch('https://api.guildwars2.com/v2/account?access_token=${memberApiKey}')
    .then(response => response.json())
    .then(memberDetails => dispatch(getRegisteredMemberDetailsSuccess(memberDetails)))
    .catch(error => dispatch(getRegisteredMemberDetailsFailure(error)));
  }	
};

//Member PVP Stats
export const GET_MEMBER_PVP_STATS_SUCCESS = 'GET_MEMBER_PVP_STATS_SUCCESS';
export const getMemberPVPStatsSuccess = (pvpStats, pvpStandings) => ({
	type: GET_MEMBER_PVP_STATS_SUCCESS,
	pvpStats,
	pvpStandings
});

export const GET_MEMBER_PVP_STATS_FAILURE = 'GET_MEMBER_PVP_STATS_FAILURE';
export const getMemberPVPStatsFailure = (error) => ({
	type: GET_MEMBER_PVP_STATS_FAILURE,
	error
});

/*export const GET_MEMBER_PVP_STANDINGS_SUCCESS = 'GET_MEMBER_PVP_STANDINGS_SUCCESS';
export const getMemberPVPStandingsSuccess = pvpStandings => ({
	type: GET_MEMBER_PVP_STANDINGS_SUCCESS,
	pvpStandings
});

export const GET_MEMBER_PVP_STANDINGS_FAILURE = 'GET_MEMBER_PVP_STANDINGS_FAILURE';
export const getMemberPVPStandingsFailure = (error) => ({
	type: GET_MEMBER_PVP_STANDINGS_FAILURE,
	error
});*/

export const getMemberPVPStats = access_token => {
  return dispatch => {
  	const pvpStatsPromise = fetch('https://api.guildwars2.com/v2/pvp/stats?access_token=${access_token}');
    /*.then(response => response.json())
    .then(pvpStats => dispatch(getMemberPVPStatsSuccess(pvpStats)))
    .catch(error => dispatch(getMemberPvPStatsFailure(error)));*/

    const pvpStandingsPromise = fetch('https://api.guildwars2.com/v2/pvp/standings?access_token=${access_token}');
    /*.then(response => response.json())
    .then(pvpStandings => dispatch(getMemberPVPStandingsSuccess(pvpStandings)))
    .catch(error => dispatch(getMemberPvPStandingsFailure(error)));*/

    Promise.all([pvpStatsPromise, pvpStandingsPromise])
    .then(promiseArray => {
    	const [pvpStats, pvpStandings] = promiseArray;
    	return dispatch(getMemberPVPStatsSuccess(pvpStats, pvpStandings));
    })
    .catch(error => dispatch(getMemberPVPStatsFailure(error)));
  }	
};

//Member PVE Stats
export const GET_MEMBER_PVE_STATS_SUCCESS = 'GET_MEMBER_PVE_STATS_SUCCESS';
export const getMemberPVEStatsSuccess = pveStats => ({
	type: GET_MEMBER_PVE_STATS_SUCCESS,
	pveStats
});

export const GET_MEMBER_PVE_STATS_FAILURE = 'GET_MEMBER_PVE_STATS_FAILURE';
export const getMemberPVEStatsFailure = (error) => ({
	type: GET_MEMBER_PVE_STATS_FAILURE,
	error
});

export const getMemberPVEStats = access_token => {
  return dispatch => {
  	fetch('https://api.guildwars2.com/v2/account/raids?access_token=${access_token}')
    .then(response => response.json())
    .then(pveStats => dispatch(getMemberPVEStatsSuccess(pveStats)))
    .catch(error => dispatch(getMemberPVEStatsFailure(error)));
  }	
};