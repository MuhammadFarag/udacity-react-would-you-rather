import React, {useEffect} from 'react';
import Login from "./components/Login";
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {QuestionList} from "./components/QuestionList";
import {Question} from "./components/Question";
import AddQuestion from "./components/AddQuestion";
import {LeaderBoard} from "./components/LeaderBoard";
import {Page} from "./components/Page";
import {handleLoadQuestions} from "./questions/actions";
import {handleLoadUsers} from "./users/actions";
import {answeredQuestions, unAnsweredQuestions} from "./questions/utils";
import {PageNotFound} from "./components/PageNotFound";

function App({location}) {
  const questions = useSelector(state => state.questions)
  const dispatch = useDispatch()
  const authenticatedUser = useSelector(state => state.authentication.user)
  useEffect(() => {
    dispatch(handleLoadUsers())
  }, [dispatch])

  useEffect(() => {
    dispatch(handleLoadQuestions())
  }, [dispatch])


  if (!authenticatedUser && location.pathname !== '/') {
    return <Redirect to={{pathname: "/", state: {referrer: location.pathname}}}/>
  }

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
      <Route exact path='/not-found' render={() => (
        <Page>
          <PageNotFound/>
        </Page>
      )}/>
      <Route render={() => (
        <Redirect to="/not-found"/>
      )}/>

    </Switch>
  );
}

export default withRouter(App);
