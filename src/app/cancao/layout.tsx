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
  title: 'Canção Espiritual | Portal Espiritual',
  description: 'Música e canções para elevação espiritual e meditação.',
};

export default function CancaoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 