import React, { useContext } from 'react';
import { LanguageContext } from './languageContext';
import { DarkModeContext } from './darkModeContext';

const CVCursoComponent = ({ titulo, issuer, fecha, horas, stack }) => {
    const { darkMode } = useContext(DarkModeContext);
    const { isSpanish } = useContext(LanguageContext);
    return (
        <div className='divCurso'>
            <div className='workTitle'>
                <div className='workTitleLeft'>
                    <span className='workIcon'>❖</span>
                    <h6 className="titulo workJobTitle">{titulo}</h6>
                    <span className="cvtext workEmpresa">, {issuer}</span>
                </div>
                <span className="cvtext workFecha">{fecha} · {horas}{isSpanish ? 'h' : 'h'}</span>
            </div>
            {stack.length > 0 && (
                <p className={"cvtext textoCurso " + (darkMode ? 'whiteText' : 'blackText')}>
                    {stack.join(' · ')}
                </p>
            )}
        </div>
    )
}

export default CVCursoComponent;
