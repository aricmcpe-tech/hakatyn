'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../lib/i18n';
import { StartupCategory, StartupStage, StartupProject, OfferType } from '../../lib/types';
import {
  Search,
  Filter,
  Rocket,
  GitBranch,
  ExternalLink,
  Star,
  HandCoins,
  Send,
  Building,
  CheckCircle2,
  Clock,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Award,
  Sprout,
  Activity,
  SlidersHorizontal,
  ChevronDown,
} from 'lucide-react';
import { getDB } from '../../lib/db';

export default function InvestorDashboard() {
  const { db, lang, currentUser, setSelectedStartup, refreshDB } = useApp();
  const t = translations;

  // Search & filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStage, setSelectedStage] = useState<string>('all');
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'activity' | 'dev' | 'views'>('activity');

  // Offer modal state
  const [offerModalStartup, setOfferModalStartup] = useState<StartupProject | null>(null);
  const [offerType, setOfferType] = useState<OfferType>('prize_funding');
  const [offerTitle, setOfferTitle] = useState('');
  const [offerAmount, setOfferAmount] = useState('1 000 000 ₸');
  const [offerTerms, setOfferTerms] = useState('Без передачи доли (0% equity grant). Предоставление отчёта о пилотных тестах.');
  const [offerDesc, setOfferDesc] = useState('');
  const [contactSuccessMsg, setContactSuccessMsg] = useState<string | null>(null);

  // Watchlist
  const [watchlist, setWatchlist] = useState<string[]>(['startup-1']);

  const toggleWatchlist = (id: string) => {
    if (watchlist.includes(id)) {
      setWatchlist(watchlist.filter((x) => x !== id));
    } else {
      setWatchlist([...watchlist, id]);
    }
  };

  // Filtered startups
  const filteredStartups = db.startups
    .filter((s) => {
      if (selectedCategory !== 'all' && s.category !== selectedCategory) return false;
      if (selectedStage !== 'all' && s.stage !== selectedStage) return false;
      if (selectedCountry !== 'all' && s.country !== selectedCountry) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = s.title.toLowerCase().includes(q);
        const matchDesc = s.description.toLowerCase().includes(q);
        const matchTech = s.techStack.some((tech) => tech.toLowerCase().includes(q));
        const matchSchool = s.school.toLowerCase().includes(q);
        if (!matchTitle && !matchDesc && !matchTech && !matchSchool) return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'activity') return b.activityScore - a.activityScore;
      if (sortBy === 'dev') return b.devScore - a.devScore;
      return b.viewsCount - a.viewsCount;
    });

  // Investor offers sent by current user
  const myOffers = db.offers.filter((o) => o.investorId === currentUser.id);

  const handleCreateOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!offerModalStartup) return;

    const dbInst = getDB();
    dbInst.createOffer({
      investorId: currentUser.id,
      investorName: currentUser.name,
      investorAvatar: currentUser.avatar,
      investorOrg: currentUser.school || 'Venture Partner',
      startupId: offerModalStartup.id,
      startupTitle: offerModalStartup.title,
      type: offerType,
      title: offerTitle || `Поддержка проекта ${offerModalStartup.title}`,
      description: offerDesc || 'Финансирование и менторская поддержка для ускорения вывода продукта на рынок.',
      terms: offerTerms,
      amountOrValue: offerAmount,
      expirationDate: new Date(Date.now() + 30 * 86400000).toISOString(),
      parentalConsentRequired: true,
    });

    refreshDB();
    setOfferModalStartup(null);
    setContactSuccessMsg(`Предложение успешно отправлено команде «${offerModalStartup.title}»!`);
    setTimeout(() => setContactSuccessMsg(null), 4000);
  };

  const handleRequestIntro = (startup: StartupProject) => {
    setContactSuccessMsg(`Запрос на знакомство отправлен команде ${startup.title}.`);
    setTimeout(() => setContactSuccessMsg(null), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-3xl border border-space-800 bg-space-900/90 p-6 sm:p-8 shadow-card">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-md bg-amber-500/10 border border-amber-500/30 px-2.5 py-0.5 text-xs font-semibold text-amber-400">
              <ShieldCheck className="h-3.5 w-3.5" />
              INVESTOR & VENTURE PORTAL
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              {t.investor.title[lang]}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              {t.investor.subtitle[lang]}
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="rounded-2xl border border-space-800 bg-space-850 p-3.5 text-center min-w-[100px]">
              <span className="block text-xl font-bold text-white">{db.startups.length}</span>
              <span className="text-[11px] text-slate-400 font-sans">Стартапов</span>
            </div>
            <div className="rounded-2xl border border-space-800 bg-space-850 p-3.5 text-center min-w-[100px]">
              <span className="block text-xl font-bold text-amber-400">{myOffers.length}</span>
              <span className="text-[11px] text-slate-400 font-sans">Моих офферов</span>
            </div>
          </div>
        </div>
      </div>

      {contactSuccessMsg && (
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/40 p-4 text-xs font-semibold text-emerald-300 flex items-center gap-2 shadow-lg animate-fadeIn">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
          <span>{contactSuccessMsg}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="rounded-3xl border border-space-800 bg-space-900/90 p-4 sm:p-5 shadow-card space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск по названию, технологиям, проблеме или школе..."
              className="w-full rounded-xl border border-space-700 bg-space-850 pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="rounded-xl border border-space-700 bg-space-850 px-3 py-2 text-xs font-medium text-slate-200 focus:border-cyan-500 focus:outline-none"
            >
              <option value="all">{t.investor.allCategories[lang]}</option>
              <option value="AI & EdTech">AI & EdTech</option>
              <option value="GreenTech">GreenTech</option>
              <option value="MedTech">MedTech</option>
              <option value="FinTech">FinTech</option>
              <option value="Robotics">Robotics</option>
            </select>

            <select
              value={selectedStage}
              onChange={(e) => setSelectedStage(e.target.value)}
              className="rounded-xl border border-space-700 bg-space-850 px-3 py-2 text-xs font-medium text-slate-200 focus:border-cyan-500 focus:outline-none"
            >
              <option value="all">{t.investor.allStages[lang]}</option>
              <option value="Idea">Idea</option>
              <option value="Prototype">Prototype</option>
              <option value="MVP">MVP</option>
              <option value="Early Traction">Early Traction</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="rounded-xl border border-space-700 bg-space-850 px-3 py-2 text-xs font-medium text-slate-200 focus:border-cyan-500 focus:outline-none"
            >
              <option value="activity">По активности (Score)</option>
              <option value="dev">По качеству кода</option>
              <option value="views">По просмотрам</option>
            </select>
          </div>
        </div>
      </div>

      {/* Startups Catalog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStartups.map((startup) => {
          const isStarred = watchlist.includes(startup.id);
          const hasActivePromo = startup.promotions.some((p) => p.status === 'active');

          return (
            <div
              key={startup.id}
              className="rounded-2xl border border-space-800 bg-space-900/90 p-5 flex flex-col justify-between transition-card hover:border-space-700 shadow-card"
            >
              <div className="space-y-3">
                {/* Header: Title & Bookmark */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-space-800 border border-space-700 text-cyan-400 font-bold">
                      <Rocket className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white hover:text-cyan-400 transition-colors">
                        {startup.title}
                      </h3>
                      <p className="text-[11px] text-slate-400 truncate max-w-[170px]">{startup.school}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleWatchlist(startup.id)}
                    className="p-1 text-slate-500 hover:text-amber-400 transition-colors"
                    title={isStarred ? 'Удалить из избранного' : 'Добавить в избранное'}
                  >
                    <Star className={`h-4 w-4 ${isStarred ? 'fill-amber-400 text-amber-400' : ''}`} />
                  </button>
                </div>

                {/* Badges: Stage, Category, Promo */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="rounded bg-space-800 border border-space-700 px-2 py-0.5 text-[10px] font-bold text-cyan-400">
                    {startup.stage}
                  </span>
                  <span className="rounded bg-space-800 border border-space-700/60 px-2 py-0.5 text-[10px] text-slate-300">
                    {startup.category}
                  </span>
                  {hasActivePromo && (
                    <span className="rounded bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 text-[10px] font-bold text-amber-400">
                      Featured
                    </span>
                  )}
                </div>

                {/* Problem & Solution */}
                <div className="space-y-1.5 text-xs">
                  <div>
                    <span className="font-semibold text-rose-400">Проблема: </span>
                    <span className="text-slate-300 line-clamp-2 leading-relaxed">{startup.problem}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-emerald-400">Решение: </span>
                    <span className="text-slate-300 line-clamp-2 leading-relaxed">{startup.solution}</span>
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1">
                  {startup.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded bg-space-850 px-1.5 py-0.5 text-[10px] font-mono text-slate-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Activity & Dev Metrics */}
                <div className="grid grid-cols-3 gap-2 rounded-xl bg-space-850 p-2.5 text-center text-xs border border-space-800">
                  <div>
                    <span className="block font-mono font-bold text-cyan-400">{startup.devScore}</span>
                    <span className="text-[10px] text-slate-400">Dev Score</span>
                  </div>
                  <div>
                    <span className="block font-mono font-bold text-amber-400">{startup.activityScore}</span>
                    <span className="text-[10px] text-slate-400">Activity</span>
                  </div>
                  <div>
                    <span className="block font-mono font-bold text-white">{startup.githubRepo?.commitCount || 12}</span>
                    <span className="text-[10px] text-slate-400">Коммитов</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 space-y-2 pt-3 border-t border-space-800">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedStartup(startup)}
                    className="flex-1 rounded-xl bg-space-800 hover:bg-space-750 py-2 text-xs font-semibold text-white transition-colors"
                  >
                    Подробнее
                  </button>
                  <button
                    onClick={() => handleRequestIntro(startup)}
                    className="rounded-xl border border-space-700 hover:bg-space-800 px-3 py-2 text-xs font-semibold text-slate-300 transition-colors"
                  >
                    Знакомство
                  </button>
                </div>
                <button
                  onClick={() => setOfferModalStartup(startup)}
                  className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 py-2 text-xs font-bold text-space-950 transition-colors shadow-sm"
                >
                  <HandCoins className="h-3.5 w-3.5" />
                  Предложить финансирование / ресурсы
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Investor Offers Section */}
      <div className="rounded-3xl border border-space-800 bg-space-900/90 p-6 shadow-card space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <HandCoins className="h-5 w-5 text-amber-400" />
          <span>{t.investor.myOffers[lang]}</span>
          <span className="text-xs font-mono text-slate-500">({myOffers.length})</span>
        </h2>

        <div className="divide-y divide-space-800">
          {myOffers.map((offer) => (
            <div key={offer.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm">{offer.title}</span>
                  <span className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase ${
                    offer.status === 'accepted'
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : offer.status === 'declined'
                      ? 'bg-rose-500/20 text-rose-400'
                      : 'bg-amber-500/20 text-amber-400'
                  }`}>
                    {offer.status}
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Стартап: <span className="text-cyan-400 font-semibold">{offer.startupTitle}</span> • Условия: {offer.terms}
                </p>
                <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono">
                  <span>Сумма: {offer.amountOrValue}</span>
                  <span>•</span>
                  <span>Создан: {new Date(offer.created_at).toLocaleDateString()}</span>
                  {offer.parentalConsentRequired && (
                    <span className="text-amber-400/90 font-sans">• Требуется согласие родителя</span>
                  )}
                </div>
              </div>

              <div className="shrink-0 flex items-center gap-2 text-xs">
                <span className="rounded-xl bg-space-850 border border-space-750 px-3 py-1.5 text-slate-300 font-mono">
                  ID: {offer.id.slice(0, 10)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Offer Modal */}
      {offerModalStartup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-space-950/80 p-4 backdrop-blur-md">
          <div className="relative w-full max-w-xl max-h-[90dvh] overflow-y-auto overscroll-contain rounded-3xl border border-amber-500/30 bg-space-900 p-5 sm:p-8 shadow-modal">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <HandCoins className="h-5 w-5 text-amber-400" />
              Инвестиционное предложение для {offerModalStartup.title}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Официальное предложение поддержки школьного стартапа с фиксацией в журнале аудита.
            </p>

            <form onSubmit={handleCreateOffer} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
                  Тип поддержки
                </label>
                <select
                  value={offerType}
                  onChange={(e) => setOfferType(e.target.value as OfferType)}
                  className="w-full rounded-xl border border-space-700 bg-space-850 px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                >
                  <option value="monetary_funding">Денежное финансирование (Seed)</option>
                  <option value="prize_funding">Грантовое финансирование (0% equity grant)</option>
                  <option value="equipment">Предоставление оборудования (Hardware/IoT)</option>
                  <option value="cloud_resources">Облачные ресурсы и GPU (Cloud Credits)</option>
                  <option value="mentorship">Менторская программа (1-на-1 трекинг)</option>
                  <option value="promotion_support">Помощь с продвижением и выходом на рынок</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
                  Название предложения
                </label>
                <input
                  type="text"
                  required
                  value={offerTitle}
                  onChange={(e) => setOfferTitle(e.target.value)}
                  placeholder="например: Стартовый грант на полевые испытания"
                  className="w-full rounded-xl border border-space-700 bg-space-850 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
                  Сумма или эквивалентная стоимость
                </label>
                <input
                  type="text"
                  required
                  value={offerAmount}
                  onChange={(e) => setOfferAmount(e.target.value)}
                  placeholder="например: 1 500 000 ₸ или 2x High-Perf GPU Workstations"
                  className="w-full rounded-xl border border-space-700 bg-space-850 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
                  Условия и требования
                </label>
                <textarea
                  rows={2}
                  value={offerTerms}
                  onChange={(e) => setOfferTerms(e.target.value)}
                  className="w-full rounded-xl border border-space-700 bg-space-850 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="rounded-xl border border-space-750 bg-space-850 p-3 text-[11px] text-slate-400">
                🔒 <strong className="text-slate-200">Безопасность несовершеннолетних:</strong> Финансовые выплаты несовершеннолетним участникам требуют подтверждения со стороны родителя или законного представителя.
              </div>

              <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-space-800">
                <button
                  type="button"
                  onClick={() => setOfferModalStartup(null)}
                  className="rounded-xl border border-space-700 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-space-800"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-amber-500 hover:bg-amber-400 px-5 py-2 text-xs font-bold text-space-950 transition-colors shadow-sm"
                >
                  Отправить предложение команде
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
