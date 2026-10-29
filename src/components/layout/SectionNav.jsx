import { navSections } from '../../data/seed.js'

export default function SectionNav({ activeSection, onNavigate }) {
  return (
    <nav className="section-nav" aria-label="Mobile section navigation">
      <ul>
        {navSections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className={activeSection === section.id ? 'is-active' : undefined}
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
  )
}
