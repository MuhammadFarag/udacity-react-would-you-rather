import React from "react";

function Login({users}) {
  return <ul>
    {users.map((user) => {
      return (
        <li key={user.id}>
          {user.name}
        </li>
      )
    })}
  </ul>;
}

export default Login;