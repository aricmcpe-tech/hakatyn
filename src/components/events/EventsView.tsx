'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../lib/i18n';
import {
  CalendarDays,
  MapPin,
  Plane,
  CheckCircle2,
  Clock,
  Send,
  Plus,
  ShieldCheck,
  Video,
  Building,
} from 'lucide-react';
import { getDB } from '../../lib/db';

export default function EventsView() {
  const { db, lang, currentUser, refreshDB } = useApp();
  const t = translations;

  const [showGrantModal, setShowGrantModal] = useState(false);
  const [grantDestination, setGrantDestination] = useState('г. Астана');
  const [grantEvent, setGrantEvent] = useState('Central Asia Young Founders Demo Day 2026');
  const [grantAmount, setGrantAmount] = useState('85 000 ₸');
  const [grantJustification, setGrantJustification] = useState('');
  const [grantSuccessMsg, setGrantSuccessMsg] = useState<string | null>(null);

  const handleRegisterEvent = (eventId: string) => {
    const ev = db.events.find((e) => e.id === eventId);
    if (ev && !ev.registeredUsers.includes(currentUser.id)) {
      ev.registeredUsers.push(currentUser.id);
      refreshDB();
    }
  };

  const handleApplyGrant = (e: React.FormEvent) => {
    e.preventDefault();
    if (!grantJustification.trim()) return;

    db.travelGrants.unshift({
      id: `grant-${Date.now()}`,
      studentId: currentUser.id,
      studentName: currentUser.name,
      eventName: grantEvent,
      destination: grantDestination,
      amountRequested: grantAmount,
      justification: grantJustification,
      status: 'submitted',
      parentalApprovalConfirmed: false,
      created_at: new Date().toISOString(),
    });

    refreshDB();
    setShowGrantModal(false);
    setGrantSuccessMsg('Заявка на Travel Grant успешно отправлена! Ожидает верификации оргкомитета и родителя.');
    setTimeout(() => setGrantSuccessMsg(null), 5000);
  };

  // User travel grants
  const myGrants = db.travelGrants.filter(
    (g) => g.studentId === currentUser.id || currentUser.role === 'admin'
  );

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-indigo-500/20 bg-gradient-to-r from-space-900 via-indigo-950/40 to-space-950 p-6 sm:p-8 shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-400 border border-indigo-500/20">
              <CalendarDays className="h-3.5 w-3.5" />
              GLOBAL SUMMITS & TRAVEL SUBSIDIES
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              {t.events.title[lang]}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              {t.events.subtitle[lang]}
            </p>
          </div>

          <button
            onClick={() => setShowGrantModal(true)}
            className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-500 px-5 py-3 text-xs sm:text-sm font-bold text-space-950 shadow-quasar-md hover:opacity-95 transition-all"
          >
            <Plane className="h-4 w-4" />
            {t.events.applyGrant[lang]}
          </button>
        </div>
      </div>

      {grantSuccessMsg && (
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/30 p-4 text-xs font-semibold text-emerald-300 flex items-center gap-2 shadow-lg">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
          <span>{grantSuccessMsg}</span>
        </div>
      )}

      {/* Events List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {db.events.map((ev) => {
          const isRegistered = ev.registeredUsers.includes(currentUser.id);

          return (
            <div
              key={ev.id}
              className="flex flex-col justify-between rounded-3xl border border-space-700 bg-space-900/90 p-5 shadow-xl transition-all hover:border-cyan-500/40 hover:shadow-quasar-sm"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="rounded-lg bg-indigo-950 px-2 py-0.5 text-[10px] font-bold uppercase text-indigo-400 border border-indigo-500/30">
                    {ev.type}
                  </span>
                  {ev.isOnline ? (
                    <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold">
                      <Video className="h-3.5 w-3.5" /> Online
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[11px] text-amber-400 font-semibold">
                      <Building className="h-3.5 w-3.5" /> In-person
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-white">{ev.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{ev.description}</p>

                <div className="space-y-1.5 pt-2 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                    <span>{new Date(ev.date).toLocaleDateString([], { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-rose-400 shrink-0" />
                    <span className="truncate">{ev.location}</span>
                  </div>
                </div>

                {ev.travelGrantAvailable && (
                  <div className="rounded-xl bg-indigo-950/30 p-2 text-[10px] text-indigo-300 border border-indigo-500/20 flex items-center gap-1.5">
                    <Plane className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                    <span>Доступен Travel Grant на поездку из регионов</span>
                  </div>
                )}
              </div>

              <div className="mt-5 pt-3 border-t border-space-800">
                {isRegistered ? (
                  <div className="flex items-center justify-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-950/20 py-2 text-xs font-bold text-emerald-400">
                    <CheckCircle2 className="h-4 w-4" />
                    {t.events.registered[lang]}
                  </div>
                ) : (
                  <button
                    onClick={() => handleRegisterEvent(ev.id)}
                    className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-2 text-xs font-bold text-space-950 shadow-quasar-sm hover:opacity-95"
                  >
                    {t.events.registerEvent[lang]}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Travel Grants Applications Section */}
      <div className="rounded-3xl border border-space-700 bg-space-900/90 p-6 shadow-xl space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Plane className="h-5 w-5 text-cyan-400" />
          {t.events.grantStatus[lang]} ({myGrants.length})
        </h2>

        <div className="divide-y divide-space-800 text-xs">
          {myGrants.map((grant) => (
            <div key={grant.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm">{grant.eventName}</span>
                  <span className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase ${
                    grant.status === 'approved'
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'bg-amber-500/20 text-amber-400'
                  }`}>
                    {grant.status}
                  </span>
                </div>
                <p className="text-slate-400">
                  Направление: {grant.destination} • Запрошено: <strong className="text-white font-mono">{grant.amountRequested}</strong>
                </p>
                <p className="text-[11px] text-slate-300">{grant.justification}</p>
              </div>

              <div className="flex items-center gap-2 text-slate-500 font-mono text-[11px]">
                {grant.parentalApprovalConfirmed ? (
                  <span className="text-emerald-400 flex items-center gap-1 font-sans">
                    <CheckCircle2 className="h-3 w-3" /> Родитель подтвердил
                  </span>
                ) : (
                  <span className="text-amber-400 font-sans">Ожидает согласия родителя</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Travel Grant Application Modal */}
      {showGrantModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-space-950/80 p-4 backdrop-blur-md">
          <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl border border-indigo-500/30 bg-space-900 p-6 sm:p-8 shadow-2xl">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Plane className="h-5 w-5 text-cyan-400" />
              Заявка на программу Travel Grants
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Финансовая помощь на проезд и проживание для очного участия в финалах хакатонов и Demo Day.
            </p>

            <form onSubmit={handleApplyGrant} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
                  Мероприятие
                </label>
                <select
                  value={grantEvent}
                  onChange={(e) => setGrantEvent(e.target.value)}
                  className="w-full rounded-xl border border-space-700 bg-space-850 px-3 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
                >
                  {db.events.map((e) => (
                    <option key={e.id} value={e.title}>
                      {e.title} ({e.location})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
                    Пункт назначения
                  </label>
                  <input
                    type="text"
                    required
                    value={grantDestination}
                    onChange={(e) => setGrantDestination(e.target.value)}
                    placeholder="г. Астана"
                    className="w-full rounded-xl border border-space-700 bg-space-850 px-3 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
                    Сумма расходов
                  </label>
                  <input
                    type="text"
                    required
                    value={grantAmount}
                    onChange={(e) => setGrantAmount(e.target.value)}
                    placeholder="85 000 ₸"
                    className="w-full rounded-xl border border-space-700 bg-space-850 px-3 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
                  Обоснование поездки и статус стартапа
                </label>
                <textarea
                  rows={3}
                  required
                  value={grantJustification}
                  onChange={(e) => setGrantJustification(e.target.value)}
                  placeholder="Опишите, какую роль вы выполняете в команде и какую пользу принесёт очная презентация..."
                  className="w-full rounded-xl border border-space-700 bg-space-850 px-3 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div className="rounded-xl bg-space-850 p-3 text-[11px] text-slate-400 border border-space-800">
                🔒 Для несовершеннолетних участников выплата гранта подтверждается законным представителем в родительском кабинете.
              </div>

              <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-space-800">
                <button
                  type="button"
                  onClick={() => setShowGrantModal(false)}
                  className="rounded-xl border border-space-700 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-space-800"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-cyan-500 px-5 py-2 text-xs font-bold text-space-950 hover:bg-cyan-400 shadow-md"
                >
                  Отправить заявку оргкомитету
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
