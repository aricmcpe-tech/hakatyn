'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole, Language, StartupProject, NotificationItem } from '../lib/types';
import { getDB, initialDatabase } from '../lib/db';

interface AppContextType {
  currentUser: User;
  role: UserRole;
  setRole: (role: UserRole) => void;
  lang: Language;
  setLang: (lang: Language) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  db: typeof initialDatabase;
  refreshDB: () => void;
  selectedStartup: StartupProject | null;
  setSelectedStartup: (startup: StartupProject | null) => void;
  notifications: NotificationItem[];
  unreadNotificationsCount: number;
  markNotificationRead: (id: string) => void;
  claimQuest: (questId: string) => boolean;
  claimBattlePassTier: (level: number, type: 'free' | 'founder') => boolean;
  promoteStartup: (startupId: string, pkg: any) => boolean;
  toggleAnonymousMode: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>('ru');
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [selectedStartup, setSelectedStartup] = useState<StartupProject | null>(null);

  // Initialize DB
  const dbInstance = getDB();
  const [dbState, setDbState] = useState(dbInstance.getData());

  // Default user is student 1
  const [currentUser, setCurrentUser] = useState<User>(dbState.users[0]);
  const [role, setRoleState] = useState<UserRole>('student');

  const refreshDB = () => {
    const updated = { ...dbInstance.getData() };
    setDbState(updated);
    const updatedUser = dbInstance.getUser(currentUser.id);
    if (updatedUser) {
      setCurrentUser({ ...updatedUser });
    }
  };

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    // Switch to representative user for that role
    const matchedUser = dbState.users.find(u => u.role === newRole);
    if (matchedUser) {
      setCurrentUser(matchedUser);
    }
    // Set appropriate initial tab
    if (newRole === 'investor') {
      setActiveTab('investor-discovery');
    } else if (newRole === 'parent') {
      setActiveTab('parent-portal');
    } else if (newRole === 'sponsor') {
      setActiveTab('sponsor-portal');
    } else {
      setActiveTab('dashboard');
    }
  };

  const markNotificationRead = (id: string) => {
    const target = dbState.notifications.find(n => n.id === id);
    if (target) {
      target.read = true;
      refreshDB();
    }
  };

  const claimQuest = (questId: string): boolean => {
    const quest = dbState.battlePassQuests.find(q => q.id === questId);
    if (!quest || !quest.completed || quest.claimed) return false;

    const res = dbInstance.addTransaction({
      userId: currentUser.id,
      type: 'credit',
      amount: quest.quasarReward,
      category: 'Quest',
      source: `quest_${questId}`,
      description: `Награда за выполнение квеста: ${quest.title[lang]}`,
      idempotencyKey: `quest-claim-${questId}-${currentUser.id}`,
      targetId: questId,
    });

    if (res.success) {
      quest.claimed = true;
      refreshDB();
      return true;
    }
    return false;
  };

  const claimBattlePassTier = (level: number, type: 'free' | 'founder'): boolean => {
    const tier = dbState.battlePassTiers.find(t => t.level === level);
    if (!tier) return false;

    if (type === 'free') {
      if (tier.claimedFree) return false;
      if (tier.freeReward.type === 'quasar' && tier.freeReward.amount) {
        dbInstance.addTransaction({
          userId: currentUser.id,
          type: 'credit',
          amount: tier.freeReward.amount,
          category: 'BattlePass',
          source: `tier_${level}_free`,
          description: `Награда Battle Pass уровень ${level} (Free)`,
          idempotencyKey: `bp-tier-${level}-free-${currentUser.id}`,
          targetId: `tier-${level}`,
        });
      }
      tier.claimedFree = true;
    } else {
      if (tier.claimedFounder) return false;
      if (tier.founderReward.type === 'quasar' && tier.founderReward.amount) {
        dbInstance.addTransaction({
          userId: currentUser.id,
          type: 'credit',
          amount: tier.founderReward.amount,
          category: 'BattlePass',
          source: `tier_${level}_founder`,
          description: `Награда Battle Pass уровень ${level} (Founder)`,
          idempotencyKey: `bp-tier-${level}-founder-${currentUser.id}`,
          targetId: `tier-${level}`,
        });
      }
      tier.claimedFounder = true;
    }

    refreshDB();
    return true;
  };

  const promoteStartup = (startupId: string, pkg: any): boolean => {
    const res = dbInstance.buyPromotion(startupId, currentUser.id, pkg);
    if (res.success) {
      refreshDB();
      return true;
    }
    return false;
  };

  const toggleAnonymousMode = () => {
    const updated = !currentUser.isAnonymous;
    dbInstance.updateUser(currentUser.id, { isAnonymous: updated });
    refreshDB();
  };

  const userNotifications = dbState.notifications.filter(n => n.userId === currentUser.id || currentUser.role === 'admin');
  const unreadNotificationsCount = userNotifications.filter(n => !n.read).length;

  return (
    <AppContext.Provider
      value={{
        currentUser,
        role,
        setRole,
        lang,
        setLang,
        activeTab,
        setActiveTab,
        db: dbState,
        refreshDB,
        selectedStartup,
        setSelectedStartup,
        notifications: userNotifications,
        unreadNotificationsCount,
        markNotificationRead,
        claimQuest,
        claimBattlePassTier,
        promoteStartup,
        toggleAnonymousMode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
