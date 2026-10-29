import { SEED_EVIDENCE } from './seed.js'

const STORAGE_KEY = 'digital-lab-evidence-append'

/** @returns {import('./models.js').Evidence[]} */
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

function writeAppended(entries) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
}

export function getAllEvidence() {
  return [...SEED_EVIDENCE, ...readAppended()]
}

/** @param {string} projectId */
export function listByProject(projectId) {
  return getAllEvidence().filter((e) => e.projectId === projectId)
}

/**
 * @param {Omit<import('./models.js').Evidence, 'id' | 'createdAt'> & { id?: string, createdAt?: string }} entry
 */
export function append(entry) {
  const appended = readAppended()
  const record = {
    ...entry,
    id: entry.id ?? `ev-${Date.now()}`,
    createdAt: entry.createdAt ?? new Date().toISOString(),
  }
  appended.push(record)
  writeAppended(appended)
  return record
}
