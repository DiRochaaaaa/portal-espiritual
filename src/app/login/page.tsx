'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

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
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
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
                <span className="whitespace-nowrap text-center">Portal Espiritual</span>
              </span>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-gray-300 text-sm px-4"
            >
              Acesse sua jornada de autoconhecimento
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
                Email ou Usuário
              </label>
              <input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg 
                          focus:outline-none focus:ring-2 focus:ring-goldAccent focus:border-transparent
                          text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300"
                placeholder="Digite seu email ou usuário"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-2">
                Senha
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg 
                          focus:outline-none focus:ring-2 focus:ring-goldAccent focus:border-transparent
                          text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300"
                placeholder="Digite sua senha"
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
                  Conectando...
                </div>
              ) : (
                'Entrar no Portal'
              )}
                                    </motion.button>          </motion.form>          {/* Informações adicionais */}          <motion.div            initial={{ opacity: 0 }}            animate={{ opacity: 1 }}            transition={{ delay: 1, duration: 0.5 }}            className="mt-6 space-y-4"          >            {/* Instrução sobre email da compra */}            <div className="text-center p-3 bg-purpleMystic/10 border border-purpleMystic/30 rounded-lg">              <p className="text-gray-300 text-sm">                💡 Use o <span className="text-goldAccent font-medium">email da sua compra</span> para acessar              </p>            </div>            {/* Contato para dúvidas */}            <div className="text-center">              <p className="text-gray-400 text-xs mb-1">Dúvidas? Entre em contato:</p>              <a                 href="mailto:adm.artemi@gmail.com"                 className="text-goldAccent hover:text-yellow-300 text-sm transition-colors duration-300 underline decoration-goldAccent/50 hover:decoration-yellow-300"              >                adm.artemi@gmail.com              </a>            </div>          </motion.div>        </div>      </motion.div>    </div>  );}