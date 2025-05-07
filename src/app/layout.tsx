import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import LanguageProvider from '@/components/LanguageProvider';

// Configuração otimizada de fontes
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'sans-serif']
});

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  preload: true,
  fallback: ['Georgia', 'serif']
});

export const metadata: Metadata = {
  title: 'Portal Espiritual | Tarô dos Anjos',
  description: 'Descubra o Tarô dos Anjos e acesse conteúdos exclusivos no Portal Espiritual.',
  icons: {
    icon: '/favicon.ico',
  },
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#150022' },
    { media: '(prefers-color-scheme: light)', color: '#150022' }
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Remover classes VSCode que causam problemas de hidratação
                document.documentElement.classList.remove('vsc-initialized');
                if (document.body) {
                  document.body.classList.remove('vsc-initialized');
                }
              })();
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning className="bg-gradient-to-b from-darkBg via-purpleDark/50 to-darkBg text-white">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
} 