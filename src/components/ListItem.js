import * as PropTypes from "prop-types";
import React from "react";
import {Link, withRouter} from "react-router-dom";
import Media from "react-bootstrap/Media";

function ListItem({author, onClick, question}) {
  return (<div>
    <Media>
      <img
        width={64}
        height={64}
        className="mr-3"
        src={author.avatarURL}
        alt={author.name}
      />
      <Media.Body>
        <h5>{author.name} Asked</h5>
        <div>Would you rather</div>
        <div className="font-weight-bold">{question.optionOne.text}?</div>
        <div>or</div>
        <div className="font-weight-bold">{question.optionTwo.text}?</div>
        <Link to={`/questions/${question.id}`} onClick={onClick}>View</Link>
      </Media.Body>
    </Media>
  </div>);
}

ListItem.propTypes = {
  author: PropTypes.any,
  question: PropTypes.any,
  onClick: PropTypes.func
};

export default withRouter(ListItem)