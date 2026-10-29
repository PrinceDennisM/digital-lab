import { AI_SYSTEMS, getAiIconPath } from '../../domain/constants/aiSystems.js'

export default function AiSystemRegistry() {
  const systems = Object.values(AI_SYSTEMS)

  return (
    <section className="ai-registry" aria-label="Registered AI systems">
      <h3 className="ai-registry__title">Registered AI systems</h3>
      <ul className="ai-registry__list">
        {systems.map((system) => (
          <li key={system.id} className="ai-registry__item">
            <img
              src={getAiIconPath(system.iconKey)}
              alt=""
              width={20}
              height={20}
              className="ai-registry__icon"
            />
            <span>{system.displayName}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
