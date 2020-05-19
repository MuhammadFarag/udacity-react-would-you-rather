import React, {useEffect} from 'react';
import Login from "./components/Login";
import {Navigation} from "./components/Navigation";
import ListItem from "./components/ListItem";
import {Route, Switch, withRouter} from "react-router-dom";
import Logout from "./components/Logout";
import {AnsweredQuestion} from "./components/AnsweredQuestion";
import UnansweredQuestion from "./components/UnansweredQuestion";
import {handleAnswerQuestion, handleLoadQuestions, handleLoadUsers, logout} from "./redux-stuff";
import {useDispatch, useSelector} from "react-redux";


function QuestionList({questions, users, path}) {

  return <div>
    <ol>
      {questions.map((question) => (
        <ListItem key={question.id} author={users[question.author]} question={question} path={path} onClick={() => {
        }}/>
      ))}
    </ol>

  </div>

}

function App({history}) {
  const users = useSelector(state => state.users)
  const questions = useSelector(state => state.questions)
  const dispatch = useDispatch()
  const authenticatedUser = useSelector(state => state.authentication.user)
  useEffect(() => {
    dispatch(handleLoadUsers())
  }, [dispatch])

  useEffect(() => {
    dispatch(handleLoadQuestions())
  }, [dispatch])

  const handleAnswered = (event) => {
    dispatch(handleAnswerQuestion(event, () => {
      history.push(`/answered/${event.qid}`)
    }))
  }
  const answeredQuestions = () =>
    Object.values(questions).filter((question) =>
      question.optionOne.votes
        .concat(question.optionTwo.votes)
        .includes(authenticatedUser.id))


  const unAnsweredQuestions = () =>
    Object.values(questions).filter((question) =>
      !question.optionOne.votes
        .concat(question.optionTwo.votes)
        .includes(authenticatedUser.id))

  function handleLogout() {
    dispatch(logout())
  }


  return (

    <Switch>
      <Route exact path='/' render={() => (
        <Login/>
      )}/>
      <Route exact path='/unanswered-questions' render={() => (
        <div>
          <Navigation/>
          <Logout authenticatedUser={authenticatedUser} onLogout={handleLogout}/>
          <QuestionList questions={unAnsweredQuestions()} users={users} path='unanswered'/>
        </div>
      )}/>
      <Route exact path='/answered-questions' render={() => (
        <div>
          <Navigation/>
          <Logout authenticatedUser={authenticatedUser} onLogout={handleLogout}/>
          <QuestionList questions={answeredQuestions()} users={users} path='answered'/>
        </div>
      )}/>
      <Route exact path='/answered/:id' render={({match: {params: {id}}}) => (
        <div>
          <Navigation/>
          <Logout authenticatedUser={authenticatedUser} onLogout={handleLogout}/>
          <AnsweredQuestion activeUser={authenticatedUser} id={id} questions={questions}/>
        </div>
      )}/>
      <Route exact path='/unanswered/:id' render={({match: {params: {id}}}) => (
        <div>
          <Navigation/>
          <Logout authenticatedUser={authenticatedUser} onLogout={handleLogout}/>
          <UnansweredQuestion activeUser={authenticatedUser} id={id} questions={questions} onAnswered={handleAnswered}/>
        </div>
      )}/>
    </Switch>
  );
}

export default withRouter(App);
