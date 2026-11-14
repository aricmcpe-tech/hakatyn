'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import { StartupProject } from '../../lib/types';
import {
  X,
  Rocket,
  GitBranch,
  ExternalLink,
  Users,
  Award,
  TrendingUp,
  CheckCircle2,
  FileText,
  Calendar,
  ShieldCheck,
} from 'lucide-react';

interface Props {
  project: StartupProject;
  onClose: () => void;
}

export default function ProjectDetailModal({ project, onClose }: Props) {
  const { lang, setActiveTab } = useApp();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-space-950/80 p-4 backdrop-blur-md">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border border-cyan-500/30 bg-space-900 p-6 sm:p-8 shadow-2xl space-y-6">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 rounded-full p-2 text-slate-400 hover:bg-space-800 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-space-800">
          <div className="flex items-center gap-3.5">
            <span className="text-4xl">{project.logo}</span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-extrabold text-white">{project.title}</h2>
                <span className="rounded-lg bg-cyan-950 px-2 py-0.5 text-xs font-bold text-cyan-400 border border-cyan-500/30">
                  {project.stage}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">{project.school} • {project.category}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-xs font-bold text-space-950 shadow-quasar-sm hover:opacity-95"
              >
                <span>Live Demo</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>

        {/* Tagline & Overview */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-cyan-300 italic">«{project.tagline}»</h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
            {project.description}
          </p>
        </div>

        {/* Problem and Solution Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="rounded-2xl border border-rose-500/20 bg-rose-950/10 p-4 space-y-1.5">
            <h4 className="font-bold text-rose-400 uppercase tracking-wider text-[11px]">
              Проблема
            </h4>
            <p className="text-slate-300 leading-relaxed">{project.problem}</p>
          </div>
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/10 p-4 space-y-1.5">
            <h4 className="font-bold text-emerald-400 uppercase tracking-wider text-[11px]">
              Решение и УТП
            </h4>
            <p className="text-slate-300 leading-relaxed">{project.solution}</p>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
          <div className="rounded-2xl bg-space-850 p-3 border border-space-800">
            <span className="block font-mono font-bold text-cyan-400 text-lg">{project.devScore}</span>
            <span className="text-[10px] text-slate-400">Dev Score (Code Quality)</span>
          </div>
          <div className="rounded-2xl bg-space-850 p-3 border border-space-800">
            <span className="block font-mono font-bold text-amber-400 text-lg">{project.activityScore}</span>
            <span className="text-[10px] text-slate-400">Activity Score</span>
          </div>
          <div className="rounded-2xl bg-space-850 p-3 border border-space-800">
            <span className="block font-mono font-bold text-white text-lg">{project.verifiedMilestones}</span>
            <span className="text-[10px] text-slate-400">Verified Milestones</span>
          </div>
          <div className="rounded-2xl bg-space-850 p-3 border border-space-800">
            <span className="block font-mono font-bold text-purple-400 text-lg">{project.viewsCount}</span>
            <span className="text-[10px] text-slate-400">Просмотров в каталоге</span>
          </div>
        </div>

        {/* Tech Stack */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            Используемые технологии
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-xl bg-space-800 px-3 py-1 font-mono text-xs text-cyan-300 border border-space-700"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Team Members */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
            <Users className="h-4 w-4" />
            Команда основателей ({project.teamMembers.length})
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {project.teamMembers.map((m, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2.5 rounded-2xl bg-space-850 p-3 border border-space-800"
              >
                <img
                  src={m.avatar}
                  alt={m.name}
                  className="h-9 w-9 rounded-xl object-cover ring-1 ring-cyan-500/30"
                />
                <div>
                  <h5 className="text-xs font-bold text-white">{m.name}</h5>
                  <p className="text-[10px] text-slate-400">{m.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* GitHub & Activity */}
        {project.githubRepo && (
          <div className="rounded-2xl bg-space-850 p-4 border border-space-800 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white flex items-center gap-1.5">
                <GitBranch className="h-4 w-4 text-cyan-400" />
                Репозиторий GitHub: {project.githubRepo.owner}/{project.githubRepo.repo}
              </span>
              <span className="font-mono text-cyan-400 font-bold">
                {project.githubRepo.commitCount} коммитов
              </span>
            </div>
            <p className="text-slate-400 font-mono text-[11px]">
              Последний коммит ({project.githubRepo.lastCommitHash}): {project.githubRepo.lastCommitMessage}
            </p>
          </div>
        )}

        {/* Challenge History */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
            <Award className="h-4 w-4 text-amber-400" />
            История участия в челленджах и джемах
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.challengeHistory.map((ch, idx) => (
              <span
                key={idx}
                className="rounded-xl bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-300 border border-amber-500/20"
              >
                {ch}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
