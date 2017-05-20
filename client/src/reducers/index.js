import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';
import guild from './guild';
import registrationAndLogin from './registrationAndLogin';
import leaderRegistrationAndLogin from './leaderRegistrationAndLogin';
import activities from './activities';
import navigation from './navigation';
import members from './members';
import teams from './teams';
//import * as actions from '../actions/index';

const rootReducer = combineReducers({
  guild,
  registrationAndLogin,
  leaderRegistrationAndLogin,
  activities,
  navigation,
  teams,
  members,
  router: routerReducer
});

export default rootReducer;