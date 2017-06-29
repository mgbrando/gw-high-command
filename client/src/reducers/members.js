import * as actions from '../actions/membersActions';

const initialRepositoryState = {
	guildMembers: [],
	registeredMembers: [],
	unregisteredMembers: [],
	selectedMember: null,
  memberDetailsLoading: true,
  memberPVPStatsLoading: true,
  memberPVEStatsLoading: true,
  memberDetails: {},
  memberGuildNames: '',
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
	/*else if(action.type === actions.SET_SELECTED_MEMBER_SUCCESS){
		return Object.assign({}, state, {accountInfo: action.accountInfo, joined: action.joined, characters: action.characters, pvpStats: action.pvpStats, pvpStandings: action.pvpStandings, raids: action.raids, selectedMember: true});
	}*/
  else if(action.type === actions.SET_SELECTED_MEMBER_SUCCESS){
    return Object.assign({}, state, {selectedMember: action.selectedMember, memberDetailsLoading: false, memberPVPStatsLoading: false, memberPVEStatsLoading: false});
  }
  else if(action.type === actions.SET_SELECTED_CHARACTERS_SUCCESS){
    return Object.assign({}, state, {characters: action.characters});
  }
  else if(action.type === actions.SET_SELECTED_PVP_STATS_SUCCESS){
    return Object.assign({}, state, {pvpStats: action.pvpStats});
  }
  else if(action.type === actions.SET_SELECTED_PVP_STANDINGS_SUCCESS){
    return Object.assign({}, state, {pvpStandings: action.pvpStandings});
  }
  else if(action.type === actions.SET_SELECTED_RAIDS_SUCCESS){
    return Object.assign({}, state, {raids: action.raids});
  }
  else if(action.type === actions.SET_SELECTED_ACCOUNT_INFO_SUCCESS){
    return Object.assign({}, state, {accountInfo: action.accountInfo, joined: action.joined, memberGuildNames: action.memberGuildNames});
  }
  else if(action.type === actions.DESELECT_MEMBER){
    return Object.assign({}, state, {selectedMember: false, memberDetailsLoading: true, memberPVPStatsLoading: true, memberPVEStatsLoading: true});
  }
	return state;
};

export default members;