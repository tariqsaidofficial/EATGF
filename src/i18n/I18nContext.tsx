
import React, { createContext, useContext, useState, useEffect } from 'react';
import { resources } from './resources';

type Language = 'en' | 'es';

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  // Load language from local storage on mount
  useEffect(() => {
    const savedLang = localStorage.getItem('nexus_lang') as Language;
    if (savedLang && (savedLang === 'en' || savedLang === 'es')) {
      setLanguage(savedLang);
    }
  }, []);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('nexus_lang', lang);
  };

  const t = (path: string) => {
    const keys = path.split('.');
    let current: any = resources[language];
    for (const key of keys) {
      if (current[key] === undefined) {
        // Fallback to key or part of key if missing
        // console.warn(`Missing translation for key: ${path} in language: ${language}`);
        return path.split('.').pop() || path;
      }
      current = current[key];
    }
    return current;
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage: changeLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useTranslation must be used within an I18nProvider');
  }
  return context;
};
