//import 'whatwg-fetch';
import 'isomorphic-fetch';

export const SET_GUILD_LOADING_STATES = 'SET_GUILD_LOADING_STATES';
export const setGuildLoadingStates = () => ({
    type: SET_GUILD_LOADING_STATES
});

export const SET_GUILDS = 'SET_GUILDS';
export const setGuilds = guilds => ({
    type: SET_GUILDS,
    guilds
});

export const REFRESH_GUILD = 'REFRESH_GUILD';
export const refreshGuild = () => ({
  type: REFRESH_GUILD
});

export const RESET_GUILD_REFRESH = 'RESET_GUILD_REFRESH';
export const resetGuildRefresh = () => ({
    type: RESET_GUILD_REFRESH
});

export const SET_GUILD_COINS_SUCCESS = 'SET_GUILD_COINS_SUCCESS';
export const setGuildCoinsSuccess = coins => ({
    type: SET_GUILD_COINS_SUCCESS,
    coins
});

export const SET_GUILD_COINS_FAILURE = 'SET_GUILD_COINS_FAILURE';
export const setGuildCoinsFailure = error => ({
    type: SET_GUILD_COINS_FAILURE,
    error
});

export const getGuildCoins = (guildID, access_token) => {
   /* let accountInfo;
    let guildDetails;
    let guildUpgrades;*/
    return dispatch => {
        fetch('https://api.guildwars2.com/v2/guild/'+guildID+'/stash?access_token='+access_token)
        .then(response => response.json())
        .then(guildStashes => {
            if(guildStashes.length === 0){
                return dispatch(setGuildCoinsSuccess({}));
            }
            else{
                let totalCoins = 0;
                guildStashes.foreach(stash => {
                    totalCoins += stash.coins;
                });
                //let coins = props.coins;
                const gold = Math.floor(totalCoins/10000);
                totalCoins -= gold*10000;
                const silver = Math.floor(totalCoins/100);
                totalCoins -= silver*100;
                const copper = totalCoins;

                return dispatch(setGuildCoinsSuccess({gold: gold, silver: silver, copper: copper}));
            }
        })
        .catch(error => dispatch(setGuildCoinsFailure(error.text)));
    };
};
//Guild Details
export const GET_GUILD_DETAILS_SUCCESS = 'GET_GUILD_DETAILS_SUCCESS';
export const getGuildDetailsSuccess = guildDetails => ({
	type: GET_GUILD_DETAILS_SUCCESS,
	guildDetails
});

export const GET_GUILD_DETAILS_FAILURE = 'GET_GUILD_DETAILS_FAILURE';
export const getGuildDetailsFailure = error => ({
	type: GET_GUILD_DETAILS_FAILURE,
	error
});

export const getGuildDetails = (guildID, access_token) => {
  return dispatch => {
    fetch('https://api.guildwars2.com/v2/guild/'+guildID+'?access_token='+access_token)
    .then(response => response.json())
    .then(guildDetails => dispatch(getGuildDetailsSuccess(
        Object.assign({}, guildDetails, {level: guildDetails.level || "N/A", favor: guildDetails.favor || "N/A", aetherium: guildDetails.aetherium || "N/A", influence: guildDetails.influence || "N/A"})
        )))
    .catch(error => dispatch(getGuildDetailsFailure(error.text)))
  }	
};

//Guild Upgrades - NEED HELP
export const GET_GUILD_UPGRADES_SUCCESS = 'GET_GUILD_UPGRADES_SUCCESS';
export const getGuildUpgradesSuccess = (incompleteUpgrades, completedUpgrades) => ({
	type: GET_GUILD_UPGRADES_SUCCESS,
	incompleteUpgrades,
	completedUpgrades
});

export const GET_GUILD_UPGRADES_FAILURE = 'GET_GUILD_UPGRADES_FAILURE';
export const getGuildUpgradesFailure = (error) => ({
	type: GET_GUILD_UPGRADES_FAILURE,
	error
});

export const getGuildUpgrades = (guildID, access_token) => {
  return dispatch => {
  	const upgradesPromise = fetch('https://api.guildwars2.com/v2/guild/upgrades')
                            .then(response => response.json())
                            .then(upgradesArray => {
                                console.log(upgradesArray.join());
                                const upgradePromises = [];
                                let i,j,temparray,chunk = 200;
                                for (i=0,j=upgradesArray.length; i<j; i+=chunk) {
                                    temparray = upgradesArray.slice(i,i+chunk);
                                    upgradePromises.push(fetch('https://api.guildwars2.com/v2/guild/upgrades?ids='+temparray.join())
                                    .then(response => response.json()));
                                }
                                return Promise.all(upgradePromises)
                                .then(promiseArray => {
                                    let upgrades = [];
                                    for(let i=0; i < promiseArray.length; i++){
                                        upgrades = [...upgrades, ...promiseArray[i]];
                                    }
                                    return upgrades;
                                });
                            });

    const guildUpgradesPromise = fetch('https://api.guildwars2.com/v2/guild/'+guildID+'/upgrades?access_token='+access_token)
                                 .then(response => response.json())
                                 .then(upgradesArray => {
                                    return fetch('https://api.guildwars2.com/v2/guild/upgrades?ids='+upgradesArray.join())
                                    .then(response => response.json());
                                 });

    Promise.all([upgradesPromise, guildUpgradesPromise])
    .then(promiseArray => {
    	const [upgrades, completedUpgrades] = promiseArray;
        const incompleteUpgrades = upgrades.filter(upgrade => {
            const completed = false;
            for(let i = 0; i < completedUpgrades.length; i++){
                if(upgrade.id === completedUpgrades[i].id)
                    return completed;
            }
            return !completed;
        });

    	return dispatch(getGuildUpgradesSuccess(incompleteUpgrades, completedUpgrades));
    })
    .catch(error => dispatch(getGuildUpgradesFailure(error.text)));
  }	
};

export const getGuildInfo = (guildID, access_token) => {
    return dispatch => {
        let promises = [];
        promises.push(dispatch(getGuildDetails(guildID, access_token)));
        promises.push(dispatch(getGuildCoins(guildID, access_token)));
        promises.push(dispatch(getGuildUpgrades(guildID, access_token)));
        Promise.all(promises)
        .then(() => {
            return dispatch(resetGuildRefresh());
        });
    };
};