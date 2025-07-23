'use client';

import { useState, useEffect, CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { NavbarWithSuspense, FooterWithSuspense } from '../../../lib/LazyComponents';
import { getCurrentLocale, Locale } from '../../../lib/locale';

const styles: Record<string, CSSProperties> = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    background: 'linear-gradient(to bottom, #150022, #4A0072, #150022)',
    color: 'white',
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexGrow: 1,
    padding: '6rem 1rem 3rem',
  },
  policyContainer: {
    width: '100%',
    maxWidth: '800px',
    background: 'rgba(21, 0, 34, 0.7)',
    backdropFilter: 'blur(10px)',
    borderRadius: '15px',
    padding: '2rem',
    margin: '0 auto 2rem',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
    border: '1px solid rgba(123, 31, 162, 0.3)',
  },
  heading: {
    fontSize: 'clamp(1.8rem, 5vw, 2.5rem)',
    fontFamily: "'Playfair Display', serif",
    textAlign: 'center',
    marginBottom: '2rem',
    background: 'linear-gradient(to right, #D4AF37, #FFD700, #D4AF37)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  section: {
    marginBottom: '1.5rem',
  },
  sectionTitle: {
    fontSize: '1.3rem',
    color: '#D4AF37',
    marginBottom: '0.8rem',
    fontWeight: 600,
  },
  paragraph: {
    fontSize: '1rem',
    lineHeight: 1.6,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: '1rem',
  },
  list: {
    paddingLeft: '1.5rem',
    marginBottom: '1rem',
  },
  listItem: {
    fontSize: '1rem',
    lineHeight: 1.6,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: '0.5rem',
  },
  lastUpdated: {
    fontSize: '0.85rem',
    color: 'rgba(255, 255, 255, 0.6)',
    textAlign: 'center',
    marginTop: '2rem',
  }
};

export default function PrivacyPolicyPage() {
  const [locale, setLocale] = useState<Locale>('pt');
  const [mounted, setMounted] = useState<boolean>(false);
  
  useEffect(() => {
    setMounted(true);
    setLocale(getCurrentLocale());
  }, []);
  
  if (!mounted) return null;
  
  const translations = {
    pt: {
      title: "Política de Privacidade",
      lastUpdated: "Última atualização: Janeiro de 2025",
      intro: "A ARTEMI LTDA, responsável pelo Portal Espiritual, está comprometida em proteger sua privacidade. Esta Política de Privacidade explica como coletamos, usamos e protegemos suas informações pessoais.",
      dataCollection: {
        title: "Coleta de Dados",
        p1: "Coletamos informações quando você visita nosso site, interage com nosso conteúdo ou se registra em nossa plataforma.",
        p2: "As informações que podemos coletar incluem:",
        items: [
          "Nome e endereço de e-mail",
          "Informações demográficas como localização e idioma",
          "Informações do dispositivo e navegador",
          "Endereço IP e dados de uso do site"
        ]
      },
      dataUse: {
        title: "Uso de Dados",
        p1: "Utilizamos suas informações para:",
        items: [
          "Personalizar sua experiência e atender às suas necessidades individuais",
          "Melhorar nosso site com base no feedback recebido",
          "Enviar e-mails periódicos com conteúdo espiritual ou promocional",
          "Processar transações e fornecer os serviços solicitados"
        ]
      },
      dataSecurity: {
        title: "Segurança de Dados",
        p1: "Implementamos uma variedade de medidas de segurança para manter a proteção de suas informações pessoais. Utilizamos criptografia avançada para proteger informações sensíveis transmitidas online e também protegemos suas informações offline."
      },
      cookies: {
        title: "Cookies",
        p1: "Utilizamos cookies para melhorar a experiência do usuário. Os cookies são pequenos arquivos que um site transfere para o disco rígido do seu computador através do navegador da web (se você permitir) que permite aos sites reconhecer seu navegador e lembrar certas informações.",
        p2: "Para mais detalhes, consulte nossa Política de Cookies."
      },
      thirdParty: {
        title: "Serviços de Terceiros",
        p1: "Utilizamos serviços de terceiros para análise, publicidade e funcionalidades específicas. Esses serviços podem coletar informações enviadas pelo seu navegador como parte de uma solicitação de página da web."
      },
      rights: {
        title: "Seus Direitos",
        p1: "Você tem direito a:",
        items: [
          "Acessar os dados pessoais que temos sobre você",
          "Solicitar a correção de dados imprecisos",
          "Solicitar a exclusão de seus dados",
          "Opor-se ao processamento de seus dados",
          "Solicitar a transferência de seus dados"
        ],
        p2: "Para exercer esses direitos, entre em contato conosco através do e-mail: adm.artemi@gmail.com"
      },
      changes: {
        title: "Alterações à Política de Privacidade",
        p1: "Podemos atualizar nossa Política de Privacidade periodicamente. Recomendamos que você revise esta página regularmente para estar ciente de quaisquer alterações."
      },
      contact: {
        title: "Entre em Contato",
        p1: "Se você tiver alguma dúvida sobre esta Política de Privacidade, entre em contato conosco:",
        email: "adm.artemi@gmail.com"
      }
    },
    es: {
      title: "Política de Privacidad",
      lastUpdated: "Última actualización: Enero de 2025",
      intro: "ARTEMI LTDA, responsable del Portal Espiritual, está comprometida con la protección de su privacidad. Esta Política de Privacidad explica cómo recopilamos, usamos y protegemos su información personal.",
      dataCollection: {
        title: "Recopilación de Datos",
        p1: "Recopilamos información cuando visita nuestro sitio web, interactúa con nuestro contenido o se registra en nuestra plataforma.",
        p2: "La información que podemos recopilar incluye:",
        items: [
          "Nombre y dirección de correo electrónico",
          "Información demográfica como ubicación e idioma",
          "Información del dispositivo y navegador",
          "Dirección IP y datos de uso del sitio"
        ]
      },
      dataUse: {
        title: "Uso de Datos",
        p1: "Utilizamos su información para:",
        items: [
          "Personalizar su experiencia y atender sus necesidades individuales",
          "Mejorar nuestro sitio web en base a los comentarios recibidos",
          "Enviar correos electrónicos periódicos con contenido espiritual o promocional",
          "Procesar transacciones y proporcionar los servicios solicitados"
        ]
      },
      dataSecurity: {
        title: "Seguridad de Datos",
        p1: "Implementamos una variedad de medidas de seguridad para mantener la protección de su información personal. Utilizamos cifrado avanzado para proteger la información sensible transmitida en línea y también protegemos su información fuera de línea."
      },
      cookies: {
        title: "Cookies",
        p1: "Utilizamos cookies para mejorar la experiencia del usuario. Las cookies son pequeños archivos que un sitio web transfiere al disco duro de su computadora a través del navegador web (si lo permite) que permite a los sitios web reconocer su navegador y recordar cierta información.",
        p2: "Para más detalles, consulte nuestra Política de Cookies."
      },
      thirdParty: {
        title: "Servicios de Terceros",
        p1: "Utilizamos servicios de terceros para análisis, publicidad y funcionalidades específicas. Estos servicios pueden recopilar información enviada por su navegador como parte de una solicitud de página web."
      },
      rights: {
        title: "Sus Derechos",
        p1: "Usted tiene derecho a:",
        items: [
          "Acceder a los datos personales que tenemos sobre usted",
          "Solicitar la corrección de datos inexactos",
          "Solicitar la eliminación de sus datos",
          "Oponerse al procesamiento de sus datos",
          "Solicitar la transferencia de sus datos"
        ],
        p2: "Para ejercer estos derechos, contáctenos a través del correo electrónico: adm.artemi@gmail.com"
      },
      changes: {
        title: "Cambios a la Política de Privacidad",
        p1: "Podemos actualizar nuestra Política de Privacidad periódicamente. Le recomendamos que revise esta página regularmente para estar al tanto de cualquier cambio."
      },
      contact: {
        title: "Contáctenos",
        p1: "Si tiene alguna pregunta sobre esta Política de Privacidad, contáctenos:",
        email: "adm.artemi@gmail.com"
      }
    },
    en: {
      title: "Privacy Policy",
      lastUpdated: "Last updated: January 2025",
      intro: "ARTEMI LTDA, responsible for the Spiritual Portal, is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and protect your personal information.",
      dataCollection: {
        title: "Data Collection",
        p1: "We collect information when you visit our website, interact with our content, or register on our platform.",
        p2: "The information we may collect includes:",
        items: [
          "Name and email address",
          "Demographic information such as location and language",
          "Device and browser information",
          "IP address and website usage data"
        ]
      },
      dataUse: {
        title: "Data Use",
        p1: "We use your information to:",
        items: [
          "Personalize your experience and meet your individual needs",
          "Improve our website based on feedback received",
          "Send periodic emails with spiritual or promotional content",
          "Process transactions and provide requested services"
        ]
      },
      dataSecurity: {
        title: "Data Security",
        p1: "We implement a variety of security measures to maintain the protection of your personal information. We use advanced encryption to protect sensitive information transmitted online and also protect your information offline."
      },
      cookies: {
        title: "Cookies",
        p1: "We use cookies to improve the user experience. Cookies are small files that a website transfers to your computer's hard drive through your web browser (if you allow) that enables websites to recognize your browser and remember certain information.",
        p2: "For more details, see our Cookie Policy."
      },
      thirdParty: {
        title: "Third-Party Services",
        p1: "We use third-party services for analytics, advertising, and specific functionalities. These services may collect information sent by your browser as part of a web page request."
      },
      rights: {
        title: "Your Rights",
        p1: "You have the right to:",
        items: [
          "Access the personal data we have about you",
          "Request correction of inaccurate data",
          "Request deletion of your data",
          "Object to the processing of your data",
          "Request transfer of your data"
        ],
        p2: "To exercise these rights, contact us via email: adm.artemi@gmail.com"
      },
      changes: {
        title: "Changes to Privacy Policy",
        p1: "We may update our Privacy Policy periodically. We recommend that you review this page regularly to be aware of any changes."
      },
      contact: {
        title: "Contact Us",
        p1: "If you have any questions about this Privacy Policy, contact us:",
        email: "adm.artemi@gmail.com"
      }
    },
    fr: {
      title: "Politique de Confidentialité",
      lastUpdated: "Dernière mise à jour : Janvier 2025",
      intro: "ARTEMI LTDA, responsable du Portal Espiritual, s'engage à protéger votre vie privée. Cette Politique de Confidentialité explique comment nous collectons, utilisons et protégeons vos informations personnelles.",
      dataCollection: {
        title: "Collecte de Données",
        p1: "Nous collectons des informations lorsque vous visitez notre site web, interagissez avec notre contenu ou vous inscrivez sur notre plateforme.",
        p2: "Les informations que nous pouvons collecter incluent :",
        items: [
          "Nom et adresse e-mail",
          "Informations démographiques telles que la localisation et la langue",
          "Informations sur l'appareil et le navigateur",
          "Adresse IP et données d'utilisation du site"
        ]
      },
      dataUse: {
        title: "Utilisation des Données",
        p1: "Nous utilisons vos informations pour :",
        items: [
          "Personnaliser votre expérience et répondre à vos besoins individuels",
          "Améliorer notre site web en fonction des commentaires reçus",
          "Envoyer des e-mails périodiques avec du contenu spirituel ou promotionnel",
          "Traiter les transactions et fournir les services demandés"
        ]
      },
      dataSecurity: {
        title: "Sécurité des Données",
        p1: "Nous mettons en œuvre une variété de mesures de sécurité pour maintenir la protection de vos informations personnelles. Nous utilisons un chiffrement avancé pour protéger les informations sensibles transmises en ligne et protégeons également vos informations hors ligne."
      },
      cookies: {
        title: "Cookies",
        p1: "Nous utilisons des cookies pour améliorer l'expérience utilisateur. Les cookies sont de petits fichiers qu'un site web transfère sur le disque dur de votre ordinateur via votre navigateur web (si vous l'autorisez) qui permettent aux sites web de reconnaître votre navigateur et de se souvenir de certaines informations.",
        p2: "Pour plus de détails, consultez notre Politique de Cookies."
      },
      thirdParty: {
        title: "Services Tiers",
        p1: "Nous utilisons des services tiers pour l'analyse, la publicité et des fonctionnalités spécifiques. Ces services peuvent collecter des informations envoyées par votre navigateur dans le cadre d'une demande de page web."
      },
      rights: {
        title: "Vos Droits",
        p1: "Vous avez le droit de :",
        items: [
          "Accéder aux données personnelles que nous avons sur vous",
          "Demander la correction de données inexactes",
          "Demander la suppression de vos données",
          "Vous opposer au traitement de vos données",
          "Demander le transfert de vos données"
        ],
        p2: "Pour exercer ces droits, contactez-nous par e-mail : adm.artemi@gmail.com"
      },
      changes: {
        title: "Modifications de la Politique de Confidentialité",
        p1: "Nous pouvons mettre à jour notre Politique de Confidentialité périodiquement. Nous vous recommandons de consulter cette page régulièrement pour être au courant de tout changement."
      },
      contact: {
        title: "Nous Contacter",
        p1: "Si vous avez des questions sur cette Politique de Confidentialité, contactez-nous :",
        email: "adm.artemi@gmail.com"
      }
    }
  };
  
  const t = translations[locale as keyof typeof translations] || translations.pt;
  
  return (
    <main style={styles.container}>
      <NavbarWithSuspense />
      
      <div style={styles.contentContainer}>
        <motion.div
          style={styles.policyContainer}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 style={styles.heading}>{t.title}</h1>
          
          <div style={styles.section}>
            <p style={styles.paragraph}>{t.intro}</p>
          </div>
          
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>{t.dataCollection.title}</h2>
            <p style={styles.paragraph}>{t.dataCollection.p1}</p>
            <p style={styles.paragraph}>{t.dataCollection.p2}</p>
            <ul style={styles.list}>
              {t.dataCollection.items.map((item, index) => (
                <li key={index} style={styles.listItem}>{item}</li>
              ))}
            </ul>
          </div>
          
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>{t.dataUse.title}</h2>
            <p style={styles.paragraph}>{t.dataUse.p1}</p>
            <ul style={styles.list}>
              {t.dataUse.items.map((item, index) => (
                <li key={index} style={styles.listItem}>{item}</li>
              ))}
            </ul>
          </div>
          
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>{t.dataSecurity.title}</h2>
            <p style={styles.paragraph}>{t.dataSecurity.p1}</p>
          </div>
          
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>{t.cookies.title}</h2>
            <p style={styles.paragraph}>{t.cookies.p1}</p>
            <p style={styles.paragraph}>{t.cookies.p2}</p>
          </div>
          
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>{t.thirdParty.title}</h2>
            <p style={styles.paragraph}>{t.thirdParty.p1}</p>
          </div>
          
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>{t.rights.title}</h2>
            <p style={styles.paragraph}>{t.rights.p1}</p>
            <ul style={styles.list}>
              {t.rights.items.map((item, index) => (
                <li key={index} style={styles.listItem}>{item}</li>
              ))}
            </ul>
            <p style={styles.paragraph}>{t.rights.p2}</p>
          </div>
          
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>{t.changes.title}</h2>
            <p style={styles.paragraph}>{t.changes.p1}</p>
          </div>
          
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>{t.contact.title}</h2>
            <p style={styles.paragraph}>{t.contact.p1}</p>
            <p style={styles.paragraph}>
              Email: <a href={`mailto:${t.contact.email}`} style={{background: 'linear-gradient(to right, #D4AF37, #FFD700, #D4AF37)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'}}>{t.contact.email}</a>
            </p>
          </div>
          
          <p style={styles.lastUpdated}>{t.lastUpdated}</p>
        </motion.div>
      </div>
      
      <FooterWithSuspense />
    </main>
  );
}