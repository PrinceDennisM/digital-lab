const stateStyles = {
  ACTIVE: 'status--active',
  EXPERIMENT: 'status--experiment',
  RESEARCH: 'status--research',
  BUILDING: 'status--building',
  REVIEW: 'status--review',
  ARCHIVED: 'status--archived',
}

export default function StatusBadge({ state }) {
  return (
    <span className={`status-badge ${stateStyles[state] ?? ''}`}>
      {state}
    </span>
  )
}
