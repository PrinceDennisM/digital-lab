/**
 * Trust is derived from provenance — never fabricated.
 * @typedef {import('../models/index.js').AiContributionDomain} AiDomain
 *
 * @typedef {Object} AiTrustRecord
 * @property {string} aiSystemId
 * @property {AiDomain} domain
 * @property {number | null} acceptedCount
 * @property {number | null} rejectedCount
 * @property {number | null} acceptanceRate
 * @property {string | null} lastReviewedAt
 */

import { getAllProvenance } from '../provenance/repository.js'
import { AI_SYSTEMS } from '../constants/aiSystems.js'

/** @returns {AiTrustRecord[] | null} null means not enough data */
export function getTrustHistory() {
  const reviews = getAllProvenance().filter(
    (e) =>
      e.eventType === 'review' ||
      e.action === 'approved' ||
      e.action === 'rejected',
  )

  if (reviews.length === 0) return null

  /** @type {Map<string, AiTrustRecord>} */
  const map = new Map()

  for (const entry of reviews) {
    if (entry.actorType !== 'human') continue
    const systemId = entry.metadata?.aiSystemId ?? entry.aiContributionId
    const domain = entry.metadata?.domain
    if (!systemId || !domain) continue

    const key = `${systemId}:${domain}`
    if (!map.has(key)) {
      map.set(key, {
        aiSystemId: systemId,
        domain,
        acceptedCount: 0,
        rejectedCount: 0,
        acceptanceRate: null,
        lastReviewedAt: entry.timestamp,
      })
    }
    const record = map.get(key)
    if (entry.action === 'approved') record.acceptedCount += 1
    if (entry.action === 'rejected') record.rejectedCount += 1
    record.lastReviewedAt = entry.timestamp
  }

  if (map.size === 0) return null

  return [...map.values()].map((r) => {
    const total = (r.acceptedCount ?? 0) + (r.rejectedCount ?? 0)
    return {
      ...r,
      acceptanceRate: total > 0 ? (r.acceptedCount ?? 0) / total : null,
    }
  })
}

export function getRegisteredSystems() {
  return Object.values(AI_SYSTEMS)
}
