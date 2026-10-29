import { projects } from '../../data/seed.js'
import StatusBadge from '../ui/StatusBadge.jsx'
import Tag from '../ui/Tag.jsx'

/** @param {{ onProjectClick: (slug: string) => void }} props */
export default function ProjectsSection({ onProjectClick }) {
  return (
    <div className="project-table">
      <div className="project-table__head" aria-hidden="true">
        <span>Project</span>
        <span>State</span>
        <span>Context</span>
      </div>
      <ul className="project-table__list">
        {projects.map((project) => (
          <li key={project.id} className="project-row">
            <button
              type="button"
              className="project-row__link"
              onClick={() => onProjectClick(project.slug)}
            >
              <div className="project-row__main">
                <h3 className="project-row__title">{project.title}</h3>
                <p className="project-row__desc">{project.description}</p>
                <div className="project-row__tags">
                  {project.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
              </div>
              <div className="project-row__state">
                <StatusBadge state={project.state} />
              </div>
              <p className="project-row__context">{project.context}</p>
              <span className="project-row__enter">Enter workspace →</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
