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
                    <p className='descripcion textoClaro' id='descripcionSobreMi'> {isSpanish ? 'Soy Darío Villar, vivo en Buenos Aires, Argentina. Soy estudiante de 5° año de Ingeniería Civil en la UTN FRBA y Desarrollador Web Full-Stack dentro del sector de IT en Essen Aluminio. Mis objetivos son continuar adquiriendo experiencia en el ámbito laboral de la programación web full-stack, expandiendo mis habilidades técnicas y soft skills y trabajando en conjunto con equipos globales para agregar valor a los distintos proyectos de los que participo. En el futuro, me gustaría combinar mi experiencia en desarrollo web full-stack con el ámbito de la Ingeniería Civil y la industria de la construcción.' : 'I am Dario Villar, I live in Buenos Aires, Argentina. I am a fifth-year student of Civil Engineering at the National Technological University in Buenos Aires and a Full-Stack web developer in the IT sector at Essen Aluminium. My goals are to continue gaining experience in the work field of full-stack web development, expanding my technical and soft skills and working together with global teams to add value to the different projects I am a part of. In the future, I would like to combine my experience in Full-Stack web development with the work field of Civil Engineering and the construction industry.'} </p>
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
