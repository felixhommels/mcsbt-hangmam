import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Hangman from "./components/Hangman";
import Difficulty from "./components/Difficulty";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function App() {
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [word, setWord] = useState("");
  const [lives, setLives] = useState(0);
  const [gameStatus, setGameStatus] = useState("empty");
  const [difficulty, setDifficulty] = useState(null);
  const [language, setLanguage] = useState("en");
  const [wordIsGuessed, setWordIsGuessed] = useState(false);
  const [highscores, setHighscores] = useState(() => {
    const savedScores = localStorage.getItem("hangmanHighscores");
    return savedScores ? JSON.parse(savedScores) : [];
  });

  useEffect(() => {
    localStorage.setItem("hangmanHighscores", JSON.stringify(highscores));
  }, [highscores]);

  const updateHighscores = (difficulty, remainingLives) => {
    const score = {
      difficulty,
      remainingLives,
      word,
    };

    const newHighscores = [...highscores, score]
      .sort((a, b) => {
        if (a.difficulty !== b.difficulty) {
          return (
            ["easy", "medium", "hard"].indexOf(b.difficulty) -
            ["easy", "medium", "hard"].indexOf(a.difficulty)
          );
        }
        return b.remainingLives - a.remainingLives;
      })
      .slice(0, 10);

    setHighscores(newHighscores);
  };

  const getRandomWord = async (language) => {
    const baseUrl = "https://random-word-api.herokuapp.com/word";
    const url = language === "en" ? baseUrl : `${baseUrl}?lang=${language}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      return data[0].toUpperCase();
    } catch (error) {
      console.error("Error fetching random word:", error);
      return "REACT";
    }
  };

  const startGame = () => {
    const lives = {
      easy: 11,
      medium: 8,
      hard: 5,
    };
    setLives(lives[difficulty]);
    setGameStatus("loading");
    getRandomWord(language)
      .then((word) => {
        setWord(word);
        setGameStatus("playing");
        setGuessedLetters([]);
      })
      .catch((error) => {
        console.error("Start game error:", error);
        setGameStatus("error");
      });
  };

  const resetGame = () => {
    setGuessedLetters([]);
    setGameStatus("empty");
    setWord("");
    setLives(0);
    setDifficulty(null);
    setWordIsGuessed(false);
  };

  const handleDifficulty = (difficulty) => {
    setDifficulty(difficulty);
  };

  return (
    <Container fluid className="px-0">
      <Row>
        <Col>
          <Header
            language={language}
            setLanguage={setLanguage}
            onReset={resetGame}
            highscores={highscores}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Difficulty
            handleDifficulty={handleDifficulty}
            startGame={startGame}
            resetGame={resetGame}
            language={language}
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
            language={language}
            difficulty={difficulty}
            resetGame={resetGame}
            updateHighscores={updateHighscores}
            wordIsGuessed={wordIsGuessed}
            setWordIsGuessed={setWordIsGuessed}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
