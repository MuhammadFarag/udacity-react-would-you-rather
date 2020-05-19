import React, {useEffect} from 'react';
import Login from "./components/Login";
import {Route, Switch, withRouter} from "react-router-dom";
import {answeredQuestions, handleLoadQuestions, handleLoadUsers, unAnsweredQuestions} from "./redux-stuff";
import {useDispatch, useSelector} from "react-redux";
import {QuestionList} from "./components/QuestionList";
import {Question} from "./components/Question";
import AddQuestion from "./components/AddQuestion";
import {LeaderBoard} from "./components/LeaderBoard";
import {Page} from "./components/Page";

function App() {
  const questions = useSelector(state => state.questions)
  const dispatch = useDispatch()
  const authenticatedUser = useSelector(state => state.authentication.user)
  useEffect(() => {
    dispatch(handleLoadUsers())
  }, [dispatch])

  useEffect(() => {
    dispatch(handleLoadQuestions())
  }, [dispatch])

  return (

    <Switch>
      <Route exact path='/' render={() => (
        <Login/>
      )}/>
      <Route exact path='/add' render={() => (
        <Page>
          <AddQuestion/>
        </Page>
      )}/>
      <Route exact path='/leaderboard' render={() => (
        <Page>
          <LeaderBoard/>
        </Page>
      )}/>
      <Route exact path='/unanswered-questions' render={() => (
        <Page>
          <QuestionList questions={unAnsweredQuestions(questions, authenticatedUser)}/>
        </Page>
      )}/>
      <Route exact path='/answered-questions' render={() => (
        <Page>
          <QuestionList questions={answeredQuestions(questions, authenticatedUser)}/>
        </Page>
      )}/>
      <Route exact path='/questions/:id' render={({match: {params: {id}}}) => (
        <Page>
          <Question id={id}/>
        </Page>
      )}/>
      <Route path='/' render={() => (
        <Page>
          <div>The page you are looking for can't be found</div>
        </Page>
      )}/>
    </Switch>
  );
}

export default withRouter(App);
