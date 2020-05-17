import * as PropTypes from "prop-types";
import React from "react";

export function UnansweredQuestion({activeQuestion, author, activeUser}) {
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

UnansweredQuestion.propTypes = {
  name: PropTypes.any,
  activeUser: PropTypes.any,
  activeQuestion: PropTypes.any
};