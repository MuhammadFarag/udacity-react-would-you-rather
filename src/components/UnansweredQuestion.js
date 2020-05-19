import * as PropTypes from "prop-types";
import React, {useState} from "react";
import {withRouter} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {handleAnswerQuestion} from "../redux-stuff";
import Media from "react-bootstrap/Media";

function UnansweredQuestion({id}) {
  const questions = useSelector(state => state.questions)
  const activeUser = useSelector(state => state.authentication.user)
  const users = useSelector(state => state.users)

  const [selectedOption, setSelectedOption] = useState("");
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const activeQuestion = questions[id]
  const dispatch = useDispatch()


  const handleChange = (event) => {
    setSelectedOption(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmitDisabled(true);
    dispatch(handleAnswerQuestion({
      authedUser: activeUser.id,
      qid: activeQuestion.id,
      answer: selectedOption
    }))
  }

  return <>

    <Media>
      <img
        width={64}
        height={64}
        className="mr-3"
        src={users[activeQuestion.author].avatarURL}
        alt={users[activeQuestion.author].name}
      />
      <Media.Body>
        <form className="form-group" onSubmit={handleSubmit}>

          <h5>{users[activeQuestion.author].name} Asked</h5>
          <div>Would you rather</div>
          <div>
            <label className="font-weight-bold">
              <input className="form-check-input" type="radio" value="optionOne"
                     checked={selectedOption === "optionOne"} onChange={handleChange}/>
              {activeQuestion.optionOne.text}?
            </label>
          </div>
          <div>or</div>
          <div>
            <label className="font-weight-bold">
              <input className="form-check-input" type="radio" value="optionTwo"
                     checked={selectedOption === "optionTwo"} onChange={handleChange}/>
              {activeQuestion.optionTwo.text}?
            </label>
          </div>
          <input className="btn btn-primary" type="submit" value="Submit" disabled={submitDisabled}/>

        </form>

      </Media.Body>
    </Media>

  </>;
}

UnansweredQuestion.propTypes = {
  name: PropTypes.any,
  activeUser: PropTypes.any,
  activeQuestion: PropTypes.any,
  onAnswered: PropTypes.func
};

export default withRouter(UnansweredQuestion)