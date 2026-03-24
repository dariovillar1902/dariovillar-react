import React, { useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import sobreMi from "../data/sobreMi.json";
import { DarkModeContext } from './darkModeContext';
import { LanguageContext } from './languageContext';
import { SobreMiItemComponent } from './SobreMiItemComponent';

export const SobreMiComponent = () => {
    const { darkMode } = useContext(DarkModeContext);
    const { isSpanish } = useContext(LanguageContext);

    return (
        <Container fluid className={darkMode ? 'darkBody' : 'lightBody'} >
            <Row id='sobreMi'>
                <Col md={10}>
                    <h1 id='tituloSobreMi'> {isSpanish ? 'Sobre Mi' : 'About Me'} </h1>
                    <p className='descripcion textoClaro' id='descripcionSobreMi'> {isSpanish ? 'Soy Darío Villar, vivo en Buenos Aires, Argentina. Completé 45 de las 46 materias de Ingeniería Civil en la UTN FRBA y me resta únicamente el Proyecto Final para graduarme. Actualmente soy Lead Software Engineer, con experiencia en equipos globales en empresas como Chevron, Essen Aluminio y ExxonMobil. Mis objetivos son continuar creciendo como líder técnico en el desarrollo web full-stack, expandiendo mis habilidades y aportando valor en proyectos de alto impacto. En el futuro, me gustaría combinar mi experiencia en desarrollo con el ámbito de la Ingeniería Civil y la industria de la construcción.' : 'I am Dario Villar, I live in Buenos Aires, Argentina. I have completed 45 out of 46 subjects of my Civil Engineering degree at the National Technological University in Buenos Aires, and only need to complete my Final Project to graduate. I am currently a Lead Software Engineer, with experience in global teams at companies such as Chevron, Essen Aluminio, and ExxonMobil. My goals are to continue growing as a technical leader in full-stack web development, expanding my skills and adding value in high-impact projects. In the future, I would like to combine my development experience with the field of Civil Engineering and the construction industry.'} </p>
                </Col>
            </Row>
            {(sobreMi.map((item, index) => {
                return <SobreMiItemComponent
                    key={index}
                    item={item}
                />
            }))}
        </Container>

    )
}
