import React, {useEffect, useState} from 'react';
import Login from "./components/Login";
import {_getUsers} from "./_DATA";

function App() {
  const [users, setUsers] = useState([])
  const [authenticatedUser, setAuthenticatedUser] = useState(undefined)
  useEffect(() => {
    _getUsers().then((users) => {
      setUsers(Object.values(users))
    })
  }, [])

  const handleAuthentication = (user) => {
    setAuthenticatedUser(user)
  }

  if (authenticatedUser){
    return <div>
      <ul>
        <li>
          Authenticated User: {authenticatedUser.name}
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
