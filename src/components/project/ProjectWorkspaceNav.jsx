import { WORKSPACE_PANELS } from '../../domain/constants/metrics.js'

/** @param {{ activePanel: string, onPanelChange: (id: string) => void }} props */
export default function ProjectWorkspaceNav({ activePanel, onPanelChange }) {
  return (
    <nav className="workspace-nav" aria-label="Project workspace">
      <ul>
        {WORKSPACE_PANELS.map((panel) => (
          <li key={panel.id}>
            <button
              type="button"
              className={activePanel === panel.id ? 'is-active' : undefined}
              onClick={() => onPanelChange(panel.id)}
              aria-current={activePanel === panel.id ? 'page' : undefined}
            >
              {panel.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
