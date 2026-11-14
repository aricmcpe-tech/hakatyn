export type UserRole = 'student' | 'investor' | 'parent' | 'mentor' | 'sponsor' | 'admin';

export type Language = 'ru' | 'kk' | 'en';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  bio: string;
  school?: string;
  country: string;
  level: number;
  quasarBalance: number;
  isAnonymous: boolean;
  anonymousAlias: string;
  linkedStudentId?: string; // For parents
  linkedParentId?: string;  // For students
  teamId?: string;
  githubUsername?: string;
  githubConnected: boolean;
  achievements: string[];
  badges: string[];
  equippedFrame?: string;
  equippedTitle?: string;
  created_at: string;
}

export type StartupStage = 'Idea' | 'Prototype' | 'MVP' | 'Early Traction' | 'Scaling';

export type StartupCategory = 
  | 'AI & EdTech'
  | 'GreenTech'
  | 'MedTech'
  | 'FinTech'
  | 'Robotics'
  | 'AR/VR'
  | 'Web3';

export interface StartupTeamMember {
  userId?: string;
  name: string;
  role: string;
  avatar: string;
}

export interface GitHubRepoData {
  owner: string;
  repo: string;
  branch: string;
  lastCommitMessage: string;
  lastCommitDate: string;
  lastCommitHash: string;
  commitCount: number;
  openIssuesCount: number;
  openPRsCount: number;
  contributorsCount: number;
  isPrivate: boolean;
  grantedInvestors: string[]; // investor userIds permitted
}

export interface PromotionCampaign {
  id: string;
  startupId: string;
  packageType: 'featured_showcase' | 'velocity_boost' | 'category_spotlight' | 'jam_spotlight' | 'discovery_top';
  packageName: string;
  costQuasar: number;
  durationDays: number;
  impressions: number;
  clicks: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'completed';
}

export interface StartupProject {
  id: string;
  authorId: string;
  title: string;
  tagline: string;
  logo: string;
  coverImage: string;
  description: string;
  problem: string;
  solution: string;
  targetAudience: string;
  category: StartupCategory;
  country: string;
  school: string;
  stage: StartupStage;
  teamMembers: StartupTeamMember[];
  techStack: string[];
  demoUrl?: string;
  pitchDeckUrl?: string;
  githubRepo?: GitHubRepoData;
  challengeHistory: string[];
  viewsCount: number;
  bookmarksCount: number;
  verifiedMilestones: number;
  devScore: number;
  activityScore: number;
  promotions: PromotionCampaign[];
  created_at: string;
  updated_at: string;
}

export interface QuasarTransaction {
  id: string;
  userId: string;
  type: 'credit' | 'debit' | 'refund';
  amount: number;
  category: 'Quest' | 'BattlePass' | 'Challenge' | 'Jam' | 'Promotion' | 'Achievement' | 'PartnerBonus' | 'RewardClaim';
  source: string;
  description: string;
  idempotencyKey: string;
  targetId?: string;
  timestamp: string;
}

export interface BattlePassQuest {
  id: string;
  type: 'daily' | 'weekly' | 'special';
  title: Record<Language, string>;
  description: Record<Language, string>;
  quasarReward: number;
  targetCount: number;
  currentCount: number;
  completed: boolean;
  claimed: boolean;
  categoryTag: string;
}

export interface BattlePassTier {
  level: number;
  xpRequired: number;
  freeReward: {
    type: 'quasar' | 'badge' | 'title' | 'frame' | 'promo' | 'exclusive';
    amount?: number;
    title: string;
    icon: string;
  };
  founderReward: {
    type: 'quasar' | 'badge' | 'promo' | 'exclusive' | 'frame' | 'title';
    amount?: number;
    title: string;
    icon: string;
  };
  claimedFree: boolean;
  claimedFounder: boolean;
}

export type InteractionStatus = 
  | 'new'
  | 'viewed'
  | 'contact_requested'
  | 'in_discussion'
  | 'offer_sent'
  | 'accepted'
  | 'declined'
  | 'archived';

export interface InvestorInteraction {
  id: string;
  investorId: string;
  startupId: string;
  status: InteractionStatus;
  notes?: string;
  history: Array<{
    timestamp: string;
    action: string;
    note?: string;
    actor: string;
  }>;
  created_at: string;
}

export type OfferType = 
  | 'monetary_funding'
  | 'prize_funding'
  | 'equipment'
  | 'cloud_resources'
  | 'mentorship'
  | 'education_program'
  | 'promotion_support';

export interface InvestmentOffer {
  id: string;
  investorId: string;
  investorName: string;
  investorAvatar: string;
  investorOrg: string;
  startupId: string;
  startupTitle: string;
  type: OfferType;
  title: string;
  description: string;
  terms: string;
  amountOrValue: string;
  expirationDate: string;
  status: 'pending' | 'accepted' | 'declined' | 'expired';
  parentalConsentRequired: boolean;
  parentConsentApproved: boolean;
  auditTrail: Array<{
    timestamp: string;
    action: string;
    details: string;
  }>;
  created_at: string;
}

export interface StartupJam {
  id: string;
  title: string;
  slug: string;
  coverImage: string;
  organizerId: string;
  organizerName: string;
  organizerLogo: string;
  organizerType: 'investor' | 'sponsor' | 'school';
  theme: string;
  problemStatement: string;
  requirements: string[];
  categories: string[];
  startDate: string;
  endDate: string;
  submissionDeadline: string;
  prizePoolAmount: string;
  currency: string;
  isPrizePoolVerified: boolean;
  winnersCount: number;
  criteria: Array<{
    key: string;
    name: Record<Language, string>;
    weight: number;
  }>;
  participantRequirements: string;
  resources: Array<{ title: string; url: string }>;
  contactInfo: string;
  status: 'upcoming' | 'active' | 'judging' | 'completed';
  submissionsCount: number;
  payoutSchedule: Array<{
    rank: number;
    title: string;
    prize: string;
    winnerTeam?: string;
    payoutStatus: 'escrowed' | 'approved' | 'disbursed';
  }>;
}

export interface JamSubmission {
  id: string;
  jamId: string;
  startupId: string;
  startupTitle: string;
  teamName: string;
  submitterId: string;
  members: string[];
  pitch: string;
  demoUrl: string;
  repoUrl?: string;
  videoUrl?: string;
  submittedAt: string;
  scores: Array<{
    judgeId: string;
    judgeName: string;
    criteriaScores: Record<string, number>;
    total: number;
    feedback: string;
  }>;
  averageScore: number;
  shortlisted: boolean;
  winnerRank?: number;
  prizeAwarded?: string;
  parentConsentConfirmed: boolean;
}

export interface Club {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  avatar: string;
  coverImage: string;
  memberCount: number;
  founderId: string;
  founderName: string;
  isPrivate: boolean;
  perks: string[];
  members: Array<{
    userId: string;
    role: 'founder' | 'moderator' | 'member';
    joinedAt: string;
  }>;
  posts: Array<{
    id: string;
    authorId: string;
    authorName: string;
    authorAvatar: string;
    title: string;
    content: string;
    upvotes: number;
    commentsCount: number;
    created_at: string;
  }>;
}

export interface ParentReward {
  id: string;
  parentId: string;
  studentId: string;
  title: string;
  targetGoal: string;
  rewardDescription: string;
  status: 'active' | 'completed' | 'claimed';
  created_at: string;
}

export interface TravelGrant {
  id: string;
  studentId: string;
  studentName: string;
  eventName: string;
  destination: string;
  amountRequested: string;
  justification: string;
  status: 'submitted' | 'under_review' | 'approved' | 'rejected' | 'disbursed';
  parentalApprovalConfirmed: boolean;
  created_at: string;
}

export interface ResourceItem {
  id: string;
  title: string;
  description: string;
  category: 'AI Tools' | 'Development' | 'Cloud & Hosting' | 'Design' | 'APIs' | 'Templates' | 'Hardware' | 'Mentorship';
  partner: string;
  partnerLogo: string;
  eligibility: string;
  accessCodeOrUrl: string;
  claimedCount: number;
  availableCount: number;
  value: string;
}

export interface RealReward {
  id: string;
  title: string;
  description: string;
  category: 'Physical' | 'Digital' | 'Course' | 'Hardware' | 'Grant';
  quasarCost: number;
  image: string;
  partner: string;
  inStock: number;
  deliveryMethod: string;
}

export interface EventItem {
  id: string;
  title: string;
  type: 'Startup Fair' | 'AI Festival' | 'Hackathon' | 'Demo Day' | 'Mentor Session' | 'Workshop';
  date: string;
  location: string;
  isOnline: boolean;
  description: string;
  travelGrantAvailable: boolean;
  registeredUsers: string[];
}

export interface AIAgentProposal {
  id: string;
  type: 'create_issue' | 'generate_readme' | 'create_roadmap_task' | 'jam_application_draft' | 'pitch_deck_outline';
  title: string;
  preview: string;
  actionPayload: any;
  status: 'pending' | 'approved' | 'dismissed';
}

export interface NotificationItem {
  id: string;
  userId: string;
  type: 'jam' | 'quasar' | 'investor' | 'battlepass' | 'team' | 'grant' | 'parent';
  title: string;
  message: string;
  read: boolean;
  timestamp: string;
  actionUrl?: string;
}
