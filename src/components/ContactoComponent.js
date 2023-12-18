import React, { useContext } from 'react';
import { Container, Row, Col, Form, Table } from 'react-bootstrap';
import { DarkModeContext } from './darkModeContext';
import { LanguageContext } from './languageContext';
import { Link } from 'react-router-dom';
import PdfSpanish from "../assets/CVDarioVillar.pdf";
import PdfEnglish from "../assets/ResumeDarioVillar.pdf";
import { allCerts } from '../assets/certificates';

export const ContactoComponent = () => {
    const { darkMode } = useContext(DarkModeContext);
    const { isSpanish } = useContext(LanguageContext);

    return (
        <Container fluid className={darkMode ? 'darkBody' : 'lightBody'} >
            <Row id='sobreMi'>
                <Col md={1}></Col>
                <Col md={10}>
                    <h1 id='tituloContacto'> {isSpanish ? 'Contacto' : 'Contact'} </h1>
                </Col>
                <Col md={1}></Col>
            </Row>
            <Row id='filaArchivos'>
                <Col md={1}></Col>
                <Col md={5} className='divArchivo'><h4 className="textoClaro" id='tituloCV'> {isSpanish ? 'Curriculum Vitae' : 'Resume'} </h4>
                    <iframe src={isSpanish ? PdfSpanish : PdfEnglish} id="iframeCV" title='CV Dario Villar'> </iframe>
                    <button className='verMas previewButton'><Link to='/cv' className='verMasLink'> {isSpanish ? 'Vista Previa' : 'Preview'}  </Link></button>
                    <br />
                    <button className="verMas previewButton"><a href={isSpanish ? PdfSpanish : PdfEnglish} className='verMasLink botonDescargar' id="descargarCV" download> {isSpanish ? 'Descargar' : 'Download'}
                    </a></button></Col>
                <Col md={5} className='tableWrapper'><h4 className="textoClaro" id='tituloCV'> {isSpanish ? 'Mis certificados' : 'My certificates'} </h4>
                    <Table striped bordered hover variant='dark'>
                        <tbody> {
                            allCerts.sort((firstItem, secondItem) => new Date(secondItem.completionDate) - new Date(firstItem.completionDate)).map((x, j) => {
                                return (<tr key={x.id}><td>
                                    {x.issuer}
                                </td><td>{isSpanish ? x.nameEsp : x.nameEng}</td><td>
                                        <a href={x.src.endsWith(".pdf") ? ('/certificates/' + x.src) : x.src} target="_blank"
                                            rel="noreferrer"><i className='fas portfolioIcon fa-file'></i></a>
                                    </td></tr>
                                )
                            })
                        }
                        </tbody>
                    </Table>
                </Col>
                <Col md={1}></Col>
            </Row>
            <Row>
                <Col md={1}></Col>
                <Col md={10}>
                    <Container fluid>
                        <Form action='https://formsubmit.co/1baa31af5cc41afbd1db00ea820f4407' method='post'>
                            <h3 className="h3 mb-3 fw-normal" id="tituloMensaje"> {isSpanish ? 'Enviar un mensaje' : 'Send a message'} </h3>
                            <Row>
                                <Col md={3} className='mx-auto'>
                                    <div className="form-floating">
                                        <input type="text" className="form-control" id="floatingInput" placeholder={isSpanish ? 'Nombre' : 'Name'} name='Nombre' />
                                        <label htmlFor="floatingInput" id="labelNombre">{isSpanish ? 'Nombre' : 'Name'} </label>
                                    </div>
                                </Col>
                                <Col md={1}></Col>
                                <Col md={3} className='mx-auto'>
                                    <div className="form-floating">
                                        <input type="text" className="form-control" id="floatingInput2" placeholder={isSpanish ? 'Asunto' : 'Subject'} name='Asunto' />
                                        <label htmlFor="floatingInput2" id="labelAsunto">{isSpanish ? 'Asunto' : 'Subject'}</label>
                                    </div>
                                </Col>
                                <Col md={1}></Col>
                                <Col md={3} className='mx-auto'>
                                    <div className="form-floating">
                                        <input type="email" className="form-control" id="floatingInput3" placeholder={isSpanish ? 'Correo Electrónico' : 'Email Address'} name='Mail' />
                                        <label htmlFor="floatingInput3" id="labelMail">{isSpanish ? 'Correo Electrónico' : 'Email Address'}</label>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={10} className='mx-auto'><div className="form-floating">
                                    <textarea className="form-control" id="floatingInput4" placeholder={isSpanish ? 'Mensaje' : 'Message'} name='Mensaje'></textarea>
                                    <label htmlFor="floatingInput4" id="labelMensaje">{isSpanish ? 'Mensaje' : 'Message'} </label>
                                </div></Col>
                            </Row>
                            <Row>
                                <Col md={1}></Col>
                                <Col md={10} className='mx-auto divBoton'> <button className="verMas" id='botonMail'>{isSpanish ? 'Enviar' : 'Send'} </button></Col>
                                <Col md={1}></Col>
                            </Row>
                        </Form>
                    </Container>
                </Col>
                <Col md={1}></Col>
            </Row>
        </Container>

    )
}
