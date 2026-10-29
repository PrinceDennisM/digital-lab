import { useEffect, useState } from 'react'
import { getProjectProvenance } from '../../domain/provenance/selectors.js'
import { PROVENANCE_CHANGE_EVENT } from '../../domain/provenance/repository.js'
import ProvenanceBadge from '../ui/ProvenanceBadge.jsx'
import EmptyState from '../ui/EmptyState.jsx'
import Button from '../ui/Button.jsx'
import RecordDecisionModal from './RecordDecisionModal.jsx'

/** @param {{ project: import('../../domain/models/index.js').ProjectDetail }} props */
export default function ProjectProvenance({ project }) {
  const [entries, setEntries] = useState(() => getProjectProvenance(project.id))
  const [isDecisionModalOpen, setIsDecisionModalOpen] = useState(false)

  useEffect(() => {
    const handleProvenanceChange = () => {
      setEntries(getProjectProvenance(project.id))
    }

    window.addEventListener(PROVENANCE_CHANGE_EVENT, handleProvenanceChange)
    window.addEventListener('storage', handleProvenanceChange)

    return () => {
      window.removeEventListener(PROVENANCE_CHANGE_EVENT, handleProvenanceChange)
      window.removeEventListener('storage', handleProvenanceChange)
    }
  }, [project.id])


  return (
    <div className="project-provenance">
      <div className="provenance-header">
        <div>
          <h3 className="provenance-header__title">Provenance &amp; Decision History</h3>
          <p className="provenance-header__subtitle">
            Append-only audit trail of human authority and decisions.
          </p>
        </div>
        <Button
          variant="primary"
          onClick={() => setIsDecisionModalOpen(true)}
        >
          + Record Decision
        </Button>
      </div>

      {entries.length === 0 ? (
        <EmptyState
          title="No provenance recorded"
          description="Human decisions and advisory actions will be logged here with explicit authority. Empty until real events are recorded."
        />
      ) : (
        <ol className="provenance-timeline">
          {entries.map((entry) => (
            <li key={entry.id} className="provenance-entry">
              <time className="provenance-entry__time" dateTime={entry.timestamp}>
                {entry.timestamp.slice(0, 10)}
              </time>
              <div className="provenance-entry__body">
                <div className="provenance-entry__header">
                  <ProvenanceBadge
                    authority={entry.authority}
                    actorType={entry.actorType}
                  />
                  <span className="provenance-entry__actor">
                    {entry.actorType === 'human' ? 'Dennis' : entry.actorId}
                  </span>
                </div>
                <p className="provenance-entry__action">
                  <strong>{entry.action}</strong> — {entry.subject}
                </p>
                {entry.rationale && (
                  <p className="provenance-entry__rationale">{entry.rationale}</p>
                )}
              </div>
            </li>
          ))}
        </ol>
      )}

      <RecordDecisionModal
        isOpen={isDecisionModalOpen}
        onClose={() => setIsDecisionModalOpen(false)}
        project={project}
      />
    </div>
  )
}

