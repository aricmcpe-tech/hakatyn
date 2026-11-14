'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../lib/i18n';
import { StartupJam, JamSubmission } from '../../lib/types';
import {
  Trophy,
  Calendar,
  Clock,
  CheckCircle,
  ShieldCheck,
  Send,
  Plus,
  Users,
  Award,
  ExternalLink,
  ChevronRight,
  Sparkles,
  DollarSign,
  Scale,
  Eye,
  EyeOff,
  Medal,
} from 'lucide-react';
import { getDB } from '../../lib/db';

export default function StartupJamsView() {
  const { db, lang, currentUser, role, refreshDB } = useApp();
  const t = translations;

  const [selectedJam, setSelectedJam] = useState<StartupJam>(db.jams[0]);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showCreateJamModal, setShowCreateJamModal] = useState(false);
  const [anonymousJudging, setAnonymousJudging] = useState(false);

  // Submission form state
  const myStartups = db.startups.filter((s) => s.authorId === currentUser.id);
  const [selectedStartupId, setSelectedStartupId] = useState<string>(myStartups[0]?.id || db.startups[0].id);
  const [pitchText, setPitchText] = useState('');
  const [demoLink, setDemoLink] = useState('https://qazaqagri-demo.vercel.app');
  const [repoLink, setRepoLink] = useState('https://github.com/alikhan-dev/qazaqagri-ai-engine');
  const [parentConsent, setParentConsent] = useState(true);

  // Judging state
  const [evaluatingSub, setEvaluatingSub] = useState<JamSubmission | null>(null);
  const [criteriaScores, setCriteriaScores] = useState<Record<string, number>>({
    innovation: 18,
    utility: 19,
    feasibility: 14,
    prototypeQuality: 18,
    growthPotential: 14,
    pitchPresentation: 9,
  });
  const [judgeFeedback, setJudgeFeedback] = useState('Отличный прототип, высокая применимость в школах Казахстана.');

  // New Jam form state
  const [newJamTitle, setNewJamTitle] = useState('');
  const [newJamTheme, setNewJamTheme] = useState('');
  const [newJamPrize, setNewJamPrize] = useState('500 000 ₸');

  // Submissions for currently selected Jam
  const jamSubmissions = db.submissions.filter((s) => s.jamId === selectedJam.id);

  const handleSubmitProject = (e: React.FormEvent) => {
    e.preventDefault();
    const startup = db.startups.find((s) => s.id === selectedStartupId);
    if (!startup) return;

    const dbInst = getDB();
    dbInst.submitToJam({
      jamId: selectedJam.id,
      startupId: startup.id,
      startupTitle: startup.title,
      teamName: `${startup.title} Team`,
      submitterId: currentUser.id,
      members: startup.teamMembers.map((m) => m.name),
      pitch: pitchText || startup.solution,
      demoUrl: demoLink,
      repoUrl: repoLink,
      parentConsentConfirmed: parentConsent,
    });

    refreshDB();
    setShowSubmitModal(false);
  };

  const handleSaveScore = (e: React.FormEvent) => {
    e.preventDefault();
    if (!evaluatingSub) return;

    const total = Object.values(criteriaScores).reduce((acc, val) => acc + val, 0);

    evaluatingSub.scores.push({
      judgeId: currentUser.id,
      judgeName: currentUser.name,
      criteriaScores,
      total,
      feedback: judgeFeedback,
    });
    evaluatingSub.averageScore = total;
    evaluatingSub.shortlisted = total >= 85;

    refreshDB();
    setEvaluatingSub(null);
  };

  const handleCreateJam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJamTitle.trim()) return;

    const dbInst = getDB();
    dbInst.createJam({
      title: newJamTitle,
      slug: newJamTitle.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      coverImage: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop&q=80',
      organizerId: currentUser.id,
      organizerName: currentUser.name,
      organizerLogo: '🏆',
      organizerType: role === 'sponsor' ? 'sponsor' : 'investor',
      theme: newJamTheme || 'Технологические решения для школьников',
      problemStatement: 'Актуальные вызовы для молодежи',
      requirements: ['Рабочий прототип', 'Публичный репозиторий GitHub', 'Видео питч до 3 минут'],
      categories: ['AI & EdTech', 'Productivity'],
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 14 * 86400000).toISOString(),
      submissionDeadline: new Date(Date.now() + 10 * 86400000).toISOString(),
      prizePoolAmount: newJamPrize,
      currency: '₸',
      winnersCount: 3,
      criteria: [
        { key: 'innovation', name: { ru: 'Инновационность', kk: 'Инновация', en: 'Innovation' }, weight: 20 },
        { key: 'utility', name: { ru: 'Польза', kk: 'Пайдасы', en: 'Utility' }, weight: 20 },
        { key: 'prototypeQuality', name: { ru: 'Прототип', kk: 'Прототип', en: 'Prototype' }, weight: 20 },
      ],
      participantRequirements: 'Школьники 7-12 классов',
      resources: [],
      contactInfo: currentUser.email,
      status: 'active',
    });

    refreshDB();
    setShowCreateJamModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-3xl border border-space-800 bg-space-900/90 p-6 sm:p-8 shadow-card">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-md bg-indigo-500/10 border border-indigo-500/30 px-2.5 py-0.5 text-xs font-semibold text-indigo-400">
              <Trophy className="h-3.5 w-3.5" />
              STARTUP COMPETITIONS & HACKATHONS
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              {t.jams.title[lang]}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              {t.jams.subtitle[lang]}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {(role === 'investor' || role === 'sponsor' || role === 'admin') && (
              <button
                onClick={() => setShowCreateJamModal(true)}
                className="flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-4 py-2.5 text-xs sm:text-sm font-bold text-white transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>{t.jams.createJam[lang]}</span>
              </button>
            )}
            <button
              onClick={() => setShowSubmitModal(true)}
              className="flex items-center gap-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 px-4 py-2.5 text-xs sm:text-sm font-bold text-space-950 transition-colors shadow-sm"
            >
              <Send className="h-4 w-4" />
              <span>{t.jams.submitProject[lang]}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Jams Selector Horizontal Track */}
      <div className="flex gap-3 overflow-x-auto no-scrollbar touch-scroll pb-2">
        {db.jams.map((jam) => (
          <button
            key={jam.id}
            onClick={() => setSelectedJam(jam)}
            className={`shrink-0 rounded-2xl border p-4 text-left transition-all ${
              selectedJam.id === jam.id
                ? 'border-indigo-500/80 bg-space-850 text-white shadow-sm'
                : 'border-space-800 bg-space-900/60 text-slate-400 hover:text-white hover:border-space-700'
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <Trophy className="h-4 w-4 text-amber-400" />
              <span className="text-xs font-bold text-white truncate max-w-[190px]">{jam.title}</span>
            </div>
            <div className="flex items-center justify-between gap-4 text-[11px] text-slate-400 font-mono mt-2">
              <span className="text-amber-400 font-bold">{jam.prizePoolAmount}</span>
              <span className="capitalize text-slate-500">{jam.status}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Selected Jam Detail View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Jam Description & Rules */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-3xl border border-space-800 bg-space-900/90 p-6 shadow-card space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-space-800">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">
                  Организатор: {selectedJam.organizerName}
                </span>
                <h2 className="text-xl font-bold text-white mt-1">{selectedJam.title}</h2>
                <p className="text-xs text-slate-400 mt-1">{selectedJam.theme}</p>
              </div>
              <div className="rounded-2xl border border-amber-500/30 bg-amber-950/20 p-3.5 text-center sm:text-right shrink-0">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Призовой фонд</span>
                <span className="text-xl font-bold text-amber-400 font-mono">{selectedJam.prizePoolAmount}</span>
                <span className="flex items-center justify-center sm:justify-end gap-1 text-[10px] text-emerald-400 font-semibold mt-0.5">
                  <ShieldCheck className="h-3 w-3" /> Верифицирован
                </span>
              </div>
            </div>

            {/* Problem Statement */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Проблема для решения:
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-space-850 p-3.5 rounded-2xl border border-space-800">
                {selectedJam.problemStatement}
              </p>
            </div>

            {/* Requirements list */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Требования к проектам:
              </h3>
              <div className="space-y-1.5">
                {selectedJam.requirements.map((req, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle className="h-4 w-4 text-cyan-400 shrink-0" />
                    <span>{req}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Evaluation Criteria */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Критерии оценивания жюри (100 баллов):
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                {selectedJam.criteria.map((c) => (
                  <div key={c.key} className="rounded-xl bg-space-850 p-3 border border-space-800">
                    <span className="font-semibold text-white block">{c.name[lang] || c.key}</span>
                    <span className="text-[11px] text-cyan-400 font-mono font-bold">{c.weight}% веса</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Prize Disbursement Schedule */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Распределение призов и статус выплат:
              </h3>
              <div className="space-y-2">
                {selectedJam.payoutSchedule.map((p) => (
                  <div
                    key={p.rank}
                    className="flex items-center justify-between rounded-xl bg-space-850 p-3 border border-space-800 text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400 font-bold font-mono text-[11px] border border-amber-500/30">
                        #{p.rank}
                      </span>
                      <div>
                        <span className="font-bold text-white">{p.title}</span>
                        {p.winnerTeam && (
                          <span className="ml-2 text-cyan-400 font-semibold">• {p.winnerTeam}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold font-mono text-amber-400">{p.prize}</span>
                      <span className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase ${
                        p.payoutStatus === 'approved'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'bg-indigo-500/20 text-indigo-300'
                      }`}>
                        {p.payoutStatus === 'approved' ? 'Выплачено' : 'В эскроу'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Submissions & Judging panel */}
        <div className="space-y-6">
          
          {/* Submissions in this Jam */}
          <div className="rounded-3xl border border-space-800 bg-space-900/90 p-5 shadow-card space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-space-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <Users className="h-4 w-4 text-cyan-400" />
                <span>Заявки команд ({jamSubmissions.length})</span>
              </h3>

              {/* Anonymous Judging Toggle */}
              {(role === 'investor' || role === 'sponsor' || role === 'admin' || role === 'mentor') && (
                <button
                  onClick={() => setAnonymousJudging(!anonymousJudging)}
                  className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[10px] font-semibold border transition-all ${
                    anonymousJudging
                      ? 'border-purple-500/40 bg-purple-950/40 text-purple-300'
                      : 'border-space-700 bg-space-850 text-slate-400 hover:text-white'
                  }`}
                  title="Анонимное оценивание скрывает имена участников и школ"
                >
                  {anonymousJudging ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                  <span>Blind Judging</span>
                </button>
              )}
            </div>

            <div className="space-y-3">
              {jamSubmissions.map((sub) => (
                <div
                  key={sub.id}
                  className="rounded-2xl border border-space-800 bg-space-850 p-3.5 space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-xs font-bold text-white">
                        {anonymousJudging ? `Team Code #${sub.id.slice(-4)}` : sub.startupTitle}
                      </h4>
                      <p className="text-[11px] text-slate-400">
                        {anonymousJudging ? 'Анонимная школьная команда' : sub.members.join(', ')}
                      </p>
                    </div>
                    {sub.winnerRank && (
                      <span className="rounded bg-amber-500/20 px-2 py-0.5 text-[10px] font-bold text-amber-400 border border-amber-500/30">
                        #{sub.winnerRank} Победитель
                      </span>
                    )}
                  </div>

                  <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed">{sub.pitch}</p>

                  <div className="flex items-center justify-between text-[11px] pt-2 border-t border-space-800">
                    <span className="font-mono text-cyan-400 font-semibold">
                      Балл: {sub.averageScore > 0 ? `${sub.averageScore}/100` : 'Ожидает оценки'}
                    </span>

                    {(role === 'investor' || role === 'sponsor' || role === 'admin' || role === 'mentor') && (
                      <button
                        onClick={() => setEvaluatingSub(sub)}
                        className="rounded-lg bg-indigo-600/30 border border-indigo-500/40 px-2.5 py-1 text-[10px] font-bold text-indigo-200 hover:bg-indigo-600/50"
                      >
                        Оценить
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowSubmitModal(true)}
              className="w-full rounded-xl bg-cyan-500 hover:bg-cyan-400 py-2.5 text-xs font-bold text-space-950 transition-colors shadow-sm"
            >
              + Подать проект на этот джем
            </button>
          </div>

        </div>

      </div>

      {/* Submit Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-space-950/80 p-4 backdrop-blur-md">
          <div className="relative w-full max-w-xl max-h-[90dvh] overflow-y-auto overscroll-contain rounded-3xl border border-space-700 bg-space-900 p-6 sm:p-8 shadow-modal">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Trophy className="h-5 w-5 text-indigo-400" />
              Подача проекта на «{selectedJam.title}»
            </h2>

            <form onSubmit={handleSubmitProject} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
                  Выберите стартап
                </label>
                <select
                  value={selectedStartupId}
                  onChange={(e) => setSelectedStartupId(e.target.value)}
                  className="w-full rounded-xl border border-space-700 bg-space-850 px-3 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
                >
                  {myStartups.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.title} ({s.stage})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
                  Питч-описание для жюри
                </label>
                <textarea
                  rows={3}
                  required
                  value={pitchText}
                  onChange={(e) => setPitchText(e.target.value)}
                  placeholder="В чём суть решения и почему проект заслуживает победы?"
                  className="w-full rounded-xl border border-space-700 bg-space-850 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
                    Ссылка на Демо
                  </label>
                  <input
                    type="url"
                    value={demoLink}
                    onChange={(e) => setDemoLink(e.target.value)}
                    className="w-full rounded-xl border border-space-700 bg-space-850 px-3 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
                    GitHub Репозиторий
                  </label>
                  <input
                    type="url"
                    value={repoLink}
                    onChange={(e) => setRepoLink(e.target.value)}
                    className="w-full rounded-xl border border-space-700 bg-space-850 px-3 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="consentCheck"
                  checked={parentConsent}
                  onChange={(e) => setParentConsent(e.target.checked)}
                  className="h-4 w-4 rounded border-space-700 bg-space-850 text-cyan-500 focus:ring-0"
                />
                <label htmlFor="consentCheck" className="text-xs text-slate-300">
                  Я подтверждаю участие и согласие родителя/законного представителя для получения призовых выплат
                </label>
              </div>

              <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-space-800">
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  className="rounded-xl border border-space-700 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-space-800"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-cyan-500 hover:bg-cyan-400 px-5 py-2 text-xs font-bold text-space-950 transition-colors shadow-sm"
                >
                  Отправить заявку (+150 Quasar)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Judging Modal */}
      {evaluatingSub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-space-950/80 p-4 backdrop-blur-md">
          <div className="relative w-full max-w-xl max-h-[90dvh] overflow-y-auto overscroll-contain rounded-3xl border border-indigo-500/40 bg-space-900 p-6 sm:p-8 shadow-modal">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Scale className="h-5 w-5 text-indigo-400" />
              Оценивание: {anonymousJudging ? `Команда #${evaluatingSub.id.slice(-4)}` : evaluatingSub.startupTitle}
            </h2>

            <form onSubmit={handleSaveScore} className="mt-5 space-y-4">
              <div className="space-y-3">
                {selectedJam.criteria.map((crit) => (
                  <div key={crit.key} className="flex items-center justify-between gap-4">
                    <span className="text-xs font-medium text-slate-300">
                      {crit.name[lang] || crit.key} (макс. {crit.weight})
                    </span>
                    <input
                      type="number"
                      min={0}
                      max={crit.weight}
                      value={criteriaScores[crit.key] ?? Math.round(crit.weight * 0.85)}
                      onChange={(e) =>
                        setCriteriaScores({ ...criteriaScores, [crit.key]: Number(e.target.value) })
                      }
                      className="w-20 rounded-xl border border-space-700 bg-space-850 px-2 py-1.5 text-xs text-center font-mono font-bold text-cyan-400 focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
                  Обратная связь от жюри
                </label>
                <textarea
                  rows={2}
                  value={judgeFeedback}
                  onChange={(e) => setJudgeFeedback(e.target.value)}
                  className="w-full rounded-xl border border-space-700 bg-space-850 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-space-800">
                <button
                  type="button"
                  onClick={() => setEvaluatingSub(null)}
                  className="rounded-xl border border-space-700 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-space-800"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-indigo-500 hover:bg-indigo-400 px-5 py-2 text-xs font-bold text-white shadow-sm"
                >
                  Зафиксировать оценку
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create Jam Modal */}
      {showCreateJamModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-space-950/80 p-4 backdrop-blur-md">
          <div className="relative w-full max-w-xl max-h-[90dvh] overflow-y-auto overscroll-contain rounded-3xl border border-space-700 bg-space-900 p-6 sm:p-8 shadow-modal">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Trophy className="h-5 w-5 text-indigo-400" />
              Создание Startup Jam
            </h2>

            <form onSubmit={handleCreateJam} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
                  Название хакатона/джема *
                </label>
                <input
                  type="text"
                  required
                  value={newJamTitle}
                  onChange={(e) => setNewJamTitle(e.target.value)}
                  placeholder="например: AI for Healthcare Jam 2026"
                  className="w-full rounded-xl border border-space-700 bg-space-850 px-3 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
                  Тематика и вызов
                </label>
                <input
                  type="text"
                  required
                  value={newJamTheme}
                  onChange={(e) => setNewJamTheme(e.target.value)}
                  placeholder="например: Создайте AI продукт для помощи врачам"
                  className="w-full rounded-xl border border-space-700 bg-space-850 px-3 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
                  Призовой фонд (₸)
                </label>
                <input
                  type="text"
                  required
                  value={newJamPrize}
                  onChange={(e) => setNewJamPrize(e.target.value)}
                  placeholder="500 000 ₸"
                  className="w-full rounded-xl border border-space-700 bg-space-850 px-3 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div className="rounded-xl bg-space-850 p-3 text-[11px] text-slate-400 border border-space-750">
                🛡️ Средства призового фонда резервируются в смарт-эскроу платформы AI Startify и распределяются победителям по итогам оценивания.
              </div>

              <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-space-800">
                <button
                  type="button"
                  onClick={() => setShowCreateJamModal(false)}
                  className="rounded-xl border border-space-700 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-space-800"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-indigo-500 hover:bg-indigo-400 px-5 py-2 text-xs font-bold text-white shadow-sm"
                >
                  Опубликовать конкурс
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
