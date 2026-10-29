import { useEffect, useState } from 'react'
import { orchestrator } from '../services/orchestrator.js'
import ProjectHeader from '../components/project/ProjectHeader.jsx'
import ProjectWorkspaceNav from '../components/project/ProjectWorkspaceNav.jsx'
import ProjectOverview from '../components/project/ProjectOverview.jsx'
import ProjectScorecard from '../components/project/ProjectScorecard.jsx'
import ProjectProvenance from '../components/project/ProjectProvenance.jsx'
import ProjectActivity from '../components/project/ProjectActivity.jsx'
import AiContributors from '../components/project/AiContributors.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import useProject from '../hooks/useProject.js'

/** @param {{ slug: string, onBack: () => void }} props */
export default function ProjectWorkspaceView({ slug, onBack }) {
  const { project, loading, notFound } = useProject(slug)
  const [activePanel, setActivePanel] = useState('overview')

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onBack()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onBack])

  if (loading) {
    return (
      <div className="workspace workspace--loading">
        <p>Loading workspace…</p>
      </div>
    )
  }

  if (notFound || !project) {
    return (
      <div className="workspace workspace--error">
        <EmptyState
          title="Project not found"
          description={`No project matches "${slug}".`}
        />
        <button type="button" className="project-header__back" onClick={onBack}>
          ← Back to Lab
        </button>
      </div>
    )
  }

  return (
    <div className="workspace" key={slug}>
      <ProjectHeader project={project} onBack={onBack} />
      <ProjectWorkspaceNav
        activePanel={activePanel}
        onPanelChange={setActivePanel}
      />

      <div className="workspace__panel">
        {activePanel === 'overview' && (
          <>
            <ProjectOverview project={project} />
            <section className="workspace__subsection" aria-label="AI contributions">
              <h2 className="workspace__subsection-title">AI Contributions</h2>
              <AiContributors ai={project.ai} />
            </section>
          </>
        )}
        {activePanel === 'scorecard' && <ProjectScorecard project={project} />}
        {activePanel === 'provenance' && <ProjectProvenance project={project} />}
        {activePanel === 'activity' && <ProjectActivity project={project} />}
      </div>

      <footer className="workspace__footer">
        <p className="workspace__orchestrator-note">
          AI orchestration:{' '}
          {orchestrator.isConnected
            ? 'Connected'
            : 'Not connected — Human initiates → Orchestrator → Specialist AI → Result → Provenance → Human approval'}
        </p>
      </footer>
    </div>
  )
}
