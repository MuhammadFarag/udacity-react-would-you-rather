import React from "react";
import {withRouter} from "react-router-dom";
import {useDispatch} from "react-redux";
import {authenticateUser} from "../redux-stuff";

function Login({users, history}) {
  const dispatch = useDispatch()
  const handleAuthentication = (user) => {
    dispatch(authenticateUser(user))
  }

  return <ul>
    {users.map((user) => (
      <li key={user.id}>
        <button onClick={() => {
          handleAuthentication(user)
          history.push('/unanswered-questions')
        }
        }>{user.name}</button>
      </li>
    ))}
  </ul>;
}

export default withRouter(Login);