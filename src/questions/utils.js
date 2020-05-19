export function unAnsweredQuestions(questions, authenticatedUser) {
  return Object.values(questions).filter((question) =>
    !question.optionOne.votes
      .concat(question.optionTwo.votes)
      .includes(authenticatedUser.id));
}

export function answeredQuestions(questions, authenticatedUser) {
  return Object.values(questions).filter((question) =>
    question.optionOne.votes
      .concat(question.optionTwo.votes)
      .includes(authenticatedUser.id));
}