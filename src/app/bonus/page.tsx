'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { NavbarWithSuspense, BonusCardWithSuspense } from '../../lib/LazyComponents';
import { getCurrentLocale, Locale } from '../../lib/locale';

export default function BonusPage() {
  const [locale, setLocale] = useState<Locale>('pt');
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    setLocale(getCurrentLocale());
  }, []);
  
  if (!mounted) return null;
  
  const translations = {
    pt: {
      title: "BÔNUS",
      subtitle: "Acesse nossos conteúdos exclusivos",
      buttonText: "ACESSAR",
      bonusList: [
        { 
          title: "Grupo do WhatsApp Exclusivo", 
          description: "Junte-se ao nosso grupo para receber mensagens diárias",
          icon: "whatsapp",
          link: "https://chat.whatsapp.com/LGi8EoO6OB804uGRossRNO"
        },
        { 
          title: "Orações de Cura", 
          description: "Orações poderosas para cura espiritual",
          icon: "prayer",
          link: "/oracoes"
        },
        { 
          title: "Presente Surpresa", 
          description: "Um presente especial para você",
          icon: "gift",
          link: "/presente"
        },
        { 
          title: "Contato com Celestino", 
          description: "Contato direto com nosso mentor espiritual",
          icon: "celestino",
          link: "https://wa.me/5511966536715"
        },
        { 
          title: "Canção Angelical", 
          description: "Músicas para elevar sua vibração",
          icon: "music",
          link: "/cancao"
        }
      ]
    },
    es: {
      title: "BONOS",
      subtitle: "Accede a nuestros contenidos exclusivos",
      buttonText: "ACCEDER",
      bonusList: [
        { 
          title: "Grupo de WhatsApp Exclusivo", 
          description: "Únete a nuestro grupo para recibir mensajes diarios",
          icon: "whatsapp",
          link: "https://chat.whatsapp.com/LGi8EoO6OB804uGRossRNO"
        },
        { 
          title: "Oraciones de Sanación", 
          description: "Poderosas oraciones para sanación espiritual",
          icon: "prayer",
          link: "/oracoes"
        },
        { 
          title: "Regalo Sorpresa", 
          description: "Un regalo especial para ti",
          icon: "gift",
          link: "/presente"
        },
        { 
          title: "Contacto con Celestino", 
          description: "Contacto directo con nuestro mentor espiritual",
          icon: "celestino",
          link: "https://wa.me/5511966536715"
        },
        { 
          title: "Canción Angelical", 
          description: "Música para elevar tu vibración",
          icon: "music",
          link: "/cancao"
        }
      ]
    }
  };
  
  const t = translations[locale];
  
  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-darkBg via-purpleDark/50 to-darkBg text-white">
      <NavbarWithSuspense />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-heading text-goldAccent mb-4">{t.title}</h1>
          <p className="text-white/80 max-w-xl mx-auto">{t.subtitle}</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.bonusList.map((bonus, index) => (
            <BonusCardWithSuspense
              key={index}
              title={bonus.title}
              description={bonus.description}
              icon={bonus.icon}
              link={bonus.link}
              index={index}
              buttonText={t.buttonText}
            />
          ))}
        </div>
      </div>
      
      <footer className="w-full py-4 text-center text-white/40 text-sm mt-auto">
        <p>© 2025 Portal Espiritual</p>
      </footer>
    </main>
  );
} 