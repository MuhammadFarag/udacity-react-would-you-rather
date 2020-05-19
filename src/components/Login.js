import React from "react";
import {Link, withRouter} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {authenticateUser} from "../redux-stuff";
import Image from "react-bootstrap/Image";
import {ListGroup} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

function Login() {
  const dispatch = useDispatch()
  const users = useSelector(state => Object.values(state.users))

  const handleAuthentication = (user) => {
    dispatch(authenticateUser(user))
  }

  return <Container>
    <Row className="justify-content-md-center">
      <Col md="auto">
        <ListGroup>
          {users.map((user) => (
            <ListGroup.Item key={user.id}>
              <Image src={user.avatarURL} roundedCircle/>
              <Link to='/unanswered-questions' onClick={() => {
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