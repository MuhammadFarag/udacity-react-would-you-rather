import * as PropTypes from "prop-types";
import React from "react";
import {useSelector} from "react-redux";
import Media from "react-bootstrap/Media";
import Badge from "react-bootstrap/Badge";

export function AnsweredQuestion({id}) {
  const questions = useSelector(state => state.questions)
  const activeUser = useSelector(state => state.authentication.user)
  const users = useSelector(state => state.users)

  const activeQuestion = questions[id]

  const activeUserAnsweredOptionOne = activeQuestion.optionOne.votes.includes(activeUser.id)
  const activeUserAnsweredOptionTwo = activeQuestion.optionTwo.votes.includes(activeUser.id)

  const numberOfOptionOneAnswers = activeQuestion.optionOne.votes.length
  const numberOfOptionTwoAnswers = activeQuestion.optionTwo.votes.length
  const numberOfOptions = numberOfOptionOneAnswers + numberOfOptionTwoAnswers
  const percentageOfOptionOneAnswers = (numberOfOptionOneAnswers / numberOfOptions) * 100
  const percentageOfOptionTwoAnswers = (numberOfOptionTwoAnswers / numberOfOptions) * 100

  return <>
    <Media>
      <img
        width={64}
        height={64}
        className="mr-3"
        src={users[activeQuestion.author].avatarURL}
        alt={users[activeQuestion.author].name}
      />
      <Media.Body>
        <h5>{users[activeQuestion.author].name} Asked</h5>
        <div>Would you rather</div>
        <div className="font-weight-bold">{activeQuestion.optionOne.text}{'? '}
          <Badge variant="success">{percentageOfOptionOneAnswers}% </Badge>{' '}
          <Badge variant="secondary">{numberOfOptionOneAnswers}</Badge>{activeUserAnsweredOptionOne ? "*" : null}
        </div>
        <div>or</div>
        <div className="font-weight-bold">{activeQuestion.optionTwo.text}{'? '}
          <Badge variant="success">{percentageOfOptionTwoAnswers}% </Badge>{' '}
          <Badge variant="secondary">{numberOfOptionTwoAnswers}</Badge>{activeUserAnsweredOptionTwo ? "*" : null}
        </div>
      </Media.Body>
    </Media>
  </>;
}

AnsweredQuestion.propTypes = {
  author: PropTypes.any,
  activeUser: PropTypes.any,
  activeQuestion: PropTypes.any
};