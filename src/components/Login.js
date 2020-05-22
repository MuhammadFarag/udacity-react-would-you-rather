import React from "react";
import {Link, withRouter} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Image from "react-bootstrap/Image";
import {ListGroup} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import {authenticateUser} from "../authentication/actions";

function Login({location}) {
  const dispatch = useDispatch()
  const users = useSelector(state => Object.values(state.users))

  const handleAuthentication = (user) => {
    dispatch(authenticateUser(user))
  }

  const nextPath = location.state ? location.state.referrer : "/unanswered-questions"
  return <Container>
    <Row className="justify-content-md-center">
      <Col md="auto">
        <ListGroup>
          {users.map((user) => (
            <ListGroup.Item key={user.id}>
              <Image src={user.avatarURL} roundedCircle/>
              <Link to={nextPath} onClick={() => {
                handleAuthentication(user)
              }}>{user.name}</Link>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Col>
    </Row>
  </Container>;
}

export default withRouter(Login);