export default function Section({
  id,
  title,
  subtitle,
  emphasis = false,
  children,
}) {
  return (
    <section
      id={id}
      className={`lab-section${emphasis ? ' lab-section--emphasis' : ''}`}
      aria-labelledby={`${id}-heading`}
    >
      <header className="lab-section__header">
        <h2 id={`${id}-heading`} className="lab-section__title">
          {title}
        </h2>
        {subtitle && <p className="lab-section__subtitle">{subtitle}</p>}
      </header>
      <div className="lab-section__body">{children}</div>
    </section>
  )
}
