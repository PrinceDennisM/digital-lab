/** @type {import('../domain/models/index.js').ProjectScorecard} */
export const EMPTY_SCORECARD = {
  effort: null,
  progress: null,
  momentum: null,
  research: null,
  design: null,
  prototype: null,
  testing: null,
  health: null,
  outcome: null,
  units: {
    effort: 'minutes',
    progress: 'percent',
    momentum: 'percent',
    research: 'percent',
    design: 'percent',
    prototype: 'percent',
    testing: 'percent',
    health: 'percent',
    outcome: 'percent',
  },
}

/** @type {import('./types.js').Profile} */
export const profile = {
  name: 'Dennis Mwangi',
  title: 'Systems Builder',
  location: 'Nairobi, Kenya',
  mission:
    'Building robust systems across fintech, trading, and product engineering — turning complex requirements into production-ready software.',
  philosophy:
    'AI is not here to replace my thinking. It is here to amplify it.',
  focusAreas: [
    'Trading & market infrastructure',
    'Fintech product engineering',
    'AI-assisted development workflows',
    'Team leadership & technical delivery',
  ],
  stack: [
    'React',
    'Next.js',
    'TypeScript',
    'Node.js',
    'Python',
    'PostgreSQL',
    'GraphQL',
    'WebSockets',
  ],
}

/** @type {import('./types.js').Experiment[]} */
export const experiments = [
  {
    id: 'exp-digital-lab',
    title: 'Digital Lab',
    hypothesis:
      'A personal R&D command centre can unify curiosity, experiments, and documented learning — with AI amplifying research and synthesis while keeping human decision authority.',
    state: 'BUILDING',
    updatedAt: '2026-08-17',
    note: 'v0.2 — project workspaces and domain model.',
    linkedProjectSlug: 'digital-lab',
  },
  {
    id: 'exp-ai-workflow',
    title: 'AI-Augmented Engineering Workflow',
    hypothesis:
      'Structured prompts and review checkpoints can make AI a reliable collaborator for research, criticism, and documentation without bypassing engineering judgment.',
    state: 'RESEARCH',
    updatedAt: '2026-08-10',
    linkedProjectSlug: 'digital-lab',
  },
  {
    id: 'exp-lab-notebook',
    title: 'Lab Notebook Pattern',
    hypothesis:
      'Linking experiments, build logs, and knowledge notes in one timeline improves recall and decision quality across long-running projects.',
    state: 'EXPERIMENT',
    updatedAt: '2026-08-05',
    linkedProjectSlug: 'digital-lab',
  },
]

/** @type {import('../domain/models/index.js').ProjectDetail[]} */
export const projects = [
  {
    id: 'proj-digital-lab',
    slug: 'digital-lab',
    title: 'Digital Lab',
    description:
      'Personal R&D command centre — curiosity, experiments, prototypes, and documented learning.',
    narrative:
      'An evolving laboratory environment where Dennis directs research and building, with AI assistance planned for research, engineering, design, analysis, criticism, synthesis, and documentation.',
    state: 'BUILDING',
    tags: ['R&D', 'React', 'AI Workflow'],
    context: 'Personal lab — active development.',
    updatedAt: '2026-08-17',
    scorecard: { ...EMPTY_SCORECARD },
    ai: null,
    linkedExperimentIds: [
      'exp-digital-lab',
      'exp-ai-workflow',
      'exp-lab-notebook',
    ],
    linkedCuriosityIds: ['cur-1', 'cur-2'],
    linkedKnowledgeIds: [],
    provenance: [
      {
        id: 'prov-dl-1',
        timestamp: '2026-08-17T00:00:00.000Z',
        actorType: 'human',
        actorId: 'dennis',
        action: 'established',
        subject: 'Repository foundation and lab philosophy',
        rationale: 'Defined Digital Lab as a personal R&D environment.',
        authority: 'binding',
      },
      {
        id: 'prov-dl-2',
        timestamp: '2026-08-17T00:00:00.000Z',
        actorType: 'human',
        actorId: 'dennis',
        action: 'approved',
        subject: 'v0.1 front-end dashboard scope',
        rationale: 'Command centre, sections, and New Idea capture.',
        authority: 'binding',
      },
      {
        id: 'prov-dl-3',
        timestamp: '2026-08-17T00:00:00.000Z',
        actorType: 'human',
        actorId: 'dennis',
        action: 'approved',
        subject: 'v0.2 architecture — project workspaces and domain model',
        rationale: 'Hash routing, scorecard schema, provenance model, AI registry infrastructure.',
        authority: 'binding',
      },
    ],
  },
  {
    id: 'proj-day-trader-pro',
    slug: 'day-trader-pro',
    title: 'Day Trader Pro',
    description:
      'Unified trading interface connecting centralized exchanges and DeFi protocols into one execution experience.',
    state: 'ACTIVE',
    tags: ['Trading', 'WebSockets', 'React'],
    context: 'EQAM Capital — publicly described professional work.',
    updatedAt: '2025-01-01',
    scorecard: { ...EMPTY_SCORECARD },
    ai: null,
    linkedExperimentIds: [],
    linkedCuriosityIds: ['cur-4'],
    linkedKnowledgeIds: ['know-2'],
    provenance: [],
  },
  {
    id: 'proj-dextra-bot',
    slug: 'dextra-bot',
    title: 'Dextra Bot',
    description:
      'Hyperliquid trading automation platform for execution, copy trading, analytics, and real-time market interaction.',
    state: 'ACTIVE',
    tags: ['Trading', 'Automation', 'Real-time'],
    context: 'EQAM Capital — publicly described professional work.',
    updatedAt: '2025-01-01',
    scorecard: { ...EMPTY_SCORECARD },
    ai: null,
    linkedExperimentIds: [],
    linkedCuriosityIds: [],
    linkedKnowledgeIds: [],
    provenance: [],
  },
  {
    id: 'proj-ngeni-delivery',
    slug: 'ngeni-labs-delivery',
    title: 'NGENI Labs Product Delivery',
    description:
      'Led frontend delivery across dashboards, onboarding flows, trading interfaces, admin portals, and data-heavy financial screens.',
    state: 'ACTIVE',
    tags: ['Fintech', 'React', 'Next.js', 'Leadership'],
    context: 'NGENI LABs — Lead Software Engineer role.',
    updatedAt: '2025-01-01',
    scorecard: { ...EMPTY_SCORECARD },
    ai: null,
    linkedExperimentIds: [],
    linkedCuriosityIds: [],
    linkedKnowledgeIds: ['know-3'],
    provenance: [],
  },
  {
    id: 'proj-tufikee',
    slug: 'tufikee',
    title: 'Tufikee!',
    description:
      'Events services venture — early-stage product and platform exploration.',
    state: 'BUILDING',
    tags: ['Events', 'Product'],
    context: 'Founder — in-progress venture.',
    updatedAt: '2025-10-01',
    scorecard: { ...EMPTY_SCORECARD },
    ai: null,
    linkedExperimentIds: [],
    linkedCuriosityIds: [],
    linkedKnowledgeIds: [],
    provenance: [],
  },
]

/** @type {import('./types.js').CuriosityItem[]} */
export const curiosity = [
  {
    id: 'cur-1',
    question:
      'How should an AI lab workflow preserve audit trails of human decisions vs. model suggestions?',
    context: 'Digital Lab architecture',
    state: 'RESEARCH',
  },
  {
    id: 'cur-2',
    question:
      'What is the minimum viable state model for experiments that graduate into production projects?',
    context: 'Lab process design',
    state: 'EXPERIMENT',
  },
  {
    id: 'cur-3',
    question:
      'Can curiosity items be ranked by potential impact without turning the lab into a productivity dashboard?',
    context: 'UX philosophy',
    state: 'RESEARCH',
  },
  {
    id: 'cur-4',
    question:
      'How do real-time trading UIs balance information density with decision speed under WebSocket load?',
    context: 'From Day Trader Pro delivery experience',
    state: 'REVIEW',
  },
]

/** @type {import('./types.js').KnowledgeEntry[]} */
export const knowledge = [
  {
    id: 'know-1',
    title: 'Stanford — AI in Financial Technology',
    topic: 'Education',
    date: '2024',
    summary:
      'Formal study of AI applications in financial technology and regulated environments.',
  },
  {
    id: 'know-2',
    title: 'WebSocket State Normalization for Trading UIs',
    topic: 'Engineering',
    date: '2025',
    summary:
      'Patterns for normalized state, caching, and fault-tolerant rendering under high-frequency market updates.',
  },
  {
    id: 'know-3',
    title: 'Friction Reduction in Fintech Onboarding',
    topic: 'Product',
    date: '2025',
    summary:
      'Notes on simplifying user journeys across KYC, funding, and first-value moments in financial products.',
  },
]

/** @type {import('./types.js').BuildLogEntry[]} */
export const buildLog = [
  {
    id: 'log-1',
    date: '2026-08-17',
    action: 'Established repository foundation',
    entity: 'Digital Lab',
    state: 'BUILDING',
    projectSlug: 'digital-lab',
  },
  {
    id: 'log-2',
    date: '2026-08-17',
    action: 'Defined lab philosophy and product vision',
    entity: 'Digital Lab README',
    state: 'REVIEW',
    projectSlug: 'digital-lab',
  },
  {
    id: 'log-3',
    date: '2026-08-10',
    action: 'Drafted AI workflow integration concept',
    entity: 'AI Lab',
    state: 'RESEARCH',
    projectSlug: 'digital-lab',
  },
  {
    id: 'log-4',
    date: '2026-08-05',
    action: 'Mapped experiment lifecycle states',
    entity: 'Lab Notebook Pattern',
    state: 'EXPERIMENT',
    projectSlug: 'digital-lab',
  },
]

export const aiLabWorkflow = [
  {
    step: 'Idea',
    description: 'Dennis captures a question, hypothesis, or build intent.',
  },
  {
    step: 'Research',
    description: 'AI assists with literature, code context, and domain exploration.',
  },
  {
    step: 'Build',
    description: 'AI supports engineering, design, and analysis — Dennis directs.',
  },
  {
    step: 'Critique',
    description: 'AI challenges assumptions; Dennis retains final authority.',
  },
  {
    step: 'Document',
    description: 'Findings synthesised into knowledge and build log entries.',
  },
]

export const navSections = [
  { id: 'command', label: 'Command Centre' },
  { id: 'experiments', label: 'Experiments' },
  { id: 'projects', label: 'Projects' },
  { id: 'curiosity', label: 'Curiosity' },
  { id: 'ai-lab', label: 'AI Lab' },
  { id: 'knowledge', label: 'Knowledge' },
  { id: 'build-log', label: 'Build Log' },
  { id: 'resume', label: 'Resume' },
]
