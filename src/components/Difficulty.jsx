import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import "./difficulty.css";
import languageText from "../../language_text.json";

function Difficulty({ startGame, resetGame, handleDifficulty, language }) {
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
            {languageText[language].easy}
          </Button>
          <Button
            id="medium-btn"
            onClick={() => handleDifficultyClick("medium")}
            className={!isClicked ? "pulsate" : ""}
          >
            {languageText[language].medium}
          </Button>
          <Button
            id="hard-btn"
            onClick={() => handleDifficultyClick("hard")}
            className={!isClicked ? "pulsate" : ""}
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
