'use client';

import React, { useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { getNavItems } from '../../lib/navigation';
import { Language } from '../../lib/types';
import {
  X,
  Sparkles,
  Coins,
  Eye,
  EyeOff,
  Globe,
  ChevronRight,
} from 'lucide-react';

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function MobileNav({ open, onClose }: Props) {
  const {
    role,
    activeTab,
    setActiveTab,
    lang,
    setLang,
    currentUser,
    toggleAnonymousMode,
  } = useApp();

  const closeButtonRef = React.useRef<HTMLButtonElement>(null);

  // Lock body scroll, move focus into the drawer and close on Escape
  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  const navItems = getNavItems(role, lang);

  const handleNavigate = (id: string) => {
    setActiveTab(id);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[60] lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Меню навигации"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-space-950/70 backdrop-blur-sm animate-fadeIn"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div className="absolute inset-y-0 left-0 flex w-[86%] max-w-xs flex-col border-r border-space-800 bg-space-950 shadow-2xl animate-drawerIn">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-space-800/80 px-4 py-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-600 shadow-sm">
              <Sparkles className="h-4 w-4 text-space-950" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold tracking-tight text-white text-sm truncate">AI STARTIFY</span>
                <span className="rounded bg-cyan-500/10 border border-cyan-500/30 px-1 py-0.5 text-[9px] font-bold text-cyan-400">
                  2.0
                </span>
              </div>
              <p className="text-[10px] text-slate-400 truncate">Startup Ecosystem</p>
            </div>
          </div>

          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-space-800 text-slate-300 transition-colors hover:bg-space-900 hover:text-white"
            aria-label="Закрыть меню"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* User card */}
        <div className="mx-3 mt-3 flex items-center gap-3 rounded-2xl border border-space-800 bg-space-900/70 p-3">
          <img
            src={currentUser.avatar}
            alt=""
            aria-hidden="true"
            className="h-10 w-10 shrink-0 rounded-xl object-cover ring-1 ring-space-700"
          />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-white truncate">
              {currentUser.isAnonymous ? currentUser.anonymousAlias : currentUser.name}
            </p>
            <p className="text-[10px] text-slate-400 font-mono">LVL {currentUser.level}</p>
          </div>
          <div className="flex shrink-0 items-center gap-1 rounded-lg border border-cyan-500/30 bg-cyan-950/30 px-2 py-1">
            <Coins className="h-3 w-3 text-cyan-400" />
            <span className="text-[11px] font-mono font-bold text-cyan-300">
              {currentUser.quasarBalance.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto overscroll-contain px-3 py-3 no-scrollbar">
          <p className="px-3 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Навигация
          </p>
          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`group flex min-h-[44px] w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-space-850 text-white border border-space-700 shadow-sm'
                      : 'text-slate-400 border border-transparent hover:bg-space-900 hover:text-slate-200 active:bg-space-850'
                  }`}
                >
                  <span className="flex items-center gap-3 min-w-0">
                    <span className={`shrink-0 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`}>
                      {item.icon}
                    </span>
                    <span className="truncate text-left">{item.label}</span>
                  </span>
                  {item.badge ? (
                    <span className="ml-2 shrink-0 rounded-md bg-space-800 border border-space-700 px-1.5 py-0.5 text-[9px] font-bold text-cyan-400">
                      {item.badge}
                    </span>
                  ) : (
                    <ChevronRight className="ml-2 h-3.5 w-3.5 shrink-0 text-slate-600" />
                  )}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Preferences: language + anonymous mode */}
        <div className="border-t border-space-800/80 px-4 py-3 space-y-3">
          <div className="flex items-center justify-between gap-3">
            <span className="flex items-center gap-2 text-xs font-semibold text-slate-300">
              <Globe className="h-4 w-4 text-slate-400" />
              Язык
            </span>
            <div className="flex items-center gap-1 rounded-xl border border-space-800 bg-space-900 p-1">
              {(['ru', 'kk', 'en'] as Language[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  aria-pressed={lang === l}
                  className={`rounded-lg px-2.5 py-1.5 text-[11px] font-bold uppercase transition-colors ${
                    lang === l
                      ? 'bg-cyan-500 text-space-950'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={toggleAnonymousMode}
            aria-pressed={currentUser.isAnonymous}
            className="flex min-h-[44px] w-full items-center justify-between gap-3 rounded-xl border border-space-800 bg-space-900/60 px-3 py-2.5 transition-colors hover:bg-space-900"
          >
            <span className="flex items-center gap-2 text-xs font-semibold text-slate-300">
              {currentUser.isAnonymous ? (
                <EyeOff className="h-4 w-4 text-purple-400" />
              ) : (
                <Eye className="h-4 w-4 text-slate-400" />
              )}
              {currentUser.isAnonymous ? 'Анонимный профиль' : 'Публичный профиль'}
            </span>
            <span
              className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors ${
                currentUser.isAnonymous ? 'bg-purple-500' : 'bg-space-700'
              }`}
              aria-hidden="true"
            >
              <span
                className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                  currentUser.isAnonymous ? 'translate-x-[1.15rem]' : 'translate-x-0.5'
                }`}
              />
            </span>
          </button>
        </div>

        {/* Season progress */}
        <div className="border-t border-space-800/80 p-4 space-y-3">
          <div className="flex items-center justify-between text-xs gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <span className="flex h-2 w-2 shrink-0 rounded-full bg-cyan-400" />
              <span className="font-bold text-white text-xs truncate">Season 01</span>
            </div>
            <span className="font-mono text-[11px] font-bold text-cyan-400 shrink-0">
              Уровень {currentUser.level}/20
            </span>
          </div>

          <div className="h-1.5 w-full overflow-hidden rounded-full bg-space-800">
            <div
              className="h-full rounded-full bg-cyan-500 transition-all duration-300"
              style={{ width: `${(currentUser.level / 20) * 100}%` }}
            />
          </div>

          <button
            onClick={() => handleNavigate('battlepass')}
            className="flex min-h-[40px] w-full items-center justify-center gap-1 rounded-xl border border-space-800 bg-space-900/60 py-2 text-xs font-semibold text-cyan-400 transition-colors hover:bg-space-900"
          >
            <span>Открыть Battle Pass</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
