import EmptyState from '../ui/EmptyState.jsx'

/** @param {{ experiments: import('../../domain/models/index.js').Experiment[], curiosity: import('../../domain/models/index.js').CuriosityItem[], knowledge: import('../../domain/models/index.js').KnowledgeEntry[] }} props */
export default function ProjectDiscovery({
  experiments,
  curiosity,
  knowledge,
}) {
  const hasLinks =
    experiments.length > 0 || curiosity.length > 0 || knowledge.length > 0

  if (!hasLinks) {
    return (
      <EmptyState
        title="No linked exploration paths"
        description="Related experiments, curiosity items, and knowledge notes will surface here."
      />
    )
  }

  return (
    <div className="project-discovery">
      {experiments.length > 0 && (
        <section>
          <h3 className="project-discovery__heading">Linked experiments</h3>
          <ul className="project-discovery__list">
            {experiments.map((item) => (
              <li key={item.id}>{item.title}</li>
            ))}
          </ul>
        </section>
      )}
      {curiosity.length > 0 && (
        <section>
          <h3 className="project-discovery__heading">Related curiosity</h3>
          <ul className="project-discovery__list">
            {curiosity.map((item) => (
              <li key={item.id}>{item.question}</li>
            ))}
          </ul>
        </section>
      )}
      {knowledge.length > 0 && (
        <section>
          <h3 className="project-discovery__heading">Related knowledge</h3>
          <ul className="project-discovery__list">
            {knowledge.map((item) => (
              <li key={item.id}>{item.title}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
