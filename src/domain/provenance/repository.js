import { SEED_PROVENANCE } from './seed.js'

const STORAGE_KEY = 'digital-lab-provenance-append'
export const PROVENANCE_CHANGE_EVENT = 'digital-lab-provenance-changed'

/** @returns {import('./models.js').ProvenanceEntry[]} */
function readAppended() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

/** @param {import('./models.js').ProvenanceEntry[]} entries */
function writeAppended(entries) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
  } catch {
    // Ignore storage write failures
  }
}

/** @returns {import('./models.js').ProvenanceEntry[]} */
export function getAllProvenance() {
  return [...SEED_PROVENANCE, ...readAppended()]
}

/** @param {string} projectId */
export function listByProject(projectId) {
  return getAllProvenance().filter((e) => e.projectId === projectId)
}

/** @param {string} actorId */
export function listByActor(actorId) {
  return getAllProvenance().filter((e) => e.actorId === actorId)
}

/** @param {import('./models.js').ProvenanceEventType} eventType */
export function listByType(eventType) {
  return getAllProvenance().filter((e) => e.eventType === eventType)
}

/**
 * Append-only. Seed records cannot be modified or removed.
 * @param {Omit<import('./models.js').ProvenanceEntry, 'id' | 'timestamp' | 'immutable'> & { id?: string, timestamp?: string }} entry
 */
export function append(entry) {
  const appended = readAppended()
  const record = {
    ...entry,
    id: entry.id ?? `prov-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    timestamp: entry.timestamp ?? new Date().toISOString(),
    immutable: false,
  }
  appended.push(record)
  writeAppended(appended)

  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent(PROVENANCE_CHANGE_EVENT, { detail: record }),
    )
  }

  return record
}

/** Seed entries are immutable — no update/delete APIs exposed. */

