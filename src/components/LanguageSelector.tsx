'use client';

import React from 'react';
import { Locale } from '../lib/locale';
import Cookies from 'js-cookie';
import { useLanguage } from '@/context/LanguageContext';

interface LanguageSelectorProps {
  onClose: () => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ onClose }) => {
  const { setLocale } = useLanguage();

  const handleSelectLanguage = (locale: Locale) => {
    setLocale(locale);
    Cookies.remove('NEEDS_LANGUAGE_SELECTION');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-purple-900 to-indigo-800 rounded-lg p-6 shadow-xl max-w-sm w-full mx-4 border border-purple-500">
        <h2 className="text-xl font-bold text-white mb-4 text-center">Selecione seu idioma</h2>
        <h2 className="text-lg font-semibold text-white mb-6 text-center">Seleccione su idioma</h2>
        
        <div className="flex flex-col space-y-4">
          <button
            onClick={() => handleSelectLanguage('pt')}
            className="py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition duration-200 flex items-center justify-center"
          >
            <span className="mr-2">🇧🇷</span> Português
          </button>
          
          <button
            onClick={() => handleSelectLanguage('es')}
            className="py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition duration-200 flex items-center justify-center"
          >
            <span className="mr-2">🇪🇸</span> Español
          </button>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector; 