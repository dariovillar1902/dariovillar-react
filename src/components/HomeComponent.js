import React, { useContext, useState, useEffect } from 'react';
import { Container, Image, Row } from 'react-bootstrap';
import fotoPerfil from '../assets/foto.jpeg';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import blackParticlesOptions from "../assets/blackParticles.json";
import lightParticlesOptions from '../assets/whiteParticles.json';
import { DarkModeContext } from './darkModeContext';
import { LanguageContext } from './languageContext';

export const HomeComponent = () => {
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
            // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
            // starting from v2 you can add only the features you need reducing the bundle size
            await loadFull(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);
    const { darkMode } = useContext(DarkModeContext);
    const { isSpanish } = useContext(LanguageContext);

    return (
        <Container fluid>
            <Row className='filaRelleno'>
                {init &&
                    <Particles
                        id="tsparticles"
                        options={darkMode ? blackParticlesOptions : lightParticlesOptions}
                    />}
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

