import { createContext, useEffect, useState } from "react";

export const DarkModeContext = createContext();

export const DarkModeProvider = (props) => {
    const [darkMode, setDarkMode] = useState(true);
    useEffect(() => {
        const darkModeStored = JSON.parse(localStorage.getItem('darkMode'));
        if (darkModeStored !== null && darkModeStored === false) {
            setDarkMode(false);
        } else {
            setDarkMode(true);
        }
    }, [darkMode])

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        localStorage.setItem('darkMode', !darkMode);
    }

    return (
        <div>
            <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
                {props.children}
            </DarkModeContext.Provider>
        </div>
    )
}