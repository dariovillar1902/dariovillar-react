import React, { useContext } from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import cvPhoto from "../assets/foto2.jpeg";
import { DarkModeContext } from './darkModeContext';
import { LanguageContext } from './languageContext';

const CVComponent = () => {
    const { darkMode } = useContext(DarkModeContext);
    const { isSpanish } = useContext(LanguageContext);

    return (
        <Container className={(darkMode ? 'darkBody' : 'lightBody') + ' divcv'}>
            <Row className='cvrow'>
                <Col md={4} className='divfoto'>
                    <Image src={cvPhoto} className='cvphoto' alt='Resume - Dario Villar' />
                </Col>
                <Col className='filaarriba'>
                    <h1 className="titulo infocontacto nombre"> Dario Villar </h1>
                    <h6 className="cvtext infocontacto">{isSpanish ? '19/02/2001' : '02/19/2001'} </h6>
                    <h6 className="cvtext infocontacto"> Buenos Aires, Argentina </h6>
                    <h6 className="cvtext infocontacto"> +54 9 113 003 4639 </h6>
                </Col>
                <Col className='filaarriba'>
                    <h6 className="cvtext linkscontacto"><i className='fas fa-envelope'></i> dario_villar2001@hotmail.com
                    </h6>
                    <h6 className="cvtext linkscontacto"><i className='fab fa-linkedin'></i> linkedin.com/in/dario-villar
                    </h6>
                    <h6 className="cvtext linkscontacto"><i className='fas fa-wifi'></i> dariovillar.vercel.app </h6>
                </Col>
            </Row>
            <Row className='cvrow'>
                <Col md={4} className='infoadicional'>
                    <h5 className="titulo tituloadicional"> {isSpanish ? 'Herramientas de Programación' : 'Development Tools'} </h5>
                    <p className="cvtext"> HTML5 </p>
                    <p className="cvtext"> CSS3 </p>
                    <p className="cvtext"> React </p>
                    <p className="cvtext"> TypeScript </p>
                    <p className="cvtext"> .NET/C# </p>
                    <p className="cvtext"> SQL </p>
                    <p className="cvtext"> Node.js </p>
                    <p className="cvtext"> PHP </p>
                    <p className="cvtext"> Python </p>
                    <p className='cvtext'> Angular </p>
                    <h5 className="titulo tituloadicional"> {isSpanish ? 'Programas y Aplicaciones' : 'Software & Apps'} </h5>
                    <p className="cvtext"> Microsoft Office </p>
                    <p className="cvtext"> AutoCAD </p>
                    <p className="cvtext"> RAM Elements </p>
                    <p className="cvtext"> Microsoft Azure </p>
                    <p className="cvtext"> Git/GitHub </p>
                    <p className="cvtext"> SketchUp </p>
                    <h5 className="titulo tituloadicional"> {isSpanish ? 'Idiomas' : 'Languages'} </h5>
                    <p className="cvtext"> {isSpanish ? 'Español nativo' : 'Native Spanish'} </p>
                    <p className="cvtext"> {isSpanish ? 'Inglés avanzado (nivel C1)' : 'Advanced English (C1 level)'} </p>
                    <p className="cvtext"> 183/190 - Cambridge FCE </p>
                </Col>
                <Col md={8} className='filaabajo'>
                    <h2 className="titulo"> {isSpanish ? 'Experiencia Laboral' : 'Work Experience'} </h2>
                    <h5 className="titulo"> ExxonMobil </h5>
                    <span className="cvtext"> {isSpanish ? 'Parte del equipo de Unconventional (exploración no convencional de petróleo) en el sector EMIT (ExxonMobil IT). Desarrollos web en React y C# para la exploración de pozos petroleros y creación de planes estratégicos de negocio en las regiones de Permian, Delaware y Midland (Texas, EE.UU). Trabajo con metodología Agile/SCRUM, utilización de servicios provistos por Azure y GitHub y reuniones en inglés con equipos interdisciplinarios globales.' : 'Part of the UIT Team inside Unconventional Exploration (EMIT). Web development in React, TypeScript and C# for the exploration of oil and gas wells and creation of strategic business plans in the regions of Permian, Delaware and Midland (Texas, USA). Working with Agile/SCRUM methodologies, using cloud services provided by Azure and GitHub and meeting with global teams.'} </span>
                    <br />
                    <span className="cvtext"> {isSpanish ? 'Marzo 2022 - Actualidad' : 'March 2022 - Present Day'} </span>
                    <hr />
                    <h2 className="titulo"> {isSpanish ? 'Formación Académica' : 'Academic Background'} </h2>
                    <h5 className="titulo"> {isSpanish ? 'Ingeniería Civil' : 'Civil Engineering'} </h5>
                    <span className="cvtext"> {isSpanish ? 'UTN FRBA (Universidad Tecnológica Nacional, Facultad Regional Buenos Aires) - Buenos Aires, Argentina' : 'UTN FRBA (National Technological University, Buenos Aires branch) - Buenos Aires, Argentina'}
                    </span>
                    <br />
                    <span className="cvtext"> {isSpanish ? 'Actualmente en 5° año - Materias aprobadas: 28/46 - Promedio: 8.12/10' : 'Currently in 5th year - Completed subjects: 28/46 - Average score: 8.12/10'}
                    </span>
                    <br />
                    <span className="cvtext"> {isSpanish ? '2019 - Actualidad' : '2019 - Present day'} </span>
                    <h5 className="titulo"> {isSpanish ? 'Bachillerato Bilingüe con Orientación en Informática y Administración de Empresas' : 'Bilingual High School Diploma oriented to Computer Science and Business Administration'} </h5>
                    <span className="cvtext"> Colegio Schönthal - Buenos Aires, Argentina </span>
                    <br />
                    <span className="cvtext"> {isSpanish ? 'Mejor promedio de Inglés - Promedio final general: 9.15/10' : 'Best English average score - Final GPA: 9.15/10'} </span>
                    <br />
                    <span className="cvtext"> 2014 – 2018 </span>
                    <hr />
                    <h2 className="titulo"> {isSpanish ? 'Cursos y certificaciones' : 'Courses and Certifications'} </h2>
                    <h5 className="titulo"> {isSpanish ? 'Cursos de Desarrollo Web' : 'Web Development Courses'} </h5>
                    <span className="cvtext textoCurso"> {isSpanish ? 'Pluralsight (Marzo 2022 a Diciembre 2022 - 57 horas)' : 'Pluralsight (March 2022 to December 2022 - 57 hours)'} </span>
                    <h5 className="titulo"> AZ-900 Azure Fundamentals </h5>
                    <span className="cvtext textoCurso"> {isSpanish ? 'Microsoft (Junio 2022 - 11 horas)' : 'Microsoft (June 2022 - 11 hours'} </span>
                    <h5 className="titulo"> The Bits and Bytes of Computer Networking </h5>
                    <span className="cvtext textoCurso"> {isSpanish ? 'Google/Coursera (Enero 2022 - 36 horas)' : 'Google/Coursera (January 2022 - 36 hours)'}</span>
                    <h5 className="titulo"> {isSpanish ? 'Desarrollador .NET' : '.NET Development'} </h5>
                    <span className="cvtext textoCurso"> {isSpanish ? 'UTN FRBA/Becas NEORIS (Octubre 2021 a Diciembre 2021 - 96 horas)' : 'UTN FRBA/Becas NEORIS (October 2021 to December 2021 - 96 hours)'}
                    </span>
                    <h5 className="titulo"> {isSpanish ? 'React: de Cero a Experto' : 'React: from Zero to Expert'} </h5>
                    <span className="cvtext textoCurso"> {isSpanish ? 'Udemy (Noviembre 2021 - 49 horas)' : 'Udemy (November 2021 - 49 hours)'} </span>
                    <h5 className="titulo"> Technical Support Fundamentals </h5>
                    <span className="cvtext textoCurso"> {isSpanish ? 'Google/Coursera (Agosto 2021 - 40 horas)' : 'Google/Coursera (August 2021 - 40 hours)'} </span>
                    <h5 className="titulo"> {isSpanish ? 'Conviértete en Desarrollador Web Full-Stack' : 'Become a Full-Stack Web Developer'} </h5>
                    <span className="cvtext textoCurso"> {isSpanish ? 'LinkedIn Learning (Febrero 2021 - 31 horas)' : 'LinkedIn Learning (February 2021 - 31 hours)'} </span>
                    <h5 className="titulo"> The Complete Web Developer Course 2.0 </h5>
                    <span className="cvtext textoCurso"> {isSpanish ? 'Udemy (Marzo 2018 - 30 horas)' : 'Udemy (March 2018 - 30 hours)'} </span>
                </Col>
            </Row>

        </Container>
    )
}

export default CVComponent;