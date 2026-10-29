import { profile } from '../../data/seed.js'
import Tag from '../ui/Tag.jsx'

export default function ResumeSection() {
  return (
    <div className="resume-block">
      <div className="resume-block__summary">
        <h3 className="resume-block__name">{profile.name}</h3>
        <p className="resume-block__title">{profile.title}</p>
        <p className="resume-block__location">{profile.location}</p>
      </div>

      <div className="resume-block__grid">
        <div>
          <h4 className="resume-block__heading">Focus areas</h4>
          <ul className="resume-block__list">
            {profile.focusAreas.map((area) => (
              <li key={area}>{area}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="resume-block__heading">Stack</h4>
          <div className="resume-block__tags">
            {profile.stack.map((tech) => (
              <Tag key={tech}>{tech}</Tag>
            ))}
          </div>
        </div>
      </div>

      <p className="resume-block__placeholder">
        Full resume — placeholder for v0.1.{' '}
        <a href="#" onClick={(e) => e.preventDefault()}>
          View resume
        </a>
      </p>
    </div>
  )
}
