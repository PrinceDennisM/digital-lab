import { buildLog } from '../../data/seed.js'
import StatusBadge from '../ui/StatusBadge.jsx'

export default function BuildLogSection({ compact = false }) {
  const items = compact ? buildLog.slice(0, 4) : buildLog

  return (
    <ol className="build-log">
      {items.map((entry) => (
        <li key={entry.id} className="build-log__entry">
          <time className="build-log__date" dateTime={entry.date}>
            {entry.date}
          </time>
          <div className="build-log__content">
            <p className="build-log__action">{entry.action}</p>
            <p className="build-log__entity">{entry.entity}</p>
          </div>
          {entry.state && <StatusBadge state={entry.state} />}
        </li>
      ))}
    </ol>
  )
}
