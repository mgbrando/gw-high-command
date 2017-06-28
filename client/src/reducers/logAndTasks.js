import * as actions from '../actions/logAndTasksActions';

const initialRepositoryState = {
	log: [],
	tasks: [],
	logLoading: true,
	tasksLoading: true,
	logHasBeenFetched: true,
	addTaskSuccessMessage: "",
	removeTaskSuccessMessage: "",
	snackBarMessage: "",
	logAndTasksMounted: false,
	logMounted: false
};

const logAndTasks = (state=initialRepositoryState, action) => {
	if(action.type === actions.GET_LOG_ENTRIES_SUCCESS){
		return Object.assign({}, state, {log: [...action.logEntries, ...state.log], logLoading: false, logHasBeenFetched: true, logMounted: true});
	}
	else if(action.type === actions.GET_NEW_LOG_ENTRIES_SUCCESS){
		return Object.assign({}, state, {log: [...action.logEntries, ...state.log]});
	}
	else if(action.type === actions.GET_TASKS_SUCCESS){
		return Object.assign({}, state, {tasks: action.tasks, logAndTasksMounted: true});
	}
	else if(action.type === actions.ADD_TASK_SUCCESS){
		return Object.assign({}, state, {tasks: action.tasks});
	}
	else if(action.type === actions.REMOVE_TASK_SUCCESS){
		return Object.assign({}, state, {tasks: action.tasks});
	}
	return state;
};

export default logAndTasks;