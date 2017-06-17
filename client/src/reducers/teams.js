import * as actions from '../actions/teamsActions';

const initialRepositoryState = {
	guildTeams: [],
    teamDetails: {},
    teamPVPStats: {},
    teamRecentMatches: [],
    displayTeamDetails: true,
    displayTeamPVPStats: true,
    displayTeamRecentMatches:true
};

const teams = (state=initialRepositoryState, action) => {
	if(action.type === actions.GET_TEAMS_SUCCESS){
		return Object.assign({}, state, {guildTeams: action.teams});
	}

	return state;
};

export default teams;