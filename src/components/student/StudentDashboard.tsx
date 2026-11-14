'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../lib/i18n';
import {
  Rocket,
  Trophy,
  Coins,
  Bot,
  GitBranch,
  ArrowUpRight,
  Sparkles,
  Flame,
  CheckCircle2,
  Clock,
  ShieldCheck,
  HandCoins,
  Plus,
  Compass,
  Sprout,
  Activity,
  Layers,
  ChevronRight,
} from 'lucide-react';
import CreateProjectModal from '../projects/CreateProjectModal';

export default function StudentDashboard() {
  const {
    currentUser,
    db,
    lang,
    setActiveTab,
    setSelectedStartup,
    claimQuest,
  } = useApp();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [claimToast, setClaimToast] = useState<string | null>(null);
  const t = translations;

  // Student projects
  const myProjects = db.startups.filter((s) => s.authorId === currentUser.id);

  // Active Jam
  const activeJam = db.jams.find((j) => j.status === 'active') || db.jams[0];

  // Investor Offer for student's project
  const incomingOffer = db.offers.find((o) =>
    myProjects.some((p) => p.id === o.startupId && o.status === 'pending')
  );

  // Daily quests
  const dailyQuests = db.battlePassQuests.filter((q) => q.type === 'daily');

  const handleClaim = (questId: string, title: string, amount: number) => {
    const success = claimQuest(questId);
    if (success) {
      setClaimToast(`+${amount} Quasar зачислено за «${title}»!`);
      setTimeout(() => setClaimToast(null), 3500);
    }
  };

  return (
    <div className="space-y-6">
      {/* Hero Welcome Card */}
      <div className="rounded-3xl border border-space-800 bg-space-900/90 p-6 sm:p-8 shadow-card">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 px-2 py-0.5 text-xs font-semibold text-cyan-400">
                Кабинет основателя
              </span>
              <span className="inline-flex items-center gap-1 rounded-md bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 text-xs font-semibold text-amber-400">
                <Flame className="h-3 w-3" />
                Серия 7 дней
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              {currentUser.name ? `С возвращением, ${currentUser.name.split(' ')[0]}!` : t.student.heroTitle[lang]}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              {t.student.heroSubtitle[lang]}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 px-4 py-2.5 text-xs sm:text-sm font-bold text-space-950 transition-colors shadow-sm"
            >
              <Plus className="h-4 w-4" />
              <span>{t.student.createProject[lang]}</span>
            </button>
            <button
              onClick={() => setActiveTab('aimentor')}
              className="flex items-center gap-2 rounded-xl border border-space-700 bg-space-850 hover:bg-space-800 px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-200 transition-colors"
            >
              <Bot className="h-4 w-4 text-cyan-400" />
              <span>AI Ментор</span>
            </button>
          </div>
        </div>
      </div>

      {/* Claim Toast */}
      {claimToast && (
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/40 p-4 text-xs font-semibold text-emerald-300 flex items-center gap-2 shadow-lg animate-fadeIn">
          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>{claimToast}</span>
        </div>
      )}

      {/* Incoming Investor Offer Alert */}
      {incomingOffer && (
        <div className="rounded-2xl border border-amber-500/30 bg-amber-950/20 p-5 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
              <HandCoins className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Инвестиционное предложение
                </span>
                <span className="rounded bg-amber-500/20 px-2 py-0.5 text-[10px] font-bold text-amber-300 font-mono">
                  {incomingOffer.amountOrValue}
                </span>
              </div>
              <p className="text-sm font-bold text-white mt-1">{incomingOffer.title}</p>
              <p className="text-xs text-slate-400 mt-0.5">
                От: <span className="text-slate-200 font-semibold">{incomingOffer.investorName}</span> ({incomingOffer.investorOrg})
                для проекта <span className="text-cyan-400">{incomingOffer.startupTitle}</span>
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('investor-offers')}
            className="shrink-0 rounded-xl bg-amber-500 hover:bg-amber-400 px-4 py-2 text-xs font-bold text-space-950 transition-colors"
          >
            Рассмотреть предложение →
          </button>
        </div>
      )}

      {/* 4 Quick Stat Tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-space-800 bg-space-900/60 p-4 space-y-1">
          <span className="text-xs text-slate-400 font-medium">Мои стартапы</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold font-mono text-white">{myProjects.length}</span>
            <span className="text-[11px] font-semibold text-cyan-400">MVP</span>
          </div>
        </div>

        <div className="rounded-2xl border border-space-800 bg-space-900/60 p-4 space-y-1">
          <span className="text-xs text-slate-400 font-medium">Баланс Quasar</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold font-mono text-cyan-400">{currentUser.quasarBalance}</span>
            <button
              onClick={() => setActiveTab('wallet')}
              className="text-[11px] text-slate-400 hover:text-white"
            >
              Кошелёк →
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-space-800 bg-space-900/60 p-4 space-y-1">
          <span className="text-xs text-slate-400 font-medium">Battle Pass</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold font-mono text-white">Уровень {currentUser.level}</span>
            <span className="text-[11px] text-amber-400 font-semibold">Founder</span>
          </div>
        </div>

        <div className="rounded-2xl border border-space-800 bg-space-900/60 p-4 space-y-1">
          <span className="text-xs text-slate-400 font-medium">Startup Jam</span>
          <div className="flex items-baseline justify-between">
            <span className="text-sm font-bold text-emerald-400">Топ-3 Шорт-лист</span>
            <span className="text-[11px] text-slate-400">96/100</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Projects (Left 2/3) & Quests / Activity (Right 1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Projects Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Rocket className="h-4 w-4 text-cyan-400" />
                <span>{t.student.myProjects[lang]}</span>
                <span className="text-xs font-mono text-slate-500">({myProjects.length})</span>
              </h2>
            </div>
            <button
              onClick={() => setActiveTab('projects')}
              className="text-xs font-semibold text-cyan-400 hover:underline flex items-center gap-1"
            >
              Витрина проектов <ArrowUpRight className="h-3 w-3" />
            </button>
          </div>

          {/* Project Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {myProjects.map((project) => (
              <div
                key={project.id}
                className="rounded-2xl border border-space-800 bg-space-900/80 p-5 flex flex-col justify-between transition-card hover:border-space-700 shadow-card"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-space-800 border border-space-700 text-cyan-400 font-bold">
                        <Sprout className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white">{project.title}</h3>
                        <span className="inline-block rounded bg-space-800 border border-space-700 px-1.5 py-0.5 text-[10px] font-bold text-cyan-400 mt-0.5">
                          {project.stage}
                        </span>
                      </div>
                    </div>
                    {project.promotions.some((p) => p.status === 'active') && (
                      <span className="rounded-md bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 text-[10px] font-bold text-amber-400">
                        Featured
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {project.tagline || project.description}
                  </p>

                  {/* Tech stack chips */}
                  <div className="flex flex-wrap gap-1">
                    {project.techStack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md bg-space-800 border border-space-700/60 px-2 py-0.5 text-[10px] font-mono text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* GitHub Repo snippet */}
                  {project.githubRepo && (
                    <div className="flex items-center justify-between rounded-xl bg-space-850 p-2 text-[11px] text-slate-400 border border-space-800">
                      <div className="flex items-center gap-1.5 truncate">
                        <GitBranch className="h-3 w-3 text-slate-400 shrink-0" />
                        <span className="truncate text-slate-300 font-mono">
                          {project.githubRepo.owner}/{project.githubRepo.repo}
                        </span>
                      </div>
                      <span className="text-cyan-400 font-mono text-[10px] shrink-0">
                        {project.githubRepo.commitCount} коммитов
                      </span>
                    </div>
                  )}
                </div>

                {/* Footer metrics & actions */}
                <div className="mt-5 pt-3 border-t border-space-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3 text-slate-400 font-mono text-[11px]">
                    <span title="Dev Score">⚡ {project.devScore}</span>
                    <span title="Activity">🔥 {project.activityScore}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveTab('wallet')}
                      className="rounded-lg border border-space-700 px-2.5 py-1 text-[11px] font-semibold text-slate-300 hover:text-white hover:bg-space-800"
                    >
                      Продвинуть
                    </button>
                    <button
                      onClick={() => setSelectedStartup(project)}
                      className="rounded-lg bg-space-800 hover:bg-space-700 px-3 py-1 text-[11px] font-bold text-white transition-colors"
                    >
                      Открыть
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Active Startup Jam Banner */}
          {activeJam && (
            <div className="rounded-3xl border border-space-800 bg-space-900/80 p-6 shadow-card space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="rounded-md bg-indigo-500/10 border border-indigo-500/30 px-2 py-0.5 text-[10px] font-bold text-indigo-300 uppercase">
                      Активный конкурс
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-amber-400 font-medium">
                      <Clock className="h-3.5 w-3.5" />
                      Дедлайн: 18 Ноября
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white">{activeJam.title}</h3>
                  <p className="text-xs text-slate-400 max-w-xl">{activeJam.theme}</p>
                </div>

                <div className="sm:text-right shrink-0">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Призовой фонд</span>
                  <span className="text-xl font-bold text-amber-400 font-mono">{activeJam.prizePoolAmount}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-space-800 text-xs">
                <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  <span>Верифицированный смарт-эскроу</span>
                  <span>•</span>
                  <span>{activeJam.submissionsCount} команд участвует</span>
                </div>
                <button
                  onClick={() => setActiveTab('jams')}
                  className="rounded-xl bg-space-800 hover:bg-space-700 px-4 py-2 text-xs font-bold text-white transition-colors"
                >
                  Смотреть соревнование →
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Right Column: Quests & AI Shortcut */}
        <div className="space-y-6">
          
          {/* Daily Quests Box */}
          <div className="rounded-3xl border border-space-800 bg-space-900/80 p-5 shadow-card space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-space-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <Trophy className="h-4 w-4 text-amber-400" />
                <span>Ежедневные квесты</span>
              </h3>
              <button
                onClick={() => setActiveTab('battlepass')}
                className="text-[11px] text-cyan-400 font-semibold hover:underline"
              >
                Все квесты →
              </button>
            </div>

            <div className="space-y-3">
              {dailyQuests.map((quest) => (
                <div
                  key={quest.id}
                  className="rounded-2xl border border-space-800/80 bg-space-850/50 p-3.5 space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-xs font-bold text-white leading-tight">{quest.title[lang]}</h4>
                    <span className="font-mono text-xs font-bold text-cyan-400 shrink-0">
                      +{quest.quasarReward} Quasar
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-normal">{quest.description[lang]}</p>

                  <div className="flex items-center justify-between pt-2 border-t border-space-800 text-[11px]">
                    <span className="text-slate-500 font-mono">
                      {quest.currentCount}/{quest.targetCount}
                    </span>
                    {quest.claimed ? (
                      <span className="text-slate-500 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> Получено
                      </span>
                    ) : quest.completed ? (
                      <button
                        onClick={() => handleClaim(quest.id, quest.title[lang], quest.quasarReward)}
                        className="rounded-lg bg-cyan-500 hover:bg-cyan-400 px-3 py-1 text-[10px] font-bold text-space-950 transition-colors"
                      >
                        Забрать +{quest.quasarReward}
                      </button>
                    ) : (
                      <span className="text-slate-400">В процессе</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Mentor Quick Card */}
          <div className="rounded-3xl border border-space-800 bg-space-900/80 p-5 shadow-card space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-space-800 text-cyan-400 border border-space-700">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Персональный AI Ментор</h4>
                <p className="text-[11px] text-slate-400">Готов разобрать архитектуру и подготовить питч</p>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('aimentor')}
              className="w-full rounded-xl bg-space-800 hover:bg-space-700 py-2.5 text-xs font-bold text-white transition-colors text-center"
            >
              Открыть диалог с ментором →
            </button>
          </div>

        </div>

      </div>

      {showCreateModal && (
        <CreateProjectModal onClose={() => setShowCreateModal(false)} />
      )}
    </div>
  );
}
