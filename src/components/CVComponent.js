import React, { useContext } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { DarkModeContext } from './darkModeContext';
import { LanguageContext } from './languageContext';
import CVWorkComponent from './CVWorkComponent';
import CVCursoComponent from './CVCursoComponent';

const CVComponent = () => {
    const { darkMode } = useContext(DarkModeContext);
    const { isSpanish } = useContext(LanguageContext);

    return (
        <Container className={(darkMode ? 'darkBody' : 'lightBody') + ' divcv'}>

            {/* ── Header ── */}
            <Row className='cvrow cvHeaderRow'>
                <Col md={12} className='cvHeader'>
                    <h2 className="cvName">{isSpanish ? 'DARÍO VILLAR' : 'DARIO VILLAR'}</h2>
                    <h4 className="cvSubtitle">Lead Software Engineer · {isSpanish ? 'Ingeniero Civil' : 'Civil Engineer'}</h4>
                    <p className="cvLocation">Buenos Aires, Argentina</p>
                </Col>
            </Row>
            <div className='cvContactRow'>
                <span className="cvtext cvContactLeft">+54 9 113 003 4639</span>
                <span className="cvtext cvContactRight">
                    dario_villar2001@hotmail.com &nbsp;|&nbsp; linkedin.com/in/dario-villar &nbsp;|&nbsp; dariovillar.vercel.app
                </span>
            </div>

            <hr className='cvDivider' />

            {/* ── Profile ── */}
            <h3 className="cvSectionTitle">{isSpanish ? 'PERFIL' : 'PROFILE'}</h3>
            <p className="cvProfile cvtext">
                {isSpanish
                    ? 'Full-Stack Software Engineer con más de 4 años de experiencia en organizaciones globales de la industria Oil & Gas (Chevron, ExxonMobil). Historial comprobado de superar consistentemente los objetivos de entrega, liderar equipos técnicos y desarrollar soluciones de IA/automatización con impacto empresarial medible. Certificado SAFe® 6 Practitioner y Microsoft AZ-204 (Azure Developer Associate). Estudiante avanzado de Ingeniería Civil en UTN-FRBA (45/46 materias aprobadas). Inglés C1 (Cambridge FCE, Distinción). Licencia de conducir clase B, movilidad propia.'
                    : 'Full-Stack Software Engineer with 4+ years of experience at global Oil & Gas organizations (Chevron, ExxonMobil). Consistent track record of exceeding delivery targets, leading technical teams, and shipping AI-driven automation with measurable business impact. SAFe® 6 Practitioner and Microsoft AZ-204 (Azure Developer Associate) certified. Advanced Civil Engineering student at UTN-FRBA (45/46 subjects completed). C1 English (Cambridge FCE, Distinction). Valid driver\'s license, own vehicle.'
                }
            </p>

            <hr className='cvDivider' />

            {/* ── Employment History ── */}
            <h3 className="cvSectionTitle">{isSpanish ? 'EXPERIENCIA LABORAL' : 'EMPLOYMENT HISTORY'}</h3>

            <CVWorkComponent
                titulo={'Lead Software Engineer'}
                empresa={'Chevron'}
                fecha={isSpanish ? 'Marzo 2024 – Actualidad' : 'March 2024 – Present'}
                items={isSpanish
                    ? [
                        'Líder Técnico de ADAP (Automated Design Assurance Process), gestionando un equipo de desarrolladores en Argentina, Polonia e India. Análisis de requerimientos y project management con la Product Owner, Scrum Master y Product Line Architect. Capacidad superada en un 50% en 2024 y 2025, con el 100% del business value planificado alcanzado consistentemente en todos los PIs.',
                        'Diseño y despliegue de un agente de IA en Copilot Studio para automatización de análisis financieros — 1° puesto otorgado por el CIO de la compañía — con reducción estimada del ~90% del esfuerzo manual (~15 FTE). Contribución a la integración del estándar ISO 19008 mediante un agente de identificación de códigos conectado a Field Development Plan (FDPlan).',
                        'Mantenimiento del 100% de cumplimiento del SLA de bugs en menos de 30 días. Coordinación de más de 10 entrevistas técnicas (3 contrataciones). Embajador de marca empleadora en Nerdearla y la Feria Laboral UTN.',
                        'TechShare Connect & Partnership Lead. PRIDE Argentina Learning Specialist — creación de "Fun Corner", plataforma de aprendizaje en Power Apps con más de 90 miembros incorporados.'
                    ]
                    : [
                        'Technical Lead for ADAP (Automated Design Assurance Process), managing a team of developers across Argentina, Poland and India. Requirements analysis and project management alongside the Product Owner, Scrum Master and Product Line Architect. Exceeded assigned capacity by 50% in 2024 and 2025, achieving 100% of planned business value across all PIs.',
                        'Designed and deployed a Copilot Studio AI agent for financial analysis automation — awarded 1st place by the company CIO — with projected ~90% effort reduction (~15 FTE). Contributed to ISO 19008 integration by developing a code identification agent connected to Field Development Plan (FDPlan) data sources.',
                        'Maintained 100% compliance with the 30-day bug-fix SLA. Coordinated 10+ technical hiring interviews (3 new hires). Represented Chevron as employer brand ambassador at Nerdearla and the UTN job fair.',
                        'TechShare Connect & Partnership Lead. PRIDE Argentina Learning Specialist — designed and launched "Fun Corner", a Power Apps learning platform that onboarded 90+ members.'
                    ]}
                stack={['Angular', 'TypeScript', 'C#', '.NET 8', 'Azure DevOps', 'SQL Server', 'Copilot Studio', 'Power Apps']}
            />

            <CVWorkComponent
                titulo={isSpanish ? 'Analista Programador' : 'Software Analyst Developer'}
                empresa={'Oficina Nacional de Compras (ONC)'}
                fecha={isSpanish ? 'Enero 2025 – Actualidad' : 'January 2025 – Present'}
                items={isSpanish
                    ? [
                        'Resolución de 248 tickets de soporte en 8 meses con un tiempo de respuesta promedio de 2 días; automatización de procesos SQL mediante stored procedures y jobs programados en los portales COMPR.AR y CONTRAT.AR, plataformas centrales de contrataciones públicas del Estado Nacional.',
                        'Desarrollo de módulos nuevos siguiendo buenas prácticas, obteniendo requerimientos directamente con organismos públicos; análisis funcional y técnico para garantizar la calidad de las soluciones entregadas.',
                        'Participación activa en la migración del sistema legacy de ASP.NET Framework 4 hacia una API moderna con .NET 9 y frontend en Next.js con TypeScript, mejorando la escalabilidad y mantenibilidad de la plataforma.'
                    ]
                    : [
                        'Resolved 248 support tickets in 8 months, maintaining a 2-day average response time; automated SQL workflows via stored procedures and scheduled jobs across COMPR.AR and CONTRAT.AR, Argentina\'s national public procurement platforms.',
                        'Architected new application modules following development best practices, gathering requirements directly from public agencies; conducted functional and technical analysis to ensure solution quality and stakeholder alignment.',
                        'Driving migration of legacy ASP.NET Framework 4 system to a modern .NET 9 API with a Next.js/TypeScript frontend, improving platform scalability and long-term maintainability.'
                    ]
                }
                stack={['ASP.NET', '.NET 9', 'Next.js', 'TypeScript', 'C#', 'SQL Server']}
            />

            <CVWorkComponent
                titulo={isSpanish ? 'Ayudante de Cátedra — Geotecnia' : 'Teaching Assistant — Geotechnics'}
                empresa={'Universidad Tecnológica Nacional'}
                fecha={isSpanish ? 'Marzo 2025 – Actualidad' : 'March 2025 – Present'}
                items={isSpanish
                    ? [
                        'Ayudante de 2° de Geotecnia (4° año, Ingeniería Civil). Planificación de clases prácticas, armado y corrección de parciales, apoyo a los estudiantes en ejercicios y resolución de consultas.'
                    ]
                    : [
                        'Teaching Assistant for Geotechnics (4th year, Civil Engineering). Lesson planning, exam design and grading, student support in practical exercises and Q&A.'
                    ]}
                stack={[]}
            />

            <CVWorkComponent
                titulo={isSpanish ? 'Programador SSr' : 'SSr Software Developer'}
                empresa={'Essen Aluminio'}
                fecha={isSpanish ? 'Julio 2023 – Marzo 2024' : 'July 2023 – March 2024'}
                items={isSpanish
                    ? [
                        'Desarrollo y soporte de la plataforma web interna. Implementación de 6 proyectos con integración de medios de pago en 5 países (Argentina, Bolivia, Paraguay, Perú y Uruguay) y conexión con ERP vía APIs REST/SOAP.',
                        'Desarrollo de módulos de visualización de reportes de ventas, métricas comerciales y operaciones de marketing y administración comercial para más de 100 usuarios internos.',
                        'Reducción del backlog pendiente de 85 a 38 tickets; 96 tickets resueltos en 7 meses con puntaje de satisfacción de 4.9/5, trabajando con metodologías ágiles.'
                    ]
                    : [
                        'Development and support of the internal web platform. Shipped 6 projects including payment integrations across 5 countries (Argentina, Bolivia, Paraguay, Peru and Uruguay) and ERP connectivity via REST/SOAP APIs.',
                        'Built sales report dashboards, commercial metrics visualization, and marketing and administration modules serving 100+ internal users.',
                        'Reduced open backlog from 85 to 38 tickets; 96 tickets resolved in 7 months with a 4.9/5 user satisfaction score, working with Agile methodologies.'
                    ]}
                stack={['C#', 'ASP.NET', '.NET Framework 4', 'JavaScript', 'Entity Framework Core', 'SQL Server']}
            />

            <div className="cvPageBreak" />

            <CVWorkComponent
                titulo={'Trainee Full Stack Web Developer'}
                empresa={'ExxonMobil'}
                fecha={isSpanish ? 'Marzo 2022 – Julio 2023' : 'March 2022 – July 2023'}
                items={isSpanish
                    ? [
                        'Desarrollo y soporte de aplicaciones web internas en Azure para exploración no convencional de petróleo. Ahorro anual de ~USD 150k mediante la integración de NextPlan con Enersight; reducción de tiempos de carga de 1 minuto a 5 segundos en la aplicación Compressor.',
                        'Migración de módulos de ASP.NET MVC a React y TypeScript; creación de endpoints en API REST (.NET 6 + Entity Framework) con soporte para edición masiva vía importación/exportación de Excel.',
                        'Trabajo en equipos ágiles globales multi-zona horaria; uso de Jest y Postman para testing y CI/CD automatizado; migración de pipelines de Azure DevOps a GitHub.'
                    ]
                    : [
                        'Development and support of Azure-hosted internal web applications for unconventional oil exploration. Delivered ~USD 150k in annual savings through NextPlan–Enersight integration; reduced Compressor app load times from ~1 minute to 5 seconds.',
                        'Migrated ASP.NET MVC modules to React and TypeScript; built REST API endpoints (.NET 6 + Entity Framework) supporting bulk data editing via Excel import/export.',
                        'Worked in global Agile/SCRUM teams across multiple time zones; used Jest and Postman for testing and CI/CD automation; migrated pipelines from Azure DevOps to GitHub.'
                    ]}
                stack={['React', 'TypeScript', '.NET 6', 'C#', 'Microsoft Azure', 'GitHub', 'Entity Framework Core', 'SQL Server']}
                isLastEntry={true}
            />

            <hr className='cvDivider' />

            {/* ── Education ── */}
            <h3 className="cvSectionTitle">{isSpanish ? 'FORMACIÓN ACADÉMICA' : 'EDUCATION'}</h3>

            <CVWorkComponent
                titulo={isSpanish ? 'Ingeniería Civil' : 'Civil Engineering'}
                empresa={'Universidad Tecnológica Nacional'}
                fecha={isSpanish ? 'Marzo 2019 – Actualidad' : 'March 2019 – Present'}
                items={isSpanish
                    ? [
                        '45 de 46 materias aprobadas; solo resta el Proyecto Final. Promedio general: 8.12/10. Perfil orientado a Vías de Comunicación. Herramientas CAD/BIM: AutoCAD, Civil 3D, Revit, SketchUp, RAM Elements, MS Project.',
                        'Secretaría de Eventos y Logística del CONEIC 2026 (Congreso Nacional de Estudiantes de Ingeniería Civil).',
                        '1° Premio en el Concurso Nacional al Desarrollo de Aplicaciones de la AIE (Asociación de Ingenieros Estructurales): aplicación web para cálculo de fundaciones de hormigón armado, construida con TypeScript, Next.js y .NET 9.'
                    ]
                    : [
                        '45 out of 46 subjects completed; only the Final Project remaining. Overall GPA: 8.12/10. Specialization in Transportation Engineering. CAD/BIM tooling: AutoCAD, Civil 3D, Revit, SketchUp, RAM Elements, MS Project.',
                        'Events & Logistics Secretary of CONEIC 2026 (National Congress of Civil Engineering Students).',
                        '1st Prize at the AIE National Application Development Contest (Argentine Association of Structural Engineers): web application for reinforced concrete foundation design, built with TypeScript, Next.js and .NET 9.'
                    ]}
                stack={[]}
                isLastEntry={true}
            />

            <hr className='cvDivider' />

            {/* ── Courses & Certifications ── */}
            <h3 className="cvSectionTitle">{isSpanish ? 'CURSOS Y CERTIFICACIONES' : 'COURSES & CERTIFICATIONS'}</h3>

            <CVCursoComponent titulo={'Data Analytics'} issuer={'Coderhouse'} fecha={isSpanish ? 'Abr 2025' : 'Apr 2025'} horas={null} stack={['Python', 'SQL', 'Power BI', 'Excel']} />
            <CVCursoComponent titulo={'Microsoft Certified: Azure Developer Associate (AZ-204)'} issuer={'Microsoft'} fecha={isSpanish ? 'Sep 2023' : 'Sep 2023'} horas={11} stack={['Microsoft Azure', '.NET 7', 'C#']} />
            <CVCursoComponent titulo={isSpanish ? 'SAFe® 6 Practitioner' : 'SAFe® 6 Practitioner'} issuer={'Scaled Agile'} fecha={'2024'} horas={16} stack={['SAFe', 'Agile', 'Scrum']} />
            <CVCursoComponent titulo={isSpanish ? 'Angular: de Cero a Experto' : 'Angular: from Zero to Expert'} issuer={'Udemy'} fecha={isSpanish ? 'Abr 2024' : 'Apr 2024'} horas={45} stack={['Angular 17', 'TypeScript', 'NestJS', 'Docker', 'Tailwind']} />
            <CVCursoComponent titulo={isSpanish ? 'IBM Full Stack Software Developer' : 'IBM Full Stack Software Developer'} issuer={'IBM / Coursera'} fecha={isSpanish ? 'Feb 2024' : 'Feb 2024'} horas={161} stack={['React', 'Python', 'Node.js', 'Docker', 'Kubernetes']} />
            <CVCursoComponent titulo={isSpanish ? 'Microsoft Build: Desafío de .NET' : 'Microsoft Build: .NET Challenge'} issuer={'Microsoft'} fecha={isSpanish ? 'May–Jun 2023' : 'May–Jun 2023'} horas={28} stack={['.NET 6/7', 'C#', 'ASP.NET MVC', 'Blazor', 'Entity Framework Core', 'Azure']} />
            <CVCursoComponent titulo={isSpanish ? 'React: de Cero a Experto' : 'React: from Zero to Expert'} issuer={'Udemy'} fecha={isSpanish ? 'Nov 2021' : 'Nov 2021'} horas={49} stack={['React', 'Redux', 'Firebase', 'Node.js']} />
            <CVCursoComponent titulo={isSpanish ? 'Desarrollador .NET — Becas NEORIS' : '.NET Developer — NEORIS Scholarship'} issuer={'UTN FRBA'} fecha={isSpanish ? 'Oct–Dic 2021' : 'Oct–Dec 2021'} horas={96} stack={['.NET', 'C#', 'ASP.NET MVC', 'Entity Framework Core']} />

            <hr className='cvDivider' />

            {/* ── Languages ── */}
            <h3 className="cvSectionTitle">{isSpanish ? 'IDIOMAS' : 'LANGUAGES'}</h3>
            <div className='cvLanguages'>
                <span className='cvtext'>
                    {isSpanish ? 'Español' : 'Spanish'}&nbsp;<em>{isSpanish ? '— Nativo' : '— Native'}</em>
                    &nbsp;&nbsp;·&nbsp;&nbsp;
                    {isSpanish ? 'Inglés' : 'English'}&nbsp;<em>{isSpanish ? '— C1 (Cambridge FCE, Distinción)' : '— C1 (Cambridge FCE, Distinction)'}</em>
                </span>
            </div>

            <div className="cvPrintBtn no-print">
                <button onClick={() => window.print()}>
                    🖨️ {isSpanish ? 'Imprimir CV' : 'Print CV'}
                </button>
            </div>

        </Container>
    )
}

export default CVComponent;
