import React from "react";
import {Link, withRouter} from "react-router-dom";
import {Nav, Navbar} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../redux-stuff";

function Navigation({history}) {
  const authenticatedUser = useSelector(state => state.authentication.user)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }

  if (!authenticatedUser) {
    history.push('/')
    return null
  }

  return <Navbar expand="lg">
    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Item>
          <Link className="nav-link" to='/unanswered-questions'>Unanswered Questions</Link>
        </Nav.Item>
        <Nav.Item>
          <Link className="nav-link" to='/answered-questions'>Answered Questions</Link>
        </Nav.Item>
        <Nav.Item>
          <Link className="nav-link" to='/add'>New Question</Link>
        </Nav.Item>
        <Nav.Item>
          <Link className="nav-link" to='/leaderboard'>Leader Board</Link>
        </Nav.Item>
      </Nav>
      <Navbar.Text>
        Hi {authenticatedUser.name}
      </Navbar.Text>
      <Navbar.Text>
        <Link className="nav-link" to='/' onClick={handleLogout}>logout</Link>
      </Navbar.Text>
    </Navbar.Collapse>
  </Navbar>;
}

export default withRouter(Navigation)