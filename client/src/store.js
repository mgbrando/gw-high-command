import {createStore, combineReducers, applyMiddleware} from 'redux';
//import { browserHistory } from 'react-router';
import createHistory from 'history/createBrowserHistory'
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';
import {routerMiddleware} from 'react-router-redux';

//export const history = browserHistory;
export const history = createHistory();
console.log('store.js: '+history);
const middleWare=[routerMiddleware(history), thunk];
const store = createStore(rootReducer, applyMiddleware(...middleWare));
export default store;