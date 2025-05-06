'use client';

import { useState, useEffect, useRef, CSSProperties } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import BonusSection from '../components/BonusSection';
import SpiritualQuotes from '../components/SpiritualQuotes';
import { getCurrentLocale, Locale } from '../lib/locale';
import Footer from '../components/Footer';

const styles: Record<string, CSSProperties> = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    background: 'linear-gradient(to bottom, #150022, #4A0072, #150022)',
    color: 'white',
    touchAction: 'manipulation',
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    padding: '6rem 1rem 3rem',
    touchAction: 'manipulation',
  },
  heading: {
    fontSize: 'clamp(2rem, 5vw, 4rem)',
    fontFamily: "'Playfair Display', serif",
    textAlign: 'center',
    marginBottom: '2rem',
    background: 'linear-gradient(to right, white, #D4AF37, white)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  button: {
    padding: '0.75rem 2rem',
    margin: '0 auto',
    display: 'block',
    background: 'linear-gradient(to right, #7B1FA2, #9C27B0)',
    color: 'white',
    borderRadius: '0.5rem',
    fontWeight: 500,
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    touchAction: 'manipulation',
  },
  resetButton: {
    position: 'absolute',
    bottom: '10px',
    left: '50%',
    transform: 'translateX(-50%)',
    padding: '0.5rem 1rem',
    fontSize: '0.75rem',
    background: 'rgba(123, 31, 162, 0.3)',
    color: 'rgba(255, 255, 255, 0.7)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  footer: {
    width: '100%',
    padding: '1rem 0',
    textAlign: 'center',
    fontSize: '0.875rem',
    color: 'rgba(255, 255, 255, 0.4)',
    position: 'relative',
  },
  divider: {
    width: '100%',
    maxWidth: '600px',
    height: '1px',
    margin: '3rem auto',
    background: 'linear-gradient(to right, transparent, rgba(212, 175, 55, 0.5), transparent)',
  },
  videoContainer: {
    width: '100%',
    maxWidth: '64rem',
    marginTop: '2rem',
    marginLeft: 'auto',
    marginRight: 'auto',
  }
};

// Chave para armazenar o estado do vídeo no localStorage
const VIDEO_STATE_KEY = 'portalEspiritual_videoShown';

export default function HomePage() {
  const [showVideo, setShowVideo] = useState<boolean>(false);
  const [locale, setLocale] = useState<Locale>('pt');
  const [mounted, setMounted] = useState<boolean>(false);
  const [showDebugButton, setShowDebugButton] = useState<boolean>(false);
  
  // Referência para a div do vídeo
  const videoContainerRef = useRef<HTMLDivElement>(null);
  
  // Efeito para configuração inicial
  useEffect(() => {
    setMounted(true);
    setLocale(getCurrentLocale());
    
    // Configuração de debug - mostrar botão de reset se clicar 5 vezes no footer
    let clickCount = 0;
    const handleFooterClick = () => {
      clickCount++;
      if (clickCount >= 5) {
        setShowDebugButton(true);
        clickCount = 0;
      }
    };
    
    const footer = document.querySelector('footer');
    if (footer) {
      footer.addEventListener('click', handleFooterClick);
    }
    
    // Recuperar o estado do vídeo do localStorage
    try {
      const savedVideoState = localStorage.getItem(VIDEO_STATE_KEY);
      if (savedVideoState === 'true') {
        setShowVideo(true);
      }
    } catch (error) {
      console.error('Erro ao acessar localStorage:', error);
    }
    
    // Cleanup
    return () => {
      if (footer) {
        footer.removeEventListener('click', handleFooterClick);
      }
    };
  }, []);
  
  // Efeito para controlar o script do vídeo
  useEffect(() => {
    if (!showVideo || !videoContainerRef.current) return;
    
    // Limpar qualquer script existente
    const existingScripts = document.querySelectorAll('script[id^="scr_"]');
    existingScripts.forEach(script => script.remove());
    
    // Definir o ID do vídeo com base no idioma
    const videoId = locale === 'pt' ? '6734ea56e0f4c0000b8e807e' : '68193ae1d508bf236b3df1a1';
    
    // Configurar o HTML do vídeo
    videoContainerRef.current.innerHTML = `
      <div id="vid_${videoId}" style="position: relative; width: 100%; padding: 56.25% 0 0;">
        <img id="thumb_${videoId}" src="https://images.converteai.net/28d41dbd-cd23-4eac-a930-66e1aca584eb/players/${videoId}/thumbnail.jpg" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; display: block;" alt="thumbnail">
        <div id="backdrop_${videoId}" style="-webkit-backdrop-filter: blur(5px); backdrop-filter: blur(5px); position: absolute; top: 0; height: 100%; width: 100%;"></div>
      </div>
    `;
    
    // Adicionar o script
    const script = document.createElement('script');
    script.id = `scr_${videoId}`;
    script.type = 'text/javascript';
    script.innerHTML = `var s=document.createElement("script"); s.src="https://scripts.converteai.net/28d41dbd-cd23-4eac-a930-66e1aca584eb/players/${videoId}/player.js", s.async=!0,document.head.appendChild(s);`;
    document.body.appendChild(script);
    
    return () => {
      // Remover script ao desmontar
      const scriptToRemove = document.getElementById(`scr_${videoId}`);
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [showVideo, locale]);
  
  // Manipulador para iniciar a leitura
  const handleStartReading = () => {
    try {
      localStorage.setItem(VIDEO_STATE_KEY, 'true');
    } catch (error) {
      console.error('Erro ao salvar no localStorage:', error);
    }
    
    setShowVideo(true);
  };

  // Função para resetar o vídeo (debug)
  const resetVideo = () => {
    try {
      localStorage.removeItem(VIDEO_STATE_KEY);
    } catch (error) {
      console.error('Erro ao remover do localStorage:', error);
    }
    
    setShowVideo(false);
    window.location.reload();
  };
  
  if (!mounted) return null;
  
  const translations = {
    pt: {
      title: "Bem-vindo ao Tarô dos Anjos",
      startReading: "Iniciar minha Leitura",
      resetButton: "Resetar Vídeo"
    },
    es: {
      title: "Bienvenido al Tarot de los Ángeles",
      startReading: "Iniciar mi Lectura",
      resetButton: "Resetear Video"
    }
  };
  
  const t = translations[locale];
  
  return (
    <main style={styles.container}>
      <Navbar />
      
      <div style={styles.contentContainer}>
        <motion.h1 
          style={styles.heading}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t.title}
        </motion.h1>
        
        <motion.div
          style={{ width: '100%', maxWidth: '64rem', touchAction: 'manipulation' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {!showVideo && (
            <motion.button
              style={styles.button}
              whileHover={{ 
                scale: 1.05, 
                background: 'linear-gradient(to right, #D4AF37, #7B1FA2)'
              }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStartReading}
            >
              {t.startReading}
            </motion.button>
          )}
          
          {/* Vídeo renderizado diretamente na página principal */}
          {showVideo && (
            <div style={styles.videoContainer} ref={videoContainerRef} />
          )}
          
          {showVideo && (
            <>
              <motion.div 
                style={styles.divider}
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: '100%' }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />
              <BonusSection locale={locale} />
              <div style={styles.divider} />
              <SpiritualQuotes />
            </>
          )}
        </motion.div>
      </div>
      
      {/* Substituir o rodapé atual pelo novo componente Footer */}
      <Footer showDebugButton={showDebugButton} onResetVideo={resetVideo} />
    </main>
  );
} 