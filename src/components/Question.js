import * as PropTypes from "prop-types";
import React from "react";

export function Question({activeQuestion, author, activeUser}) {
  const activeUserAnsweredOptionOne = activeQuestion.optionOne.votes.includes(activeUser.id)
  const activeUserAnsweredOptionTwo = activeQuestion.optionTwo.votes.includes(activeUser.id)



  if(activeUserAnsweredOptionOne || activeUserAnsweredOptionTwo){
    return <>
      <div>
        {author.name} Asked
      </div>
      <ul>
        <li>{activeQuestion.optionOne.text} {activeUserAnsweredOptionOne ? "*" : null}</li>
        <li>{activeQuestion.optionTwo.text} {activeUserAnsweredOptionTwo ? "*" : null}</li>
      </ul>
    </>;
  }
  return <>
    <div>
      {author.name} Asked
    </div>
    <ul>
      <li>{activeQuestion.optionOne.text}</li>
      <li>{activeQuestion.optionTwo.text}</li>
    </ul>
  </>;
}

Question.propTypes = {
  author: PropTypes.any,
  activeUser: PropTypes.any,
  activeQuestion: PropTypes.any
};