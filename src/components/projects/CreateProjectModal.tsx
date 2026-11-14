'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../lib/i18n';
import { StartupCategory, StartupStage } from '../../lib/types';
import { X, Sparkles, Rocket } from 'lucide-react';
import { getDB } from '../../lib/db';

interface Props {
  onClose: () => void;
}

export default function CreateProjectModal({ onClose }: Props) {
  const { currentUser, refreshDB, lang, setActiveTab } = useApp();
  const t = translations;

  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [category, setCategory] = useState<StartupCategory>('AI & EdTech');
  const [stage, setStage] = useState<StartupStage>('Prototype');
  const [problem, setProblem] = useState('');
  const [solution, setSolution] = useState('');
  const [techStackInput, setTechStackInput] = useState('Next.js, Python, TailwindCSS');
  const [repoName, setRepoName] = useState('my-startup-core');
  const [school, setSchool] = useState(currentUser.school || 'Лицей №134, г. Алматы');
  const [country, setCountry] = useState(currentUser.country || 'Казахстан');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !problem.trim() || !solution.trim()) return;

    const db = getDB();
    const techArray = techStackInput.split(',').map((s) => s.trim()).filter(Boolean);

    db.createStartup({
      authorId: currentUser.id,
      title,
      tagline: tagline || solution.slice(0, 80),
      logo: '🚀',
      coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
      description: `${problem}\n\nРешение:\n${solution}`,
      problem,
      solution,
      targetAudience: 'Школьники, образовательные учреждения и энтузиасты.',
      category,
      country,
      school,
      stage,
      teamMembers: [
        {
          name: currentUser.name,
          role: 'Founder & Tech Lead',
          avatar: currentUser.avatar,
          userId: currentUser.id,
        },
      ],
      techStack: techArray,
      demoUrl: `https://${title.toLowerCase().replace(/[^a-z0-9]/g, '')}-demo.startify.app`,
      pitchDeckUrl: 'https://startify.io/decks/new-founder-deck.pdf',
      githubRepo: {
        owner: currentUser.githubUsername || 'student-dev',
        repo: repoName,
        branch: 'main',
        lastCommitMessage: 'initial commit: bootstrap architecture & setup AI Startify 2.0 integration',
        lastCommitDate: new Date().toISOString(),
        lastCommitHash: '1a90c4f',
        commitCount: 1,
        openIssuesCount: 0,
        openPRsCount: 0,
        contributorsCount: 1,
        isPrivate: false,
        grantedInvestors: [],
      },
      challengeHistory: ['Новый проект в экосистеме'],
    });

    refreshDB();
    onClose();
    setActiveTab('projects');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-space-950/80 p-3 sm:p-4 backdrop-blur-md" role="dialog" aria-modal="true" aria-label="Создание проекта">
      <div className="relative w-full max-w-2xl max-h-[90dvh] overflow-y-auto overscroll-contain rounded-3xl border border-cyan-500/30 bg-space-900 p-5 sm:p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-5 sm:right-5 flex h-10 w-10 items-center justify-center rounded-full text-slate-400 hover:bg-space-800 hover:text-white transition-colors"
          aria-label="Закрыть"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2.5 mb-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-400">
            <Rocket className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-white">Создание стартапа</h2>
            <p className="text-xs text-cyan-400 font-medium">+200 Quasar начисляется за регистрацию проекта</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
              Название проекта *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="например: EduVision AI"
              className="w-full rounded-xl border border-space-700 bg-space-850 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
              Краткий слоган (Tagline)
            </label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="Короткая суть стартапа в одну строку"
              className="w-full rounded-xl border border-space-700 bg-space-850 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
                Категория
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as StartupCategory)}
                className="w-full rounded-xl border border-space-700 bg-space-850 px-4 py-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none"
              >
                <option value="AI & EdTech">AI & EdTech</option>
                <option value="GreenTech">GreenTech</option>
                <option value="MedTech">MedTech</option>
                <option value="FinTech">FinTech</option>
                <option value="Robotics">Robotics</option>
                <option value="AR/VR">AR/VR</option>
                <option value="Web3">Web3</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
                Стадия разработки
              </label>
              <select
                value={stage}
                onChange={(e) => setStage(e.target.value as StartupStage)}
                className="w-full rounded-xl border border-space-700 bg-space-850 px-4 py-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none"
              >
                <option value="Idea">Idea</option>
                <option value="Prototype">Prototype</option>
                <option value="MVP">MVP</option>
                <option value="Early Traction">Early Traction</option>
                <option value="Scaling">Scaling</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
              Какую проблему решает проект? *
            </label>
            <textarea
              required
              rows={2}
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              placeholder="Опишите боль целевой аудитории..."
              className="w-full rounded-xl border border-space-700 bg-space-850 px-4 py-2 text-sm text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
              Ваше решение и ценность *
            </label>
            <textarea
              required
              rows={2}
              value={solution}
              onChange={(e) => setSolution(e.target.value)}
              placeholder="Как продукт решает эту проблему..."
              className="w-full rounded-xl border border-space-700 bg-space-850 px-4 py-2 text-sm text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
                Технологический стек (через запятую)
              </label>
              <input
                type="text"
                value={techStackInput}
                onChange={(e) => setTechStackInput(e.target.value)}
                placeholder="Python, PyTorch, React, YOLOv8"
                className="w-full rounded-xl border border-space-700 bg-space-850 px-4 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
                Репозиторий GitHub
              </label>
              <input
                type="text"
                value={repoName}
                onChange={(e) => setRepoName(e.target.value)}
                placeholder="имя репозитория"
                className="w-full rounded-xl border border-space-700 bg-space-850 px-4 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-space-800">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-space-700 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-space-800"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2 text-xs font-bold text-space-950 shadow-quasar-sm hover:opacity-95"
            >
              <Sparkles className="h-4 w-4" />
              Опубликовать стартап (+200 Quasar)
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
