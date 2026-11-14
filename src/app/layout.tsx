import './globals.css';
import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: 'AI Startify 2.0 — Startup Ecosystem, Investors & Gamification',
  description: 'Полноценная экосистема для школьников-основателей, инвесторов, менторов, родителей и спонсоров. Quasar Wallet, Battle Pass, Startup Jams и AI Mentor на базе NVIDIA NIM.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#070a13',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className="dark">
      <body className="antialiased bg-space-950 text-slate-100 font-sans">{children}</body>
    </html>
  );
}
