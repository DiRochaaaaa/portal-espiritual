'use client';

import { useState, useEffect, CSSProperties } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import MeditationPlayer from '../../components/MeditationPlayer';
import { getCurrentLocale, Locale } from '../../lib/locale';
import { BsMusicNoteBeamed } from 'react-icons/bs';
import { BsFillLightbulbFill } from 'react-icons/bs';

const styles: Record<string, CSSProperties> = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    background: 'linear-gradient(to bottom, #150022, #4A0072, #150022)',
    color: 'white',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '120px 24px 60px',
    width: '100%',
    maxWidth: '800px',
    margin: '0 auto',
  },
  title: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 'clamp(2rem, 5vw, 3rem)',
    fontWeight: 700,
    textAlign: 'center',
    marginBottom: '24px',
    background: 'linear-gradient(to right, white, #D4AF37, white)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  subtitle: {
    fontSize: '1.1rem',
    textAlign: 'center',
    marginBottom: '48px',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  icon: {
    fontSize: '3.5rem',
    marginBottom: '24px',
    color: '#D4AF37',
    filter: 'drop-shadow(0 0 8px rgba(212, 175, 55, 0.4))',
  },
  harp: {
    position: 'relative',
    width: '120px',
    height: '120px',
    margin: '0 auto 32px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playerContainer: {
    width: '100%',
    marginTop: '32px',
    marginBottom: '48px',
  },
  divider: {
    width: '100%',
    maxWidth: '600px',
    height: '1px',
    margin: '3rem auto',
    background: 'linear-gradient(to right, transparent, rgba(212, 175, 55, 0.5), transparent)',
  },
  explanation: {
    fontSize: '0.95rem',
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.8)',
    maxWidth: '600px',
    margin: '0 auto 32px',
    lineHeight: '1.6',
    padding: '16px',
    background: 'rgba(123, 31, 162, 0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: '12px',
    border: '1px solid rgba(123, 31, 162, 0.3)',
  },
  musicNotes: {
    position: 'absolute',
    fontSize: '24px',
    opacity: 0,
    color: '#D4AF37',
  }
};

// Definição dos mantras disponíveis
const mantras = {
  pt: [
    {
      id: "mantra-1",
      title: "Som Angélical Para Atrair Anjos",
      youtubeId: "DXNA9A68GTY",
      description: "Este som angélical foi criado para elevar sua vibração e ajudar a conectar-se com a energia dos anjos. Recomendado para meditação diária.",
      objective: "Conexão Angelical",
      color: "#7B68EE"
    },
    {
      id: "mantra-2",
      title: "Frequência 432Hz para Limpeza Energética",
      youtubeId: "1AyuYJG_7WE",
      description: "A frequência 432Hz está alinhada com a vibração natural do universo. Esta meditação ajuda a limpar bloqueios energéticos e promover harmonia interior.",
      objective: "Limpeza Energética",
      color: "#4CAF50"
    },
    {
      id: "mantra-3",
      title: "Mantra para Abundância e Prosperidade",
      youtubeId: "nnjICT7yu1U",
      description: "Este poderoso mantra ajuda a atrair abundância e prosperidade para sua vida, removendo bloqueios e abrindo canais para receber bênçãos.",
      objective: "Abundância",
      color: "#D4AF37"
    }
  ],
  es: [
    {
      id: "mantra-1",
      title: "Sonido Angelical Para Atraer Ángeles",
      youtubeId: "DXNA9A68GTY",
      description: "Este sonido angelical fue creado para elevar tu vibración y ayudarte a conectarte con la energía de los ángeles. Recomendado para meditación diaria.",
      objective: "Conexión Angelical",
      color: "#7B68EE"
    },
    {
      id: "mantra-2",
      title: "Frecuencia 432Hz para Limpieza Energética",
      youtubeId: "1AyuYJG_7WE",
      description: "La frecuencia 432Hz está alineada con la vibración natural del universo. Esta meditación ayuda a limpiar bloqueos energéticos y promover armonía interior.",
      objective: "Limpieza Energética",
      color: "#4CAF50"
    },
    {
      id: "mantra-3",
      title: "Mantra para Abundancia y Prosperidad",
      youtubeId: "nnjICT7yu1U",
      description: "Este poderoso mantra ayuda a atraer abundancia y prosperidad a tu vida, eliminando bloqueos y abriendo canales para recibir bendiciones.",
      objective: "Abundancia",
      color: "#D4AF37"
    }
  ]
};

export default function CancaoAngelicalPage() {
  const [locale, setLocale] = useState<Locale>('pt');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setLocale(getCurrentLocale());
  }, []);

  if (!mounted) return null;

  const translations = {
    pt: {
      title: "Canção Angelical",
      subtitle: "Músicas para elevar sua vibração espiritual",
      explanation: "Escolha um dos mantras abaixo e clique em 'Tocar' para iniciar sua jornada de meditação. Estas canções foram cuidadosamente selecionadas para elevar sua frequência vibracional e ajudar na conexão com energias superiores.",
      tip: "Clique no botão 'Tocar' ou diretamente no círculo central para iniciar a reprodução do áudio. Certifique-se que o som do seu dispositivo está ligado."
    },
    es: {
      title: "Canción Angelical",
      subtitle: "Música para elevar tu vibración espiritual",
      explanation: "Elige uno de los mantras a continuación y haz clic en 'Reproducir' para comenzar tu viaje de meditación. Estas canciones han sido cuidadosamente seleccionadas para elevar tu frecuencia vibracional y ayudar en la conexión con energías superiores.",
      tip: "Haz clic en el botón 'Reproducir' o directamente en el círculo central para iniciar la reproducción del audio. Asegúrate de que el sonido de tu dispositivo esté encendido."
    }
  };

  const t = translations[locale];
  const currentMantras = mantras[locale];

  return (
    <main style={styles.container}>
      <Navbar />

      <motion.div 
        style={styles.content}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          style={styles.harp}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div style={styles.icon}>
            <BsMusicNoteBeamed size={42} />
          </div>
          <motion.span 
            style={{...styles.musicNotes, top: '-20px', left: '10px'}}
            animate={{ 
              opacity: [0, 1, 0],
              y: [0, -30],
              x: [0, 15],
              rotate: [0, 10]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              repeatDelay: 0.5 
            }}
          >
            ♪
          </motion.span>
          <motion.span 
            style={{...styles.musicNotes, top: '-15px', right: '10px'}}
            animate={{ 
              opacity: [0, 1, 0],
              y: [0, -40],
              x: [0, -10],
              rotate: [0, -15]
            }}
            transition={{ 
              duration: 2.5, 
              repeat: Infinity, 
              delay: 0.3,
              repeatDelay: 0.7
            }}
          >
            ♫
          </motion.span>
        </motion.div>
        
        <motion.h1 
          style={styles.title}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {t.title}
        </motion.h1>
        
        <motion.p 
          style={styles.subtitle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {t.subtitle}
        </motion.p>
        
        <motion.div 
          style={styles.explanation}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {t.explanation}
        </motion.div>
        
        <motion.div
          style={styles.playerContainer}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <MeditationPlayer mantras={currentMantras} locale={locale} />
          
          <motion.div 
            style={{
              backgroundColor: 'rgba(123, 31, 162, 0.2)',
              padding: '12px 16px',
              borderRadius: '8px',
              marginTop: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              border: '1px dashed rgba(212, 175, 55, 0.4)'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <span style={{ color: '#D4AF37', fontSize: '1.2rem' }}>
              <BsFillLightbulbFill />
            </span>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.9)' }}>
              {t.tip}
            </p>
          </motion.div>
        </motion.div>
      </motion.div>

      <Footer />
    </main>
  );
} 