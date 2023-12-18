import React, { useCallback, useContext } from 'react';
import { Container, Image, Row } from 'react-bootstrap';
import fotoPerfil from '../assets/foto.jpeg';
import Particles from 'react-tsparticles';
import { loadFull } from "tsparticles";
import blackParticlesOptions from "../assets/blackParticles.json";
import lightParticlesOptions from '../assets/whiteParticles.json';
import { DarkModeContext } from './darkModeContext';
import { LanguageContext } from './languageContext';

export const HomeComponent = () => {
    const particlesInit = useCallback(main => {
        loadFull(main);
    }, [])
    const { darkMode } = useContext(DarkModeContext);
    const { isSpanish } = useContext(LanguageContext);

    return (
        <Container fluid>
            <Row className='filaRelleno'>
                <Particles options={darkMode ? blackParticlesOptions : lightParticlesOptions} init={particlesInit} />
                <div id='elementosSuperpuestos'>
                    <Image src={fotoPerfil} className='foto' alt='logo' />
                    <p className='gradienteTexto'> Darío Villar </p>
                    <p className='otroTexto' style={{ whiteSpace: "pre-line" }}> {isSpanish ? 'Estudiante de Ingeniería Civil \n Desarrollador Web Full-Stack' : `Civil Engineering Student \n Full-Stack Web Developer`} </p>
                    <a className="linksContacto" id="linkedin" href="https://www.linkedin.com/in/dario-villar"><i className='fab fa-linkedin'></i></a>
                    <a className="linksContacto" id="github" href="https://github.com/dariovillar1902"><i className='fab fa-github'></i></a>
                </div>
            </Row>
        </Container>

    )
}
