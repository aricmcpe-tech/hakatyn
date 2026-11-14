'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../lib/i18n';
import { RealReward, ResourceItem } from '../../lib/types';
import {
  Gift,
  Coins,
  Cpu,
  Package,
  CheckCircle2,
  ExternalLink,
  Copy,
  Sparkles,
  AlertCircle,
  Truck,
  Check,
} from 'lucide-react';
import { getDB } from '../../lib/db';

export default function ResourceCenterView() {
  const { currentUser, db, lang, refreshDB } = useApp();
  const t = translations;

  const [activeTab, setActiveTab] = useState<'rewards' | 'resources'>('rewards');
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleRedeemReward = (reward: RealReward) => {
    if (currentUser.quasarBalance < reward.quasarCost) {
      setErrorMsg(`Недостаточно Quasar для получения «${reward.title}». Требуется ${reward.quasarCost}, у вас ${currentUser.quasarBalance}.`);
      setTimeout(() => setErrorMsg(null), 4000);
      return;
    }

    const dbInst = getDB();
    const txRes = dbInst.addTransaction({
      userId: currentUser.id,
      type: 'debit',
      amount: reward.quasarCost,
      category: 'RewardClaim',
      source: `reward_claim_${reward.id}`,
      description: `Обмен Quasar на награду: ${reward.title}`,
      idempotencyKey: `claim-${reward.id}-${Date.now()}`,
      targetId: reward.id,
    });

    if (txRes.success) {
      reward.inStock = Math.max(0, reward.inStock - 1);
      refreshDB();
      setSuccessMsg(`Поздравляем! Заказ на «${reward.title}» оформлен. Доставка: ${reward.deliveryMethod}.`);
      setTimeout(() => setSuccessMsg(null), 5000);
    }
  };

  const handleClaimResource = (res: ResourceItem) => {
    navigator.clipboard.writeText(res.accessCodeOrUrl);
    setCopiedCode(res.id);
    setSuccessMsg(`Ссылка для доступа к «${res.title}» скопирована в буфер обмена!`);
    setTimeout(() => {
      setCopiedCode(null);
      setSuccessMsg(null);
    }, 4000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-3xl border border-space-800 bg-space-900/90 p-6 sm:p-8 shadow-card">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-md bg-cyan-500/10 border border-cyan-500/30 px-2.5 py-0.5 text-xs font-semibold text-cyan-400">
              <Gift className="h-3.5 w-3.5" />
              PHYSICAL GOODS & DEVELOPER TOOLKITS
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              {t.resources.title[lang]}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              {t.resources.subtitle[lang]}
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-2xl border border-space-800 bg-space-850 p-1.5 shrink-0">
            <button
              onClick={() => setActiveTab('rewards')}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                activeTab === 'rewards'
                  ? 'bg-cyan-500 text-space-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Физические награды
            </button>
            <button
              onClick={() => setActiveTab('resources')}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                activeTab === 'resources'
                  ? 'bg-cyan-500 text-space-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Resource Center
            </button>
          </div>
        </div>
      </div>

      {successMsg && (
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/40 p-4 text-xs font-semibold text-emerald-300 flex items-center gap-2 shadow-lg animate-fadeIn">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="rounded-2xl border border-rose-500/30 bg-rose-950/40 p-4 text-xs font-semibold text-rose-300 flex items-center gap-2 shadow-lg animate-fadeIn">
          <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Rewards Catalog */}
      {activeTab === 'rewards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {db.realRewards.map((reward) => (
            <div
              key={reward.id}
              className="flex flex-col justify-between rounded-2xl border border-space-800 bg-space-900/90 p-5 transition-card hover:border-space-700 shadow-card"
            >
              <div className="space-y-3">
                <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-space-800">
                  <img
                    src={reward.image}
                    alt={reward.title}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <span className="absolute top-2 right-2 rounded-md bg-space-950/80 px-2 py-0.5 text-[10px] font-bold text-cyan-400 backdrop-blur-md border border-space-800">
                    {reward.category}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white">
                  {reward.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{reward.description}</p>

                <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                  <Truck className="h-3.5 w-3.5 text-slate-400" />
                  <span className="truncate">{reward.deliveryMethod}</span>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-space-800">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] text-slate-400 font-mono">
                    В наличии: <strong className="text-white">{reward.inStock} шт.</strong>
                  </span>
                  <span className="font-mono text-sm font-bold text-cyan-400">
                    {reward.quasarCost} Quasar
                  </span>
                </div>

                <button
                  onClick={() => handleRedeemReward(reward)}
                  disabled={reward.inStock === 0}
                  className="w-full rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 py-2.5 text-xs font-bold text-space-950 transition-colors shadow-sm"
                >
                  {reward.inStock === 0 ? 'Закончилось' : t.resources.redeem[lang]}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Resource Center Catalog */}
      {activeTab === 'resources' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {db.resources.map((res) => (
            <div
              key={res.id}
              className="flex flex-col justify-between rounded-2xl border border-space-800 bg-space-900/90 p-6 shadow-card space-y-4"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-space-800">
                  <div>
                    <h3 className="text-base font-bold text-white">{res.title}</h3>
                    <p className="text-xs text-cyan-400 font-medium mt-0.5">{res.partner}</p>
                  </div>
                  <span className="rounded-xl bg-space-850 px-3 py-1 text-xs font-mono font-bold text-cyan-300 border border-space-750">
                    {res.value}
                  </span>
                </div>

                <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                  {res.description}
                </p>

                <div className="mt-3 rounded-xl bg-space-850 p-3 text-xs text-slate-400 border border-space-800">
                  <strong className="text-slate-300">Условия:</strong> {res.eligibility}
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-space-800 text-xs">
                <span className="text-slate-500 font-mono text-[11px]">
                  {res.claimedCount} школьников активировали
                </span>
                <button
                  onClick={() => handleClaimResource(res)}
                  className="flex items-center gap-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 px-4 py-2 text-xs font-bold text-space-950 transition-colors shadow-sm"
                >
                  {copiedCode === res.id ? (
                    <>
                      <Check className="h-3.5 w-3.5" />
                      <span>Скопировано!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>{t.resources.claimResource[lang]}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
