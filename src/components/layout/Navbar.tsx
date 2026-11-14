'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../lib/i18n';
import { UserRole, Language } from '../../lib/types';
import MobileNav from './MobileNav';
import {
  Bell,
  Coins,
  Shield,
  Eye,
  EyeOff,
  Globe,
  Sparkles,
  ChevronDown,
  CheckCircle2,
  GraduationCap,
  Briefcase,
  Heart,
  Building,
  Brain,
  ShieldAlert,
  Menu,
} from 'lucide-react';

export default function Navbar() {
  const {
    currentUser,
    role,
    setRole,
    lang,
    setLang,
    activeTab,
    setActiveTab,
    notifications,
    unreadNotificationsCount,
    markNotificationRead,
    toggleAnonymousMode,
  } = useApp();

  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);

  const t = translations;

  const roleMeta: Record<UserRole, { label: string; icon: React.ReactNode; color: string; activeBg: string }> = {
    student: {
      label: t.roles.student[lang],
      icon: <GraduationCap className="h-3.5 w-3.5" />,
      color: 'text-cyan-400',
      activeBg: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/40 shadow-sm',
    },
    investor: {
      label: t.roles.investor[lang],
      icon: <Briefcase className="h-3.5 w-3.5" />,
      color: 'text-amber-400',
      activeBg: 'bg-amber-500/15 text-amber-300 border-amber-500/40 shadow-sm',
    },
    parent: {
      label: t.roles.parent[lang],
      icon: <Heart className="h-3.5 w-3.5" />,
      color: 'text-emerald-400',
      activeBg: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40 shadow-sm',
    },
    sponsor: {
      label: t.roles.sponsor[lang],
      icon: <Building className="h-3.5 w-3.5" />,
      color: 'text-rose-400',
      activeBg: 'bg-rose-500/15 text-rose-300 border-rose-500/40 shadow-sm',
    },
    mentor: {
      label: t.roles.mentor[lang],
      icon: <Brain className="h-3.5 w-3.5" />,
      color: 'text-purple-400',
      activeBg: 'bg-purple-500/15 text-purple-300 border-purple-500/40 shadow-sm',
    },
    admin: {
      label: t.roles.admin[lang],
      icon: <ShieldAlert className="h-3.5 w-3.5" />,
      color: 'text-blue-400',
      activeBg: 'bg-blue-500/15 text-blue-300 border-blue-500/40 shadow-sm',
    },
  };

  return (
    <>
    <header className="sticky top-0 z-50 w-full border-b border-space-800/80 bg-space-950/95 backdrop-blur-lg">
      {/* Primary Top Bar */}
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Mobile menu + Brand Logo */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <button
            onClick={() => setShowMobileNav(true)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-space-700 bg-space-850/60 text-slate-300 transition-colors hover:border-space-600 hover:text-white active:bg-space-800 lg:hidden"
            aria-label="Открыть меню навигации"
          >
            <Menu className="h-5 w-5" />
          </button>

          <button 
            onClick={() => setActiveTab('dashboard')}
            className="flex items-center gap-2.5 text-left group transition-all min-w-0"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-600 shadow-sm group-hover:scale-105 transition-transform">
              <Sparkles className="h-4 w-4 text-space-950" />
            </div>
            <div className="hidden min-[400px]:block min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-extrabold tracking-tight text-white text-base whitespace-nowrap">AI STARTIFY</span>
                <span className="rounded-md bg-cyan-500/10 border border-cyan-500/30 px-1.5 py-0.5 text-[10px] font-bold text-cyan-400">
                  2.0
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium tracking-normal hidden sm:block">
                Startup Ecosystem & Mentorship
              </p>
            </div>
          </button>
        </div>

        {/* Right Actions Cluster */}
        <div className="flex items-center gap-2.5">
          
          {/* Quasar Wallet Pill */}
          <button
            onClick={() => setActiveTab('wallet')}
            className="flex h-10 items-center justify-center gap-2 rounded-xl border border-cyan-500/30 bg-cyan-950/30 px-2 sm:px-3 text-xs font-semibold text-cyan-300 transition-all hover:bg-cyan-900/40 hover:border-cyan-400 active:bg-cyan-900/60"
            title="Quasar Wallet"
            aria-label={`Quasar Wallet: ${currentUser.quasarBalance} Quasar`}
          >
            <Coins className="h-4 w-4 shrink-0 text-cyan-400" />
            <span className="hidden min-[360px]:inline font-mono font-bold text-white tracking-tight">{currentUser.quasarBalance.toLocaleString()}</span>
            <span className="hidden lg:inline text-[10px] text-cyan-400 font-bold uppercase">QUASAR</span>
          </button>

          {/* Anonymous Mode Toggle */}
          <button
            onClick={toggleAnonymousMode}
            className={`hidden md:flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-medium transition-all ${
              currentUser.isAnonymous
                ? 'border-purple-500/40 bg-purple-950/30 text-purple-300'
                : 'border-space-700 bg-space-850/60 text-slate-300 hover:text-white'
            }`}
            title={currentUser.isAnonymous ? 'Анонимный профиль активен' : 'Публичный профиль'}
          >
            {currentUser.isAnonymous ? (
              <>
                <EyeOff className="h-3.5 w-3.5 text-purple-400" />
                <span className="font-mono text-[11px] text-purple-200">{currentUser.anonymousAlias}</span>
              </>
            ) : (
              <>
                <Eye className="h-3.5 w-3.5 text-slate-400" />
                <span className="text-[11px] hidden sm:inline">Public</span>
              </>
            )}
          </button>

          {/* Language Switcher */}
          <div className="relative hidden md:block">
            <button
              onClick={() => {
                setShowLangMenu(!showLangMenu);
                setShowNotifMenu(false);
              }}
              className="flex items-center gap-1.5 rounded-xl border border-space-700 bg-space-850/60 px-2.5 py-1.5 text-xs font-semibold text-slate-300 hover:border-space-600 hover:text-white transition-all"
              aria-label="Сменить язык"
              aria-expanded={showLangMenu}
            >
              <Globe className="h-3.5 w-3.5 text-slate-400" />
              <span className="uppercase text-[11px]">{lang}</span>
            </button>

            {showLangMenu && (
              <div className="absolute right-0 mt-2 w-32 rounded-xl border border-space-700 bg-space-900 p-1.5 shadow-modal z-50 animate-scaleIn">
                {(['ru', 'kk', 'en'] as Language[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => {
                      setLang(l);
                      setShowLangMenu(false);
                    }}
                    className={`w-full text-left rounded-lg px-3 py-1.5 text-xs font-medium uppercase transition-colors ${
                      lang === l ? 'bg-cyan-500/20 text-cyan-400 font-bold' : 'text-slate-300 hover:bg-space-800'
                    }`}
                  >
                    {l === 'ru' ? 'Русский' : l === 'kk' ? 'Қазақша' : 'English'}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifMenu(!showNotifMenu);
                setShowLangMenu(false);
              }}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-space-700 bg-space-850/60 text-slate-300 hover:border-space-600 hover:text-white transition-all active:bg-space-800"
              aria-label="Уведомления"
              aria-expanded={showNotifMenu}
            >
              <Bell className="h-4 w-4" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-cyan-500 text-[10px] font-black text-space-950 shadow-sm">
                  {unreadNotificationsCount}
                </span>
              )}
            </button>

            {showNotifMenu && (
              <div className="fixed left-3 right-3 top-[4.5rem] w-auto rounded-2xl border border-space-700 bg-space-900 p-4 shadow-modal z-50 animate-fadeIn sm:absolute sm:left-auto sm:right-0 sm:top-full sm:mt-2 sm:w-96">
                <div className="flex items-center justify-between pb-3 border-b border-space-800">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    {t.common.notifications[lang]}
                  </span>
                  <span className="text-[11px] text-cyan-400 font-medium">
                    {unreadNotificationsCount} {lang === 'ru' ? 'новых' : lang === 'kk' ? 'жаңа' : 'new'}
                  </span>
                </div>

                <div className="max-h-72 overflow-y-auto overscroll-contain divide-y divide-space-800/60 py-1">
                  {notifications.length === 0 ? (
                    <div className="py-6 text-center text-xs text-slate-500">
                      {t.common.noNotifications[lang]}
                    </div>
                  ) : (
                    notifications.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => {
                          markNotificationRead(n.id);
                          if (n.actionUrl) {
                            if (n.actionUrl.includes('wallet')) setActiveTab('wallet');
                            if (n.actionUrl.includes('jams')) setActiveTab('jams');
                            if (n.actionUrl.includes('investor')) setActiveTab('investor-offers');
                          }
                          setShowNotifMenu(false);
                        }}
                        className={`p-3 transition-colors cursor-pointer rounded-xl my-1 ${
                          n.read ? 'bg-transparent hover:bg-space-800/40' : 'bg-cyan-950/20 hover:bg-cyan-950/40 border border-cyan-500/20'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-xs font-semibold text-white">{n.title}</p>
                          {!n.read && <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 mt-1 shrink-0" />}
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{n.message}</p>
                        <p className="text-[10px] text-slate-500 mt-1 font-mono">
                          {new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Mini */}
          <div className="flex items-center gap-2 pl-0 border-l-0 border-space-800 sm:pl-2 sm:border-l">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="h-8 w-8 rounded-xl object-cover ring-1 ring-space-700"
            />
            <div className="hidden lg:block text-left">
              <p className="text-xs font-semibold text-white leading-tight">
                {currentUser.isAnonymous ? currentUser.anonymousAlias : currentUser.name}
              </p>
              <p className="text-[10px] text-slate-400 font-mono">
                LVL {currentUser.level}
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* Sub-Header: 1-Click Role Switcher Bar */}
      <div className="border-t border-space-800/60 bg-space-900/60 px-4 sm:px-6 lg:px-8 py-2">
        <div className="mx-auto max-w-7xl flex items-center justify-between gap-3 overflow-x-auto no-scrollbar touch-scroll">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mr-1 hidden sm:inline">
              Роль:
            </span>
            {(['student', 'investor', 'parent', 'sponsor', 'mentor', 'admin'] as UserRole[]).map((r) => {
              const meta = roleMeta[r];
              const isActive = role === r;
              return (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-xl border px-3 py-2 text-xs font-semibold transition-all ${
                    isActive
                      ? meta.activeBg
                      : 'border-transparent text-slate-400 hover:text-white hover:bg-space-800/50 active:bg-space-800'
                  }`}
                >
                  <span className={isActive ? meta.color : 'text-slate-500'}>{meta.icon}</span>
                  <span>{meta.label}</span>
                </button>
              );
            })}
          </div>

          <div className="shrink-0 text-[11px] text-slate-500 font-medium hidden md:block">
            {role === 'student' && 'Режим основателя стартапа'}
            {role === 'investor' && 'Поиск проектов и отправка инвестиций'}
            {role === 'parent' && 'Кабинет родителя и согласия'}
            {role === 'sponsor' && 'Организация соревнований и гранты'}
            {role === 'mentor' && 'Курирование команд и код-ревью'}
            {role === 'admin' && 'Аудит платформы и смарт-эскроу'}
          </div>
        </div>
      </div>
    </header>

    <MobileNav open={showMobileNav} onClose={() => setShowMobileNav(false)} />
    </>
  );
}
