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
  title: 'Mantras Sagrados do Monge Li Wei | Portal Espiritual',
  description: 'Práticas milenares para elevação espiritual e harmonia interior. Descubra os mantras sagrados do Monge Li Wei.',
};

export default function LiWeiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
