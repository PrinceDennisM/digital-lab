/**
 * Append-only provenance event log — source of truth for lab history.
 *
 * @typedef {'human' | 'ai'} ActorType
 * Collaborative is deprecated: represent AI output + human review as separate events.
 *
 * @typedef {'proposed' | 'drafted' | 'reviewed' | 'approved' | 'rejected' | 'modified' | 'decided' | 'state_changed' | 'observed' | 'logged' | 'established'} ProvenanceAction
 *
 * @typedef {'decision' | 'ai_output' | 'state_change' | 'observation' | 'work' | 'evidence' | 'idea' | 'review'} ProvenanceEventType
 *
 * @typedef {'binding' | 'advisory'} ProvenanceAuthority
 *
 * @typedef {Object} ProvenanceEntry
 * @property {string} id
 * @property {string} projectId
 * @property {string} timestamp
 * @property {ProvenanceEventType} eventType
 * @property {ProvenanceAction} action
 * @property {ActorType} actorType
 * @property {string} actorId
 * @property {string} subject
 * @property {string} [rationale] — strongly encouraged for binding human decisions
 * @property {ProvenanceAuthority} authority
 * @property {string} [aiOutputId] — specific output under review
 * @property {string} [aiContributionId]
 * @property {string[]} [evidenceIds]
 * @property {Record<string, string>} [metadata] — e.g. fromState, toState
 * @property {boolean} [immutable] — seed records are immutable
 */

/**
 * @typedef {Object} AiOutput
 * @property {string} id
 * @property {string} projectId
 * @property {string} aiSystemId
 * @property {string} [taskId]
 * @property {import('../models/index.js').AiContributionDomain[]} domains
 * @property {string} summary
 * @property {string} [contentRef]
 * @property {'pending_review' | 'approved' | 'rejected'} reviewStatus
 * @property {string} createdAt
 */

export {}
