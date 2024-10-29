'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Context için tipleri tanımlayalım
interface LanguageContextType {
    language: string;
    changeLanguage: (lang: string) => void; // Dili değiştirmek için bir fonksiyon
}

// Varsayılan değerleri belirleyelim
const defaultContextValue: LanguageContextType = {
    language: 'en',
    changeLanguage: () => {}, // Boş bir fonksiyon
};

const LanguageContext = createContext<LanguageContextType>(defaultContextValue);

interface LanguageProviderProps {
    children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
    const [language, setLanguage] = useState<string>('en'); // Varsayılan dil

    const changeLanguage = (lang: string) => {
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
