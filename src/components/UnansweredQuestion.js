import * as PropTypes from "prop-types";
import React, {useState} from "react";
import {_saveQuestionAnswer} from "../_DATA";
import {withRouter} from "react-router-dom";

function UnansweredQuestion({activeUser, id, questions, onAnswered, history}) {
  const [selectedOption, setSelectedOption] = useState("")
  const activeQuestion = questions[id]


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
      history.push(`/answered/${id}`)
    })
  }

  return <>
    <div>
      {activeQuestion.author.name} Asked
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

export default withRouter(UnansweredQuestion)