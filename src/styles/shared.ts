import { CSSProperties } from 'react';

// Color palette
export const colors = {
  // Primary colors
  purple: {
    dark: '#150022',
    medium: '#4A0072',
    light: '#7B1FA2',
    lighter: '#9C27B0',
  },
  gold: {
    main: '#D4AF37',
    light: '#FFD700',
  },
  
  // Text colors
  text: {
    light: 'rgba(255, 255, 255, 0.9)',
    muted: 'rgba(255, 255, 255, 0.8)',
    dimmed: 'rgba(255, 255, 255, 0.6)',
    footer: 'rgba(255, 255, 255, 0.4)',
  },
  
  // Backgrounds
  backgrounds: {
    card: 'rgba(255, 255, 255, 0.06)',
    section: 'rgba(0, 0, 0, 0.25)',
    glassLight: 'rgba(255, 255, 255, 0.1)',
    glassDark: 'rgba(21, 0, 34, 0.7)',
    highlight: 'rgba(123, 31, 162, 0.2)',
  },
  
  // Borders
  borders: {
    light: 'rgba(123, 31, 162, 0.2)',
    medium: 'rgba(123, 31, 162, 0.3)',
    dark: 'rgba(123, 31, 162, 0.5)',
    gold: 'rgba(212, 175, 55, 0.4)',
  },
};

// Gradients
export const gradients = {
  // Background gradients
  backgroundPrimary: 'linear-gradient(to bottom, #150022, #4A0072, #150022)',
  
  // Text gradients
  goldText: {
    background: 'linear-gradient(to right, #D4AF37, #FFD700, #D4AF37)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  } as CSSProperties,
  
  // Button gradients
  purpleButton: 'linear-gradient(135deg, #7B1FA2, #9C27B0)',
  goldButton: 'linear-gradient(135deg, #D4AF37, #FFD700)',
  
  // Divider gradients
  divider: 'linear-gradient(to right, transparent, #D4AF37, transparent)',
};

// Common styles
export const commonStyles: Record<string, CSSProperties> = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    background: gradients.backgroundPrimary,
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
    ...gradients.goldText,
  },
  subtitle: {
    fontSize: '1.1rem',
    textAlign: 'center',
    marginBottom: '48px',
    color: colors.text.muted,
  },
  divider: {
    width: '100%',
    maxWidth: '600px',
    height: '1px',
    margin: '3rem auto',
    background: gradients.divider,
  },
  section: {
    width: '100%',
    marginBottom: '48px',
    padding: '32px 24px',
    background: colors.backgrounds.section,
    backdropFilter: 'blur(10px)',
    borderRadius: '12px',
    border: `1px solid ${colors.borders.medium}`,
  },
  sectionTitle: {
    fontSize: '1.75rem',
    fontWeight: 600,
    marginBottom: '24px',
    textAlign: 'center',
    ...gradients.goldText,
  },
  card: {
    width: '100%',
    marginBottom: '20px',
    padding: '20px',
    background: colors.backgrounds.card,
    borderRadius: '12px',
    border: `1px solid ${colors.borders.light}`,
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  },
  cardTitle: {
    fontSize: '1.2rem',
    fontWeight: 600,
    marginBottom: '12px',
    ...gradients.goldText,
  },
  cardDescription: {
    fontSize: '0.9rem',
    color: colors.text.muted,
  },
};

// Motion variants
export const motionVariants = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
  },
  buttonHover: {
    scale: 1.05,
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.4)',
  },
  buttonTap: {
    scale: 0.95,
  },
}; 