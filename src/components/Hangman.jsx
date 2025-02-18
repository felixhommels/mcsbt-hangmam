import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "./Hangman.css";
import { useState, useEffect } from "react";
import languageText from "../../language_text.json";
import imageMapping from "../../image_order.json";
import Modal from "react-bootstrap/Modal";

const Keyboard = ({ guessedLetters, onLetterClick, disabled }) => {
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
                    disabled={disabled || guessedLetters.includes(letter)}
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
  language,
  difficulty,
  resetGame,
}) {
  const [showModal, setShowModal] = useState(false);

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
      if (lives <= 1) {
        setGameStatus("lost");
        setShowModal(true);
      }
    }
  };

  useEffect(() => {
    getRandomWord(language).then((word) => {
      setWord(word);
      setGameStatus("playing");
    });
  }, []);

  const getHangmanImage = (lives, difficulty) => {
    const difficultyImages = imageMapping[difficulty]?.images;
    if (!difficultyImages) return "./images/hangman11.png"; // fallback image

    const maxLives = difficultyImages.length - 1;
    const imageIndex = Math.max(0, maxLives - lives);
    const imageName = difficultyImages[imageIndex];
    return imageName ? `./images/${imageName}` : "./images/hangman11.png";
  };

  return (
    <Container fluid>
      <Row id="description" className="text-center">
        <Col>
          <h2 id="instructions-text">{languageText[language].instructions}</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <img
            src={getHangmanImage(lives, difficulty)}
            alt={`hangman with ${lives} lives remaining`}
            style={{ width: "80%" }}
          />
        </Col>
        <Col className="d-flex flex-column align-items-center justify-content-center">
          <Row className="mb-3">
            <Col className="text-center">
              {gameStatus === "empty" ? (
                <h1 id="word-display">
                  {languageText[language].choose_difficulty}
                </h1>
              ) : gameStatus === "loading" ? (
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
                disabled={gameStatus === "empty"}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <h3 id="lives-text">
                {languageText[language].lives} {lives}
              </h3>
            </Col>
          </Row>
        </Col>
      </Row>
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{languageText[language].game_over}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {languageText[language].word_was} {word}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              setShowModal(false);
              resetGame();
            }}
          >
            {languageText[language].play_again}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Hangman;
