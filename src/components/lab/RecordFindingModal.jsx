import { useState } from 'react'
import { AI_SYSTEMS } from '../../domain/constants/aiSystems.js'
import Button from '../ui/Button.jsx'
import Modal from '../ui/Modal.jsx'

const CONFIDENCE_OPTIONS = [
  {
    value: 'observed',
    label: 'I observed this',
    hint: 'Directly verified or tested hands-on',
  },
  {
    value: 'sourced',
    label: 'From a source',
    hint: 'Reference doc, link, paper, or external artifact',
  },
  {
    value: 'ai_unverified',
    label: 'AI suggestion — not verified',
    hint: 'Generated idea or pattern needing manual verification',
  },
]

/**
 * @param {{
 *   isOpen: boolean,
 *   onClose: () => void,
 *   idea: import('../../data/types.js').CapturedIdea | null,
 *   onSubmit: (ideaId: string, finding: {
 *     finding: string,
 *     significance?: string,
 *     source?: string,
 *     confidence: import('../../domain/models/index.js').FindingConfidence,
 *     aiSystemId?: string,
 *     nextStep?: string,
 *   }) => void,
 * }} props
 */
export default function RecordFindingModal({
  isOpen,
  onClose,
  idea,
  onSubmit,
}) {
  if (!isOpen || !idea) return null

  return (
    <RecordFindingContent
      key={idea.id}
      idea={idea}
      onClose={onClose}
      onSubmit={onSubmit}
    />
  )
}

function RecordFindingContent({ idea, onClose, onSubmit }) {
  const [finding, setFinding] = useState('')
  const [significance, setSignificance] = useState('')
  const [source, setSource] = useState('')
  const [confidence, setConfidence] = useState('observed')
  const [aiSystemId, setAiSystemId] = useState('')
  const [nextStep, setNextStep] = useState('')
  const [error, setError] = useState('')

  const aiSystemsList = Object.values(AI_SYSTEMS)

  const handleSubmit = (event) => {
    event.preventDefault()
    const trimmedFinding = finding.trim()
    if (!trimmedFinding) {
      setError('Please enter what you found.')
      return
    }

    onSubmit(idea.id, {
      finding: trimmedFinding,
      significance: significance.trim() || undefined,
      source: source.trim() || undefined,
      confidence,
      aiSystemId: aiSystemId || undefined,
      nextStep: nextStep.trim() || undefined,
    })
  }

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title={`Record Finding — ${idea.title}`}
    >
      <form className="idea-form" onSubmit={handleSubmit}>
        <label className="idea-form__field">
          <span>What I found</span>
          <textarea
            value={finding}
            onChange={(e) => {
              setFinding(e.target.value)
              if (error) setError('')
            }}
            placeholder="Fact, observation, benchmark result, or verified detail..."
            rows={3}
            required
            autoFocus
          />
        </label>

        <label className="idea-form__field">
          <span>Why it matters (optional)</span>
          <textarea
            value={significance}
            onChange={(e) => setSignificance(e.target.value)}
            placeholder="Significance, implication, or impact on the idea..."
            rows={2}
          />
        </label>

        <label className="idea-form__field">
          <span>Evidence or source (optional)</span>
          <input
            type="text"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            placeholder="URL link, doc title, measurement, commit hash, or reference note"
          />
        </label>

        <fieldset className="idea-form__field">
          <legend>Confidence</legend>
          <div className="idea-form__radios-stacked">
            {CONFIDENCE_OPTIONS.map((opt) => (
              <label key={opt.value} className="idea-form__radio-option">
                <input
                  type="radio"
                  name="findingConfidence"
                  value={opt.value}
                  checked={confidence === opt.value}
                  onChange={(e) => setConfidence(e.target.value)}
                />
                <div>
                  <span className="idea-form__radio-label">{opt.label}</span>
                  <span className="idea-form__radio-hint">{opt.hint}</span>
                </div>
              </label>
            ))}
          </div>
        </fieldset>

        <label className="idea-form__field">
          <span>AI assistance (optional)</span>
          <select
            value={aiSystemId}
            onChange={(e) => setAiSystemId(e.target.value)}
          >
            <option value="">None (Unaided / manual finding)</option>
            {aiSystemsList.map((sys) => (
              <option key={sys.id} value={sys.id}>
                {sys.displayName}
              </option>
            ))}
          </select>
          <span className="idea-form__field-hint">
            Only select an AI system if it actively assisted with discovering or
            formulating this finding.
          </span>
        </label>

        <label className="idea-form__field">
          <span>Next question or test (optional)</span>
          <input
            type="text"
            value={nextStep}
            onChange={(e) => setNextStep(e.target.value)}
            placeholder="What should be investigated or tested next?"
          />
        </label>

        {error && <p className="form-error">{error}</p>}

        <div className="idea-form__actions">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Save Finding
          </Button>
        </div>
      </form>
    </Modal>
  )
}
