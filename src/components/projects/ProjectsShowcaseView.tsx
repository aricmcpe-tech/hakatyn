'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../lib/i18n';
import { StartupCategory, StartupStage } from '../../lib/types';
import {
  Rocket,
  Search,
  Filter,
  ArrowUpRight,
  Sparkles,
  GitBranch,
  Flame,
} from 'lucide-react';
import CreateProjectModal from './CreateProjectModal';

export default function ProjectsShowcaseView() {
  const { db, lang, setSelectedStartup } = useApp();
  const t = translations;

  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState<string>('all');
  const [selectedStage, setSelectedStage] = useState<string>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const filtered = db.startups.filter((s) => {
    if (selectedCat !== 'all' && s.category !== selectedCat) return false;
    if (selectedStage !== 'all' && s.stage !== selectedStage) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        s.title.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.techStack.some((t) => t.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-r from-space-900 via-space-850 to-indigo-950/40 p-6 sm:p-8 shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-400 border border-cyan-500/20">
              <Rocket className="h-3.5 w-3.5" />
              STARTUP SHOWCASE & DEMO ARENA
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              {t.nav.projects[lang]}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Каталог стартапов, созданных школьниками и подростками. Реальные продукты, открытый код и готовые прототипы.
            </p>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3 text-xs sm:text-sm font-bold text-space-950 shadow-quasar-md hover:opacity-95 transition-all"
          >
            + Опубликовать свой стартап
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="rounded-3xl border border-space-700 bg-space-900/90 p-4 shadow-xl flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск по проектам и технологиям..."
            className="w-full rounded-2xl border border-space-700 bg-space-850 pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
          />
        </div>

        <div className="flex gap-2">
          <select
            value={selectedCat}
            onChange={(e) => setSelectedCat(e.target.value)}
            className="rounded-2xl border border-space-700 bg-space-850 px-3 py-2 text-xs text-slate-200 focus:outline-none"
          >
            <option value="all">Все категории</option>
            <option value="AI & EdTech">AI & EdTech</option>
            <option value="GreenTech">GreenTech</option>
            <option value="MedTech">MedTech</option>
            <option value="FinTech">FinTech</option>
            <option value="Robotics">Robotics</option>
          </select>

          <select
            value={selectedStage}
            onChange={(e) => setSelectedStage(e.target.value)}
            className="rounded-2xl border border-space-700 bg-space-850 px-3 py-2 text-xs text-slate-200 focus:outline-none"
          >
            <option value="all">Все стадии</option>
            <option value="Idea">Idea</option>
            <option value="Prototype">Prototype</option>
            <option value="MVP">MVP</option>
            <option value="Early Traction">Early Traction</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((startup) => {
          const isFeatured = startup.promotions.some((p) => p.status === 'active');

          return (
            <div
              key={startup.id}
              onClick={() => setSelectedStartup(startup)}
              className={`group flex flex-col justify-between rounded-3xl border bg-space-900/90 p-5 cursor-pointer transition-all hover:scale-[1.01] hover:shadow-2xl ${
                isFeatured
                  ? 'border-amber-500/40 shadow-quasar-sm'
                  : 'border-space-700 hover:border-cyan-500/50'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{startup.logo}</span>
                    <div>
                      <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors">
                        {startup.title}
                      </h3>
                      <p className="text-[11px] text-slate-400">{startup.school}</p>
                    </div>
                  </div>
                  {isFeatured && (
                    <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[9px] font-black uppercase text-amber-400 border border-amber-500/30">
                      Featured
                    </span>
                  )}
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <span className="rounded-lg bg-cyan-950 px-2 py-0.5 text-[10px] font-bold text-cyan-400 border border-cyan-500/20">
                    {startup.stage}
                  </span>
                  <span className="rounded-lg bg-space-800 px-2 py-0.5 text-[10px] text-slate-400">
                    {startup.category}
                  </span>
                </div>

                <p className="mt-3 text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  {startup.tagline}
                </p>

                <div className="mt-3 flex flex-wrap gap-1">
                  {startup.techStack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="rounded bg-space-850 px-2 py-0.5 text-[10px] font-mono text-slate-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between pt-3 border-t border-space-800 text-xs text-slate-400">
                <span className="font-mono flex items-center gap-1.5">
                  <Flame className="h-3.5 w-3.5 text-amber-400" />
                  {startup.activityScore} Activity
                </span>
                <span className="text-cyan-400 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Смотреть проект <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {showCreateModal && (
        <CreateProjectModal onClose={() => setShowCreateModal(false)} />
      )}
    </div>
  );
}
