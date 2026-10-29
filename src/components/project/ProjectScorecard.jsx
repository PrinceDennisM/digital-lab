import {
  DERIVED_METRIC_HINTS,
  FUTURE_METRICS,
  SCORECARD_METRICS,
} from '../../domain/constants/metrics.js'
import { hasAnyMetric } from '../../domain/selectors/projectSelectors.js'
import EmptyState from '../ui/EmptyState.jsx'
import MetricSlot from '../ui/MetricSlot.jsx'

/** @param {{ project: import('../../domain/models/index.js').ProjectDetail }} props */
export default function ProjectScorecard({ project }) {
  const scorecard = project.scorecard
  const units = scorecard?.units ?? {}

  if (!scorecard || !hasAnyMetric(scorecard)) {
    return (
      <div className="project-scorecard">
        <EmptyState
          title="No metrics tracked yet"
          description="Effort, progress, momentum, and health are distinct dimensions. Metrics will appear here when manually recorded or computed from real activity — never fabricated."
        />
        <div className="metric-grid metric-grid--preview">
          {SCORECARD_METRICS.map((metric) => (
            <MetricSlot
              key={metric.key}
              label={metric.label}
              description={metric.description}
              unit={units[metric.unitKey]}
              metric={null}
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="project-scorecard">
      <div className="metric-grid">
        {SCORECARD_METRICS.map((metric) => (
          <MetricSlot
            key={metric.key}
            label={metric.label}
            description={metric.description}
            unit={units[metric.unitKey]}
            metric={scorecard[metric.key]}
          />
        ))}
      </div>
      <section className="metric-future" aria-label="Future metrics">
        <h3 className="metric-future__title">Planned dimensions</h3>
        <div className="metric-grid metric-grid--compact">
          {FUTURE_METRICS.map((metric) => (
            <MetricSlot
              key={metric.key}
              label={metric.label}
              description={metric.description}
              unit={units[metric.unitKey]}
              metric={scorecard[metric.key] ?? null}
            />
          ))}
        </div>
      </section>
      <section className="metric-future" aria-label="Derived metrics">
        <h3 className="metric-future__title">Derived metrics (future)</h3>
        <ul className="derived-metrics">
          {DERIVED_METRIC_HINTS.map((hint) => (
            <li key={hint.key}>
              <strong>{hint.label}</strong> — {hint.description}
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
