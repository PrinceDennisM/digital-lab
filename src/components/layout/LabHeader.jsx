import Button from '../ui/Button.jsx'

export default function LabHeader({ onNewIdea }) {
  return (
    <header className="lab-header">
      <div className="lab-header__brand">
        <span className="lab-header__mark" aria-hidden="true" />
        <div>
          <p className="lab-header__eyebrow">Personal R&amp;D Environment</p>
          <h1 className="lab-header__title">Digital Lab</h1>
        </div>
      </div>
      <Button onClick={onNewIdea} className="lab-header__cta">
        + New Idea
      </Button>
    </header>
  )
}
