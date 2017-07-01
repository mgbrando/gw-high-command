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
    teamLoading: true,
    teamsLoading: true
};

const teams = (state=initialRepositoryState, action) => {
	if(action.type === actions.GET_TEAMS_SUCCESS){
		return Object.assign({}, state, {guildTeams: action.teams, teamsLoading: false});
	}
    else if(action.type === actions.SELECT_TEAM){
        return Object.assign({}, state, {selectedTeamInfo: action.team, selectedTeam: true, teamLoading: false, teamsLoading:true});
    }
    else if(action.type === actions.DESELECT_TEAM){
        return Object.assign({}, state, {selectedTeam: false, selectedTeamInfo: {}, teamDetails: {}, teamPVPStats: {}, teamRecentMatches: [], teamLoading: true, teamsLoading: false});
    }
    else if(action.type === actions.RESET_GUILD_TEAMS){
        return Object.assign({}, state, {teamsLoading: true});
    }
	return state;
};

export default teams;