import React, { useContext } from 'react';
import { Image, Row, Col } from 'react-bootstrap';
import { LanguageContext } from './languageContext';

export const SobreMiDescripcionComponent = ({ index, item }) => {
    const { isSpanish } = useContext(LanguageContext);

    return (
        <Row id='descripcionTrabajo'>
            {(item.id && item.id % 2 === 0) ? <> <Col md={5} className='divFoto'>
                <Image
                    src={require(`../assets/${item.imagen}.jpg`)}
                    className="fotoSobreMi animate__animated animate__bounceIn"
                    alt={item.imagenAlt} />
            </Col>
                <Col md={5}>
                    <h2 className="textoClaro" id="tituloDesarrollo"> {isSpanish ? item.tituloEsp : item.tituloEng} </h2>
                    <p className='descripcion textoClaro' id="descripcionDes"> {isSpanish ? item.descripcionEsp : item.descripcionEng}  </p>
                </Col>
            </> : <> <Col md={5}>
                <h2 className="textoClaro" id="tituloDesarrollo"> {isSpanish ? item.tituloEsp : item.tituloEng} </h2>
                <p className='descripcion textoClaro' id="descripcionDes"> {isSpanish ? item.descripcionEsp : item.descripcionEng}  </p>
            </Col>
                <Col md={5} className='divFoto'>
                    <Image
                        src={require(`../assets/${item.imagen}.jpg`)}
                        className="fotoSobreMi animate__animated animate__bounceIn"
                        alt={item.imagenAlt} />
                </Col></>}
        </Row>
    )
}
