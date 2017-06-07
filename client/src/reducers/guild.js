import * as actions from '../actions/guildActions';

const initialRepositoryState = {
	activeUserGuilds: [],
    guildDetails: {},
    guildDetailsFailureMessage: "",
    guildUpgrades: [],
    guildCompletedUpgrades: [],
    guildUpgradesFailureMessage: "",
    displayGuildDetails: true,
    displayGuildUpgrades: true,
    guildDetailsLoading: true,
    guildUpgradesLoading: true
};

const guild = (state=initialRepositoryState, action) => {
	if(action.type === actions.GET_GUILD_DETAILS_SUCCESS){
		return Object.assign({}, state, {guildDetails: action.guildDetails, guildDetailsLoading: false});
	}
	else if(action.type === actions.GET_GUILD_DETAILS_FAILURE){
		return Object.assign({}, state, {guildDetailsFailureMessage: action.error});
	}
	else if(action.type === actions.GET_GUILD_UPGRADES_SUCCESS){
		return Object.assign({}, state, {guildUpgrades: action.upgrades, guildCompletedUpgrades: action.completedUpgrades || "None completed", guildUpgradesLoading: false});
	}
	else if(action.type === actions.GET_GUILD_UPGRADES_FAILURE){
		return Object.assign({}, state, {guildUpgradesFailureMessage: action.error});
	}
	else if(action.type === actions.SET_GUILDS){
		return Object.assign({}, state, {activeUserGuilds: action.guilds});
	}
	return state;
};

export default guild;