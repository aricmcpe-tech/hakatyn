'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import { getNavItems } from '../../lib/navigation';
import { ChevronRight } from 'lucide-react';

export default function Sidebar() {
  const { role, activeTab, setActiveTab, lang, currentUser } = useApp();

  const navItems = getNavItems(role, lang);

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
                  aria-current={isActive ? 'page' : undefined}
                  className={`group flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-space-850 text-white border border-space-700 shadow-sm'
                      : 'text-slate-400 border border-transparent hover:bg-space-900 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className={`shrink-0 ${isActive ? 'text-cyan-400' : 'text-slate-500 group-hover:text-slate-300'}`}>
                      {item.icon}
                    </span>
                    <span className="truncate text-left">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="ml-2 shrink-0 rounded-md bg-space-800 border border-space-700 px-1.5 py-0.5 text-[9px] font-bold text-cyan-400">
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
        <div className="flex items-center justify-between text-xs gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className="flex h-2 w-2 shrink-0 rounded-full bg-cyan-400" />
            <span className="font-bold text-white text-xs truncate">Season 01</span>
          </div>
          <span className="font-mono text-[11px] font-bold text-cyan-400 shrink-0">Уровень {currentUser.level}/20</span>
        </div>

        <div className="h-1.5 w-full overflow-hidden rounded-full bg-space-800">
          <div
            className="h-full rounded-full bg-cyan-500 transition-all duration-300"
            style={{ width: `${(currentUser.level / 20) * 100}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 gap-2">
          <span className="font-mono truncate">{currentUser.quasarBalance} Quasar</span>
          <button
            onClick={() => setActiveTab('battlepass')}
            className="shrink-0 text-cyan-400 font-semibold hover:underline flex items-center gap-0.5"
          >
            <span>Квесты</span>
            <ChevronRight className="h-3 w-3" />
          </button>
        </div>
      </div>
    </aside>
  );
}
