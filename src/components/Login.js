import React from "react";
import {withRouter} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {authenticateUser} from "../redux-stuff";

function Login({history}) {
  const dispatch = useDispatch()
  const users = useSelector(state => Object.values(state.users))

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