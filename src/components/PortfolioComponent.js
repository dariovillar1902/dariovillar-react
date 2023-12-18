import React, { useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { PortfolioItemComponent } from './PortfolioItemComponent';
import proyectos from "../data/proyectos.json";
import { DarkModeContext } from './darkModeContext';
import { LanguageContext } from './languageContext';

export const PortfolioComponent = () => {
    const { darkMode } = useContext(DarkModeContext);
    const { isSpanish } = useContext(LanguageContext);

    return (
        <Container fluid className={darkMode ? 'darkBody' : 'lightBody'}>
            <Row id='sobreMi'>
                <Col md={10}>
                    <h1> Portfolio </h1>
                    <p className='descripcion textoClaro' id="descripcionPortfolio"> {isSpanish ? 'En esta página se encuentran algunos de mis proyectos más recientes, realizados tanto a título personal como para familia y amigos, y para terceros, así como el trabajo realizado durante mi pasantía en ExxonMobil y mi tiempo en Essen Aluminio. Al hacer click en cada proyecto se pueden observar múltiples capturas de pantalla acompañadas de una breve descripción, la fecha en la que fue realizado y su duración, funciones o controles adicionales, las tecnologías utilizadas, y posibles mejoras para el futuro. Hay posibilidad de visitar cada página, y de ver su código en el repositorio correspondiente de GitHub.' : 'Some of my most recent projects are on this page, created for personal use, and for friends, family and third parties, as well as the websites supported during my internship at ExxonMobil and my time at Essen Aluminio. By clicking on each project you can see multiple screenshots, plus a brief description, the date in which the project was completed and how long it took, additional features, the tools and technology I used, and possible improvements for the future. There is a chance to visit every site, and to watch its code on the corresponding GitHub repository.'} </p>
                </Col>
            </Row>
            {(proyectos.map((proyecto, index) => {
                if (index % 3 === 0) {
                    let elementosEnFila = 0;
                    return <Row className='filaPortfolio'>
                        {
                            proyectos.map((proyecto, index2) => {
                                if (elementosEnFila < 3 && index2 >= index) {
                                    elementosEnFila++;
                                    return <Col lg={3}>
                                        <PortfolioItemComponent
                                            key={index}
                                            proyecto={proyecto}
                                        />
                                    </Col>
                                } else {
                                    return null;
                                }
                            })}
                    </Row>
                } else {
                    return null;
                }
            }))}

        </Container>
    )
}
