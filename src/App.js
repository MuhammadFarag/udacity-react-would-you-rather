import React, {useEffect, useState} from 'react';
import Login from "./components/Login";
import {_getQuestions, _getUsers} from "./_DATA";

function App() {
  const [users, setUsers] = useState([])
  const [questions, setQuestions] = useState([])
  const [authenticatedUser, setAuthenticatedUser] = useState(undefined)
  const [navigation, setNavigation] = useState('unanswered')
  useEffect(() => {
    _getUsers().then((users) => {
      setUsers(Object.values(users))
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
    if(navigation === 'unanswered'){
      return unAnsweredQuestions()
    }
    return answeredQuestions()

  }


  if (authenticatedUser) {
    return <div>
      <div>
        <ul>
          <li><button onClick={() => {setNavigation('unanswered')} }>Unanswered Questions</button></li>
          <li><button onClick={() => {setNavigation('answered')} }>Answered Questions</button></li>
          <li><button disabled>New Question</button></li>
          <li><button disabled>Leader Board</button></li>
        </ul>
      </div>

      <ol>
        {displayQuestions().map((question) => (
          <li key={question.id}>
            <ul>
              <li>{question.optionOne.text}</li>
              <li>{question.optionTwo.text}</li>
            </ul>
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
          }}>logout
          </button>
        </li>
      </ul>
    </div>
  }

  return (
    <div>
      <Login users={users} onAuthentication={handleAuthentication}/>
    </div>
  );
}

export default App;
