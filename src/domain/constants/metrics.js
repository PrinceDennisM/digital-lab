export const WORKSPACE_PANELS = [
  { id: 'overview', label: 'Overview' },
  { id: 'scorecard', label: 'Scorecard' },
  { id: 'provenance', label: 'Provenance' },
  { id: 'activity', label: 'Activity' },
]

export const SCORECARD_METRICS = [
  {
    key: 'effort',
    label: 'Effort',
    description: 'Time and work invested (minutes or hours).',
    unitKey: 'effort',
  },
  {
    key: 'progress',
    label: 'Progress',
    description: 'Movement toward the intended outcome.',
    unitKey: 'progress',
  },
  {
    key: 'momentum',
    label: 'Momentum',
    description: 'Recent rate of meaningful activity.',
    unitKey: 'momentum',
  },
  {
    key: 'research',
    label: 'Research',
    description: 'Depth and quality of investigation.',
    unitKey: 'research',
  },
  {
    key: 'design',
    label: 'Design',
    description: 'Clarity and readiness of design decisions.',
    unitKey: 'design',
  },
  {
    key: 'prototype',
    label: 'Prototype',
    description: 'Working artifact maturity.',
    unitKey: 'prototype',
  },
  {
    key: 'testing',
    label: 'Testing',
    description: 'Validation and confidence in the approach.',
    unitKey: 'testing',
  },
  {
    key: 'health',
    label: 'Health',
    description: 'Viability of the current approach.',
    unitKey: 'health',
  },
]

export const FUTURE_METRICS = [
  {
    key: 'outcome',
    label: 'Outcome',
    description: 'Eventual real-world result — tracked when available.',
    unitKey: 'outcome',
  },
]

export const DERIVED_METRIC_HINTS = [
  {
    key: 'effortToProgress',
    label: 'Effort-to-progress ratio',
    description: 'Requires both effort and progress data — not computed in v0.2.',
  },
]
