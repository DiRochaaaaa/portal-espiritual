'use client';

import { useState, useEffect, CSSProperties, memo, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { NavbarWithSuspense, FooterWithSuspense } from '../../lib/LazyComponents';
import { getCurrentLocale, Locale } from '../../lib/locale';
import { BsClock, BsCalendar, BsMusicNoteBeamed, BsStars, BsWater, BsLightningFill, BsBookFill, BsPlayCircleFill, BsPauseCircleFill, BsVolumeMuteFill, BsVolumeUpFill } from 'react-icons/bs';
import { FaHandsWash, FaSun, FaMoon, FaFeather, FaFire, FaYinYang, FaSeedling } from 'react-icons/fa';
import { GiMagicSwirl, GiSoundWaves, GiMountains, GiCrystalBall, GiMeditation, GiQuillInk, GiPeaceDove, GiLotusFlower } from 'react-icons/gi';
import { gradients, commonStyles, motionVariants, colors as sharedColors } from '../../styles/shared';
import SectionTitle from '../../components/SectionTitle';
import Card from '../../components/Card';

// Definição das cores estendidas
const colors = {
  purple: { 
    dark: '#150022', 
    medium: '#4A0072', 
    light: '#7B1FA2', 
    lighter: '#9C27B0' 
  },
  blue: {
    dark: '#1A237E',
    medium: '#303F9F',
    light: '#3F51B5'
  },
  teal: {
    dark: '#004D40',
    medium: '#00796B',
    light: '#009688'
  },
  green: {
    dark: '#1B5E20',
    medium: '#388E3C',
    light: '#4CAF50'
  },
  gold: { 
    main: '#FFD700', 
    light: '#FFECB3' 
  },
  text: { 
    light: '#FFFFFF', 
    muted: 'rgba(255, 255, 255, 0.7)', 
    dimmed: 'rgba(255, 255, 255, 0.5)',
    footer: 'rgba(255, 255, 255, 0.3)'
  },
  backgrounds: {
    card: 'rgba(21, 0, 34, 0.7)',
    section: 'rgba(74, 0, 114, 0.3)',
    glassLight: 'rgba(255, 255, 255, 0.1)',
    glassDark: 'rgba(0, 0, 0, 0.2)',
    highlight: 'rgba(156, 39, 176, 0.3)'
  },
  borders: {
    light: 'rgba(255, 255, 255, 0.1)',
    highlight: 'rgba(255, 215, 0, 0.5)',
    medium: 'rgba(255, 255, 255, 0.2)'
  }
};

// Definição de cores para cada janela do portal
const portalColors: Record<string, {
  primary: string;
  secondary: string;
  gradient: string;
  icon: JSX.Element;
}> = {
  'dawn': {
    primary: '#FFB347', // Laranja-âmbar (cor do nascer do sol)
    secondary: '#FFD700', // Dourado
    gradient: 'linear-gradient(135deg, #FFB347, #FFD700)',
    icon: <FaSun size={28} color="#FFD700" />
  },
  'noon': {
    primary: '#4CAF50', // Verde (cor da vitalidade)
    secondary: '#8BC34A', // Verde claro
    gradient: 'linear-gradient(135deg, #4CAF50, #8BC34A)',
    icon: <GiMountains size={28} color="#8BC34A" />
  },
  'night': {
    primary: '#7B1FA2', // Roxo (cor da espiritualidade)
    secondary: '#9C27B0', // Roxo claro
    gradient: 'linear-gradient(135deg, #7B1FA2, #9C27B0)',
    icon: <FaMoon size={28} color="#9C27B0" />
  }
};

// Estilos específicos da página com estética mais etérea e mágica
const styles: Record<string, CSSProperties> = {
  ...commonStyles,
  icon: {
    fontSize: '3.5rem',
    marginBottom: '24px',
    ...gradients.goldText,
    filter: 'drop-shadow(0 0 8px rgba(212, 175, 55, 0.4))',
  },
  ritualCard: {
    position: 'relative',
    marginBottom: '24px',
    padding: '0',
    background: 'rgba(21, 0, 34, 0.8)',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    border: `1px solid rgba(255, 255, 255, 0.15)`,
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
    overflow: 'hidden',
    transition: 'all 0.4s ease',
  },
  cardGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at top right, rgba(123, 31, 162, 0.15), transparent 70%)',
    zIndex: 1,
    pointerEvents: 'none',
  },
  stepHeader: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    padding: '16px 20px',
    background: 'rgba(74, 0, 114, 0.4)',
    gap: '12px',
    borderBottom: `1px solid rgba(255, 255, 255, 0.1)`,
    zIndex: 2,
    flexWrap: 'wrap',
  },
  stepNumber: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #D4AF37, #FFD700)',
    color: '#150022',
    fontWeight: 'bold',
    fontSize: '1rem',
    boxShadow: '0 3px 8px rgba(0, 0, 0, 0.3)',
    flexShrink: 0,
  },
  stepTitle: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: 'white',
    margin: 0,
    ...gradients.goldText,
  },
  stepTimeLabel: {
    marginLeft: 'auto',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '0.9rem',
    background: 'rgba(21, 0, 34, 0.6)',
    padding: '6px 12px',
    borderRadius: '20px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    color: colors.text.light,
  },
  stepContent: {
    position: 'relative',
    padding: '20px',
    zIndex: 2,
  },
  stepListItem: {
    marginBottom: '16px',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
  },
  stepListIcon: {
    fontSize: '1.2rem',
    color: colors.gold.main,
    marginTop: '2px',
    filter: 'drop-shadow(0 0 5px rgba(212, 175, 55, 0.5))',
    flexShrink: 0,
  },
  stepListText: {
    fontSize: '1rem',
    color: colors.text.muted,
    flex: 1,
    lineHeight: '1.6',
  },
  scheduleTable: {
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: '0',
    marginTop: '24px',
    marginBottom: '24px',
    background: 'rgba(21, 0, 34, 0.5)',
    backdropFilter: 'blur(10px)',
    borderRadius: '12px',
    overflow: 'hidden',
    border: '1px solid rgba(123, 31, 162, 0.3)',
  },
  tableHeader: {
    padding: '16px 20px',
    textAlign: 'left',
    fontSize: '0.95rem',
    color: colors.gold.main,
    fontWeight: 'bold',
    background: 'rgba(74, 0, 114, 0.4)',
    borderBottom: `1px solid rgba(255, 255, 255, 0.1)`,
  },
  tableCell: {
    padding: '16px 20px',
    fontSize: '0.95rem',
    color: colors.text.muted,
    borderBottom: `1px solid rgba(255, 255, 255, 0.08)`,
    lineHeight: '1.5',
  },
  tableCellHighlight: {
    color: colors.text.light,
    fontWeight: '500',
  },
  timeTag: {
    display: 'inline-block',
    background: 'rgba(123, 31, 162, 0.3)',
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '0.9rem',
    fontWeight: 'bold',
    color: '#d4b3ff',
    border: '1px solid rgba(123, 31, 162, 0.6)',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.2)',
  },
  tipsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginTop: '24px',
  },
  tipCard: {
    position: 'relative',
    background: 'rgba(21, 0, 34, 0.8)',
    borderRadius: '16px',
    border: `1px solid rgba(255, 255, 255, 0.1)`,
    padding: '24px 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    gap: '16px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
  },
  tipGlow: {
    position: 'absolute',
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(212, 175, 55, 0.1), transparent 70%)',
    top: '-75px',
    right: '-75px',
    zIndex: 1,
    pointerEvents: 'none',
  },
  tipIcon: {
    width: '56px',
    height: '56px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, rgba(21, 0, 34, 0.8), rgba(74, 0, 114, 0.6))',
    border: '1px solid rgba(212, 175, 55, 0.3)',
    fontSize: '1.8rem',
    color: '#FFD700',
    marginBottom: '6px',
    position: 'relative',
    zIndex: 2,
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
  },
  tipText: {
    fontSize: '0.95rem',
    color: colors.text.muted,
    lineHeight: '1.6',
    position: 'relative',
    zIndex: 2,
  },
  note: {
    position: 'relative',
    background: 'rgba(21, 0, 34, 0.7)',
    borderRadius: '12px',
    padding: '24px',
    marginTop: '30px',
    fontSize: '1rem',
    color: colors.text.muted,
    lineHeight: '1.6',
    border: '1px solid rgba(212, 175, 55, 0.3)',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
    overflow: 'hidden',
  },
  noteGlow: {
    position: 'absolute',
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(212, 175, 55, 0.1), transparent 70%)',
    bottom: '-100px',
    left: '-100px',
    zIndex: 1,
    pointerEvents: 'none',
  },
  chantsContainer: {
    marginTop: '24px',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px',
  },
  chantCard: {
    position: 'relative',
    background: 'rgba(21, 0, 34, 0.7)',
    borderRadius: '16px',
    border: `1px solid rgba(255, 255, 255, 0.1)`,
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
  },
  chantCardContent: {
    position: 'relative',
    padding: '20px',
    zIndex: 2,
  },
  chantCardGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at top right, rgba(123, 31, 162, 0.15), transparent 70%)',
    zIndex: 1,
    pointerEvents: 'none',
  },
  chantDay: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    marginBottom: '8px',
    ...gradients.goldText,
  },
  chantName: {
    fontSize: '0.95rem',
    color: colors.text.muted,
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  chantIcon: {
    width: '40px',
    height: '40px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    background: 'rgba(123, 31, 162, 0.2)',
    fontSize: '1.2rem',
    color: '#FFD700',
    marginRight: '12px',
    flexShrink: 0,
  },
  portalWindowDescription: {
    position: 'relative',
    padding: '20px',
    background: 'rgba(21, 0, 34, 0.7)',
    borderRadius: '12px',
    border: '1px solid rgba(123, 31, 162, 0.3)',
    marginBottom: '24px',
    fontSize: '0.95rem',
    color: colors.text.muted,
    lineHeight: '1.6',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
  },
  decorationLine: {
    width: '100%',
    height: '1px',
    background: 'linear-gradient(to right, transparent, rgba(212, 175, 55, 0.5), transparent)',
    margin: '24px 0',
  },
  highlightText: {
    position: 'relative',
    display: 'inline-block',
    fontWeight: 'bold',
    color: '#FFD700',
    padding: '0 2px',
    zIndex: 2,
  },
  highlightBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(123, 31, 162, 0.3)',
    transform: 'skew(-5deg)',
    zIndex: 1,
  },
  audioPlayer: {
    position: 'relative',
    width: '100%',
    background: 'rgba(21, 0, 34, 0.8)',
    borderRadius: '12px',
    padding: '16px',
    marginTop: '16px',
    border: '1px solid rgba(123, 31, 162, 0.3)',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
    overflow: 'hidden',
  },
  audioPlayerGlow: {
    position: 'absolute',
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(123, 31, 162, 0.2), transparent 70%)',
    bottom: '-75px',
    right: '-75px',
    zIndex: 1,
    pointerEvents: 'none',
  },
  audioControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '12px',
    position: 'relative',
    zIndex: 2,
  },
  playButton: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #7B1FA2, #9C27B0)',
    color: 'white',
    fontSize: '1.3rem',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
    transition: 'transform 0.2s ease',
    flexShrink: 0,
  },
  audioInfo: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  audioTitle: {
    fontSize: '0.9rem',
    fontWeight: 'bold',
    color: colors.text.light,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  audioDescription: {
    fontSize: '0.8rem',
    color: colors.text.muted,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  progressContainer: {
    width: '100%',
    height: '6px',
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '3px',
    position: 'relative',
    cursor: 'pointer',
    zIndex: 2,
  },
  progressBar: {
    position: 'absolute',
    left: '0',
    top: '0',
    height: '100%',
    background: 'linear-gradient(to right, #D4AF37, #FFD700)',
    borderRadius: '3px',
    transition: 'width 0.1s linear',
  },
  volumeControl: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    fontSize: '0.9rem',
    color: colors.text.muted,
    marginTop: '10px',
    zIndex: 2,
    position: 'relative',
  },
  audioButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    width: '100%',
    padding: '12px',
    backgroundColor: 'rgba(123, 31, 162, 0.3)',
    color: 'white',
    border: '1px solid rgba(123, 31, 162, 0.3)',
    borderRadius: '8px',
    fontSize: '0.95rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
    transition: 'all 0.3s ease',
  },
  audioButtonActive: {
    backgroundColor: 'rgba(123, 31, 162, 0.6)',
  },
  audioButtonIcon: {
    fontSize: '1.2rem',
    color: '#FFD700',
    filter: 'drop-shadow(0 0 5px rgba(212, 175, 55, 0.5))',
  },
};

// Função para obter a configuração de cores de uma janela pelo ID
const getPortalTheme = (id: string) => {
  return portalColors[id] || portalColors['dawn']; // Default
};

// Configurações para traduções
const translations = {
  pt: {
    pageTitle: 'Ritual Relâmpago',
    pageSubtitle: 'Um método poderoso de manifestação para alinhar suas intenções com as energias universais',
    objectiveTitle: 'Objetivo',
    objectiveDescription: 'Ensinar, de forma clara e inspiradora, como praticar o Ritual Relâmpago de manifestação durante esta semana.',
    portalWindowsTitle: 'Janelas de Abertura do Portal',
    portalWindowsDescription: 'Use em qualquer dia desta semana – horários de Brasília. Chegue dois minutos antes. Você pode escolher uma, duas ou as três janelas em cada dia para amplificar seus resultados.',
    stepByStepTitle: 'Sequência Ritual',
    stepByStepDescription: 'Siga estas etapas precisas durante a janela de abertura para maximizar o potencial de manifestação (aproximadamente 20 minutos).',
    chantsTitle: 'Cânticos Vibratórios',
    chantsDescription: 'Selecione o cântico correspondente ao dia da semana para elevar sua frequência energética e potencializar o ritual. A intenção coerente é essencial.',
    advancedTipsTitle: 'Técnicas Avançadas',
    advancedTipsDescription: 'Aplique estas práticas complementares para amplificar a potência do ritual e acelerar a manifestação dos seus desejos.',
    dawn: 'Madrugada-Alvorada',
    noon: 'Coração da Tarde',
    night: 'Noite-Estelar',
    focusPurpose: 'Propósito & clareza',
    focusAbundance: 'Vitalidade & abundância',
    focusLove: 'Amor & gratidão',
    windowColumn: 'Janela',
    timeColumn: 'Horário exato',
    focusColumn: 'Foco sugerido',
    preparation: 'Preparação rápida',
    writing: 'Escrita Relâmpago',
    vocalization: 'Selagem Vocal',
    visualization: 'Cântico & Visualização',
    water: 'Água-Âncora',
    closing: 'Encerramento',
    monday: 'Segunda & Quinta',
    tuesday: 'Terça & Sexta',
    wednesday: 'Quarta & Sábado',
    sunday: 'Domingo',
    chantsMonday: 'Mantra OM (108 ×)',
    chantsTuesday: 'Lakshmi Mantra – "Om Shreem Mahalakshmiyei Namaha"',
    chantsWednesday: 'Solfejo 528 Hz (frequência de transformação)',
    chantsSunday: 'Gayatri Mantra – versão coral',
    tipNewPage: 'Use uma folha nova a cada sessão para não misturar energias.',
    tipWearWhite: 'Vista-se de branco ou dourado.',
    tipCrystal: 'Segure um citrino (abundância) ou quartzo-rosa (amor) durante o cântico, se desejar.',
    tipSilence: 'Silêncio: não revele seus desejos até o domingo seguinte; isso preserva potência.',
    tipBurn: 'No último dia da semana, queime as folhas com cuidado e sopre as cinzas ao vento.',
    finalNote: 'Pratique com foco, gratidão e ação inspirada — e observe as sincronicidades florescerem. Boa manifestação!',
    tipNewPageTitle: 'Folha Nova',
    tipWearWhiteTitle: 'Vestimenta',
    tipCrystalTitle: 'Cristais',
    tipSilenceTitle: 'Silêncio Sagrado', 
    tipBurnTitle: 'Liberação Final',
  },
  es: {
    pageTitle: 'Ritual Relámpago',
    pageSubtitle: 'Un método poderoso de manifestación para alinear tus intenciones con las energías universales',
    objectiveTitle: 'Objetivo',
    objectiveDescription: 'Enseñar, de manera clara e inspiradora, cómo practicar el Ritual Relámpago de manifestación durante esta semana.',
    portalWindowsTitle: 'Ventanas de Apertura del Portal',
    portalWindowsDescription: 'Úsalas en cualquier día de esta semana – horarios de Brasilia. Llega dos minutos antes. Puedes elegir una, dos o las tres ventanas cada día para amplificar tus resultados.',
    stepByStepTitle: 'Secuencia Ritual',
    stepByStepDescription: 'Sigue estos pasos precisos durante la ventana de apertura para maximizar el potencial de manifestación (aproximadamente 20 minutos).',
    chantsTitle: 'Cánticos Vibratorios',
    chantsDescription: 'Selecciona el cántico correspondiente al día de la semana para elevar tu frecuencia energética y potenciar el ritual. La intención coherente es esencial.',
    advancedTipsTitle: 'Técnicas Avanzadas',
    advancedTipsDescription: 'Aplica estas prácticas complementarias para amplificar la potencia del ritual y acelerar la manifestación de tus deseos.',
    dawn: 'Madrugada-Alborada',
    noon: 'Corazón de la Tarde',
    night: 'Noche-Estelar',
    focusPurpose: 'Propósito & claridad',
    focusAbundance: 'Vitalidad & abundancia',
    focusLove: 'Amor & gratitud',
    windowColumn: 'Ventana',
    timeColumn: 'Horario exacto',
    focusColumn: 'Enfoque sugerido',
    preparation: 'Preparación rápida',
    writing: 'Escritura Relámpago',
    vocalization: 'Sellado Vocal',
    visualization: 'Cántico & Visualización',
    water: 'Agua-Ancla',
    closing: 'Cierre',
    monday: 'Lunes & Jueves',
    tuesday: 'Martes & Viernes',
    wednesday: 'Miércoles & Sábado',
    sunday: 'Domingo',
    chantsMonday: 'Mantra OM (108 ×)',
    chantsTuesday: 'Mantra de Lakshmi – "Om Shreem Mahalakshmiyei Namaha"',
    chantsWednesday: 'Solfeo 528 Hz (frecuencia de transformación)',
    chantsSunday: 'Gayatri Mantra – versión coral',
    tipNewPage: 'Usa una hoja nueva en cada sesión para no mezclar energías.',
    tipWearWhite: 'Vístete de blanco o dorado.',
    tipCrystal: 'Sostén un citrino (abundancia) o cuarzo rosa (amor) durante el cántico, si lo deseas.',
    tipSilence: 'Silencio: no reveles tus deseos hasta el domingo siguiente; esto preserva la potencia.',
    tipBurn: 'En el último día de la semana, quema las hojas con cuidado y sopla las cenizas al viento.',
    finalNote: 'Practica con enfoque, gratitud y acción inspirada — y observa cómo florecen las sincronicidades. ¡Buena manifestación!',
    tipNewPageTitle: 'Hoja Nueva',
    tipWearWhiteTitle: 'Vestimenta',
    tipCrystalTitle: 'Cristales',
    tipSilenceTitle: 'Silencio Sagrado', 
    tipBurnTitle: 'Liberación Final',
  }
};

// Detalhes das janelas do portal
const portalWindows = [
  {
    id: 'dawn',
    time: '05 h 55 → 06 h 15',
    focus: 'focusPurpose',
    icon: <FaSun />
  },
  {
    id: 'noon',
    time: '14 h 14 → 14 h 34',
    focus: 'focusAbundance',
    icon: <GiMountains />
  },
  {
    id: 'night',
    time: '22 h 22 → 22 h 42',
    focus: 'focusLove',
    icon: <FaMoon />
  }
];

// Detalhes dos passos do ritual
const ritualSteps = [
  {
    id: 'preparation',
    time: '2 min',
    icon: <GiMeditation />,
    steps: [
      'Acenda uma vela branca (opcional) e respire fundo 7 vezes.',
      'Coloque o cântico correspondente ao dia da semana para tocar suavemente ao fundo.'
    ]
  },
  {
    id: 'writing',
    time: '6 min',
    icon: <GiQuillInk />,
    steps: [
      'Escreva no topo da página: "//2025 – [hora exata]".',
      'Formule até 3 desejos no presente afirmativo como se já fossem realidade.',
      'Termine cada desejo com a frase: "Assim já é, assim agradeço."'
    ]
  },
  {
    id: 'vocalization',
    time: '3 min',
    icon: <GiSoundWaves />,
    steps: [
      'Leia cada desejo em voz alta 3 vezes consecutivas.',
      'Mantenha sua mão esquerda sobre o coração e a direita sobre a página escrita.',
      'Concentre-se na emoção de já estar vivendo esta realidade.'
    ]
  },
  {
    id: 'visualization',
    time: '6 min',
    icon: <BsLightningFill />,
    steps: [
      'Continue ouvindo ou entoando o cântico correspondente ao dia.',
      'Visualize um relâmpago dourado saindo do seu coração, envolvendo cada desejo escrito e então se projetando ao universo.',
      'Sinta a energia vibrante do relâmpago ativando a manifestação.'
    ]
  },
  {
    id: 'water',
    time: '1 min',
    icon: <BsWater />,
    steps: [
      'Segure um copo d\'água entre as mãos e sopre suavemente sobre ela.',
      'Beba metade da água, sentindo-a como condutora da energia da manifestação.',
      'Despeje a outra metade em um vaso com plantas ou diretamente na terra como oferenda.'
    ]
  },
  {
    id: 'closing',
    time: '2 min',
    icon: <BsStars />,
    steps: [
      'Agradeça em voz alta com a frase: "Portal encerrado, luz selada, gratidão!"',
      'Abafe a vela com cuidado, se estiver usando, nunca a sopre.',
      'Guarde a folha em local seguro e privado até o final da semana.'
    ]
  }
];

// Cânticos para os dias da semana
const chants = [
  {
    id: 'monday',
    days: 'monday',
    chant: 'chantsMonday',
    icon: <FaYinYang />,
    description: 'A vibração primordial que conecta com a essência criadora do universo.',
    audioUrl: 'https://leitura.tarodosanjos.online/wp-content/uploads/2025/05/segunda-e-terca-ritual-relampago.mp3',
    duration: '10:25'
  },
  {
    id: 'tuesday',
    days: 'tuesday',
    chant: 'chantsTuesday',
    icon: <GiCrystalBall />,
    description: 'Invoca a energia da deusa da prosperidade e remove bloqueios materiais.',
    audioUrl: 'https://leitura.tarodosanjos.online/wp-content/uploads/2025/05/sexta-e-sabado-ritual-relampagho.mp3',
    duration: '8:42'
  },
  {
    id: 'wednesday',
    days: 'wednesday',
    chant: 'chantsWednesday',
    icon: <BsMusicNoteBeamed />,
    description: 'Frequência que promove reparação celular e transformação energética profunda.',
    audioUrl: 'https://leitura.tarodosanjos.online/wp-content/uploads/2025/05/quarta-e-quinta-ritual-relampago.mp3',
    duration: '9:18'
  },
  {
    id: 'sunday',
    days: 'sunday',
    chant: 'chantsSunday',
    icon: <GiMagicSwirl />,
    description: 'Mantra de proteção e iluminação que expande a consciência espiritual.',
    audioUrl: 'https://leitura.tarodosanjos.online/wp-content/uploads/2025/05/domigo-ritual-relampago.mp3',
    duration: '12:01'
  }
];

// Dicas avançadas
const advancedTips = [
  {
    id: 'newPage',
    title: 'tipNewPageTitle',
    description: 'tipNewPage',
    icon: <FaFeather />
  },
  {
    id: 'wearWhite',
    title: 'tipWearWhiteTitle',
    description: 'tipWearWhite',
    icon: <GiLotusFlower />
  },
  {
    id: 'crystal',
    title: 'tipCrystalTitle',
    description: 'tipCrystal',
    icon: <GiCrystalBall />
  },
  {
    id: 'silence',
    title: 'tipSilenceTitle',
    description: 'tipSilence',
    icon: <FaHandsWash />
  },
  {
    id: 'burn',
    title: 'tipBurnTitle',
    description: 'tipBurn',
    icon: <FaFire />
  }
];

// Adicionar constante para o nome do cookie
// Antes da função useWindowSize, após a definição dos advancedTips
const RITUAL_VISITED_KEY = 'portalEspiritual_ritualVisited';

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial sizing
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

function formatTime(seconds: number) {
  if (isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

export default function RitualRelampagoPage() {
  const [locale, setLocale] = useState<Locale>('pt');
  const [mounted, setMounted] = useState(false);
  const [activeWindow, setActiveWindow] = useState<string | null>(null);
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);
  const [progress, setProgress] = useState<{[key: string]: number}>({});
  const [duration, setDuration] = useState<{[key: string]: number}>({});
  const [volume, setVolume] = useState<{[key: string]: number}>({});
  const audioRefs = useRef<{[key: string]: HTMLAudioElement | null}>({});
  const progressInterval = useRef<{[key: string]: NodeJS.Timeout | null}>({});
  const { width } = useWindowSize();
  
  // Define responsive breakpoints
  const isMobile = width <= 480;
  const isTablet = width <= 600 && width > 480;

  // Memo values defined
  const t = useMemo(() => translations[locale as keyof typeof translations] || translations.pt, [locale]);
  
  // Create responsive styles object
  const responsiveStyles = useMemo(() => {
    return {
      stepHeader: {
        padding: isMobile ? '12px 16px' : '16px 20px', 
        flexWrap: 'wrap' as 'wrap',
        gap: isMobile ? '10px' : '12px',
      },
      stepTitle: {
        fontSize: isMobile ? '1.1rem' : '1.2rem',
      },
      stepTimeLabel: {
        marginLeft: isMobile ? 0 : 'auto',
        fontSize: isMobile ? '0.8rem' : '0.9rem',
        padding: isMobile ? '4px 10px' : '6px 12px',
        marginTop: isMobile ? '8px' : 0,
        width: isMobile ? '100%' : 'auto',
        justifyContent: isMobile ? 'center' : 'flex-start',
      },
      stepContent: {
        padding: isMobile ? '16px' : '20px',
      },
      stepListItem: {
        gap: isMobile ? '8px' : '12px',
        marginBottom: isMobile ? '12px' : '16px',
      },
      stepListText: {
        fontSize: isMobile ? '0.95rem' : '1rem',
      },
      scheduleTable: {
        display: isTablet || isMobile ? 'block' as 'block' : 'table' as 'table',
        overflowX: isTablet || isMobile ? 'auto' as 'auto' : 'visible' as 'visible',
      },
      tableHeader: {
        padding: isMobile ? '12px 16px' : '16px 20px',
        fontSize: isMobile ? '0.9rem' : '0.95rem',
      },
      tableCell: {
        padding: isMobile ? '12px 16px' : '16px 20px',
        fontSize: isMobile ? '0.9rem' : '0.95rem',
      },
      timeTag: {
        padding: isMobile ? '4px 10px' : '6px 12px',
        fontSize: isMobile ? '0.8rem' : '0.9rem',
      },
      tipsGrid: {
        gridTemplateColumns: isTablet || isMobile ? 'repeat(auto-fit, minmax(220px, 1fr))' : 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: isMobile ? '16px' : '20px',
      },
      tipCard: {
        padding: isMobile ? '20px 16px' : '24px 20px',
        gap: isMobile ? '12px' : '16px',
      },
      tipIcon: {
        width: isMobile ? '50px' : '56px',
        height: isMobile ? '50px' : '56px',
        fontSize: isMobile ? '1.6rem' : '1.8rem',
      },
      tipText: {
        fontSize: isMobile ? '0.9rem' : '0.95rem',
      },
      note: {
        padding: isMobile ? '20px 16px' : '24px',
        fontSize: isMobile ? '0.95rem' : '1rem',
      },
      chantsContainer: {
        gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(auto-fit, minmax(280px, 1fr))' : 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: isMobile ? '16px' : '20px',
      },
      chantCard: {
        padding: isMobile ? '16px' : '20px',
        width: '100%', 
      },
      chantCardTitle: {
        fontSize: isMobile ? '1rem' : '1.1rem',
      },
      chantHeader: {
        gap: isMobile ? '8px' : '10px',
      },
      chantName: {
        fontSize: isMobile ? '0.9rem' : '0.95rem',
        gap: isMobile ? '8px' : '10px',
      },
      chantIcon: {
        width: isMobile ? '36px' : '40px',
        height: isMobile ? '36px' : '40px',
        fontSize: isMobile ? '1.1rem' : '1.2rem',
        marginRight: isMobile ? '10px' : '12px',
      },
      portalWindowDescription: {
        padding: isMobile ? '16px' : '20px',
        fontSize: isMobile ? '0.9rem' : '0.95rem',
      },
      decorationLine: {
        margin: isMobile ? '20px 0' : '24px 0',
      },
      audioPlayer: {
        padding: isMobile ? '12px' : '16px',
      },
      audioControls: {
        gap: isMobile ? '8px' : '10px',
      },
      playButton: {
        width: isMobile ? '36px' : '40px',
        height: isMobile ? '36px' : '40px',
        fontSize: isMobile ? '1.2rem' : '1.3rem',
      },
      audioTitle: {
        fontSize: isMobile ? '0.85rem' : '0.9rem',
      },
      audioDescription: {
        fontSize: isMobile ? '0.75rem' : '0.8rem',
      },
      progressContainer: {
        height: isMobile ? '5px' : '6px',
      },
      volumeControl: {
        fontSize: isMobile ? '0.85rem' : '0.9rem',
      },
      audioButton: {
        padding: isMobile ? '10px' : '12px',
        fontSize: isMobile ? '0.9rem' : '0.95rem',
        gap: isMobile ? '6px' : '8px',
      },
      audioButtonIcon: {
        fontSize: isMobile ? '1.1rem' : '1.2rem',
      },
      chantDescription: {
        margin: '0 0 12px 0',
        padding: '10px',
        background: 'rgba(123, 31, 162, 0.15)',
        borderRadius: '8px',
        fontSize: isMobile ? '0.85rem' : '0.9rem',
        color: colors.text.muted,
        fontStyle: 'italic',
        border: '1px solid rgba(123, 31, 162, 0.2)',
        lineHeight: 1.4,
      },
      
      // Adicionar propriedades necessárias para os componentes renderizados
      chantCardContent: {
        padding: isMobile ? '16px' : '20px',
      },
      chantDay: {
        fontSize: isMobile ? '1rem' : '1.1rem',
      },
      chantTitleArea: {
        flex: 1,
      },
      
      // Componentes de áudio melhorados
      improvedAudioPlayer: {
        padding: isMobile ? '12px 14px' : '18px',
        marginTop: '0',
        borderRadius: '12px',
        background: 'rgba(21, 0, 34, 0.8)',
        border: '1px solid rgba(123, 31, 162, 0.4)',
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
      },
      improvedPlayButton: {
        width: isMobile ? '38px' : '52px',
        height: isMobile ? '38px' : '52px',
        fontSize: isMobile ? '1.4rem' : '1.8rem',
        minWidth: isMobile ? '38px' : '52px',
        background: 'linear-gradient(135deg, #7B1FA2, #9C27B0)',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(123, 31, 162, 0.5)',
        flexShrink: 0,
        margin: '0',
        padding: '0',
      },
      improvedAudioInfo: {
        marginLeft: isMobile ? '8px' : '15px',
        display: 'flex',
        flexDirection: 'column' as 'column',
        flex: 1,
        overflow: 'hidden',
      },
      improvedAudioTitle: {
        fontSize: isMobile ? '0.85rem' : '1rem',
        fontWeight: 'bold',
        color: colors.text.light,
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap' as 'wrap',
        gap: '4px',
      },
      improvedAudioStatusBadge: {
        fontSize: '0.7rem',
        backgroundColor: 'rgba(123, 31, 162, 0.7)',
        color: 'white',
        padding: '2px 6px',
        borderRadius: '10px',
        fontWeight: 'bold',
        display: 'inline-block',
        marginLeft: isMobile ? '0' : '10px',
        marginBottom: '2px',
      },
      improvedAudioMetadata: {
        display: 'flex', 
        alignItems: 'center',
        marginTop: '4px',
        justifyContent: 'space-between',
      },
      improvedDuration: {
        fontSize: isMobile ? '0.7rem' : '0.8rem',
        color: colors.text.muted,
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        whiteSpace: 'nowrap',
      },
      improvedProgressContainer: {
        width: '100%',
        height: isMobile ? '6px' : '10px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '5px',
        marginTop: '10px',
        cursor: 'pointer',
        position: 'relative' as 'relative',
        minHeight: isMobile ? '6px' : '10px',
      },
      improvedProgressBar: {
        height: '100%',
        background: 'linear-gradient(to right, #D4AF37, #FFD700)',
        borderRadius: '5px',
        position: 'absolute' as 'absolute',
        left: 0,
        top: 0,
        transition: 'width 0.1s linear',
      },
      improvedVolumeControl: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginTop: '10px',
        width: '100%',
      },
      volumeIcon: {
        cursor: 'pointer', 
        fontSize: isMobile ? '0.9rem' : '1.1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        minWidth: '18px',
      },
    };
  }, [isMobile, isTablet, playingAudio]);

  useEffect(() => {
    setMounted(true);
    setLocale(getCurrentLocale());
    
    // Definir cookie para indicar que o usuário visitou esta página
    try {
      localStorage.setItem(RITUAL_VISITED_KEY, 'true');
    } catch (error) {
      console.error('Erro ao salvar no localStorage:', error);
    }

    // Limpar intervalos ao desmontar
    return () => {
      Object.keys(progressInterval.current).forEach(key => {
        if (progressInterval.current[key]) {
          clearInterval(progressInterval.current[key] as NodeJS.Timeout);
        }
      });
    };
  }, []);

  // Replace toggleAudio function with loadAudio
  // Handle audio playback
  const loadAudio = (audioId: string, audioUrl: string) => {
    // Se não tiver audio element, criar
    if (!audioRefs.current[audioId]) {
      const audio = new Audio(audioUrl);
      
      // Configurar eventos
      audio.addEventListener('loadedmetadata', () => {
        setDuration(prev => ({...prev, [audioId]: audio.duration}));
        setVolume(prev => ({...prev, [audioId]: 0.8}));
      });
      
      audio.addEventListener('ended', () => {
        setPlayingAudio(null);
        setProgress(prev => ({...prev, [audioId]: 0}));
        if (progressInterval.current[audioId]) {
          clearInterval(progressInterval.current[audioId] as NodeJS.Timeout);
          progressInterval.current[audioId] = null;
        }
      });
      
      audio.addEventListener('pause', () => {
        if (progressInterval.current[audioId]) {
          clearInterval(progressInterval.current[audioId] as NodeJS.Timeout);
          progressInterval.current[audioId] = null;
        }
      });
      
      audioRefs.current[audioId] = audio;
    }
  };
  
  const playAudio = (audioId: string) => {
    // Pausar áudio atual se existir
    if (playingAudio && playingAudio !== audioId && audioRefs.current[playingAudio]) {
      audioRefs.current[playingAudio]?.pause();
      if (progressInterval.current[playingAudio]) {
        clearInterval(progressInterval.current[playingAudio] as NodeJS.Timeout);
        progressInterval.current[playingAudio] = null;
      }
    }
    
    const audio = audioRefs.current[audioId];
    if (audio) {
      audio.play();
      setPlayingAudio(audioId);
      
      // Configurar intervalo para atualizar o progresso
      progressInterval.current[audioId] = setInterval(() => {
        if (audio.duration) {
          setProgress(prev => ({...prev, [audioId]: audio.currentTime / audio.duration}));
        }
      }, 100);
    }
  };
  
  const pauseAudio = (audioId: string) => {
    audioRefs.current[audioId]?.pause();
    setPlayingAudio(null);
    
    if (progressInterval.current[audioId]) {
      clearInterval(progressInterval.current[audioId] as NodeJS.Timeout);
      progressInterval.current[audioId] = null;
    }
  };
  
  const seekAudio = (audioId: string, e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRefs.current[audioId];
    if (!audio) return;
    
    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    
    audio.currentTime = percentage * audio.duration;
    setProgress(prev => ({...prev, [audioId]: percentage}));
  };
  
  const changeVolume = (audioId: string, value: number) => {
    const audio = audioRefs.current[audioId];
    if (!audio) return;
    
    audio.volume = value;
    setVolume(prev => ({...prev, [audioId]: value}));
  };

  if (!mounted) return null;

  // Renderização do componente do player de áudio
  const renderAudioPlayer = (chant: any) => {
    const audioId = chant.id;
    const progressPercent = (progress[audioId] || 0) * 100;
    const currentVolume = volume[audioId] || 1;
    const isPlaying = playingAudio === audioId;
    
    return (
      <div style={{
        ...styles.audioPlayer,
        ...responsiveStyles.audioPlayer
      }}>
        <div style={styles.audioPlayerGlow} />
        
        <div style={{
          ...styles.audioControls,
          ...responsiveStyles.audioControls
        }}>
          <motion.button 
            style={{
              ...styles.playButton,
              ...responsiveStyles.playButton
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => isPlaying ? pauseAudio(audioId) : playAudio(audioId)}
          >
            {isPlaying ? <BsPauseCircleFill /> : <BsPlayCircleFill />}
          </motion.button>
          
          <div style={{
            ...styles.audioInfo,
            overflow: 'hidden'
          }}>
            <div style={{
              ...styles.audioTitle,
              ...responsiveStyles.audioTitle,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              {t[chant.chant as keyof typeof t]}
            </div>
            <div style={{
              ...styles.audioDescription,
              ...responsiveStyles.audioDescription,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              {t[chant.days as keyof typeof t]}
            </div>
          </div>
        </div>
        
        <div 
          style={{
            ...styles.progressContainer,
            ...responsiveStyles.progressContainer
          }}
          onClick={(e) => seekAudio(audioId, e)}
        >
          <div 
            style={{
              ...styles.progressBar,
              width: `${progressPercent}%`
            }}
          />
        </div>
        
        <div style={{
          ...styles.volumeControl,
          ...responsiveStyles.volumeControl
        }}>
          <div style={{ cursor: 'pointer' }} onClick={() => changeVolume(audioId, currentVolume === 0 ? 1 : 0)}>
            {currentVolume === 0 ? <BsVolumeMuteFill /> : <BsVolumeUpFill />}
          </div>
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.05" 
            value={currentVolume}
            onChange={(e) => changeVolume(audioId, parseFloat(e.target.value))}
            style={{ 
              width: '100%',
              accentColor: '#7B1FA2'
            }}
          />
        </div>
      </div>
    );
  };

  return (
    <>
      <NavbarWithSuspense />
      
      <main style={commonStyles.container}>
        <div style={commonStyles.content}>
          {/* Título e Subtítulo com animação */}
          <motion.h1
            style={{
              ...commonStyles.title,
              fontSize: 'clamp(2.2rem, 6vw, 3.5rem)',
              position: 'relative',
              display: 'inline-block',
              textAlign: 'center',
              marginBottom: '16px',
              fontFamily: "'Playfair Display', serif",
              textShadow: '0 2px 20px rgba(212, 175, 55, 0.6)',
            }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            {t.pageTitle}
          </motion.h1>
          
          <motion.p
            style={{
              ...commonStyles.subtitle,
              fontSize: isMobile ? '1rem' : '1.1rem',
              maxWidth: '700px',
              lineHeight: '1.7',
              position: 'relative',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {t.pageSubtitle}
          </motion.p>

          {/* Decoração visual */}
          <motion.div
            style={{
              ...styles.decorationLine,
              ...responsiveStyles.decorationLine
            }}
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />

          {/* Seção Objetivo */}
          <motion.section
            style={{
              ...styles.section,
              background: 'rgba(21, 0, 34, 0.6)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(123, 31, 162, 0.3)',
              borderRadius: '16px',
              boxShadow: '0 15px 40px rgba(0, 0, 0, 0.3)',
              position: 'relative',
              overflow: 'hidden',
            }}
            {...motionVariants.fadeInUp}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {/* Glow de fundo */}
            <div style={{
              position: 'absolute',
              width: '300px',
              height: '300px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(123, 31, 162, 0.15), transparent 70%)',
              top: '-150px',
              right: '-150px',
              zIndex: 1,
              pointerEvents: 'none',
            }} />

            <SectionTitle 
              title={t.objectiveTitle}
              icon={<BsStars />}
              delay={0.5}
            />
            
            <p style={{
              fontSize: isMobile ? '1rem' : '1.05rem',
              color: colors.text.muted,
              textAlign: 'center',
              lineHeight: '1.7',
              position: 'relative',
              zIndex: 2,
              padding: '0 10px',
            }}>
              {t.objectiveDescription}
            </p>
          </motion.section>

          {/* Seção Janelas de Abertura do Portal */}
          <motion.section
            style={{
              ...styles.section,
              background: 'rgba(21, 0, 34, 0.6)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(123, 31, 162, 0.3)',
              borderRadius: '16px',
              boxShadow: '0 15px 40px rgba(0, 0, 0, 0.3)',
              position: 'relative',
              overflow: 'hidden',
            }}
            {...motionVariants.fadeInUp}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {/* Glow de fundo */}
            <div style={{
              position: 'absolute',
              width: '300px',
              height: '300px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(212, 175, 55, 0.08), transparent 70%)',
              bottom: '-150px',
              left: '-150px',
              zIndex: 1,
              pointerEvents: 'none',
            }} />

            <SectionTitle 
              title={t.portalWindowsTitle}
              icon={<BsClock />}
              delay={0.6}
            />
            
            <div style={{
              ...styles.portalWindowDescription,
              ...responsiveStyles.portalWindowDescription
            }}>
              <p style={{ margin: 0, position: 'relative', zIndex: 2 }}>
                {t.portalWindowsDescription}
              </p>
              
              {/* Decoração */}
              <div style={{
                position: 'absolute',
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(123, 31, 162, 0.1), transparent 70%)',
                top: '-100px',
                right: '-100px',
                zIndex: 1,
                pointerEvents: 'none',
              }} />
            </div>

            {/* Versão para desktop da tabela */}
            {!isMobile && (
              <table style={{
                ...styles.scheduleTable,
                ...responsiveStyles.scheduleTable
              }}>
                <thead>
                  <tr>
                    <th style={{...styles.tableHeader, ...responsiveStyles.tableHeader, width: '35%'}}>{t.windowColumn}</th>
                    <th style={{...styles.tableHeader, ...responsiveStyles.tableHeader, width: '30%'}}>{t.timeColumn}</th>
                    <th style={{...styles.tableHeader, ...responsiveStyles.tableHeader, width: '35%'}}>{t.focusColumn}</th>
                  </tr>
                </thead>
                <tbody>
                  {portalWindows.map((window, index) => {
                    const portalTheme = getPortalTheme(window.id);
                    
                    return (
                      <motion.tr 
                        key={window.id}
                        whileHover={{
                          backgroundColor: 'rgba(123, 31, 162, 0.15)',
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <td style={{...styles.tableCell, ...responsiveStyles.tableCell, ...styles.tableCellHighlight}}>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px'
                          }}>
                            <div style={{
                              width: '36px',
                              height: '36px',
                              borderRadius: '50%',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              background: `linear-gradient(135deg, ${portalTheme.primary}33, ${portalTheme.primary}66)`,
                              color: portalTheme.secondary,
                              fontSize: '1.1rem',
                              boxShadow: `0 3px 10px ${portalTheme.primary}33`,
                              border: `1px solid ${portalTheme.primary}55`,
                            }}>
                              {window.icon}
                            </div>
                            <span style={{ fontWeight: 'bold', ...gradients.goldText }}>
                              {t[window.id as keyof typeof t]}
                            </span>
                          </div>
                        </td>
                        <td style={{...styles.tableCell, ...responsiveStyles.tableCell}}>
                          <span style={{
                            ...styles.timeTag,
                            ...responsiveStyles.timeTag,
                            background: `linear-gradient(135deg, ${portalTheme.primary}33, ${portalTheme.primary}55)`,
                            border: `1px solid ${portalTheme.primary}44`,
                            color: 'white',
                          }}>
                            {window.time}
                          </span>
                        </td>
                        <td style={{
                          ...styles.tableCell,
                          ...responsiveStyles.tableCell,
                          fontStyle: 'italic',
                          color: portalTheme.secondary,
                        }}>
                          {t[window.focus as keyof typeof t]}
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            )}

            {/* Versão mobile: cards verticais em vez de tabela */}
            {isMobile && (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                marginTop: '16px',
                marginBottom: '16px',
              }}>
                {portalWindows.map((window, index) => {
                  const portalTheme = getPortalTheme(window.id);
                  
                  return (
                    <motion.div
                      key={window.id}
                      style={{
                        background: 'rgba(21, 0, 34, 0.7)',
                        borderRadius: '16px',
                        border: `1px solid ${portalTheme.primary}33`,
                        padding: '16px',
                        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
                        position: 'relative',
                        overflow: 'hidden',
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.7 + (index * 0.1) }}
                      whileHover={{
                        y: -3,
                        boxShadow: '0 12px 30px rgba(0, 0, 0, 0.3)',
                        border: `1px solid ${portalTheme.primary}55`,
                      }}
                    >
                      {/* Glow de fundo */}
                      <div style={{
                        position: 'absolute',
                        width: '200px',
                        height: '200px',
                        borderRadius: '50%',
                        background: `radial-gradient(circle, ${portalTheme.primary}22, transparent 70%)`,
                        top: '-100px',
                        right: '-100px',
                        zIndex: 1,
                        pointerEvents: 'none',
                      }} />

                      {/* Linha de título com ícone */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '16px',
                        position: 'relative',
                        zIndex: 2,
                      }}>
                        <div style={{
                          width: '46px',
                          height: '46px',
                          borderRadius: '50%',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          background: `linear-gradient(135deg, ${portalTheme.primary}44, ${portalTheme.primary}77)`,
                          color: portalTheme.secondary,
                          fontSize: '1.3rem',
                          boxShadow: `0 4px 15px ${portalTheme.primary}33`,
                          border: `1px solid ${portalTheme.primary}55`,
                          marginRight: '14px',
                        }}>
                          {window.icon}
                        </div>
                        <div style={{
                          fontSize: '1.15rem',
                          fontWeight: 'bold',
                          ...gradients.goldText,
                        }}>
                          {t[window.id as keyof typeof t]}
                        </div>
                      </div>

                      {/* Horário e Foco */}
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px',
                        position: 'relative',
                        zIndex: 2,
                      }}>
                        <div>
                          <div style={{
                            fontSize: '0.85rem',
                            color: colors.text.muted,
                            marginBottom: '4px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                          }}>
                            {t.timeColumn}:
                          </div>
                          <div style={{
                            background: `linear-gradient(135deg, ${portalTheme.primary}33, ${portalTheme.primary}55)`,
                            display: 'inline-block',
                            padding: '8px 16px',
                            borderRadius: '24px',
                            fontSize: '1.1rem',
                            fontWeight: 'bold',
                            color: 'white',
                            boxShadow: `0 4px 15px rgba(0, 0, 0, 0.15)`,
                            border: `1px solid ${portalTheme.primary}44`,
                          }}>
                            {window.time}
                          </div>
                        </div>
                        
                        <div>
                          <div style={{
                            fontSize: '0.85rem',
                            color: colors.text.muted,
                            marginBottom: '4px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                          }}>
                            {t.focusColumn}:
                          </div>
                          <div style={{
                            fontSize: '1.05rem',
                            fontStyle: 'italic',
                            color: portalTheme.secondary,
                            fontWeight: '500',
                          }}>
                            {t[window.focus as keyof typeof t]}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.section>

          {/* Seção Passo a Passo */}
          <motion.section
            style={{
              ...styles.section,
              background: 'rgba(21, 0, 34, 0.6)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(123, 31, 162, 0.3)',
              borderRadius: '16px',
              boxShadow: '0 15px 40px rgba(0, 0, 0, 0.3)',
              position: 'relative',
              overflow: 'hidden',
            }}
            {...motionVariants.fadeInUp}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            {/* Glow de fundo */}
            <div style={{
              position: 'absolute',
              width: '400px',
              height: '400px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(123, 31, 162, 0.1), transparent 70%)',
              top: '-150px',
              left: '-150px',
              zIndex: 1,
              pointerEvents: 'none',
            }} />

            <SectionTitle 
              title={t.stepByStepTitle}
              icon={<BsLightningFill />}
              delay={0.7}
            />
            
            <p style={{
              fontSize: '1rem',
              color: colors.text.muted,
              textAlign: 'center',
              lineHeight: '1.6',
              position: 'relative',
              zIndex: 2,
              marginBottom: '30px',
            }}>
              {t.stepByStepDescription}
            </p>

            {ritualSteps.map((step, index) => (
              <motion.div 
                key={step.id} 
                style={styles.ritualCard}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + (index * 0.1) }}
                whileHover={{
                  y: -5,
                  boxShadow: '0 15px 40px rgba(0, 0, 0, 0.4)',
                  border: '1px solid rgba(212, 175, 55, 0.3)'
                }}
              >
                <div style={styles.cardGlow} />
                
                <div style={{
                  ...styles.stepHeader,
                  ...responsiveStyles.stepHeader
                }}>
                  <div style={styles.stepNumber}>{index + 1}</div>
                  <h3 style={{
                    ...styles.stepTitle,
                    ...responsiveStyles.stepTitle
                  }}>{t[step.id as keyof typeof t]}</h3>
                  <div style={{
                    ...styles.stepTimeLabel,
                    ...responsiveStyles.stepTimeLabel
                  }}>
                    <BsClock style={{ color: colors.gold.main }} />
                    {step.time}
                  </div>
                </div>
                
                <div style={{
                  ...styles.stepContent,
                  ...responsiveStyles.stepContent
                }}>
                  {step.steps.map((text, i) => (
                    <div key={i} style={{
                      ...styles.stepListItem,
                      ...responsiveStyles.stepListItem
                    }}>
                      <div style={styles.stepListIcon}>{step.icon}</div>
                      <div style={{
                        ...styles.stepListText,
                        ...responsiveStyles.stepListText
                      }}>{text}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.section>

          {/* Seção Cânticos */}
          <motion.section
            style={{
              ...styles.section,
              background: 'rgba(21, 0, 34, 0.6)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(123, 31, 162, 0.3)',
              borderRadius: '16px',
              boxShadow: '0 15px 40px rgba(0, 0, 0, 0.3)',
              position: 'relative',
              overflow: 'hidden',
            }}
            {...motionVariants.fadeInUp}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {/* Glow de fundo */}
            <div style={{
              position: 'absolute',
              width: '300px',
              height: '300px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(212, 175, 55, 0.1), transparent 70%)',
              bottom: '-150px',
              right: '-150px',
              zIndex: 1,
              pointerEvents: 'none',
            }} />

            <SectionTitle 
              title={t.chantsTitle}
              icon={<BsMusicNoteBeamed />}
              delay={0.8}
            />
            
            <p style={{
              fontSize: '1rem',
              color: colors.text.muted,
              textAlign: 'center',
              lineHeight: '1.6',
              position: 'relative',
              zIndex: 2,
              marginBottom: '30px',
            }}>
              {t.chantsDescription}
            </p>

            <div style={{
              ...styles.chantsContainer,
              ...responsiveStyles.chantsContainer
            }}>
              {chants.map((chant, index) => (
                <motion.div
                  key={chant.id}
                  style={{
                    ...styles.chantCard,
                    ...responsiveStyles.chantCard
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 + (index * 0.1) }}
                  whileHover={{
                    y: -5,
                    boxShadow: '0 15px 40px rgba(0, 0, 0, 0.4)',
                    border: '1px solid rgba(212, 175, 55, 0.3)'
                  }}
                >
                  <div style={styles.chantCardGlow} />
                  
                  <div style={{
                    ...styles.chantCardContent,
                    ...responsiveStyles.chantCardContent
                  }}>
                    <div style={responsiveStyles.chantHeader}>
                      <div style={{
                        ...styles.chantIcon,
                        ...responsiveStyles.chantIcon
                      }}>
                        {chant.icon}
                      </div>
                      <div style={responsiveStyles.chantTitleArea}>
                        <div style={{
                          ...styles.chantDay,
                          ...responsiveStyles.chantDay
                        }}>
                          {t[chant.days as keyof typeof t]}
                        </div>
                        <div style={{
                          ...responsiveStyles.chantName
                        }}>
                          {t[chant.chant as keyof typeof t]}
                        </div>
                      </div>
                    </div>
                    
                    <p style={responsiveStyles.chantDescription}>
                      {chant.description}
                    </p>
                    
                    {/* Improved Audio Player - Always visible */}
                    <div style={{
                      ...responsiveStyles.improvedAudioPlayer
                    }}>
                      <div style={styles.audioPlayerGlow} />
                      
                      {/* Top section with play button and track info */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        position: 'relative',
                        zIndex: 2,
                      }}>
                        <motion.button 
                          style={responsiveStyles.improvedPlayButton}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            loadAudio(chant.id, chant.audioUrl);
                            playingAudio === chant.id ? pauseAudio(chant.id) : playAudio(chant.id);
                          }}
                        >
                          {playingAudio === chant.id ? <BsPauseCircleFill /> : <BsPlayCircleFill />}
                        </motion.button>
                        
                        <div style={responsiveStyles.improvedAudioInfo}>
                          <div style={responsiveStyles.improvedAudioTitle}>
                            <span style={{ 
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              maxWidth: isMobile ? '100px' : '150px'
                            }}>
                              {t[chant.chant as keyof typeof t]}
                            </span>
                            <span style={responsiveStyles.improvedAudioStatusBadge}>
                              {playingAudio === chant.id ? 'Tocando' : 'Pronto'}
                            </span>
                          </div>
                          
                          <div style={responsiveStyles.improvedAudioMetadata}>
                            <div style={responsiveStyles.improvedDuration}>
                              <BsMusicNoteBeamed style={{ fontSize: isMobile ? '0.7rem' : '0.8rem' }} /> {chant.duration}
                            </div>
                            
                            <div style={{
                              fontSize: isMobile ? '0.7rem' : '0.8rem',
                              color: colors.text.muted,
                              textAlign: 'right',
                              whiteSpace: 'nowrap',
                            }}>
                              {formatTime(progress[chant.id] ? progress[chant.id] * (duration[chant.id] || 0) : 0)} / {formatTime(duration[chant.id] || 0)}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Progress bar */}
                      <div 
                        style={responsiveStyles.improvedProgressContainer}
                        onClick={(e) => seekAudio(chant.id, e)}
                      >
                        <div 
                          style={{
                            ...responsiveStyles.improvedProgressBar,
                            width: `${(progress[chant.id] || 0) * 100}%`
                          }}
                        />
                      </div>
                      
                      {/* Volume control - esconder em mobile */}
                      {!isMobile && (
                        <div style={responsiveStyles.improvedVolumeControl}>
                          <div style={responsiveStyles.volumeIcon} 
                            onClick={() => changeVolume(chant.id, (volume[chant.id] || 0.8) === 0 ? 0.8 : 0)}
                          >
                            {(volume[chant.id] || 0.8) === 0 ? <BsVolumeMuteFill /> : <BsVolumeUpFill />}
                          </div>
                          <input 
                            type="range" 
                            min="0" 
                            max="1" 
                            step="0.05" 
                            value={volume[chant.id] || 0.8}
                            onChange={(e) => changeVolume(chant.id, parseFloat(e.target.value))}
                            style={{ 
                              width: '100%',
                              accentColor: '#7B1FA2'
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <p style={{
              fontSize: '0.85rem',
              fontStyle: 'italic',
              color: colors.text.dimmed,
              textAlign: 'center',
              marginTop: '20px',
              position: 'relative',
              zIndex: 2,
              lineHeight: 1.4,
              padding: '0 10px',
            }}>
              (Se preferir, use o mesmo cântico todos os dias; o essencial é a intenção coerente.)
            </p>
          </motion.section>

          {/* Seção Dicas Avançadas */}
          <motion.section
            style={{
              ...styles.section,
              background: 'rgba(21, 0, 34, 0.6)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(123, 31, 162, 0.3)',
              borderRadius: '16px',
              boxShadow: '0 15px 40px rgba(0, 0, 0, 0.3)',
              position: 'relative',
              overflow: 'hidden',
            }}
            {...motionVariants.fadeInUp}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            {/* Glow de fundo */}
            <div style={{
              position: 'absolute',
              width: '300px',
              height: '300px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(123, 31, 162, 0.1), transparent 70%)',
              top: '-150px',
              right: '-150px',
              zIndex: 1,
              pointerEvents: 'none',
            }} />

            <SectionTitle 
              title={t.advancedTipsTitle}
              icon={<BsBookFill />}
              delay={0.9}
            />
            
            <p style={{
              fontSize: '1rem',
              color: colors.text.muted,
              textAlign: 'center',
              lineHeight: '1.6',
              position: 'relative',
              zIndex: 2,
              marginBottom: '20px',
            }}>
              {t.advancedTipsDescription}
            </p>

            <div style={{
              ...styles.tipsGrid,
              ...responsiveStyles.tipsGrid
            }}>
              {advancedTips.map((tip, index) => (
                <motion.div
                  key={tip.id}
                  style={{
                    ...styles.tipCard,
                    ...responsiveStyles.tipCard
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.0 + (index * 0.1) }}
                  whileHover={{
                    y: -5,
                    boxShadow: '0 15px 40px rgba(0, 0, 0, 0.4)',
                    border: '1px solid rgba(212, 175, 55, 0.3)'
                  }}
                >
                  <div style={styles.tipGlow} />
                  
                  <div style={{
                    ...styles.tipIcon,
                    ...responsiveStyles.tipIcon
                  }}>
                    {tip.icon}
                  </div>
                  
                  <h3 style={{
                    fontSize: isMobile ? '1rem' : '1.1rem',
                    fontWeight: 'bold',
                    margin: '0 0 10px 0',
                    position: 'relative',
                    zIndex: 2,
                    ...gradients.goldText,
                  }}>
                    {t[tip.title as keyof typeof t]}
                  </h3>
                  
                  <p style={{
                    ...styles.tipText,
                    ...responsiveStyles.tipText
                  }}>
                    {t[tip.description as keyof typeof t]}
                  </p>
                </motion.div>
              ))}
            </div>

            <div style={{
              ...styles.note,
              ...responsiveStyles.note
            }}>
              <div style={styles.noteGlow} />
              
              <p style={{
                margin: 0,
                position: 'relative',
                zIndex: 2,
                fontSize: isMobile ? '0.95rem' : '1rem',
                lineHeight: '1.7',
                fontStyle: 'italic',
                textAlign: 'center',
                color: '#FFD700',
                fontWeight: 'bold',
              }}>
                {t.finalNote}
              </p>
            </div>
          </motion.section>
        </div>
      </main>
      
      <FooterWithSuspense />
    </>
  );
} 