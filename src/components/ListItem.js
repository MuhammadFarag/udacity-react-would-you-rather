import * as PropTypes from "prop-types";
import React from "react";

export function ListItem({author, onClick, question}) {
  return <li>
    {author.name} Asked:
    <ul>
      <li>{question.optionOne.text}</li>
      <li>{question.optionTwo.text}</li>
    </ul>
    <button onClick={onClick}>View
    </button>
  </li>;
}

ListItem.propTypes = {
  author: PropTypes.any,
  question: PropTypes.any,
  onClick: PropTypes.func
};