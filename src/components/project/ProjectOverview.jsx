import {
  getLinkedCuriosity,
  getLinkedExperiments,
  getLinkedKnowledge,
} from '../../domain/selectors/projectSelectors.js'
import Tag from '../ui/Tag.jsx'
import { AiRegistryNote } from './AiContributors.jsx'
import AiSystemRegistry from './AiSystemRegistry.jsx'
import ProjectDiscovery from './ProjectDiscovery.jsx'

/** @param {{ project: import('../../domain/models/index.js').ProjectDetail }} props */
export default function ProjectOverview({ project }) {
  const linkedExperiments = getLinkedExperiments(project)
  const linkedCuriosity = getLinkedCuriosity(project)
  const linkedKnowledge = getLinkedKnowledge(project)

  return (
    <div className="project-overview">
      <div className="project-overview__intro">
        <p className="project-overview__desc">
          {project.narrative ?? project.description}
        </p>
        <div className="project-overview__tags">
          {project.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
        <p className="project-overview__updated">
          Last updated <time dateTime={project.updatedAt}>{project.updatedAt}</time>
        </p>
      </div>

      <AiRegistryNote />
      <AiSystemRegistry />

      <ProjectDiscovery
        experiments={linkedExperiments}
        curiosity={linkedCuriosity}
        knowledge={linkedKnowledge}
      />
    </div>
  )
}
