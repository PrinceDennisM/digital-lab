export default function EmptyState({ title, description, children }) {
  return (
    <div className="empty-state">
      <p className="empty-state__title">{title}</p>
      {description && <p className="empty-state__desc">{description}</p>}
      {children}
    </div>
  )
}
