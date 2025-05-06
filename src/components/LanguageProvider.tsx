'use client';

import React, { useState, useEffect } from 'react';
import LanguageSelector from './LanguageSelector';
import { LanguageContextProvider } from '@/context/LanguageContext';
import Cookies from 'js-cookie';

interface LanguageProviderProps {
  children: React.ReactNode;
}

const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Verificamos se estamos no browser
    if (typeof window !== 'undefined') {
      const needsLanguageSelection = Cookies.get('NEEDS_LANGUAGE_SELECTION');
      
      if (needsLanguageSelection === 'true') {
        setShowLanguageSelector(true);
      }
      
      setIsLoaded(true);
    }
  }, []);

  // Função para fechar o seletor de idiomas
  const handleClose = () => {
    setShowLanguageSelector(false);
    // Remove o cookie quando o usuário fecha o seletor
    Cookies.remove('NEEDS_LANGUAGE_SELECTION');
  };

  return (
    <LanguageContextProvider>
      {children}
      {showLanguageSelector && isLoaded && <LanguageSelector onClose={handleClose} />}
    </LanguageContextProvider>
  );
};

export default LanguageProvider; 