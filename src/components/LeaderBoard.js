import {useSelector} from "react-redux";
import React from "react";

export function LeaderBoard() {
  const users = useSelector(state => Object.values(state.users).map(user => ({
    id: user.id,
    name: user.name,
    answeredQuestions: Object.keys(user.answers).length,
    createdQuestions: user.questions.length,
    score: Object.keys(user.answers).length + user.questions.length
  }))).sort((a, b) => b.score - a.score)

  return <div>
    <ul>
      {users.map(user => {
        return <li key={user.id}>
          <ul>
            <li>Name: {user.name}</li>
            <li>Answered questions: {user.answeredQuestions}</li>
            <li>Created questions: {user.createdQuestions}</li>
            <li>Score: {user.score} </li>
          </ul>
        </li>
      })}
    </ul>
  </div>

}