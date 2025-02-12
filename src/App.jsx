import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import Header from "./components/Header";
import Hangman from "./components/Hangman";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function App() {
  return (
    <Container fluid className="px-0">
      <Row>
        <Col>
          <Header />
        </Col>
      </Row>
      <Row>
        <Col>
          <Hangman />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
