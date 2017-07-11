import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import Cookies from 'js-cookie';
import { createCookieMiddleware } from 'redux-cookie';
import rootReducer from './reducers/index';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, createCookieMiddleware(Cookies))));

export default store;