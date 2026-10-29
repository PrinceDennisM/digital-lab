import { useCallback, useEffect, useState } from 'react'
import { append as appendProvenance } from '../domain/provenance/repository.js'

const STORAGE_KEY = 'digital-lab-captured-ideas'

/** @returns {import('../data/types.js').CapturedIdea[]} */
function readStoredIdeas() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

/** @param {import('../data/types.js').CapturedIdea[]} ideas */
function writeStoredIdeas(ideas) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ideas))
  } catch {
    // Ignore storage write failures (e.g. quota or private mode)
  }
}

/**
 * @returns {{
 *   isOpen: boolean,
 *   editingIdea: import('../data/types.js').CapturedIdea | null,
 *   findingModalIdea: import('../data/types.js').CapturedIdea | null,
 *   open: () => void,
 *   openEdit: (idea: import('../data/types.js').CapturedIdea) => void,
 *   close: () => void,
 *   openFindingModal: (idea: import('../data/types.js').CapturedIdea) => void,
 *   closeFindingModal: () => void,
 *   ideas: import('../data/types.js').CapturedIdea[],
 *   submitIdea: (idea: { title: string, description: string, category: 'curiosity' | 'experiment' | 'project', projectId?: string, projectTitle?: string }) => void,
 *   updateIdea: (id: string, idea: { title: string, description: string, category: 'curiosity' | 'experiment' | 'project', projectId?: string, projectTitle?: string }) => void,
 *   addFinding: (ideaId: string, findingData: { finding: string, significance?: string, source?: string, confidence: import('../domain/models/index.js').FindingConfidence, aiSystemId?: string, nextStep?: string }) => void,
 * }}
 */
export default function useNewIdea() {
  const [isOpen, setIsOpen] = useState(false)
  const [editingIdea, setEditingIdea] = useState(null)
  const [findingModalIdea, setFindingModalIdea] = useState(null)
  const [ideas, setIdeas] = useState(() => readStoredIdeas())

  useEffect(() => {
    const onStorage = (event) => {
      if (event.key === STORAGE_KEY) {
        setIdeas(readStoredIdeas())
      }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const open = useCallback(() => {
    setEditingIdea(null)
    setIsOpen(true)
  }, [])

  const openEdit = useCallback((idea) => {
    setEditingIdea(idea)
    setIsOpen(true)
  }, [])

  const close = useCallback(() => {
    setEditingIdea(null)
    setIsOpen(false)
  }, [])

  const openFindingModal = useCallback((idea) => {
    setFindingModalIdea(idea)
  }, [])

  const closeFindingModal = useCallback(() => {
    setFindingModalIdea(null)
  }, [])

  const submitIdea = useCallback(
    ({ title, description, category, projectId, projectTitle }) => {
      const trimmedTitle = title.trim()
      const trimmedDescription = (description || '').trim()

      const captured = {
        id: `idea-${Date.now()}`,
        title: trimmedTitle,
        description: trimmedDescription,
        category,
        projectId: projectId || undefined,
        projectTitle: projectTitle || undefined,
        capturedAt: new Date().toISOString(),
        findings: [],
      }

      setIdeas((prev) => {
        const next = [captured, ...prev]
        writeStoredIdeas(next)
        return next
      })

      // If associated with a project, append an immutable provenance event
      if (projectId) {
        appendProvenance({
          projectId,
          eventType: 'idea',
          action: 'proposed',
          actorType: 'human',
          actorId: 'dennis',
          subject: trimmedTitle,
          rationale: trimmedDescription || undefined,
          authority: 'advisory',
        })
      }

      setIsOpen(false)
      setEditingIdea(null)
    },
    [],
  )

  const updateIdea = useCallback(
    (id, { title, description, category, projectId, projectTitle }) => {
      const trimmedTitle = title.trim()
      const trimmedDescription = (description || '').trim()
      const updatedAt = new Date().toISOString()

      setIdeas((prev) => {
        const next = prev.map((idea) => {
          if (idea.id !== id) return idea
          return {
            ...idea,
            title: trimmedTitle,
            description: trimmedDescription,
            category,
            projectId: projectId || undefined,
            projectTitle: projectTitle || undefined,
            updatedAt,
          }
        })
        writeStoredIdeas(next)
        return next
      })

      // If an edited idea is linked to a project, append a factual modified provenance event
      if (projectId) {
        appendProvenance({
          projectId,
          eventType: 'idea',
          action: 'modified',
          actorType: 'human',
          actorId: 'dennis',
          subject: `Updated idea: ${trimmedTitle}`,
          rationale: trimmedDescription || undefined,
          authority: 'advisory',
        })
      }

      setIsOpen(false)
      setEditingIdea(null)
    },
    [],
  )

  const addFinding = useCallback(
    (
      ideaId,
      { finding, significance, source, confidence, aiSystemId, nextStep },
    ) => {
      const trimmedFinding = finding.trim()
      const trimmedSignificance = (significance || '').trim()
      const trimmedSource = (source || '').trim()
      const trimmedNextStep = (nextStep || '').trim()
      const now = new Date().toISOString()

      const newFinding = {
        id: `find-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        ideaId,
        finding: trimmedFinding,
        significance: trimmedSignificance || undefined,
        source: trimmedSource || undefined,
        confidence: confidence || 'observed',
        aiSystemId: aiSystemId || undefined,
        nextStep: trimmedNextStep || undefined,
        recordedAt: now,
      }

      let associatedProjectId = null
      let ideaTitle = ''

      setIdeas((prev) => {
        const next = prev.map((idea) => {
          if (idea.id !== ideaId) return idea
          associatedProjectId = idea.projectId ?? null
          ideaTitle = idea.title
          const existingFindings = Array.isArray(idea.findings)
            ? idea.findings
            : []
          return {
            ...idea,
            findings: [newFinding, ...existingFindings],
          }
        })
        writeStoredIdeas(next)
        return next
      })

      // If linked to a project, append a factual 'observed' provenance event
      if (associatedProjectId) {
        appendProvenance({
          projectId: associatedProjectId,
          eventType: 'observation',
          action: 'observed',
          actorType: 'human',
          actorId: 'dennis',
          subject: `Finding on idea "${ideaTitle}": ${trimmedFinding}`,
          rationale: trimmedSignificance || undefined,
          authority: 'advisory',
        })
      }

      setFindingModalIdea(null)
    },
    [],
  )

  return {
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
  }
}



