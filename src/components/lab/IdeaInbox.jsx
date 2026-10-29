import { getAiIconPath, getAiSystem } from '../../domain/constants/aiSystems.js'
import Button from '../ui/Button.jsx'
import EmptyState from '../ui/EmptyState.jsx'

const CONFIDENCE_LABELS = {
  observed: 'I observed this',
  sourced: 'From a source',
  ai_unverified: 'AI suggestion — not verified',
}

/**
 * @param {{
 *   ideas: import('../../data/types.js').CapturedIdea[],
 *   onNewIdea: () => void,
 *   onEditIdea?: (idea: import('../../data/types.js').CapturedIdea) => void,
 *   onRecordFinding?: (idea: import('../../data/types.js').CapturedIdea) => void,
 * }} props
 */
export default function IdeaInbox({
  ideas = [],
  onNewIdea,
  onEditIdea,
  onRecordFinding,
}) {
  return (
    <div className="idea-inbox">
      <div className="idea-inbox__header">
        <div className="idea-inbox__heading-wrap">
          <h3 className="command-centre__block-title idea-inbox__title">
            Idea Inbox
          </h3>
          <span className="idea-inbox__count">{ideas.length}</span>
        </div>
        {ideas.length > 0 && (
          <button
            type="button"
            className="idea-inbox__action-btn"
            onClick={onNewIdea}
            aria-label="Capture another idea"
          >
            + Capture
          </button>
        )}
      </div>

      {ideas.length === 0 ? (
        <EmptyState
          title="Idea Inbox is empty"
          description="Capture open questions, experiment hypotheses, or project intents to track them in the lab."
        >
          <div className="idea-inbox__empty-action">
            <Button variant="secondary" onClick={onNewIdea}>
              + Capture an idea
            </Button>
          </div>
        </EmptyState>
      ) : (
        <div className="idea-inbox__content">
          <ul className="idea-inbox__list">
            {ideas.map((idea, index) => {
              const isLatest = index === 0
              const capturedDateObj = new Date(idea.capturedAt)
              const capturedDate = capturedDateObj.toLocaleDateString([], {
                month: 'short',
                day: 'numeric',
              })
              const capturedTime = capturedDateObj.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })

              const updatedDateObj = idea.updatedAt
                ? new Date(idea.updatedAt)
                : null
              const updatedDate = updatedDateObj
                ? updatedDateObj.toLocaleDateString([], {
                    month: 'short',
                    day: 'numeric',
                  })
                : null
              const updatedTime = updatedDateObj
                ? updatedDateObj.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                : null

              const findings = Array.isArray(idea.findings) ? idea.findings : []

              return (
                <li
                  key={idea.id}
                  className={`idea-card ${isLatest ? 'idea-card--latest' : ''}`}
                >
                  <div className="idea-card__header">
                    <div className="idea-card__tags">
                      <span
                        className={`idea-card__category idea-card__category--${idea.category}`}
                      >
                        {idea.category}
                      </span>
                      {isLatest && (
                        <span className="idea-card__latest-badge">Newest</span>
                      )}
                    </div>
                    <div className="idea-card__header-actions">
                      {onRecordFinding && (
                        <button
                          type="button"
                          className="idea-card__finding-btn"
                          onClick={() => onRecordFinding(idea)}
                          aria-label={`Record finding for ${idea.title}`}
                        >
                          + Record finding
                        </button>
                      )}
                      {onEditIdea && (
                        <button
                          type="button"
                          className="idea-card__edit-btn"
                          onClick={() => onEditIdea(idea)}
                          aria-label={`Edit idea: ${idea.title}`}
                        >
                          Edit
                        </button>
                      )}
                    </div>
                  </div>

                  <h4 className="idea-card__title">{idea.title}</h4>

                  {idea.projectTitle && (
                    <div className="idea-card__project">
                      <span className="idea-card__project-label">Project:</span>{' '}
                      <span className="idea-card__project-name">
                        {idea.projectTitle}
                      </span>
                    </div>
                  )}

                  {idea.description && (
                    <p className="idea-card__desc">{idea.description}</p>
                  )}

                  <div className="idea-card__meta">
                    <time
                      className="idea-card__time"
                      dateTime={idea.capturedAt}
                      title={`Captured: ${capturedDateObj.toLocaleString()}`}
                    >
                      Captured {capturedDate} · {capturedTime}
                    </time>
                    {updatedDateObj && (
                      <span
                        className="idea-card__updated"
                        title={`Updated: ${updatedDateObj.toLocaleString()}`}
                      >
                        · Updated {updatedDate} · {updatedTime}
                      </span>
                    )}
                  </div>

                  {findings.length > 0 && (
                    <div className="idea-card__findings">
                      <h5 className="idea-card__findings-heading">
                        Findings ({findings.length})
                      </h5>
                      <ul className="idea-findings-list">
                        {findings.map((finding) => {
                          const findingDate = new Date(
                            finding.recordedAt,
                          ).toLocaleDateString([], {
                            month: 'short',
                            day: 'numeric',
                          })
                          const findingTime = new Date(
                            finding.recordedAt,
                          ).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })
                          const aiSystem = finding.aiSystemId
                            ? getAiSystem(finding.aiSystemId)
                            : null

                          return (
                            <li key={finding.id} className="finding-item">
                              <div className="finding-item__header">
                                <div className="finding-item__meta-tags">
                                  <span
                                    className={`finding-item__confidence finding-item__confidence--${finding.confidence}`}
                                  >
                                    {CONFIDENCE_LABELS[finding.confidence] ??
                                      finding.confidence}
                                  </span>
                                  {aiSystem && (
                                    <span className="finding-item__ai-tag">
                                      <img
                                        src={getAiIconPath(aiSystem.iconKey)}
                                        alt=""
                                        width={12}
                                        height={12}
                                        className="finding-item__ai-icon"
                                      />
                                      <span>{aiSystem.displayName}</span>
                                    </span>
                                  )}
                                </div>
                                <time
                                  className="finding-item__time"
                                  dateTime={finding.recordedAt}
                                >
                                  {findingDate} · {findingTime}
                                </time>
                              </div>

                              <p className="finding-item__text">
                                {finding.finding}
                              </p>

                              {finding.significance && (
                                <p className="finding-item__significance">
                                  <strong>Why it matters:</strong>{' '}
                                  {finding.significance}
                                </p>
                              )}

                              {finding.source && (
                                <p className="finding-item__source">
                                  <span className="finding-item__source-label">
                                    Source:
                                  </span>{' '}
                                  {finding.source.startsWith('http://') ||
                                  finding.source.startsWith('https://') ? (
                                    <a
                                      href={finding.source}
                                      target="_blank"
                                      rel="noreferrer"
                                    >
                                      {finding.source}
                                    </a>
                                  ) : (
                                    <span>{finding.source}</span>
                                  )}
                                </p>
                              )}

                              {finding.nextStep && (
                                <p className="finding-item__next">
                                  <span className="finding-item__next-label">
                                    Next step:
                                  </span>{' '}
                                  {finding.nextStep}
                                </p>
                              )}
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  )}
                </li>
              )
            })}
          </ul>

          <div className="idea-inbox__footer">
            <Button
              variant="secondary"
              className="idea-inbox__more-btn"
              onClick={onNewIdea}
            >
              + Capture another idea
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}


