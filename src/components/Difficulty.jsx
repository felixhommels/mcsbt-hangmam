import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import "./difficulty.css";

function Difficulty() {
  const [difficulty, setDifficulty] = useState("easy");
  const [isClicked, setIsClicked] = useState(false);

  const handleDifficulty = (difficulty) => {
    setDifficulty(difficulty);
  };

  return (
    <Container fluid>
      <Row className="w-100" id="difficulty-row">
        <Col className="d-flex" id="difficulty-col">
          <Button
            id="easy-btn"
            onClick={() => handleDifficulty("easy")}
            className={!isClicked ? "pulsate" : ""}
          >
            Easy
          </Button>
          <Button
            id="medium-btn"
            onClick={() => handleDifficulty("medium")}
            className={!isClicked ? "pulsate" : ""}
          >
            Medium
          </Button>
          <Button
            id="hard-btn"
            onClick={() => handleDifficulty("hard")}
            className={!isClicked ? "pulsate" : ""}
          >
            Hard
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Difficulty;
