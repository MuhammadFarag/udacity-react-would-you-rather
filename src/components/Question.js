import {useSelector} from "react-redux";
import {AnsweredQuestion} from "./AnsweredQuestion";
import UnansweredQuestion from "./UnansweredQuestion";
import React from "react";

export function Question({id}) {
  const questions = useSelector(state => state.questions)
  const activeUser = useSelector(state => state.authentication.user)
  const activeQuestion = questions[id]

  const activeUserAnsweredOptionOne = activeQuestion.optionOne.votes.includes(activeUser.id)
  const activeUserAnsweredOptionTwo = activeQuestion.optionTwo.votes.includes(activeUser.id)
  if (activeUserAnsweredOptionOne || activeUserAnsweredOptionTwo) {
    return <AnsweredQuestion id={id}/>
  }
  return <UnansweredQuestion id={id}/>
}