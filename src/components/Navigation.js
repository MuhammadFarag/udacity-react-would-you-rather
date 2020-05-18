import * as PropTypes from "prop-types";
import React from "react";
import {Link} from "react-router-dom";

export function Navigation(props) {
  return <div>
    <ul>
      <li>
        <Link to='unanswered'>
          Unanswered Questions
        </Link>
      </li>
      <li>
        <Link to='answered'>
          Answered Questions
        </Link>
      </li>
      <li>
        <button disabled>New Question</button>
      </li>
      <li>
        <button disabled>Leader Board</button>
      </li>
    </ul>
  </div>;
}

Navigation.propTypes = {
  onClick: PropTypes.func,
};