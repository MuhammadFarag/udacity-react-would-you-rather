import React, {useEffect, useState} from 'react';
import Login from "./components/Login";
import {_getQuestions, _getUsers} from "./_DATA";
import {Navigation} from "./components/Navigation";
import {Question} from "./components/Question";
import ListItem from "./components/ListItem";
import {BrowserRouter, Route} from "react-router-dom";
import Logout from "./components/Logout";
import {AnsweredQuestion} from "./components/AnsweredQuestion";


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

function App() {
  const [users, setUsers] = useState([])
  const [questions, setQuestions] = useState([])
  const [authenticatedUser, setAuthenticatedUser] = useState(undefined)
  const [activeQuestion, setActiveQuestion] = useState(undefined)
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    _getUsers().then((users) => {
      setUsers(users)
    })
  }, [refresh])

  useEffect(() => {
    _getQuestions().then((questions) => {
      setQuestions(questions)
    })
  }, [refresh])

  const handleAuthentication = (user) => {
    setAuthenticatedUser(user)
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
    <BrowserRouter>
      <Route exact path='/' render={() => (
        <Login users={Object.values(users)} onAuthentication={handleAuthentication}/>
      )}/>

      <Route exact path='/unanswered' render={() => (
        <div>
          <Navigation/>
          <Logout authenticatedUser={authenticatedUser} onLogout={handleLogout}/>
          <QuestionList questions={unAnsweredQuestions()} users={users}/>
        </div>
      )}/>
      <Route exact path='/answered' render={() => (
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


      <Route exact path='/question' render={() => (
        <div>
          <Navigation/>
          <Logout authenticatedUser={authenticatedUser} onLogout={handleLogout}/>
          <Question author={users[activeQuestion.author]} activeQuestion={activeQuestion} activeUser={authenticatedUser}
                    onAnswered={setRefresh}/>
        </div>
      )}/>

    </BrowserRouter>
  );
}

export default App;
