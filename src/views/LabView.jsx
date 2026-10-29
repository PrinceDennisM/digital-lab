import { useCallback, useEffect, useState } from 'react'
import LabShell from '../components/layout/LabShell.jsx'
import Section from '../components/ui/Section.jsx'
import HeroSection from '../components/sections/HeroSection.jsx'
import ExperimentsSection from '../components/sections/ExperimentsSection.jsx'
import ProjectsSection from '../components/sections/ProjectsSection.jsx'
import CuriositySection from '../components/sections/CuriositySection.jsx'
import AiLabSection from '../components/sections/AiLabSection.jsx'
import KnowledgeSection from '../components/sections/KnowledgeSection.jsx'
import BuildLogSection from '../components/sections/BuildLogSection.jsx'
import ResumeSection from '../components/sections/ResumeSection.jsx'
import NewIdeaModal from '../components/sections/NewIdeaModal.jsx'
import CommandCentreProjects from '../components/lab/CommandCentreProjects.jsx'
import IdeaInbox from '../components/lab/IdeaInbox.jsx'
import RecordFindingModal from '../components/lab/RecordFindingModal.jsx'
import useNewIdea from '../hooks/useNewIdea.js'
import { navSections } from '../data/seed.js'

const sectionIds = navSections.map((s) => s.id)

/** @param {{ onNewIdea?: () => void, onProjectClick: (slug: string) => void }} props */
export default function LabView({ onProjectClick }) {
  const [activeSection, setActiveSection] = useState('command')
  const {
    isOpen,
    editingIdea,
    findingModalIdea,
    open,
    openEdit,
    close,
    openFindingModal,
    closeFindingModal,
    ideas,
    submitIdea,
    updateIdea,
    addFinding,
  } = useNewIdea()


  const navigate = useCallback((id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    setActiveSection(id)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id)
        }
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: [0, 0.25, 0.5] },
    )

    sectionIds.forEach((id) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  const handleIdeaSubmit = useCallback(
    (ideaData) => {
      if (editingIdea) {
        updateIdea(editingIdea.id, ideaData)
      } else {
        submitIdea(ideaData)
      }
    },
    [editingIdea, submitIdea, updateIdea],
  )

  return (
    <LabShell
      activeSection={activeSection}
      onNavigate={navigate}
      onNewIdea={open}
    >
      <HeroSection />

      <Section
        id="command"
        title="Command Centre"
        subtitle="Current work, open questions, and recent activity."
        emphasis
      >
        <div className="command-centre">
          <div className="command-centre__primary">
            <div className="command-centre__block">
              <h3 className="command-centre__block-title">Active Projects</h3>
              <CommandCentreProjects onProjectClick={onProjectClick} />
            </div>
            <div className="command-centre__block">
              <h3 className="command-centre__block-title">Current Experiments</h3>
              <ExperimentsSection
                compact
                onProjectClick={onProjectClick}
              />
            </div>
            <div className="command-centre__block">
              <h3 className="command-centre__block-title">Curiosity</h3>
              <CuriositySection compact capturedIdeas={ideas} />
            </div>
          </div>
          <aside className="command-centre__aside">
            <div className="command-centre__block">
              <IdeaInbox
                ideas={ideas}
                onNewIdea={open}
                onEditIdea={openEdit}
              />
            </div>
            <div className="command-centre__block">
              <h3 className="command-centre__block-title">Recent Activity</h3>
              <BuildLogSection compact />
            </div>
          </aside>
        </div>
      </Section>

      <Section
        id="experiments"
        title="Experiments"
        subtitle="Hypotheses under active exploration — not shipped products."
      >
        <ExperimentsSection onProjectClick={onProjectClick} />
      </Section>

      <Section
        id="projects"
        title="Projects"
        subtitle="Professional and venture work — enter a workspace to explore."
      >
        <ProjectsSection onProjectClick={onProjectClick} />
      </Section>

      <Section
        id="curiosity"
        title="Curiosity"
        subtitle="Open questions that may become experiments."
      >
        <CuriositySection capturedIdeas={ideas} />
      </Section>

      <Section
        id="ai-lab"
        title="AI Lab"
        subtitle="Target workflow for AI-assisted R&D — integration pending."
      >
        <AiLabSection />
      </Section>

      <Section
        id="knowledge"
        title="Knowledge"
        subtitle="Documented learning and reference notes."
      >
        <KnowledgeSection />
      </Section>

      <Section
        id="build-log"
        title="Build Log"
        subtitle="Chronological record of lab activity."
      >
        <BuildLogSection />
      </Section>

      <Section
        id="resume"
        title="Resume"
        subtitle="Professional profile and capabilities."
      >
        <ResumeSection />
      </Section>

      <NewIdeaModal
        isOpen={isOpen}
        onClose={close}
        onSubmit={handleIdeaSubmit}
        initialIdea={editingIdea}
      />
    </LabShell>
  )
}

