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
  title: 'Orações e Mantras | Portal Espiritual',
  description: 'Orações e mantras para elevação espiritual e conexão interior.',
};

export default function OracoesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 