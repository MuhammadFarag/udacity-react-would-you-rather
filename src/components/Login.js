import React from "react";

function Login({users, onAuthentication}) {
  return <ul>
    {users.map((user) => (
        <li key={user.id}>
          <button onClick={() => onAuthentication(user)}>{user.name}</button>
        </li>
      ))}
  </ul>;
}

export default Login;