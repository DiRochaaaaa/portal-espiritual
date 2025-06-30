'use client';

import { useState, useEffect, CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { getCurrentLocale, Locale } from '../lib/locale';

// Lista de mensagens espirituais com suas referências
const quotes = {
  pt: [
    {
      text: "A paz vem de dentro. Não a procure fora.",
      source: "Buda"
    },
    {
      text: "Onde quer que você esteja, esteja totalmente lá.",
      source: "Eckhart Tolle"
    },
    {
      text: "O perdão é a fragrância que a violeta deixa na sandália que a esmagou.",
      source: "Mark Twain"
    },
    {
      text: "A gratidão transforma o que temos em suficiente, e mais.",
      source: "Melody Beattie"
    },
    {
      text: "Sua tarefa não é buscar o amor, mas apenas procurar e encontrar todas as barreiras dentro de si que você construiu contra ele.",
      source: "Rumi"
    },
    {
      text: "Você não é uma gota no oceano. Você é o oceano inteiro em uma gota.",
      source: "Rumi"
    },
    {
      text: "A maneira como você pensa determina a maneira como você sente, e a maneira como você sente influencia a maneira como você age.",
      source: "Rick Warren"
    },
    {
      text: "Quem olha para fora, sonha; quem olha para dentro, acorda.",
      source: "Carl Jung"
    },
    {
      text: "O universo não conspira contra você, mas também não se desvia para alinhar seu caminho.",
      source: "Deepak Chopra"
    },
    {
      text: "Aprendi a dar não porque tenho muito, mas porque sei exatamente o que significa não ter nada.",
      source: "Bob Marley"
    },
    {
      text: "O tempo é o bem mais valioso que temos, porque é o mais limitado. Podemos produzir mais dinheiro, mas não podemos produzir mais tempo.",
      source: "Dalai Lama"
    },
    {
      text: "A felicidade é a consequência natural de fazer o que ama e servir a quem você ama.",
      source: "Wayne Dyer"
    },
    {
      text: "A prática de Ho'oponopono consiste em limpar memórias dolorosas que se manifestam como problemas, através da repetição das palavras: 'Sinto muito, me perdoe, eu te amo, sou grato'.",
      source: "Ihaleakala Hew Len"
    },
    {
      text: "Quando você acha que chegou ao seu limite, vá um pouco mais além e encontrará uma força infinita.",
      source: "Chico Xavier"
    },
    {
      text: "O sorriso é uma luz na janela da alma, indicando que o coração está em casa.",
      source: "Kardec"
    }
  ],
  es: [
    {
      text: "La paz viene de adentro. No la busques afuera.",
      source: "Buda"
    },
    {
      text: "Dondequiera que estés, estate totalmente allí.",
      source: "Eckhart Tolle"
    },
    {
      text: "El perdón es la fragancia que la violeta deja en el tacón que la ha aplastado.",
      source: "Mark Twain"
    },
    {
      text: "La gratitud transforma lo que tenemos en suficiente, y más.",
      source: "Melody Beattie"
    },
    {
      text: "Tu tarea no es buscar el amor, sino simplemente buscar y encontrar todas las barreras dentro de ti que has construido contra él.",
      source: "Rumi"
    },
    {
      text: "No eres una gota en el océano. Eres el océano entero en una gota.",
      source: "Rumi"
    },
    {
      text: "La forma en que piensas determina la forma en que sientes, y la forma en que sientes influye en cómo actúas.",
      source: "Rick Warren"
    },
    {
      text: "Quien mira hacia afuera, sueña; quien mira hacia adentro, despierta.",
      source: "Carl Jung"
    },
    {
      text: "El universo no conspira contra ti, pero tampoco se desvía para alinear tu camino.",
      source: "Deepak Chopra"
    },
    {
      text: "Aprendí a dar no porque tengo mucho, sino porque sé exactamente lo que significa no tener nada.",
      source: "Bob Marley"
    },
    {
      text: "El tiempo es el recurso más valioso que tenemos, porque es el más limitado. Podemos producir más dinero, pero no podemos producir más tiempo.",
      source: "Dalai Lama"
    },
    {
      text: "La felicidad es la consecuencia natural de hacer lo que amas y servir a quien amas.",
      source: "Wayne Dyer"
    },
    {
      text: "La práctica de Ho'oponopono consiste en limpiar recuerdos dolorosos que se manifiestan como problemas, a través de la repetición de las palabras: 'Lo siento, perdóname, te amo, estoy agradecido'.",
      source: "Ihaleakala Hew Len"
    },
    {
      text: "Cuando crees que has llegado a tu límite, ve un poco más allá y encontrarás una fuerza infinita.",
      source: "Chico Xavier"
    },
    {
      text: "La sonrisa es una luz en la ventana del alma, indicando que el corazón está en casa.",
      source: "Kardec"
    }
  ],
  en: [
    {
      text: "Peace comes from within. Do not seek it outside.",
      source: "Buddha"
    },
    {
      text: "Wherever you are, be there totally.",
      source: "Eckhart Tolle"
    },
    {
      text: "Forgiveness is the fragrance that the violet leaves on the heel that has crushed it.",
      source: "Mark Twain"
    },
    {
      text: "Gratitude transforms what we have into enough, and more.",
      source: "Melody Beattie"
    },
    {
      text: "Your task is not to seek love, but merely to seek and find all the barriers within yourself that you have built against it.",
      source: "Rumi"
    },
    {
      text: "You are not a drop in the ocean. You are the entire ocean in a drop.",
      source: "Rumi"
    },
    {
      text: "The way you think determines the way you feel, and the way you feel influences how you act.",
      source: "Rick Warren"
    },
    {
      text: "Who looks outside, dreams; who looks inside, awakens.",
      source: "Carl Jung"
    },
    {
      text: "The universe does not conspire against you, but it also does not deviate to align your path.",
      source: "Deepak Chopra"
    },
    {
      text: "I learned to give not because I have much, but because I know exactly what it means to have nothing.",
      source: "Bob Marley"
    },
    {
      text: "Time is the most valuable resource we have, because it is the most limited. We can produce more money, but we cannot produce more time.",
      source: "Dalai Lama"
    },
    {
      text: "Happiness is the natural consequence of doing what you love and serving those you love.",
      source: "Wayne Dyer"
    },
    {
      text: "The practice of Ho'oponopono consists of cleaning painful memories that manifest as problems, through the repetition of the words: 'I'm sorry, forgive me, I love you, I'm grateful'.",
      source: "Ihaleakala Hew Len"
    },
    {
      text: "When you think you've reached your limit, go a little further and you'll find infinite strength.",
      source: "Chico Xavier"
    },
    {
      text: "A smile is a light in the window of the soul, indicating that the heart is at home.",
      source: "Kardec"
    }
  ]
};

// Versão simplificada do componente
const SpiritualQuotes = () => {
  const [locale, setLocale] = useState<Locale>('pt');
  const [currentQuote, setCurrentQuote] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Verificar o tipo de dispositivo
  useEffect(() => {
    setMounted(true);
    setLocale(getCurrentLocale());
    setIsMobile(window.innerWidth < 768);
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Navegar para a mensagem anterior
  const prevQuote = () => {
    setCurrentQuote(current => {
      if (current <= 0) return quotes[locale].length - 1;
      return current - 1;
    });
  };

  // Navegar para a próxima mensagem
  const nextQuote = () => {
    setCurrentQuote(current => {
      if (current >= quotes[locale].length - 1) return 0;
      return current + 1;
    });
  };

  // Ir para uma mensagem específica
  const goToQuote = (index: number) => {
    setCurrentQuote(index);
  };

  if (!mounted) return null;

  const currentMessages = quotes[locale as keyof typeof quotes] || quotes.pt;
  const currentMessage = currentMessages[currentQuote];

  const containerStyle: CSSProperties = {
    position: 'relative',
    padding: isMobile ? '25px 10px' : '30px 15px',
    background: 'linear-gradient(to right, rgba(21, 0, 34, 0.9), rgba(123, 31, 162, 0.5))',
    borderRadius: '10px',
    margin: '20px 0',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
    width: '100%',
    maxWidth: isMobile ? '95%' : '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
  };

  const titleStyle: CSSProperties = {
    color: '#D4AF37',
    fontSize: isMobile ? '1.5rem' : '1.8rem',
    fontFamily: "'Playfair Display', serif",
    marginBottom: '20px',
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
  };

  const cardContainerStyle: CSSProperties = {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: isMobile ? '0 30px' : '0',
    margin: isMobile ? '15px 0' : '30px 0',
    width: '100%',
  };

  const cardStyle: CSSProperties = {
    padding: isMobile ? '30px 15px' : '30px',
    margin: '0 auto',
    width: '100%',
    maxWidth: isMobile ? '100%' : '90%',
    borderRadius: '15px',
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    marginBottom: isMobile ? '10px' : '15px',
    minHeight: isMobile ? '160px' : 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  };

  const quoteStyle: CSSProperties = {
    fontSize: isMobile ? '1.1rem' : '1.2rem',
    color: 'white',
    lineHeight: '1.6',
    marginBottom: '15px',
    fontStyle: 'italic',
    textAlign: 'center',
  };

  const sourceStyle: CSSProperties = {
    textAlign: 'right',
    color: '#D4AF37',
    fontSize: isMobile ? '1rem' : '1rem',
    fontWeight: 500,
    marginTop: 'auto',
  };

  const buttonsContainerStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    margin: '20px 0',
  };

  const navButtonStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: isMobile ? '40px' : '45px',
    height: isMobile ? '40px' : '45px',
    borderRadius: '50%',
    background: 'rgba(123, 31, 162, 0.5)',
    color: 'white',
    fontSize: isMobile ? '1.5rem' : '1.8rem',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    cursor: 'pointer',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  };

  const mobileButtonStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: 'rgba(123, 31, 162, 0.7)',
    color: 'white',
    fontSize: '1.2rem',
    border: '1px solid rgba(255, 255, 255, 0.5)',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
    position: 'absolute',
    top: '45%',
    transform: 'translateY(-50%)',
    zIndex: 10,
    transition: 'all 0.2s ease-in-out',
  };

  const dotsContainerStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    gap: isMobile ? '6px' : '8px',
    margin: isMobile ? '15px 0 10px' : '20px 0 10px',
    flexWrap: 'wrap',
    maxWidth: '100%',
    padding: '0 10px',
  };

  const dotStyle: CSSProperties = {
    width: isMobile ? '8px' : '10px',
    height: isMobile ? '8px' : '10px',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.3)',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    margin: isMobile ? '3px' : '0',
  };

  const activeDotStyle: CSSProperties = {
    ...dotStyle,
    background: '#D4AF37',
    transform: 'scale(1.2)',
  };

  const instructionsStyle: CSSProperties = {
    fontSize: '0.85rem',
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
  };

  const translations = {
    pt: {
      title: "Mensagens Espirituais",
      instructions: "Use os botões para navegar entre as mensagens"
    },
    es: {
      title: "Mensajes Espirituales",
      instructions: "Use los botones para navegar entre los mensajes"
    },
    en: {
      title: "Spiritual Messages",
      instructions: "Use the buttons to navigate between messages"
    }
  };

  const t = translations[locale];

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>{t.title}</h2>
      
      <div style={cardContainerStyle}>
        {isMobile && (
          <>
            <motion.button 
              style={{...mobileButtonStyle, left: '0px'}}
              whileHover={{ scale: 1.1, background: 'rgba(123, 31, 162, 0.9)' }}
              whileTap={{ scale: 0.95 }}
              onClick={prevQuote}
              aria-label="Mensagem anterior"
            >
              ←
            </motion.button>
            <motion.button 
              style={{...mobileButtonStyle, right: '0px'}}
              whileHover={{ scale: 1.1, background: 'rgba(123, 31, 162, 0.9)' }}
              whileTap={{ scale: 0.95 }}
              onClick={nextQuote}
              aria-label="Próxima mensagem"
            >
              →
            </motion.button>
          </>
        )}
        
        <motion.div 
          style={cardStyle}
          key={currentQuote}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <p style={quoteStyle}>"{currentMessage.text}"</p>
          <p style={sourceStyle}>— {currentMessage.source}</p>
        </motion.div>
      </div>
      
      {!isMobile && (
        <div style={buttonsContainerStyle}>
          <button 
            style={navButtonStyle} 
            onClick={prevQuote}
            aria-label="Mensagem anterior"
          >
            ←
          </button>
          <button 
            style={navButtonStyle} 
            onClick={nextQuote}
            aria-label="Próxima mensagem"
          >
            →
          </button>
        </div>
      )}
      
      <div style={dotsContainerStyle}>
        {currentMessages.map((_, index) => (
          <button
            key={index}
            style={index === currentQuote ? activeDotStyle : dotStyle}
            onClick={() => goToQuote(index)}
            aria-label={`Ir para mensagem ${index + 1}`}
          />
        ))}
      </div>
      
      <p style={instructionsStyle}>{t.instructions}</p>
    </div>
  );
};

export default SpiritualQuotes; 