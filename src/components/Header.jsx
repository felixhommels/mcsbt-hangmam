// Colors: https://coolors.co/add7f6-87bfff-3f8efc-2667ff-3b28cc

import { useState, useRef } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import "./header.css";
import { motion } from "framer-motion";

function Header() {
  return (
    <Container fluid>
      <Row>
        <Col className="d-flex align-items-center">
          <img
            src="./images/welcome.gif"
            alt="welcomegif"
            style={{ width: "100px", marginLeft: "10px" }}
          />
          <motion.h1
            className="text-3xl font-bold"
            animate={{
              x: [0, -5, 5, -5, 5, 0], // Moves left & right randomly
              y: [0, -5, 5, -5, 5, 0], // Moves up & down randomly
              rotate: [0, 2, -2, 2, -2, 0], // Slight tilting effect
            }}
            transition={{
              duration: 2,
              repeat: Infinity, // Loops forever
              ease: "easeInOut",
            }}
          >
            Hangman
          </motion.h1>
        </Col>
        <Col className="d-flex align-items-center justify-content-end">
          2 of 2
        </Col>
      </Row>
    </Container>
  );
}

export default Header;
