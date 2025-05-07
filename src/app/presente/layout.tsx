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
  title: 'Presente Espiritual | Portal Espiritual',
  description: 'Receba seu presente espiritual especial para elevação da consciência.',
};

export default function PresenteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 