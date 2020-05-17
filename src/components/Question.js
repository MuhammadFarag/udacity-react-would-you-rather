import * as PropTypes from "prop-types";
import React from "react";
import {AnsweredQuestion} from "./AnsweredQuestion";
import {UnansweredQuestion} from "./UnansweredQuestion";

export function Question({activeQuestion, author, activeUser}) {
  const activeUserAnsweredOptionOne = activeQuestion.optionOne.votes.includes(activeUser.id)
  const activeUserAnsweredOptionTwo = activeQuestion.optionTwo.votes.includes(activeUser.id)

  if (activeUserAnsweredOptionOne || activeUserAnsweredOptionTwo) {
    return <AnsweredQuestion author={author} activeQuestion ={activeQuestion} activeUser={activeUser}/>;
  }
  return <UnansweredQuestion author={author} activeQuestion ={activeQuestion} activeUser={activeUser}/>;
}

Question.propTypes = {
  author: PropTypes.any,
  activeUser: PropTypes.any,
  activeQuestion: PropTypes.any
};