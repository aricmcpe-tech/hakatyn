import {
  User,
  StartupProject,
  StartupJam,
  JamSubmission,
  QuasarTransaction,
  BattlePassQuest,
  BattlePassTier,
  InvestorInteraction,
  InvestmentOffer,
  Club,
  ParentReward,
  TravelGrant,
  ResourceItem,
  RealReward,
  EventItem,
  AIAgentProposal,
  NotificationItem,
} from './types';

export interface DatabaseSchema {
  users: User[];
  startups: StartupProject[];
  jams: StartupJam[];
  submissions: JamSubmission[];
  transactions: QuasarTransaction[];
  battlePassQuests: BattlePassQuest[];
  battlePassTiers: BattlePassTier[];
  interactions: InvestorInteraction[];
  offers: InvestmentOffer[];
  clubs: Club[];
  parentRewards: ParentReward[];
  travelGrants: TravelGrant[];
  resources: ResourceItem[];
  realRewards: RealReward[];
  events: EventItem[];
  agentProposals: AIAgentProposal[];
  notifications: NotificationItem[];
}

export const initialDatabase: DatabaseSchema = {
  users: [
    {
      id: 'user-student-1',
      name: 'Алихан Сейткали',
      email: 'alikhan@school.kz',
      role: 'student',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      bio: '10 класс, лицей №134. Создатель QazaqAgri AI. Увлекаюсь Computer Vision и микроконтроллерами.',
      school: 'Лицей №134, г. Алматы',
      country: 'Казахстан',
      level: 4,
      quasarBalance: 1450,
      isAnonymous: false,
      anonymousAlias: 'Quasar_4821',
      linkedParentId: 'user-parent-1',
      teamId: 'team-agri',
      githubUsername: 'alikhan-dev',
      githubConnected: true,
      achievements: ['first_jam_winner', 'github_master', 'prototype_deployed', 'active_builder'],
      badges: ['Star Builder', 'AI Pioneer', 'Jam Champion'],
      equippedFrame: 'cyber_cyan',
      equippedTitle: 'Rising Founder',
      created_at: '2026-09-01T10:00:00Z',
    },
    {
      id: 'user-investor-1',
      name: 'Аскар Жумадилов',
      email: 'askar@ventures.kz',
      role: 'investor',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      bio: 'Управляющий партнёр Qazaq Seed Fund. Ищу перспективные DeepTech и EdTech проекты ранней стадии.',
      school: 'Astana Hub Mentor / QSF',
      country: 'Казахстан',
      level: 10,
      quasarBalance: 25000,
      isAnonymous: false,
      anonymousAlias: 'VC_Titan_01',
      githubConnected: false,
      achievements: ['angel_investor', 'jam_sponsor'],
      badges: ['Angel Investor', 'Ecosystem Partner'],
      created_at: '2026-08-15T09:00:00Z',
    },
    {
      id: 'user-parent-1',
      name: 'Гульнара Сейткали',
      email: 'gulnara@mail.kz',
      role: 'parent',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
      bio: 'Мама Алихана. Поддерживаю интерес сына к IT, инженерии и стартапам.',
      country: 'Казахстан',
      level: 3,
      quasarBalance: 800,
      isAnonymous: false,
      anonymousAlias: 'Parent_Guardian_7',
      linkedStudentId: 'user-student-1',
      githubConnected: false,
      achievements: ['proud_supporter'],
      badges: ['Family Supporter'],
      created_at: '2026-09-05T12:00:00Z',
    },
    {
      id: 'user-mentor-1',
      name: 'Данияр Касымов',
      email: 'daniyar@techmentor.io',
      role: 'mentor',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      bio: 'Senior ML Engineer в Яндекс, ментор школьных команд. Помогаю с архитектурой и обучением моделей.',
      school: 'Ex-Google, Yandex',
      country: 'Казахстан',
      level: 8,
      quasarBalance: 5200,
      isAnonymous: false,
      anonymousAlias: 'Mentor_Guru_44',
      githubConnected: true,
      githubUsername: 'daniyar-ml',
      achievements: ['mentor_excellence'],
      badges: ['Certified Mentor', 'Code Wizard'],
      created_at: '2026-08-20T11:00:00Z',
    },
    {
      id: 'user-sponsor-1',
      name: 'TechHub Innovation Corp',
      email: 'grants@techhub.org',
      role: 'sponsor',
      avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
      bio: 'Корпоративный фонд поддержки молодёжных инноваций и образовательных соревнований.',
      country: 'Казахстан',
      level: 15,
      quasarBalance: 100000,
      isAnonymous: false,
      anonymousAlias: 'Sponsor_Enterprise_01',
      githubConnected: false,
      achievements: ['grand_sponsor'],
      badges: ['Verified Enterprise Sponsor'],
      created_at: '2026-07-01T08:00:00Z',
    },
    {
      id: 'user-admin-1',
      name: 'System Admin',
      email: 'admin@aistartify.org',
      role: 'admin',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
      bio: 'Главный координатор платформы AI Startify 2.0.',
      country: 'Global',
      level: 99,
      quasarBalance: 999999,
      isAnonymous: false,
      anonymousAlias: 'Admin_Prime',
      githubConnected: true,
      achievements: ['platform_architect'],
      badges: ['Platform Guardian'],
      created_at: '2026-06-01T00:00:00Z',
    },
  ],

  startups: [
    {
      id: 'startup-1',
      authorId: 'user-student-1',
      title: 'QazaqAgri AI',
      tagline: 'Компьютерное зрение для выявления болезней зерновых культур на ранней стадии',
      logo: '🌾',
      coverImage: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&auto=format&fit=crop&q=80',
      description: 'QazaqAgri AI — мобильный помощник для фермеров Казахстана. Обученная на локальном датасете нейросеть классифицирует 18 видов вредителей и грибковых заболеваний пшеницы по фотографии с дрона или смартфона с точностью 94.6%.',
      problem: 'Фермеры теряют до 25% урожая зерна из-за позднего обнаружения ржавчины и септориоза.',
      solution: 'Легковесная модель YOLOv8-nano работает оффлайн прямо в смартфоне или на борту дрона, предлагая безопасные дозировки биопестицидов.',
      targetAudience: 'Агрохолдинги и фермерские хозяйства Северного и Центрального Казахстана.',
      category: 'AI & EdTech',
      country: 'Казахстан',
      school: 'Лицей №134, г. Алматы',
      stage: 'MVP',
      teamMembers: [
        { name: 'Алихан Сейткали', role: 'ML Engineer & Lead', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
        { name: 'Айзере Нургали', role: 'Frontend & UI/UX', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80' },
        { name: 'Тимур Болатов', role: 'Hardware & IoT', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80' },
      ],
      techStack: ['Python', 'PyTorch', 'YOLOv8', 'React Native', 'FastAPI', 'Raspberry Pi'],
      demoUrl: 'https://qazaqagri-demo.vercel.app',
      pitchDeckUrl: 'https://startify.io/decks/qazaqagri.pdf',
      githubRepo: {
        owner: 'alikhan-dev',
        repo: 'qazaqagri-ai-engine',
        branch: 'main',
        lastCommitMessage: 'feat: add offline quantized ONNX model for mobile inference',
        lastCommitDate: '2026-11-13T18:24:00Z',
        lastCommitHash: '8f4a1c9',
        commitCount: 47,
        openIssuesCount: 3,
        openPRsCount: 1,
        contributorsCount: 3,
        isPrivate: false,
        grantedInvestors: ['user-investor-1'],
      },
      challengeHistory: ['AI for Education Jam (Top 3)', 'Kazakhstan EcoTech Challenge', 'Almaty Open Hackathon'],
      viewsCount: 1420,
      bookmarksCount: 68,
      verifiedMilestones: 4,
      devScore: 92,
      activityScore: 96,
      promotions: [
        {
          id: 'promo-1',
          startupId: 'startup-1',
          packageType: 'featured_showcase',
          packageName: 'Главная Витрина (Featured)',
          costQuasar: 500,
          durationDays: 7,
          impressions: 3410,
          clicks: 284,
          startDate: '2026-11-10T00:00:00Z',
          endDate: '2026-11-17T00:00:00Z',
          status: 'active',
        }
      ],
      created_at: '2026-09-10T12:00:00Z',
      updated_at: '2026-11-13T18:30:00Z',
    },
    {
      id: 'startup-2',
      authorId: 'user-student-2',
      title: 'NeuroMath Adaptive',
      tagline: 'Игровой тренажёр олимпиадной математики с персональным AI-тьютором',
      logo: '📐',
      coverImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop&q=80',
      description: 'Платформа, которая декомпозирует сложные задачи международных олимпиад по математике на интерактивные шаги и подбирает подсказки в зависимости от когнитивного стиля школьника.',
      problem: 'Школьники сталкиваются с фрустрацией при подготовке к олимпиадам без дорогостоящих репетиторов.',
      solution: 'Генеративный AI анализирует ход решения ученика, указывает на логические пробелы и строит индивидуальную траекторию.',
      targetAudience: 'Ученики 7-11 классов, учителя математики, школы.',
      category: 'AI & EdTech',
      country: 'Казахстан',
      school: 'НИШ ФМН, г. Астана',
      stage: 'Prototype',
      teamMembers: [
        { name: 'Санжар Маликов', role: 'Math Lead & Algorithmist', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80' },
        { name: 'Диана Сапарова', role: 'Fullstack Dev', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80' },
      ],
      techStack: ['Next.js', 'TailwindCSS', 'Python', 'SymPy', 'Cloud LLM API', 'Supabase'],
      demoUrl: 'https://neuromath.kz',
      pitchDeckUrl: 'https://startify.io/decks/neuromath.pdf',
      githubRepo: {
        owner: 'sanzhar-m',
        repo: 'neuromath-core',
        branch: 'main',
        lastCommitMessage: 'refactor: integrate step-by-step LaTeX formula parsing',
        lastCommitDate: '2026-11-12T14:10:00Z',
        lastCommitHash: '3e7b2a1',
        commitCount: 32,
        openIssuesCount: 2,
        openPRsCount: 0,
        contributorsCount: 2,
        isPrivate: false,
        grantedInvestors: [],
      },
      challengeHistory: ['EdTech Innovation Spring 2026'],
      viewsCount: 950,
      bookmarksCount: 42,
      verifiedMilestones: 3,
      devScore: 88,
      activityScore: 85,
      promotions: [],
      created_at: '2026-09-25T14:00:00Z',
      updated_at: '2026-11-12T14:20:00Z',
    },
    {
      id: 'startup-3',
      authorId: 'user-student-3',
      title: 'EcoSort Vision',
      tagline: 'Автоматический умный контейнер для раздельного сбора мусора с AI-сканером',
      logo: '♻️',
      coverImage: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&auto=format&fit=crop&q=80',
      description: 'Умная урна на базе ESP32 и камеры с нейросетью, которая мгновенно определяет тип отходов (пластик, бумага, стекло, органика) и распределяет их по отсекам за 0.8 секунды.',
      problem: 'Ручная сортировка в школах и офисах не работает: 70% перерабатываемого сырья загрязняется органикой.',
      solution: 'Аппаратно-программный комплекс с геймификацией: ученики прикладывают школьную карту и получают Quasar за каждый отсортированный стаканчик.',
      targetAudience: 'Школы, университеты, коворкинги и торговые центры.',
      category: 'GreenTech',
      country: 'Казахстан',
      school: 'РФМШ, г. Алматы',
      stage: 'Prototype',
      teamMembers: [
        { name: 'Бауржан Омаров', role: 'Hardware & CAD Design', avatar: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150&auto=format&fit=crop&q=80' },
        { name: 'Камила Ибраева', role: 'Embedded Firmware', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80' },
      ],
      techStack: ['C++', 'FreeRTOS', 'TensorFlow Lite Micro', 'ESP32-CAM', 'MQTT', 'Node.js'],
      demoUrl: 'https://ecosort.school.kz',
      githubRepo: {
        owner: 'ecosort-team',
        repo: 'ecosort-firmware',
        branch: 'main',
        lastCommitMessage: 'fix: optimize servo motor angles and infrared debounce',
        lastCommitDate: '2026-11-14T09:15:00Z',
        lastCommitHash: '992ab14',
        commitCount: 54,
        openIssuesCount: 4,
        openPRsCount: 2,
        contributorsCount: 2,
        isPrivate: false,
        grantedInvestors: [],
      },
      challengeHistory: ['Green Economy Hackathon (1st Place)'],
      viewsCount: 1890,
      bookmarksCount: 94,
      verifiedMilestones: 5,
      devScore: 94,
      activityScore: 98,
      promotions: [
        {
          id: 'promo-2',
          startupId: 'startup-3',
          packageType: 'velocity_boost',
          packageName: 'Скоростной Boost 2x',
          costQuasar: 300,
          durationDays: 5,
          impressions: 2100,
          clicks: 195,
          startDate: '2026-11-12T00:00:00Z',
          endDate: '2026-11-17T00:00:00Z',
          status: 'active',
        }
      ],
      created_at: '2026-08-30T10:00:00Z',
      updated_at: '2026-11-14T09:20:00Z',
    },
    {
      id: 'startup-4',
      authorId: 'user-student-4',
      title: 'MedScan SkinAI',
      tagline: 'Первичный дерматологический скрининг новообразований кожи для отдалённых аулов',
      logo: '🩺',
      coverImage: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop&q=80',
      description: 'Доступный инструмент телемедицины для школьных медпунктов и сельских амбулаторий. Определяет риск меланомы по дерматоскопическим снимкам с чувствительностью 92%.',
      problem: 'Дефицит узких специалистов-онкологов в сельской местности и высокая смертность из-за поздней диагностики.',
      solution: 'Мобильное приложение с нейросетевым анализом по правилу ABCDE и автоматическим формированием направления к теледерматологу.',
      targetAudience: 'Сельские больницы, школьные медпункты, пациенты.',
      category: 'MedTech',
      country: 'Казахстан',
      school: 'Лицей «Білім-Инновация», г. Шымкент',
      stage: 'Early Traction',
      teamMembers: [
        { name: 'Ернар Куаныш', role: 'Lead Developer & Data Scientist', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80' },
      ],
      techStack: ['Python', 'TensorFlow', 'Flutter', 'Go', 'Docker', 'PostgreSQL'],
      demoUrl: 'https://medscan.kz',
      githubRepo: {
        owner: 'ernar-bilim',
        repo: 'medscan-core',
        branch: 'main',
        lastCommitMessage: 'docs: update clinical validation report draft',
        lastCommitDate: '2026-11-11T16:00:00Z',
        lastCommitHash: '1a72fc4',
        commitCount: 29,
        openIssuesCount: 1,
        openPRsCount: 0,
        contributorsCount: 1,
        isPrivate: false,
        grantedInvestors: [],
      },
      challengeHistory: ['HealthTech Jam 2026'],
      viewsCount: 1120,
      bookmarksCount: 55,
      verifiedMilestones: 3,
      devScore: 89,
      activityScore: 82,
      promotions: [],
      created_at: '2026-10-01T15:00:00Z',
      updated_at: '2026-11-11T16:05:00Z',
    },
    {
      id: 'startup-5',
      authorId: 'user-student-5',
      title: 'CyberShield Kids',
      tagline: 'Интерактивный симулятор кибербезопасности и защиты от фишинга для школьников',
      logo: '🛡️',
      coverImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80',
      description: 'Геймифицированная обучающая среда в формате визуальной новеллы, обучающая детей распознавать фишинг, социальную инженерию, дипфейки и утечки паролей.',
      problem: '84% школьников становятся жертвами скама в онлайн-играх и социальных сетях.',
      solution: 'Практические квесты в безопасной изолированной песочнице с разбором реальных атак.',
      targetAudience: 'Школы, родители, подростки 10-16 лет.',
      category: 'AI & EdTech',
      country: 'Казахстан',
      school: 'Гимназия №38, г. Караганда',
      stage: 'Prototype',
      teamMembers: [
        { name: 'Алина Мусина', role: 'Cybersecurity & Game Design', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
      ],
      techStack: ['React', 'Phaser.js', 'Node.js', 'TailwindCSS'],
      demoUrl: 'https://cybershield.school',
      githubRepo: {
        owner: 'alina-cyber',
        repo: 'cybershield-game',
        branch: 'main',
        lastCommitMessage: 'feat: add deepfake detection mini-game level 3',
        lastCommitDate: '2026-11-13T11:40:00Z',
        lastCommitHash: '6d91bb2',
        commitCount: 22,
        openIssuesCount: 1,
        openPRsCount: 0,
        contributorsCount: 1,
        isPrivate: false,
        grantedInvestors: [],
      },
      challengeHistory: ['Security Jam 2026'],
      viewsCount: 780,
      bookmarksCount: 38,
      verifiedMilestones: 2,
      devScore: 84,
      activityScore: 79,
      promotions: [],
      created_at: '2026-10-15T11:00:00Z',
      updated_at: '2026-11-13T11:45:00Z',
    },
  ],

  jams: [
    {
      id: 'jam-1',
      title: 'AI for Education Jam',
      slug: 'ai-for-education-jam',
      coverImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80',
      organizerId: 'user-investor-1',
      organizerName: 'Qazaq Seed Fund & Astana Hub',
      organizerLogo: '🚀',
      organizerType: 'investor',
      theme: 'Создайте AI-продукт, который улучшит школьное и олимпиадное образование',
      problemStatement: 'Устаревшие методики обучения, перегруженность учителей рутинной проверкой тестов и отсутствие персонализации для отстающих или талантливых учеников.',
      requirements: [
        'Рабочий прототип или MVP (Web, Mobile или Bot)',
        'Публичный или предоставленный репозиторий GitHub с понятной структурой',
        'Интеграция ИИ (LLM, Computer Vision или персонализированные алгоритмы)',
        'Видеодемо питча до 3 минут',
      ],
      categories: ['AI & EdTech', 'Productivity', 'STEM'],
      startDate: '2026-11-08T00:00:00Z',
      endDate: '2026-11-20T23:59:59Z',
      submissionDeadline: '2026-11-18T18:00:00Z',
      prizePoolAmount: '500 000 ₸',
      currency: '₸',
      isPrizePoolVerified: true,
      winnersCount: 3,
      criteria: [
        { key: 'innovation', name: { ru: 'Инновационность', kk: 'Инновациялық деңгейі', en: 'Innovation' }, weight: 20 },
        { key: 'utility', name: { ru: 'Польза для образования', kk: 'Білімге пайдасы', en: 'Educational Utility' }, weight: 20 },
        { key: 'feasibility', name: { ru: 'Реализуемость', kk: 'Іске асыру мүмкіндігі', en: 'Feasibility' }, weight: 15 },
        { key: 'prototypeQuality', name: { ru: 'Качество прототипа', kk: 'Прототип сапасы', en: 'Prototype Quality' }, weight: 20 },
        { key: 'growthPotential', name: { ru: 'Потенциал развития', kk: 'Даму әлеуеті', en: 'Growth Potential' }, weight: 15 },
        { key: 'pitchPresentation', name: { ru: 'Презентация и питч', kk: 'Презентация мен питч', en: 'Presentation' }, weight: 10 },
      ],
      participantRequirements: 'Школьники 7-12 классов, команды от 1 до 4 человек.',
      resources: [
        { title: 'AI API Documentation & Playground', url: 'https://startify.io/docs/ai' },
        { title: 'Open-Source Education Datasets (Hugging Face)', url: 'https://huggingface.co/datasets' },
      ],
      contactInfo: 'jam-support@qsf.kz / Telegram: @QSF_Jam_Support',
      status: 'active',
      submissionsCount: 14,
      payoutSchedule: [
        { rank: 1, title: '1 место — Гран-при', prize: '250 000 ₸', winnerTeam: 'QazaqAgri AI', payoutStatus: 'approved' },
        { rank: 2, title: '2 место', prize: '150 000 ₸', winnerTeam: 'NeuroMath Adaptive', payoutStatus: 'escrowed' },
        { rank: 3, title: '3 место', prize: '100 000 ₸', payoutStatus: 'escrowed' },
      ],
    },
    {
      id: 'jam-2',
      title: 'GreenTech & Smart Kazakhstan Jam',
      slug: 'greentech-smart-kz-jam',
      coverImage: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&auto=format&fit=crop&q=80',
      organizerId: 'user-sponsor-1',
      organizerName: 'TechHub Innovation Corp',
      organizerLogo: '🌱',
      organizerType: 'sponsor',
      theme: 'Экологические технологии, снижение углеродного следа и умная переработка отходов',
      problemStatement: 'Быстрый рост городов требует умных решений для контроля чистоты воздуха, энергоэффективности и автоматизации переработки вторсырья.',
      requirements: [
        'IoT-устройство или программный симулятор',
        'Экономическое обоснование снижения потерь',
        'Исходный код в репозитории',
      ],
      categories: ['GreenTech', 'Hardware', 'Smart City'],
      startDate: '2026-11-25T00:00:00Z',
      endDate: '2026-12-05T23:59:59Z',
      submissionDeadline: '2026-12-03T20:00:00Z',
      prizePoolAmount: '1 000 000 ₸',
      currency: '₸',
      isPrizePoolVerified: true,
      winnersCount: 3,
      criteria: [
        { key: 'innovation', name: { ru: 'Экологический эффект', kk: 'Экологиялық әсері', en: 'Eco Impact' }, weight: 25 },
        { key: 'prototypeQuality', name: { ru: 'Инженерное качество', kk: 'Инженерлік сапасы', en: 'Engineering Quality' }, weight: 25 },
        { key: 'feasibility', name: { ru: 'Масштабируемость', kk: 'Масштабталу мүмкіндігі', en: 'Scalability' }, weight: 25 },
        { key: 'pitchPresentation', name: { ru: 'Презентация решения', kk: 'Шешім презентациясы', en: 'Pitch Quality' }, weight: 25 },
      ],
      participantRequirements: 'Школьники и студенты колледжей Казахстана.',
      resources: [
        { title: 'Kazakhstan Air Quality Open API', url: 'https://airkaz.org' },
      ],
      contactInfo: 'greentech@techhub.org',
      status: 'upcoming',
      submissionsCount: 8,
      payoutSchedule: [
        { rank: 1, title: '1 место', prize: '500 000 ₸', payoutStatus: 'escrowed' },
        { rank: 2, title: '2 место', prize: '300 000 ₸', payoutStatus: 'escrowed' },
        { rank: 3, title: '3 место', prize: '200 000 ₸', payoutStatus: 'escrowed' },
      ],
    },
  ],

  submissions: [
    {
      id: 'sub-1',
      jamId: 'jam-1',
      startupId: 'startup-1',
      startupTitle: 'QazaqAgri AI',
      teamName: 'AgriVision Team',
      submitterId: 'user-student-1',
      members: ['Алихан Сейткали', 'Айзере Нургали', 'Тимур Болатов'],
      pitch: 'Мы создали локализованный AI-детектор болезней зерновых культур, который спасает до 25% урожая фермеров. Обучен на датасете из 8,000 снимков полей Акмолинской и Костанайской областей.',
      demoUrl: 'https://qazaqagri-demo.vercel.app',
      repoUrl: 'https://github.com/alikhan-dev/qazaqagri-ai-engine',
      videoUrl: 'https://youtube.com/watch?v=demo-video',
      submittedAt: '2026-11-12T15:30:00Z',
      scores: [
        {
          judgeId: 'user-investor-1',
          judgeName: 'Аскар Жумадилов (QSF)',
          criteriaScores: { innovation: 19, utility: 20, feasibility: 15, prototypeQuality: 19, growthPotential: 14, pitchPresentation: 9 },
          total: 96,
          feedback: 'Отличная практическая польза для агросектора Казахстана. Репозиторий оформлен профессионально, есть квантованная модель.',
        }
      ],
      averageScore: 96,
      shortlisted: true,
      winnerRank: 1,
      prizeAwarded: '250 000 ₸',
      parentConsentConfirmed: true,
    },
    {
      id: 'sub-2',
      jamId: 'jam-1',
      startupId: 'startup-2',
      startupTitle: 'NeuroMath Adaptive',
      teamName: 'OlympFounders',
      submitterId: 'user-student-2',
      members: ['Санжар Маликов', 'Диана Сапарова'],
      pitch: 'Адаптивный ИИ-репетитор олимпиадной математики, понимающий формулы в LaTeX и ведущий диалог по методу Сократа.',
      demoUrl: 'https://neuromath.kz',
      repoUrl: 'https://github.com/sanzhar-m/neuromath-core',
      submittedAt: '2026-11-13T10:00:00Z',
      scores: [
        {
          judgeId: 'user-investor-1',
          judgeName: 'Аскар Жумадилов (QSF)',
          criteriaScores: { innovation: 18, utility: 18, feasibility: 14, prototypeQuality: 18, growthPotential: 14, pitchPresentation: 8 },
          total: 90,
          feedback: 'Высокое качество интерфейса, хорошая интеграция ИИ-моделей.',
        }
      ],
      averageScore: 90,
      shortlisted: true,
      winnerRank: 2,
      prizeAwarded: '150 000 ₸',
      parentConsentConfirmed: true,
    }
  ],

  transactions: [
    {
      id: 'tx-1',
      userId: 'user-student-1',
      type: 'credit',
      amount: 500,
      category: 'Jam',
      source: 'jam_submission_accepted',
      description: 'Бонус за успешную подачу проекта на «AI for Education Jam»',
      idempotencyKey: 'jam-1-sub-1-bonus',
      targetId: 'jam-1',
      timestamp: '2026-11-12T15:31:00Z',
    },
    {
      id: 'tx-2',
      userId: 'user-student-1',
      type: 'credit',
      amount: 150,
      category: 'Quest',
      source: 'daily_quest_profile',
      description: 'Выполнение ежедневного задания: Заполнение профиля основателя',
      idempotencyKey: 'daily-quest-1-user-student-1',
      targetId: 'quest-1',
      timestamp: '2026-11-13T09:00:00Z',
    },
    {
      id: 'tx-3',
      userId: 'user-student-1',
      type: 'credit',
      amount: 300,
      category: 'BattlePass',
      source: 'tier_4_reward',
      description: 'Награда за достижение 4 уровня Battle Pass Season 01',
      idempotencyKey: 'battlepass-tier-4-user-student-1',
      targetId: 'tier-4',
      timestamp: '2026-11-13T12:00:00Z',
    },
    {
      id: 'tx-4',
      userId: 'user-student-1',
      type: 'debit',
      amount: 500,
      category: 'Promotion',
      source: 'featured_showcase_purchase',
      description: 'Покупка рекламной кампании: Размещение на главной витрине (7 дней)',
      idempotencyKey: 'promo-buy-startup-1-featured',
      targetId: 'startup-1',
      timestamp: '2026-11-10T00:00:00Z',
    },
  ],

  battlePassQuests: [
    {
      id: 'quest-d1',
      type: 'daily',
      title: {
        ru: 'Обнови статус разработки',
        kk: 'Әзірлеу күйін жаңартыңыз',
        en: 'Update dev milestone log',
      },
      description: {
        ru: 'Сделайте коммит в репозиторий или обновите описание спринта проекта.',
        kk: 'Репозиторийге коммит жасаңыз немесе спринт сипаттамасын жаңартыңыз.',
        en: 'Push a commit to GitHub or update your startup sprint milestone.',
      },
      quasarReward: 50,
      targetCount: 1,
      currentCount: 1,
      completed: true,
      claimed: true,
      categoryTag: 'Code',
    },
    {
      id: 'quest-d2',
      type: 'daily',
      title: {
        ru: 'Сессия с AI Ментором',
        kk: 'AI Ментормен сессия',
        en: 'AI Mentor Sprint Session',
      },
      description: {
        ru: 'Задайте вопрос AI Ментору по архитектуре или бизнес-модели стартапа.',
        kk: 'AI Менторға стартаптың архитектурасы немесе бизнес үлгісі бойынша сұрақ қойыңыз.',
        en: 'Ask AI Mentor a question regarding code architecture or monetization.',
      },
      quasarReward: 60,
      targetCount: 1,
      currentCount: 1,
      completed: true,
      claimed: false,
      categoryTag: 'AI',
    },
    {
      id: 'quest-d3',
      type: 'daily',
      title: {
        ru: 'Взаимная поддержка',
        kk: 'Өзара қолдау',
        en: 'Peer Startup Review',
      },
      description: {
        ru: 'Оставьте конструктивный отзыв на проект другого школьника в каталоге.',
        kk: 'Каталогтағы басқа оқушының жобасына пайдалы пікір қалдырыңыз.',
        en: 'Leave a constructive review on a peer project in the showcase.',
      },
      quasarReward: 40,
      targetCount: 1,
      currentCount: 0,
      completed: false,
      claimed: false,
      categoryTag: 'Community',
    },
    {
      id: 'quest-w1',
      type: 'weekly',
      title: {
        ru: 'Релиз нового прототипа',
        kk: 'Жаңа прототип релизи',
        en: 'Ship Prototype Update',
      },
      description: {
        ru: 'Опубликуйте новую версию демо или закройте 3 Issue в GitHub.',
        kk: 'Демоның жаңа нұсқасын шығарыңыз немесе 3 Issue жабыңыз.',
        en: 'Deploy a new demo update or close 3 GitHub issues.',
      },
      quasarReward: 250,
      targetCount: 3,
      currentCount: 2,
      completed: false,
      claimed: false,
      categoryTag: 'Dev',
    },
    {
      id: 'quest-w2',
      type: 'weekly',
      title: {
        ru: 'Питч перед сообществом',
        kk: 'Қоғамдастық алдында питч',
        en: 'Club Community Pitch',
      },
      description: {
        ru: 'Поделитесь новостью о прогрессе проекта в тематическом клубе.',
        kk: 'Тақырыптық клубта жобаның дамуы туралы жаңалықпен бөлісіңіз.',
        en: 'Share your project progress post in a community club.',
      },
      quasarReward: 180,
      targetCount: 1,
      currentCount: 1,
      completed: true,
      claimed: false,
      categoryTag: 'Pitch',
    },
    {
      id: 'quest-s1',
      type: 'special',
      title: {
        ru: 'Победа в Startup Jam',
        kk: 'Startup Jam-дағы жеңіс',
        en: 'Startup Jam Podium',
      },
      description: {
        ru: 'Займите призовое место или войдите в шорт-лист официального Startup Jam.',
        kk: 'Ресми Startup Jam-да жүлделі орын алыңыз немесе шорт-листке кіріңіз.',
        en: 'Rank in top 3 or achieve shortlist status in an official Jam.',
      },
      quasarReward: 800,
      targetCount: 1,
      currentCount: 1,
      completed: true,
      claimed: false,
      categoryTag: 'Competition',
    },
  ],

  battlePassTiers: [
    {
      level: 1,
      xpRequired: 100,
      freeReward: { type: 'quasar', amount: 100, title: '100 Quasar', icon: '🪙' },
      founderReward: { type: 'badge', title: 'Season 01 Founder Badge', icon: '🎖️' },
      claimedFree: true,
      claimedFounder: true,
    },
    {
      level: 2,
      xpRequired: 250,
      freeReward: { type: 'quasar', amount: 150, title: '150 Quasar', icon: '🪙' },
      founderReward: { type: 'frame', title: 'Cyber Pulse Avatar Frame', icon: '🖼️' },
      claimedFree: true,
      claimedFounder: true,
    },
    {
      level: 3,
      xpRequired: 500,
      freeReward: { type: 'title', title: 'Титул «Active Builder»', icon: '⚡' },
      founderReward: { type: 'promo', title: '50% скидка на Category Boost', icon: '🚀' },
      claimedFree: true,
      claimedFounder: true,
    },
    {
      level: 4,
      xpRequired: 800,
      freeReward: { type: 'quasar', amount: 300, title: '300 Quasar', icon: '🪙' },
      founderReward: { type: 'exclusive', title: 'Приглашение на VIP Demo Day', icon: '🎟️' },
      claimedFree: true,
      claimedFounder: false,
    },
    {
      level: 5,
      xpRequired: 1200,
      freeReward: { type: 'badge', title: 'Бейдж «Algorithmic Master»', icon: '🧠' },
      founderReward: { type: 'quasar', amount: 1000, title: '1,000 Quasar Bonus', icon: '💎' },
      claimedFree: false,
      claimedFounder: false,
    },
    {
      level: 6,
      xpRequired: 1700,
      freeReward: { type: 'quasar', amount: 450, title: '450 Quasar', icon: '🪙' },
      founderReward: { type: 'frame', title: 'Neon Nova Frame', icon: '🌌' },
      claimedFree: false,
      claimedFounder: false,
    },
    {
      level: 7,
      xpRequired: 2300,
      freeReward: { type: 'promo', title: 'Бесплатный Spotlight (3 дня)', icon: '⭐' },
      founderReward: { type: 'exclusive', title: '1-на-1 менторинг с инвестором', icon: '🤝' },
      claimedFree: false,
      claimedFounder: false,
    },
  ],

  interactions: [
    {
      id: 'inter-1',
      investorId: 'user-investor-1',
      startupId: 'startup-1',
      status: 'offer_sent',
      notes: 'Впечатляющий MVP. Готовы предоставить грант на закупку тестовых дронов и вычислительных мощностей.',
      history: [
        { timestamp: '2026-11-10T11:00:00Z', action: 'viewed', note: 'Инвестор изучил карточку стартапа', actor: 'Аскар Жумадилов' },
        { timestamp: '2026-11-11T14:30:00Z', action: 'contact_requested', note: 'Запрос на онлайн-питч команды', actor: 'Аскар Жумадилов' },
        { timestamp: '2026-11-13T10:00:00Z', action: 'offer_sent', note: 'Сформировано инвестиционное предложение №INV-2026-08', actor: 'Аскар Жумадилов' },
      ],
      created_at: '2026-11-10T11:00:00Z',
    }
  ],

  offers: [
    {
      id: 'offer-1',
      investorId: 'user-investor-1',
      investorName: 'Аскар Жумадилов',
      investorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      investorOrg: 'Qazaq Seed Fund',
      startupId: 'startup-1',
      startupTitle: 'QazaqAgri AI',
      type: 'prize_funding',
      title: 'Грантовое финансирование на пилотные испытания в полях',
      description: 'Безвозмездный студенческий грант на покупку двух мультиспектральных камер и оплату облачных серверов High-Perf GPU для дообучения нейросети.',
      terms: 'Предоставление ежемесячного отчёта о точности детекции и проведённых полевых тестах. Без передачи доли в компании (0% equity grant).',
      amountOrValue: '1 500 000 ₸',
      expirationDate: '2026-12-01T00:00:00Z',
      status: 'pending',
      parentalConsentRequired: true,
      parentConsentApproved: false,
      auditTrail: [
        { timestamp: '2026-11-13T10:00:00Z', action: 'created', details: 'Оффер создан инвестором Аскаром Жумадиловым' },
      ],
      created_at: '2026-11-13T10:00:00Z',
    },
    {
      id: 'offer-2',
      investorId: 'user-investor-1',
      investorName: 'Аскар Жумадилов',
      investorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      investorOrg: 'Qazaq Seed Fund',
      startupId: 'startup-3',
      startupTitle: 'EcoSort Vision',
      type: 'equipment',
      title: 'Пакет оборудования: 10 микрокомпьютеров и сервоприводы',
      description: 'Предоставление партии 10 комплектов Raspberry Pi 5 + датчики для установки тестовых эко-урн в 5 школах Алматы.',
      terms: 'Установка в пилотных школах до конца учебного полугодия.',
      amountOrValue: 'Эквивалент 600 000 ₸',
      expirationDate: '2026-12-15T00:00:00Z',
      status: 'accepted',
      parentalConsentRequired: false,
      parentConsentApproved: true,
      auditTrail: [
        { timestamp: '2026-11-11T12:00:00Z', action: 'created', details: 'Оффер оборудования создан' },
        { timestamp: '2026-11-12T16:00:00Z', action: 'accepted', details: 'Команда приняла предложение' },
      ],
      created_at: '2026-11-11T12:00:00Z',
    }
  ],

  clubs: [
    {
      id: 'club-1',
      name: 'AI Club Kazakhstan',
      tagline: 'Сообщество юных исследователей машинного обучения и компьютерного зрения',
      description: 'Обсуждаем архитектуры трансформеров, делимся датасетами, разбираем свежие статьи с arXiv и готовимся к международным соревнованиям.',
      category: 'Artificial Intelligence',
      avatar: '🤖',
      coverImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=80',
      memberCount: 348,
      founderId: 'user-mentor-1',
      founderName: 'Данияр Касымов',
      isPrivate: false,
      perks: ['Еженедельные разборы кода', '+20% к Quasar за AI-квесты', 'Доступ к закрытым лекциям'],
      members: [
        { userId: 'user-student-1', role: 'member', joinedAt: '2026-09-02T10:00:00Z' },
        { userId: 'user-mentor-1', role: 'founder', joinedAt: '2026-08-20T10:00:00Z' },
      ],
      posts: [
        {
          id: 'post-1',
          authorId: 'user-mentor-1',
          authorName: 'Данияр Касымов (Ментор)',
          authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
          title: 'Как оптимизировать инференс YOLOv8 для мобильных устройств на чипах MediaTek',
          content: 'Привет всем основателям! Если вы разрабатываете мобильные приложения с компьютерным зрением, обратите внимание на INT8-квантование через ONNX Runtime. Это снижает потребление памяти в 3 раза...',
          upvotes: 46,
          commentsCount: 12,
          created_at: '2026-11-12T17:00:00Z',
        },
        {
          id: 'post-2',
          authorId: 'user-student-1',
          authorName: 'Алихан Сейткали',
          authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
          title: 'Ищем в команду бэкендера на Go для микросервисов QazaqAgri AI',
          content: 'Всем привет! Наш стартап QazaqAgri AI расширяет команду для участия в следующем Startup Jam. Нужен энтузиаст, знакомый с REST API и базами данных. Пишите в ЛС!',
          upvotes: 28,
          commentsCount: 8,
          created_at: '2026-11-13T14:20:00Z',
        }
      ]
    },
    {
      id: 'club-2',
      name: 'Young Founders Guild',
      tagline: 'Клуб школьников-основателей технологических стартапов',
      description: 'Учимся привлекать инвестиции, строить бизнес-модели, готовить питч-деки и выходить на зарубежные рынки.',
      category: 'Entrepreneurship',
      avatar: '🚀',
      coverImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop&q=80',
      memberCount: 512,
      founderId: 'user-investor-1',
      founderName: 'Аскар Жумадилов',
      isPrivate: false,
      perks: ['Office hours с венчурными фондами', 'Разбор питч-деков', 'Практика переговоров'],
      members: [
        { userId: 'user-student-1', role: 'member', joinedAt: '2026-09-05T10:00:00Z' }
      ],
      posts: [
        {
          id: 'post-3',
          authorId: 'user-investor-1',
          authorName: 'Аскар Жумадилов',
          authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
          title: 'Топ-5 ошибок школьных стартапов на первой встрече с инвестором',
          content: '1. Рассказ только о технологиях без понимания рынка. 2. Отсутствие данных о клиентах. 3. Нереалистичные оценки выручки...',
          upvotes: 79,
          commentsCount: 23,
          created_at: '2026-11-10T12:00:00Z',
        }
      ]
    },
    {
      id: 'club-3',
      name: 'Robotics & Hardware Lab',
      tagline: 'Конструирование умных дронов, роботов и IoT-систем',
      description: 'Всё о 3D-печати, микроконтроллерах STM32/ESP32, ROS 2 и сенсорах.',
      category: 'Robotics',
      avatar: '🦾',
      coverImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop&q=80',
      memberCount: 220,
      founderId: 'user-mentor-1',
      founderName: 'Данияр Касымов',
      isPrivate: false,
      perks: ['Библиотека 3D-моделей', 'Скидки на компоненты'],
      members: [],
      posts: []
    }
  ],

  parentRewards: [
    {
      id: 'preward-1',
      parentId: 'user-parent-1',
      studentId: 'user-student-1',
      title: 'Успешная защита MVP и участие в финале Startup Jam',
      targetGoal: 'Выпустить рабочую версию QazaqAgri AI и представить на питче',
      rewardDescription: 'Семейная поездка в горы + покупка нового набора датчиков для дрона',
      status: 'completed',
      created_at: '2026-10-10T10:00:00Z',
    },
    {
      id: 'preward-2',
      parentId: 'user-parent-1',
      studentId: 'user-student-1',
      title: 'Завершение первой четверти без троек и 5 закрытых квестов',
      targetGoal: 'Баланс учёбы в лицее и работы над стартапом',
      rewardDescription: 'Книга «От нуля к единице» Питера Тиля + годовая подписка на образовательный курс',
      status: 'active',
      created_at: '2026-11-01T10:00:00Z',
    }
  ],

  travelGrants: [
    {
      id: 'grant-1',
      studentId: 'user-student-1',
      studentName: 'Алихан Сейткали',
      eventName: 'Astana Hub Demo Day & Central Asia AI Summit 2026',
      destination: 'г. Астана',
      amountRequested: '85 000 ₸',
      justification: 'Оплата билетов на поезд Алматы-Астана и проживания в общежитии хаба для очной презентации проекта QazaqAgri AI перед венчурными фондами.',
      status: 'approved',
      parentalApprovalConfirmed: true,
      created_at: '2026-11-05T09:00:00Z',
    }
  ],

  resources: [
    {
      id: 'res-1',
      title: 'Global AI Cloud & GPU Founder Credits',
      description: 'Доступ к облачным GPU A100/H100, передовым AI API и образовательным трекам Deep Learning Institute.',
      category: 'AI Tools',
      partner: 'Cloud AI Alliance',
      partnerLogo: '⚡',
      eligibility: 'Школьные команды с проектами в области Computer Vision, LLM или Robotics',
      accessCodeOrUrl: 'https://startify.io/cloud-credits',
      claimedCount: 42,
      availableCount: 100,
      value: '$2,500 Cloud Credits',
    },
    {
      id: 'res-2',
      title: 'GitHub Student Developer Pack & Copilot',
      description: 'Бесплатный GitHub Pro, бесплатный GitHub Copilot, бесплатные домены .me и доступ к более чем 50 инструментам разработки.',
      category: 'Development',
      partner: 'GitHub Education',
      partnerLogo: '🐙',
      eligibility: 'Все верифицированные школьники AI Startify',
      accessCodeOrUrl: 'https://education.github.com/pack',
      claimedCount: 230,
      availableCount: 1000,
      value: 'Бесплатно ($200k value)',
    },
    {
      id: 'res-3',
      title: 'Supabase Pro Cloud Credits',
      description: 'Полноценный бэкенд на PostgreSQL с аутентификацией, Edge Functions и векторной базой pgvector для AI проектов.',
      category: 'Cloud & Hosting',
      partner: 'Supabase',
      partnerLogo: '⚡',
      eligibility: 'Участники Startup Jams',
      accessCodeOrUrl: 'https://supabase.com',
      claimedCount: 88,
      availableCount: 250,
      value: '$300 Credits',
    },
    {
      id: 'res-4',
      title: 'Figma Professional for EdTech Teams',
      description: 'Командная работа над интерфейсами приложений, прототипирование и интерактивные UI-киты для стартапов.',
      category: 'Design',
      partner: 'Figma',
      partnerLogo: '🎨',
      eligibility: 'Школьные команды',
      accessCodeOrUrl: 'https://figma.com/education',
      claimedCount: 160,
      availableCount: 500,
      value: 'Free Pro Tier',
    },
  ],

  realRewards: [
    {
      id: 'reward-1',
      title: 'Официальный мерч-сет: Худи AI Startify «Cyber Founder»',
      description: 'Премиальное оверсайз-худи с вышивкой светящимися неоновыми нитями и шевроном основателя.',
      category: 'Physical',
      quasarCost: 1200,
      image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500&auto=format&fit=crop&q=80',
      partner: 'AI Startify Brand Store',
      inStock: 15,
      deliveryMethod: 'Курьерская доставка по Казахстану и СНГ',
    },
    {
      id: 'reward-2',
      title: 'Набор разработчика Raspberry Pi 5 AI Kit (8GB)',
      description: 'Одноплатный микрокомпьютер со специализированным NPU ускорителем для запуска нейросетей на устройстве.',
      category: 'Hardware',
      quasarCost: 4500,
      image: 'https://images.unsplash.com/photo-1517055729445-fa7d27394b48?w=500&auto=format&fit=crop&q=80',
      partner: 'RoboShop KZ',
      inStock: 4,
      deliveryMethod: 'Доставка в школу или пункт выдачи',
    },
    {
      id: 'reward-3',
      title: 'Сертификат «Certified Young Tech Founder» (NFT + Печать)',
      description: 'Официальный верифицированный сертификат с фиксацией роли в проекте для портфолио в топовые вузы мира.',
      category: 'Digital',
      quasarCost: 600,
      image: 'https://images.unsplash.com/photo-1589330694653-dad6d3240a2b?w=500&auto=format&fit=crop&q=80',
      partner: 'Astana Hub & EdTech Council',
      inStock: 999,
      deliveryMethod: 'Мгновенная цифровая выдача с QR-верификацией',
    },
    {
      id: 'reward-4',
      title: 'Apple iPad 10.9" для проектирования интерфейсов',
      description: 'Планшет с поддержкой Apple Pencil для создания скетчей, мокапов и управления стартапом.',
      category: 'Hardware',
      quasarCost: 15000,
      image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&auto=format&fit=crop&q=80',
      partner: 'Kaspi Innovation Grant',
      inStock: 2,
      deliveryMethod: 'Вручение на финале сезона Demo Day',
    },
  ],

  events: [
    {
      id: 'event-1',
      title: 'Central Asia Young Founders Demo Day 2026',
      type: 'Demo Day',
      date: '2026-11-28T10:00:00Z',
      location: 'г. Астана, Astana Hub Main Stage & Онлайн трансляция',
      isOnline: true,
      description: 'Финальный питч лучших 15 школьных стартапов перед международными инвесторами и бизнес-ангелами.',
      travelGrantAvailable: true,
      registeredUsers: ['user-student-1', 'user-investor-1', 'user-mentor-1'],
    },
    {
      id: 'event-2',
      title: 'AI & Robotics School Expo Almaty',
      type: 'Startup Fair',
      date: '2026-12-06T11:00:00Z',
      location: 'г. Алматы, Парк Инновационных Технологий «Алатау»',
      isOnline: false,
      description: 'Выставка прототипов, дронов, экологических урн и мобильных приложений, созданных школьниками.',
      travelGrantAvailable: true,
      registeredUsers: ['user-student-1', 'user-parent-1'],
    },
    {
      id: 'event-3',
      title: 'Deep Learning & AI Workshop for Students',
      type: 'Workshop',
      date: '2026-11-21T16:00:00Z',
      location: 'Online Zoom + Discord Lab',
      isOnline: true,
      description: 'Практический воркшоп по интеграции продвинутых ИИ-моделей и тонкой настройке нейросетей для хакатонов.',
      travelGrantAvailable: false,
      registeredUsers: ['user-student-1', 'user-mentor-1'],
    },
  ],

  agentProposals: [
    {
      id: 'prop-1',
      type: 'generate_readme',
      title: 'Сгенерировать README.md для QazaqAgri AI',
      preview: 'Структурированное описание проекта с архитектурой YOLOv8, инструкцией по развёртыванию в Docker, бейджами сборки и ссылкой на демо.',
      actionPayload: {
        targetFile: 'README.md',
        contentSummary: '# QazaqAgri AI - Edge Computer Vision for Crop Disease Detection',
      },
      status: 'pending',
    },
    {
      id: 'prop-2',
      type: 'create_roadmap_task',
      title: 'Добавить задачу в GitHub: Интеграция мультиязычности (RU/KK/EN)',
      preview: 'Создать GitHub Issue #4 с описанием структуры локализации интерфейса мобильного приложения.',
      actionPayload: {
        issueTitle: 'i18n: Add Kazakh & English localization for farmer UI',
        labels: ['enhancement', 'ui'],
      },
      status: 'pending',
    },
  ],

  notifications: [
    {
      id: 'notif-1',
      userId: 'user-student-1',
      type: 'investor',
      title: 'Новое инвестиционное предложение!',
      message: 'Инвестор Аскар Жумадилов (QSF) направил предложение на грантовое финансирование 1 500 000 ₸ для вашего проекта QazaqAgri AI.',
      read: false,
      timestamp: '2026-11-13T10:02:00Z',
      actionUrl: '/dashboard?tab=investor-offers',
    },
    {
      id: 'notif-2',
      userId: 'user-student-1',
      type: 'jam',
      title: 'Шорт-лист «AI for Education Jam»',
      message: 'Ваш проект вошёл в топ-3 проектов конкурса! Итоговая оценка жюри: 96/100.',
      read: false,
      timestamp: '2026-11-13T16:00:00Z',
      actionUrl: '/jams',
    },
    {
      id: 'notif-3',
      userId: 'user-student-1',
      type: 'quasar',
      title: '+300 Quasar начислено!',
      message: 'Вы разблокировали 4-й уровень Battle Pass Season 01.',
      read: true,
      timestamp: '2026-11-13T12:01:00Z',
      actionUrl: '/wallet',
    },
  ],
};

// Singleton data container
class InMemoryDB {
  private data: DatabaseSchema;

  constructor() {
    this.data = JSON.parse(JSON.stringify(initialDatabase));
  }

  public getData(): DatabaseSchema {
    return this.data;
  }

  public getUser(id: string): User | undefined {
    return this.data.users.find(u => u.id === id);
  }

  public updateUser(id: string, updates: Partial<User>): User | undefined {
    const idx = this.data.users.findIndex(u => u.id === id);
    if (idx !== -1) {
      this.data.users[idx] = { ...this.data.users[idx], ...updates };
      return this.data.users[idx];
    }
    return undefined;
  }

  // Quasar Transaction with strict idempotency check
  public addTransaction(tx: Omit<QuasarTransaction, 'id' | 'timestamp'>): { success: boolean; error?: string; tx?: QuasarTransaction } {
    // Check duplicate idempotency key
    const existing = this.data.transactions.find(t => t.idempotencyKey === tx.idempotencyKey);
    if (existing) {
      return { success: false, error: 'Duplicate transaction detected. Idempotency protected.' };
    }

    const user = this.getUser(tx.userId);
    if (!user) {
      return { success: false, error: 'User not found' };
    }

    if (tx.type === 'debit' && user.quasarBalance < tx.amount) {
      return { success: false, error: 'Insufficient Quasar balance' };
    }

    const newTx: QuasarTransaction = {
      ...tx,
      id: `tx-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      timestamp: new Date().toISOString(),
    };

    if (tx.type === 'credit') {
      user.quasarBalance += tx.amount;
    } else if (tx.type === 'debit') {
      user.quasarBalance -= tx.amount;
    } else if (tx.type === 'refund') {
      user.quasarBalance += tx.amount;
    }

    this.data.transactions.unshift(newTx);
    return { success: true, tx: newTx };
  }

  // Startup Promotion
  public buyPromotion(startupId: string, userId: string, pkg: { type: any; name: string; cost: number; days: number }): { success: boolean; error?: string } {
    const startup = this.data.startups.find(s => s.id === startupId);
    if (!startup) return { success: false, error: 'Startup not found' };

    const txRes = this.addTransaction({
      userId,
      type: 'debit',
      amount: pkg.cost,
      category: 'Promotion',
      source: `${pkg.type}_campaign`,
      description: `Активация продвижения: ${pkg.name} (${pkg.days} дней)`,
      idempotencyKey: `promo-${startupId}-${pkg.type}-${Date.now()}`,
      targetId: startupId,
    });

    if (!txRes.success) return txRes;

    const newPromo = {
      id: `promo-${Date.now()}`,
      startupId,
      packageType: pkg.type,
      packageName: pkg.name,
      costQuasar: pkg.cost,
      durationDays: pkg.days,
      impressions: 0,
      clicks: 0,
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + pkg.days * 86400000).toISOString(),
      status: 'active' as const,
    };

    startup.promotions.push(newPromo);
    return { success: true };
  }

  // Create Startup
  public createStartup(startupData: Omit<StartupProject, 'id' | 'viewsCount' | 'bookmarksCount' | 'verifiedMilestones' | 'devScore' | 'activityScore' | 'promotions' | 'created_at' | 'updated_at'>): StartupProject {
    const newStartup: StartupProject = {
      ...startupData,
      id: `startup-${Date.now()}`,
      viewsCount: 1,
      bookmarksCount: 0,
      verifiedMilestones: 1,
      devScore: 85,
      activityScore: 80,
      promotions: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    this.data.startups.unshift(newStartup);

    // Reward for project creation
    this.addTransaction({
      userId: startupData.authorId,
      type: 'credit',
      amount: 200,
      category: 'Quest',
      source: 'project_created',
      description: `Награда за публикацию нового стартапа: ${startupData.title}`,
      idempotencyKey: `init-startup-${newStartup.id}`,
      targetId: newStartup.id,
    });

    return newStartup;
  }

  // Investor creates offer
  public createOffer(offerData: Omit<InvestmentOffer, 'id' | 'status' | 'auditTrail' | 'created_at' | 'parentConsentApproved'>): InvestmentOffer {
    const newOffer: InvestmentOffer = {
      ...offerData,
      id: `offer-${Date.now()}`,
      status: 'pending',
      parentConsentApproved: false,
      auditTrail: [
        {
          timestamp: new Date().toISOString(),
          action: 'created',
          details: `Предложение сформировано инвестором ${offerData.investorName}`,
        }
      ],
      created_at: new Date().toISOString(),
    };

    this.data.offers.unshift(newOffer);

    // Notify startup author
    const startup = this.data.startups.find(s => s.id === offerData.startupId);
    if (startup) {
      this.data.notifications.unshift({
        id: `notif-${Date.now()}`,
        userId: startup.authorId,
        type: 'investor',
        title: 'Новое инвестиционное предложение!',
        message: `${offerData.investorName} (${offerData.investorOrg}) направил предложение: "${offerData.title}" на сумму/условия: ${offerData.amountOrValue}`,
        read: false,
        timestamp: new Date().toISOString(),
      });
    }

    return newOffer;
  }

  // Update Offer status (Accept / Decline)
  public updateOfferStatus(offerId: string, status: 'accepted' | 'declined', actor: string, notes?: string): boolean {
    const offer = this.data.offers.find(o => o.id === offerId);
    if (!offer) return false;

    offer.status = status;
    offer.auditTrail.push({
      timestamp: new Date().toISOString(),
      action: status,
      details: `${actor} изменил статус на ${status}. ${notes || ''}`,
    });
    return true;
  }

  // Create Startup Jam
  public createJam(jamData: Omit<StartupJam, 'id' | 'submissionsCount' | 'payoutSchedule' | 'isPrizePoolVerified'>): StartupJam {
    const newJam: StartupJam = {
      ...jamData,
      id: `jam-${Date.now()}`,
      isPrizePoolVerified: true,
      submissionsCount: 0,
      payoutSchedule: [
        { rank: 1, title: '1 Место', prize: `${jamData.prizePoolAmount} (50%)`, payoutStatus: 'escrowed' },
        { rank: 2, title: '2 Место', prize: `${jamData.prizePoolAmount} (30%)`, payoutStatus: 'escrowed' },
        { rank: 3, title: '3 Место', prize: `${jamData.prizePoolAmount} (20%)`, payoutStatus: 'escrowed' },
      ],
    };
    this.data.jams.unshift(newJam);
    return newJam;
  }

  // Submit project to Jam
  public submitToJam(submission: Omit<JamSubmission, 'id' | 'submittedAt' | 'scores' | 'averageScore' | 'shortlisted'>): JamSubmission {
    const newSub: JamSubmission = {
      ...submission,
      id: `sub-${Date.now()}`,
      submittedAt: new Date().toISOString(),
      scores: [],
      averageScore: 0,
      shortlisted: false,
    };
    this.data.submissions.unshift(newSub);

    const jam = this.data.jams.find(j => j.id === submission.jamId);
    if (jam) {
      jam.submissionsCount += 1;
    }

    // Award participation Quasar
    this.addTransaction({
      userId: submission.submitterId,
      type: 'credit',
      amount: 150,
      category: 'Jam',
      source: 'jam_submission',
      description: `Участие в соревновании «${jam?.title || 'Startup Jam'}»`,
      idempotencyKey: `jam-submit-${newSub.id}`,
      targetId: submission.jamId,
    });

    return newSub;
  }
}

// Global DB instance
declare global {
  // eslint-disable-next-line no-var
  var __startify_db: InMemoryDB | undefined;
}

export function getDB(): InMemoryDB {
  if (!global.__startify_db) {
    global.__startify_db = new InMemoryDB();
  }
  return global.__startify_db;
}
