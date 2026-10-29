import { curiosity } from '../../data/seed.js'
import StatusBadge from '../ui/StatusBadge.jsx'

export default function CuriositySection({ compact = false, capturedIdeas = [] }) {
  const curiosityIdeas = capturedIdeas.filter((idea) => idea.category === 'curiosity')
  const items = compact ? curiosity.slice(0, 3) : curiosity

  return (
    <div className="curiosity-block">
      {curiosityIdeas.length > 0 && (
        <div className="captured-ideas captured-ideas--inline">
          <h3 className="captured-ideas__label">Saved Ideas (Curiosity)</h3>
          <ul>

            {curiosityIdeas.map((idea) => (
              <li key={idea.id} className="captured-idea">
                <span className="captured-idea__title">{idea.title}</span>
                {idea.description && (
                  <span className="captured-idea__desc">{idea.description}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
      <ul className="curiosity-list">
        {items.map((item) => (
          <li key={item.id} className="curiosity-item">
            <div className="curiosity-item__header">
              <StatusBadge state={item.state} />
            </div>
            <p className="curiosity-item__question">{item.question}</p>
            <p className="curiosity-item__context">{item.context}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
