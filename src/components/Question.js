import * as PropTypes from "prop-types";
import React from "react";

export function Question(props) {
  return <>
    <div>
      {props.author.name} Asked
    </div>
    <ul>
      <li>{props.activeQuestion.optionOne.text}</li>
      <li>{props.activeQuestion.optionTwo.text}</li>
    </ul>
  </>;
}

Question.propTypes = {
  author: PropTypes.any,
  activeQuestion: PropTypes.any
};