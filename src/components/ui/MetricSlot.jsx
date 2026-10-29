/** @param {{ metric: import('../../domain/models/index.js').MetricValue | null | undefined, label: string, description: string, unit?: string }} props */
export default function MetricSlot({ metric, label, description, unit }) {
  const hasValue = metric?.value !== null && metric?.value !== undefined

  return (
    <div className="metric-slot">
      <div className="metric-slot__header">
        <span className="metric-slot__label">{label}</span>
        {unit && <span className="metric-slot__unit">{unit}</span>}
      </div>
      <p className="metric-slot__desc">{description}</p>
      {hasValue ? (
        <p className="metric-slot__value">
          {metric.value}
          {metric.source && (
            <span className="metric-slot__source"> · {metric.source}</span>
          )}
        </p>
      ) : (
        <p className="metric-slot__empty">Not tracked</p>
      )}
      {metric?.note && <p className="metric-slot__note">{metric.note}</p>}
    </div>
  )
}
