import * as actions from '../actions/teamsActions';

const initialRepositoryState = {
	guildTeams: [],
    teamDetails: {},
    teamPVPStats: {},
    teamRecentMatches: [],
    displayTeamDetails: true,
    displayTeamPVPStats: true,
    displayTeamRecentMatches:true,
    selectedTeam: null,
    selectedTeamInfo: {},
    teamLoading: true
};

const teams = (state=initialRepositoryState, action) => {
	if(action.type === actions.GET_TEAMS_SUCCESS){
		return Object.assign({}, state, {guildTeams: action.teams});
	}
    else if(action.type === actions.SELECT_TEAM){
        return Object.assign({}, state, {selectedTeamInfo: action.team, selectedTeam: true, teamLoading: false});
    }
    else if(action.type === actions.DESELECT_TEAM){
        return Object.assign({}, state, {selectedTeam: false, selectedTeamInfo: {}, teamDetails: {}, teamPVPStats: {}, teamRecentMatches: []});
    }
	return state;
};

export default teams;