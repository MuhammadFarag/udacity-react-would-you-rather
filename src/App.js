import React, {useEffect} from 'react';
import Login from "./components/Login";
import {Navigation} from "./components/Navigation";
import {Route, Switch, withRouter} from "react-router-dom";
import Logout from "./components/Logout";
import {AnsweredQuestion} from "./components/AnsweredQuestion";
import UnansweredQuestion from "./components/UnansweredQuestion";
import {answeredQuestions, handleLoadQuestions, handleLoadUsers, unAnsweredQuestions} from "./redux-stuff";
import {useDispatch, useSelector} from "react-redux";
import {QuestionList} from "./components/QuestionList";


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
      <Route exact path='/unanswered-questions' render={() => (
        <div>
          <Navigation/>
          <Logout/>
          <QuestionList questions={unAnsweredQuestions(questions, authenticatedUser)} path='unanswered'/>
        </div>
      )}/>
      <Route exact path='/answered-questions' render={() => (
        <div>
          <Navigation/>
          <Logout/>
          <QuestionList questions={answeredQuestions(questions, authenticatedUser)} path='answered'/>
        </div>
      )}/>
      <Route exact path='/answered/:id' render={({match: {params: {id}}}) => (
        <div>
          <Navigation/>
          <Logout/>
          <AnsweredQuestion id={id}/>
        </div>
      )}/>
      <Route exact path='/unanswered/:id' render={({match: {params: {id}}}) => (
        <div>
          <Navigation/>
          <Logout/>
          <UnansweredQuestion id={id}/>
        </div>
      )}/>
    </Switch>
  );
}

export default withRouter(App);
