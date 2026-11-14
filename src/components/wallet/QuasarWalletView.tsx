'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../lib/i18n';
import {
  Coins,
  ArrowUpRight,
  ArrowDownLeft,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Zap,
  CheckCircle2,
  AlertCircle,
  Eye,
  MousePointerClick,
  Layers,
} from 'lucide-react';

export default function QuasarWalletView() {
  const { currentUser, db, lang, promoteStartup, refreshDB } = useApp();
  const t = translations;

  const [selectedStartupId, setSelectedStartupId] = useState<string>(
    db.startups.find((s) => s.authorId === currentUser.id)?.id || db.startups[0].id
  );
  const [promoSuccessMsg, setPromoSuccessMsg] = useState<string | null>(null);
  const [promoErrorMsg, setPromoErrorMsg] = useState<string | null>(null);

  // User transactions
  const userTransactions = db.transactions.filter(
    (tx) => tx.userId === currentUser.id || currentUser.role === 'admin'
  );

  const totalEarned = userTransactions
    .filter((tx) => tx.type === 'credit')
    .reduce((acc, tx) => acc + tx.amount, 0);

  const totalSpent = userTransactions
    .filter((tx) => tx.type === 'debit')
    .reduce((acc, tx) => acc + tx.amount, 0);

  // Promotion packages
  const promoPackages = [
    {
      type: 'featured_showcase',
      name: 'Главная Витрина (Featured)',
      cost: 500,
      days: 7,
      multiplier: '5x показов',
      desc: 'Закрепление стартапа на первом экране витрины проектов AI Startify.',
    },
    {
      type: 'velocity_boost',
      name: 'Скоростной Boost 2x',
      cost: 300,
      days: 5,
      multiplier: '2.5x показов',
      desc: 'Приоритет в поисковой выдаче и блоке «Популярные разработки».',
    },
    {
      type: 'category_spotlight',
      name: 'Category Spotlight',
      cost: 250,
      days: 7,
      multiplier: 'Топ в категории',
      desc: 'Выделение бейджем и первое место в выбранной категории стартапов.',
    },
    {
      type: 'discovery_top',
      name: 'Discovery Top',
      cost: 150,
      days: 3,
      multiplier: '1.5x показов',
      desc: 'Дополнительные показы в каталоге для инвесторов и менторов.',
    },
  ];

  const handleBuyPromo = (pkg: typeof promoPackages[0]) => {
    if (currentUser.quasarBalance < pkg.cost) {
      setPromoErrorMsg(`Недостаточно Quasar! Требуется ${pkg.cost}, у вас ${currentUser.quasarBalance}.`);
      setTimeout(() => setPromoErrorMsg(null), 4000);
      return;
    }

    const success = promoteStartup(selectedStartupId, pkg);
    if (success) {
      setPromoSuccessMsg(`Кампания «${pkg.name}» успешно активирована на ${pkg.days} дней!`);
      setTimeout(() => setPromoSuccessMsg(null), 4000);
    } else {
      setPromoErrorMsg('Ошибка при списании или стартап не найден.');
      setTimeout(() => setPromoErrorMsg(null), 4000);
    }
  };

  // Student startups
  const myStartups = db.startups.filter((s) => s.authorId === currentUser.id);

  return (
    <div className="space-y-6">
      {/* Hero Header */}
      <div className="rounded-3xl border border-space-800 bg-space-900/90 p-6 sm:p-8 shadow-card">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-md bg-cyan-500/10 border border-cyan-500/30 px-2.5 py-0.5 text-xs font-semibold text-cyan-400">
              <Coins className="h-3.5 w-3.5" />
              UTILITY WALLET • ANTI-FRAUD IDEMPOTENT
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              {t.wallet.title[lang]}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              {t.wallet.subtitle[lang]}
            </p>
          </div>

          <div className="rounded-2xl border border-space-750 bg-space-850 p-4 sm:p-5 shadow-sm text-right shrink-0 min-w-[200px]">
            <span className="text-xs uppercase font-semibold text-slate-400 block">
              {t.wallet.currentBalance[lang]}
            </span>
            <div className="flex items-center justify-end gap-2 mt-1">
              <Coins className="h-6 w-6 text-cyan-400" />
              <span className="text-3xl font-black text-white font-mono tracking-tight">
                {currentUser.quasarBalance.toLocaleString()}
              </span>
              <span className="text-xs font-bold text-cyan-400 uppercase">QUASAR</span>
            </div>
            <p className="text-[10px] text-slate-500 mt-1 font-mono">
              Account: {currentUser.isAnonymous ? currentUser.anonymousAlias : currentUser.email}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-space-800 bg-space-900/60 p-4 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">{t.wallet.totalEarned[lang]}</span>
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
              <ArrowDownLeft className="h-4 w-4" />
            </div>
          </div>
          <span className="text-xl font-bold font-mono text-emerald-400 mt-1 block">
            +{totalEarned.toLocaleString()} Quasar
          </span>
          <span className="text-[11px] text-slate-500">За квесты, батлпасс и джемы</span>
        </div>

        <div className="rounded-2xl border border-space-800 bg-space-900/60 p-4 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">{t.wallet.totalSpent[lang]}</span>
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-500/10 text-rose-400">
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>
          <span className="text-xl font-bold font-mono text-rose-400 mt-1 block">
            -{totalSpent.toLocaleString()} Quasar
          </span>
          <span className="text-[11px] text-slate-500">На рекламу и продвижение</span>
        </div>

        <div className="rounded-2xl border border-space-800 bg-space-900/60 p-4 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Статус транзакций</span>
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400">
              <ShieldCheck className="h-4 w-4" />
            </div>
          </div>
          <span className="text-sm font-bold text-white mt-1 block flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-cyan-400" />
            100% Idempotent
          </span>
          <span className="text-[11px] text-slate-500">Защита от повторных начислений</span>
        </div>
      </div>

      {promoSuccessMsg && (
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/40 p-4 text-xs font-semibold text-emerald-300 flex items-center gap-2 shadow-lg">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
          <span>{promoSuccessMsg}</span>
        </div>
      )}

      {promoErrorMsg && (
        <div className="rounded-2xl border border-rose-500/30 bg-rose-950/40 p-4 text-xs font-semibold text-rose-300 flex items-center gap-2 shadow-lg">
          <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
          <span>{promoErrorMsg}</span>
        </div>
      )}

      {/* Startup Promotion Store */}
      <div className="rounded-3xl border border-space-800 bg-space-900/90 p-6 shadow-card space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-400" />
              <span>{t.wallet.promotionShop[lang]}</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Используйте заработанные Quasar для привлечения внимания инвесторов, жюри и пользователей к стартапу.
            </p>
          </div>

          {/* Select project to promote */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">Проект для промо:</span>
            <select
              value={selectedStartupId}
              onChange={(e) => setSelectedStartupId(e.target.value)}
              className="rounded-xl border border-space-700 bg-space-850 px-3 py-1.5 text-xs font-bold text-cyan-400 focus:outline-none"
            >
              {myStartups.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Promotion Package Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {promoPackages.map((pkg) => (
            <div
              key={pkg.type}
              className="flex flex-col justify-between rounded-2xl border border-space-800 bg-space-850 p-5 transition-card hover:border-space-700"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <h3 className="text-sm font-bold text-white">{pkg.name}</h3>
                  <span className="rounded bg-space-800 border border-space-700 px-2 py-0.5 text-[10px] font-bold text-cyan-400">
                    {pkg.days} дн.
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{pkg.desc}</p>
                <div className="flex items-center gap-1.5 text-xs text-amber-400 font-semibold">
                  <TrendingUp className="h-3.5 w-3.5" />
                  <span>{pkg.multiplier}</span>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-space-800">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-slate-400">Стоимость:</span>
                  <span className="text-sm font-bold text-white font-mono">{pkg.cost} Quasar</span>
                </div>
                <button
                  onClick={() => handleBuyPromo(pkg)}
                  className="w-full rounded-xl bg-cyan-500 hover:bg-cyan-400 py-2 text-xs font-bold text-space-950 transition-colors shadow-sm"
                >
                  {t.wallet.buyPromo[lang]}
                </button>
              </div>
            </div>
          ))}
        </div>

        <p className="text-[11px] text-slate-500 italic">
          * {t.wallet.nonCashDisclaimer[lang]}
        </p>
      </div>

      {/* Audit Log / Transactions Table */}
      <div className="rounded-3xl border border-space-800 bg-space-900/90 p-6 shadow-card space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-cyan-400" />
          <span>{t.wallet.auditLog[lang]}</span>
          <span className="text-xs font-mono text-slate-500">({userTransactions.length})</span>
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-xs">
            <thead>
              <tr className="border-b border-space-800 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <th className="pb-3">Дата & Время</th>
                <th className="pb-3">Тип</th>
                <th className="pb-3">Сумма</th>
                <th className="pb-3">Категория</th>
                <th className="pb-3">Описание</th>
                <th className="pb-3">Idempotency Key</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-space-800/60 font-mono">
              {userTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-space-850/40 transition-colors">
                  <td className="py-3 text-slate-400">
                    {new Date(tx.timestamp).toLocaleString([], {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </td>
                  <td className="py-3">
                    <span
                      className={`inline-flex items-center gap-1 rounded px-2 py-0.5 text-[10px] font-bold uppercase ${tx.type === 'credit'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : tx.type === 'debit'
                            ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                            : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                        }`}
                    >
                      {tx.type}
                    </span>
                  </td>
                  <td
                    className={`py-3 font-bold ${tx.type === 'credit' ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                  >
                    {tx.type === 'credit' ? '+' : '-'}
                    {tx.amount}
                  </td>
                  <td className="py-3 text-slate-300 font-sans font-medium">{tx.category}</td>
                  <td className="py-3 text-slate-200 font-sans max-w-xs truncate">{tx.description}</td>
                  <td className="py-3 text-[10px] text-slate-500 truncate max-w-[140px]" title={tx.idempotencyKey}>
                    {tx.idempotencyKey}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
