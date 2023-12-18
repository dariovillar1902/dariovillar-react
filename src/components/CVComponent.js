import React, { useContext } from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import cvPhoto from "../assets/foto2.jpeg";
import { DarkModeContext } from './darkModeContext';
import { LanguageContext } from './languageContext';

const CVComponent = () => {
    const { darkMode } = useContext(DarkModeContext);
    const { isSpanish } = useContext(LanguageContext);

    return (
        <Container className={(darkMode ? 'darkBody' : '') + ' divcv'}>
            <Row className='cvrow'>
                <Col md={3} className='divfoto'>
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
            <hr />
            <Row className='cvrow'>
                <Col md={12} className='filaabajo'>
                    <h2 className="titulo"> {isSpanish ? 'Experiencia Laboral' : 'Work Experience'} </h2>
                    <h5 className="titulo"> Essen Aluminio </h5>
                    <span className="cvtext titulo"> {isSpanish ? 'Full-Stack Web Developer (Julio 2023 - Actualidad)' : 'Full-Stack Web Developer (July 2023 - Present Day)'} </span>
                    <br />
                    <span className="cvtext"> {isSpanish ? 'Soporte y desarrollo de la página de uso interno de los Emprendedores, así como de proveedores y otras áreas de la empresa, para carga de pedidos, pagos con tarjetas de crédito y débito (integrada con múltiples medios de pago en Argentina, Bolivia, Chile, Paraguay, Perú y Uruguay), creación de reclamos de atención al cliente, visualización de reportes y gestión de su red y sus clientes. Manejo de tickets para agregado de nuevas funciones, resolución de errores, asignación de permisos y ayuda a operadores de Argentina y de las filiales internacionales. Desarrollo y modificación de stored procedures para conexión a base de datos, conexión con un sistema de gestión ERP, trabajo con metodologías ágiles.' : 'Development and support of the internally used website for Entrepreneurs, as well as suppliers and other areas of the company, for order placement, credit and debit card payments (integrated with multiple payment methods in Argentina, Bolivia, Chile, Paraguay, Peru and Uruguay), creation of customer service claims, visualization of reports and management of their network and their customers. Handling of tickets for addition of new functionalities, bug fixing, permission assignment and support for operators from Argentina and international branches. Development and alteration of stored procedures to connect to databases, connection with an ERP management system, work with Agile methodologies.'} </span>
                    <br />
                    <span className="cvtext"> {isSpanish ? 'Tecnologías y herramientas utilizadas: ' : 'Used tools and technologies: '} C#, ASP.NET, .NET Framework 4, JavaScript, GitLab, .NET Core 3.1, Entity Framework Core, SQL Server, Bootstrap, HTML5, CSS3.</span>
                    <hr />
                    <h5 className="titulo"> ExxonMobil </h5>
                    <span className="cvtext titulo"> {isSpanish ? 'Full-Stack Web Developer (Marzo 2022 - Julio 2023)' : 'Full-Stack Web Developer (March 2022 - July 2023)'} </span>
                    <br />
                    <span className="cvtext"> {isSpanish ? 'Integrante del equipo de Modern Application Development en Unconventional IT. Desarrollo y soporte de aplicaciones web de uso interno y externo para exploración no convencional de petróleo. Reuniones en inglés con equipos globales bajo la metodología Agile/SCRUM.' : 'Member of the Modern Application Development Team inside Unconventional IT. Development and support of internal and external web applications for unconventional oil and gas exploration. Meeting with global teams under the Agile/SCRUM methodology.'} </span>
                    <span className="cvtext"> {isSpanish ? 'Proyectos:' : 'Projects:'}</span>
                    <br />
                    <br />
                    <ul>
                        <li className="cvtext"><b> NextPlan: </b>{isSpanish ? 'NextPlan es una aplicación web que permite a los responsables de planeamiento y desarrollo de exploración no convencional la visualización y edición de datos para la creación de planes estratégicos de negocio. Parte del equipo responsable de la migración de la aplicación de framework ASP.NET MVC y Razor a React 17/TypeScript, con conexión a API que utiliza .NET 6 y Entity Framework Core. Responsable de la mejora de múltiples páginas, implementación de subida y descarga de archivos para actualización masiva de datos, ejecución de control de acceso basado en roles, testeo continuo de la aplicación con Jest.' : 'NextPlan is a web application that allows development planners for unconventional exploration the visualization and edition of data to create strategic business plans. I am part of the team that is responsible for migrating the application from ASP.NET MVC and Razor to React 17/TypeScript, with a connection to an API that uses .NET 6 and Entity Framework Core. Responsible for refactoring of multiple pages, implementation of file uploads and downloads for bulk updates, execution of role-based access control, testing of the application with Jest.'} </li>
                        <li className="cvtext"><b> Compressor: </b> {isSpanish ? 'Soporte y desarrollo de la aplicación web de uso interno para consumo de datos de compresores de gas. Parte del equipo responsable de la migración de la aplicación de framework ASP.NET MVC y Razor a React 18/TypeScript, con conexión a API que utiliza .NET 6 y Entity Framework Core. Responsable de corrección de datos incorrectos en la base de datos, creación de nuevas páginas y migración del repositorio de Azure DevOps a GitHub, testeo continuo de la aplicación con Jest.' : 'Development and support of the internally used application for data consumption about gas compressors. Part of the team responsible for migrating the application from ASP.NET MVC and Razor to React 18/TypeScript, which connects to an API that uses .NET 6 and Entity Framework Core. Responsible for fixing incorrect data points in the database, creation of new pages and migration of the repository from Azure DevOps to GitHub, testing of the application with Jest.'} </li>
                        {/*  <li className="cvtext"><b> ODA/ORDA: </b> {isSpanish ? 'Desarrollo de nuevos endpoints en dos APIs REST desarrolladas en .NET Core 3.1 que exponen operaciones relacionadas a datos de distintas fuentes como PVRC, NextField, Ignition, SCADA. Conexión a base de datos centralizada a través de stored procedures y SQL Server.' : 'Development of new endpoints in two REST APIs developed in .NET Core 3.1 which expose operations related to data from different sources such as PVRC, NextField, Ignition, SCADA. Connection to centralized database through stored procedures and SQL Server.'} </li> */}
                    </ul>
                    <span className="cvtext"> {isSpanish ? 'Tecnologías y herramientas utilizadas: ' : 'Used tools and technologies: '} React, TypeScript, .NET 6, C#, .NET Core 3.1, ASP.NET MVC, JavaScript, Microsoft Azure, GitHub, Entity Framework Core, SQL Server, Bootstrap, HTML5, CSS3.</span>
                    <hr />
                    <h2 className="titulo"> {isSpanish ? 'Formación Académica' : 'Academic Background'} </h2>
                    <h5 className="titulo"> {isSpanish ? 'UTN FRBA (Universidad Tecnológica Nacional - Facultad Regional Buenos Aires)' : 'UTN FRBA (National Technological University - Buenos Aires branch)'} </h5>
                    <span className="cvtext titulo"> {isSpanish ? 'Estudiante de Ingeniería Civil (2019 - Actualidad)' : 'Civil Engineering Student (2019 - Present day)'}
                    </span>
                    <br />
                    <span className="cvtext"> {isSpanish ? 'Actualmente en 5° año. 33 materias aprobadas de 46. Aprendizaje de conceptos de física, química, matemática, estadística, entre otras ciencias básicas. Nociones de cálculo estructural, tecnología de materiales, técnicas constructivas, proyecto arquitectónico y de instalaciones, estudios y ensayos de laboratorio sobre diversos temas relacionados con la industria de la construcción. Promedio general actual: 8.12/10' : 'Currently in 5th year. 33 out of 46 completed subjects. Learned about concepts of physics, chemistry, mathematics, statistics, among other basic sciences. Notions of structural calculation, materials technology, construction techniques, architectural projects and water, gas and air conditioning facilities, laboratory tests and research on various topics related to the construction industry. Overall average score: 8.12/10'}
                    </span>
                    <br />
                    <span className="cvtext"> {isSpanish ? 'Tecnologías y herramientas utilizadas: ' : 'Used tools and technologies: '} AutoCAD 2D, AutoCad 3D, RAM Elements, Civil 3D, SketchUp, Revit, Excel. </span>
                    {/* <h5 className="titulo"> {isSpanish ? 'Colegio Schönthal' : 'Schönthal Institute'} </h5>
                    <span className="cvtext titulo"> {isSpanish ? 'Bachillerato Bilingüe con Orientación en Informática y Administración de Empresas (2014 - 2018)' : 'Bilingual High School Diploma oriented to Computer Science and Business Administration (2014 - 2018)'} </span>
                    <br />
                    <span className="cvtext"> {isSpanish ? 'Conocimientos básicos de programación orientada a objetos, desarrollo de videojuegos, arquitectura de computadoras, robótica y circuitos eléctricos, modelado 3D, edición de video. Conceptos elementales de contabilidad, administración de empresas, marketing, economía, gestión de proyectos y organizaciones. Inglés bilingüe, mejor promedio de inglés. Ganador de concursos de programación Dale Aceptar y Mini Copa Turing. Doble mención en Olimpíada Matemática Argentina. Promedio final general: 9.15/10' : 'Basic knowledge of object-oriented programming, video game development, software and hardware architecture, robotics and electrical circuits, 3D modeling, video editing. Elementary concepts of accounting, business administration, marketing, economics, projects and organizations management. Bilingual English, best English average score. Winner of programming contests Dale Aceptar and Mini Copa Turing. Double mention in Argentine Mathematical Olympiad. Overall final average score: 9.15/10'}
                    </span> */}
                    <h5 className="titulo"> Cambridge English Language Assessment </h5>
                    <span className="cvtext titulo"> First Certificate in English (2016) </span>
                    <br />
                    <span className="cvtext"> {isSpanish ? 'Nivel C1. Nota A (aprobado con distinción). Reading and Writing: 180/190. Use of English: 186/190. Listening: 190/190. Speaking: 177/190. Puntaje general: 183/190.' : 'Level C1. Grade A (passed with distinction). Reading and Writing: 180/190. Use of English: 186/190. Listening: 190/190. Speaking: 177/190. Overall score: 183/190.'}
                    </span>
                    <hr />
                    <h2 className="titulo"> {isSpanish ? 'Cursos y certificaciones' : 'Courses and Certifications'} </h2>
                    <h6 className="titulo">  {isSpanish ? 'Inteligencia Artificial aplicada al Transporte' : 'Artificial Intelligence applied to Transportation'}
                        <span className={"cvtext textoCurso " + (darkMode ? 'whiteText' : 'blackText')}>
                            {isSpanish ? 'Banco Interamericano de Desarrollo (Diciembre 2023 - 24 horas)' : 'Inter-American Development Bank (December 2023 - 24 hours)'}
                        </span>
                        <p className={"cvtext textoCurso " + (darkMode ? 'whiteText' : 'blackText')}>
                            {isSpanish ? 'Tecnologías y herramientas utilizadas: Inteligencia Artificial, machine learning, redes neuronales, redes convolucionales.' : 'Used tools and technologies: Artificial Intelligence, machine learning, neural networks, convolutional networks.'}
                        </p>
                    </h6>
                    <h6 className="titulo"> AZ-204 Azure Developer Associate
                        <span className={"cvtext textoCurso " + (darkMode ? 'whiteText' : 'blackText')}>
                            {isSpanish ? 'Microsoft (Septiembre 2023 - 11 horas)' : 'Microsoft (September 2023 - 11 hours)'}
                        </span>
                        <p className={"cvtext textoCurso " + (darkMode ? 'whiteText' : 'blackText')}>
                            {isSpanish ? 'Tecnologías y herramientas utilizadas: ' : 'Used tools and technologies: '} Microsoft Azure, .NET 7, C#.
                        </p>
                    </h6>
                    <h6 className="titulo">
                        {isSpanish ? 'Microsoft Build - Desafío de .NET' : 'Microsoft Build: .NET Challenge'}
                        <span className={"cvtext textoCurso " + (darkMode ? 'whiteText' : 'blackText')}>
                            {isSpanish ? 'Microsoft (Mayo 2023 a Junio 2023 - 28 horas)' : 'Microsoft (May 2023 to June 2023 - 28 hours)'}
                        </span>
                        <p className={"cvtext textoCurso " + (darkMode ? 'whiteText' : 'blackText')}>
                            {isSpanish ? 'Tecnologías y herramientas utilizadas: ' : 'Used tools and technologies: '} .NET 6, .NET 7, C#, ASP.NET MVC, Razor, Blazor, Entity Framework Core, Microsoft Azure.
                        </p>
                    </h6>
                    <h6 className="titulo">
                        {isSpanish ? 'Cursos de Desarrollo Web' : 'Web Development Courses'}
                        <span className={"cvtext textoCurso " + (darkMode ? 'whiteText' : 'blackText')}>
                            {isSpanish ? 'Pluralsight (Marzo 2022 a Diciembre 2022 - 57 horas)' : 'Pluralsight (March 2022 to December 2022 - 57 hours)'}
                        </span>
                        <p className={"cvtext textoCurso " + (darkMode ? 'whiteText' : 'blackText')}>
                            {isSpanish ? 'Tecnologías y herramientas utilizadas: ' : 'Used tools and technologies: '} .NET 6, C#, Postman, Entity Framework Core, Microsoft Azure, OData, React 18, Docker, Python, Angular 16, Next.js.
                        </p>
                    </h6>
                    <h6 className="titulo"> The Bits and Bytes of Computer Networking
                        <span className={"cvtext textoCurso " + (darkMode ? 'whiteText' : 'blackText')}>
                            {isSpanish ? 'Google/Coursera (Enero 2022 - 36 horas)' : 'Google/Coursera (January 2022 - 36 hours)'}
                        </span>
                        <p className={"cvtext textoCurso " + (darkMode ? 'whiteText' : 'blackText')}>
                            {isSpanish ? 'Tecnologías y herramientas utilizadas: Redes y comunicaciones, protocolo TCP/IP, DNS, direcciones IP.' : 'Used tools and technologies: Networking and communications, TCP/IP protocol, DNS, IP addresses.'}
                        </p>
                    </h6>
                    <h6 className="titulo">
                        {isSpanish ? 'Desarrollador .NET' : '.NET Development'}
                        <span className={"cvtext textoCurso " + (darkMode ? 'whiteText' : 'blackText')}>
                            {isSpanish ? 'UTN FRBA/Becas NEORIS (Octubre 2021 a Diciembre 2021 - 96 horas)' : 'UTN FRBA/Becas NEORIS (October 2021 to December 2021 - 96 hours)'}
                        </span>
                        <p className={"cvtext textoCurso " + (darkMode ? 'whiteText' : 'blackText')}>
                            {isSpanish ? 'Tecnologías y herramientas utilizadas: ' : 'Used tools and technologies: '} .NET 6, .NET 7, C#, ASP.NET MVC, Razor, Blazor, Entity Framework Core.
                        </p>
                    </h6>
                    <h6 className="titulo">
                        {isSpanish ? 'React: de Cero a Experto' : 'React: from Zero to Expert'}
                        <span className={"cvtext textoCurso " + (darkMode ? 'whiteText' : 'blackText')}>
                            {isSpanish ? 'Udemy (Noviembre 2021 - 49 horas)' : 'Udemy (November 2021 - 49 hours)'}
                        </span>
                        <p className={"cvtext textoCurso " + (darkMode ? 'whiteText' : 'blackText')}>
                            {isSpanish ? 'Tecnologías y herramientas utilizadas: ' : 'Used tools and technologies: '} React, Redux, Jest, Firebase, MongoDB, Express, Node, Heroku
                        </p>
                    </h6>
                    <h6 className="titulo"> Technical Support Fundamentals
                        <span className={"cvtext textoCurso " + (darkMode ? 'whiteText' : 'blackText')}>
                            {isSpanish ? 'Google/Coursera (Agosto 2021 - 40 horas)' : 'Google/Coursera (August 2021 - 40 hours)'}
                        </span>
                        <p className={"cvtext textoCurso " + (darkMode ? 'whiteText' : 'blackText')}>
                            {isSpanish ? 'Tecnologías y herramientas utilizadas: Soporte IT, hardware, sistemas operativos, instalación de software, documentación.' : 'Used tools and technologies: IT Support, hardware, operating systems, software installation, documentation.'}
                        </p>
                    </h6>
                    <h6 className="titulo">
                        {isSpanish ? 'Conviértete en Desarrollador Web Full-Stack' : 'Become a Full-Stack Web Developer'}
                        <span className={"cvtext textoCurso " + (darkMode ? 'whiteText' : 'blackText')}>
                            {isSpanish ? 'LinkedIn Learning (Febrero 2021 - 31 horas)' : 'LinkedIn Learning (February 2021 - 31 hours)'}
                        </span>
                        <p className={"cvtext textoCurso " + (darkMode ? 'whiteText' : 'blackText')}>
                            {isSpanish ? 'Tecnologías y herramientas utilizadas: ' : 'Used tools and technologies: '} JavaScript, SQL, Node, Express, GitHub, SCRUM.
                        </p>
                    </h6>
                    <h6 className="titulo"> The Complete Web Developer Course 2.0
                        <span className={"cvtext textoCurso " + (darkMode ? 'whiteText' : 'blackText')}>
                            {isSpanish ? 'Udemy (Marzo 2018 - 30 horas)' : 'Udemy (March 2018 - 30 hours)'}
                        </span>
                        <p className={"cvtext textoCurso " + (darkMode ? 'whiteText' : 'blackText')}>
                            {isSpanish ? 'Tecnologías y herramientas utilizadas: ' : 'Used tools and technologies: '} HTML5, CSS3, JavaScript, jQuery, Bootstrap, WordPress, PHP, mySQL, Python.
                        </p>
                    </h6>
                </Col>
            </Row>

        </Container>
    )
}

export default CVComponent;