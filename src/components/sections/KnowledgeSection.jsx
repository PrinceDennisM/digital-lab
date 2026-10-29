import { knowledge } from '../../data/seed.js'

export default function KnowledgeSection() {
  return (
    <ul className="knowledge-list">
      {knowledge.map((entry) => (
        <li key={entry.id} className="knowledge-item">
          <div className="knowledge-item__meta">
            <span className="knowledge-item__topic">{entry.topic}</span>
            <time dateTime={entry.date}>{entry.date}</time>
          </div>
          <h3 className="knowledge-item__title">{entry.title}</h3>
          <p className="knowledge-item__summary">{entry.summary}</p>
        </li>
      ))}
    </ul>
  )
}
