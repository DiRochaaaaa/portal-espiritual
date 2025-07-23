'use client';

import { useState, useEffect, CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { NavbarWithSuspense, FooterWithSuspense, MeditationPlayerWithSuspense } from '../../lib/LazyComponents';
import { getCurrentLocale, Locale } from '../../lib/locale';
import { BsMusicNoteBeamed, BsFillLightbulbFill } from 'react-icons/bs';
import { colors, gradients, commonStyles, motionVariants } from '../../styles/shared';
import { adaptMantraFormat, getTranslatedContent } from '../../lib/utils';

// Page-specific styles extending common styles
const styles: Record<string, CSSProperties> = {
  ...commonStyles,
  icon: {
    fontSize: '3.5rem',
    marginBottom: '24px',
    ...gradients.goldText,
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
  explanation: {
    fontSize: '0.95rem',
    textAlign: 'center',
    color: colors.text.muted,
    maxWidth: '600px',
    margin: '0 auto 32px',
    lineHeight: '1.6',
    padding: '16px',
    background: colors.backgrounds.highlight,
    backdropFilter: 'blur(10px)',
    borderRadius: '12px',
    border: `1px solid ${colors.borders.medium}`,
  },
  musicNotes: {
    position: 'absolute',
    fontSize: '24px',
    opacity: 0,
    ...gradients.goldText,
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
      youtubeId: "lUKJrkKnQOQ",
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
      color: colors.gold.main
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
      youtubeId: "lUKJrkKnQOQ",
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
      color: colors.gold.main
    }
  ],
  en: [
    {
      id: "mantra-1",
      title: "Angelic Sound to Attract Angels",
      youtubeId: "DXNA9A68GTY",
      description: "This angelic sound was created to elevate your vibration and help connect with the energy of angels. Recommended for daily meditation.",
      objective: "Angelic Connection",
      color: "#7B68EE"
    },
    {
      id: "mantra-2",
      title: "432Hz Frequency for Energy Cleansing",
      youtubeId: "lUKJrkKnQOQ",
      description: "The 432Hz frequency is aligned with the natural vibration of the universe. This meditation helps clear energy blockages and promote inner harmony.",
      objective: "Energy Cleansing",
      color: "#4CAF50"
    },
    {
      id: "mantra-3",
      title: "Mantra for Abundance and Prosperity",
      youtubeId: "nnjICT7yu1U",
      description: "This powerful mantra helps attract abundance and prosperity into your life, removing blockages and opening channels to receive blessings.",
      objective: "Abundance",
      color: colors.gold.main
    }
  ],
  fr: [
    {
      id: "mantra-1",
      title: "Son Angélique pour Attirer les Anges",
      youtubeId: "DXNA9A68GTY",
      description: "Ce son angélique a été créé pour élever votre vibration et vous aider à vous connecter avec l'énergie des anges. Recommandé pour la méditation quotidienne.",
      objective: "Connexion Angélique",
      color: "#7B68EE"
    },
    {
      id: "mantra-2",
      title: "Fréquence 432Hz pour le Nettoyage Énergétique",
      youtubeId: "lUKJrkKnQOQ",
      description: "La fréquence 432Hz est alignée avec la vibration naturelle de l'univers. Cette méditation aide à nettoyer les blocages énergétiques et à promouvoir l'harmonie intérieure.",
      objective: "Nettoyage Énergétique",
      color: "#4CAF50"
    },
    {
      id: "mantra-3",
      title: "Mantra pour l'Abondance et la Prospérité",
      youtubeId: "nnjICT7yu1U",
      description: "Ce puissant mantra aide à attirer l'abondance et la prospérité dans votre vie, en supprimant les blocages et en ouvrant les canaux pour recevoir les bénédictions.",
      objective: "Abondance",
      color: colors.gold.main
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
    },
    en: {
      title: "Angelic Song",
      subtitle: "Music to elevate your spiritual vibration",
      explanation: "Choose one of the mantras below and click 'Play' to begin your meditation journey. These songs have been carefully selected to elevate your vibrational frequency and help connect with higher energies.",
      tip: "Click the 'Play' button or directly on the center circle to start audio playback. Make sure your device's sound is turned on."
    },
    fr: {
      title: "Chanson Angélique",
      subtitle: "Musique pour élever votre vibration spirituelle",
      explanation: "Choisissez l'un des mantras ci-dessous et cliquez sur 'Jouer' pour commencer votre voyage de méditation. Ces chansons ont été soigneusement sélectionnées pour élever votre fréquence vibratoire et aider à la connexion avec les énergies supérieures.",
      tip: "Cliquez sur le bouton 'Jouer' ou directement sur le cercle central pour démarrer la lecture audio. Assurez-vous que le son de votre appareil est activé."
    }
  };

  const t = getTranslatedContent(translations, locale);
  const currentMantras = mantras[locale as keyof typeof mantras] || mantras.pt;

  return (
    <main style={styles.container}>
      <NavbarWithSuspense />

      <motion.div 
        style={styles.content}
        {...motionVariants.fadeInUp}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          style={styles.harp}
          {...motionVariants.scaleIn}
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
          {...motionVariants.fadeIn}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {t.subtitle}
        </motion.p>
        
        <motion.div 
          style={styles.explanation}
          {...motionVariants.scaleIn}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {t.explanation}
        </motion.div>
        
        <motion.div
          style={styles.playerContainer}
          {...motionVariants.fadeInUp}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <MeditationPlayerWithSuspense mantras={currentMantras.map(adaptMantraFormat)} locale={locale} />
          
          <motion.div 
            style={{
              backgroundColor: colors.backgrounds.highlight,
              padding: '12px 16px',
              borderRadius: '8px',
              marginTop: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              border: `1px dashed ${colors.borders.gold}`
            }}
            {...motionVariants.fadeIn}
            transition={{ delay: 1 }}
          >
            <span style={{ ...gradients.goldText, fontSize: '1.2rem' }}>
              <BsFillLightbulbFill />
            </span>
            <p style={{ margin: 0, fontSize: '0.9rem', color: colors.text.light }}>
              {t.tip}
            </p>
          </motion.div>
        </motion.div>
      </motion.div>

      <FooterWithSuspense />
    </main>
  );
}