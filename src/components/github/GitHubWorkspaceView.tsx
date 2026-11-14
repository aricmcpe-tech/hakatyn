'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../lib/i18n';
import {
  GitBranch,
  GitCommit,
  GitPullRequest,
  AlertCircle,
  Folder,
  FileCode,
  FileText,
  ExternalLink,
  CheckCircle2,
  Shield,
  Bot,
  RefreshCw,
  Plus,
} from 'lucide-react';

export default function GitHubWorkspaceView() {
  const { currentUser, db, lang, setActiveTab } = useApp();
  const t = translations;

  const [activeRepoTab, setActiveRepoTab] = useState<'files' | 'commits' | 'issues' | 'prs'>('files');
  const [selectedFile, setSelectedFile] = useState<string>('README.md');
  const [isSyncing, setIsSyncing] = useState(false);

  // Active student's startup
  const startup = db.startups.find((s) => s.authorId === currentUser.id) || db.startups[0];
  const repo = startup.githubRepo;

  const fileTree = [
    { name: 'README.md', type: 'doc', size: '3.4 KB' },
    { name: 'requirements.txt', type: 'config', size: '1.2 KB' },
    { name: 'Dockerfile', type: 'config', size: '840 B' },
    { name: 'src/main.py', type: 'code', size: '4.8 KB' },
    { name: 'src/inference_onnx.py', type: 'code', size: '6.1 KB' },
    { name: 'src/pipeline_dataset.py', type: 'code', size: '3.9 KB' },
    { name: 'models/yolov8_nano.onnx', type: 'model', size: '12.4 MB' },
    { name: '.github/workflows/ci.yml', type: 'workflow', size: '1.1 KB' },
  ];

  const commitsList = [
    { hash: '8f4a1c9', message: 'feat: add offline quantized ONNX model for mobile inference', author: 'alikhan-dev', time: '14 часов назад' },
    { hash: '4b219e0', message: 'fix: optimize bounding box detection threshold to 0.72', author: 'alikhan-dev', time: 'Вчера' },
    { hash: '6d91bb2', message: 'docs: update dataset benchmark tables and mAP metrics', author: 'aizere-ui', time: '2 дня назад' },
    { hash: '1a90c4f', message: 'ci: add GitHub Actions workflow for linting & tests', author: 'timur-iot', time: '3 дня назад' },
    { hash: 'c5208f1', message: 'initial commit: model training pipeline on wheat rust dataset', author: 'alikhan-dev', time: '5 дней назад' },
  ];

  const issuesList = [
    { id: '#4', title: 'i18n: Add Kazakh & English localization for farmer UI', author: 'alikhan-dev', status: 'open', comments: 3 },
    { id: '#3', title: 'Edge camera FPS drop when temperature exceeds 35°C', author: 'timur-iot', status: 'open', comments: 5 },
    { id: '#2', title: 'Export trained model to TensorRT for Embedded Edge AI Accelerator', author: 'alikhan-dev', status: 'open', comments: 1 },
    { id: '#1', title: 'Initial dataset annotation guidelines', author: 'aizere-ui', status: 'closed', comments: 8 },
  ];

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-space-700 bg-gradient-to-r from-space-950 via-space-900 to-space-850 p-6 sm:p-8 shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-space-800 px-3 py-1 text-xs font-semibold text-slate-300 border border-space-700">
              <GitBranch className="h-3.5 w-3.5 text-cyan-400" />
              INTEGRATED REPO WORKSPACE
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-3">
              {t.github.title[lang]}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Синхронизация коммитов, веток, структуры файлов и проверка качества кода с AI Ментором.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleSync}
              disabled={isSyncing}
              className="flex items-center gap-2 rounded-2xl border border-space-700 bg-space-850 px-4 py-2.5 text-xs font-semibold text-slate-200 hover:bg-space-800 transition-all"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isSyncing ? 'animate-spin text-cyan-400' : ''}`} />
              <span>{isSyncing ? 'Синхронизация...' : 'Синхронизировать'}</span>
            </button>
            <a
              href={`https://github.com/${repo?.owner || 'alikhan-dev'}/${repo?.repo || 'qazaqagri-ai-engine'}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-2xl bg-white px-4 py-2.5 text-xs font-bold text-space-950 hover:bg-slate-200 transition-colors"
            >
              <span>Открыть на GitHub</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Privacy Guarantee Note */}
      <div className="rounded-2xl border border-cyan-500/20 bg-cyan-950/20 p-4 text-xs text-cyan-300 flex items-center gap-3">
        <Shield className="h-5 w-5 shrink-0 text-cyan-400" />
        <div>
          <strong className="text-white font-semibold">Контроль доступа к репозиторию:</strong>{' '}
          {t.github.privacyNote[lang]} Все токены шифруются на сервере.
        </div>
      </div>

      {/* Main Workspace Grid */}
      <div className="rounded-3xl border border-space-700 bg-space-900/90 shadow-xl overflow-hidden">
        
        {/* Subtabs */}
        <div className="flex border-b border-space-800 bg-space-950/60 p-2 overflow-x-auto gap-2">
          <button
            onClick={() => setActiveRepoTab('files')}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
              activeRepoTab === 'files'
                ? 'bg-space-800 text-white border border-space-700'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Folder className="h-4 w-4 text-amber-400" />
            <span>{t.github.files[lang]}</span>
          </button>
          <button
            onClick={() => setActiveRepoTab('commits')}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
              activeRepoTab === 'commits'
                ? 'bg-space-800 text-white border border-space-700'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <GitCommit className="h-4 w-4 text-cyan-400" />
            <span>{t.github.commits[lang]} ({commitsList.length})</span>
          </button>
          <button
            onClick={() => setActiveRepoTab('issues')}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
              activeRepoTab === 'issues'
                ? 'bg-space-800 text-white border border-space-700'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <AlertCircle className="h-4 w-4 text-emerald-400" />
            <span>{t.github.issues[lang]} ({issuesList.length})</span>
          </button>
          <button
            onClick={() => setActiveRepoTab('prs')}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
              activeRepoTab === 'prs'
                ? 'bg-space-800 text-white border border-space-700'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <GitPullRequest className="h-4 w-4 text-purple-400" />
            <span>{t.github.prs[lang]} (1)</span>
          </button>
        </div>

        {/* Tab 1: Files & README */}
        {activeRepoTab === 'files' && (
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-space-800 min-h-[420px]">
            {/* File List */}
            <div className="p-4 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-2 px-2">
                Файлы репозитория (main)
              </span>
              {fileTree.map((f) => (
                <button
                  key={f.name}
                  onClick={() => setSelectedFile(f.name)}
                  className={`w-full flex items-center justify-between rounded-xl px-3 py-2 text-xs transition-colors ${
                    selectedFile === f.name
                      ? 'bg-space-800 text-cyan-400 font-bold'
                      : 'text-slate-300 hover:bg-space-850'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    {f.type === 'doc' ? (
                      <FileText className="h-3.5 w-3.5 text-blue-400" />
                    ) : f.type === 'code' ? (
                      <FileCode className="h-3.5 w-3.5 text-cyan-400" />
                    ) : (
                      <Folder className="h-3.5 w-3.5 text-amber-400" />
                    )}
                    <span className="truncate font-mono">{f.name}</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">{f.size}</span>
                </button>
              ))}
            </div>

            {/* File Content / README Viewer */}
            <div className="md:col-span-2 p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-space-800">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-cyan-400" />
                  <span className="text-xs font-mono font-bold text-white">{selectedFile}</span>
                </div>
                <button
                  onClick={() => setActiveTab('aimentor')}
                  className="flex items-center gap-1.5 rounded-lg border border-purple-500/30 bg-purple-950/30 px-2.5 py-1 text-[11px] font-semibold text-purple-300 hover:bg-purple-900/40"
                >
                  <Bot className="h-3 w-3" />
                  <span>Объяснить код с AI Ментором</span>
                </button>
              </div>

              {selectedFile === 'README.md' ? (
                <div className="prose prose-invert max-w-none text-xs text-slate-300 space-y-3 leading-relaxed">
                  <h1 className="text-lg font-bold text-white"># QazaqAgri AI — Edge Computer Vision</h1>
                  <p>
                    Мобильная система ранней диагностики заболеваний озимой и яровой пшеницы.
                    Разработана школьной командой лицея №134 для фермерских хозяйств Казахстана.
                  </p>
                  <h2 className="text-sm font-bold text-cyan-400">## Архитектура модели</h2>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Базовая модель: <code>YOLOv8-nano</code> (обучена на 8,000 аугментированных снимках)</li>
                    <li>Квантование: INT8 ONNX Runtime для запуска на чипах MediaTek / Snapdragon без задержек</li>
                    <li>Средняя точность (mAP@50): <strong>94.6%</strong> на 18 типах поражений листа</li>
                  </ul>
                  <h2 className="text-sm font-bold text-cyan-400">## Запуск детектора</h2>
                  <pre className="rounded-xl bg-space-950 p-3 font-mono text-[11px] text-cyan-300 border border-space-800">
                    git clone https://github.com/alikhan-dev/qazaqagri-ai-engine.git{'\n'}
                    pip install -r requirements.txt{'\n'}
                    python src/inference_onnx.py --image field_sample.jpg
                  </pre>
                </div>
              ) : (
                <div className="rounded-xl bg-space-950 p-4 font-mono text-xs text-slate-300 border border-space-800 leading-relaxed overflow-x-auto">
                  <code>
                    # {selectedFile}{'\n'}
                    import torch{'\n'}
                    import onnxruntime as ort{'\n'}
                    {'\n'}
                    class WheatDiseaseDetector:{'\n'}
                    {'    '}def __init__(self, model_path="models/yolov8_nano.onnx"):{'\n'}
                    {'        '}self.session = ort.InferenceSession(model_path){'\n'}
                    {'        '}print("[OK] ONNX Runtime session loaded successfully."){'\n'}
                  </code>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Commits */}
        {activeRepoTab === 'commits' && (
          <div className="p-6 divide-y divide-space-800 font-mono text-xs">
            {commitsList.map((c) => (
              <div key={c.hash} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-cyan-950 px-2 py-0.5 text-[11px] font-bold text-cyan-400 border border-cyan-500/20">
                      {c.hash}
                    </span>
                    <span className="font-sans font-semibold text-white">{c.message}</span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-sans">
                    Автор: {c.author} • {c.time}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1 font-sans">
                    <CheckCircle2 className="h-3 w-3" /> Verified CI
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Issues */}
        {activeRepoTab === 'issues' && (
          <div className="p-6 space-y-3 text-xs">
            {issuesList.map((issue) => (
              <div
                key={issue.id}
                className="flex items-center justify-between rounded-2xl bg-space-850 p-4 border border-space-800"
              >
                <div className="flex items-center gap-3">
                  <AlertCircle className={`h-4 w-4 ${issue.status === 'open' ? 'text-emerald-400' : 'text-purple-400'}`} />
                  <div>
                    <h4 className="font-bold text-white">{issue.title}</h4>
                    <span className="text-[11px] text-slate-400">
                      {issue.id} открыт {issue.author} • {issue.comments} комментариев
                    </span>
                  </div>
                </div>
                <span className={`rounded-lg px-2.5 py-1 text-[10px] font-bold uppercase ${
                  issue.status === 'open' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-purple-500/10 text-purple-400'
                }`}>
                  {issue.status}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Tab 4: PRs */}
        {activeRepoTab === 'prs' && (
          <div className="p-6 text-xs space-y-3">
            <div className="flex items-center justify-between rounded-2xl bg-space-850 p-4 border border-space-800">
              <div className="flex items-center gap-3">
                <GitPullRequest className="h-4 w-4 text-purple-400" />
                <div>
                  <h4 className="font-bold text-white">#5: Support Edge TPU USB Accelerator</h4>
                  <span className="text-[11px] text-slate-400">Ветка: feature/edgetpu -&gt; main • Автор: timur-iot</span>
                </div>
              </div>
              <span className="rounded-lg bg-emerald-500/10 text-emerald-400 px-2.5 py-1 text-[10px] font-bold">
                Review Required
              </span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
