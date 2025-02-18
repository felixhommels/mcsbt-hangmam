// Colors: https://coolors.co/add7f6-87bfff-3f8efc-2667ff-3b28cc

import { useState, useRef, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import "./header.css";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import languageText from "../../language_text.json";

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
  { code: "pt", name: "Português", flag: "🇵🇹" },
  { code: "pt-br", name: "Português", flag: "🇧🇷" },
];

function Header({ language, setLanguage, onReset, highscores = [] }) {
  //   Audio Functions
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio("./audio/hangman_audio.mp3"));

  useEffect(() => {
    audioRef.current.loop = true;
  }, []);

  const toggleAudio = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    setLanguage(language.code);
    onReset();
  };

  function renderHighscores() {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>{languageText[language].rank}</th>
            <th>{languageText[language].difficulty}</th>
            <th>{languageText[language].lives}</th>
            <th>{languageText[language].word}</th>
          </tr>
        </thead>
        <tbody>
          {highscores.map((score, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{score.difficulty}</td>
              <td>{score.remainingLives}</td>
              <td>{score.word}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  return (
    <Container fluid className="navbar py-4">
      <Row className="w-100">
        <Col className="d-flex align-items-center">
          <img
            src="./images/welcome.gif"
            alt="welcomegif"
            style={{ width: "100px", marginLeft: "40px", marginRight: "40px" }}
          />
          <motion.h1
            className="title-text"
            animate={{
              x: [0, -5, 5, -5, 5, 0],
              y: [0, -5, 5, -5, 5, 0],
              rotate: [0, 2, -2, 2, -2, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {languageText[language].title}
          </motion.h1>
        </Col>
        <Col className="d-flex align-items-center justify-content-end">
          <Button
            variant="primary"
            onClick={handleShow}
            className="highscore-btn me-2"
          >
            {languageText[language].highscores}
          </Button>
          <Offcanvas show={show} onHide={handleClose} placement="end">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title className="offcanvas-title">
                {languageText[language].highscores}
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>{renderHighscores()}</Offcanvas.Body>
          </Offcanvas>
          <Dropdown>
            <Dropdown.Toggle className="language-dropdown">
              {`${selectedLanguage.flag} ${selectedLanguage.name}`}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {languages.map((language) => (
                <Dropdown.Item
                  key={language.code}
                  onClick={() => handleLanguageChange(language)}
                >
                  {`${language.flag} ${language.name}`}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <button
            id="audio-btn"
            onClick={toggleAudio}
            className="p-3 ms-4 hover:opacity-80"
          >
            {isPlaying ? <Volume2 size={28} /> : <VolumeX size={28} />}
          </button>
        </Col>
      </Row>
    </Container>
  );
}

export default Header;
