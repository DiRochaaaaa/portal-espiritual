import { CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { BonusCardWithSuspense } from '../lib/LazyComponents';

interface BonusSectionProps {
  locale: 'pt' | 'es' | 'en' | 'fr';
}

const styles: Record<string, CSSProperties> = {
  container: {
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 20px',
  },
  title: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '2.5rem',
    fontWeight: 700,
    textAlign: 'center',
    marginBottom: '48px',
    color: '#D4AF37',
    position: 'relative',
    display: 'inline-block',
    left: '50%',
    transform: 'translateX(-50%)',
  },
  subtitle: {
    fontSize: '1.8rem',
    fontWeight: 600,
    textAlign: 'center',
    marginBottom: '30px',
    marginTop: '60px',
    color: '#F9FAFB',
    position: 'relative',
    display: 'inline-block',
    left: '50%',
    transform: 'translateX(-50%)',
  },
  titleDecoration: {
    position: 'absolute',
    content: '""',
    height: '3px',
    width: '80px',
    background: 'linear-gradient(to right, transparent, #F97316, transparent)',
    bottom: '-12px',
    left: '50%',
    transform: 'translateX(-50%)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '30px',
  },
  sectionDescription: {
    color: '#D1D5DB',
    textAlign: 'center',
    maxWidth: '800px',
    margin: '0 auto 30px',
    lineHeight: '1.6',
    fontSize: '1.05rem',
  },
  highlightText: {
    color: '#F97316',
    fontWeight: 600,
  }
};

// Links para os recursos e contatos
const links = {
  whatsapp: {
    pt: 'https://chat.whatsapp.com/LGi8EoO6OB804uGRossRNO',
    es: 'https://chat.whatsapp.com/CaYhi6V14y00Wr0iuSK6Rl'
  },
  celestino: '/celestino',
  prayers: '/oracoes',
  gift: '/presente',
  song: '/cancao'
};

export default function BonusSection({ locale }: BonusSectionProps) {
  const translations = {
    pt: {
      mainTitle: "Portal Espiritual",
      featuresTitle: "Recursos Espirituais",
      featuresDescription: "Explore os recursos disponíveis em nosso portal para enriquecer sua jornada espiritual:",
      contactTitle: "Contato e Comunidade",
      contactDescription: "Conecte-se conosco e faça parte da nossa comunidade espiritual:",
      buttonText: "ACESSAR",
      features: [
        {
          title: "Orações de Cura",
          description: "Orações poderosas para cura espiritual",
          icon: "prayer",
          link: links.prayers
        },
        {
          title: "Presente Surpresa",
          description: "Um presente especial para você",
          icon: "gift",
          link: links.gift
        },
        {
          title: "Canção Angelical",
          description: "Músicas para elevar sua vibração",
          icon: "music",
          link: links.song
        }
      ],
      contacts: [
        {
          title: "Grupo do WhatsApp Exclusivo",
          description: "Junte-se ao nosso grupo para receber mensagens diárias",
          icon: "whatsapp",
          link: links.whatsapp.pt
        },
        {
          title: "Contato Direto com Celestino",
          description: "Contato direto com nosso mentor espiritual",
          icon: "celestino",
          link: links.celestino
        }
      ]
    },
    es: {
      mainTitle: "Portal Espiritual",
      featuresTitle: "Recursos Espirituales",
      featuresDescription: "Explore los recursos disponibles en nuestro portal para enriquecer su jornada espiritual:",
      contactTitle: "Contacto y Comunidad",
      contactDescription: "Conéctese con nosotros y forme parte de nuestra comunidad espiritual:",
      buttonText: "ACCEDER",
      features: [
        {
          title: "Oraciones de Sanación",
          description: "Poderosas oraciones para sanación espiritual",
          icon: "prayer",
          link: links.prayers
        },
        {
          title: "Regalo Sorpresa",
          description: "Un regalo especial para ti",
          icon: "gift",
          link: links.gift
        },
        {
          title: "Canción Angelical",
          description: "Música para elevar tu vibración",
          icon: "music",
          link: links.song
        }
      ],
      contacts: [
        {
          title: "Grupo de WhatsApp Exclusivo",
          description: "Únete a nuestro grupo para recibir mensajes diarios",
          icon: "whatsapp",
          link: links.whatsapp.es
        },
        {
          title: "Contacto Directo con Celestino",
          description: "Contacto directo con nuestro mentor espiritual",
          icon: "celestino",
          link: links.celestino
        }
      ]
    },
    en: {
      mainTitle: "Spiritual Portal",
      featuresTitle: "Spiritual Resources",
      featuresDescription: "Explore the resources available on our portal to enrich your spiritual journey:",
      contactTitle: "Contact and Community",
      contactDescription: "Connect with us and become part of our spiritual community:",
      buttonText: "ACCESS",
      features: [
        {
          title: "Healing Prayers",
          description: "Powerful prayers for spiritual healing",
          icon: "prayer",
          link: links.prayers
        },
        {
          title: "Surprise Gift",
          description: "A special gift for you",
          icon: "gift",
          link: links.gift
        },
        {
          title: "Angelic Song",
          description: "Music to elevate your vibration",
          icon: "music",
          link: links.song
        }
      ],
      contacts: [
        {
          title: "Exclusive WhatsApp Group",
          description: "Join our group to receive daily messages",
          icon: "whatsapp",
          link: links.whatsapp.pt // Using PT group for now, can be updated later
        },
        {
          title: "Direct Contact with Celestino",
          description: "Direct contact with our spiritual mentor",
          icon: "celestino",
          link: links.celestino
        }
      ]
    },
    fr: {
      mainTitle: "Portail Spirituel",
      featuresTitle: "Ressources Spirituelles",
      featuresDescription: "Explorez les ressources disponibles sur notre portail pour enrichir votre parcours spirituel :",
      contactTitle: "Contact et Communauté",
      contactDescription: "Connectez-vous avec nous et rejoignez notre communauté spirituelle :",
      buttonText: "ACCÉDER",
      features: [
        {
          title: "Prières de Guérison",
          description: "Prières puissantes pour la guérison spirituelle",
          icon: "prayer",
          link: links.prayers
        },
        {
          title: "Cadeau Surprise",
          description: "Un cadeau spécial pour vous",
          icon: "gift",
          link: links.gift
        },
        {
          title: "Chanson Angélique",
          description: "Musique pour élever votre vibration",
          icon: "music",
          link: links.song
        }
      ],
      contacts: [
        {
          title: "Groupe WhatsApp Exclusif",
          description: "Rejoignez notre groupe pour recevoir des messages quotidiens",
          icon: "whatsapp",
          link: links.whatsapp.pt
        },
        {
          title: "Contact Direct avec Celestino",
          description: "Contact direct avec notre mentor spirituel",
          icon: "celestino",
          link: links.celestino
        }
      ]
    }
  };

  const t = translations[locale];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      style={styles.container}
    >
      {/* Título principal */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 style={styles.title}>
          {t.mainTitle}
          <span style={styles.titleDecoration}></span>
        </h2>
      </motion.div>

      {/* Seção de Recursos Espirituais */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h3 style={styles.subtitle}>
          {t.featuresTitle}
          <span style={styles.titleDecoration}></span>
        </h3>
        
        <p style={styles.sectionDescription}>
          {t.featuresDescription}
        </p>
      </motion.div>

      <div style={styles.grid}>
        {t.features.map((feature, index) => (
          <BonusCardWithSuspense
            key={`feature-${index}`}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
            link={feature.link}
            index={index}
            buttonText={t.buttonText}
          />
        ))}
      </div>

      {/* Seção de Contato e Comunidade */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h3 style={styles.subtitle}>
          {t.contactTitle}
          <span style={styles.titleDecoration}></span>
        </h3>
        
        <p style={styles.sectionDescription}>
          {t.contactDescription}
        </p>
      </motion.div>

      <div style={styles.grid}>
        {t.contacts.map((contact, index) => (
          <BonusCardWithSuspense
            key={`contact-${index}`}
            title={contact.title}
            description={contact.description}
            icon={contact.icon}
            link={contact.link}
            index={index}
            buttonText={t.buttonText}
          />
        ))}
      </div>
    </motion.section>
  );
}