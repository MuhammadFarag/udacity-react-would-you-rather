import React, {useEffect, useState} from 'react';
import Login from "./components/Login";
import {_getQuestions, _getUsers} from "./_DATA";
import {Navigation} from "./components/Navigation";
import {Question} from "./components/Question";
import {ListItem} from "./components/ListItem";
import * as PropTypes from "prop-types";
import {BrowserRouter, Route} from "react-router-dom";

function Logout(props) {
  return <ul>
    <li>
      Authenticated User: {props.authenticatedUser.name}
    </li>
    <li>
      <button onClick={props.onLogout}>logout
      </button>
    </li>
  </ul>;
}

Logout.propTypes = {
  authenticatedUser: PropTypes.any,
  onLogout: PropTypes.func
};

function App() {
  const [users, setUsers] = useState([])
  const [questions, setQuestions] = useState([])
  const [authenticatedUser, setAuthenticatedUser] = useState(undefined)
  const [navigation, setNavigation] = useState('unanswered')
  const [activeQuestion, setActiveQuestion] = useState(undefined)
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    _getUsers().then((users) => {
      setUsers(users)
    })
  }, [refresh])

  useEffect(() => {
    _getQuestions().then((questions) => {
      setQuestions(Object.values(questions))
    })
  }, [refresh])

  const handleAuthentication = (user) => {
    setAuthenticatedUser(user)
  }

  const answeredQuestions = () =>
    questions.filter((question) =>
      question.optionOne.votes
        .concat(question.optionTwo.votes)
        .includes(authenticatedUser.id))


  const unAnsweredQuestions = () =>
    questions.filter((question) =>
      !question.optionOne.votes
        .concat(question.optionTwo.votes)
        .includes(authenticatedUser.id))

  const handleNavigation = (nav) => {
    setNavigation(nav)
    setActiveQuestion(undefined)
  }

  function handleLogout() {
    setAuthenticatedUser(undefined)
    setActiveQuestion(undefined)
  }

  if (authenticatedUser && activeQuestion) {
    return <div>
      <Navigation onClick={handleNavigation}/>
      <Logout authenticatedUser={authenticatedUser} onLogout={handleLogout}/>
      <Question author={users[activeQuestion.author]} activeQuestion={activeQuestion} activeUser={authenticatedUser}
                onAnswered={setRefresh}/>
    </div>
  }


  return (
    <BrowserRouter>
      <Route exact path='/' render={ () => (
        <Login users={Object.values(users)} onAuthentication={handleAuthentication}/>
      ) }/>

      <Route exact path='/unanswered' render={ () => (
        <div>
          <Navigation onClick={handleNavigation}/>
          <Logout authenticatedUser={authenticatedUser} onLogout={handleLogout}/>

          <ol>
            {unAnsweredQuestions().map((question) => {
              let author = users[question.author];
              return (
                <ListItem key={question.id} author={author} question={question} onClick={() => {
                  setActiveQuestion(question)
                }}/>
              );
            })}
          </ol>

        </div>
      ) }/>
      <Route exact path='/answered' render={ () => (
        <div>
          <Navigation onClick={handleNavigation}/>
          <Logout authenticatedUser={authenticatedUser} onLogout={handleLogout}/>

          <ol>
            {answeredQuestions().map((question) => {
              let author = users[question.author];
              return (
                <ListItem key={question.id} author={author} question={question} onClick={() => {
                  setActiveQuestion(question)
                }}/>
              );
            })}
          </ol>

        </div>
      ) }/>

    </BrowserRouter>
  );
}

export default App;
