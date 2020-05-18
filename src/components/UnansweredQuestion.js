import * as PropTypes from "prop-types";
import React, {useState} from "react";
import {withRouter} from "react-router-dom";

function UnansweredQuestion({activeUser, id, questions, onAnswered}) {
  const [selectedOption, setSelectedOption] = useState("");
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const activeQuestion = questions[id]


  const handleChange = (event) => {
    setSelectedOption(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmitDisabled(true);
    onAnswered({
      authedUser: activeUser.id,
      qid: activeQuestion.id,
      answer: selectedOption
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
      <input type="submit" value="Submit" disabled={submitDisabled}/>
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