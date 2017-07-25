import * as actions from '../actions/navigationActions';
//import * as guildActions from '../actions/guildActions';

const initialRepositoryState = {
	page: "rankSelection", 
	section: "",
	refreshGuild: false,
	refreshMembers: false,
	refreshTeams: false
};

const navigation = (state=initialRepositoryState, action) => {
	if(action.type === actions.REFRESH_GUILD){
		return Object.assign({}, state, {refreshGuild: true, refreshMembers: false, refreshTeams: false});
	}
  	else if(action.type === actions.REFRESH_MEMBERS){
    return Object.assign({}, state, {refreshMembers: true, refreshGuild: false, refreshTeams: false});
  	}
  	else if(action.type === actions.REFRESH_TEAMS){
    	return Object.assign({}, state, {refreshTeams: true, refreshMembers: false, refreshGuild: false});
  	}
  	else if(action.type === actions.CLEAR_REFRESH){
    	return Object.assign({}, state, {refreshGuild: false, refreshMembers: false, refreshTeams: false});
  	}
	else if(action.type === actions.RESET_REFRESH){
		return Object.assign({}, state, {guildDetailsLoading: true, guildUpgradesLoading: true, guildCoinsLoading: true});
	}
	return state;
};

export default navigation;