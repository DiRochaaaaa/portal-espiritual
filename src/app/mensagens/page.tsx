'use client';

import { useState, useEffect, CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { NavbarWithSuspense, SpiritualQuotesWithSuspense } from '../../lib/LazyComponents';
import { getCurrentLocale, Locale } from '../../lib/locale';

const styles: Record<string, CSSProperties> = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    background: 'linear-gradient(to bottom, #150022, #4A0072, #150022)',
    color: 'white',
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexGrow: 1,
    padding: '6rem 1rem 3rem',
  },
  heading: {
    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
    fontFamily: "'Playfair Display', serif",
    textAlign: 'center',
    marginBottom: '2rem',
    background: 'linear-gradient(to right, #D4AF37, #FFD700, #D4AF37)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  subheading: {
    fontSize: 'clamp(1rem, 3vw, 1.5rem)',
    textAlign: 'center',
    maxWidth: '800px',
    margin: '0 auto 3rem',
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 1.6,
  },
  footer: {
    width: '100%',
    padding: '1rem 0',
    textAlign: 'center',
    fontSize: '0.875rem',
    color: 'rgba(255, 255, 255, 0.4)',
  },
};

export default function MensagensPage() {
  const [locale, setLocale] = useState<Locale>('pt');
  const [mounted, setMounted] = useState<boolean>(false);
  
  useEffect(() => {
    setMounted(true);
    setLocale(getCurrentLocale());
  }, []);
  
  if (!mounted) return null;
  
  const translations = {
    pt: {
      title: "Mensagens de Sabedoria Espiritual",
      subtitle: "Navegue por nossa coleção de inspirações que podem guiar sua jornada espiritual e trazer paz interior."
    },
    es: {
      title: "Mensajes de Sabiduría Espiritual",
      subtitle: "Explore nuestra colección de inspiraciones que pueden guiar su viaje espiritual y traer paz interior."
    }
  };
  
  const t = translations[locale];
  
  return (
    <main style={styles.container}>
      <NavbarWithSuspense />
      
      <div style={styles.contentContainer}>
        <motion.h1
          style={styles.heading}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t.title}
        </motion.h1>
        
        <motion.p
          style={styles.subheading}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {t.subtitle}
        </motion.p>
        
        <motion.div
          style={{ width: '100%', maxWidth: '1024px' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <SpiritualQuotesWithSuspense />
        </motion.div>
      </div>
      
      <footer style={styles.footer}>
        <p>© 2025 Portal Espiritual</p>
      </footer>
    </main>
  );
} 