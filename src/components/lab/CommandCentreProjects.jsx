import { projects } from '../../data/seed.js'
import StatusBadge from '../ui/StatusBadge.jsx'

/** @param {{ onProjectClick: (slug: string) => void, limit?: number }} props */
export default function CommandCentreProjects({ onProjectClick, limit = 4 }) {
  const items = projects
    .filter((p) => ['ACTIVE', 'BUILDING'].includes(p.state))
    .slice(0, limit)

  return (
    <ul className="command-projects">
      {items.map((project) => (
        <li key={project.id}>
          <button
            type="button"
            className="command-projects__item"
            onClick={() => onProjectClick(project.slug)}
          >
            <span className="command-projects__title">{project.title}</span>
            <StatusBadge state={project.state} />
          </button>
        </li>
      ))}
    </ul>
  )
}
