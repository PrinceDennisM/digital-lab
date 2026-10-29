/**
 * Future analytics repository — tracking not implemented in v0.2.
 *
 * @typedef {import('../domain/models/index.js').AnalyticsEvent} AnalyticsEvent
 * @typedef {import('../domain/models/index.js').ProjectAnalyticsSummary} ProjectAnalyticsSummary
 */

export const analytics = {
  async getProjectSummary(projectId) {
    void projectId
    return null
  },

  async track(event) {
    void event
    // no-op until analytics backend exists
  },

  isEnabled: false,
}
