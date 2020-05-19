import {Navigation} from "./Navigation";
import Logout from "./Logout";
import React from "react";
import {Col, Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";

export function Page({children}) {
  return <Container>
    <Row>
      <Col>
        <Navigation/>
      </Col>
      <Col md="auto">
        <Logout/>
      </Col>
    </Row>
    <Row>
      <Col>
        {children}
      </Col>
    </Row>
  </Container>
}