import * as PropTypes from "prop-types";
import React from "react";
import {AnsweredQuestion} from "./AnsweredQuestion";

export function Question({activeQuestion, author, activeUser}) {
  const activeUserAnsweredOptionOne = activeQuestion.optionOne.votes.includes(activeUser.id)
  const activeUserAnsweredOptionTwo = activeQuestion.optionTwo.votes.includes(activeUser.id)

  if (activeUserAnsweredOptionOne || activeUserAnsweredOptionTwo) {
    return <AnsweredQuestion author={author} activeQuestion ={activeQuestion} activeUser={activeUser}/>;
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