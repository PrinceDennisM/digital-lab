import { useCallback, useEffect, useState } from 'react'
import { parseRoute, ROUTES } from './routes.js'

export default function useLabNavigation() {
  const [route, setRoute] = useState(() =>
    parseRoute(window.location.hash),
  )

  useEffect(() => {
    const onHashChange = () => {
      setRoute(parseRoute(window.location.hash))
    }
    window.addEventListener('hashchange', onHashChange)
    if (!window.location.hash) {
      window.location.hash = ROUTES.LAB_HASH
    }
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const navigateToLab = useCallback(() => {
    window.location.hash = ROUTES.LAB_HASH
  }, [])

  const navigateToProject = useCallback((slug) => {
    window.location.hash = ROUTES.projectHash(slug)
  }, [])

  return {
    route,
    navigateToLab,
    navigateToProject,
    isLab: route.view === 'lab',
    isProject: route.view === 'project',
    projectSlug: route.view === 'project' ? route.slug : null,
  }
}
