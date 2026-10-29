/**
 * Future orchestrator client — not connected in v0.2.
 * Workflow: Human initiates → Orchestrator → Specialist AI → Result → Provenance → Human approval
 *
 * @typedef {import('../domain/models/index.js').OrchestratorTask} OrchestratorTask
 */

/** @type {import('../domain/models/index.js').OrchestratorTask | null} */
let lastTask = null

export const orchestrator = {
  /** @returns {Promise<never>} */
  async dispatch() {
    throw new Error('Orchestrator not connected — AI dispatch is not available in v0.2.')
  },

  /** @param {string} taskId */
  async getStatus(taskId) {
    if (lastTask?.id === taskId) return lastTask
    throw new Error(`Task not found: ${taskId}`)
  },

  isConnected: false,
}
