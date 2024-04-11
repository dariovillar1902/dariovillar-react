import React from 'react';
import { Col, Row } from 'react-bootstrap';

const CVWorkComponent = ({ titulo, empresa, fecha, items, stack, isLastEntry }) => {
    return (
        <Row className='cvrow'>
            <Col md={12} className={!isLastEntry && 'filaabajo'}>
                <div className='workTitle'>
                    <h5 className="titulo">{titulo}</h5>
                    <span className="cvtext titulo"> {empresa + ' (' + fecha + ')'}</span>
                </div>
                <br />
                <ul>
                    {items.map((item, index) => {
                        return <li key={index} className='cvtext'>{item}</li>
                    })}
                </ul>
                {stack.length > 0 && <span className="cvtext"> Stack: {stack.join(', ')} </span>}
            </Col>
        </Row>
    )
}

export default CVWorkComponent;