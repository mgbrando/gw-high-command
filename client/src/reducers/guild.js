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
    guildUpgradesLoading: true,
    guildCoinsLoading: true,
    coins: {},
    refreshGuild: false
};

const guild = (state=initialRepositoryState, action) => {
	if(action.type === actions.GET_GUILD_DETAILS_SUCCESS){
		return Object.assign({}, state, {guildDetails: action.guildDetails, guildDetailsLoading: false});
	}
	else if(action.type === actions.GET_GUILD_DETAILS_FAILURE){
		return Object.assign({}, state, {guildDetailsFailureMessage: action.error});
	}
	else if(action.type === actions.GET_GUILD_UPGRADES_SUCCESS){
		return Object.assign({}, state, {guildUpgrades: action.incompleteUpgrades || "None incomplete", guildCompletedUpgrades: action.completedUpgrades || "None completed", guildUpgradesLoading: false});
	}
	else if(action.type === actions.GET_GUILD_UPGRADES_FAILURE){
		return Object.assign({}, state, {guildUpgradesFailureMessage: action.error});
	}
	else if(action.type === actions.SET_GUILDS){
		return Object.assign({}, state, {activeUserGuilds: action.guilds});
	}
	else if(action.type === actions.SET_GUILD_COINS_SUCCESS){
		return Object.assign({}, state, {coins: action.coins, guildCoinsLoading: false});
	}
	else if(action.type === actions.SET_GUILD_LOADING_STATES){
		return Object.assign({}, state, {guildDetailsLoading: true, guildUpgradesLoading: true, guildCoinsLoading: true});
	}
	else if(action.type === actions.REFRESH_GUILD){
		return Object.assign({}, state, {guildDetailsLoading: true, guildUpgradesLoading: true, guildCoinsLoading: true, refreshGuild: true});
	}
	else if(action.type === actions.RESET_GUILD_REFRESH){
		return Object.assign({}, state, {refreshGuild: false});
	}
	
	return state;
};

export default guild;