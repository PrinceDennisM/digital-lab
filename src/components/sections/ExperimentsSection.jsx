import { experiments } from '../../data/seed.js'
import Card from '../ui/Card.jsx'
import StatusBadge from '../ui/StatusBadge.jsx'

/** @param {{ compact?: boolean, onProjectClick?: (slug: string) => void }} props */
export default function ExperimentsSection({
  compact = false,
  onProjectClick,
}) {
  const items = compact ? experiments.slice(0, 2) : experiments

  return (
    <div className={compact ? 'experiment-list experiment-list--compact' : 'experiment-list'}>
      {items.map((experiment) => (
        <Card key={experiment.id} compact={compact}>
          <div className="experiment-card">
            <div className="experiment-card__meta">
              <StatusBadge state={experiment.state} />
              <time className="experiment-card__date" dateTime={experiment.updatedAt}>
                Updated {experiment.updatedAt}
              </time>
            </div>
            <h3 className="experiment-card__title">{experiment.title}</h3>
            <p className="experiment-card__hypothesis">{experiment.hypothesis}</p>
            {experiment.note && (
              <p className="experiment-card__note">{experiment.note}</p>
            )}
            {experiment.linkedProjectSlug && onProjectClick && (
              <button
                type="button"
                className="experiment-card__link"
                onClick={() => onProjectClick(experiment.linkedProjectSlug)}
              >
                Open project workspace →
              </button>
            )}
          </div>
        </Card>
      ))}
    </div>
  )
}
