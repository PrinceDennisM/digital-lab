import { getAiIconPath } from '../../domain/constants/aiSystems.js'
import { hasAiContributions } from '../../domain/selectors/projectSelectors.js'
import EmptyState from '../ui/EmptyState.jsx'

/** @param {{ ai: import('../../domain/models/index.js').AiContributionSummary | null }} props */
export default function AiContributors({ ai }) {
  if (!hasAiContributions(ai)) {
    return (
      <EmptyState
        title="No AI contributions recorded"
        description="The AI system registry is ready. Contributions will appear here only when explicitly recorded — registry presence does not imply usage."
      />
    )
  }

  return (
    <div className="ai-contributors">
      <div className="ai-contributors__systems" aria-label="AI systems that contributed">
        {ai.systems.map((system) => (
          <img
            key={system.id}
            src={getAiIconPath(system.iconKey)}
            alt=""
            title={system.displayName}
            className="ai-contributors__icon"
            width={24}
            height={24}
          />
        ))}
      </div>
      <ul className="ai-contributors__list">
        {ai.contributions.map((contribution) => (
          <li key={contribution.id} className="ai-contribution">
            <p className="ai-contribution__summary">{contribution.summary}</p>
            <p className="ai-contribution__meta">
              {contribution.domains.join(', ')} · {contribution.recordedAt}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}

/** Registry preview — infrastructure only, not evidence of usage */
export function AiRegistryNote() {
  return (
    <p className="ai-registry-note">
      AI systems registered for future attribution. Icons indicate available
      systems — not evidence of contribution until recorded.
    </p>
  )
}
