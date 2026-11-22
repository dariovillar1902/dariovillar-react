import React, { useContext } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { DarkModeContext } from './darkModeContext';
import { LanguageContext } from './languageContext';
import CVWorkComponent from './CVWorkComponent';
import CVCursoComponent from './CVCursoComponent';

const CVComponent = ({ forceLang }) => {
    const { darkMode } = useContext(DarkModeContext);
    const { isSpanish: contextIsSpanish } = useContext(LanguageContext);
    const isSpanish = forceLang ? forceLang === 'es' : contextIsSpanish;

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
                    ? 'Lead Software Engineer con más de 5 años de experiencia construyendo plataformas empresariales en Oil & Gas (Chevron, ExxonMobil) con C#/.NET, Angular, React y Azure. Lidera un equipo de desarrollo en Argentina, Polonia e India entregando el 100% del business value planificado con una capacidad ~50% superior a la asignada, y desarrolló un agente de IA que redujo ~90% el esfuerzo manual de análisis financieros. Certificado SAFe® 6 Practitioner y Microsoft AZ-204 (Azure Developer Associate). Ingeniero Civil egresado de la UTN-FRBA. Inglés C1.'
                    : 'Lead Software Engineer with 5+ years of experience building enterprise platforms in Oil & Gas (Chevron, ExxonMobil) with C#/.NET, Angular, React and Azure. Leads a development team across Argentina, Poland and India, delivering 100% of planned business value at ~50% above assigned capacity, and built an AI agent that cut manual financial-analysis effort by ~90%. SAFe® 6 Practitioner and Microsoft AZ-204 (Azure Developer Associate) certified. Civil Engineering graduate from UTN-FRBA. C1 English.'
                }
            </p>

            <hr className='cvDivider' />

            {/* ── Tech Stack (by category, ATS-friendly) ── */}
            <h3 className="cvSectionTitle">{isSpanish ? 'STACK TÉCNICO' : 'TECH STACK'}</h3>
            <div className='cvSkills'>
                {[
                    [isSpanish ? 'Lenguajes' : 'Languages', 'C#, TypeScript, JavaScript, Python, SQL'],
                    [isSpanish ? 'Frameworks y librerías' : 'Frameworks & Libraries', '.NET / ASP.NET, Angular, React, Next.js, Entity Framework Core'],
                    [isSpanish ? 'Cloud y DevOps' : 'Cloud & DevOps', 'Azure, Azure DevOps, GitHub, Docker, CI/CD'],
                    [isSpanish ? 'Bases de datos y herramientas' : 'Databases & Tools', 'SQL Server, REST APIs, Jest, Postman, Power BI'],
                    [isSpanish ? 'IA y automatización' : 'AI & Automation', 'Microsoft Copilot Studio, GitHub Copilot, Power Apps'],
                    [isSpanish ? 'Metodologías' : 'Methodologies', 'Agile/Scrum, SAFe 6'],
                ].map(([label, value]) => (
                    <div className='cvSkillRow' key={label}>
                        <span className='cvSkillLabel'>{label}</span>
                        <span className='cvSkillValue'>{value}</span>
                    </div>
                ))}
            </div>

            <hr className='cvDivider' />

            {/* ── Employment History ── */}
            <h3 className="cvSectionTitle">{isSpanish ? 'EXPERIENCIA LABORAL' : 'EMPLOYMENT HISTORY'}</h3>

            <CVWorkComponent
                titulo={'Lead Software Engineer'}
                empresa={'Chevron'}
                fecha={isSpanish ? 'Marzo 2024 – Actualidad' : 'March 2024 – Present'}
                items={isSpanish
                    ? [
                        'Líder Técnico de ADAP (Automated Design Assurance Process), gestionando un equipo global de desarrollo en Argentina, Polonia e India, y coordinando arquitectura, requerimientos y entregas con Product Owner, Scrum Master y stakeholders. Cumplimiento consistente del 100% del business value planificado, con una capacidad de entrega ~50% superior a la asignada.',
                        'Desarrollo y evolución de QMS (Quality Management System), plataforma empresarial que digitaliza los procesos de calidad e integra Quality Excellence en el OEMS, apoyando la certificación ISO 9001 de Chevron en Projects, Engineering, Wells, Supply Chain y O&M. Valor estimado de la herramienta ~USD 1.000 millones; desarrollo interno asistido por IA por USD 0,3 millones a cinco años frente a USD 1,7 millones de una solución de proveedor — ahorro estimado de ~USD 1,4 millones.',
                        'Diseño de un agente de IA en Microsoft Copilot Studio para automatizar análisis financieros — 1° puesto en una competencia evaluada por el CIO de la compañía — con reducción estimada del 90% del esfuerzo manual y un impacto potencial equivalente a ~15 FTE.',
                        'Coordinación de más de 10 entrevistas técnicas (3 contrataciones). Embajador de marca empleadora en Nerdearla y la Feria Laboral UTN.',
                        'TechShare Connect & Partnership Lead, liderando alianzas, capacitaciones e iniciativas de adopción digital como AI Challenges y Citizen Developer Program. PRIDE Argentina Learning Specialist — creación de "Fun Corner", plataforma de aprendizaje en Power Apps con más de 90 miembros incorporados.'
                    ]
                    : [
                        'Technical Lead for ADAP (Automated Design Assurance Process), managing a global development team across Argentina, Poland and India, and coordinating architecture, requirements and delivery with the Product Owner, Scrum Master and stakeholders. Consistently delivered 100% of planned business value, with delivery capacity ~50% above assigned target.',
                        'Developed and evolved QMS (Quality Management System), an enterprise platform digitizing quality processes and integrating Quality Excellence into the OEMS, supporting Chevron\'s ISO 9001 certification across Projects, Engineering, Wells, Supply Chain and O&M. Tool estimated at ~USD 1 billion in value; AI-assisted in-house development at USD 0.3 million over five years vs. USD 1.7 million for a vendor solution — an estimated ~USD 1.4 million in savings.',
                        'Designed a Microsoft Copilot Studio AI agent for financial analysis automation — awarded 1st place in a CIO-judged company competition — with an estimated 90% reduction in manual effort and a potential impact equivalent to ~15 FTEs.',
                        'Coordinated 10+ technical hiring interviews (3 new hires). Represented Chevron as employer brand ambassador at Nerdearla and the UTN job fair.',
                        'TechShare Connect & Partnership Lead, driving partnerships, training and digital adoption initiatives such as AI Challenges and the Citizen Developer Program. PRIDE Argentina Learning Specialist — designed and launched "Fun Corner", a Power Apps learning platform that onboarded 90+ members.'
                    ]}
                stack={['Angular', 'TypeScript', 'C#', '.NET 8', 'Azure', 'Azure DevOps', 'SQL Server', 'Python', 'Copilot Studio', 'GitHub Copilot', 'Power Apps']}
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
                titulo={isSpanish ? 'Programador SSr' : 'Mid-Level Software Developer'}
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
                fecha={isSpanish ? 'Marzo 2019 – Julio 2026' : 'March 2019 – July 2026'}
                items={isSpanish
                    ? [
                        'Título de Ingeniero Civil obtenido. Promedio final: 7.51/10. Perfil orientado a Vías de Comunicación. Herramientas CAD/BIM: AutoCAD, Civil 3D, Revit, SketchUp, RAM Elements, MS Project.',
                        'Secretaría de Eventos y Logística del CONEIC 2026 (Congreso Nacional de Estudiantes de Ingeniería Civil); desarrollo de la página web oficial del congreso con React y .NET.',
                        '1° Premio en el Concurso Nacional al Desarrollo de Aplicaciones de la AIE (Asociación de Ingenieros Estructurales): aplicación web para cálculo de fundaciones de hormigón armado, construida con TypeScript, Next.js y .NET 9.'
                    ]
                    : [
                        'Civil Engineering degree completed. Final GPA: 7.51/10. Specialization in Transportation Engineering. CAD/BIM tooling: AutoCAD, Civil 3D, Revit, SketchUp, RAM Elements, MS Project.',
                        'Events & Logistics Secretary of CONEIC 2026 (National Congress of Civil Engineering Students); built the congress\' official website with React and .NET.',
                        '1st Prize at the AIE National Application Development Contest (Argentine Association of Structural Engineers): web application for reinforced concrete foundation design, built with TypeScript, Next.js and .NET 9.'
                    ]}
                stack={[]}
            />

            <CVWorkComponent
                titulo={isSpanish ? 'Tecnicatura en Data Analytics' : 'Data Analytics Degree'}
                empresa={'Coderhouse'}
                fecha={isSpanish ? 'Abril 2025 – Actualidad' : 'April 2025 – Present'}
                items={isSpanish
                    ? [
                        'Carrera en curso, orientada a análisis y visualización de datos, estadística aplicada y modelos predictivos.'
                    ]
                    : [
                        'Ongoing degree program focused on data analysis and visualization, applied statistics and predictive modeling.'
                    ]}
                stack={['Python', 'SQL', 'Power BI', 'Excel']}
            />

            <CVWorkComponent
                titulo={isSpanish ? 'Machine Learning Engineer — Fellowship' : 'Machine Learning Engineer Fellowship'}
                empresa={'Anyone AI'}
                fecha={isSpanish ? 'Septiembre 2026 – Enero 2027' : 'September 2026 – January 2027'}
                items={isSpanish
                    ? [
                        'Fellowship altamente selectivo (<3% de aceptación) para acelerar carreras en Machine Learning, part-time y 100% remoto (20 hs/semana), rodeado de una comunidad de profesionales y expertos en IA.'
                    ]
                    : [
                        'Highly selective fellowship (<3% acceptance rate) to accelerate Machine Learning careers, part-time and fully remote (20 hrs/week), surrounded by a community of AI professionals and experts.'
                    ]}
                stack={['Python', 'SQL', 'Pandas', 'Scikit-Learn', 'Keras', 'AWS', 'Langchain', 'FastAPI', 'StreamLit', 'Docker', 'Hugging Face']}
                isLastEntry={true}
            />

            <hr className='cvDivider' />

            {/* ── Courses & Certifications ── */}
            <h3 className="cvSectionTitle">{isSpanish ? 'CURSOS Y CERTIFICACIONES' : 'COURSES & CERTIFICATIONS'}</h3>

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
