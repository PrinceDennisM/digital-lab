import { getProjectActivity } from '../../domain/selectors/projectSelectors.js'
import StatusBadge from '../ui/StatusBadge.jsx'
import EmptyState from '../ui/EmptyState.jsx'

/** @param {{ project: import('../../domain/models/index.js').ProjectDetail }} props */
export default function ProjectActivity({ project }) {
  const activity = getProjectActivity(project)

  if (activity.length === 0) {
    return (
      <EmptyState
        title="No activity recorded"
        description="Build log entries linked to this project will appear here."
      />
    )
  }

  return (
    <ol className="build-log">
      {activity.map((entry) => (
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
