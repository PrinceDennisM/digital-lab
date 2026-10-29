/** @param {{ authority: 'binding' | 'advisory', actorType?: 'human' | 'ai' }} props */
export default function ProvenanceBadge({ authority, actorType = 'human' }) {
  const label =
    authority === 'binding'
      ? 'Human decision'
      : actorType === 'ai'
        ? 'AI advisory'
        : 'Human advisory'

  return (
    <span
      className={`provenance-badge provenance-badge--${authority === 'binding' ? 'binding' : 'advisory'}`}
    >
      {label}
    </span>
  )
}

