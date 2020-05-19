import * as PropTypes from "prop-types";
import React from "react";
import {Link, withRouter} from "react-router-dom";

function ListItem({author, onClick, question}) {
  return <li>
    {author.name} Asked:
    <ul>
      <li>{question.optionOne.text}</li>
      <li>{question.optionTwo.text}</li>
    </ul>
    <Link to={`/questions/${question.id}`} onClick={onClick}>View</Link>
  </li>;
}

ListItem.propTypes = {
  author: PropTypes.any,
  question: PropTypes.any,
  onClick: PropTypes.func
};

export default withRouter(ListItem)