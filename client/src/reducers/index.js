import { combineReducers } from 'redux';
import userAPI from './user-api';
import userDatabase from './user-database';
//import * as actions from '../actions/index';

const rootReducer = combineReducers({
  guildAPI,
  guildDatabase,
  taskOperations,
  pageIndexing
});

export default rootReducer