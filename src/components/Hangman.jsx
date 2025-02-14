import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

function Hangman() {
  return (
    <Container fluid>
      <Row id="description" className="text-center">
        <Col>
          <h2>
            Guess the hidden word before the man in hanged! The harder the
            level, the less lives you have. Choose wisely!
          </h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <img
            src="./images/hangman11.png"
            alt="hangman1"
            style={{ width: "80%" }}
          />
        </Col>
        <Col>
          <Row id="game-interface"></Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Hangman;
