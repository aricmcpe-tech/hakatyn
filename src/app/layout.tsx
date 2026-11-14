import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Startify 2.0 — Startup Ecosystem, Investors & Gamification',
  description: 'Полноценная экосистема для школьников-основателей, инвесторов, менторов, родителей и спонсоров. Quasar Wallet, Battle Pass, Startup Jams и AI Mentor на базе NVIDIA NIM.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className="dark">
      <body className="antialiased bg-space-950 text-slate-100">{children}</body>
    </html>
  );
}
