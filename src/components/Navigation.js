import React from "react";
import {Link} from "react-router-dom";

export function Navigation() {
  return <div>
    <ul>
      <li>
        <Link to='/unanswered-questions'>
          Unanswered Questions
        </Link>
      </li>
      <li>
        <Link to='/answered-questions'>
          Answered Questions
        </Link>
      </li>
      <li>
        <Link to='/add'>
          New Question
        </Link>
      </li>
      <li>
        <Link to='/leaderboard'>
          Leader Board
        </Link>
      </li>
    </ul>
  </div>;
}