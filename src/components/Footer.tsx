'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getCurrentLocale, Locale } from '../lib/locale';

interface FooterProps {
  showDebugButton?: boolean;
  onResetVideo?: () => void;
}

const Footer: React.FC<FooterProps> = ({ showDebugButton = false, onResetVideo }) => {
  const [locale, setLocale] = useState<Locale>('pt');
  const [mounted, setMounted] = useState(false);
  const [currentYear, setCurrentYear] = useState(2025);
  const [clickCount, setClickCount] = useState(0);
  const [showDebug, setShowDebug] = useState(showDebugButton);

  useEffect(() => {
    setMounted(true);
    setLocale(getCurrentLocale());
    setCurrentYear(new Date().getFullYear());
  }, []);

  // Handle clicks on footer for debug button
  const handleFooterClick = () => {
    if (!showDebug && onResetVideo) {
      setClickCount(prev => {
        const newCount = prev + 1;
        if (newCount >= 5) {
          setShowDebug(true);
          return 0;
        }
        return newCount;
      });
    }
  };

  if (!mounted) return null;

  const translations = {
    pt: {
      rights: "Todos os direitos reservados",
      privacyPolicy: "Política de Privacidade",
      termsOfUse: "Termos de Uso",
      cookies: "Política de Cookies",
      contact: "Contato",
      company: "ARTEMI LTDA",
      resetButton: "Resetar Vídeo"
    },
    es: {
      rights: "Todos los derechos reservados",
      privacyPolicy: "Política de Privacidad",
      termsOfUse: "Términos de Uso",
      cookies: "Política de Cookies",
      contact: "Contacto",
      company: "ARTEMI LTDA",
      resetButton: "Reiniciar Video"
    }
  };

  const t = translations[locale];

  const footerStyle = {
    width: '100%',
    padding: '2rem 1rem 1rem',
    backgroundColor: 'rgba(21, 0, 34, 0.95)',
    borderTop: '1px solid rgba(123, 31, 162, 0.3)',
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: '0.85rem',
    textAlign: 'center' as const,
  };

  const containerStyle = {
    maxWidth: '1280px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '1.5rem',
  };

  const linksContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap' as const,
    justifyContent: 'center',
    gap: '1rem 2rem',
    margin: '0.5rem 0',
  };

  const linkStyle = {
    color: 'rgba(255, 255, 255, 0.7)',
    textDecoration: 'none',
    transition: 'color 0.2s ease',
    fontSize: '0.85rem',
  };

  const copyrightStyle = {
    marginTop: '1rem',
    fontSize: '0.8rem',
    color: 'rgba(255, 255, 255, 0.5)',
  };

  const dividerStyle = {
    width: '80%',
    maxWidth: '400px',
    height: '1px',
    margin: '0.5rem auto',
    background: 'linear-gradient(to right, transparent, rgba(123, 31, 162, 0.5), transparent)',
  };

  const companyInfoStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.85rem',
  };

  const resetButtonStyle = {
    padding: '0.3rem 0.8rem',
    backgroundColor: 'rgba(123, 31, 162, 0.5)',
    color: 'white',
    border: '1px solid rgba(123, 31, 162, 0.7)',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.8rem',
    marginTop: '1rem',
    transition: 'all 0.2s ease',
  };

  return (
    <footer style={footerStyle} onClick={handleFooterClick}>
      <div style={containerStyle}>
        <div style={linksContainerStyle}>
          <Link href="/politicas/privacidade" style={linkStyle}>
            <motion.span whileHover={{ color: '#D4AF37' }}>
              {t.privacyPolicy}
            </motion.span>
          </Link>
          <Link href="/politicas/termos" style={linkStyle}>
            <motion.span whileHover={{ color: '#D4AF37' }}>
              {t.termsOfUse}
            </motion.span>
          </Link>
          <Link href="/politicas/cookies" style={linkStyle}>
            <motion.span whileHover={{ color: '#D4AF37' }}>
              {t.cookies}
            </motion.span>
          </Link>
          <Link href="/contato" style={linkStyle}>
            <motion.span whileHover={{ color: '#D4AF37' }}>
              {t.contact}
            </motion.span>
          </Link>
        </div>

        <div style={dividerStyle} />
        
        <div style={companyInfoStyle}>
          <p>{t.company}</p>
          <p>
            <a 
              href="mailto:adm.artemi@gmail.com" 
              style={{...linkStyle, color: 'rgba(212, 175, 55, 0.8)'}}
            >
              adm.artemi@gmail.com
            </a>
          </p>
        </div>

        <div style={copyrightStyle}>
          <p>© {currentYear} Portal Espiritual | {t.rights}</p>
          
          {/* Botão de debug - mostrado após 5 cliques no footer ou se passado via props */}
          {showDebug && onResetVideo && (
            <motion.button 
              style={resetButtonStyle}
              whileHover={{ 
                backgroundColor: 'rgba(123, 31, 162, 0.7)',
                scale: 1.05 
              }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                onResetVideo();
              }}
            >
              {t.resetButton}
            </motion.button>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer; 