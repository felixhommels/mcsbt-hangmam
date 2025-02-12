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

function Header() {
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

  //   Off Canvas Functions
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
            Hangman
          </motion.h1>
        </Col>
        <Col className="d-flex align-items-center justify-content-end">
          <Button
            variant="primary"
            onClick={handleShow}
            className="highscore-btn me-2"
          >
            Highscores
          </Button>
          <Offcanvas show={show} onHide={handleClose} placement="end">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title className="offcanvas-title">
                Highscores
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              {/* Add your highscores content here with element creation */}
            </Offcanvas.Body>
          </Offcanvas>
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
