'use client';

import React from 'react';
import { translations } from './i18n';
import { Language, UserRole } from './types';
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
  Compass,
  FileCheck2,
  HandCoins,
  Scale,
} from 'lucide-react';

export interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: string;
}

/**
 * Single source of truth for role-based navigation.
 * Used by both the desktop Sidebar and the mobile drawer.
 */
export function getNavItems(role: UserRole, lang: Language): NavItem[] {
  const t = translations;

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
}
