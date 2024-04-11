import React, { useContext } from 'react';
import { LanguageContext } from './languageContext';
import { DarkModeContext } from './darkModeContext';

const CVCursoComponent = ({ titulo, issuer, fecha, horas, stack }) => {
    const { darkMode } = useContext(DarkModeContext);
    const { isSpanish } = useContext(LanguageContext);
    return (
        <div className='divCurso'>
            <div className='workTitle'>
                <h6 className="titulo">{titulo}</h6>
                <span className="cvtext titulo"> {issuer + ' (' + fecha + ' - ' + horas.toString() + (isSpanish ? ' horas)' : ' hours)')} </span>
            </div>
            <p className={"cvtext textoCurso " + (darkMode ? 'whiteText' : 'blackText')}> Stack: {stack.join(', ')}</p>
        </div>
    )
}

export default CVCursoComponent;