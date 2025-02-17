import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import "./difficulty.css";
import languageText from "../../language_text.json";

function Difficulty({ startGame, resetGame, handleDifficulty, language }) {
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);

  const handleDifficultyClick = (difficultyLevel) => {
    handleDifficulty(difficultyLevel);
    setSelectedDifficulty(difficultyLevel);
  };

  const handleStart = () => {
    startGame();
  };

  const handleRestart = () => {
    resetGame();
    setSelectedDifficulty(null);
  };

  return (
    <Container fluid id="difficulty-container">
      <Row className="w-100" id="difficulty-row">
        <Col className="d-flex" id="difficulty-col">
          <Button
            id="easy-btn"
            onClick={() => handleDifficultyClick("easy")}
            className={`difficulty-btn ${
              !selectedDifficulty ? "pulsate" : ""
            } ${selectedDifficulty === "easy" ? "active" : ""}`}
          >
            {languageText[language].easy}
          </Button>
          <Button
            id="medium-btn"
            onClick={() => handleDifficultyClick("medium")}
            className={`difficulty-btn ${
              !selectedDifficulty ? "pulsate" : ""
            } ${selectedDifficulty === "medium" ? "active" : ""}`}
          >
            {languageText[language].medium}
          </Button>
          <Button
            id="hard-btn"
            onClick={() => handleDifficultyClick("hard")}
            className={`difficulty-btn ${
              !selectedDifficulty ? "pulsate" : ""
            } ${selectedDifficulty === "hard" ? "active" : ""}`}
          >
            {languageText[language].hard}
          </Button>
          <Button className="utility-btn" onClick={handleStart}>
            {languageText[language].start}
          </Button>
          <Button className="utility-btn" onClick={handleRestart}>
            {languageText[language].restart}
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Difficulty;
