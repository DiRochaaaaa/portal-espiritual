import { useCallback, useEffect, useState, CSSProperties } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { toggleLocale, getCurrentLocale, Locale } from '../lib/locale';
import { usePathname, useRouter } from 'next/navigation';

const styles: Record<string, CSSProperties> = {
  navbar: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    padding: '0.75rem 1rem',
    backgroundColor: 'rgba(21, 0, 34, 0.8)',
    backdropFilter: 'blur(8px)',
    borderBottom: '1px solid rgba(123, 31, 162, 0.3)',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
  },
  container: {
    maxWidth: '1280px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
  },
  logoText: {
    fontFamily: "'Playfair Display', serif",
    color: '#D4AF37',
    fontSize: '1.25rem',
    letterSpacing: '0.05em',
    textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
  },
  langButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
    color: 'rgba(255, 255, 255, 0.9)',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '0.25rem 0.5rem',
    fontSize: '0.875rem',
    transition: 'color 0.3s ease',
  },
  navActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  backButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: 'rgba(255, 255, 255, 0.9)',
    background: 'rgba(123, 31, 162, 0.2)',
    border: '1px solid rgba(123, 31, 162, 0.3)',
    borderRadius: '20px',
    cursor: 'pointer',
    padding: '0.4rem 0.8rem',
    fontSize: '0.875rem',
    transition: 'all 0.3s ease',
    textDecoration: 'none',
  },
  backButtonIcon: {
    fontSize: '1.1rem',
  },
  leftSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  menuButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '2.2rem',
    height: '2.2rem',
    borderRadius: '50%',
    background: 'rgba(123, 31, 162, 0.2)',
    border: '1px solid rgba(123, 31, 162, 0.3)',
    color: 'white',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  menuIcon: {
    fontSize: '1.25rem',
    transition: 'transform 0.3s ease',
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    right: '1rem',
    width: '240px',
    background: 'rgba(21, 0, 34, 0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
    border: '1px solid rgba(123, 31, 162, 0.4)',
    zIndex: 100,
    padding: '0.75rem 0',
    marginTop: '0.5rem',
  },
  menuItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.75rem 1.25rem',
    color: 'rgba(255, 255, 255, 0.9)',
    textDecoration: 'none',
    transition: 'all 0.2s ease',
    fontSize: '0.95rem',
  },
  menuItemIcon: {
    fontSize: '1.25rem',
    color: '#D4AF37',
  },
  activeMenuItem: {
    background: 'rgba(123, 31, 162, 0.3)',
    borderLeft: '3px solid #D4AF37',
  },
  breadcrumbs: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: '0.8rem',
    marginLeft: '1rem', 
  },
  breadcrumbItem: {
    textDecoration: 'none',
    color: 'rgba(255, 255, 255, 0.7)',
    transition: 'color 0.2s ease',
  },
  breadcrumbSeparator: {
    fontSize: '0.7rem',
  },
  breadcrumbCurrent: {
    color: '#D4AF37',
    fontWeight: 500,
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
    overflow: 'hidden',
  },
  scrollToTopIcon: {
    fontSize: '1.5rem',
  },
};

export default function NavbarEnhanced() {
  const [locale, setLocale] = useState<Locale>('pt');
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === '/';
  
  // Wait for client-side rendering to access cookies
  useEffect(() => {
    setMounted(true);
    setLocale(getCurrentLocale());
    
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleToggleLanguage = useCallback(() => {
    toggleLocale();
  }, []);
  
  const handleBack = useCallback(() => {
    router.back();
  }, [router]);
  
  const handleToggleMenu = useCallback(() => {
    setMenuOpen(prev => !prev);
  }, []);
  
  const handleClickMenuItem = useCallback(() => {
    setMenuOpen(false);
  }, []);
  
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  
  const getBreadcrumbsName = (path: string) => {
    switch (path) {
      case '/':
        return translations[locale].home;
      case '/oracoes':
        return translations[locale].prayers;
      case '/presente':
        return translations[locale].gift;
      case '/cancao':
        return translations[locale].song;
      case '/bonus':
        return translations[locale].bonus;
      default:
        return path.split('/').pop();
    }
  };
  
  const translations = {
    pt: {
      back: "Voltar",
      home: "Início",
      prayers: "Orações",
      gift: "Presente",
      song: "Canção",
      bonus: "Bônus",
      messages: "Mensagens",
      menu: "Menu",
      language: "Idioma",
      scrollToTop: "Voltar ao topo"
    },
    es: {
      back: "Volver",
      home: "Inicio",
      prayers: "Oraciones",
      gift: "Regalo",
      song: "Canción",
      bonus: "Bonos",
      messages: "Mensajes",
      menu: "Menú",
      language: "Idioma",
      scrollToTop: "Volver arriba"
    }
  };

  const t = translations[locale];
  
  const menuItems = [
    { path: '/', label: t.home, icon: '🏠' },
    { path: '/oracoes', label: t.prayers, icon: '📖' },
    { path: '/presente', label: t.gift, icon: '🎁' },
    { path: '/cancao', label: t.song, icon: '🎵' },
    { path: '/mensagens', label: t.messages, icon: '💭' },
    { path: '/bonus', label: t.bonus, icon: '✨' },
  ];
  
  if (!mounted) return null;
  
  // Generate breadcrumb items
  const pathSegments = pathname.split('/').filter(Boolean);
  const breadcrumbs = [
    { path: '/', label: t.home },
    ...pathSegments.map((segment, index) => {
      const path = `/${pathSegments.slice(0, index + 1).join('/')}`;
      return { path, label: getBreadcrumbsName(path) };
    }),
  ];
  
  return (
    <>
      <nav style={styles.navbar}>
        <div style={styles.container}>
          <div style={styles.leftSection}>
            {!isHomePage && (
              <motion.button
                style={styles.backButton}
                onClick={handleBack}
                whileHover={{ 
                  scale: 1.05, 
                  backgroundColor: 'rgba(123, 31, 162, 0.3)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)' 
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <span style={styles.backButtonIcon}>←</span>
                <span>{t.back}</span>
              </motion.button>
            )}
            <Link href="/" style={styles.logo}>
              <motion.span 
                style={styles.logoText}
                whileHover={{ 
                  color: '#F0D78C',
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.4)' 
                }}
              >
                Portal Espiritual
              </motion.span>
            </Link>
            
            {!isHomePage && breadcrumbs.length > 1 && (
              <div style={styles.breadcrumbs}>
                {breadcrumbs.map((crumb, i) => {
                  const isLast = i === breadcrumbs.length - 1;
                  
                  return (
                    <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
                      {i > 0 && (
                        <span style={styles.breadcrumbSeparator}>
                          {'>'}
                        </span>
                      )}
                      
                      {isLast ? (
                        <span style={styles.breadcrumbCurrent}>
                          {crumb.label}
                        </span>
                      ) : (
                        <Link 
                          href={crumb.path} 
                          style={styles.breadcrumbItem}
                        >
                          {crumb.label}
                        </Link>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          
          <div style={styles.navActions}>
            <motion.button
              style={styles.langButton}
              whileHover={{ scale: 1.05, color: '#D4AF37' }}
              whileTap={{ scale: 0.95 }}
              onClick={handleToggleLanguage}
            >
              <span>🌐</span>
              <span>{locale === 'pt' ? 'ES' : 'PT'}</span>
            </motion.button>
            
            <motion.button
              style={styles.menuButton}
              whileHover={{ 
                scale: 1.05, 
                backgroundColor: 'rgba(123, 31, 162, 0.4)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)' 
              }}
              whileTap={{ scale: 0.95 }}
              onClick={handleToggleMenu}
            >
              <motion.span 
                style={styles.menuIcon}
                animate={{ 
                  rotate: menuOpen ? 90 : 0,
                }}
              >
                {menuOpen ? '✕' : '☰'}
              </motion.span>
            </motion.button>
            
            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  style={styles.dropdown}
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  {menuItems.map((item) => {
                    const isActive = pathname === item.path;
                    
                    return (
                      <Link
                        key={item.path}
                        href={item.path}
                        onClick={handleClickMenuItem}
                        style={{
                          ...styles.menuItem,
                          ...(isActive ? styles.activeMenuItem : {})
                        }}
                      >
                        <span style={styles.menuItemIcon}>{item.icon}</span>
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </nav>
      
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
            <span style={styles.scrollToTopIcon}>↑</span>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}