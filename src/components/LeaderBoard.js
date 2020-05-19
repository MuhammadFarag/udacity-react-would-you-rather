import {useSelector} from "react-redux";
import React from "react";
import Media from "react-bootstrap/Media";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";

export function LeaderBoard() {
  const users = useSelector(state => Object.values(state.users).map(user => ({
    id: user.id,
    name: user.name,
    answeredQuestions: Object.keys(user.answers).length,
    createdQuestions: user.questions.length,
    score: Object.keys(user.answers).length + user.questions.length,
    avatarURL: user.avatarURL
  }))).sort((a, b) => b.score - a.score)

  return <div>
    <ListGroup>
      {users.map(user => {
        return (
          <ListGroup.Item key={user.id}>
            <Media>
              <img
                width={64}
                height={64}
                className="mr-3"
                src={user.avatarURL}
                alt={user.name}
              />
              <Media.Body>
                <h5>{user.name}</h5>
                <div>Answered questions: <Badge variant="secondary">{user.answeredQuestions}</Badge></div>
                <div>Created questions: <Badge variant="secondary">{user.createdQuestions}</Badge></div>
                <div>Score: <Badge variant="success">{user.score}</Badge></div>
              </Media.Body>
            </Media>
          </ListGroup.Item>)
      })}
    </ListGroup>
  </div>

}