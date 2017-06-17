//import 'whatwg-fetch';
import 'isomorphic-fetch';

export const getGuildMembers = (guildID, access_token) => {
  return dispatch => {
    let registeredMembers;
    let unregisteredMembers;
    const registeredMembersPromise = fetch('/api/guilds/'+guildID+'/members')
                                      .then(response => response.json());
    const unregisteredMembersPromise = fetch('https://api.guildwars2.com/v2/guild/'+guildID+'/members?access_token='+access_token)
                                       .then(response => response.json()); 

          Promise.all([registeredMembersPromise, unregisteredMembersPromise])
          .then(members => {
              let registeredMembers = []; //members[0].map(member => Object.assign({}, member));
              let unregisteredMembers = members[1].map(member => Object.assign({}, member));

              for(let i=0; i < members[0].length; i++){
                unregisteredMembers = unregisteredMembers.filter(member => {
                  if(member.name === members[0][i].handleName){
                    member.apiKey = members[0][i].apiKey;
                    registeredMembers.push(member);
                    return false;
                  }

                  /*registeredMembers = registeredMembers.filter(member => {
                    return member.handleName !== members[0][i].handleName;
                  });*/

                  return true;
                });
              }
              if(members[0].length !== registeredMembers.length){
                fetch('/api/guilds/'+guildID,
                {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    members: registeredMembers
                  })
                })
                .then(response => {
                  if(response.status === 204)
                    return dispatch(getGuildMembersSuccess(registeredMembers, unregisteredMembers));
                  else
                    throw Error(response.message);
                })
              }
              else{
                return dispatch(getGuildMembersSuccess(registeredMembers, unregisteredMembers));
              }
          })
          .catch(error => dispatch(getGuildMembersFailure(error.message)))                             
    /*.then(_registeredMembers => {
      //registeredMembers=_registeredMembers;
      fetch('https://api.guildwars2.com/v2/guild/'+guildID+'/members')
      .then(guildMembers => {
        unregisteredMembers = guildMembers.map(member => Object.assign({}, member));
        let registeredGuildMembers = registeredMembers.map(member => Object.assign({}, member));
        let registeredMembersToRemove = [];

        for(let i=0; i < registeredGuildMembers.length; i++){
          unregisteredMembers = unregisteredMembers.filter(member => {
            if(member.name === registeredGuildMembers[i].handleName){
              return false;
            }
            registeredMembers = registeredMembers.filter(member => {
              return member.handleName !== registeredGuildMembers[i].handleName;
            });

            return true;
          });
        }

        dispatch(getRegisteredMembersSuccess(registeredMembers)))
      })
    })*/
    //.catch(error => dispatch(getRegisteredMembersFailure(error)))   
  }
}

export const selectMember = (apiKey, registeredMembers) => {
  return dispatch => {
    let promises = [];
    promises.push(fetch('https://api.guildwars2.com/v2/account?access_token='+apiKey)
                        .then(response => response.json())
                        .then(accountInfo => {
                          const currentMember = registeredMembers.filter(member => {
                            return member.handleName === accountInfo.name;
                          });   
                          let date = new Date(currentMember.joined);
                          const joinDate = (date.getMonth()+1)+'/'+date.getDate()+'/'+date.getFullYear();
                          return dispatch(setSelectedAccountInfo(accountInfo, joinDate));
                        }));

    promises.push(fetch('https://api.guildwars2.com/v2/characters?access_token='+apiKey)
                           .then(response => response.json())
                           .then(characterNames => {
                              let promises = [];
                              characterNames.forEach(name => {
                                promises.push(fetch('https://api.guildwars2.com/v2/characters/'+encodeURIComponent(name)+'?access_token='+apiKey)
                                              .then(response => response.json()));
                              });
                              Promise.all(promises)
                              .then(characters => {
                                /*console.log(characters);
                                return characters;*/
                                return dispatch(setSelectedCharacters(characters));
                                //return characters;
                              });
                           }));
                           //console.log(characters);

    promises.push(fetch('https://api.guildwars2.com/v2/pvp/stats?access_token='+apiKey)
                     .then(response => response.json())
                     .then(pvpStats => {
                        return dispatch(setSelectedPVPStats(pvpStats));
                     }));

    promises.push(fetch('https://api.guildwars2.com/v2/pvp/standings?access_token='+apiKey)
                     .then(response => response.json())
                     .then(pvpStandings => {
                        return dispatch(setSelectedPVPStandings(pvpStandings));
                     }));

    promises.push(fetch('https://api.guildwars2.com/v2/raids?access_token='+apiKey)
                     .then(response => response.json())
                     .then(raids => {
                        return dispatch(setSelectedRaids(raids));
                     }));

    /*const currentMember = registeredMembers.filter(member => {
      return member.handleName === values[0].name;
    });*/  
    Promise.all(promises)
    .then(() => {
      return dispatch(setSelectedMember(true));
    })
  }
}

export const SET_SELECTED_MEMBER_SUCCESS = 'SET_SELECTED_MEMBER_SUCCESS';
export const setSelectedMember = selectedMember => ({
  type: SET_SELECTED_MEMBER_SUCCESS,
  selectedMember
});

export const SET_SELECTED_CHARACTERS_SUCCESS = 'SET_SELECTED_CHARACTERS_SUCCESS';
export const setSelectedCharacters = characters => ({
  type: SET_SELECTED_CHARACTERS_SUCCESS,
  characters
});

export const SET_SELECTED_PVP_STATS_SUCCESS = 'SET_SELECTED_PVP_STATS_SUCCESS';
export const setSelectedPVPStats = pvpStats => ({
  type: SET_SELECTED_CHARACTERS_SUCCESS,
  pvpStats
});

export const SET_SELECTED_PVP_STANDINGS_SUCCESS = 'SET_SELECTED_PVP_STANDINGS_SUCCESS';
export const setSelectedPVPStandings = pvpStandings => ({
  type: SET_SELECTED_PVP_STANDINGS_SUCCESS,
  pvpStandings
});

export const SET_SELECTED_RAIDS_SUCCESS = 'SET_SELECTED_RAIDS_SUCCESS';
export const setSelectedRaids = raids => ({
  type: SET_SELECTED_RAIDS_SUCCESS,
  raids
});

export const SET_SELECTED_ACCOUNT_INFO_SUCCESS = 'SET_SELECTED_ACCOUNT_INFO_SUCCESS';
export const setSelectedAccountInfo = (accountInfo, joined) => ({
  type: SET_SELECTED_ACCOUNT_INFO_SUCCESS,
  accountInfo,
  joined
});

//Registered Members
export const GET_GUILD_MEMBERS_SUCCESS = 'GET_GUILD_MEMBERS_SUCCESS';
export const getGuildMembersSuccess = (registeredMembers, unregisteredMembers) => ({
	type: GET_GUILD_MEMBERS_SUCCESS,
	registeredMembers,
  unregisteredMembers
});

export const GET_GUILD_MEMBERS_FAILURE = 'GET_GUILD_MEMBERS_FAILURE';
export const getGuildMembersFailure = errorMessage => ({
	type: GET_GUILD_MEMBERS_FAILURE,
	errorMessage
});

/*export const getRegisteredMembers = guildID => {
  return dispatch => {
    fetch('http://localhost:8080/guilds/${guildID}/members')
    .then(response => response.json())
    .then(registeredMembers => dispatch(getRegisteredMembersSuccess(registeredMembers)))
    .catch(error => dispatch(getRegisteredMembersFailure(error)))
  }	
};*/

//Registered Member Details
export const GET_REGISTERED_MEMBER_DETAILS_SUCCESS = 'GET_REGISTERED_MEMBER_DETAILS_SUCCESS';
export const getRegisteredMemberDetailsSuccess = memberDetails => ({
	type: GET_REGISTERED_MEMBER_DETAILS_SUCCESS,
	memberDetails
});

export const GET_REGISTERED_MEMBER_DETAILS_FAILURE = 'GET_REGISTERED_MEMBER_DETAILS_FAILURE';
export const getRegisteredMemberDetailsFailure = error => ({
	type: GET_REGISTERED_MEMBER_DETAILS_FAILURE,
	error
});

export const getRegisteredMemberDetails = memberApiKey => {
  return dispatch => {
    fetch('https://api.guildwars2.com/v2/account?access_token=${memberApiKey}')
    .then(response => response.json())
    .then(memberDetails => dispatch(getRegisteredMemberDetailsSuccess(memberDetails)))
    .catch(error => dispatch(getRegisteredMemberDetailsFailure(error)));
  }	
};

//Member PVP Stats
export const GET_MEMBER_PVP_STATS_SUCCESS = 'GET_MEMBER_PVP_STATS_SUCCESS';
export const getMemberPVPStatsSuccess = (pvpStats, pvpStandings) => ({
	type: GET_MEMBER_PVP_STATS_SUCCESS,
	pvpStats,
	pvpStandings
});

export const GET_MEMBER_PVP_STATS_FAILURE = 'GET_MEMBER_PVP_STATS_FAILURE';
export const getMemberPVPStatsFailure = (error) => ({
	type: GET_MEMBER_PVP_STATS_FAILURE,
	error
});

/*export const GET_MEMBER_PVP_STANDINGS_SUCCESS = 'GET_MEMBER_PVP_STANDINGS_SUCCESS';
export const getMemberPVPStandingsSuccess = pvpStandings => ({
	type: GET_MEMBER_PVP_STANDINGS_SUCCESS,
	pvpStandings
});

export const GET_MEMBER_PVP_STANDINGS_FAILURE = 'GET_MEMBER_PVP_STANDINGS_FAILURE';
export const getMemberPVPStandingsFailure = (error) => ({
	type: GET_MEMBER_PVP_STANDINGS_FAILURE,
	error
});*/

export const getMemberPVPStats = access_token => {
  return dispatch => {
  	const pvpStatsPromise = fetch('https://api.guildwars2.com/v2/pvp/stats?access_token=${access_token}');
    /*.then(response => response.json())
    .then(pvpStats => dispatch(getMemberPVPStatsSuccess(pvpStats)))
    .catch(error => dispatch(getMemberPvPStatsFailure(error)));*/

    const pvpStandingsPromise = fetch('https://api.guildwars2.com/v2/pvp/standings?access_token=${access_token}');
    /*.then(response => response.json())
    .then(pvpStandings => dispatch(getMemberPVPStandingsSuccess(pvpStandings)))
    .catch(error => dispatch(getMemberPvPStandingsFailure(error)));*/

    Promise.all([pvpStatsPromise, pvpStandingsPromise])
    .then(promiseArray => {
    	const [pvpStats, pvpStandings] = promiseArray;
    	return dispatch(getMemberPVPStatsSuccess(pvpStats, pvpStandings));
    })
    .catch(error => dispatch(getMemberPVPStatsFailure(error)));
  }	
};

//Member PVE Stats
export const GET_MEMBER_PVE_STATS_SUCCESS = 'GET_MEMBER_PVE_STATS_SUCCESS';
export const getMemberPVEStatsSuccess = pveStats => ({
	type: GET_MEMBER_PVE_STATS_SUCCESS,
	pveStats
});

export const GET_MEMBER_PVE_STATS_FAILURE = 'GET_MEMBER_PVE_STATS_FAILURE';
export const getMemberPVEStatsFailure = (error) => ({
	type: GET_MEMBER_PVE_STATS_FAILURE,
	error
});

export const getMemberPVEStats = access_token => {
  return dispatch => {
  	fetch('https://api.guildwars2.com/v2/account/raids?access_token=${access_token}')
    .then(response => response.json())
    .then(pveStats => dispatch(getMemberPVEStatsSuccess(pveStats)))
    .catch(error => dispatch(getMemberPVEStatsFailure(error)));
  }	
};