import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import "./difficulty.css";
import { CirclePlay, RotateCcw } from "lucide-react";

function Difficulty({ startGame, resetGame, handleDifficulty }) {
  const [isClicked, setIsClicked] = useState(false);

  const handleDifficultyClick = (difficultyLevel) => {
    handleDifficulty(difficultyLevel);
    setIsClicked(true);
  };

  const handleStart = () => {
    startGame();
  };

  const handleRestart = () => {
    resetGame();
    setIsClicked(false);
  };

  return (
    <Container fluid id="difficulty-container">
      <Row className="w-100" id="difficulty-row">
        <Col className="d-flex" id="difficulty-col">
          <Button
            id="easy-btn"
            onClick={() => handleDifficultyClick("easy")}
            className={!isClicked ? "pulsate" : ""}
          >
            Easy
          </Button>
          <Button
            id="medium-btn"
            onClick={() => handleDifficultyClick("medium")}
            className={!isClicked ? "pulsate" : ""}
          >
            Medium
          </Button>
          <Button
            id="hard-btn"
            onClick={() => handleDifficultyClick("hard")}
            className={!isClicked ? "pulsate" : ""}
          >
            Hard
          </Button>
          <Button className="utility-btn" onClick={handleStart}>
            Start
          </Button>
          <Button className="utility-btn" onClick={handleRestart}>
            Restart
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Difficulty;
