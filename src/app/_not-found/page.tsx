'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFoundPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-darkBg via-purpleDark to-darkBg text-white p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-lg"
      >
        <h1 className="text-4xl md:text-5xl font-playfair mb-6 bg-gradient-to-r from-gold to-gold via-goldLight bg-clip-text text-transparent">
          Página Não Encontrada
        </h1>
        
        <p className="text-lg mb-8 text-gray-300">
          A página que você procura parece ter sido movida para outro plano espiritual.
        </p>
        
        <Link 
          href="/"
          className="px-6 py-3 bg-purpleMedium/30 hover:bg-purpleMedium/50 rounded-lg border border-gold/30 transition-all duration-300 inline-flex items-center"
        >
          <span className="mr-2">←</span> Voltar ao início
        </Link>
      </motion.div>
    </main>
  );
} 