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
    },
    en: {
      title: "Terms of Use",
      lastUpdated: "Last updated: January 2025",
      intro: "By accessing the Spiritual Portal, operated by ARTEMI LTDA, you agree to these Terms of Use. Please read them carefully.",
      definitions: {
        title: "Definitions",
        items: [
          "\"Spiritual Portal\" or \"site\" refers to the website available at portalespritual.com or related addresses.",
          "\"User\", \"you\" or \"your\" refers to any person who accesses or uses our site.",
          "\"We\", \"our\" or \"ARTEMI\" refers to ARTEMI LTDA, owner and operator of the Spiritual Portal."
        ]
      },
      acceptance: {
        title: "Acceptance of Terms",
        p1: "By accessing or using our website, you confirm that you have read, understood and agreed to these Terms of Use, as well as our Privacy Policy and Cookie Policy.",
        p2: "If you do not agree with any part of these terms, we ask that you do not use our site."
      },
      accountTerms: {
        title: "Account Terms",
        p1: "Some features of the Spiritual Portal may require registration. By creating an account, you agree to:",
        items: [
          "Provide accurate, current and complete information",
          "Maintain the confidentiality of your password",
          "Be entirely responsible for all activities performed on your account",
          "Notify us immediately of any unauthorized use of your account"
        ]
      },
      content: {
        title: "Site Content",
        p1: "Our content includes texts, graphics, images, audios, videos and spiritual material. All this content is owned by ARTEMI LTDA or our partners, protected by copyright and intellectual property laws."
      },
      userConduct: {
        title: "User Conduct",
        p1: "By using our site, you agree not to:",
        items: [
          "Violate any applicable laws or regulations",
          "Infringe our intellectual property rights or those of third parties",
          "Transmit material that is illegal, offensive, defamatory or harmful",
          "Attempt to interfere with the proper functioning of the site",
          "Attempt to access restricted areas of the site without authorization",
          "Use our site to distribute unsolicited advertising"
        ]
      },
      disclaimer: {
        title: "Disclaimers",
        p1: "The Spiritual Portal provides content of a spiritual nature for informational and educational purposes only. We do not offer medical, psychological, financial or legal advice.",
        p2: "Our spiritual content does not replace the advice of qualified professionals in any area. Always consult appropriate professionals for specific issues."
      },
      limitations: {
        title: "Limitations of Liability",
        p1: "ARTEMI LTDA will not be liable for any direct, indirect, incidental, consequential or punitive damages resulting from your access or use (or inability to access or use) of our site or content."
      },
      changes: {
        title: "Changes to Terms",
        p1: "We reserve the right to modify these Terms of Use at any time. Changes take effect immediately upon posting on the site.",
        p2: "It is your responsibility to periodically check these terms to stay informed about any updates."
      },
      termination: {
        title: "Termination",
        p1: "We may terminate or suspend your access to our site immediately, without prior notice, for any violation of these Terms of Use."
      },
      contact: {
        title: "Contact Us",
        p1: "If you have any questions about these Terms of Use, contact us:",
        email: "adm.artemi@gmail.com"
      }
    },
    fr: {
      title: "Conditions d'Utilisation",
      lastUpdated: "Dernière mise à jour : Janvier 2025",
      intro: "En accédant au Portal Espiritual, exploité par ARTEMI LTDA, vous acceptez ces Conditions d'Utilisation. Veuillez les lire attentivement.",
      definitions: {
        title: "Définitions",
        items: [
          "\"Portal Espiritual\" ou \"site\" fait référence au site web disponible sur portalespritual.com ou adresses connexes.",
          "\"Utilisateur\", \"vous\" ou \"votre\" fait référence à toute personne qui accède ou utilise notre site.",
          "\"Nous\", \"notre\" ou \"ARTEMI\" fait référence à ARTEMI LTDA, propriétaire et exploitant du Portal Espiritual."
        ]
      },
      acceptance: {
        title: "Acceptation des Conditions",
        p1: "En accédant ou en utilisant notre site web, vous confirmez que vous avez lu, compris et accepté ces Conditions d'Utilisation, ainsi que notre Politique de Confidentialité et Politique de Cookies.",
        p2: "Si vous n'êtes pas d'accord avec une partie de ces conditions, nous vous demandons de ne pas utiliser notre site."
      },
      accountTerms: {
        title: "Conditions de Compte",
        p1: "Certaines fonctionnalités du Portal Espiritual peuvent nécessiter une inscription. En créant un compte, vous acceptez de :",
        items: [
          "Fournir des informations précises, actuelles et complètes",
          "Maintenir la confidentialité de votre mot de passe",
          "Être entièrement responsable de toutes les activités effectuées sur votre compte",
          "Nous notifier immédiatement de toute utilisation non autorisée de votre compte"
        ]
      },
      content: {
        title: "Contenu du Site",
        p1: "Notre contenu comprend des textes, graphiques, images, audios, vidéos et matériel spirituel. Tout ce contenu appartient à ARTEMI LTDA ou à nos partenaires, protégé par les lois sur les droits d'auteur et la propriété intellectuelle."
      },
      userConduct: {
        title: "Conduite de l'Utilisateur",
        p1: "En utilisant notre site, vous acceptez de ne pas :",
        items: [
          "Violer toute loi ou réglementation applicable",
          "Enfreindre nos droits de propriété intellectuelle ou ceux de tiers",
          "Transmettre du matériel illégal, offensant, diffamatoire ou nuisible",
          "Tenter d'interférer avec le bon fonctionnement du site",
          "Tenter d'accéder à des zones restreintes du site sans autorisation",
          "Utiliser notre site pour distribuer de la publicité non sollicitée"
        ]
      },
      disclaimer: {
        title: "Avis de Non-Responsabilité",
        p1: "Le Portal Espiritual fournit du contenu de nature spirituelle à des fins informatives et éducatives uniquement. Nous n'offrons pas de conseils médicaux, psychologiques, financiers ou juridiques.",
        p2: "Notre contenu spirituel ne remplace pas les conseils de professionnels qualifiés dans quelque domaine que ce soit. Consultez toujours des professionnels appropriés pour des questions spécifiques."
      },
      limitations: {
        title: "Limitations de Responsabilité",
        p1: "ARTEMI LTDA ne sera pas responsable de tout dommage direct, indirect, accessoire, consécutif ou punitif résultant de votre accès ou utilisation (ou incapacité d'accéder ou d'utiliser) de notre site ou contenu."
      },
      changes: {
        title: "Modifications des Conditions",
        p1: "Nous nous réservons le droit de modifier ces Conditions d'Utilisation à tout moment. Les modifications prennent effet immédiatement après leur publication sur le site.",
        p2: "Il est de votre responsabilité de vérifier périodiquement ces conditions pour rester informé de toute mise à jour."
      },
      termination: {
        title: "Résiliation",
        p1: "Nous pouvons résilier ou suspendre votre accès à notre site immédiatement, sans préavis, pour toute violation de ces Conditions d'Utilisation."
      },
      contact: {
        title: "Nous Contacter",
        p1: "Si vous avez des questions sur ces Conditions d'Utilisation, contactez-nous :",
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
      
      <FooterWithSuspense />
    </main>
  );
}