import { useState } from 'react'
import Button from '../ui/Button.jsx'
import Modal from '../ui/Modal.jsx'
import { append as appendProvenance } from '../../domain/provenance/repository.js'

/**
 * @param {{
 *   isOpen: boolean,
 *   onClose: () => void,
 *   project: import('../../domain/models/index.js').ProjectDetail,
 *   onDecisionRecorded?: (record: import('../../domain/provenance/models.js').ProvenanceEntry) => void,
 * }} props
 */
export default function RecordDecisionModal({
  isOpen,
  onClose,
  project,
  onDecisionRecorded,
}) {
  const [summary, setSummary] = useState('')
  const [rationale, setRationale] = useState('')
  const [authority, setAuthority] = useState('binding')
  const [error, setError] = useState('')

  const handleClose = () => {
    setSummary('')
    setRationale('')
    setAuthority('binding')
    setError('')
    onClose()
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const trimmedSummary = summary.trim()
    const trimmedRationale = rationale.trim()

    if (!trimmedSummary) {
      setError('Decision summary is required.')
      return
    }

    if (authority === 'binding' && !trimmedRationale) {
      setError('Rationale is required for binding human decisions.')
      return
    }

    const record = appendProvenance({
      projectId: project.id,
      eventType: 'decision',
      action: 'decided',
      actorType: 'human',
      actorId: 'dennis',
      subject: trimmedSummary,
      rationale: trimmedRationale || undefined,
      authority,
    })

    if (onDecisionRecorded) {
      onDecisionRecorded(record)
    }

    handleClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={`Record Decision — ${project.title}`}
    >
      <form className="idea-form" onSubmit={handleSubmit}>
        <label className="idea-form__field">
          <span>Decision Summary</span>
          <input
            type="text"
            value={summary}
            onChange={(e) => {
              setSummary(e.target.value)
              if (error) setError('')
            }}
            placeholder="What was decided?"
            required
            autoFocus
          />
        </label>

        <fieldset className="idea-form__field">
          <legend>Authority Level</legend>
          <div className="idea-form__radios">
            <label className="idea-form__radio">
              <input
                type="radio"
                name="decisionAuthority"
                value="binding"
                checked={authority === 'binding'}
                onChange={(e) => setAuthority(e.target.value)}
              />
              <span>Binding (Human Authority)</span>
            </label>
            <label className="idea-form__radio">
              <input
                type="radio"
                name="decisionAuthority"
                value="advisory"
                checked={authority === 'advisory'}
                onChange={(e) => setAuthority(e.target.value)}
              />
              <span>Advisory</span>
            </label>
          </div>
        </fieldset>

        <label className="idea-form__field">
          <span>
            Rationale{' '}
            {authority === 'binding' ? (
              <strong className="field-required">*(Required for binding)*</strong>
            ) : (
              '(Optional)'
            )}
          </span>
          <textarea
            value={rationale}
            onChange={(e) => {
              setRationale(e.target.value)
              if (error) setError('')
            }}
            placeholder={
              authority === 'binding'
                ? 'Why this decision was made and what factors were considered...'
                : 'Optional context or advisory notes...'
            }
            rows={4}
            required={authority === 'binding'}
          />
        </label>

        {error && <p className="form-error">{error}</p>}

        <div className="idea-form__actions">
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Record Decision
          </Button>
        </div>
      </form>
    </Modal>
  )
}
