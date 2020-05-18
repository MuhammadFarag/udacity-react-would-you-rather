import * as PropTypes from "prop-types";
import React, {useState} from "react";
import {_saveQuestionAnswer} from "../_DATA";

export function UnansweredQuestion({activeQuestion, author, activeUser, onAnswered}) {
  const [selectedOption, setSelectedOption] = useState("")

  const handleChange = (event) => {
    setSelectedOption(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    _saveQuestionAnswer({
      authedUser: activeUser.id,
      qid: activeQuestion.id,
      answer: selectedOption
    }).then(() => {
      onAnswered()
    })
  }

  return <>
    <div>
      {author.name} Asked
    </div>

    <form onSubmit={handleSubmit}>
      <div>
        <label>
          <input type="radio" value="optionOne" checked={selectedOption === "optionOne"} onChange={handleChange}/>
          {activeQuestion.optionOne.text}
        </label>
      </div>
      <div>
        <label>
          <input type="radio" value="optionTwo" checked={selectedOption === "optionTwo"} onChange={handleChange}/>
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
  activeQuestion: PropTypes.any,
  onAnswered: PropTypes.func
};