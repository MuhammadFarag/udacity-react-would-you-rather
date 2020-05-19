import {useSelector} from "react-redux";
import ListItem from "./ListItem";
import React from "react";

export function QuestionList({questions}) {
  const users = useSelector(state => state.users)

  return <div>
    <ol>
      {questions.sort((a, b) => b.timestamp - a.timestamp).map((question) => (
        <ListItem key={question.id} author={users[question.author]} question={question} onClick={() => {
        }}/>
      ))}
    </ol>

  </div>

}