'use client';

import { useState, useEffect, useRef, CSSProperties } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Navbar from '../../components/Navbar';
import { getCurrentLocale, Locale } from '../../lib/locale';
import Image from 'next/image';

type ChapterData = {
  title: string;
  sections: {
    title: string;
    content: string;
  }[];
};

type Translations = {
  [key in Locale]: {
    title: string;
    subtitle: string;
    tocTitle: string;
    backToTop: string;
    practiceTitle: string;
    practiceButton: string;
    closeButton: string;
    mantras: string[];
    contents: ChapterData[];
    nextChapter: string;
    backToToc: string;
  };
};

const styles: Record<string, CSSProperties> = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    background: 'linear-gradient(135deg, #150022, #4A0072, #150022)',
    color: 'white',
    backgroundSize: '400% 400%',
    animation: 'gradientAnimation 15s ease infinite',
    position: 'relative',
    overflow: 'hidden',
  },
  backgroundDecoration: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    zIndex: 0,
    opacity: 0.1,
    backgroundImage: `radial-gradient(circle at 10px 10px, rgba(212, 175, 55, 0.1) 0%, transparent 20%), 
                     radial-gradient(circle at 15px 15px, rgba(212, 175, 55, 0.1) 0%, transparent 20%)`,
    backgroundSize: '50px 50px',
    backgroundPosition: '0 0, 25px 25px',
    pointerEvents: 'none',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '120px 24px 60px',
    width: '100%',
    maxWidth: '900px',
    margin: '0 auto',
    position: 'relative',
    zIndex: 1,
  },
  title: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
    fontWeight: 700,
    textAlign: 'center',
    marginBottom: '16px',
    background: 'linear-gradient(to right, #D4AF37, white, #D4AF37)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    textShadow: '0 2px 30px rgba(212, 175, 55, 0.3)',
    position: 'relative',
  },
  titleDecoration: {
    width: '80px',
    height: '3px',
    background: 'linear-gradient(to right, transparent, #D4AF37, transparent)',
    margin: '0 auto 24px',
  },
  subtitle: {
    fontSize: '1.2rem',
    textAlign: 'center',
    marginBottom: '48px',
    color: 'rgba(255, 255, 255, 0.8)',
    fontStyle: 'italic',
    maxWidth: '600px',
    margin: '0 auto 48px',
  },
  bookContainer: {
    width: '100%',
    background: 'rgba(10, 2, 18, 0.85)',
    backdropFilter: 'blur(10px)',
    borderRadius: '20px',
    border: '1px solid rgba(212, 175, 55, 0.3)',
    padding: '40px',
    boxShadow: '0 15px 50px rgba(0, 0, 0, 0.4), 0 0 20px rgba(212, 175, 55, 0.2)',
    marginBottom: '60px',
    position: 'relative',
    overflow: 'hidden',
  },
  bookDecoration: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    borderRadius: '20px',
    backgroundImage: 'linear-gradient(120deg, rgba(255,255,255,0.05) 0%, transparent 30%)',
    pointerEvents: 'none',
  },
  bookShadow: {
    position: 'absolute',
    bottom: -10,
    left: '5%',
    width: '90%',
    height: '20px',
    borderRadius: '50%',
    boxShadow: '0 15px 15px rgba(0, 0, 0, 0.4)',
    zIndex: -1,
  },
  tocTitle: {
    fontSize: '1.8rem',
    marginBottom: '32px',
    color: '#D4AF37',
    textAlign: 'center',
    fontFamily: "'Playfair Display', serif",
    position: 'relative',
    display: 'inline-block',
  },
  tocContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    padding: '10px',
    maxWidth: '700px',
    margin: '0 auto',
  },
  chapterTitle: {
    fontSize: '2rem',
    marginTop: '40px',
    marginBottom: '30px',
    color: '#D4AF37',
    borderBottom: '1px solid rgba(212, 175, 55, 0.5)',
    paddingBottom: '12px',
    fontFamily: "'Playfair Display', serif",
    position: 'relative',
  },
  chapterIcon: {
    position: 'absolute',
    left: '-30px',
    top: '5px',
    fontSize: '1.5rem',
    opacity: 0.8,
  },
  sectionTitle: {
    fontSize: '1.5rem',
    marginTop: '40px',
    marginBottom: '20px',
    color: 'rgba(255, 255, 255, 0.95)',
    borderLeft: '3px solid rgba(212, 175, 55, 0.6)',
    paddingLeft: '15px',
    fontWeight: 600,
  },
  paragraph: {
    marginBottom: '18px',
    lineHeight: 1.7,
    fontSize: '1.1rem',
    color: 'rgba(255, 255, 255, 0.85)',
    textAlign: 'justify',
  },
  highlight: {
    padding: '20px 30px',
    borderRadius: '12px',
    background: 'rgba(123, 31, 162, 0.2)',
    border: '1px solid rgba(123, 31, 162, 0.4)',
    margin: '30px 0',
    position: 'relative',
    fontSize: '1.1rem',
    fontStyle: 'italic',
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  highlightQuote: {
    position: 'absolute',
    fontSize: '3rem',
    opacity: 0.4,
    color: '#D4AF37',
  },
  highlightQuoteLeft: {
    top: '-20px',
    left: '10px',
  },
  highlightQuoteRight: {
    bottom: '-35px',
    right: '10px',
  },
  chapterLink: {
    cursor: 'pointer',
    color: 'rgba(255, 255, 255, 0.9)',
    padding: '15px 20px',
    borderRadius: '12px',
    background: 'rgba(123, 31, 162, 0.25)',
    border: '1px solid rgba(123, 31, 162, 0.4)',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  chapterLinkIcon: {
    fontSize: '1.5rem',
    color: '#D4AF37',
    opacity: 0.8,
  },
  chapterLinkText: {
    fontWeight: 500,
    fontSize: '1.1rem',
  },
  chapterLinkGlow: {
    position: 'absolute',
    top: '-50%',
    left: '-50%',
    width: '200%',
    height: '200%',
    background: 'radial-gradient(circle, rgba(123, 31, 162, 0.3) 0%, transparent 60%)',
    opacity: 0,
    transition: 'opacity 0.5s ease',
    pointerEvents: 'none',
  },
  backToTop: {
    position: 'fixed',
    bottom: '30px',
    right: '30px',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    backgroundColor: 'rgba(123, 31, 162, 0.7)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    boxShadow: '0 4px 20px rgba(0,0,0,0.4), 0 0 10px rgba(212, 175, 55, 0.2)',
    border: '1px solid rgba(212, 175, 55, 0.4)',
    zIndex: 10,
    transition: 'all 0.3s ease',
    fontSize: '1.3rem',
  },
  backLink: {
    cursor: 'pointer',
    color: '#D4AF37',
    marginBottom: '24px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '1.1rem',
    padding: '10px 20px',
    borderRadius: '30px',
    background: 'rgba(123, 31, 162, 0.2)',
    border: '1px solid rgba(123, 31, 162, 0.3)',
    width: 'fit-content',
    transition: 'all 0.3s ease',
  },
  divider: {
    width: '100%',
    height: '1px',
    margin: '30px 0',
    background: 'linear-gradient(to right, transparent, rgba(212, 175, 55, 0.5), transparent)',
  },
  navigationButtons: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '40px 0 20px',
    width: '100%',
  },
  nextChapterButton: {
    padding: '12px 25px',
    background: 'linear-gradient(135deg, #7B1FA2, #9C27B0)',
    color: 'white',
    border: 'none',
    borderRadius: '30px',
    cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginLeft: 'auto',
    fontSize: '1rem',
    fontWeight: 500,
  },
  buttonIcon: {
    fontSize: '1.2rem',
  },
  practiceButton: {
    padding: '15px 30px',
    margin: '40px auto 10px',
    display: 'block',
    fontSize: '1.1rem',
    fontWeight: 600,
    background: 'linear-gradient(135deg, #D4AF37, #B8860B)',
    color: 'white',
    border: 'none',
    borderRadius: '30px',
    cursor: 'pointer',
    boxShadow: '0 4px 20px rgba(0,0,0,0.3), 0 0 10px rgba(212, 175, 55, 0.3)',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden',
    textAlign: 'center',
    width: 'fit-content',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  practiceButtonGlow: {
    position: 'absolute',
    top: '-50%',
    left: '-50%',
    width: '200%',
    height: '200%',
    background: 'radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%)',
    opacity: 0,
    transition: 'opacity 0.5s ease',
    pointerEvents: 'none',
  },
  practiceModal: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.8)',
    backdropFilter: 'blur(10px)',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    width: '90%',
    maxWidth: '600px',
    maxHeight: '90vh',
    overflowY: 'auto',
    background: 'linear-gradient(135deg, #240041, #4A0072)',
    borderRadius: '20px',
    border: '1px solid rgba(212, 175, 55, 0.4)',
    padding: '40px',
    position: 'relative',
    boxShadow: '0 15px 50px rgba(0, 0, 0, 0.5), 0 0 20px rgba(212, 175, 55, 0.3)',
  },
  closeButton: {
    position: 'absolute',
    top: '15px',
    right: '15px',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: 'rgba(123, 31, 162, 0.7)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    border: 'none',
    fontSize: '1.2rem',
    transition: 'all 0.3s ease',
  },
  mantraContainer: {
    marginTop: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  mantra: {
    padding: '20px',
    borderRadius: '12px',
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    color: 'white',
    textAlign: 'center',
    fontSize: '1.3rem',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  activeMantra: {
    background: 'rgba(212, 175, 55, 0.3)',
    border: '1px solid rgba(212, 175, 55, 0.6)',
    transform: 'scale(1.05)',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
  },
  modalTitle: {
    color: '#D4AF37',
    fontSize: '1.8rem',
    textAlign: 'center',
    marginBottom: '30px',
    fontFamily: "'Playfair Display', serif",
  }
};

// Framer Motion variants
const chapterLinkVariants: Variants = {
  initial: { 
    scale: 1,
    backgroundColor: 'rgba(123, 31, 162, 0.25)' 
  },
  hover: { 
    scale: 1.03,
    backgroundColor: 'rgba(123, 31, 162, 0.4)'
  },
  tap: {
    scale: 0.98
  }
};

const glowVariants: Variants = {
  initial: { opacity: 0 },
  hover: { opacity: 1 }
};

const backLinkVariants: Variants = {
  initial: { 
    x: 0,
    backgroundColor: 'rgba(123, 31, 162, 0.2)'
  },
  hover: { 
    x: -5,
    backgroundColor: 'rgba(123, 31, 162, 0.4)'
  }
};

const backToTopVariants: Variants = {
  initial: { 
    scale: 1, 
    backgroundColor: 'rgba(123, 31, 162, 0.7)' 
  },
  hover: { 
    scale: 1.1, 
    backgroundColor: 'rgba(123, 31, 162, 0.9)',
    boxShadow: '0 4px 25px rgba(0,0,0,0.5), 0 0 15px rgba(212, 175, 55, 0.3)'
  }
};

const practiceButtonVariants: Variants = {
  initial: { 
    scale: 1,
    boxShadow: '0 4px 20px rgba(0,0,0,0.3), 0 0 10px rgba(212, 175, 55, 0.3)'
  },
  hover: { 
    scale: 1.05,
    boxShadow: '0 8px 30px rgba(0,0,0,0.4), 0 0 20px rgba(212, 175, 55, 0.5)'
  },
  tap: {
    scale: 0.98
  }
};

const modalVariants: Variants = {
  hidden: { 
    opacity: 0,
    scale: 0.9
  },
  visible: { 
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  },
  exit: { 
    opacity: 0,
    scale: 0.9,
    transition: {
      duration: 0.2,
      ease: "easeIn"
    }
  }
};

const mantraVariants: Variants = {
  initial: { 
    scale: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)'
  },
  hover: { 
    scale: 1.03,
    backgroundColor: 'rgba(255, 255, 255, 0.15)'
  },
  tap: {
    scale: 0.98
  },
  active: {
    scale: 1.05,
    backgroundColor: 'rgba(212, 175, 55, 0.3)',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
    borderColor: 'rgba(212, 175, 55, 0.6)'
  }
};

const nextChapterButtonVariants: Variants = {
  initial: { 
    scale: 1,
    boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
  },
  hover: { 
    scale: 1.05,
    boxShadow: '0 6px 20px rgba(0,0,0,0.4), 0 0 15px rgba(212, 175, 55, 0.2)'
  },
  tap: {
    scale: 0.98
  }
};

// Ícones para capítulos - estilo emoji para simplificar
const chapterIcons = ["🌺", "🧠", "🔄", "👤", "🙏", "🌎"];

export default function PresenteSurpresaPage() {
  const [locale, setLocale] = useState<Locale>('pt');
  const [mounted, setMounted] = useState(false);
  const [activeChapter, setActiveChapter] = useState<number | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showPracticeModal, setShowPracticeModal] = useState(false);
  const [activeMantra, setActiveMantra] = useState<number | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    setLocale(getCurrentLocale());

    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Efeito para TTS (Text-to-Speech) para os mantras
  useEffect(() => {
    if (activeMantra !== null && mounted && typeof window !== 'undefined') {
      const t = translations[locale];
      const mantra = t.mantras[activeMantra];
      
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(mantra);
        utterance.lang = locale === 'pt' ? 'pt-BR' : 'es-ES';
        utterance.rate = 0.9;
        
        window.speechSynthesis.cancel(); // Cancela qualquer fala anterior
        window.speechSynthesis.speak(utterance);
      }
    }
    
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [activeMantra, locale, mounted]);

  if (!mounted) return null;

  const translations: Translations = {
    pt: {
      title: "HOʻOPONOPONO — O PODER DO HOʻOPONOPONO",
      subtitle: "A Arte de Curar e Transformar • Celestino – A Voz da Verdade",
      tocTitle: "SUMÁRIO",
      backToTop: "↑",
      practiceTitle: "PRATIQUE OS MANTRAS",
      practiceButton: "Praticar Ho'oponopono agora",
      closeButton: "Fechar",
      nextChapter: "Próximo: ",
      backToToc: "Voltar ao Sumário",
      mantras: [
        "Sinto muito",
        "Me perdoe",
        "Eu te amo",
        "Sou grato"
      ],
      contents: [
        {
          title: "Capítulo 1 – Introdução ao Ho'oponopono",
          sections: [
            {
              title: "1.1 Origem e história do Ho'oponopono",
              content: "O Ho'oponopono é uma técnica de cura e resolução de problemas originária do Havaí. Os antigos kahunas ensinavam que doenças e dificuldades nascem de memórias negativas guardadas no subconsciente. O termo significa literalmente \"corrigir um erro\" ou \"tornar certo\". O método ganhou projeção mundial com o psicólogo havaiano Dr. Ihaleakala Hew Len, que o praticou — com resultados notáveis — em um hospital psiquiátrico de segurança máxima."
            },
            {
              title: "1.2 Princípios básicos do Ho'oponopono",
              content: "Não é preciso analisar o problema; basta assumir 100% de responsabilidade e limpar as memórias ligadas a ele.\n\nO que cada um cura em si impacta o coletivo, porque todos somos um."
            },
            {
              title: "1.3 A importância da responsabilidade pessoal",
              content: "Assumir que \"eu criei isto\" liberta‐nos da posição de vítima, abre caminho ao perdão e permite acessar o Divino para limpar e transmutar memórias."
            }
          ]
        },
        {
          title: "Capítulo 2 – O poder das memórias negativas",
          sections: [
            {
              title: "2.1 Como as memórias negativas afetam nossa vida",
              content: "Memórias dolorosas condicionam emoções, comportamentos e percepções; sustentam ansiedade, depressão, baixa autoestima e podem até refletir‐se em sintomas físicos."
            },
            {
              title: "2.2 Identificando e reconhecendo as memórias negativas",
              content: "Observe padrões recorrentes e reações emocionais intensas. Situações que disparam medo, raiva ou tristeza desproporcionais costumam apontar para memórias subjacentes a serem limpas."
            },
            {
              title: "2.3 Os efeitos das memórias negativas na saúde física e emocional",
              content: "Estresse crônico ligado a memórias negativas aumenta inflamação, compromete o sono e a imunidade, favorecendo doenças cardíacas, distúrbios digestivos e transtornos mentais."
            }
          ]
        },
        {
          title: "Capítulo 3 – A técnica do Ho'oponopono",
          sections: [
            {
              title: "3.1 As quatro frases: \"Sinto muito\", \"Me perdoe\", \"Eu te amo\", \"Sou grato\"",
              content: "Sinto muito – reconheço e assumo a responsabilidade.\n\nMe perdoe – peço perdão a mim, aos outros e ao Divino.\n\nEu te amo – ofereço amor incondicional a tudo e todos.\n\nSou grato – celebro a oportunidade de purificação e cura.\n\nDitas em qualquer ordem, elas servem de \"chave de limpeza\" para dissolver programas subconscientes."
            },
            {
              title: "3.2 Como praticar o Ho'oponopono no dia a dia",
              content: "Repita mentalmente ou em voz alta sempre que surgir um desconforto; escreva as frases em um caderno; fixe lembretes visuais no ambiente. A constância aprofunda a limpeza."
            },
            {
              title: "3.3 Meditação e escrita como ferramentas de Ho'oponopono",
              content: "Medite focando nas quatro frases, permitindo que emoções venham e se desprendam. A escrita repetitiva ou o diário de insights tornam tangível o processo de liberação."
            }
          ]
        },
        {
          title: "Capítulo 4 – Aplicando o Ho'oponopono em situações pessoais",
          sections: [
            {
              title: "4.1 Resolvendo conflitos internos",
              content: "Use as frases para liberar padrões autodestrutivos, críticas internas e culpas antigas — encontrando paz e clareza mental."
            },
            {
              title: "4.2 Melhorando relacionamentos",
              content: "Limpe ressentimentos e expectativas; perdoe e envie amor ao outro. Casais podem praticar juntos para restaurar a comunicação."
            },
            {
              title: "4.3 Curando doenças físicas e emocionais",
              content: "Como prática complementar, Ho'oponopono ajuda a quebrar a raiz energética de doenças crônicas e transtornos como ansiedade e depressão."
            }
          ]
        },
        {
          title: "Capítulo 5 – O poder transformador do perdão",
          sections: [
            {
              title: "5.1 A importância do perdão em nossa jornada de cura",
              content: "O perdão liberta do peso das memórias dolorosas, interrompendo ciclos de sofrimento."
            },
            {
              title: "5.2 Perdoando a si mesmo",
              content: "Repita as quatro frases para acolher falhas pessoais com compaixão, aprendendo com elas sem carregar culpa."
            },
            {
              title: "5.3 Perdoando os outros para alcançar a paz interior",
              content: "Ao perdoar genuinamente, soltamos a energia que nos mantém vinculados ao passado e abrimos espaço para relacionamentos autênticos."
            }
          ]
        },
        {
          title: "Capítulo 6 – Expandindo o Ho'oponopono para o mundo",
          sections: [
            {
              title: "6.1 O papel do Ho'oponopono na transformação global",
              content: "Curando em nós, colaboramos para curar o todo — pois a realidade coletiva reflete o estado interior de cada indivíduo."
            },
            {
              title: "6.2 Práticas para trazer paz ao mundo",
              content: "Repetir as quatro frases direcionadas à humanidade.\n\nEscrever ou meditar em grupo.\n\nVisualizar o planeta inundado de amor e gratidão."
            },
            {
              title: "6.3 Criando uma vida de amor, gratidão e harmonia",
              content: "O compromisso diário com responsabilidade pessoal, perdão e gratidão cria um ciclo virtuoso de bem-estar interno que se espelha em todas as áreas da vida."
            }
          ]
        }
      ]
    },
    es: {
      title: "HOʻOPONOPONO — EL PODER DEL HOʻOPONOPONO",
      subtitle: "El Arte de Sanar y Transformar • Celestino – La Voz de la Verdad",
      tocTitle: "ÍNDICE",
      backToTop: "↑",
      practiceTitle: "PRACTICA LOS MANTRAS",
      practiceButton: "Practicar Ho'oponopono ahora",
      closeButton: "Cerrar",
      nextChapter: "Siguiente: ",
      backToToc: "Volver al Índice",
      mantras: [
        "Lo siento",
        "Perdóname",
        "Te amo",
        "Gracias"
      ],
      contents: [
        {
          title: "Capítulo 1 – Introducción al Ho'oponopono",
          sections: [
            {
              title: "1.1 Origen e historia del Ho'oponopono",
              content: "El Ho'oponopono es una técnica de sanación y resolución de problemas originaria de Hawái. Los antiguos kahunas enseñaban que las enfermedades y dificultades nacen de memorias negativas guardadas en el subconsciente. El término significa literalmente \"corregir un error\" o \"hacer lo correcto\". El método ganó proyección mundial con el psicólogo hawaiano Dr. Ihaleakala Hew Len, quien lo practicó —con resultados notables— en un hospital psiquiátrico de máxima seguridad."
            },
            {
              title: "1.2 Principios básicos del Ho'oponopono",
              content: "No es necesario analizar el problema; basta con asumir el 100% de responsabilidad y limpiar las memorias vinculadas a él.\n\nLo que cada uno sana en sí mismo impacta lo colectivo, porque todos somos uno."
            },
            {
              title: "1.3 La importancia de la responsabilidad personal",
              content: "Asumir que \"yo creé esto\" nos libera de la posición de víctima, abre el camino al perdón y permite acceder a lo Divino para limpiar y transmutar memorias."
            }
          ]
        },
        {
          title: "Capítulo 2 – El poder de las memorias negativas",
          sections: [
            {
              title: "2.1 Cómo las memorias negativas afectan nuestra vida",
              content: "Las memorias dolorosas condicionan emociones, comportamientos y percepciones; sustentan ansiedad, depresión, baja autoestima y pueden incluso reflejarse en síntomas físicos."
            },
            {
              title: "2.2 Identificando y reconociendo las memorias negativas",
              content: "Observe patrones recurrentes y reacciones emocionales intensas. Situaciones que desencadenan miedo, ira o tristeza desproporcionados suelen apuntar a memorias subyacentes que deben ser limpiadas."
            },
            {
              title: "2.3 Los efectos de las memorias negativas en la salud física y emocional",
              content: "El estrés crónico vinculado a memorias negativas aumenta la inflamación, compromete el sueño y la inmunidad, favoreciendo enfermedades cardíacas, trastornos digestivos y problemas mentales."
            }
          ]
        },
        {
          title: "Capítulo 3 – La técnica del Ho'oponopono",
          sections: [
            {
              title: "3.1 Las cuatro frases: \"Lo siento\", \"Perdóname\", \"Te amo\", \"Gracias\"",
              content: "Lo siento – reconozco y asumo la responsabilidad.\n\nPerdóname – pido perdón a mí mismo, a los demás y a lo Divino.\n\nTe amo – ofrezco amor incondicional a todo y a todos.\n\nGracias – celebro la oportunidad de purificación y sanación.\n\nDichas en cualquier orden, sirven como \"llave de limpieza\" para disolver programas subconscientes."
            },
            {
              title: "3.2 Cómo practicar el Ho'oponopono en el día a día",
              content: "Repita mentalmente o en voz alta siempre que surja una incomodidad; escriba las frases en un cuaderno; fije recordatorios visuales en el ambiente. La constancia profundiza la limpieza."
            },
            {
              title: "3.3 Meditación y escritura como herramientas de Ho'oponopono",
              content: "Medite enfocándose en las cuatro frases, permitiendo que las emociones vengan y se desprendan. La escritura repetitiva o el diario de insights hacen tangible el proceso de liberación."
            }
          ]
        },
        {
          title: "Capítulo 4 – Aplicando el Ho'oponopono en situaciones personales",
          sections: [
            {
              title: "4.1 Resolviendo conflictos internos",
              content: "Use las frases para liberar patrones autodestructivos, críticas internas y culpas antiguas — encontrando paz y claridad mental."
            },
            {
              title: "4.2 Mejorando relaciones",
              content: "Limpie resentimientos y expectativas; perdone y envíe amor al otro. Las parejas pueden practicar juntas para restaurar la comunicación."
            },
            {
              title: "4.3 Sanando enfermedades físicas y emocionales",
              content: "Como práctica complementaria, Ho'oponopono ayuda a romper la raíz energética de enfermedades crónicas y trastornos como ansiedad y depresión."
            }
          ]
        },
        {
          title: "Capítulo 5 – El poder transformador del perdón",
          sections: [
            {
              title: "5.1 La importancia del perdón en nuestro viaje de sanación",
              content: "El perdón libera del peso de las memorias dolorosas, interrumpiendo ciclos de sufrimiento."
            },
            {
              title: "5.2 Perdonándose a uno mismo",
              content: "Repita las cuatro frases para acoger fallos personales con compasión, aprendiendo de ellos sin cargar culpa."
            },
            {
              title: "5.3 Perdonando a los demás para alcanzar la paz interior",
              content: "Al perdonar genuinamente, soltamos la energía que nos mantiene vinculados al pasado y abrimos espacio para relaciones auténticas."
            }
          ]
        },
        {
          title: "Capítulo 6 – Expandiendo el Ho'oponopono al mundo",
          sections: [
            {
              title: "6.1 El papel del Ho'oponopono en la transformación global",
              content: "Sanando en nosotros, colaboramos para sanar el todo — pues la realidad colectiva refleja el estado interior de cada individuo."
            },
            {
              title: "6.2 Prácticas para traer paz al mundo",
              content: "Repetir las cuatro frases dirigidas a la humanidad.\n\nEscribir o meditar en grupo.\n\nVisualizar el planeta inundado de amor y gratitud."
            },
            {
              title: "6.3 Creando una vida de amor, gratitud y armonía",
              content: "El compromiso diario con la responsabilidad personal, el perdón y la gratitud crea un ciclo virtuoso de bienestar interno que se refleja en todas las áreas de la vida."
            }
          ]
        }
      ]
    }
  };

  // Injetar o resto dos capítulos existentes
  translations.pt.contents = [
    ...translations.pt.contents,
    ...translations.pt.contents.length === 1 ? Array.from({ length: 5 }, (_, i) => ({
      title: `Capítulo ${i + 2} – ` + {
        1: "O poder das memórias negativas",
        2: "A técnica do Ho'oponopono",
        3: "Aplicando o Ho'oponopono em situações pessoais",
        4: "O poder transformador do perdão",
        5: "Expandindo o Ho'oponopono para o mundo"
      }[i + 1],
      sections: [
        { title: "", content: "" }
      ]
    })) : []
  ];

  translations.es.contents = [
    ...translations.es.contents,
    ...translations.es.contents.length === 1 ? Array.from({ length: 5 }, (_, i) => ({
      title: `Capítulo ${i + 2} – ` + {
        1: "El poder de las memorias negativas",
        2: "La técnica del Ho'oponopono",
        3: "Aplicando el Ho'oponopono en situaciones personales",
        4: "El poder transformador del perdón",
        5: "Expandiendo el Ho'oponopono al mundo"
      }[i + 1],
      sections: [
        { title: "", content: "" }
      ]
    })) : []
  ];

  const t = translations[locale];

  // Função para formatar o conteúdo com quebras de linha
  const formatContent = (content: string) => {
    return content.split('\n\n').map((paragraph, index) => (
      <p key={index} style={styles.paragraph}>{paragraph}</p>
    ));
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToChapter = (index: number) => {
    setActiveChapter(index);
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const goToNextChapter = () => {
    if (activeChapter !== null && activeChapter < t.contents.length - 1) {
      scrollToChapter(activeChapter + 1);
    } else {
      // Se estiver no último capítulo, voltar ao sumário
      setActiveChapter(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderTOC = () => {
    return (
      <div style={styles.tocContainer}>
        {t.contents.map((chapter, index) => (
          <motion.div
            key={index}
            variants={chapterLinkVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            style={styles.chapterLink}
            onClick={() => scrollToChapter(index)}
          >
            <motion.div variants={glowVariants} style={styles.chapterLinkGlow} />
            <span style={styles.chapterLinkIcon}>{chapterIcons[index]}</span>
            <span style={styles.chapterLinkText}>{chapter.title}</span>
          </motion.div>
        ))}
      </div>
    );
  };

  const renderChapter = (chapter: ChapterData, index: number) => {
    return (
      <div key={index}>
        <motion.h2
          style={styles.chapterTitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span style={styles.chapterIcon}>{chapterIcons[index]}</span>
          {chapter.title}
        </motion.h2>

        {chapter.sections.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            <motion.h3
              style={styles.sectionTitle}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {section.title}
            </motion.h3>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {formatContent(section.content)}
            </motion.div>

            {/* Destaques especiais para determinadas seções */}
            {index === 2 && sectionIndex === 0 && (
              <motion.div
                style={styles.highlight}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <span style={{...styles.highlightQuote, ...styles.highlightQuoteLeft}}>"</span>
                Sinto muito. Me perdoe. Eu te amo. Sou grato.
                <span style={{...styles.highlightQuote, ...styles.highlightQuoteRight}}>"</span>
              </motion.div>
            )}
          </div>
        ))}

        <div style={styles.divider} />
        
        {/* Botão de Próximo Capítulo */}
        <div style={styles.navigationButtons}>
          <motion.button
            variants={nextChapterButtonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            style={styles.nextChapterButton}
            onClick={goToNextChapter}
          >
            {index < t.contents.length - 1 ? 
              `${t.nextChapter}${t.contents[index + 1].title.split('–')[1].trim()}` : 
              t.backToToc}
            <span style={styles.buttonIcon}>→</span>
          </motion.button>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    if (activeChapter === null) {
      return (
        <>
          <motion.h3
            style={styles.tocTitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {t.tocTitle}
          </motion.h3>
          
          <AnimatePresence>
            {renderTOC()}
          </AnimatePresence>
        </>
      );
    }

    return (
      <>
        <motion.div
          variants={backLinkVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          style={styles.backLink}
          onClick={() => setActiveChapter(null)}
        >
          ← {t.backToToc}
        </motion.div>

        <div ref={contentRef}>
          {renderChapter(t.contents[activeChapter], activeChapter)}
        </div>

        <motion.button
          variants={practiceButtonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          style={styles.practiceButton}
          onClick={() => setShowPracticeModal(true)}
        >
          <motion.div variants={glowVariants} style={styles.practiceButtonGlow} />
          <span style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center' }}>
            <span>✨</span> {t.practiceButton}
          </span>
        </motion.button>
      </>
    );
  };

  return (
    <main style={styles.container}>
      <Navbar />
      <div style={styles.backgroundDecoration}></div>
      
      <div style={styles.content}>
        <motion.h1
          style={styles.title}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {t.title}
        </motion.h1>
        <motion.div
          style={styles.titleDecoration}
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: '80px', opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        />
        
        <motion.p
          style={styles.subtitle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {t.subtitle}
        </motion.p>
        
        <motion.div
          style={styles.bookContainer}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div style={styles.bookDecoration}></div>
          {renderContent()}
          <div style={styles.bookShadow}></div>
        </motion.div>
      </div>
      
      <AnimatePresence>
        {showBackToTop && (
          <motion.div
            style={styles.backToTop}
            variants={backToTopVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            onClick={scrollToTop}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3 }}
          >
            {t.backToTop}
          </motion.div>
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {showPracticeModal && (
          <div style={styles.practiceModal}>
            <motion.div
              style={styles.modalContent}
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.button
                style={styles.closeButton}
                variants={backToTopVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                onClick={() => {
                  setShowPracticeModal(false);
                  setActiveMantra(null);
                }}
              >
                ✕
              </motion.button>
              
              <h3 style={styles.modalTitle}>{t.practiceTitle}</h3>
              
              <div style={styles.mantraContainer}>
                {t.mantras.map((mantra, index) => (
                  <motion.div
                    key={index}
                    style={{
                      ...styles.mantra,
                      ...(activeMantra === index ? styles.activeMantra : {})
                    }}
                    variants={mantraVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                    animate={activeMantra === index ? "active" : "initial"}
                    onClick={() => setActiveMantra(index)}
                  >
                    {mantra}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
} 