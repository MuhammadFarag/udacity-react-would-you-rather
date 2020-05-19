import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from 'redux-thunk';
import {_getQuestions, _getUsers} from "./_DATA";

const RECEIVE_USERS_DATA = 'RECEIVE_USERS_DATA';
const RECEIVE_QUESTIONS_DATA = 'RECEIVE_QUESTIONS_DATA';

export function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS_DATA:
      return action.users
    default:
      return state
  }

}

export function questions(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS_DATA:
      return action.questions
    default:
      return state
  }
}

export const store = createStore(combineReducers({users, questions}), applyMiddleware(thunk))

export function receiveUsersAction(users) {
  return {
    type: RECEIVE_USERS_DATA,
    users,
  }
}

export function receiveQuestionsAction(questions) {
  return {
    type: RECEIVE_QUESTIONS_DATA,
    questions,
  }
}

export function handleLoadQuestions() {
  return (dispatch) => {
    _getQuestions().then((questions) => {
      dispatch(receiveQuestionsAction(questions))
    })
  }
}

export function handleLoadUsers() {
  return (dispatch) => {
    _getUsers().then((users) => {
      dispatch(receiveUsersAction(users))
    })
  }
}