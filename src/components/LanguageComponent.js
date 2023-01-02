import React, { useContext } from 'react';
import { Image } from 'react-bootstrap';
import { LanguageContext } from './languageContext';
import spanishFlag from '../assets/arg.png';
import englishFlag from '../assets/usa.png';

export const LanguageComponent = () => {
    const { isSpanish, toggleLanguage } = useContext(LanguageContext);
    const handleClick = () => {
        toggleLanguage();
    }

    return (
        <div onClick={handleClick}>
            <Image src={isSpanish ? spanishFlag : englishFlag} className='bandera imgNavbar' alt={isSpanish ? 'Bandera de España' : 'English Flag'} />
        </div>
    )
}

