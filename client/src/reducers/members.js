import * as actions from '../actions/membersActions';

const initialRepositoryState = {
	guildMembers: [],
	selectedMember: {},
    memberDetails: {},
    memberPVPStats: {},
    memberPVEStats: {},
    displayMemberDetails: true,
    displayMemberPVPStats: true,
    displayMemberPVEStats: true
};

const members = (state=initialRepositoryState, action) => {

	return state;
};

export default members;