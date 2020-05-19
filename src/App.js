import React, {useEffect} from 'react';
import Login from "./components/Login";
import {Navigation} from "./components/Navigation";
import {Route, Switch, withRouter} from "react-router-dom";
import Logout from "./components/Logout";
import {answeredQuestions, handleLoadQuestions, handleLoadUsers, unAnsweredQuestions} from "./redux-stuff";
import {useDispatch, useSelector} from "react-redux";
import {QuestionList} from "./components/QuestionList";
import {Question} from "./components/Question";


function AddQuestion() {
  const activeUser = useSelector(state => state.authentication.user)
  return <div>
    <div>
      {activeUser.name} Asked
    </div>

    <form>
      <div>
        <label>
          <input type="text" name="optionOne"/>
        </label>
      </div>
      <div>
        <label>
          <input type="text" name="optionTwo"/>
        </label>
      </div>
      <input type="submit" value="Submit"/>
    </form>
  </div>
}

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
        <AddQuestion/>
      )}/>
      <Route exact path='/unanswered-questions' render={() => (
        <div>
          <Navigation/>
          <Logout/>
          <QuestionList questions={unAnsweredQuestions(questions, authenticatedUser)}/>
        </div>
      )}/>
      <Route exact path='/answered-questions' render={() => (
        <div>
          <Navigation/>
          <Logout/>
          <QuestionList questions={answeredQuestions(questions, authenticatedUser)}/>
        </div>
      )}/>
      <Route exact path='/questions/:id' render={({match: {params: {id}}}) => (
        <div>
          <Navigation/>
          <Logout/>
          <Question id={id}/>
        </div>
      )}/>
    </Switch>
  );
}

export default withRouter(App);
