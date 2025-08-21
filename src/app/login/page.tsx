'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { getCurrentLocale, Locale } from '../../lib/locale';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [locale, setLocale] = useState<Locale>('pt');
  const [mounted, setMounted] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const detectedLocale = getCurrentLocale();
    
    // Se não conseguir detectar o idioma ou for o padrão, mostrar modal
    if (!detectedLocale || detectedLocale === 'pt') {
      const savedLanguage = localStorage.getItem('selectedLanguage');
      if (!savedLanguage) {
        setShowLanguageModal(true);
      } else {
        setLocale(savedLanguage as Locale);
      }
    } else {
      setLocale(detectedLocale);
    }
  }, []);

  const handleLanguageSelect = (selectedLocale: Locale) => {
    setLocale(selectedLocale);
    localStorage.setItem('selectedLanguage', selectedLocale);
    setShowLanguageModal(false);
  };

  const languages = [
    { code: 'pt' as Locale, name: 'Português', flag: '🇧🇷' },
    { code: 'es' as Locale, name: 'Español', flag: '🇪🇸' },
    { code: 'en' as Locale, name: 'English', flag: '🇺🇸' },
    { code: 'fr' as Locale, name: 'Français', flag: '🇫🇷' },
  ];

  const translations = {
    pt: {
      title: 'Portal Espiritual',
      subtitle: 'Acesse sua jornada de autoconhecimento',
      emailLabel: 'Email ou Usuário',
      emailPlaceholder: 'Digite seu email ou usuário',
      passwordLabel: 'Senha',
      passwordPlaceholder: 'Digite sua senha',
      loginButton: 'Entrar no Portal',
      connecting: 'Conectando...',
      helpText: 'Use o email da sua compra para acessar',
      contactText: 'Dúvidas? Entre em contato:',
       selectLanguage: 'Selecione seu idioma',
       languageModalTitle: 'Escolha seu idioma preferido',
       languageModalSubtitle: 'Selecione o idioma para uma melhor experiência',
     },
    es: {
      title: 'Portal Espiritual',
      subtitle: 'Accede a tu viaje de autoconocimiento',
      emailLabel: 'Email o Usuario',
      emailPlaceholder: 'Ingresa tu email o usuario',
      passwordLabel: 'Contraseña',
      passwordPlaceholder: 'Ingresa tu contraseña',
      loginButton: 'Entrar al Portal',
      connecting: 'Conectando...',
      helpText: 'Usa el email de tu compra para acceder',
      contactText: '¿Dudas? Contáctanos:',
       selectLanguage: 'Selecciona tu idioma',
       languageModalTitle: 'Elige tu idioma preferido',
       languageModalSubtitle: 'Selecciona el idioma para una mejor experiencia',
     },
    en: {
      title: 'Spiritual Portal',
      subtitle: 'Access your journey of self-discovery',
      emailLabel: 'Email or Username',
      emailPlaceholder: 'Enter your email or username',
      passwordLabel: 'Password',
      passwordPlaceholder: 'Enter your password',
      loginButton: 'Enter Portal',
      connecting: 'Connecting...',
      helpText: 'Use your purchase email to access',
      contactText: 'Questions? Contact us:',
       selectLanguage: 'Select your language',
       languageModalTitle: 'Choose your preferred language',
       languageModalSubtitle: 'Select the language for a better experience',
     },
    fr: {
      title: 'Portail Spirituel',
      subtitle: 'Accédez à votre voyage de découverte de soi',
      emailLabel: 'Email ou Nom d\'utilisateur',
      emailPlaceholder: 'Entrez votre email ou nom d\'utilisateur',
      passwordLabel: 'Mot de passe',
      passwordPlaceholder: 'Entrez votre mot de passe',
      loginButton: 'Entrer dans le Portail',
      connecting: 'Connexion...',
      helpText: 'Utilisez l\'email de votre achat pour accéder',
      contactText: 'Questions? Contactez-nous:',
       selectLanguage: 'Sélectionnez votre langue',
       languageModalTitle: 'Choisissez votre langue préférée',
       languageModalSubtitle: 'Sélectionnez la langue pour une meilleure expérience',
     },
  };

  const t = translations[locale];

  if (!mounted) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulação de loading para dar uma experiência mais realista
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Login fake - qualquer email/senha funciona
    if (email.trim() && password.trim()) {
      // Simular autenticação bem-sucedida
      localStorage.setItem('isAuthenticated', 'true');
      router.push('/'); // Redireciona para a página inicial
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Seletor de idiomas no topo */}
      <div className="absolute top-4 right-4 z-20">
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full p-2 border border-white/20">
          <span className="text-xs text-gray-300 px-2 hidden sm:block">{t.selectLanguage}:</span>
          {languages.map((lang) => (
            <motion.button
              key={lang.code}
              onClick={() => handleLanguageSelect(lang.code)}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-lg transition-all duration-300 ${
                locale === lang.code 
                  ? 'bg-goldAccent/20 ring-2 ring-goldAccent scale-110' 
                  : 'hover:bg-white/10 hover:scale-105'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              title={lang.name}
            >
              {lang.flag}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Container principal centralizado */}
      <div className="flex-1 flex items-center justify-center px-4">
        {/* Background com gradiente místico */}
        <div className="absolute inset-0 bg-gradient-to-br from-darkBg via-purpleDark/50 to-darkBg">
        {/* Efeito de partículas */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="star"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                '--duration': `${3 + Math.random() * 4}s`,
                '--delay': `${Math.random() * 2}s`,
              } as React.CSSProperties & Record<string, string>}
            />
          ))}
        </div>
      </div>

      {/* Formulário de login */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        <div className="app-card p-8">
          {/* Logo e título */}
          <div className="text-center mb-8">
            {/* Logo original do Portal Espiritual - Responsiva */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              whileHover={{ 
                scale: 1.05,
                textShadow: '0 4px 8px rgba(212, 175, 55, 0.6)' 
              }}
              className="mb-6"
            >
              <span 
                className="font-heading text-goldAccent flex items-center justify-center gap-2 px-2"
                style={{
                  fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
                  letterSpacing: '0.05em',
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
                }}
              >
                <span style={{ fontSize: 'clamp(1.8rem, 6vw, 2.8rem)' }}>✧</span>
                <span className="whitespace-nowrap text-center">{t.title}</span>
              </span>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-gray-300 text-sm px-4"
            >
              {t.subtitle}
            </motion.p>
          </div>

          {/* Formulário */}
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-2">
                {t.emailLabel}
              </label>
              <input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg 
                          focus:outline-none focus:ring-2 focus:ring-goldAccent focus:border-transparent
                          text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300"
                placeholder={t.emailPlaceholder}
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-2">
                {t.passwordLabel}
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg 
                          focus:outline-none focus:ring-2 focus:ring-goldAccent focus:border-transparent
                          text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300"
                placeholder={t.passwordPlaceholder}
                required
              />
            </div>

            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full app-button py-3 text-white font-semibold rounded-lg
                        disabled:opacity-50 disabled:cursor-not-allowed
                        relative overflow-hidden group"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  {t.connecting}
                </div>
              ) : (
                t.loginButton
              )}
                                    </motion.button>          </motion.form>          {/* Informações adicionais */}          <motion.div            initial={{ opacity: 0 }}            animate={{ opacity: 1 }}            transition={{ delay: 1, duration: 0.5 }}            className="mt-6 space-y-4"          >            {/* Instrução sobre email da compra */}            <div className="text-center p-3 bg-purpleMystic/10 border border-purpleMystic/30 rounded-lg">              <p className="text-gray-300 text-sm">
                💡 {t.helpText.split('email da sua compra').length > 1 ? (
                  <>
                    {t.helpText.split('email da sua compra')[0]}
                    <span className="text-goldAccent font-medium">
                      {locale === 'pt' ? 'email da sua compra' :
                       locale === 'es' ? 'email de tu compra' :
                       locale === 'en' ? 'purchase email' :
                       'email de votre achat'}
                    </span>
                    {t.helpText.split('email da sua compra')[1] || (locale === 'pt' ? ' para acessar' : locale === 'es' ? ' para acceder' : locale === 'en' ? ' to access' : ' pour accéder')}
                  </>
                ) : t.helpText}
              </p>
            </div>
            {/* Contato para dúvidas */}
            <div className="text-center">
              <p className="text-gray-400 text-xs mb-1">{t.contactText}</p>
              <a
                href="mailto:adm.artemi@gmail.com"
                className="text-goldAccent hover:text-yellow-300 text-sm transition-colors duration-300 underline decoration-goldAccent/50 hover:decoration-yellow-300"
              >
                adm.artemi@gmail.com
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>
      </div>

      {/* Modal de seleção de idioma */}
      {showLanguageModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-darkBg/95 to-purpleDark/90 backdrop-blur-xl rounded-2xl p-8 border border-white/20 max-w-md w-full"
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-goldAccent mb-2">
                {locale === 'pt' ? 'Escolha seu idioma preferido' :
                 locale === 'es' ? 'Elige tu idioma preferido' :
                 locale === 'en' ? 'Choose your preferred language' :
                 'Choisissez votre langue préférée'}
              </h2>
              <p className="text-gray-300 text-sm">
                {locale === 'pt' ? 'Selecione o idioma para uma melhor experiência' :
                 locale === 'es' ? 'Selecciona el idioma para una mejor experiencia' :
                 locale === 'en' ? 'Select the language for a better experience' :
                 'Sélectionnez la langue pour une meilleure expérience'}
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {languages.map((lang) => (
                <motion.button
                  key={lang.code}
                  onClick={() => handleLanguageSelect(lang.code)}
                  className="flex items-center gap-3 p-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 hover:border-goldAccent/50 transition-all duration-300 group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-2xl">{lang.flag}</span>
                  <span className="text-white group-hover:text-goldAccent transition-colors">
                    {lang.name}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}