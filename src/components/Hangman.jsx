import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "./Hangman.css";
import { useState, useEffect } from "react";

const Keyboard = ({ guessedLetters, onLetterClick }) => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <Container>
      <Row className="justify-content-center">
        {Array.from({ length: 3 }).map((_, rowIndex) => (
          <Row key={rowIndex} className="justify-content-center">
            {letters
              .slice(rowIndex * 9, rowIndex * 9 + 9)
              .map((letter, index) => (
                <Col key={index} xs="auto" className="p-1">
                  <Button
                    variant={
                      guessedLetters.includes(letter) ? "secondary" : "primary"
                    }
                    disabled={guessedLetters.includes(letter)}
                    onClick={() => onLetterClick(letter)}
                    className="fw-bold text-uppercase"
                  >
                    {letter}
                  </Button>
                </Col>
              ))}
          </Row>
        ))}
      </Row>
    </Container>
  );
};

function Hangman({
  guessedLetters,
  setGuessedLetters,
  word,
  setWord,
  lives,
  setLives,
  gameStatus,
  setGameStatus,
  getRandomWord,
}) {
  const maskedWord = word
    .split("")
    .map((letter) => (guessedLetters.includes(letter) ? letter : "_"))
    .join(" ");

  const handleLetterClick = (letter) => {
    if (!guessedLetters.includes(letter)) {
      setGuessedLetters([...guessedLetters, letter]);
    }
    if (!word.includes(letter)) {
      setLives(lives - 1);
    }
    if (lives === 0) {
      setGameStatus("lost"); //Maybe add a modal here
    }
  };

  useEffect(() => {
    getRandomWord().then((word) => {
      setWord(word);
      setGameStatus("playing");
    });
  }, []);

  const resetGame = () => {
    setGuessedLetters([]);
    setLives(11);
    setGameStatus("loading");
    getRandomWord().then((word) => {
      setWord(word);
      setGameStatus("playing");
    });
  };

  return (
    <Container fluid>
      <Row id="description" className="text-center">
        <Col>
          <h2 id="instructions-text">
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
        <Col className="d-flex flex-column align-items-center justify-content-center">
          <Row className="mb-3">
            <Col className="text-center">
              {gameStatus === "loading" ? (
                <h1 id="word-display">Loading...</h1>
              ) : (
                <h1 id="word-display">{maskedWord}</h1>
              )}
            </Col>
          </Row>
          <Row id="game-interface">
            <Col>
              <Keyboard
                guessedLetters={guessedLetters}
                onLetterClick={handleLetterClick}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <h3 id="lives-text">Lives: {lives}</h3>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Hangman;
