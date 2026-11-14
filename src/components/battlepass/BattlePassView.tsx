'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../lib/i18n';
import {
  Gamepad2,
  Trophy,
  Coins,
  Sparkles,
  Lock,
  Unlock,
  CheckCircle2,
  Flame,
  Award,
  Crown,
  Star,
  Zap,
  Gift,
  Shield,
} from 'lucide-react';

export default function BattlePassView() {
  const {
    currentUser,
    db,
    lang,
    claimQuest,
    claimBattlePassTier,
  } = useApp();

  const t = translations;

  // Filter quests
  const dailyQuests = db.battlePassQuests.filter((q) => q.type === 'daily');
  const weeklyQuests = db.battlePassQuests.filter((q) => q.type === 'weekly');
  const specialQuests = db.battlePassQuests.filter((q) => q.type === 'special');

  return (
    <div className="space-y-6">
      {/* Season 01 Hero */}
      <div className="rounded-3xl border border-space-800 bg-space-900/90 p-6 sm:p-8 shadow-card">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-md bg-purple-500/10 border border-purple-500/30 px-2.5 py-0.5 text-xs font-bold text-purple-300">
                <Crown className="h-3.5 w-3.5 text-amber-400" />
                BATTLE PASS • SEASON 01
              </span>
              <span className="rounded-md bg-space-800 border border-space-700 px-2 py-0.5 text-xs font-mono text-slate-400">
                Осталось 32 дня
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              {t.battlepass.seasonName[lang]}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Выполняйте ежедневные задачи, развивайте стартап, закрывайте коммиты и открывайте эксклюзивные награды экосистемы.
            </p>
          </div>

          <div className="rounded-2xl border border-space-750 bg-space-850 p-4 sm:p-5 shadow-sm text-right shrink-0 min-w-[200px]">
            <span className="text-xs uppercase font-semibold text-slate-400 block">
              Текущий прогресс
            </span>
            <div className="flex items-center justify-end gap-2 mt-1">
              <span className="text-3xl font-black text-cyan-400 font-mono">LVL {currentUser.level}</span>
              <span className="text-xs font-bold text-slate-400">/ 20</span>
            </div>
            <p className="text-[11px] text-amber-400 font-semibold mt-1">
              Founder Pass Active ⭐
            </p>
          </div>
        </div>
      </div>

      {/* Battle Pass Progression Track (Levels 1 - 7) */}
      <div className="rounded-3xl border border-space-800 bg-space-900/90 p-6 shadow-card space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Trophy className="h-4 w-4 text-amber-400" />
              <span>Шкала наград сезона</span>
            </h2>
            <p className="text-xs text-slate-400">Два трека: Free для всех участников и Founder для активных создателей</p>
          </div>
        </div>

        <div className="overflow-x-auto pb-4">
          <div className="flex gap-4 min-w-[780px]">
            {db.battlePassTiers.map((tier) => {
              const isUnlocked = currentUser.level >= tier.level;

              return (
                <div
                  key={tier.level}
                  className={`flex-1 rounded-2xl border p-4 flex flex-col justify-between transition-all ${
                    isUnlocked
                      ? 'border-cyan-500/40 bg-space-850 shadow-sm'
                      : 'border-space-800 bg-space-900/50 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between pb-2 border-b border-space-800 mb-3">
                    <span className="text-xs font-bold font-mono text-cyan-400">LVL {tier.level}</span>
                    {isUnlocked ? (
                      <Unlock className="h-3.5 w-3.5 text-emerald-400" />
                    ) : (
                      <Lock className="h-3.5 w-3.5 text-slate-500" />
                    )}
                  </div>

                  {/* Free Reward */}
                  <div className="space-y-1.5 mb-3">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Free Reward</span>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
                      <Gift className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                      <span className="truncate">{tier.freeReward.title}</span>
                    </div>
                    {tier.claimedFree ? (
                      <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" /> {t.battlepass.claimed[lang]}
                      </span>
                    ) : isUnlocked ? (
                      <button
                        onClick={() => claimBattlePassTier(tier.level, 'free')}
                        className="rounded-lg bg-cyan-500 hover:bg-cyan-400 px-2 py-1 text-[10px] font-bold text-space-950 w-full mt-1 transition-colors"
                      >
                        Забрать
                      </button>
                    ) : (
                      <span className="text-[10px] text-slate-500">Заблокировано</span>
                    )}
                  </div>

                  {/* Founder Reward */}
                  <div className="space-y-1.5 pt-2 border-t border-space-800">
                    <span className="text-[10px] uppercase font-bold text-amber-400 block">Founder Track</span>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
                      <Crown className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                      <span className="truncate">{tier.founderReward.title}</span>
                    </div>
                    {tier.claimedFounder ? (
                      <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" /> {t.battlepass.claimed[lang]}
                      </span>
                    ) : isUnlocked ? (
                      <button
                        onClick={() => claimBattlePassTier(tier.level, 'founder')}
                        className="rounded-lg bg-amber-500 hover:bg-amber-400 px-2 py-1 text-[10px] font-bold text-space-950 w-full mt-1 transition-colors"
                      >
                        Забрать
                      </button>
                    ) : (
                      <span className="text-[10px] text-slate-500">Заблокировано</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quests Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Daily Quests */}
        <div className="rounded-3xl border border-space-800 bg-space-900/90 p-5 shadow-card space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-space-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <Flame className="h-4 w-4 text-cyan-400" />
              <span>{t.battlepass.dailyQuests[lang]}</span>
            </h3>
            <span className="text-[10px] text-slate-500 font-mono">Обновление 11 ч.</span>
          </div>

          <div className="space-y-3">
            {dailyQuests.map((quest) => (
              <div
                key={quest.id}
                className="rounded-2xl border border-space-800 bg-space-850 p-3.5 space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-xs font-bold text-white">{quest.title[lang]}</h4>
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
                    <span className="text-slate-500 flex items-center gap-1 font-semibold">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> Получено
                    </span>
                  ) : quest.completed ? (
                    <button
                      onClick={() => claimQuest(quest.id)}
                      className="rounded-lg bg-cyan-500 hover:bg-cyan-400 px-3 py-1 text-[10px] font-bold text-space-950 transition-colors"
                    >
                      Забрать
                    </button>
                  ) : (
                    <span className="text-slate-400">В процессе</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Quests */}
        <div className="rounded-3xl border border-space-800 bg-space-900/90 p-5 shadow-card space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-space-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <Award className="h-4 w-4 text-purple-400" />
              <span>{t.battlepass.weeklyQuests[lang]}</span>
            </h3>
            <span className="text-[10px] text-slate-500 font-mono">4 дня</span>
          </div>

          <div className="space-y-3">
            {weeklyQuests.map((quest) => (
              <div
                key={quest.id}
                className="rounded-2xl border border-space-800 bg-space-850 p-3.5 space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-xs font-bold text-white">{quest.title[lang]}</h4>
                  <span className="font-mono text-xs font-bold text-purple-400 shrink-0">
                    +{quest.quasarReward} Quasar
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-normal">{quest.description[lang]}</p>

                <div className="flex items-center justify-between pt-2 border-t border-space-800 text-[11px]">
                  <span className="text-slate-500 font-mono">
                    {quest.currentCount}/{quest.targetCount}
                  </span>
                  {quest.claimed ? (
                    <span className="text-slate-500 flex items-center gap-1 font-semibold">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> Получено
                    </span>
                  ) : quest.completed ? (
                    <button
                      onClick={() => claimQuest(quest.id)}
                      className="rounded-lg bg-purple-500 hover:bg-purple-400 px-3 py-1 text-[10px] font-bold text-white transition-colors"
                    >
                      Забрать
                    </button>
                  ) : (
                    <span className="text-slate-400">В процессе</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Special Quests */}
        <div className="rounded-3xl border border-space-800 bg-space-900/90 p-5 shadow-card space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-space-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <Trophy className="h-4 w-4 text-amber-400" />
              <span>{t.battlepass.specialQuests[lang]}</span>
            </h3>
            <span className="text-[10px] text-slate-500 font-mono">Сезонные</span>
          </div>

          <div className="space-y-3">
            {specialQuests.map((quest) => (
              <div
                key={quest.id}
                className="rounded-2xl border border-space-800 bg-space-850 p-3.5 space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-xs font-bold text-white">{quest.title[lang]}</h4>
                  <span className="font-mono text-xs font-bold text-amber-400 shrink-0">
                    +{quest.quasarReward} Quasar
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-normal">{quest.description[lang]}</p>

                <div className="flex items-center justify-between pt-2 border-t border-space-800 text-[11px]">
                  <span className="text-slate-500 font-mono">
                    {quest.currentCount}/{quest.targetCount}
                  </span>
                  {quest.claimed ? (
                    <span className="text-slate-500 flex items-center gap-1 font-semibold">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> Получено
                    </span>
                  ) : quest.completed ? (
                    <button
                      onClick={() => claimQuest(quest.id)}
                      className="rounded-lg bg-amber-500 hover:bg-amber-400 px-3 py-1 text-[10px] font-bold text-space-950 transition-colors"
                    >
                      Забрать
                    </button>
                  ) : (
                    <span className="text-slate-400">В процессе</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
