'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../lib/i18n';
import {
  HeartHandshake,
  ShieldCheck,
  Gift,
  CheckCircle2,
  Clock,
  Plus,
  Coins,
  Trophy,
  Rocket,
  Award,
} from 'lucide-react';
import { getDB } from '../../lib/db';

export default function ParentDashboard() {
  const { db, lang, currentUser, refreshDB } = useApp();
  const t = translations;

  // Linked student
  const child = db.users.find((u) => u.id === currentUser.linkedStudentId) || db.users[0];
  const childProjects = db.startups.filter((s) => s.authorId === child.id);

  // Consents required (offers or grants)
  const pendingOffers = db.offers.filter(
    (o) => childProjects.some((p) => p.id === o.startupId) && o.parentalConsentRequired && !o.parentConsentApproved
  );
  const pendingGrants = db.travelGrants.filter(
    (g) => g.studentId === child.id && !g.parentalApprovalConfirmed
  );

  const [newRewardTitle, setNewRewardTitle] = useState('');
  const [newRewardGoal, setNewRewardGoal] = useState('');
  const [newRewardDesc, setNewRewardDesc] = useState('');
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [consentSuccessMsg, setConsentSuccessMsg] = useState<string | null>(null);

  const handleApproveOffer = (offerId: string) => {
    const offer = db.offers.find((o) => o.id === offerId);
    if (offer) {
      offer.parentConsentApproved = true;
      offer.auditTrail.push({
        timestamp: new Date().toISOString(),
        action: 'parent_approved',
        details: `Родитель ${currentUser.name} подтвердил согласие на условия инвестиционного предложения.`,
      });
      refreshDB();
      setConsentSuccessMsg(`Согласие на предложение «${offer.title}» успешно зафиксировано!`);
      setTimeout(() => setConsentSuccessMsg(null), 4000);
    }
  };

  const handleCreateParentReward = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRewardTitle.trim()) return;

    db.parentRewards.unshift({
      id: `preward-${Date.now()}`,
      parentId: currentUser.id,
      studentId: child.id,
      title: newRewardTitle,
      targetGoal: newRewardGoal || 'Завершение спринта стартапа',
      rewardDescription: newRewardDesc || 'Семейное поощрение',
      status: 'active',
      created_at: new Date().toISOString(),
    });

    refreshDB();
    setShowRewardModal(false);
    setNewRewardTitle('');
    setNewRewardGoal('');
    setNewRewardDesc('');
  };

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-emerald-500/20 bg-gradient-to-r from-space-900 via-emerald-950/30 to-space-950 p-6 sm:p-8 shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
              <HeartHandshake className="h-3.5 w-3.5" />
              PARENT GUARDIAN PORTAL
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              {t.parent.title[lang]}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              {t.parent.subtitle[lang]}
            </p>
          </div>

          <div className="flex items-center gap-3 bg-space-850/80 p-3.5 rounded-2xl border border-space-700">
            <img
              src={child.avatar}
              alt={child.name}
              className="h-12 w-12 rounded-xl object-cover ring-2 ring-emerald-500/40"
            />
            <div>
              <p className="text-xs text-slate-400 font-medium">Ваш ребёнок:</p>
              <h3 className="text-sm font-bold text-white">{child.name}</h3>
              <p className="text-[11px] text-cyan-400 font-mono">
                {child.school} • LVL {child.level}
              </p>
            </div>
          </div>
        </div>
      </div>

      {consentSuccessMsg && (
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/30 p-4 text-xs font-semibold text-emerald-300 flex items-center gap-2 shadow-lg">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
          <span>{consentSuccessMsg}</span>
        </div>
      )}

      {/* Child Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-space-700 bg-space-900/90 p-4">
          <span className="text-xs font-semibold text-slate-400 block">Заработано Quasar</span>
          <span className="text-2xl font-bold font-mono text-cyan-400 mt-1 flex items-center gap-1.5">
            {child.quasarBalance} <Coins className="h-5 w-5 text-cyan-400 inline" />
          </span>
          <span className="text-[11px] text-slate-500">За квесты и активность</span>
        </div>

        <div className="rounded-2xl border border-space-700 bg-space-900/90 p-4">
          <span className="text-xs font-semibold text-slate-400 block">Стартапов создано</span>
          <span className="text-2xl font-bold font-mono text-white mt-1 block">
            {childProjects.length}
          </span>
          <span className="text-[11px] text-slate-500">QazaqAgri AI (MVP)</span>
        </div>

        <div className="rounded-2xl border border-space-700 bg-space-900/90 p-4">
          <span className="text-xs font-semibold text-slate-400 block">Уровень Battle Pass</span>
          <span className="text-2xl font-bold font-mono text-amber-400 mt-1 block">
            LVL {child.level}
          </span>
          <span className="text-[11px] text-slate-500">Сезон 01: Build Your Future</span>
        </div>

        <div className="rounded-2xl border border-space-700 bg-space-900/90 p-4">
          <span className="text-xs font-semibold text-slate-400 block">Достижения</span>
          <span className="text-2xl font-bold font-mono text-purple-400 mt-1 block">
            {child.achievements.length}
          </span>
          <span className="text-[11px] text-slate-500">Включая победу в хакатоне</span>
        </div>
      </div>

      {/* Consents & Approvals Section */}
      <div className="rounded-3xl border border-amber-500/30 bg-space-900/90 p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-space-800">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-amber-400" />
              {t.parent.pendingConsents[lang]} ({pendingOffers.length + pendingGrants.length})
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              В соответствии с законодательством, финансовые операции и гранты для несовершеннолетних требуют верификации родителя.
            </p>
          </div>
        </div>

        {pendingOffers.length === 0 && pendingGrants.length === 0 ? (
          <div className="py-6 text-center text-xs text-slate-500">
            Нет ожидающих согласий. Все текущие разрешения подтверждены!
          </div>
        ) : (
          <div className="space-y-3">
            {pendingOffers.map((offer) => (
              <div
                key={offer.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl bg-space-850 p-4 border border-space-800"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">{offer.title}</span>
                    <span className="rounded bg-amber-500/20 px-2 py-0.5 text-[10px] font-bold text-amber-300">
                      {offer.amountOrValue}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Инвестор: <strong className="text-white">{offer.investorName}</strong> ({offer.investorOrg}) • Проект: {offer.startupTitle}
                  </p>
                  <p className="text-[11px] text-slate-400">{offer.description}</p>
                </div>

                <button
                  onClick={() => handleApproveOffer(offer.id)}
                  className="shrink-0 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-4 py-2 text-xs font-bold text-space-950 shadow-md hover:opacity-95"
                >
                  {t.parent.approveConsent[lang]}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Family Incentive System (Parent Rewards) */}
      <div className="rounded-3xl border border-space-700 bg-space-900/90 p-6 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-space-800">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Gift className="h-5 w-5 text-emerald-400" />
              {t.parent.parentRewards[lang]}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Устанавливайте позитивные семейные поощрения за достижение учебных и стартап-целей.
            </p>
          </div>
          <button
            onClick={() => setShowRewardModal(true)}
            className="flex items-center gap-1.5 rounded-xl bg-emerald-500 px-4 py-2 text-xs font-bold text-space-950 hover:bg-emerald-400 shadow-md"
          >
            <Plus className="h-4 w-4" />
            {t.parent.createReward[lang]}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {db.parentRewards.map((pr) => (
            <div
              key={pr.id}
              className="rounded-2xl border border-space-800 bg-space-850 p-4 space-y-2"
            >
              <div className="flex items-start justify-between gap-2">
                <h4 className="text-sm font-bold text-white">{pr.title}</h4>
                <span className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase ${
                  pr.status === 'completed'
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : 'bg-cyan-500/20 text-cyan-400'
                }`}>
                  {pr.status}
                </span>
              </div>
              <p className="text-xs text-slate-300">
                <strong className="text-slate-400">Цель:</strong> {pr.targetGoal}
              </p>
              <p className="text-xs text-emerald-400 font-semibold bg-emerald-950/20 p-2 rounded-xl border border-emerald-500/20 flex items-center gap-1.5">
                <Gift className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                <span>Награда: {pr.rewardDescription}</span>
              </p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl bg-space-850/60 p-3.5 text-[11px] text-slate-400 border border-space-800 flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>{t.parent.privacySafe[lang]}</span>
        </div>
      </div>

      {/* Create Reward Modal */}
      {showRewardModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-space-950/80 p-4 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-3xl border border-emerald-500/30 bg-space-900 p-6 sm:p-8 shadow-2xl">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Gift className="h-5 w-5 text-emerald-400" />
              Новое семейное поощрение
            </h2>

            <form onSubmit={handleCreateParentReward} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
                  Название достижения
                </label>
                <input
                  type="text"
                  required
                  value={newRewardTitle}
                  onChange={(e) => setNewRewardTitle(e.target.value)}
                  placeholder="например: Завершение четверти без троек и финал хакатона"
                  className="w-full rounded-xl border border-space-700 bg-space-850 px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
                  Цель для ребёнка
                </label>
                <input
                  type="text"
                  required
                  value={newRewardGoal}
                  onChange={(e) => setNewRewardGoal(e.target.value)}
                  placeholder="например: Сдать проект и сделать 10 коммитов в GitHub"
                  className="w-full rounded-xl border border-space-700 bg-space-850 px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
                  Согласованная награда
                </label>
                <input
                  type="text"
                  required
                  value={newRewardDesc}
                  onChange={(e) => setNewRewardDesc(e.target.value)}
                  placeholder="например: Поездка в горы / Новый набор датчиков / Книга"
                  className="w-full rounded-xl border border-space-700 bg-space-850 px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-space-800">
                <button
                  type="button"
                  onClick={() => setShowRewardModal(false)}
                  className="rounded-xl border border-space-700 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-space-800"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-emerald-500 px-5 py-2 text-xs font-bold text-space-950 hover:bg-emerald-400 shadow-md"
                >
                  Сохранить поощрение
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
