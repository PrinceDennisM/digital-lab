import StatusBadge from '../ui/StatusBadge.jsx'

/** @param {{ project: import('../../domain/models/index.js').ProjectDetail, onBack: () => void }} props */
export default function ProjectHeader({ project, onBack }) {
  return (
    <header className="project-header">
      <button type="button" className="project-header__back" onClick={onBack}>
        ← Back to Lab
      </button>
      <div className="project-header__main">
        <p className="project-header__eyebrow">Project Workspace</p>
        <div className="project-header__title-row">
          <h1 className="project-header__title">{project.title}</h1>
          <StatusBadge state={project.state} />
        </div>
        {project.context && (
          <p className="project-header__context">{project.context}</p>
        )}
      </div>
    </header>
  )
}
