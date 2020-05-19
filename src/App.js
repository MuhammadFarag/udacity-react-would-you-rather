import React, {useEffect, useState} from 'react';
import Login from "./components/Login";
import {Navigation} from "./components/Navigation";
import {Route, Switch, withRouter} from "react-router-dom";
import Logout from "./components/Logout";
import {addQuestion, answeredQuestions, handleLoadQuestions, handleLoadUsers, unAnsweredQuestions} from "./redux-stuff";
import {useDispatch, useSelector} from "react-redux";
import {QuestionList} from "./components/QuestionList";
import {Question} from "./components/Question";
import {_saveQuestion} from "./_DATA";


function AddQuestion() {
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
    }).then((savedQuestion) =>
      dispatch(addQuestion(savedQuestion, activeUser))
    )

  }

  const handleOptionOne = (event) => {
    setOptionOne(event.target.value)
  }

  const handleOptionTwo = (event) => {
    setOptionTwo(event.target.value)
  }
  return <div>
    <div>
      {activeUser.name} Asked
    </div>

    <form onSubmit={handleSubmit}>
      <div>
        <label>
          <input type="text" name="optionOne" value={optionOne} onChange={handleOptionOne}/>
        </label>
      </div>
      <div>
        <label>
          <input type="text" name="optionTwo" value={optionTwo} onChange={handleOptionTwo}/>
        </label>
      </div>
      <input type="submit" value="Submit"/>
    </form>
  </div>
}

function App() {
  const questions = useSelector(state => state.questions)
  const dispatch = useDispatch()
  const authenticatedUser = useSelector(state => state.authentication.user)
  useEffect(() => {
    dispatch(handleLoadUsers())
  }, [dispatch])

  useEffect(() => {
    dispatch(handleLoadQuestions())
  }, [dispatch])

  return (

    <Switch>
      <Route exact path='/' render={() => (
        <Login/>
      )}/>
      <Route exact path='/add' render={() => (
        <div>
          <Navigation/>
          <Logout/>
          <AddQuestion/>
        </div>
      )}/>
      <Route exact path='/unanswered-questions' render={() => (
        <div>
          <Navigation/>
          <Logout/>
          <QuestionList questions={unAnsweredQuestions(questions, authenticatedUser)}/>
        </div>
      )}/>
      <Route exact path='/answered-questions' render={() => (
        <div>
          <Navigation/>
          <Logout/>
          <QuestionList questions={answeredQuestions(questions, authenticatedUser)}/>
        </div>
      )}/>
      <Route exact path='/questions/:id' render={({match: {params: {id}}}) => (
        <div>
          <Navigation/>
          <Logout/>
          <Question id={id}/>
        </div>
      )}/>
    </Switch>
  );
}

export default withRouter(App);
