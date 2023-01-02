import React, { useContext } from 'react';
import { DarkModeContext } from './darkModeContext';

export const DarkModeComponent = () => {
    const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
    const handleClick = () => {
        toggleDarkMode();
    }

    return (
        <input type="checkbox" className="toggle" checked={darkMode} onClick={handleClick} />
    )
}

