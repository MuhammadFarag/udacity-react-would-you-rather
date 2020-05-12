import React, {useEffect, useState} from 'react';
import Login from "./components/Login";
import {_getQuestions, _getUsers} from "./_DATA";

function App() {
  const [users, setUsers] = useState([])
  const [questions, setQuestions] = useState([])
  const [authenticatedUser, setAuthenticatedUser] = useState(undefined)
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

  if (authenticatedUser) {
    return <div>
      <ul>
        {questions.map((question) => (
          <li key={question.id}>
            <ul>
              <li>{question.optionOne.text}</li>
              <li>{question.optionTwo.text}</li>
            </ul>
          </li>
          ))}
      </ul>

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
