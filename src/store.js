import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from 'redux-thunk';
import {authentication} from "./authentication/reducers";
import {users} from "./users/reducers";
import {questions} from "./questions/reducers";

export const store = createStore(combineReducers({users, questions, authentication}), applyMiddleware(thunk))