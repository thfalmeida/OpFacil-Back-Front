import React from "react";
import { Container } from "react-bootstrap";

import './homePage.css'

export default function HomeIndex(){
    return (
        <Container className="home-body">
        <img
            src="./img.png"
            width="60%"
            alt="Logo"
        />
        <h1><strong>OPFácil</strong></h1>
    </Container>
    )
}