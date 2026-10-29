import { listByProject, getAllProvenance } from './repository.js'

/** @param {string} projectId */
export function getProjectProvenance(projectId) {
  return listByProject(projectId).sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  )
}

/** @param {number} [limit] */
export function getRecentDecisions(limit = 5) {
  return getAllProvenance()
    .filter(
      (e) =>
        e.eventType === 'decision' ||
        e.action === 'decided' ||
        e.action === 'approved' ||
        e.action === 'rejected' ||
        e.action === 'state_changed',
    )
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, limit)
}

/** @param {string} projectId */
export function getBindingDecisions(projectId) {
  return listByProject(projectId).filter((e) => e.authority === 'binding')
}

/** @param {string} projectId */
export function getRejections(projectId) {
  return listByProject(projectId).filter((e) => e.action === 'rejected')
}

/** @param {import('./models.js').ProvenanceEntry[]} entries */
export function deriveActivityFromProvenance(entries) {
  return entries.map((e) => ({
    id: e.id,
    date: e.timestamp.slice(0, 10),
    action: `${e.action}: ${e.subject}`,
    entity: e.actorType === 'human' ? 'Dennis' : e.actorId,
    state: e.metadata?.toState,
    projectSlug: undefined,
  }))
}

import { SEED_AI_OUTPUTS } from './seed.js'

/** @returns {import('./models.js').AiOutput[]} */
export function getPendingAiReviews() {
  return SEED_AI_OUTPUTS.filter((o) => o.reviewStatus === 'pending_review')
}
