import { createContext, useEffect, useState } from "react";

export const LanguageContext = createContext();

export const LanguageProvider = (props) => {
    const [isSpanish, setIsSpanish] = useState(true);
    useEffect(() => {
        const isSpanishStored = JSON.parse(localStorage.getItem('isSpanish'));
        if (isSpanishStored !== null && isSpanishStored === false) {
            setIsSpanish(false);
        } else {
            setIsSpanish(true);
        }
    }, [isSpanish])

    const toggleLanguage = () => {
        setIsSpanish(!isSpanish);
        localStorage.setItem('isSpanish', !isSpanish);
    }

    return (
        <div>
            <LanguageContext.Provider value={{ isSpanish, toggleLanguage }}>
                {props.children}
            </LanguageContext.Provider>
        </div>
    )
}