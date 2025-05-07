'use client';

import { useState, useEffect, CSSProperties } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
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

export default function TermsOfUsePage() {
  const [locale, setLocale] = useState<Locale>('pt');
  const [mounted, setMounted] = useState<boolean>(false);
  
  useEffect(() => {
    setMounted(true);
    setLocale(getCurrentLocale());
  }, []);
  
  if (!mounted) return null;
  
  const translations = {
    pt: {
      title: "Termos de Uso",
      lastUpdated: "Última atualização: Janeiro de 2025",
      intro: "Ao acessar o Portal Espiritual, operado pela ARTEMI LTDA, você concorda com estes Termos de Uso. Por favor, leia-os cuidadosamente.",
      definitions: {
        title: "Definições",
        items: [
          "\"Portal Espiritual\" ou \"site\" refere-se ao website disponível em portalespritual.com ou endereços relacionados.",
          "\"Usuário\", \"você\" ou \"seu\" refere-se a qualquer pessoa que acesse ou utilize nosso site.",
          "\"Nós\", \"nosso\" ou \"ARTEMI\" refere-se à ARTEMI LTDA, proprietária e operadora do Portal Espiritual."
        ]
      },
      acceptance: {
        title: "Aceitação dos Termos",
        p1: "Ao acessar ou usar nosso website, você confirma que leu, entendeu e concorda com estes Termos de Uso, bem como com nossa Política de Privacidade e Política de Cookies.",
        p2: "Se você não concordar com qualquer parte destes termos, solicitamos que não utilize nosso site."
      },
      accountTerms: {
        title: "Termos da Conta",
        p1: "Alguns recursos do Portal Espiritual podem exigir registro. Ao criar uma conta, você concorda em:",
        items: [
          "Fornecer informações precisas, atuais e completas",
          "Manter a confidencialidade de sua senha",
          "Ser inteiramente responsável por todas as atividades realizadas em sua conta",
          "Notificar-nos imediatamente sobre qualquer uso não autorizado de sua conta"
        ]
      },
      content: {
        title: "Conteúdo do Site",
        p1: "Nosso conteúdo inclui textos, gráficos, imagens, áudios, vídeos e material espiritual. Todo este conteúdo é de propriedade da ARTEMI LTDA ou de nossos parceiros, protegido por leis de direitos autorais e propriedade intelectual."
      },
      userConduct: {
        title: "Conduta do Usuário",
        p1: "Ao usar nosso site, você concorda em não:",
        items: [
          "Violar quaisquer leis ou regulamentos aplicáveis",
          "Infringir nossos direitos de propriedade intelectual ou de terceiros",
          "Transmitir material que seja ilegal, ofensivo, difamatório ou prejudicial",
          "Tentar interferir no funcionamento adequado do site",
          "Tentar acessar áreas restritas do site sem autorização",
          "Usar nosso site para distribuir publicidade não solicitada"
        ]
      },
      disclaimer: {
        title: "Isenções de Responsabilidade",
        p1: "O Portal Espiritual fornece conteúdo de natureza espiritual apenas para fins informativos e educacionais. Não oferecemos aconselhamento médico, psicológico, financeiro ou legal.",
        p2: "Nosso conteúdo espiritual não substitui o aconselhamento de profissionais qualificados em qualquer área. Sempre consulte profissionais adequados para questões específicas."
      },
      limitations: {
        title: "Limitações de Responsabilidade",
        p1: "A ARTEMI LTDA não será responsável por quaisquer danos diretos, indiretos, incidentais, consequenciais ou punitivos resultantes do seu acesso ou uso (ou incapacidade de acessar ou usar) do nosso site ou conteúdo."
      },
      changes: {
        title: "Alterações aos Termos",
        p1: "Reservamo-nos o direito de modificar estes Termos de Uso a qualquer momento. As alterações entram em vigor imediatamente após sua publicação no site.",
        p2: "É sua responsabilidade verificar periodicamente estes termos para se manter informado sobre quaisquer atualizações."
      },
      termination: {
        title: "Rescisão",
        p1: "Podemos encerrar ou suspender seu acesso ao nosso site imediatamente, sem aviso prévio, por qualquer violação destes Termos de Uso."
      },
      contact: {
        title: "Entre em Contato",
        p1: "Se você tiver alguma dúvida sobre estes Termos de Uso, entre em contato conosco:",
        email: "adm.artemi@gmail.com"
      }
    },
    es: {
      title: "Términos de Uso",
      lastUpdated: "Última actualización: Enero de 2025",
      intro: "Al acceder al Portal Espiritual, operado por ARTEMI LTDA, usted acepta estos Términos de Uso. Por favor, léalos cuidadosamente.",
      definitions: {
        title: "Definiciones",
        items: [
          "\"Portal Espiritual\" o \"sitio\" se refiere al sitio web disponible en portalespritual.com o direcciones relacionadas.",
          "\"Usuario\", \"usted\" o \"su\" se refiere a cualquier persona que acceda o utilice nuestro sitio.",
          "\"Nosotros\", \"nuestro\" o \"ARTEMI\" se refiere a ARTEMI LTDA, propietaria y operadora del Portal Espiritual."
        ]
      },
      acceptance: {
        title: "Aceptación de los Términos",
        p1: "Al acceder o utilizar nuestro sitio web, usted confirma que ha leído, entendido y aceptado estos Términos de Uso, así como nuestra Política de Privacidad y Política de Cookies.",
        p2: "Si no está de acuerdo con cualquier parte de estos términos, le solicitamos que no utilice nuestro sitio."
      },
      accountTerms: {
        title: "Términos de la Cuenta",
        p1: "Algunas características del Portal Espiritual pueden requerir registro. Al crear una cuenta, usted acepta:",
        items: [
          "Proporcionar información precisa, actual y completa",
          "Mantener la confidencialidad de su contraseña",
          "Ser completamente responsable de todas las actividades realizadas en su cuenta",
          "Notificarnos inmediatamente sobre cualquier uso no autorizado de su cuenta"
        ]
      },
      content: {
        title: "Contenido del Sitio",
        p1: "Nuestro contenido incluye textos, gráficos, imágenes, audios, videos y material espiritual. Todo este contenido es propiedad de ARTEMI LTDA o de nuestros socios, protegido por leyes de derechos de autor y propiedad intelectual."
      },
      userConduct: {
        title: "Conducta del Usuario",
        p1: "Al usar nuestro sitio, usted acepta no:",
        items: [
          "Violar cualquier ley o regulación aplicable",
          "Infringir nuestros derechos de propiedad intelectual o de terceros",
          "Transmitir material que sea ilegal, ofensivo, difamatorio o perjudicial",
          "Intentar interferir en el funcionamiento adecuado del sitio",
          "Intentar acceder a áreas restringidas del sitio sin autorización",
          "Usar nuestro sitio para distribuir publicidad no solicitada"
        ]
      },
      disclaimer: {
        title: "Exenciones de Responsabilidad",
        p1: "El Portal Espiritual proporciona contenido de naturaleza espiritual únicamente con fines informativos y educativos. No ofrecemos asesoramiento médico, psicológico, financiero o legal.",
        p2: "Nuestro contenido espiritual no sustituye el asesoramiento de profesionales calificados en cualquier área. Siempre consulte a profesionales adecuados para cuestiones específicas."
      },
      limitations: {
        title: "Limitaciones de Responsabilidad",
        p1: "ARTEMI LTDA no será responsable por cualquier daño directo, indirecto, incidental, consecuente o punitivo resultante de su acceso o uso (o incapacidad de acceder o usar) de nuestro sitio o contenido."
      },
      changes: {
        title: "Cambios a los Términos",
        p1: "Nos reservamos el derecho de modificar estos Términos de Uso en cualquier momento. Las modificaciones entran en vigor inmediatamente después de su publicación en el sitio.",
        p2: "Es su responsabilidad verificar periódicamente estos términos para mantenerse informado sobre cualquier actualización."
      },
      termination: {
        title: "Rescisión",
        p1: "Podemos terminar o suspender su acceso a nuestro sitio inmediatamente, sin previo aviso, por cualquier violación de estos Términos de Uso."
      },
      contact: {
        title: "Contáctenos",
        p1: "Si tiene alguna pregunta sobre estos Términos de Uso, contáctenos:",
        email: "adm.artemi@gmail.com"
      }
    }
  };
  
  const t = translations[locale];
  
  return (
    <main style={styles.container}>
      <Navbar />
      
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
            <h2 style={styles.sectionTitle}>{t.definitions.title}</h2>
            <ul style={styles.list}>
              {t.definitions.items.map((item, index) => (
                <li key={index} style={styles.listItem}>{item}</li>
              ))}
            </ul>
          </div>
          
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>{t.acceptance.title}</h2>
            <p style={styles.paragraph}>{t.acceptance.p1}</p>
            <p style={styles.paragraph}>{t.acceptance.p2}</p>
          </div>
          
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>{t.accountTerms.title}</h2>
            <p style={styles.paragraph}>{t.accountTerms.p1}</p>
            <ul style={styles.list}>
              {t.accountTerms.items.map((item, index) => (
                <li key={index} style={styles.listItem}>{item}</li>
              ))}
            </ul>
          </div>
          
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>{t.content.title}</h2>
            <p style={styles.paragraph}>{t.content.p1}</p>
          </div>
          
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>{t.userConduct.title}</h2>
            <p style={styles.paragraph}>{t.userConduct.p1}</p>
            <ul style={styles.list}>
              {t.userConduct.items.map((item, index) => (
                <li key={index} style={styles.listItem}>{item}</li>
              ))}
            </ul>
          </div>
          
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>{t.disclaimer.title}</h2>
            <p style={styles.paragraph}>{t.disclaimer.p1}</p>
            <p style={styles.paragraph}>{t.disclaimer.p2}</p>
          </div>
          
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>{t.limitations.title}</h2>
            <p style={styles.paragraph}>{t.limitations.p1}</p>
          </div>
          
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>{t.changes.title}</h2>
            <p style={styles.paragraph}>{t.changes.p1}</p>
            <p style={styles.paragraph}>{t.changes.p2}</p>
          </div>
          
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>{t.termination.title}</h2>
            <p style={styles.paragraph}>{t.termination.p1}</p>
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
      
      <Footer />
    </main>
  );
} 