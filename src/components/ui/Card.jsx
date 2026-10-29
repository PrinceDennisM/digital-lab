export default function Card({ children, className = '', compact = false }) {
  return (
    <article className={`card${compact ? ' card--compact' : ''} ${className}`.trim()}>
      {children}
    </article>
  )
}
