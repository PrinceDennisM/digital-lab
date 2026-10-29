import { profile, experiments } from '../../data/seed.js'

export default function HeroSection() {
  const activeCount = experiments.filter((e) =>
    ['ACTIVE', 'BUILDING', 'EXPERIMENT', 'RESEARCH'].includes(e.state),
  ).length

  return (
    <header className="hero">
      <div className="hero__identity">
        <p className="hero__eyebrow">Systems Builder</p>
        <h2 className="hero__name">{profile.name}</h2>
        <p className="hero__location">{profile.location}</p>
        <p className="hero__mission">{profile.mission}</p>
      </div>
      <div className="hero__status">
        <div className="hero__stat">
          <span className="hero__stat-value">{activeCount}</span>
          <span className="hero__stat-label">Active explorations</span>
        </div>
        <blockquote className="hero__quote">
          <p>{profile.philosophy}</p>
        </blockquote>
      </div>
    </header>
  )
}
