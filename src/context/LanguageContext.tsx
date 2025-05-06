'use client';

import React, { createContext, useState, useEffect, useContext } from 'react';
import { Locale, getCurrentLocale, setLocale as setLocaleInCookie } from '../lib/locale';

type LanguageContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  isLoaded: boolean;
};

// Criando o contexto com valores padrão
const LanguageContext = createContext<LanguageContextType>({
  locale: 'pt',
  setLocale: () => {},
  isLoaded: false,
});

// Hook personalizado para usar o contexto
export const useLanguage = () => useContext(LanguageContext);

// Provider que gerencia o estado do idioma
export const LanguageContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>('pt');
  const [isLoaded, setIsLoaded] = useState(false);

  // Carregar idioma salvo ao montar o componente
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setLocaleState(getCurrentLocale());
      setIsLoaded(true);
    }
  }, []);

  // Função para atualizar o idioma
  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    setLocaleInCookie(newLocale);
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, isLoaded }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext; 