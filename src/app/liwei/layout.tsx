import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mantras Sagrados do Monge Li Wei | Portal Espiritual',
  description: 'Práticas milenares para elevação espiritual e harmonia interior. Descubra os mantras sagrados do Monge Li Wei.',
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#150022' },
    { media: '(prefers-color-scheme: light)', color: '#150022' }
  ],
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
};

export default function LiWeiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
