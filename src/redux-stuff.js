import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from 'redux-thunk';
import {_getQuestions, _getUsers, _saveQuestionAnswer} from "./_DATA";

const RECEIVE_USERS_DATA = 'RECEIVE_USERS_DATA';
const RECEIVE_QUESTIONS_DATA = 'RECEIVE_QUESTIONS_DATA';
const ANSWER_QUESTION = 'ANSWER_QUESTION'

export function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS_DATA:
      return action.users
    case ANSWER_QUESTION:
      const {authedUser, qid, answer} = action
      return {
        ...state,
        [authedUser]: {
          ...state[authedUser],
          answers: {
            ...state[authedUser].answers,
            [qid]: answer
          }
        }
      }
    default:
      return state
  }

}

export function questions(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS_DATA:
      return action.questions
    case ANSWER_QUESTION:
      const {authedUser, qid, answer} = action
      return {
        ...state,
        [qid]: {
          ...state[qid],
          [answer]: {
            ...state[qid][answer],
            votes: state[qid][answer].votes.concat([authedUser])
          }
        }
      }
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

export function answerQuestion(event) {
  return {
    type: ANSWER_QUESTION,
    ...event
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

export function handleAnswerQuestion(event, cb) {
  return (dispatch) => {
    _saveQuestionAnswer(event).then(() => {
      dispatch(answerQuestion(event))
      cb()
    }).catch(() => alert("There was an error, please try again later"))
  }
}