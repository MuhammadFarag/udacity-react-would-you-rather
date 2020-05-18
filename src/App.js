import React, {useEffect, useState} from 'react';
import Login from "./components/Login";
import {_getQuestions, _getUsers, _saveQuestionAnswer} from "./_DATA";
import {Navigation} from "./components/Navigation";
import ListItem from "./components/ListItem";
import {Route, Switch, withRouter} from "react-router-dom";
import Logout from "./components/Logout";
import {AnsweredQuestion} from "./components/AnsweredQuestion";
import UnansweredQuestion from "./components/UnansweredQuestion";


function QuestionList({questions, users, path}) {

  return <div>
    <ol>
      {questions.map((question) => (
        <ListItem key={question.id} author={users[question.author]} question={question} path={path} onClick={() => {
        }}/>
      ))}
    </ol>

  </div>

}

function App({history}) {
  const [users, setUsers] = useState([])
  const [questions, setQuestions] = useState([])
  const [authenticatedUser, setAuthenticatedUser] = useState(undefined)
  useEffect(() => {
    _getUsers().then((users) => {
      setUsers(users)
    })
  }, [])

  useEffect(() => {
    _getQuestions().then((questions) => {
      setQuestions(questions)
    })
  }, [])

  const handleAuthentication = (user) => {
    setAuthenticatedUser(user)
  }

  const handleAnswered = (event) => {
    _saveQuestionAnswer(event).then(() => {
      _getQuestions().then((questions) => {
        setQuestions(questions)
      }).then(() => {
        history.push(`/answered/${event.qid}`)
      })
    })
  }
  const answeredQuestions = () =>
    Object.values(questions).filter((question) =>
      question.optionOne.votes
        .concat(question.optionTwo.votes)
        .includes(authenticatedUser.id))


  const unAnsweredQuestions = () =>
    Object.values(questions).filter((question) =>
      !question.optionOne.votes
        .concat(question.optionTwo.votes)
        .includes(authenticatedUser.id))

  function handleLogout() {
    setAuthenticatedUser(undefined)
  }


  return (

    <Switch>
      <Route exact path='/' render={() => (
        <Login users={Object.values(users)} onAuthentication={handleAuthentication}/>
      )}/>
      <Route exact path='/unanswered-questions' render={() => (
        <div>
          <Navigation/>
          <Logout authenticatedUser={authenticatedUser} onLogout={handleLogout}/>
          <QuestionList questions={unAnsweredQuestions()} users={users} path='unanswered'/>
        </div>
      )}/>
      <Route exact path='/answered-questions' render={() => (
        <div>
          <Navigation/>
          <Logout authenticatedUser={authenticatedUser} onLogout={handleLogout}/>
          <QuestionList questions={answeredQuestions()} users={users} path='answered'/>
        </div>
      )}/>
      <Route exact path='/answered/:id' render={({match: {params: {id}}}) => (
        <div>
          <Navigation/>
          <Logout authenticatedUser={authenticatedUser} onLogout={handleLogout}/>
          <AnsweredQuestion activeUser={authenticatedUser} id={id} questions={questions}/>
        </div>
      )}/>
      <Route exact path='/unanswered/:id' render={({match: {params: {id}}}) => (
        <div>
          <Navigation/>
          <Logout authenticatedUser={authenticatedUser} onLogout={handleLogout}/>
          <UnansweredQuestion activeUser={authenticatedUser} id={id} questions={questions} onAnswered={handleAnswered}/>
        </div>
      )}/>
    </Switch>
  );
}

export default withRouter(App);
