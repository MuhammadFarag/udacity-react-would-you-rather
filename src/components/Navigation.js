import * as PropTypes from "prop-types";
import React from "react";

export function Navigation(props) {
  return <div>
    <ul>
      <li>
        <button onClick={() => {
          props.onClick('unanswered')
        }}>Unanswered Questions
        </button>
      </li>
      <li>
        <button onClick={() => {
          props.onClick('answered')
        }}>Answered Questions
        </button>
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