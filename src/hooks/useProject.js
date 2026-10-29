import { getProjectBySlug } from '../domain/selectors/projectSelectors.js'

/** @param {string | null} slug */
export default function useProject(slug) {
  const project = slug ? getProjectBySlug(slug) : null

  return {
    project,
    loading: false,
    notFound: Boolean(slug && !project),
  }
}
