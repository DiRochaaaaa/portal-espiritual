'use client';

import { useCallback, useEffect, useState, CSSProperties } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { toggleLocale, getCurrentLocale, Locale } from '../lib/locale';
import { usePathname, useRouter } from 'next/navigation';
import { BsChatSquareFill } from 'react-icons/bs';
import { BsMusicNoteBeamed } from 'react-icons/bs';

const styles: Record<string, CSSProperties> = {
  navbar: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    padding: '0.6rem 0.8rem',
    backgroundColor: 'rgba(21, 0, 34, 0.9)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid rgba(123, 31, 162, 0.3)',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
  },
  container: {
    maxWidth: '1280px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'nowrap',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
  },
  logoText: {
    fontFamily: "'Playfair Display', serif",
    color: '#D4AF37',
    fontSize: '1.25rem',
    letterSpacing: '0.05em',
    textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
  },
  logoTextMobile: {
    fontSize: '0.95rem',
    letterSpacing: '0.02em',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    maxWidth: '100%',
    display: 'inline-block',
  },
  langButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
    color: 'rgba(255, 255, 255, 0.9)',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '0.25rem 0.5rem',
    fontSize: '0.875rem',
    transition: 'color 0.3s ease',
  },
  navButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(123, 31, 162, 0.3)',
    color: 'white',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    border: '1px solid rgba(123, 31, 162, 0.5)',
    margin: '0 5px',
    padding: 0,
    cursor: 'pointer',
    fontSize: '1.1rem',
    transition: 'all 0.2s ease',
  },
  navActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  backButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    color: 'rgba(255, 255, 255, 0.9)',
    background: 'rgba(67, 16, 91, 0.8)',
    border: '1px solid rgba(123, 31, 162, 0.5)',
    borderRadius: '24px',
    cursor: 'pointer',
    padding: '0.35rem 0.7rem',
    fontSize: '0.875rem',
    transition: 'all 0.3s ease',
    textDecoration: 'none',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
  },
  backButtonIcon: {
    fontSize: '1.1rem',
  },
  leftSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    minWidth: 0,
    flexGrow: 1,
  },
  buttonText: {
    display: 'block',
  },
  buttonTextHidden: {
    display: 'none',
  },
  messageButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.3rem',
    backgroundColor: 'rgba(67, 16, 91, 0.8)',
    color: 'white',
    borderRadius: '24px',
    border: '1px solid rgba(123, 31, 162, 0.5)',
    padding: '0.35rem 0.7rem',
    cursor: 'pointer',
    fontSize: '0.875rem',
    transition: 'all 0.2s ease',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
  },
  messageButtonMobile: {
    padding: '0.25rem 0.5rem',
    fontSize: '0.8rem',
  },
  messageIcon: {
    fontSize: '1rem',
  },
  langButtonCircular: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: 'rgba(67, 16, 91, 0.8)',
    color: 'white',
    border: '1px solid rgba(123, 31, 162, 0.5)',
    cursor: 'pointer',
    fontSize: '0.85rem',
    fontWeight: 'bold',
    transition: 'all 0.2s ease',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
  },
  langButtonCircularMobile: {
    width: '28px',
    height: '28px',
    fontSize: '0.75rem',
  },
};

export default function Navbar() {
  const [locale, setLocale] = useState<Locale>('pt');
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === '/';
  
  // Wait for client-side rendering to access cookies
  useEffect(() => {
    setMounted(true);
    setLocale(getCurrentLocale());
    
    // Verificar se é dispositivo móvel
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 580);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  const handleToggleLanguage = useCallback(() => {
    toggleLocale();
  }, []);
  
  // Este método não funcionará se não houver histórico de navegação
  const handleBack = useCallback(() => {
    try {
      router.back();
    } catch (e) {
      // Fallback para a página inicial se router.back() falhar
      router.push('/');
    }
  }, [router]);
  
  const translations = {
    pt: {
      back: "Voltar",
      messages: "Mensagens",
      music: "Canção"
    },
    es: {
      back: "Volver",
      messages: "Mensajes",
      music: "Canción"
    }
  };

  const t = translations[locale];
  
  if (!mounted) return null;
  
  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        <div style={styles.leftSection}>
          {!isHomePage && (
            <Link href="/" style={{ textDecoration: 'none' }}>
              <motion.div
                style={styles.backButton}
                whileHover={{ 
                  scale: 1.05, 
                  backgroundColor: 'rgba(87, 26, 111, 0.9)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)' 
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <span style={styles.backButtonIcon}>←</span>
                <span>{t.back}</span>
              </motion.div>
            </Link>
          )}
          <Link href="/" style={styles.logo}>
            <motion.span 
              style={{
                ...styles.logoText,
                ...(isMobile ? styles.logoTextMobile : {})
              }}
              whileHover={{ 
                color: '#F0D78C',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.4)' 
              }}
            >
              {isMobile ? (
                <>
                  <span style={{ marginRight: '4px', fontSize: '1.1rem' }}>✧</span>
                  <span style={{ fontSize: '0.95rem' }}>Portal Espiritual</span>
                </>
              ) : (
                <>
                  <span style={{ marginRight: '8px', fontSize: '1.4rem' }}>✧</span>
                  Portal Espiritual
                </>
              )}
            </motion.span>
          </Link>
        </div>
        
        <div style={{
          ...styles.navActions,
          gap: isMobile ? '0.5rem' : '0.75rem'
        }}>
          <Link href="/mensagens" style={{ textDecoration: 'none' }}>
            <motion.button
              style={{
                ...styles.messageButton,
                ...(isMobile ? styles.messageButtonMobile : {})
              }}
              whileHover={{ 
                scale: 1.05, 
                backgroundColor: 'rgba(87, 26, 111, 0.9)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)' 
              }}
              whileTap={{ scale: 0.95 }}
            >
              <BsChatSquareFill style={styles.messageIcon} />
              <span style={isMobile ? styles.buttonTextHidden : styles.buttonText}>{t.messages}</span>
            </motion.button>
          </Link>
          
          <Link href="/cancao" style={{ textDecoration: 'none' }}>
            <motion.button
              style={{
                ...styles.messageButton,
                ...(isMobile ? styles.messageButtonMobile : {})
              }}
              whileHover={{ 
                scale: 1.05, 
                backgroundColor: 'rgba(87, 26, 111, 0.9)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)' 
              }}
              whileTap={{ scale: 0.95 }}
            >
              <BsMusicNoteBeamed style={styles.messageIcon} />
              <span style={isMobile ? styles.buttonTextHidden : styles.buttonText}>{t.music}</span>
            </motion.button>
          </Link>
          
          <motion.button
            style={{
              ...styles.langButtonCircular,
              ...(isMobile ? styles.langButtonCircularMobile : {})
            }}
            whileHover={{ 
              scale: 1.1, 
              backgroundColor: 'rgba(87, 26, 111, 0.9)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)' 
            }}
            whileTap={{ scale: 0.9 }}
            onClick={handleToggleLanguage}
            aria-label={locale === 'pt' ? 'Mudar para Espanhol' : 'Cambiar a Portugués'}
          >
            <span>{locale === 'pt' ? 'ES' : 'PT'}</span>
          </motion.button>
        </div>
      </div>
    </nav>
  );
} 