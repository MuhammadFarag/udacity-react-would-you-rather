import React from "react";
import {withRouter} from "react-router-dom";

function Login({users, onAuthentication, history}) {
  return <ul>
    {users.map((user) => (
        <li key={user.id}>
          <button onClick={() => {
            onAuthentication(user)
            history.push('/unanswered')}
          }>{user.name}</button>
        </li>
      ))}
  </ul>;
}

export default withRouter(Login);