import { useState } from 'react'
import { projects } from '../../data/seed.js'
import Button from '../ui/Button.jsx'
import Modal from '../ui/Modal.jsx'

const categories = [
  { value: 'curiosity', label: 'Curiosity' },
  { value: 'experiment', label: 'Experiment' },
  { value: 'project', label: 'Project' },
]

/**
 * @param {{
 *   isOpen: boolean,
 *   onClose: () => void,
 *   onSubmit: (idea: { title: string, description: string, category: 'curiosity' | 'experiment' | 'project', projectId?: string, projectTitle?: string }) => void,
 *   initialIdea?: import('../../data/types.js').CapturedIdea | null,
 * }} props
 */
export default function NewIdeaModal({
  isOpen,
  onClose,
  onSubmit,
  initialIdea = null,
}) {
  if (!isOpen) return null

  return (
    <NewIdeaModalContent
      key={initialIdea?.id ?? 'new-idea'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
      initialIdea={initialIdea}
    />
  )
}

function NewIdeaModalContent({
  isOpen,
  onClose,
  onSubmit,
  initialIdea,
}) {
  const [title, setTitle] = useState(initialIdea?.title ?? '')
  const [description, setDescription] = useState(initialIdea?.description ?? '')
  const [category, setCategory] = useState(initialIdea?.category ?? 'curiosity')
  const [projectId, setProjectId] = useState(initialIdea?.projectId ?? '')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!title.trim()) return
    const selectedProject = projects.find((p) => p.id === projectId)
    onSubmit({
      title,
      description,
      category,
      projectId: projectId || undefined,
      projectTitle: selectedProject?.title || undefined,
    })
  }

  const isEditing = Boolean(initialIdea)

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit Idea' : 'Capture a New Idea'}
    >
      <form className="idea-form" onSubmit={handleSubmit}>
        <label className="idea-form__field">
          <span>Title</span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What are you exploring?"
            required
            autoFocus
          />
        </label>
        <label className="idea-form__field">
          <span>Description</span>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Hypothesis, question, or build intent..."
            rows={4}
          />
        </label>
        <fieldset className="idea-form__field">
          <legend>Category</legend>
          <div className="idea-form__radios">
            {categories.map((cat) => (
              <label key={cat.value} className="idea-form__radio">
                <input
                  type="radio"
                  name="category"
                  value={cat.value}
                  checked={category === cat.value}
                  onChange={(e) => setCategory(e.target.value)}
                />
                {cat.label}
              </label>
            ))}
          </div>
        </fieldset>
        <label className="idea-form__field">
          <span>Associated Project (optional)</span>
          <select
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
          >
            <option value="">None (Lab-level idea)</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title}
              </option>
            ))}
          </select>
        </label>
        <div className="idea-form__actions">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            {isEditing ? 'Save Changes' : 'Capture Idea'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}




