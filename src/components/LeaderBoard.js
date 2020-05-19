import {useSelector} from "react-redux";
import React from "react";

export function LeaderBoard() {
  const users = useSelector(state => Object.values(state.users))

  return <div>
    <ul>
      {users.map(user => {
        return <li key={user.id}>
          <ul>
            <li>Name: {user.name}</li>
            <li>Answered questions: {Object.keys(user.answers).length}</li>
            <li>Created questions: {user.questions.length}</li>
            <li>Score: {Object.keys(user.answers).length + user.questions.length} </li>
          </ul>
        </li>
      })}
    </ul>
  </div>

}