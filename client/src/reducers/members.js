import * as actions from '../actions/membersActions';

const initialRepositoryState = {
	guildMembers: [],
	registeredMembers: [],
	unregisteredMembers: [],
	selectedMember: false,
    memberDetails: {},
    memberPVPStats: {},
    memberPVEStats: {},
    displayMemberDetails: true,
    displayMemberPVPStats: true,
    displayMemberPVEStats: true,
    accountInfo: {},
    joined: "",
    characters: [],
  	pvpStats: {},
  	pvpStandings: {},
  	raids: []
};

const members = (state=initialRepositoryState, action) => {
	if(action.type === actions.GET_GUILD_MEMBERS_SUCCESS){
		return Object.assign({}, state, {registeredMembers: action.registeredMembers, unregisteredMembers: action.unregisteredMembers});
	}
	else if(action.type === actions.SET_SELECTED_MEMBER_SUCCESS){
		return Object.assign({}, state, {accountInfo: action.accountInfo, joined: action.joined, characters: action.characters, pvpStats: action.pvpStats, pvpStandings: action.pvpStandings, raids: action.raids, selectedMember: true});
	}
	return state;
};

export default members;