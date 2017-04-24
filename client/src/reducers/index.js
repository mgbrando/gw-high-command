import { combineReducers } from 'redux';
import guild from './guild';
import registrationAndLogin from './registrationAndLogin';
import activities from './activities';
import navigation from './navigation';
import members from './members';
import teams from './teams';
//import * as actions from '../actions/index';

const rootReducer = combineReducers({
  guild,
  registrationAndLogin,
  activities,
  navigation,
  teams,
  members
});

export default rootReducer;