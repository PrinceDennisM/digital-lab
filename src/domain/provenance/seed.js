/** @type {import('./models.js').ProvenanceEntry[]} */
export const SEED_PROVENANCE = [
  {
    id: 'prov-dl-1',
    projectId: 'proj-digital-lab',
    timestamp: '2026-08-17T00:00:00.000Z',
    eventType: 'decision',
    action: 'established',
    actorType: 'human',
    actorId: 'dennis',
    subject: 'Repository foundation and lab philosophy',
    rationale: 'Defined Digital Lab as a personal R&D environment.',
    authority: 'binding',
    immutable: true,
  },
  {
    id: 'prov-dl-2',
    projectId: 'proj-digital-lab',
    timestamp: '2026-08-17T00:00:00.000Z',
    eventType: 'decision',
    action: 'approved',
    actorType: 'human',
    actorId: 'dennis',
    subject: 'v0.1 front-end dashboard scope',
    rationale: 'Command centre, sections, and New Idea capture.',
    authority: 'binding',
    immutable: true,
  },
  {
    id: 'prov-dl-3',
    projectId: 'proj-digital-lab',
    timestamp: '2026-08-17T00:00:00.000Z',
    eventType: 'decision',
    action: 'approved',
    actorType: 'human',
    actorId: 'dennis',
    subject: 'v0.2 architecture — project workspaces and domain model',
    rationale:
      'Hash routing, scorecard schema, provenance model, AI registry infrastructure.',
    authority: 'binding',
    immutable: true,
  },
]

/** @type {import('./models.js').AiOutput[]} */
export const SEED_AI_OUTPUTS = []
