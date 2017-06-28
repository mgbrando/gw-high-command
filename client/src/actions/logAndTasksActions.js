//import 'whatwg-fetch';
import 'isomorphic-fetch';

export const REMOVE_TASK_SUCCESS = 'REMOVE_TASK_SUCCESS';
export const removeTaskSuccess = tasks => ({
  type: REMOVE_TASK_SUCCESS,
  tasks
});

export const REMOVE_TASK_FAILURE = 'REMOVE_TASK_FAILURE';
export const removeTaskFailure = error => ({
  type: REMOVE_TASK_FAILURE,
  error
});

export const removeTask = (guildID, taskID) => {
  return dispatch => {
    fetch('/api/guilds/'+guildID+'/tasks/'+taskID, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(tasks => {
          return dispatch(removeTaskSuccess(tasks));
        })
        .catch(error => dispatch(removeTaskFailure(error)));
  }
}

export const deleteTasks = (guildID) => {
  return dispatch => {
    fetch('/api/guilds/'+guildID+'/tasks/bulk-delete', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(tasks => {
          //const message = (tasks.length !== 1) ? "Removed "+tasks.length+" tasks from task list" : "Removed 1 task from task list"; 
          return dispatch(removeTaskSuccess(tasks));
        })
        .catch(error => dispatch(removeTaskFailure(error)));
  }
}

export const ADD_TASK_SUCCESS = 'ADD_TASK_SUCCESS';
export const addTaskSuccess = tasks => ({
  type: ADD_TASK_SUCCESS,
  tasks
});

export const ADD_TASK_FAILURE = 'ADD_TASK_FAILURE';
export const addTaskFailure = error => ({
  type: ADD_TASK_FAILURE,
  error
});

export const addTask = (guildID, description, importance) => {
  return dispatch => {
    fetch('/api/guilds/'+guildID+'/tasks', {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            description,
            importance
          })
        })
        .then(response => response.json())
        .then(tasks => dispatch(addTaskSuccess(tasks)))
        .catch(error => dispatch(addTaskFailure(error)));
  }
}

export const GET_TASKS_SUCCESS = 'GET_TASKS_SUCCESS';
export const getTasksSuccess = tasks => ({
  type: GET_TASKS_SUCCESS,
  tasks
});

export const GET_TASKS_FAILURE = 'GET_TASKS_FAILURE';
export const getTasksFailure = error => ({
  type: GET_TASKS_FAILURE,
  error
});

export const getTasks = (guildID) => {
  return dispatch => {
    fetch('/api/guilds/'+guildID+'/tasks')
    .then(response => response.json())
    .then(tasks => dispatch(getTasksSuccess(tasks)))
    .catch(error => dispatch(getTasksFailure));
  }
}

export const GET_NEW_LOG_ENTRIES_SUCCESS = 'GET_NEW_LOG_ENTRIES_SUCCESS';
export const getNewLogEntriesSuccess = logEntries => ({
  type: GET_NEW_LOG_ENTRIES_SUCCESS,
  logEntries
});

export const GET_NEW_LOG_ENTRIES_FAILURE = 'GET_LOG_ENTRIES_FAILURE';
export const getNewLogEntriesFailure = error => ({
  type: GET_LOG_ENTRIES_FAILURE,
  error
}); 

export const getNewLogEntries = (guildID, access_token, eventID) => {
  return dispatch => {
    fetch('https://api.guildwars2.com/v2/guild/'+guildID+'/log?since='+eventID+'&&access_token='+access_token)
    .then(response => response.json())
    .then(logEntries => {
      let promises = [];
      logEntries = logEntries.map((logEntry) => {
        if(logEntry.hasOwnProperty('item_id')){
          promises.push(fetch('https://api.guildwars2.com/v2/items/'+logEntry.item_id)
            .then(item => {
              return Object.assign(logEntry, {item_name: item.name});
            }));
        }
        else if(logEntry.hasOwnProperty('upgrade_id')){
          promises.push(fetch()
            .then(upgrade => {
              return Object.assign(upgrade, {upgrade_name: upgrade.name});
            }));
        }
        else
          return logEntry;
      });
      Promise.all(promises)
        .then(() => dispatch(getNewLogEntriesSuccess(logEntries)));
    })
    .catch(error => dispatch(getNewLogEntriesFailure(error)));
  } 
}
//Teams
export const GET_LOG_ENTRIES_SUCCESS = 'GET_LOG_ENTRIES_SUCCESS';
export const getLogEntriesSuccess = logEntries => ({
	type: GET_LOG_ENTRIES_SUCCESS,
	logEntries
});

export const GET_LOG_ENTRIES_FAILURE = 'GET_LOG_ENTRIES_FAILURE';
export const getLogEntriesFailure = error => ({
	type: GET_LOG_ENTRIES_FAILURE,
	error
});
const compareLogEntries = (logEntryA, logEntryB) => {
  if(logEntryA > logEntryB)
    return -1;
  else if(logEntryA < logEntryB)
    return 1;
  else
    return 0;
};
export const getLogEntries = (guildID, access_token, logEntries) => {
  return dispatch => {
    let endpoint;
    if(logEntries.length > 0){
      endpoint = 'https://api.guildwars2.com/v2/guild/'+guildID+'/log?since='+logEntries[0].id+'&access_token='+access_token;
    }
    else{

      endpoint = 'https://api.guildwars2.com/v2/guild/'+guildID+'/log?access_token='+access_token;
    }

    fetch(endpoint)
    .then(response => response.json())
    .then(logEntries => {
      let promises = [];
      logEntries = logEntries.map((logEntry) => {
        if(logEntry.hasOwnProperty('item_id')){
          promises.push(fetch('https://api.guildwars2.com/v2/items/'+logEntry.item_id)
            .then(item => {
              return Object.assign(logEntry, {item_name: item.name});
            }));
        }
        else if(logEntry.hasOwnProperty('upgrade_id')){
          promises.push(fetch()
            .then(upgrade => {
              return Object.assign(upgrade, {upgrade_name: upgrade.name});
            }));
        }
        else
          return logEntry;
      });
      Promise.all(promises)
        .then(() => { 
          return dispatch(getLogEntriesSuccess(logEntries));
          //setInterval(dispatch(getNewLogEntries(guildID, access_token, logEntries[0].id)));
        });
    })
    .catch(error => dispatch(getLogEntriesFailure(error)));
  } 
};