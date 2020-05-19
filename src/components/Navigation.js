import React from "react";
import {Link} from "react-router-dom";
import {Nav, Navbar} from "react-bootstrap";
import Logout from "./Logout";

export function Navigation() {
  return <Navbar>
    <Nav className="mr-auto">
      <Nav.Item>
        <Link class="nav-link" to='/unanswered-questions'>Unanswered Questions</Link>
      </Nav.Item>
      <Nav.Item>
        <Link class="nav-link" to='/answered-questions'>Answered Questions</Link>
      </Nav.Item>
      <Nav.Item>
        <Link class="nav-link" to='/add'>New Question</Link>
      </Nav.Item>
      <Nav.Item>
        <Link class="nav-link" to='/leaderboard'>Leader Board</Link>
      </Nav.Item>
    </Nav>
    <Nav>
      <Logout/>
    </Nav>
  </Navbar>;
}