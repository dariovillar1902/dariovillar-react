import React from 'react';
import { Col, Row } from 'react-bootstrap';

const CVWorkComponent = ({ titulo, empresa, fecha, items, stack, isLastEntry }) => {
    return (
        <Row className='cvrow'>
            <Col md={12} className={!isLastEntry ? 'filaabajo' : ''}>
                <div className='workTitle'>
                    <div className='workTitleLeft'>
                        <span className='workIcon'>❖</span>
                        <h5 className="titulo workJobTitle">{titulo}</h5>
                        <span className="cvtext workEmpresa">, {empresa}</span>
                    </div>
                    <span className="cvtext workFecha">{fecha}</span>
                </div>
                <ul className='workList'>
                    {items.map((item, index) => (
                        <li key={index} className='cvtext'>{item}</li>
                    ))}
                </ul>
                {stack.length > 0 && (
                    <p className="cvtext stackText">
                        <strong>Stack:</strong> {stack.join(', ')}
                    </p>
                )}
            </Col>
        </Row>
    )
}

export default CVWorkComponent;
