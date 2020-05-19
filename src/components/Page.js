import Navigation from "./Navigation";
import React from "react";
import {Col, Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";

export function Page({children}) {
  return <Container>
    <Navigation/>
    <Row>
      <Col>
        {children}
      </Col>
    </Row>
  </Container>
}