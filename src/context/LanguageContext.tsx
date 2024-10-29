"use client";
import React, { createContext, useContext, useState } from 'react';

// Varsayılan değer olarak bir nesne sağlayalım
const LanguageContext = createContext({
    language: 'en', // Varsayılan dil
    changeLanguage: () => {}, // Varsayılan değişim fonksiyonu
});

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('en'); // Varsayılan dil

    const changeLanguage = (lang) => {
        setLanguage(lang);
    };

    return (
        <LanguageContext.Provider value={{ language, changeLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

// Context'i kullanmak için bir hook
export const useLanguage = () => useContext(LanguageContext);
