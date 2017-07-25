import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';
import guild from './guild';
import registrationAndLogin from './registrationAndLogin';
import navigation from './navigation';
import members from './members';
import teams from './teams';
import logAndTasks from './logAndTasks';

const rootReducer = combineReducers({
  guild,
  registrationAndLogin,
  navigation,
  teams,
  members,
  logAndTasks,
  router: routerReducer
});

export default rootReducer;