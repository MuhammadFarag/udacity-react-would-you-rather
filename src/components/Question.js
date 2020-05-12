import * as PropTypes from "prop-types";
import React from "react";

export function Question({activeQuestion, author, activeUser}) {
  const answerd1 = activeQuestion.optionOne.votes.includes(activeUser.id)
  const answerd2 = activeQuestion.optionTwo.votes.includes(activeUser.id)

  return <>
    <div>
      {author.name} Asked
    </div>
    <ul>
      <li>{activeQuestion.optionOne.text} {answerd1 ? "*" : null}</li>
      <li>{activeQuestion.optionTwo.text} {answerd2 ? "*" : null}</li>
    </ul>
  </>;
}

Question.propTypes = {
  author: PropTypes.any,
  activeUser: PropTypes.any,
  activeQuestion: PropTypes.any
};