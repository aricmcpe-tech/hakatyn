'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../lib/i18n';
import { AIMessage, askAIMentor } from '../../lib/ai-service';
import { AIAgentProposal } from '../../lib/types';
import {
  Bot,
  Send,
  Sparkles,
  Lightbulb,
  Cpu,
  BarChart3,
  Presentation,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RotateCcw,
  Terminal,
  Code2,
  Check,
  User,
} from 'lucide-react';

export default function AIMentorView() {
  const { db, lang, currentUser, refreshDB } = useApp();
  const t = translations;

  // Active student project context
  const myProjects = db.startups.filter((s) => s.authorId === currentUser.id);
  const [selectedProjectId, setSelectedProjectId] = useState<string>(myProjects[0]?.id || db.startups[0].id);
  const activeProject = db.startups.find((s) => s.id === selectedProjectId) || db.startups[0];

  const [mode, setMode] = useState<'idea' | 'tech' | 'business' | 'pitch'>('tech');
  const [inputMsg, setInputMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Chat conversation state
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      role: 'assistant',
      content: lang === 'kk'
        ? `Сәлем, ${currentUser.name}! Мен — AI Startify Менторымын. Сіздің «${activeProject.title}» стартапыңызды талдап жатырмын. Бүгін архитектура, GitHub немесе инвестор питчі бойынша не талқылаймыз?`
        : lang === 'en'
        ? `Hello ${currentUser.name}! I am your AI Startify Mentor. I am actively tracking "${activeProject.title}". What would you like to build or optimize today?`
        : `Привет, ${currentUser.name}! Я твой персональный AI Ментор платформы AI Startify. Я держу в фокусе стартап «${activeProject.title}» (стадия: ${activeProject.stage}, стек: ${activeProject.techStack.join(', ')}). Чем займёмся сегодня: архитектурой, кодом, питчем или подготовкой к Startup Jam?`,
    },
  ]);

  // Agent proposals
  const [activeProposals, setActiveProposals] = useState<AIAgentProposal[]>(db.agentProposals);
  const [executionNotice, setExecutionNotice] = useState<string | null>(null);

  const starterPrompts = [
    'Проанализировать архитектуру проекта и стек',
    'Как оптимизировать инференс для мобильных устройств?',
    'Подготовить 10 слайдов для инвесторского питча',
    'Сформировать заявку на конкурс Startup Jam',
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMsg).trim();
    if (!text || isLoading) return;

    setInputMsg('');
    const newHistory: AIMessage[] = [...messages, { role: 'user', content: text }];
    setMessages(newHistory);
    setIsLoading(true);

    try {
      const res = await askAIMentor(
        newHistory,
        mode,
        lang,
        {
          title: activeProject.title,
          stage: activeProject.stage,
          techStack: activeProject.techStack,
          description: activeProject.description,
          githubRepo: activeProject.githubRepo ? `${activeProject.githubRepo.owner}/${activeProject.githubRepo.repo}` : undefined,
        }
      );

      setMessages([...newHistory, { role: 'assistant', content: res.content }]);

      if (res.proposal) {
        setActiveProposals((prev) => [res.proposal!, ...prev]);
      }
    } catch (err) {
      console.error('Chat error:', err);
      setMessages([
        ...newHistory,
        {
          role: 'assistant',
          content: 'Произошла временная ошибка сети. Пожалуйста, повторите запрос.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApproveProposal = (prop: AIAgentProposal) => {
    prop.status = 'approved';
    setExecutionNotice(`Действие «${prop.title}» успешно одобрено и применено к проекту ${activeProject.title}!`);
    setTimeout(() => setExecutionNotice(null), 5000);
    refreshDB();
  };

  const handleDismissProposal = (prop: AIAgentProposal) => {
    prop.status = 'dismissed';
    setActiveProposals(activeProposals.filter((p) => p.id !== prop.id));
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-3xl border border-space-800 bg-space-900/90 p-6 sm:p-8 shadow-card">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-md bg-cyan-500/10 border border-cyan-500/30 px-2.5 py-0.5 text-xs font-semibold text-cyan-400">
              <Bot className="h-3.5 w-3.5" />
              INTELLIGENT STARTUP COPILOT
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              {t.aimentor.title[lang]}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              {t.aimentor.subtitle[lang]}
            </p>
          </div>

          <div className="flex w-full flex-col gap-2 rounded-2xl border border-space-800 bg-space-850 p-2.5 text-xs sm:w-auto sm:flex-row sm:items-center">
            <span className="shrink-0 font-medium text-slate-400">Контекст стартапа:</span>
            <select
              value={selectedProjectId}
              onChange={(e) => setSelectedProjectId(e.target.value)}
              className="w-full min-w-0 rounded-xl border border-space-700 bg-space-900 px-3 py-1.5 text-xs font-bold text-cyan-400 focus:outline-none sm:w-auto"
            >
              {db.startups.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.title} ({s.stage})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {executionNotice && (
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/40 p-4 text-xs font-semibold text-emerald-300 flex items-center gap-2 shadow-lg animate-fadeIn">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
          <span>{executionNotice}</span>
        </div>
      )}

      {/* Main Grid: Chat Window (Left 2/3) & Agent Proposals (Right 1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Chat Window */}
        <div className="lg:col-span-2 flex flex-col justify-between rounded-3xl border border-space-800 bg-space-900/90 shadow-card overflow-hidden min-h-[460px] sm:min-h-[580px]">
          
          {/* Modes Toolbar */}
          <div className="flex border-b border-space-800 bg-space-950/60 p-2 overflow-x-auto no-scrollbar touch-scroll gap-1">
            <button
              onClick={() => setMode('idea')}
              className={`shrink-0 whitespace-nowrap flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold transition-all ${
                mode === 'idea'
                  ? 'bg-space-800 text-white border border-space-700 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Lightbulb className="h-3.5 w-3.5 text-amber-400" />
              <span>{t.aimentor.modeIdea[lang]}</span>
            </button>
            <button
              onClick={() => setMode('tech')}
              className={`shrink-0 whitespace-nowrap flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold transition-all ${
                mode === 'tech'
                  ? 'bg-space-800 text-white border border-space-700 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Cpu className="h-3.5 w-3.5 text-cyan-400" />
              <span>{t.aimentor.modeTech[lang]}</span>
            </button>
            <button
              onClick={() => setMode('business')}
              className={`shrink-0 whitespace-nowrap flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold transition-all ${
                mode === 'business'
                  ? 'bg-space-800 text-white border border-space-700 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BarChart3 className="h-3.5 w-3.5 text-emerald-400" />
              <span>{t.aimentor.modeBusiness[lang]}</span>
            </button>
            <button
              onClick={() => setMode('pitch')}
              className={`shrink-0 whitespace-nowrap flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold transition-all ${
                mode === 'pitch'
                  ? 'bg-space-800 text-white border border-space-700 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Presentation className="h-3.5 w-3.5 text-purple-400" />
              <span>{t.aimentor.modePitch[lang]}</span>
            </button>
          </div>

          {/* Quick Starter Prompts */}
          <div className="px-4 py-2.5 border-b border-space-800/80 bg-space-950/40 flex items-center gap-2 overflow-x-auto no-scrollbar touch-scroll">
            <span className="text-[10px] font-bold uppercase text-slate-500 shrink-0">Подсказки:</span>
            {starterPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                disabled={isLoading}
                className="shrink-0 rounded-lg bg-space-850 hover:bg-space-800 border border-space-750 px-2.5 py-1 text-[11px] text-slate-300 hover:text-white transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-4 sm:p-5 space-y-4 overflow-y-auto overscroll-contain max-h-[45dvh] sm:max-h-[440px]">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-3 text-xs ${
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.role === 'assistant' && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-space-800 text-cyan-400 border border-space-700">
                    <Bot className="h-4 w-4" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] rounded-2xl p-4 whitespace-pre-wrap leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-cyan-500 text-space-950 font-semibold'
                      : 'bg-space-850 text-slate-200 border border-space-800'
                  }`}
                >
                  {msg.content}
                </div>
                {msg.role === 'user' && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-space-800 text-slate-300 border border-space-700">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3 items-center text-xs text-cyan-400 animate-pulse">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-space-800 text-cyan-400 border border-space-700">
                  <Bot className="h-4 w-4 animate-spin" />
                </div>
                <span>AI Ментор анализирует запрос и генерирует рекомендацию...</span>
              </div>
            )}
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 border-t border-space-800 bg-space-950 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              placeholder="Задайте вопрос по архитектуре, коду, питчу или попросите составить задачу..."
              className="flex-1 rounded-2xl border border-space-700 bg-space-850 px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
            />
            <button
              type="submit"
              disabled={isLoading || !inputMsg.trim()}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 text-space-950 font-bold transition-all shadow-sm"
              aria-label="Отправить"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>

        </div>

        {/* Right: Agent Proposals (Requires Explicit User Consent) */}
        <div className="space-y-6">
          <div className="rounded-3xl border border-space-800 bg-space-900/90 p-5 shadow-card space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-space-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
                <Terminal className="h-4 w-4 text-cyan-400" />
                <span>{t.aimentor.agentProposals[lang]}</span>
              </h3>
              <span className="rounded bg-space-800 px-2 py-0.5 text-[10px] font-mono font-bold text-cyan-400">
                Agent Action
              </span>
            </div>

            <p className="text-[11px] text-slate-400 leading-normal">
              {t.aimentor.requiresConsent[lang]}
            </p>

            <div className="space-y-3">
              {activeProposals.filter((p) => p.status === 'pending').map((prop) => (
                <div
                  key={prop.id}
                  className="rounded-2xl border border-space-700 bg-space-850 p-4 space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-xs font-bold text-white leading-tight">{prop.title}</h4>
                    <span className="rounded bg-space-800 border border-space-700 px-1.5 py-0.5 text-[9px] font-mono text-cyan-400 uppercase">
                      Action
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed bg-space-900 p-2.5 rounded-xl border border-space-800">
                    {prop.preview}
                  </p>

                  <div className="flex items-center justify-end gap-2 pt-1 text-xs">
                    <button
                      onClick={() => handleDismissProposal(prop)}
                      className="rounded-lg border border-space-700 px-3 py-1.5 text-[10px] font-semibold text-slate-400 hover:text-white"
                    >
                      {t.aimentor.dismissAction[lang]}
                    </button>
                    <button
                      onClick={() => handleApproveProposal(prop)}
                      className="rounded-lg bg-emerald-500 hover:bg-emerald-400 px-3.5 py-1.5 text-[10px] font-bold text-space-950 transition-colors shadow-sm"
                    >
                      {t.aimentor.approveAction[lang]}
                    </button>
                  </div>
                </div>
              ))}

              {activeProposals.filter((p) => p.status === 'pending').length === 0 && (
                <div className="py-8 text-center text-xs text-slate-500">
                  Все предложения обработаны. Вы можете попросить AI Ментора составить план или README прямо в чате!
                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
