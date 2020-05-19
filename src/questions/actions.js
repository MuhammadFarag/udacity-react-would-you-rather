import {_getQuestions, _saveQuestionAnswer} from "../_DATA";

export const ANSWER_QUESTION = 'ANSWER_QUESTION'
export const ADD_QUESTION = 'ADD_QUESTION'
export const RECEIVE_QUESTIONS_DATA = 'RECEIVE_QUESTIONS_DATA';

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

export function addQuestion(question, author) {
  return {
    type: ADD_QUESTION,
    question,
    author
  }

}

export function handleLoadQuestions() {
  return (dispatch) => {
    _getQuestions().then((questions) => {
      dispatch(receiveQuestionsAction(questions))
    })
  }
}

export function handleAnswerQuestion(event) {
  return (dispatch) => {
    _saveQuestionAnswer(event).then(() => {
      dispatch(answerQuestion(event))
    }).catch(() => alert("There was an error, please try again later"))
  }
}