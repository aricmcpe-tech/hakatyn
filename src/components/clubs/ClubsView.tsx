'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../lib/i18n';
import { Club } from '../../lib/types';
import {
  Users2,
  Sparkles,
  MessageSquare,
  ThumbsUp,
  Plus,
  Shield,
  Lock,
  CheckCircle2,
  Bot,
  Zap,
} from 'lucide-react';

export default function ClubsView() {
  const { db, lang, currentUser, refreshDB } = useApp();
  const t = translations;

  const [selectedClub, setSelectedClub] = useState<Club>(db.clubs[0]);
  const [showPostModal, setShowPostModal] = useState(false);
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');

  const isMember = selectedClub.members.some((m) => m.userId === currentUser.id);

  const handleJoinClub = () => {
    if (!isMember) {
      selectedClub.members.push({
        userId: currentUser.id,
        role: 'member',
        joinedAt: new Date().toISOString(),
      });
      selectedClub.memberCount += 1;
      refreshDB();
    }
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle.trim() || !postContent.trim()) return;

    selectedClub.posts.unshift({
      id: `post-${Date.now()}`,
      authorId: currentUser.id,
      authorName: currentUser.isAnonymous ? currentUser.anonymousAlias : currentUser.name,
      authorAvatar: currentUser.avatar,
      title: postTitle,
      content: postContent,
      upvotes: 1,
      commentsCount: 0,
      created_at: new Date().toISOString(),
    });

    refreshDB();
    setShowPostModal(false);
    setPostTitle('');
    setPostContent('');
  };

  const handleUpvote = (postId: string) => {
    const post = selectedClub.posts.find((p) => p.id === postId);
    if (post) {
      post.upvotes += 1;
      refreshDB();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-r from-space-900 via-indigo-950/30 to-space-950 p-6 sm:p-8 shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-400 border border-cyan-500/20">
              <Users2 className="h-3.5 w-3.5" />
              PEER FOUNDER COMMUNITIES
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              {t.clubs.title[lang]}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              {t.clubs.subtitle[lang]}
            </p>
          </div>
        </div>
      </div>

      {/* Clubs Selector Horizontal Track */}
      <div className="flex gap-3 overflow-x-auto no-scrollbar touch-scroll pb-2">
        {db.clubs.map((club) => {
          const selected = selectedClub.id === club.id;
          return (
            <button
              key={club.id}
              onClick={() => setSelectedClub(club)}
              className={`shrink-0 rounded-2xl border p-4 text-left transition-all ${
                selected
                  ? 'border-cyan-500 bg-space-850 text-white shadow-quasar-sm'
                  : 'border-space-700 bg-space-900/80 text-slate-300 hover:border-space-600'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">{club.avatar}</span>
                <div>
                  <h4 className="text-xs font-bold text-white truncate max-w-[170px]">{club.name}</h4>
                  <p className="text-[10px] text-slate-400 font-mono mt-0.5">{club.memberCount} участников</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Club View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Posts & Discussions (Left 2/3) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-cyan-400" />
              Обсуждения и публикации ({selectedClub.posts.length})
            </h3>
            <button
              onClick={() => setShowPostModal(true)}
              className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-xs font-bold text-space-950 shadow-quasar-sm hover:opacity-95"
            >
              <Plus className="h-3.5 w-3.5" />
              {t.clubs.createPost[lang]}
            </button>
          </div>

          <div className="space-y-4">
            {selectedClub.posts.map((post) => (
              <div
                key={post.id}
                className="rounded-3xl border border-space-700 bg-space-900/90 p-5 shadow-xl space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={post.authorAvatar}
                      alt={post.authorName}
                      className="h-8 w-8 rounded-xl object-cover ring-1 ring-cyan-500/30"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-white">{post.authorName}</h4>
                      <p className="text-[10px] text-slate-500">
                        {new Date(post.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>

                <h3 className="text-sm font-bold text-white">{post.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-wrap">
                  {post.content}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-space-800 text-xs">
                  <button
                    onClick={() => handleUpvote(post.id)}
                    className="flex items-center gap-1.5 rounded-lg bg-space-850 px-3 py-1.5 text-slate-300 hover:text-cyan-400 transition-colors"
                  >
                    <ThumbsUp className="h-3.5 w-3.5" />
                    <span className="font-mono font-bold">{post.upvotes}</span>
                  </button>
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <MessageSquare className="h-3.5 w-3.5" />
                    {post.commentsCount} ответов
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Club Details & Perks (Right 1/3) */}
        <div className="space-y-6">
          <div className="rounded-3xl border border-space-700 bg-space-900/90 p-5 shadow-xl space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-space-800">
              <span className="text-4xl">{selectedClub.avatar}</span>
              <div>
                <h3 className="text-base font-bold text-white">{selectedClub.name}</h3>
                <p className="text-xs text-slate-400">{selectedClub.category}</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {selectedClub.description}
            </p>

            {/* Perks */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-2 flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5" />
                Бонусы и привилегии клуба:
              </h4>
              <div className="space-y-1.5">
                {selectedClub.perks.map((perk, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                    <span>{perk}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Membership Button */}
            <div className="pt-2">
              {isMember ? (
                <div className="flex items-center justify-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-950/20 py-2.5 text-xs font-bold text-emerald-400">
                  <CheckCircle2 className="h-4 w-4" />
                  {t.clubs.joined[lang]}
                </div>
              ) : (
                <button
                  onClick={handleJoinClub}
                  className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-2.5 text-xs font-bold text-space-950 shadow-quasar-sm hover:opacity-95"
                >
                  {t.clubs.joinClub[lang]}
                </button>
              )}
            </div>

            <div className="rounded-xl bg-space-850 p-3 text-[11px] text-slate-400 border border-space-800 flex items-center gap-2">
              <Shield className="h-4 w-4 text-cyan-400 shrink-0" />
              <span>Клуб модерируется. Платформа защищает школьников от спама и нежелательных контактов.</span>
            </div>
          </div>
        </div>

      </div>

      {/* New Post Modal */}
      {showPostModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-space-950/80 p-4 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-3xl border border-cyan-500/30 bg-space-900 p-6 sm:p-8 shadow-2xl">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-cyan-400" />
              Публикация в {selectedClub.name}
            </h2>

            <form onSubmit={handleCreatePost} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
                  Заголовок
                </label>
                <input
                  type="text"
                  required
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                  placeholder="О чём хотите рассказать или спросить?"
                  className="w-full rounded-xl border border-space-700 bg-space-850 px-3 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
                  Текст публикации
                </label>
                <textarea
                  rows={4}
                  required
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  placeholder="Поделитесь опытом, кодом или задайте вопрос сообществу..."
                  className="w-full rounded-xl border border-space-700 bg-space-850 px-3 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-space-800">
                <button
                  type="button"
                  onClick={() => setShowPostModal(false)}
                  className="rounded-xl border border-space-700 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-space-800"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-cyan-500 px-5 py-2 text-xs font-bold text-space-950 hover:bg-cyan-400 shadow-md"
                >
                  Опубликовать
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
