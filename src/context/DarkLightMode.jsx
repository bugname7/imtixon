import { useState, useEffect, createContext, useContext } from 'react';

const DarkLightMode = createContext();

export const DarkModeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem('darkMode') === 'true';
    });

    useEffect(() => {
        localStorage.setItem('darkMode', darkMode);
        document.body.classList.toggle('dark', darkMode);
    }, [darkMode]);

    const toggleDarkMode = () => setDarkMode(!darkMode);

    return (
        <DarkLightMode.Provider value={{ darkMode, toggleDarkMode }}>
            {children}
        </DarkLightMode.Provider>
    );
};

export const useDarkMode = () => {
    return useContext(DarkLightMode);
};
