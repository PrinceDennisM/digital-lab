import { navSections } from '../../data/seed.js'

export default function LabSidebar({ activeSection, onNavigate }) {
  return (
    <aside className="lab-sidebar" aria-label="Section navigation">
      <nav className="lab-sidebar__nav">
        <ul>
          {navSections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className={
                  activeSection === section.id ? 'is-active' : undefined
                }
                onClick={(event) => {
                  event.preventDefault()
                  onNavigate(section.id)
                }}
              >
                {section.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
