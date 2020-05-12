import React, {useEffect, useState} from 'react';
import Login from "./components/Login";
import {_getQuestions, _getUsers} from "./_DATA";
import {Navigation} from "./components/Navigation";
import {Question} from "./components/Question";

function App() {
  const [users, setUsers] = useState([])
  const [questions, setQuestions] = useState([])
  const [authenticatedUser, setAuthenticatedUser] = useState(undefined)
  const [navigation, setNavigation] = useState('unanswered')
  const [activeQuestion, setActiveQuestion] = useState(undefined)
  useEffect(() => {
    _getUsers().then((users) => {
      setUsers(users)
    })
  }, [])

  useEffect(() => {
    _getQuestions().then((questions) => {
      setQuestions(Object.values(questions))
    })
  }, [])

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

  const displayQuestions = () => {
    if (navigation === 'unanswered') {
      return unAnsweredQuestions()
    }
    return answeredQuestions()

  }

  const handleNavigation = (nav) => {
    setNavigation(nav)
    setActiveQuestion(undefined)
  }

  if (authenticatedUser && activeQuestion) {
    return <div>
      <Navigation onClick={handleNavigation}/>
      <Question author={users[activeQuestion.author]} activeQuestion={activeQuestion}/>
    </div>
  }

  if (authenticatedUser) {
    return <div>
      <Navigation onClick={handleNavigation}/>

      <ol>
        {displayQuestions().map((question) => (
          <li key={question.id}>
            <ul>
              <li>{question.optionOne.text}</li>
              <li>{question.optionTwo.text}</li>
            </ul>
            <button onClick={() => {
              setActiveQuestion(question)
            }}>Go to Question
            </button>
          </li>
        ))}
      </ol>

      <ul>
        <li>
          Authenticated User: {authenticatedUser.name}
        </li>
        <li>
          <button onClick={() => {
            setAuthenticatedUser(undefined)
            setActiveQuestion(undefined)
          }}>logout
          </button>
        </li>
      </ul>
    </div>
  }

  return (
    <div>
      <Login users={Object.values(users)} onAuthentication={handleAuthentication}/>
    </div>
  );
}

export default App;
