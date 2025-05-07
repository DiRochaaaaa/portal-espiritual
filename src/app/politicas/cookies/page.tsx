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

export default function CookiesPolicyPage() {
  const [locale, setLocale] = useState<Locale>('pt');
  const [mounted, setMounted] = useState<boolean>(false);
  
  useEffect(() => {
    setMounted(true);
    setLocale(getCurrentLocale());
  }, []);
  
  if (!mounted) return null;
  
  const translations = {
    pt: {
      title: "Política de Cookies",
      lastUpdated: "Última atualização: Janeiro de 2025",
      intro: "A ARTEMI LTDA utiliza cookies e tecnologias similares no Portal Espiritual para melhorar sua experiência. Esta política explica como e por que usamos essas tecnologias.",
      whatAreCookies: {
        title: "O que são Cookies",
        p1: "Cookies são pequenos arquivos de texto que são armazenados no seu dispositivo (computador, tablet ou celular) quando você visita um site. Eles permitem que o site reconheça seu dispositivo e lembre-se de determinadas informações sobre sua visita.",
        p2: "Os cookies são importantes porque ajudam a tornar sua experiência na web mais eficiente e relevante."
      },
      howWeUse: {
        title: "Como Utilizamos os Cookies",
        p1: "Usamos cookies para diversos fins, incluindo:",
        items: [
          "Possibilitar o funcionamento adequado do site (cookies essenciais)",
          "Lembrar suas preferências e configurações (cookies de funcionalidade)",
          "Analisar como você utiliza nosso site para que possamos melhorá-lo (cookies analíticos)",
          "Personalizar o conteúdo que você vê (cookies de personalização)",
          "Lembrar de suas configurações de idioma e região"
        ]
      },
      typesOfCookies: {
        title: "Tipos de Cookies que Utilizamos",
        items: [
          "Cookies de Sessão: Expiram quando você fecha o navegador e não coletam informações do seu dispositivo.",
          "Cookies Persistentes: Permanecem no seu dispositivo por um período determinado ou até serem excluídos manualmente.",
          "Cookies Próprios: Definidos por nós e usados para melhorar sua experiência em nosso site.",
          "Cookies de Terceiros: Definidos por nossos parceiros para permitir funcionalidades adicionais, como análise e publicidade."
        ]
      },
      specificCookies: {
        title: "Cookies Específicos",
        p1: "Alguns dos cookies específicos que utilizamos incluem:",
        items: [
          "Cookies de idioma: Lembram sua preferência de idioma",
          "Cookies de autenticação: Mantêm você conectado durante a sessão",
          "Cookies analíticos: Ajudam-nos a entender como os visitantes interagem com o site",
          "Cookies de preferências: Lembram de suas escolhas, como temas ou configurações"
        ]
      },
      thirdPartyCookies: {
        title: "Cookies de Terceiros",
        p1: "Também permitimos que terceiros definam cookies quando você visita nosso site. Esses terceiros incluem:",
        items: [
          "Serviços de análise (como Google Analytics)",
          "Plataformas de mídia social (para botões de compartilhamento)",
          "Parceiros de conteúdo (como YouTube para vídeos incorporados)"
        ],
        p2: "Esses terceiros podem usar cookies, web beacons e tecnologias similares para coletar ou receber informações do nosso website e de outros locais na internet para fornecer serviços de medição e direcionar anúncios."
      },
      controlCookies: {
        title: "Como Controlar os Cookies",
        p1: "Você pode controlar e gerenciar cookies de várias maneiras:",
        items: [
          "Configurações do navegador: Você pode configurar seu navegador para recusar todos os cookies ou indicar quando um cookie está sendo enviado.",
          "Ferramentas de preferência de cookies: Utilizamos um banner de consentimento que permite que você escolha quais tipos de cookies aceita.",
          "Links opt-out de terceiros: Muitos serviços de terceiros oferecem mecanismos de opt-out diretos."
        ],
        p2: "Por favor, observe que a recusa de cookies pode afetar a funcionalidade do nosso site. Ao desativar cookies, algumas partes do site podem não funcionar corretamente."
      },
      changes: {
        title: "Alterações à Política de Cookies",
        p1: "Podemos atualizar nossa Política de Cookies periodicamente. Recomendamos que você revise esta página regularmente para estar ciente de quaisquer alterações."
      },
      contact: {
        title: "Entre em Contato",
        p1: "Se você tiver alguma dúvida sobre esta Política de Cookies, entre em contato conosco:",
        email: "adm.artemi@gmail.com"
      }
    },
    es: {
      title: "Política de Cookies",
      lastUpdated: "Última actualización: Enero de 2025",
      intro: "ARTEMI LTDA utiliza cookies y tecnologías similares en el Portal Espiritual para mejorar su experiencia. Esta política explica cómo y por qué utilizamos estas tecnologías.",
      whatAreCookies: {
        title: "Qué son las Cookies",
        p1: "Las cookies son pequeños archivos de texto que se almacenan en su dispositivo (computadora, tableta o teléfono móvil) cuando visita un sitio web. Permiten que el sitio reconozca su dispositivo y recuerde cierta información sobre su visita.",
        p2: "Las cookies son importantes porque ayudan a hacer que su experiencia en la web sea más eficiente y relevante."
      },
      howWeUse: {
        title: "Cómo Utilizamos las Cookies",
        p1: "Utilizamos cookies para diversos fines, incluyendo:",
        items: [
          "Permitir el funcionamiento adecuado del sitio (cookies esenciales)",
          "Recordar sus preferencias y configuraciones (cookies de funcionalidad)",
          "Analizar cómo utiliza nuestro sitio para que podamos mejorarlo (cookies analíticas)",
          "Personalizar el contenido que ve (cookies de personalización)",
          "Recordar sus configuraciones de idioma y región"
        ]
      },
      typesOfCookies: {
        title: "Tipos de Cookies que Utilizamos",
        items: [
          "Cookies de Sesión: Expiran cuando cierra el navegador y no recopilan información de su dispositivo.",
          "Cookies Persistentes: Permanecen en su dispositivo por un período determinado o hasta que se eliminen manualmente.",
          "Cookies Propias: Definidas por nosotros y utilizadas para mejorar su experiencia en nuestro sitio.",
          "Cookies de Terceros: Definidas por nuestros socios para permitir funcionalidades adicionales, como análisis y publicidad."
        ]
      },
      specificCookies: {
        title: "Cookies Específicas",
        p1: "Algunas de las cookies específicas que utilizamos incluyen:",
        items: [
          "Cookies de idioma: Recuerdan su preferencia de idioma",
          "Cookies de autenticación: Lo mantienen conectado durante la sesión",
          "Cookies analíticas: Nos ayudan a entender cómo los visitantes interactúan con el sitio",
          "Cookies de preferencias: Recuerdan sus elecciones, como temas o configuraciones"
        ]
      },
      thirdPartyCookies: {
        title: "Cookies de Terceros",
        p1: "También permitimos que terceros definan cookies cuando visita nuestro sitio. Estos terceros incluyen:",
        items: [
          "Servicios de análisis (como Google Analytics)",
          "Plataformas de medios sociales (para botones de compartir)",
          "Socios de contenido (como YouTube para videos incorporados)"
        ],
        p2: "Estos terceros pueden usar cookies, balizas web y tecnologías similares para recopilar o recibir información de nuestro sitio web y de otros lugares en Internet para proporcionar servicios de medición y dirigir anuncios."
      },
      controlCookies: {
        title: "Cómo Controlar las Cookies",
        p1: "Puede controlar y gestionar las cookies de varias maneras:",
        items: [
          "Configuración del navegador: Puede configurar su navegador para rechazar todas las cookies o indicar cuándo se está enviando una cookie.",
          "Herramientas de preferencia de cookies: Utilizamos un banner de consentimiento que le permite elegir qué tipos de cookies acepta.",
          "Enlaces de exclusión de terceros: Muchos servicios de terceros ofrecen mecanismos de exclusión directos."
        ],
        p2: "Tenga en cuenta que rechazar las cookies puede afectar la funcionalidad de nuestro sitio. Al desactivar las cookies, algunas partes del sitio pueden no funcionar correctamente."
      },
      changes: {
        title: "Cambios a la Política de Cookies",
        p1: "Podemos actualizar nuestra Política de Cookies periódicamente. Le recomendamos que revise esta página regularmente para estar al tanto de cualquier cambio."
      },
      contact: {
        title: "Contáctenos",
        p1: "Si tiene alguna pregunta sobre esta Política de Cookies, contáctenos:",
        email: "adm.artemi@gmail.com"
      }
    }
  };
  
  const t = translations[locale];
  
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
            <h2 style={styles.sectionTitle}>{t.whatAreCookies.title}</h2>
            <p style={styles.paragraph}>{t.whatAreCookies.p1}</p>
            <p style={styles.paragraph}>{t.whatAreCookies.p2}</p>
          </div>
          
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>{t.howWeUse.title}</h2>
            <p style={styles.paragraph}>{t.howWeUse.p1}</p>
            <ul style={styles.list}>
              {t.howWeUse.items.map((item, index) => (
                <li key={index} style={styles.listItem}>{item}</li>
              ))}
            </ul>
          </div>
          
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>{t.typesOfCookies.title}</h2>
            <ul style={styles.list}>
              {t.typesOfCookies.items.map((item, index) => (
                <li key={index} style={styles.listItem}>{item}</li>
              ))}
            </ul>
          </div>
          
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>{t.specificCookies.title}</h2>
            <p style={styles.paragraph}>{t.specificCookies.p1}</p>
            <ul style={styles.list}>
              {t.specificCookies.items.map((item, index) => (
                <li key={index} style={styles.listItem}>{item}</li>
              ))}
            </ul>
          </div>
          
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>{t.thirdPartyCookies.title}</h2>
            <p style={styles.paragraph}>{t.thirdPartyCookies.p1}</p>
            <ul style={styles.list}>
              {t.thirdPartyCookies.items.map((item, index) => (
                <li key={index} style={styles.listItem}>{item}</li>
              ))}
            </ul>
            <p style={styles.paragraph}>{t.thirdPartyCookies.p2}</p>
          </div>
          
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>{t.controlCookies.title}</h2>
            <p style={styles.paragraph}>{t.controlCookies.p1}</p>
            <ul style={styles.list}>
              {t.controlCookies.items.map((item, index) => (
                <li key={index} style={styles.listItem}>{item}</li>
              ))}
            </ul>
            <p style={styles.paragraph}>{t.controlCookies.p2}</p>
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