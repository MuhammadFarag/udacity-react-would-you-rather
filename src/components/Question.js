import * as PropTypes from "prop-types";
import React from "react";

export function Question({activeQuestion, author, activeUser}) {
  const activeUserAnsweredOptionOne = activeQuestion.optionOne.votes.includes(activeUser.id)
  const activeUserAnsweredOptionTwo = activeQuestion.optionTwo.votes.includes(activeUser.id)

  const numberOfOptionOneAnswers = activeQuestion.optionOne.votes.length
  const numberOfOptionTwoAnswers = activeQuestion.optionTwo.votes.length
  const numberOfOptions = numberOfOptionOneAnswers + numberOfOptionTwoAnswers
  const percentageOfOptionOneAnswers = (numberOfOptionOneAnswers / numberOfOptions) * 100
  const percentageOfOptionTwoAnswers = (numberOfOptionTwoAnswers / numberOfOptions) * 100

  if (activeUserAnsweredOptionOne || activeUserAnsweredOptionTwo) {
    return <>
      <div>
        {author.name} Asked
      </div>
      <ul>
        <li>{activeQuestion.optionOne.text} {percentageOfOptionOneAnswers}% {activeUserAnsweredOptionOne ? "*" : null}</li>
        <li>{activeQuestion.optionTwo.text} {percentageOfOptionTwoAnswers}% {activeUserAnsweredOptionTwo ? "*" : null}</li>
      </ul>
    </>;
  }
  return <>
    <div>
      {author.name} Asked
    </div>

    <form onSubmit={() => {
    }}>
      <div>
        <label>
          <input type="radio" value="optionOne"/>
          {activeQuestion.optionOne.text}
        </label>
      </div>
      <div>
        <label>
          <input type="radio" value="optionTwo"/>
          {activeQuestion.optionTwo.text}
        </label>
      </div>
      <input type="submit" value="Submit"/>
    </form>
  </>;
}

Question.propTypes = {
  author: PropTypes.any,
  activeUser: PropTypes.any,
  activeQuestion: PropTypes.any
};