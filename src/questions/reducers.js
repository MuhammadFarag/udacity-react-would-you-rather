import {ADD_QUESTION, ANSWER_QUESTION, RECEIVE_QUESTIONS_DATA} from "./actions";

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
    case ADD_QUESTION:
      const {question} = action
      state[question.id] = question
      return state
    default:
      return state
  }
}