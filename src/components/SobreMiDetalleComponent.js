import React, { useContext, useRef, useState } from 'react';
import { Row, Col, Tooltip, Overlay } from 'react-bootstrap';
import CounterComponent from './CounterComponent';
import { DarkModeContext } from './darkModeContext';
import { LanguageContext } from './languageContext';

export const SobreMiDetalleComponent = ({ index, item }) => {
    const { darkMode } = useContext(DarkModeContext);
    const { isSpanish } = useContext(LanguageContext);
    const [show1, setShow1] = useState(false);
    const target1 = useRef(null);

    return (
        <Row>
            {(item.id && item.id % 2 === 0) ?
                <>
                    <Col md={5} className='divProgreso'>
                        <Overlay target={target1.current} show={show1} placement="top">
                            {(props) => (
                                <Tooltip id="overlay-example" {...props} style={{ position: 'absolute', ...props.style }} >
                                    {item.progreso}
                                </Tooltip>
                            )}
                        </Overlay>
                        <div className={(darkMode ? 'darkProgress' : 'lightProgress') + ' progress'} ref={target1} onMouseEnter={() => setShow1(!show1)} onMouseLeave={() => setShow1(!show1)}>
                            <div className={'progress-value ' + (darkMode ? 'darkProgressValue' : 'lightProgressValue')} id={item.idProgreso}></div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            {item.botones && item.botones.map((boton, index) => {
                                return (
                                    <div key={index}>
                                        <button className="verMas"><a href={boton.link} className='verMasLink' id="botonCertificados"> {isSpanish ? boton.textoEsp : boton.textoEng}  </a></button>
                                    </div>
                                )
                            }
                            )}
                        </div>
                    </Col>
                    <Col md={5} style={{ textAlign: 'right' }}>
                        {item.counters && item.counters.map((counter, index) => {
                            return (
                                <div key={index}>
                                    <h3><CounterComponent countTo={counter.countTo} />{counter.cuentaDe}</h3>
                                    <p className='textoClaro' id="descripcionCursos"> {isSpanish ? counter.textoEsp : counter.textoEng}  </p>
                                </div>
                            )
                        }
                        )}
                    </Col>
                </> :
                <>
                    <Col md={5}>
                        {item.counters && item.counters.map((counter, index) => {
                            return (
                                <div key={index}>
                                    <h3><CounterComponent countTo={counter.countTo} />{counter.cuentaDe}</h3>
                                    <p className='textoClaro' id="descripcionCursos"> {isSpanish ? counter.textoEsp : counter.textoEng}  </p>
                                </div>
                            )
                        }
                        )}
                    </Col>
                    <Col md={5} className='divProgreso'>
                        <Overlay target={target1.current} show={show1} placement="top">
                            {(props) => (
                                <Tooltip id="overlay-example" {...props} style={{ position: 'absolute', ...props.style }} >
                                    {item.progreso}
                                </Tooltip>
                            )}
                        </Overlay>
                        <div className={(darkMode ? 'darkProgress' : 'lightProgress') + ' progress'} ref={target1} onMouseEnter={() => setShow1(!show1)} onMouseLeave={() => setShow1(!show1)}>
                            <div className={'progress-value ' + (darkMode ? 'darkProgressValue' : 'lightProgressValue')} id={item.idProgreso}></div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            {item.botones && item.botones.map((boton, index) => {
                                return (
                                    <div key={index}>
                                        <button className="verMas"><a href={boton.link} className='verMasLink' id="botonCertificados"> {isSpanish ? boton.textoEsp : boton.textoEng}  </a></button>
                                    </div>
                                )
                            }
                            )}
                        </div>
                    </Col>
                </>
            }
        </Row>
    )
}
