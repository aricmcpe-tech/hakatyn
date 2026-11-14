'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../lib/i18n';
import {
  LayoutDashboard,
  Rocket,
  Trophy,
  Gamepad2,
  Wallet,
  Bot,
  GitBranch,
  Users2,
  Medal,
  CalendarDays,
  Gift,
  Building2,
  HeartHandshake,
  ShieldCheck,
  Compass,
  FileCheck2,
  HandCoins,
  Scale,
  ChevronRight,
} from 'lucide-react';

export default function Sidebar() {
  const { role, activeTab, setActiveTab, lang, currentUser } = useApp();
  const t = translations;

  interface NavItem {
    id: string;
    label: string;
    icon: React.ReactNode;
    badge?: string;
  }

  const getNavItems = (): NavItem[] => {
    switch (role) {
      case 'investor':
        return [
          { id: 'investor-discovery', label: t.investor.title[lang], icon: <Compass className="h-4 w-4" /> },
          { id: 'investor-offers', label: t.investor.myOffers[lang], icon: <HandCoins className="h-4 w-4" /> },
          { id: 'jams', label: t.nav.jams[lang], icon: <Trophy className="h-4 w-4" /> },
          { id: 'leaderboard', label: t.nav.leaderboard[lang], icon: <Medal className="h-4 w-4" /> },
          { id: 'events', label: t.nav.events[lang], icon: <CalendarDays className="h-4 w-4" /> },
        ];

      case 'parent':
        return [
          { id: 'parent-portal', label: t.parent.studentProgress[lang], icon: <LayoutDashboard className="h-4 w-4" /> },
          { id: 'parent-rewards', label: t.parent.parentRewards[lang], icon: <Gift className="h-4 w-4" /> },
          { id: 'parent-consents', label: t.parent.pendingConsents[lang], icon: <FileCheck2 className="h-4 w-4" />, badge: '1' },
          { id: 'events', label: t.nav.events[lang], icon: <CalendarDays className="h-4 w-4" /> },
        ];

      case 'sponsor':
        return [
          { id: 'sponsor-portal', label: t.sponsor.title[lang], icon: <Building2 className="h-4 w-4" /> },
          { id: 'jams', label: 'Управление Джемами', icon: <Trophy className="h-4 w-4" /> },
          { id: 'resources', label: t.sponsor.sponsoredResources[lang], icon: <Gift className="h-4 w-4" /> },
          { id: 'events', label: t.nav.events[lang], icon: <CalendarDays className="h-4 w-4" /> },
        ];

      case 'mentor':
        return [
          { id: 'dashboard', label: t.nav.dashboard[lang], icon: <LayoutDashboard className="h-4 w-4" /> },
          { id: 'projects', label: t.nav.projects[lang], icon: <Rocket className="h-4 w-4" /> },
          { id: 'aimentor', label: t.nav.aimentor[lang], icon: <Bot className="h-4 w-4" /> },
          { id: 'clubs', label: t.nav.clubs[lang], icon: <Users2 className="h-4 w-4" /> },
          { id: 'jams', label: t.nav.jams[lang], icon: <Trophy className="h-4 w-4" /> },
        ];

      case 'admin':
        return [
          { id: 'dashboard', label: 'Аналитика платформы', icon: <LayoutDashboard className="h-4 w-4" /> },
          { id: 'projects', label: 'Реестр проектов', icon: <Rocket className="h-4 w-4" /> },
          { id: 'jams', label: 'Аудит эскроу-фондов', icon: <Scale className="h-4 w-4" /> },
          { id: 'wallet', label: 'Транзакции Quasar', icon: <Wallet className="h-4 w-4" /> },
          { id: 'leaderboard', label: t.nav.leaderboard[lang], icon: <Medal className="h-4 w-4" /> },
        ];

      case 'student':
      default:
        return [
          { id: 'dashboard', label: t.nav.dashboard[lang], icon: <LayoutDashboard className="h-4 w-4" /> },
          { id: 'projects', label: t.nav.projects[lang], icon: <Rocket className="h-4 w-4" /> },
          { id: 'jams', label: t.nav.jams[lang], icon: <Trophy className="h-4 w-4" />, badge: '500k ₸' },
          { id: 'battlepass', label: t.nav.battlepass[lang], icon: <Gamepad2 className="h-4 w-4" /> },
          { id: 'wallet', label: t.nav.wallet[lang], icon: <Wallet className="h-4 w-4" /> },
          { id: 'aimentor', label: t.nav.aimentor[lang], icon: <Bot className="h-4 w-4" />, badge: 'AI' },
          { id: 'github', label: t.nav.github[lang], icon: <GitBranch className="h-4 w-4" /> },
          { id: 'clubs', label: t.nav.clubs[lang], icon: <Users2 className="h-4 w-4" /> },
          { id: 'leaderboard', label: t.nav.leaderboard[lang], icon: <Medal className="h-4 w-4" /> },
          { id: 'events', label: t.nav.events[lang], icon: <CalendarDays className="h-4 w-4" /> },
          { id: 'resources', label: t.nav.rewards[lang], icon: <Gift className="h-4 w-4" /> },
        ];
    }
  };

  const navItems = getNavItems();

  return (
    <aside className="hidden lg:flex w-64 shrink-0 flex-col justify-between border-r border-space-800/80 bg-space-950 p-4">
      <div className="space-y-6">
        {/* Navigation Section */}
        <div>
          <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
            Навигация
          </p>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`group flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-space-850 text-white border border-space-700 shadow-sm'
                      : 'text-slate-400 hover:bg-space-900 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`${isActive ? 'text-cyan-400' : 'text-slate-500 group-hover:text-slate-300'}`}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="rounded-md bg-space-800 border border-space-700 px-1.5 py-0.5 text-[9px] font-bold text-cyan-400">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Season 01 Clean Progress Widget */}
      <div className="rounded-2xl border border-space-800 bg-space-900/60 p-4 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400" />
            <span className="font-bold text-white text-xs">Season 01</span>
          </div>
          <span className="font-mono text-[11px] font-bold text-cyan-400">Уровень {currentUser.level}/20</span>
        </div>

        <div className="h-1.5 w-full overflow-hidden rounded-full bg-space-800">
          <div
            className="h-full rounded-full bg-cyan-500 transition-all duration-300"
            style={{ width: `${(currentUser.level / 20) * 100}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
          <span className="font-mono">{currentUser.quasarBalance} Quasar</span>
          <button
            onClick={() => setActiveTab('battlepass')}
            className="text-cyan-400 font-semibold hover:underline flex items-center gap-0.5"
          >
            <span>Квесты</span>
            <ChevronRight className="h-3 w-3" />
          </button>
        </div>
      </div>
    </aside>
  );
}
