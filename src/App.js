import React, {useEffect, useState} from 'react';
import Login from "./components/Login";
import {_getUsers} from "./_DATA";

function App() {
  const [users, setUsers] = useState([])
  useEffect(() => {
    _getUsers().then((users) => {
      setUsers(Object.values(users))
    })
  }, [])

  return (
    <div>
      <Login users={users}/>
    </div>
  );
}

export default App;
