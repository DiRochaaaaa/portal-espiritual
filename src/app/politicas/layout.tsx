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
  title: 'Políticas | Portal Espiritual',
  description: 'Políticas de privacidade, termos de uso e cookies do Portal Espiritual.',
};

export default function PoliticasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 