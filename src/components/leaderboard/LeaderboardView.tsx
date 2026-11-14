'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../lib/i18n';
import {
  Medal,
  Eye,
  EyeOff,
  Coins,
  Flame,
  Award,
  Shield,
  Trophy,
} from 'lucide-react';

export default function LeaderboardView() {
  const { currentUser, db, lang, toggleAnonymousMode } = useApp();
  const t = translations;

  const [filterType, setFilterType] = useState<'global' | 'weekly' | 'season' | 'teams'>('global');

  // Sorted users
  const sortedStudents = [...db.users]
    .filter((u) => u.role === 'student' || u.role === 'mentor')
    .sort((a, b) => b.quasarBalance - a.quasarBalance);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-r from-space-900 via-space-850 to-indigo-950/40 p-6 sm:p-8 shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-400 border border-cyan-500/20">
              <Medal className="h-3.5 w-3.5" />
              ECOSYSTEM RANKINGS & PRIVACY
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              {t.leaderboard.title[lang]}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              {t.leaderboard.subtitle[lang]}
            </p>
          </div>

          {/* Anonymous Mode Switcher Card */}
          <div className="rounded-2xl border border-space-700 bg-space-850 p-4 shrink-0 shadow-lg space-y-2">
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs font-semibold text-slate-300">
                {t.leaderboard.anonymousToggleLabel[lang]}
              </span>
              <button
                onClick={toggleAnonymousMode}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  currentUser.isAnonymous ? 'bg-cyan-500' : 'bg-space-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    currentUser.isAnonymous ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            <p className="text-[10px] text-slate-400 font-mono">
              В рейтинге вы: <strong className="text-cyan-400">{currentUser.isAnonymous ? currentUser.anonymousAlias : currentUser.name}</strong>
            </p>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="rounded-3xl border border-space-700 bg-space-900/90 p-4 shadow-xl flex items-center gap-2 overflow-x-auto no-scrollbar touch-scroll">
        <button
          onClick={() => setFilterType('global')}
          className={`shrink-0 whitespace-nowrap rounded-xl px-4 py-2 text-xs font-bold transition-all ${
            filterType === 'global'
              ? 'bg-cyan-500 text-space-950 shadow-quasar-sm'
              : 'text-slate-400 hover:text-white hover:bg-space-800'
          }`}
        >
          {t.leaderboard.global[lang]}
        </button>
        <button
          onClick={() => setFilterType('weekly')}
          className={`shrink-0 whitespace-nowrap rounded-xl px-4 py-2 text-xs font-bold transition-all ${
            filterType === 'weekly'
              ? 'bg-cyan-500 text-space-950 shadow-quasar-sm'
              : 'text-slate-400 hover:text-white hover:bg-space-800'
          }`}
        >
          {t.leaderboard.weekly[lang]}
        </button>
        <button
          onClick={() => setFilterType('season')}
          className={`shrink-0 whitespace-nowrap rounded-xl px-4 py-2 text-xs font-bold transition-all ${
            filterType === 'season'
              ? 'bg-cyan-500 text-space-950 shadow-quasar-sm'
              : 'text-slate-400 hover:text-white hover:bg-space-800'
          }`}
        >
          {t.leaderboard.season[lang]}
        </button>
        <button
          onClick={() => setFilterType('teams')}
          className={`shrink-0 whitespace-nowrap rounded-xl px-4 py-2 text-xs font-bold transition-all ${
            filterType === 'teams'
              ? 'bg-cyan-500 text-space-950 shadow-quasar-sm'
              : 'text-slate-400 hover:text-white hover:bg-space-800'
          }`}
        >
          {t.leaderboard.teams[lang]}
        </button>
      </div>

      {/* Leaderboard Table */}
      <div className="rounded-3xl border border-space-700 bg-space-900/90 shadow-xl overflow-hidden">
        <div className="overflow-x-auto no-scrollbar">
        <table className="w-full min-w-[680px] text-left text-xs">
          <thead>
            <tr className="border-b border-space-800 bg-space-950/60 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              <th className="py-4 px-6">{t.leaderboard.rank[lang]}</th>
              <th className="py-4 px-6">{t.leaderboard.user[lang]}</th>
              <th className="py-4 px-6">{t.common.level[lang]}</th>
              <th className="py-4 px-6">Достижения</th>
              <th className="py-4 px-6 text-right">{t.leaderboard.score[lang]}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-space-800">
            {sortedStudents.map((u, idx) => {
              const isCurrentUser = u.id === currentUser.id;
              const isAnon = u.isAnonymous || (isCurrentUser && currentUser.isAnonymous);
              const displayName = isAnon ? u.anonymousAlias : u.name;

              return (
                <tr
                  key={u.id}
                  className={`transition-colors ${
                    isCurrentUser ? 'bg-cyan-950/30 border-l-4 border-l-cyan-400' : 'hover:bg-space-850/40'
                  }`}
                >
                  <td className="py-4 px-6 font-mono font-bold">
                    {idx === 0 ? (
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400 font-extrabold text-xs shadow-md border border-amber-500/30 gap-1">
                        <Trophy className="h-3.5 w-3.5" /> 1
                      </span>
                    ) : idx === 1 ? (
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-xl bg-slate-400/20 text-slate-200 font-extrabold text-xs border border-slate-400/30 gap-1">
                        <Medal className="h-3.5 w-3.5" /> 2
                      </span>
                    ) : idx === 2 ? (
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-xl bg-amber-700/20 text-amber-500 font-extrabold text-xs border border-amber-700/30 gap-1">
                        <Award className="h-3.5 w-3.5" /> 3
                      </span>
                    ) : (
                      <span className="text-slate-500 pl-2">#{idx + 1}</span>
                    )}
                  </td>

                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      {isAnon ? (
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-950/80 border border-purple-500/40 text-purple-300">
                          <Shield className="h-4 w-4" />
                        </div>
                      ) : (
                        <img
                          src={u.avatar}
                          alt={u.name}
                          className="h-9 w-9 rounded-xl object-cover ring-1 ring-cyan-500/30"
                        />
                      )}
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-sm">{displayName}</span>
                          {isAnon && (
                            <span className="rounded bg-purple-500/20 px-1.5 py-0.5 text-[9px] font-mono text-purple-300">
                              ANONYMOUS
                            </span>
                          )}
                          {isCurrentUser && (
                            <span className="rounded bg-cyan-500/20 px-1.5 py-0.5 text-[9px] font-bold text-cyan-300">
                              ВЫ
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400">
                          {isAnon ? 'Школа скрыта приватностью' : u.school || u.bio}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-6 font-mono font-bold text-slate-300">
                    LVL {u.level}
                  </td>

                  <td className="py-4 px-6">
                    <div className="flex flex-wrap gap-1">
                      {u.badges.map((b) => (
                        <span
                          key={b}
                          className="rounded-lg bg-space-800 px-2 py-0.5 text-[10px] font-semibold text-cyan-300 border border-space-700"
                        >
                          {b}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="py-4 px-6 text-right font-mono font-black text-cyan-400 text-sm">
                    <span className="inline-flex items-center gap-1.5">
                      {u.quasarBalance.toLocaleString()}
                      <Coins className="h-3.5 w-3.5 text-cyan-400 inline" />
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}
