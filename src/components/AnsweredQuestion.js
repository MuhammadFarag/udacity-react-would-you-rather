import * as PropTypes from "prop-types";
import React from "react";

export function AnsweredQuestion({activeUser, id, questions}) {
  const activeQuestion = questions[id]

  const activeUserAnsweredOptionOne = activeQuestion.optionOne.votes.includes(activeUser.id)
  const activeUserAnsweredOptionTwo = activeQuestion.optionTwo.votes.includes(activeUser.id)

  const numberOfOptionOneAnswers = activeQuestion.optionOne.votes.length
  const numberOfOptionTwoAnswers = activeQuestion.optionTwo.votes.length
  const numberOfOptions = numberOfOptionOneAnswers + numberOfOptionTwoAnswers
  const percentageOfOptionOneAnswers = (numberOfOptionOneAnswers / numberOfOptions) * 100
  const percentageOfOptionTwoAnswers = (numberOfOptionTwoAnswers / numberOfOptions) * 100

  return <>
    <div>
      {activeQuestion.author.name} Asked
    </div>
    <ul>
      <li>{activeQuestion.optionOne.text} {percentageOfOptionOneAnswers}% {activeUserAnsweredOptionOne ? "*" : null}</li>
      <li>{activeQuestion.optionTwo.text} {percentageOfOptionTwoAnswers}% {activeUserAnsweredOptionTwo ? "*" : null}</li>
    </ul>
  </>;
}

AnsweredQuestion.propTypes = {
  author: PropTypes.any,
  activeUser: PropTypes.any,
  activeQuestion: PropTypes.any
};