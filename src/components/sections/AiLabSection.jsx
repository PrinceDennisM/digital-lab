import { aiLabWorkflow } from '../../data/seed.js'

export default function AiLabSection() {
  return (
    <div className="ai-lab">
      <p className="ai-lab__intro">
        Planned workflow where Dennis provides direction and AI assists with
        research, engineering, design, analysis, criticism, synthesis, and
        documentation. Integration is not yet active — this is the target
        operating model.
      </p>
      <ol className="ai-lab__workflow">
        {aiLabWorkflow.map((step, index) => (
          <li key={step.step} className="ai-lab__step">
            <span className="ai-lab__step-num">{String(index + 1).padStart(2, '0')}</span>
            <div>
              <h3 className="ai-lab__step-title">{step.step}</h3>
              <p className="ai-lab__step-desc">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className="ai-lab__status">
        <span className="ai-lab__status-label">Integration status:</span>{' '}
        RESEARCH — backend not connected in v0.1
      </p>
    </div>
  )
}
