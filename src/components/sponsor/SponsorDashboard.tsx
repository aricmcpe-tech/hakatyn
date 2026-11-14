'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../lib/i18n';
import {
  Building2,
  Trophy,
  Gift,
  CheckCircle2,
  ShieldCheck,
  Plus,
  Rocket,
  Users,
  Coins,
  ExternalLink,
} from 'lucide-react';

export default function SponsorDashboard() {
  const { db, lang, currentUser, setActiveTab } = useApp();
  const t = translations;

  const orgJams = db.jams.filter((j) => j.organizerType === 'sponsor' || j.organizerId === currentUser.id);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-rose-500/20 bg-gradient-to-r from-space-900 via-rose-950/30 to-space-950 p-6 sm:p-8 shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/10 px-3 py-1 text-xs font-semibold text-rose-400 border border-rose-500/20">
              <ShieldCheck className="h-3.5 w-3.5" />
              {t.sponsor.verifiedPartnerBadge[lang]}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              {currentUser.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              {t.sponsor.subtitle[lang]}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveTab('jams')}
              className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-rose-500 to-indigo-600 px-5 py-3 text-xs sm:text-sm font-bold text-white shadow-lg hover:opacity-95"
            >
              <Plus className="h-4 w-4" />
              {t.sponsor.createJamBtn[lang]}
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-space-700 bg-space-900/90 p-4">
          <span className="text-xs font-semibold text-slate-400 block">Выделено грантов и фондов</span>
          <span className="text-2xl font-bold font-mono text-amber-400 mt-1 block">1 500 000 ₸</span>
          <span className="text-[11px] text-slate-500">В смарт-эскроу джемов</span>
        </div>

        <div className="rounded-2xl border border-space-700 bg-space-900/90 p-4">
          <span className="text-xs font-semibold text-slate-400 block">Организовано соревнований</span>
          <span className="text-2xl font-bold font-mono text-white mt-1 block">2 Jams</span>
          <span className="text-[11px] text-slate-500">GreenTech & Smart KZ Jam</span>
        </div>

        <div className="rounded-2xl border border-space-700 bg-space-900/90 p-4">
          <span className="text-xs font-semibold text-slate-400 block">Школьников охвачено</span>
          <span className="text-2xl font-bold font-mono text-cyan-400 mt-1 block">420+</span>
          <span className="text-[11px] text-slate-500">В командах и сообществах</span>
        </div>

        <div className="rounded-2xl border border-space-700 bg-space-900/90 p-4">
          <span className="text-xs font-semibold text-slate-400 block">Партнёрских ресурсов</span>
          <span className="text-2xl font-bold font-mono text-purple-400 mt-1 block">4 пакета</span>
          <span className="text-[11px] text-slate-500">GPU, кредиты, софт</span>
        </div>
      </div>

      {/* Sponsored Jams */}
      <div className="rounded-3xl border border-space-700 bg-space-900/90 p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-space-800">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Trophy className="h-5 w-5 text-rose-400" />
            Проводимые соревнования и хакатоны ({orgJams.length})
          </h2>
          <button
            onClick={() => setActiveTab('jams')}
            className="text-xs font-semibold text-rose-400 hover:underline"
          >
            Все соревнования →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {orgJams.map((jam) => (
            <div
              key={jam.id}
              className="rounded-2xl border border-space-800 bg-space-850 p-4 space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">{jam.title}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">{jam.theme}</p>
                </div>
                <span className="rounded bg-rose-500/20 px-2 py-0.5 text-[10px] font-bold text-rose-300">
                  {jam.status}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs font-mono pt-2 border-t border-space-800">
                <span className="text-slate-400">Призовой фонд:</span>
                <span className="text-amber-400 font-bold">{jam.prizePoolAmount}</span>
              </div>

              <div className="flex items-center justify-between text-xs pt-2">
                <span className="text-slate-500">{jam.submissionsCount} заявок</span>
                <button
                  onClick={() => setActiveTab('jams')}
                  className="text-cyan-400 font-semibold hover:underline"
                >
                  Управление жюри →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sponsored Resources */}
      <div className="rounded-3xl border border-space-700 bg-space-900/90 p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-space-800">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Gift className="h-5 w-5 text-emerald-400" />
            {t.sponsor.sponsoredResources[lang]} ({db.resources.length})
          </h2>
          <button
            onClick={() => setActiveTab('resources')}
            className="text-xs font-semibold text-emerald-400 hover:underline"
          >
            Смотреть Resource Center →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {db.resources.map((res) => (
            <div
              key={res.id}
              className="rounded-2xl border border-space-800 bg-space-850 p-4 space-y-2 text-xs"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm">{res.title}</span>
                <span className="text-xl">{res.partnerLogo}</span>
              </div>
              <p className="text-slate-400">{res.description}</p>
              <div className="flex items-center justify-between pt-2 border-t border-space-800 font-mono text-[11px]">
                <span className="text-emerald-400 font-semibold">{res.value}</span>
                <span className="text-slate-500">{res.claimedCount}/{res.availableCount} выдано</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
