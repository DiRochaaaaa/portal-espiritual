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
  title: 'Ritual Relâmpago de Manifestação | Portal Espiritual',
  description: 'Aprenda como praticar o Ritual Relâmpago de manifestação durante esta semana. Técnicas precisas para alinhar sua energia com o universo.',
};

export default function RitualRelampagoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 