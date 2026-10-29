import {
  profile,
  experiments,
  curiosity,
  knowledge,
  buildLog,
  projects,
  navSections,
  aiLabWorkflow,
} from './seed.js'

/**
 * @typedef {import('../domain/models/index.js').LabRepository} LabRepository
 */

/** @type {LabRepository} */
export const repository = {
  async getProfile() {
    return profile
  },

  async listProjects() {
    return projects
  },

  async getProject(slug) {
    return projects.find((p) => p.slug === slug) ?? null
  },

  async listExperiments() {
    return experiments
  },

  async listCuriosity() {
    return curiosity
  },

  async listKnowledge() {
    return knowledge
  },

  async listBuildLog() {
    return buildLog
  },

  async getNavSections() {
    return navSections
  },

  async getAiLabWorkflow() {
    return aiLabWorkflow
  },
}
