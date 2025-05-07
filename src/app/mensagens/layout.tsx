import type { Metadata, Viewport } from 'next';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#150022' },
    { media: '(prefers-color-scheme: light)', color: '#150022' }
  ],
};

export const metadata: Metadata = {
  title: 'Mensagens Espirituais | Portal Espiritual',
  description: 'Mensagens de reflexão e sabedoria para seu caminho espiritual.',
};

export default function MensagensLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 