import {RECEIVE_USERS_DATA} from "./actions";
import {ADD_QUESTION, ANSWER_QUESTION} from "../questions/actions";

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
    case ADD_QUESTION:
      const {question, author} = action
      return {
        ...state,
        [author.id]: {
          ...state[author.id],
          questions: state[author.id].questions.concat([question.id])
        }
      }
    default:
      return state
  }

}