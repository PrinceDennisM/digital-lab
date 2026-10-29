/**
 * @typedef {'ACTIVE' | 'EXPERIMENT' | 'RESEARCH' | 'BUILDING' | 'REVIEW' | 'ARCHIVED'} WorkState
 */

/**
 * @typedef {'unset' | 'manual' | 'computed'} MetricSource
 *
 * @typedef {Object} MetricValue
 * @property {number | null} value
 * @property {MetricSource} source
 * @property {string | null} updatedAt
 * @property {string | null} updatedBy
 * @property {string | null} note
 */

/**
 * @typedef {Object} ProjectScorecard
 * @property {MetricValue | null} effort
 * @property {MetricValue | null} progress
 * @property {MetricValue | null} momentum
 * @property {MetricValue | null} research
 * @property {MetricValue | null} design
 * @property {MetricValue | null} prototype
 * @property {MetricValue | null} testing
 * @property {MetricValue | null} health
 * @property {MetricValue | null} [outcome]
 * @property {Record<string, string>} [units]
 */

/**
 * @typedef {'research' | 'analysis' | 'design' | 'coding' | 'documentation' | 'criticism' | 'synthesis'} AiContributionDomain
 *
 * @typedef {Object} AiSystemRef
 * @property {string} id
 * @property {string} displayName
 * @property {string} iconKey
 * @property {string} [provider]
 *
 * @typedef {Object} AiContribution
 * @property {string} id
 * @property {string} aiSystemId
 * @property {AiContributionDomain[]} domains
 * @property {string} summary
 * @property {string} recordedAt
 * @property {string} [artifactRef]
 *
 * @typedef {Object} AiContributionSummary
 * @property {AiSystemRef[]} systems
 * @property {AiContribution[]} contributions
 */

/**
 * @typedef {'human' | 'ai' | 'collaborative'} ActorType
 *
 * @typedef {Object} ProvenanceEntry
 * @property {string} id
 * @property {string} timestamp
 * @property {ActorType} actorType
 * @property {string} actorId
 * @property {string} action
 * @property {string} subject
 * @property {string} [rationale]
 * @property {string | null} [aiContributionId]
 * @property {'binding' | 'advisory'} authority
 */

/**
 * @typedef {Object} ProjectSummary
 * @property {string} id
 * @property {string} slug
 * @property {string} title
 * @property {string} description
 * @property {WorkState} state
 * @property {string[]} tags
 * @property {string} [context]
 * @property {string} updatedAt
 * @property {ProjectScorecard | null} scorecard
 * @property {AiContributionSummary | null} ai
 * @property {string[]} linkedExperimentIds
 * @property {string[]} linkedCuriosityIds
 * @property {string[]} linkedKnowledgeIds
 */

/**
 * @typedef {ProjectSummary & {
 *   narrative?: string,
 *   provenance: ProvenanceEntry[],
 * }} ProjectDetail
 */

/**
 * @typedef {Object} Experiment
 * @property {string} id
 * @property {string} title
 * @property {string} hypothesis
 * @property {WorkState} state
 * @property {string} updatedAt
 * @property {string} [note]
 * @property {string} [linkedProjectSlug]
 */

/**
 * @typedef {Object} CuriosityItem
 * @property {string} id
 * @property {string} question
 * @property {string} context
 * @property {WorkState} state
 */

/**
 * @typedef {Object} KnowledgeEntry
 * @property {string} id
 * @property {string} title
 * @property {string} topic
 * @property {string} date
 * @property {string} summary
 */

/**
 * @typedef {Object} BuildLogEntry
 * @property {string} id
 * @property {string} date
 * @property {string} action
 * @property {string} entity
 * @property {WorkState} [state]
 * @property {string} [projectSlug]
 */

/**
 * @typedef {'observed' | 'sourced' | 'ai_unverified'} FindingConfidence
 *
 * @typedef {Object} IdeaFinding
 * @property {string} id
 * @property {string} ideaId
 * @property {string} finding
 * @property {string} [significance]
 * @property {string} [source]
 * @property {FindingConfidence} confidence
 * @property {string} [aiSystemId]
 * @property {string} [nextStep]
 * @property {string} recordedAt
 */

/**
 * @typedef {Object} CapturedIdea
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {'curiosity' | 'experiment' | 'project'} category
 * @property {string} capturedAt
 * @property {string} [updatedAt]
 * @property {string} [projectId]
 * @property {string} [projectTitle]
 * @property {IdeaFinding[]} [findings]
 */



/**
 * @typedef {Object} Profile
 * @property {string} name
 * @property {string} title
 * @property {string} location
 * @property {string} mission
 * @property {string} philosophy
 * @property {string[]} focusAreas
 * @property {string[]} stack
 */

/**
 * @typedef {'page_view' | 'section_view' | 'download' | 'interaction' | 'time_on_page'} AnalyticsEventType
 *
 * @typedef {Object} AnalyticsEvent
 * @property {string} id
 * @property {AnalyticsEventType} type
 * @property {string} projectId
 * @property {string} timestamp
 * @property {Record<string, string | number>} [metadata]
 *
 * @typedef {Object} ProjectAnalyticsSummary
 * @property {string} projectId
 * @property {number | null} totalViews
 * @property {number | null} uniqueVisitors
 * @property {Record<AnalyticsEventType, number>} [eventCounts]
 * @property {string | null} lastViewedAt
 */

/**
 * @typedef {'research' | 'engineering' | 'design' | 'analysis' | 'criticism' | 'synthesis'} OrchestratorTaskType
 *
 * @typedef {Object} OrchestratorTask
 * @property {string} id
 * @property {string} projectId
 * @property {OrchestratorTaskType} type
 * @property {string} prompt
 * @property {'queued' | 'running' | 'completed' | 'failed'} status
 * @property {string | null} assignedAiSystemId
 * @property {string | null} resultRef
 * @property {string} createdBy
 */

export {}
