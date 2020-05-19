import {useDispatch, useSelector} from "react-redux";
import React, {useState} from "react";
import {_saveQuestion} from "../_DATA";
import {addQuestion} from "../redux-stuff";
import {withRouter} from "react-router-dom";

function AddQuestion({history}) {
  const activeUser = useSelector(state => state.authentication.user)
  const [optionOne, setOptionOne] = useState("")
  const [optionTwo, setOptionTwo] = useState("")

  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()
    _saveQuestion({
      author: activeUser.id,
      optionOneText: optionOne,
      optionTwoText: optionTwo,
    }).then((savedQuestion) => {
        dispatch(addQuestion(savedQuestion, activeUser))
        history.push('/unanswered-questions')
      }
    )

  }

  const handleOptionOne = (event) => {
    setOptionOne(event.target.value)
  }

  const handleOptionTwo = (event) => {
    setOptionTwo(event.target.value)
  }
  return <div>
    <h5>
      {activeUser.name} Asked
    </h5>

    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <div>
          <label>
            <input className="form-control" type="text" name="optionOne" value={optionOne} onChange={handleOptionOne}/>
          </label>
        </div>
        <div>
          <label>
            <input className="form-control" type="text" name="optionTwo" value={optionTwo} onChange={handleOptionTwo}/>
          </label>
        </div>
        <input type="submit" className="btn btn-primary" value="Submit"/>
      </div>
    </form>
  </div>
}

export default withRouter(AddQuestion)