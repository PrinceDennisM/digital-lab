import {
  projects,
  experiments,
  curiosity,
  knowledge,
  buildLog,
} from '../../data/seed.js'
import { SCORECARD_METRICS } from '../constants/metrics.js'

/** @param {string} slug */
export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug) ?? null
}

/** @param {import('../models/index.js').ProjectDetail} project */
export function getLinkedExperiments(project) {
  return experiments.filter((e) =>
    project.linkedExperimentIds.includes(e.id),
  )
}

/** @param {import('../models/index.js').ProjectDetail} project */
export function getLinkedCuriosity(project) {
  return curiosity.filter((c) => project.linkedCuriosityIds.includes(c.id))
}

/** @param {import('../models/index.js').ProjectDetail} project */
export function getLinkedKnowledge(project) {
  return knowledge.filter((k) => project.linkedKnowledgeIds.includes(k.id))
}

/** @param {import('../models/index.js').ProjectDetail} project */
export function getProjectActivity(project) {
  return buildLog.filter(
    (entry) =>
      entry.projectSlug === project.slug ||
      entry.entity.toLowerCase().includes(project.title.toLowerCase()),
  )
}

/** @param {import('../models/index.js').ProjectScorecard | null} scorecard */
export function hasAnyMetric(scorecard) {
  if (!scorecard) return false
  return SCORECARD_METRICS.some((m) => {
    const metric = scorecard[m.key]
    return metric?.value !== null && metric?.value !== undefined
  })
}

/** @param {import('../models/index.js').AiContributionSummary | null} ai */
export function hasAiContributions(ai) {
  return Boolean(ai?.contributions?.length)
}
