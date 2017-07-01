import * as actions from '../actions/navigationActions';

const initialRepositoryState = {
	page: "rankSelection", 
	section: "",
	refreshGuild: false,
	refreshMembers: false,
	refreshTeams: false
};

const navigation = (state=initialRepositoryState, action) => {
	if(action.type === actions.REFRESH_GUILD){
		return Object.assign({}, state, {refreshGuild: true});
	}
	/*else if(action.type === actions.SET_SELECTED_MEMBER_SUCCESS){
		return Object.assign({}, state, {accountInfo: action.accountInfo, joined: action.joined, characters: action.characters, pvpStats: action.pvpStats, pvpStandings: action.pvpStandings, raids: action.raids, selectedMember: true});
	}*/
  	else if(action.type === actions.REFRESH_MEMBERS){
    return Object.assign({}, state, {refreshMembers: true});
  	}
  	else if(action.type === actions.REFRESH_TEAMS){
    	return Object.assign({}, state, {refreshTeams: true});
  	}
  	else if(action.type === actions.CLEAR_REFRESH){
    	return Object.assign({}, state, {refreshGuild: false, refreshMembers: false, refreshTeams: false});
  	}
	return state;
};

export default navigation;