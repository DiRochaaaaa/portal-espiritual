'use client';

import { useState, useEffect, CSSProperties } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../../components/Navbar';
import { getCurrentLocale, Locale } from '../../lib/locale';
import Link from 'next/link';

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
    padding: '100px 24px 60px',
    width: '100%',
    maxWidth: '900px',
    margin: '0 auto',
  },
  title: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 'clamp(2rem, 5vw, 3rem)',
    fontWeight: 700,
    textAlign: 'center',
    marginBottom: '24px',
    background: 'linear-gradient(to right, #D4AF37, #FFD700, #D4AF37)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  subtitle: {
    fontSize: '1.1rem',
    textAlign: 'center',
    marginBottom: '40px',
    color: 'rgba(255, 255, 255, 0.9)',
    maxWidth: '800px',
    lineHeight: '1.7',
  },
  icon: {
    fontSize: '3rem',
    marginBottom: '24px',
    color: '#D4AF37',
  },
  introduction: {
    padding: '28px',
    borderRadius: '16px',
    backdropFilter: 'blur(10px)',
    background: 'rgba(123, 31, 162, 0.1)',
    border: '1px solid rgba(212, 175, 55, 0.3)',
    marginBottom: '48px',
    lineHeight: '1.8',
    color: 'rgba(255, 255, 255, 0.9)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  },
  prayersContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gap: '32px',
  },
  prayerCard: {
    position: 'relative',
    padding: '32px',
    borderRadius: '20px',
    background: 'rgba(75, 0, 130, 0.2)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(123, 31, 162, 0.3)',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
    overflow: 'hidden',
    zIndex: 1,
  },
  prayerTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '1.6rem',
    fontWeight: 600,
    marginBottom: '20px',
    color: '#D4AF37',
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
  },
  prayerText: {
    whiteSpace: 'pre-line',
    lineHeight: '1.8',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  decorativeOrb: {
    position: 'absolute',
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, var(--color-from) 0%, transparent 70%)',
    filter: 'blur(25px)',
    opacity: 0.15,
    zIndex: 0,
  },
  orbTop: {
    top: '-30px',
    right: '-30px',
    '--color-from': '#D4AF37',
    '--color-to': '#FFD700',
  } as CSSProperties,
  orbBottom: {
    bottom: '-30px',
    left: '-30px',
    '--color-from': '#7B1FA2',
  } as CSSProperties,
  footer: {
    width: '100%',
    padding: '1rem 0',
    textAlign: 'center',
    fontSize: '0.875rem',
    color: 'rgba(255, 255, 255, 0.4)',
    marginTop: '60px',
  },
  scrollToTopButton: {
    position: 'fixed',
    bottom: '1.5rem',
    right: '1.5rem',
    width: '3rem',
    height: '3rem',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, rgba(123, 31, 162, 0.8), rgba(74, 0, 114, 0.8))',
    border: '1px solid rgba(212, 175, 55, 0.3)',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    zIndex: 40,
    fontSize: '1.5rem',
  },
  navigationButtons: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: '40px',
  },
  navButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 20px',
    borderRadius: '20px',
    background: 'rgba(123, 31, 162, 0.2)',
    border: '1px solid rgba(123, 31, 162, 0.3)',
    color: 'rgba(255, 255, 255, 0.9)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textDecoration: 'none',
    fontSize: '0.9rem',
  },
};

const prayersData = [
  {
    id: 1,
    title: "ORAÇÃO PELA CURA FÍSICA",
    text: `Senhor Deus, Criador do universo,
Tu és o Médico Divino,
que podes curar todas as doenças.
Eu Te peço, Senhor,
pela cura da minha doença (nome da doença).
Eu sei que Tu podes me curar,
mesmo que os médicos tenham dito que não há cura.
Eu coloco minha fé em Ti,
e acredito que Tu podes fazer o impossível.
Obrigado, Senhor,
por Tua misericórdia e Teu amor.
Em nome de Jesus, Amém.`
  },
  {
    id: 2,
    title: "ORAÇÃO PELA CURA ESPIRITUAL",
    text: `Senhor Deus,
Tu és o Deus da cura,
que podes curar tanto o corpo quanto a alma.
Eu Te peço, Senhor,
pela cura da minha alma.
Eu sei que muitas vezes eu cometi erros,
e que isso me trouxe sofrimento.
Eu Te peço perdão, Senhor,
e me rendo ao Teu amor.
Eu acredito que Tu podes me curar,
e me dar uma nova vida.
Obrigado, Senhor,
por Tua misericórdia e Teu amor.
Em nome de Jesus, Amém.`
  },
  {
    id: 3,
    title: "ORAÇÃO PELA CURA EMOCIONAL",
    text: `Senhor Deus,
Tu és o Deus da cura,
que podes curar tanto o corpo quanto a alma.
Eu Te peço, Senhor,
pela cura das minhas emoções.
Eu sei que muitas vezes eu sofri,
e que isso me deixou com feridas emocionais.
Eu Te peço que me cure, Senhor,
e me dê paz e alegria.
Eu acredito que Tu podes me curar,
e me dar uma nova vida.
Obrigado, Senhor,
por Tua misericórdia e Teu amor.
Em nome de Jesus, Amém.`
  },
  {
    id: 4,
    title: "ORAÇÃO PELA CURA DA DEPRESSÃO",
    text: `Senhor Deus,
Tu és o Deus da cura,
que podes curar tanto o corpo quanto a alma.
Eu Te peço, Senhor,
pela cura da minha depressão.
Eu sei que essa doença está me causando muito sofrimento,
e eu quero ser curado.
Eu coloco minha fé em Ti,
e acredito que Tu podes me curar.
Obrigado, Senhor,
por Tua misericórdia e Teu amor.
Em nome de Jesus, Amém.`
  },
  {
    id: 5,
    title: "ORAÇÃO PELA CURA DA ANSIEDADE",
    text: `Senhor Deus,
Tu és o Deus da cura,
que podes curar tanto o corpo quanto a alma.
Eu Te peço, Senhor,
pela cura da minha ansiedade.
Eu sei que essa doença está me causando muito sofrimento,
e eu quero ser curado.
Eu coloco minha fé em Ti,
e acredito que Tu podes me curar.
Obrigado, Senhor,
por Tua misericórdia e Teu amor.
Em nome de Jesus, Amém.`
  },
  {
    id: 6,
    title: "ORAÇÃO PELA CURA DA DOR",
    text: `Senhor Deus,
Tu és o Deus da cura,
que podes curar tanto o corpo quanto a alma.
Eu Te peço, Senhor,
pela cura da minha dor.
Eu sei que essa dor está me causando muito sofrimento,
e eu quero ser curado.
Eu coloco minha fé em Ti,
e acredito que Tu podes me curar.
Obrigado, Senhor,
por Tua misericórdia e Teu amor.
Em nome de Jesus, Amém.`
  },
  {
    id: 7,
    title: "ORAÇÃO PELA CURA DA DEPENDÊNCIA",
    text: `Senhor Deus,
Tu és o Deus da cura,
que podes curar tanto o corpo quanto a alma.
Eu Te peço, Senhor,
pela cura da minha dependência.
Eu sei que essa doença está me destruindo,
e eu quero ser curado.
Eu coloco minha fé em Ti,
e acredito que Tu podes me curar.
Obrigado, Senhor,
por Tua misericórdia e Teu amor.
Em nome de Jesus, Amém.`
  }
];

export default function OracoesPage() {
  const [locale, setLocale] = useState<Locale>('pt');
  const [mounted, setMounted] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    setMounted(true);
    setLocale(getCurrentLocale());
    
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!mounted) return null;

  const translations = {
    pt: {
      title: "Orações de Cura",
      subtitle: "Orações poderosas para cura espiritual e proteção divina",
      introduction: `A cura é um dos maiores desejos do ser humano. Quando estamos doentes, sentimos a necessidade de sermos curados, de recuperarmos a nossa saúde e a nossa qualidade de vida.

A oração é uma forma poderosa de expressarmos o nosso desejo de cura. Quando oramos, estamos nos conectando com Deus, o Criador de todas as coisas, e pedindo a Sua intervenção em nossas vidas.

A fé é um elemento essencial na oração de cura. Quando oramos com fé, estamos depositando nossa confiança em Deus e acreditando que Ele pode nos curar.

Este guia-bônus apresenta 7 orações de cura. Elas podem ser usadas para pedir a cura para si mesmo ou para outra pessoa.`,
      prayerTitle: (id: number) => prayersData[id-1].title,
      prayerText: (id: number) => prayersData[id-1].text,
      backToHome: "Voltar ao Início",
      nextPage: "Próxima Página",
    },
    es: {
      title: "Oraciones de Sanación",
      subtitle: "Oraciones poderosas para sanación espiritual y protección divina",
      introduction: `La curación es uno de los mayores deseos del ser humano. Cuando estamos enfermos, sentimos la necesidad de ser curados, de recuperar nuestra salud y nuestra calidad de vida.

La oración es una forma poderosa de expresar nuestro deseo de curación. Cuando oramos, nos conectamos con Dios, el Creador de todas las cosas, y pedimos Su intervención en nuestras vidas.

La fe es un elemento esencial en la oración de sanación. Cuando oramos con fe, depositamos nuestra confianza en Dios y creemos que Él puede sanarnos.

Esta guía de bonificación presenta 7 oraciones de sanación. Pueden utilizarse para pedir la curación para uno mismo o para otra persona.`,
      prayerTitle: (id: number) => {
        const titles = {
          1: "ORACIÓN POR LA CURACIÓN FÍSICA",
          2: "ORACIÓN POR LA CURACIÓN ESPIRITUAL",
          3: "ORACIÓN POR LA CURACIÓN EMOCIONAL",
          4: "ORACIÓN POR LA CURACIÓN DE LA DEPRESIÓN",
          5: "ORACIÓN POR LA CURACIÓN DE LA ANSIEDAD",
          6: "ORACIÓN POR LA CURACIÓN DEL DOLOR",
          7: "ORACIÓN POR LA CURACIÓN DE LA DEPENDENCIA"
        };
        return titles[id as keyof typeof titles];
      },
      prayerText: (id: number) => {
        const prayers = {
          1: `Señor Dios, Creador del universo,
Tú eres el Médico Divino,
que puede curar todas las enfermedades.
Te pido, Señor,
por la curación de mi enfermedad (nombre de la enfermedad).
Sé que Tú puedes curarme,
aunque los médicos hayan dicho que no hay cura.
Pongo mi fe en Ti,
y creo que Tú puedes hacer lo imposible.
Gracias, Señor,
por Tu misericordia y Tu amor.
En el nombre de Jesús, Amén.`,
          2: `Señor Dios,
Tú eres el Dios de la curación,
que puede sanar tanto el cuerpo como el alma.
Te pido, Señor,
por la curación de mi alma.
Sé que muchas veces he cometido errores,
y eso me ha traído sufrimiento.
Te pido perdón, Señor,
y me rindo a Tu amor.
Creo que Tú puedes sanarme,
y darme una nueva vida.
Gracias, Señor,
por Tu misericordia y Tu amor.
En el nombre de Jesús, Amén.`,
          3: `Señor Dios,
Tú eres el Dios de la curación,
que puede sanar tanto el cuerpo como el alma.
Te pido, Señor,
por la curación de mis emociones.
Sé que muchas veces he sufrido,
y eso me ha dejado con heridas emocionales.
Te pido que me sanes, Señor,
y me des paz y alegría.
Creo que Tú puedes sanarme,
y darme una nueva vida.
Gracias, Señor,
por Tu misericordia y Tu amor.
En el nombre de Jesús, Amén.`,
          4: `Señor Dios,
Tú eres el Dios de la curación,
que puede sanar tanto el cuerpo como el alma.
Te pido, Señor,
por la curación de mi depresión.
Sé que esta enfermedad me está causando mucho sufrimiento,
y quiero ser sanado.
Pongo mi fe en Ti,
y creo que Tú puedes sanarme.
Gracias, Señor,
por Tu misericordia y Tu amor.
En el nombre de Jesús, Amén.`,
          5: `Señor Dios,
Tú eres el Dios de la curación,
que puede sanar tanto el cuerpo como el alma.
Te pido, Señor,
por la curación de mi ansiedad.
Sé que esta enfermedad me está causando mucho sufrimiento,
y quiero ser sanado.
Pongo mi fe en Ti,
y creo que Tú puedes sanarme.
Gracias, Señor,
por Tu misericordia y Tu amor.
En el nombre de Jesús, Amén.`,
          6: `Señor Dios,
Tú eres el Dios de la curación,
que puede sanar tanto el cuerpo como el alma.
Te pido, Señor,
por la curación de mi dolor.
Sé que este dolor me está causando mucho sufrimiento,
y quiero ser sanado.
Pongo mi fe en Ti,
y creo que Tú puedes sanarme.
Gracias, Señor,
por Tu misericordia y Tu amor.
En el nombre de Jesús, Amén.`,
          7: `Señor Dios,
Tú eres el Dios de la curación,
que puede sanar tanto el cuerpo como el alma.
Te pido, Señor,
por la curación de mi dependencia.
Sé que esta enfermedad me está destruyendo,
y quiero ser sanado.
Pongo mi fe en Ti,
y creo que Tú puedes sanarme.
Gracias, Señor,
por Tu misericordia y Tu amor.
En el nombre de Jesús, Amén.`
        };
        return prayers[id as keyof typeof prayers];
      },
      backToHome: "Volver al Inicio",
      nextPage: "Página Siguiente",
    }
  };

  const t = translations[locale];

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
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div style={styles.icon}>📖</div>
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
          style={styles.introduction}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {t.introduction}
        </motion.div>
        
        <motion.div
          style={styles.prayersContainer}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {Array.from({ length: 7 }, (_, i) => i + 1).map((id) => (
            <motion.div
              key={id}
              data-prayer-id={id}
              style={styles.prayerCard}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: 0.6 + (id * 0.1) 
              }}
              whileHover={{ 
                y: -5,
                boxShadow: '0 15px 30px rgba(0, 0, 0, 0.2)',
                border: '1px solid rgba(212, 175, 55, 0.5)'
              }}
            >
              <div 
                style={{
                  ...styles.decorativeOrb,
                  ...styles.orbTop
                }}
              />
              <div 
                style={{
                  ...styles.decorativeOrb,
                  ...styles.orbBottom
                }}
              />
              
              <h3 style={styles.prayerTitle}>
                {t.prayerTitle(id)}
              </h3>
              
              <p style={styles.prayerText}>
                {t.prayerText(id)}
              </p>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div
          style={styles.navigationButtons}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <Link href="/">
            <motion.div
              style={styles.navButton}
              whileHover={{ 
                scale: 1.05,
                backgroundColor: 'rgba(123, 31, 162, 0.3)',
              }}
              whileTap={{ scale: 0.95 }}
            >
              ← {t.backToHome}
            </motion.div>
          </Link>
          
          <Link href="/bonus">
            <motion.div
              style={styles.navButton}
              whileHover={{ 
                scale: 1.05,
                backgroundColor: 'rgba(123, 31, 162, 0.3)',
              }}
              whileTap={{ scale: 0.95 }}
            >
              {t.nextPage} →
            </motion.div>
          </Link>
        </motion.div>
        
        <footer style={styles.footer}>
          <p>© 2025 Portal Espiritual</p>
        </footer>
      </motion.div>
      
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            style={styles.scrollToTopButton}
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            whileHover={{ 
              scale: 1.1,
              boxShadow: '0 6px 20px rgba(0, 0, 0, 0.4)'
            }}
            whileTap={{ scale: 0.9 }}
          >
            ↑
          </motion.button>
        )}
      </AnimatePresence>
    </main>
  );
}