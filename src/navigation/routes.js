export const ROUTES = {
  LAB: '/',
  LAB_HASH: '#/',
  project: (slug) => `/project/${slug}`,
  projectHash: (slug) => `#/project/${slug}`,
}

/** @param {string} hash */
export function parseRoute(hash) {
  const path = (hash || '#/').replace(/^#/, '') || '/'
  const normalized = path.startsWith('/') ? path : `/${path}`

  const projectMatch = normalized.match(/^\/project\/([^/]+)\/?$/)
  if (projectMatch) {
    return { view: 'project', slug: decodeURIComponent(projectMatch[1]) }
  }

  return { view: 'lab' }
}
