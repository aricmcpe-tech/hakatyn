'use client';

import React from 'react';
import { AppProvider, useApp } from '../context/AppContext';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';
import StudentDashboard from '../components/student/StudentDashboard';
import InvestorDashboard from '../components/investor/InvestorDashboard';
import ParentDashboard from '../components/parent/ParentDashboard';
import SponsorDashboard from '../components/sponsor/SponsorDashboard';
import StartupJamsView from '../components/jams/StartupJamsView';
import QuasarWalletView from '../components/wallet/QuasarWalletView';
import BattlePassView from '../components/battlepass/BattlePassView';
import AIMentorView from '../components/aimentor/AIMentorView';
import GitHubWorkspaceView from '../components/github/GitHubWorkspaceView';
import ClubsView from '../components/clubs/ClubsView';
import LeaderboardView from '../components/leaderboard/LeaderboardView';
import EventsView from '../components/events/EventsView';
import ResourceCenterView from '../components/resources/ResourceCenterView';
import ProjectsShowcaseView from '../components/projects/ProjectsShowcaseView';
import ProjectDetailModal from '../components/projects/ProjectDetailModal';

function MainContent() {
  const { role, activeTab, selectedStartup, setSelectedStartup } = useApp();

  const renderView = () => {
    // If role is investor, default to investor discovery unless another tab clicked
    if (role === 'investor' && (activeTab === 'dashboard' || activeTab === 'investor-discovery' || activeTab === 'investor-offers')) {
      return <InvestorDashboard />;
    }

    // If role is parent
    if (role === 'parent' && (activeTab === 'dashboard' || activeTab.startsWith('parent'))) {
      return <ParentDashboard />;
    }

    // If role is sponsor
    if (role === 'sponsor' && (activeTab === 'dashboard' || activeTab === 'sponsor-portal')) {
      return <SponsorDashboard />;
    }

    switch (activeTab) {
      case 'dashboard':
        return <StudentDashboard />;
      case 'projects':
        return <ProjectsShowcaseView />;
      case 'jams':
        return <StartupJamsView />;
      case 'battlepass':
        return <BattlePassView />;
      case 'wallet':
        return <QuasarWalletView />;
      case 'aimentor':
        return <AIMentorView />;
      case 'github':
        return <GitHubWorkspaceView />;
      case 'clubs':
        return <ClubsView />;
      case 'leaderboard':
        return <LeaderboardView />;
      case 'events':
        return <EventsView />;
      case 'resources':
        return <ResourceCenterView />;
      case 'investor-discovery':
      case 'investor-offers':
        return <InvestorDashboard />;
      case 'parent-portal':
      case 'parent-rewards':
      case 'parent-consents':
        return <ParentDashboard />;
      case 'sponsor-portal':
        return <SponsorDashboard />;
      default:
        return <StudentDashboard />;
    }
  };

  return (
    <div
      className="min-h-dvh bg-space-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-space-950"
      style={{
        backgroundImage:
          'radial-gradient(1100px 500px at 15% -10%, rgba(6, 182, 212, 0.07), transparent 60%), radial-gradient(900px 450px at 105% 15%, rgba(99, 102, 241, 0.06), transparent 55%)',
      }}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:rounded-xl focus:bg-cyan-500 focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-space-950"
      >
        Перейти к содержимому
      </a>

      <Navbar />

      <div className="flex flex-1">
        <Sidebar />

        <main
          id="main-content"
          className="flex-1 w-full max-w-7xl mx-auto px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8 overflow-y-auto"
        >
          {renderView()}
        </main>
      </div>

      {selectedStartup && (
        <ProjectDetailModal
          project={selectedStartup}
          onClose={() => setSelectedStartup(null)}
        />
      )}
    </div>
  );
}

export default function Home() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
