import LabHeader from './LabHeader.jsx'
import LabSidebar from './LabSidebar.jsx'
import SectionNav from './SectionNav.jsx'

export default function LabShell({
  children,
  activeSection,
  onNavigate,
  onNewIdea,
}) {
  return (
    <div className="lab-shell">
      <LabHeader onNewIdea={onNewIdea} />
      <SectionNav activeSection={activeSection} onNavigate={onNavigate} />
      <div className="lab-shell__body">
        <LabSidebar activeSection={activeSection} onNavigate={onNavigate} />
        <main className="lab-main">{children}</main>
      </div>
    </div>
  )
}
