import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import Header from "./components/Header";
import Hangman from "./components/Hangman";
import Difficulty from "./components/Difficulty";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function App() {
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [word, setWord] = useState("");
  const [lives, setLives] = useState(11);
  const [gameStatus, setGameStatus] = useState("loading");
  const [difficulty, setDifficulty] = useState("easy");

  const getRandomWord = async () => {
    try {
      const response = await fetch(
        "https://random-word-api.herokuapp.com/word"
      );
      const data = await response.json();
      return data[0];
    } catch (error) {
      console.error("Error fetching random word:", error);
      return "REACT";
    }
  };

  const startGame = () => {
    getRandomWord().then((word) => {
      setWord(word);
      setGameStatus("playing");
      setGuessedLetters([]);
      setLives(11);
    });
  };

  const resetGame = () => {
    setGuessedLetters([]);
    setLives(11);
    setGameStatus("loading");
    getRandomWord().then((word) => {
      setWord(word);
      setGameStatus("playing");
    });
  };

  const handleDifficulty = (difficulty) => {
    setDifficulty(difficulty);
    const lives = {
      easy: 11,
      medium: 8,
      hard: 5,
    };
    setLives(lives[difficulty]);
  };

  return (
    <Container fluid className="px-0">
      <Row>
        <Col>
          <Header />
        </Col>
      </Row>
      <Row>
        <Col>
          <Difficulty
            startGame={startGame}
            resetGame={resetGame}
            handleDifficulty={handleDifficulty}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Hangman
            guessedLetters={guessedLetters}
            setGuessedLetters={setGuessedLetters}
            word={word}
            setWord={setWord}
            lives={lives}
            setLives={setLives}
            gameStatus={gameStatus}
            setGameStatus={setGameStatus}
            getRandomWord={getRandomWord}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
