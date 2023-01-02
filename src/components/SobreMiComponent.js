import React, { useContext, useRef, useState } from 'react';
import { Container, Image, Row, Col, Tooltip, Overlay } from 'react-bootstrap';
import fotoConst from '../assets/fotoconst.jpg';
import fotoDev from '../assets/fotodev.jpg';
import fotoExxon from '../assets/fotoexxon.jpg';
import CounterComponent from './CounterComponent';
import { DarkModeContext } from './darkModeContext';
import { LanguageContext } from './languageContext';

export const SobreMiComponent = () => {
    const { darkMode } = useContext(DarkModeContext);
    const { isSpanish } = useContext(LanguageContext);
    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);
    const target1 = useRef(null);
    const target2 = useRef(null);
    const target3 = useRef(null);

    return (
        <Container fluid className={darkMode ? 'darkBody' : 'lightBody'} >
            <Row id='sobreMi'>
                <Col md={10}>
                    <h1 id='tituloSobreMi'> {isSpanish ? 'Sobre Mi' : 'About Me'} </h1>
                    <p className='descripcion textoClaro' id='descripcionSobreMi'> {isSpanish ? 'Soy Darío Villar, vivo en Buenos Aires, Argentina. Soy estudiante de 5° año de Ingeniería Civil en la UTN FRBA y Desarrollador Web Full-Stack dentro del sector de Unconventional IT en ExxonMobil. Mis objetivos son continuar adquiriendo experiencia en el ámbito laboral de la programación web full-stack, expandiendo mis habilidades técnicas y soft skills y trabajando en conjunto con equipos globales para agregar valor a los distintos proyectos de los que participo. En el futuro, me gustaría combinar mi experiencia en desarrollo web full-stack con el ámbito de la Ingeniería Civil y la industria de la construcción.' : 'I am Dario Villar, I live in Buenos Aires, Argentina. I am a fifth-year student of Civil Engineering at the National Technological University in Buenos Aires and a Full-Stack web developer in the Unconventional IT sector at ExxonMobil. My goals are to continue gaining experience in the work field of full-stack web development, expanding my technical and soft skills and working together with global teams to add value to the different projects I am a part of. In the future, I would like to combine my experience in Full-Stack web development with the work field of Civil Engineering and the construction industry.'} </p>
                </Col>
            </Row>
            <Row id='descripcionTrabajo'>
                <Col md={5}>
                    <h2 className="textoClaro" id="tituloDesarrollo"> {isSpanish ? 'Pasantía IT en ExxonMobil' : 'IT Internship at ExxonMobil'} </h2>
                    <p className='descripcion textoClaro' id="descripcionDes"> {isSpanish ? 'En Marzo de 2022 comencé mi pasantía en el equipo de Modern Application Development, en el sector de Unconventional IT (exploración no convencional). Trabajo en un equipo global, con reuniones en inglés y bajo la metodología Agile/SCRUM, en contacto constante con los clientes y atendiendo a sus necesidades y requerimientos. Mi tarea es realizar la migración y el soporte de aplicaciones como NextPlan, DVT y SACS de un framework .NET MVC a frontend en React y TypeScript con API C# en el backend y conexión a la base de datos a través de Entity Framework. NextPlan es una aplicación de uso interno para permitir la toma de decisiones estratégicas a los responsables del planeamiento del sector Unconventional, y está alojada en la plataforma cloud Microsoft Azure. En el equipo se cumple con los estándares y las buenas prácticas de la industria, como Pair Programming, testeos del frontend a través de Jest, control de versiones en GitHub y documentación del código.' : 'In March 2022 I started my internship in the Modern Application Development team, part of the Unconventional IT sector, for unconventional exploration of oil and gas. I am working in a global team, with meetings in English and under the Agile/SCRUM methodology, connecting with the customers and meeting their needs and requirements. My assignments include completing the migration and support of applications like NextPlan, DVT and SACS, using .NET MVC for the older ones and React and TypeScript with a C# API for the newer ones. The apps connect to different databases via Entity Framework and SQL stored procedures. NextPlan is an application for internal use, which lets Development Planners make decisions and plan ahead based on data. This website is stored on Microsoft Azure. Our team fulfills the industry standards for coding and software best practices, including Pair Programming, frontend testing with Jest, version control through GitHub and code documentation.'}  </p>
                </Col>
                <Col md={5} className='divFoto'>
                    <Image src={fotoExxon} className="fotoSobreMi animate__animated animate__bounceIn" alt='Web Development' />
                </Col>
            </Row>
            <Row id='detalleTrabajo'>
                <Col md={5}>
                    <h3><CounterComponent countTo={19} />/24 </h3>
                    <p className='descripcion textoClaro' id="descripcionCursos"> {isSpanish ? 'sprints completados' : 'completed sprints'}  </p>
                    <h3><CounterComponent countTo={29} /></h3>
                    <p className='descripcion textoClaro' id="descripcionHoras"> {isSpanish ? 'aplicaciones soportadas' : 'supported apps'}  </p>
                    <h3><CounterComponent countTo={14} /></h3>
                    <p className='descripcion textoClaro' id="descripcionProyectos"> {isSpanish ? 'personas en el equipo de MAD' : 'people in the MAD team'}  </p>
                </Col>
                <Col md={5} className='divProgreso'>
                    <Overlay target={target1.current} show={show1} placement="top">
                        {(props) => (
                            <Tooltip id="overlay-example" {...props} style={{ position: 'absolute', ...props.style }} >
                                19/24 (79,17%)
                            </Tooltip>
                        )}
                    </Overlay>
                    <div className={(darkMode ? 'darkProgress' : 'lightProgress') + ' progress'} ref={target1} onMouseEnter={() => setShow1(!show1)} onMouseLeave={() => setShow1(!show1)}>
                        <div className={'progress-value ' + (darkMode ? 'darkProgressValue' : 'lightProgressValue')} id="progress1"></div>
                    </div>
                    <button className="verMas"><a href="https://www.linkedin.com/in/silvina-alejandra-dalchiele-8284a012a/" className='verMasLink' id="botonCertificados"> {isSpanish ? 'Pedir referencias' : 'Ask for references'}  </a></button>
                    <button className="verMas"><a href="portfolio" className='verMasLink' id="botonProyectos"> {isSpanish ? 'Ver mis contribuciones' : 'See my contributions'}  </a></button>
                </Col>
            </Row>
            <hr className='lineaHorizontal' />
            <Row id='descripcionDesarrollo'>
                <Col md={5} className='divFoto'>
                    <Image src={fotoDev} className="fotoSobreMi animate__animated animate__bounceIn" alt='Web Development' />
                </Col>
                <Col md={5}>
                    <h2 className="textoClaro" id="tituloDesarrollo"> {isSpanish ? 'Desarrollo Web Full-Stack' : 'Full-Stack Web Development'}  </h2>
                    <p className='descripcion textoClaro' id="descripcionDes"> {isSpanish ? 'Siempre me interesó la programación, y en particular el desarrollo web. Desde los 15 años hice cursos en forma completamente autodidacta y desarrollé múltiples sitios web para proyectos personales, para amigos y conocidos e incluso para trabajos del colegio secundario y de la universidad. Aprendí lenguajes y herramientas de programación como HTML5, CSS3, JavaScript, jQuery, Bootstrap, WordPress, PHP, mySQL, Python, Node, React, .NET, Git/GitHub, Angular, entre otras tecnologías. Los cursos son de diversas plataformas, incluyendo la UTN FRBA (a través del programa Becas NEORIS), Udemy, LinkedIn Learning, Coursera, Pluralsight, entre otras. En la actualidad estoy aprendiendo más sobre Angular y Python, además de CI/CD a través de Azure DevOps y GitHub.' : 'I was always interested in coding, especially in web development. Since I was 15 years old I took courses in a completely self-taught way, developing many websites for personal projects, friends and family and even for school and college projects. I learned development languages and tools such as HTML5, CSS3, JavaScript, jQuery, Bootstrap, WordPress, PHP, mySQL, Python, Node, React, .NET, Git/GitHub, Angular, among other technologies. The courses are from different platforms, including UTN FRBA (through the Becas NEORIS program), Udemy, LinkedIn Learning, Coursera, Pluralsight, among others. Currently, I am learning more about Angular and Python, plus CI/CD through Azure DevOps and GitHub.'} </p>
                </Col>
            </Row>
            <Row id='detalleDesarrollo'>
                <Col md={5} className='divProgreso'>
                    <Overlay target={target2.current} show={show2} placement="top">
                        {(props) => (
                            <Tooltip id="overlay-example2" {...props} style={{ position: 'absolute', transform3d: '1024px 1936px 0px', ...props.style }} >
                                350/702 (49,86%)
                            </Tooltip>
                        )}
                    </Overlay>

                    <div className={(darkMode ? 'darkProgress' : 'lightProgress') + ' progress'} ref={target2} onMouseEnter={() => setShow2(!show2)} onMouseLeave={() => setShow2(!show2)}>
                        <div className={'progress-value ' + (darkMode ? 'darkProgressValue' : 'lightProgressValue')} id="progress2"></div>
                    </div>
                    <button className="verMas"><a href="contacto" className='verMasLink' id="botonCertificados"> {isSpanish ? 'Ver mis certificados' : 'Watch my certificates'}  </a></button>
                    <button className="verMas"><a href="portfolio" className='verMasLink' id="botonProyectos"> {isSpanish ? 'Ver mis proyectos' : 'Watch my projects'}  </a></button>
                </Col>
                <Col md={5}>
                    <h3><CounterComponent countTo={38} />/75 </h3>
                    <p className='descripcion textoClaro' id="descripcionCursos"> {isSpanish ? 'cursos y certificaciones' : 'courses and certifications'}  </p>
                    <h3><CounterComponent countTo={350} />/702 </h3>
                    <p className='descripcion textoClaro' id="descripcionHoras"> {isSpanish ? 'horas de clase' : 'hours of lessons'}  </p>
                    <h3><CounterComponent countTo={11} /> </h3>
                    <p className='descripcion textoClaro' id="descripcionProyectos"> {isSpanish ? 'proyectos realizados' : 'created projects'}  </p>
                </Col>
            </Row>
            <hr className='lineaHorizontal' />
            <Row id='descripcionIngenieria'>
                <Col md={5}>
                    <h2 className="textoClaro" id='tituloIngenieria'> {isSpanish ? 'Ingeniería Civil' : 'Civil Engineering'}  </h2>
                    <p className='descripcion textoClaro' id='descripcionIng'> {isSpanish ? 'Estoy en el quinto nivel de un plan de 6 niveles. En el futuro, planeo seguir la orientación de Vías de Comunicación y dedicarme a la Ingeniería en Transporte. Asisto a clases en la Universidad Tecnológica Nacional, Facultad Regional Buenos Aires. Entré a la facultad en 2019, por lo que tuve un año de cursada presencial y dos virtuales, y en 2022 regresé a la presencialidad. Aprendí mucho sobre los distintos ámbitos de la Ingeniería, incluyendo ciencias básicas, cálculo y análisis de estructuras, tecnologías y técnicas relacionadas con materiales y construcción, cálculo y distribución de instalaciones domiciliarias, diseño y estudio de proyectos. Además, la facultad me preparó mucho para el trabajo en grupo, así como para la confección de documentación de obra a través de AutoCAD, planillas Excel, Mathcad, RAM Elements, entre otros programas.' : 'I am in the fifth year of my university courses, from a 6-year degree. In the future, I plan to follow the Means of Transport profile and work in Transport Engineering. I attend courses at the National Technological University, in Buenos Aires. I started my career in 2019, so I only had a year of in-person courses, and two years online. In 2022 I returned to the University to have in-person lessons again. I learned greatly about different aspects of Engineering, including basic Math and Physics, structural analysis and technologies related to materials and construction. Moreover, my university prepared me to work in a team, as well as to make blueprints and other documents needed for building, through AutoCAD, Excel spreadsheets, Mathcad, RAM Elements, among other programs and applications.'}  </p>
                </Col>
                <Col md={5} className='divFoto'>
                    <Image src={fotoConst} className="fotoSobreMi animate__animated animate__bounceIn" alt='Civil Engineering' />
                </Col>
            </Row>
            <Row id='detalleIngenieria'>
                <Col md={5}>
                    <h3><CounterComponent countTo={5} />{isSpanish ? '°' : 'th'}</h3>
                    <p className='descripcion textoClaro' id="descripcionAgno"> {isSpanish ? 'año de la carrera' : 'year of my degree'}  </p>
                    <h3><CounterComponent countTo={28} />/46 </h3>
                    <p className='descripcion textoClaro' id="descripcionMaterias"> {isSpanish ? 'materias completadas' : 'completed subjects'}  </p>
                    <h3><CounterComponent countTo={8} />.12 </h3>
                    <p className='descripcion textoClaro' id="descripcionPromedio"> {isSpanish ? 'promedio actual' : 'average score'}  </p>
                </Col>
                <Col md={5} className='divProgreso'>
                    <Overlay target={target3.current} show={show3} placement="top">
                        {(props) => (
                            <Tooltip id="overlay-example" {...props} style={{ position: 'absolute', ...props.style }} >
                                28/46 (60,87%)
                            </Tooltip>
                        )}
                    </Overlay>
                    <div className={(darkMode ? 'darkProgress' : 'lightProgress') + ' progress'} ref={target3} onMouseEnter={() => setShow3(!show3)} onMouseLeave={() => setShow3(!show3)}>
                        <div className={'progress-value ' + (darkMode ? 'darkProgressValue' : 'lightProgressValue')} id="progress3"></div>
                    </div>
                    <button className="verMas"><a href="comprobante.pdf" className='verMasLink' id="botonMateriasAprobadas"> {isSpanish ? 'Ver materias aprobadas' : 'Watch my completed subjects'}  </a></button>
                    <button className="verMas"><a href="trabajos.pdf" className='verMasLink' id="botonTrabajosRealizados"> {isSpanish ? 'Ver trabajos realizados' : 'Watch my Projects'}  </a></button>
                </Col>
            </Row>
        </Container>

    )
}
