/** @type {Record<string, import('../models/index.js').AiSystemRef>} */
export const AI_SYSTEMS = {
  cursor: {
    id: 'cursor',
    displayName: 'Cursor',
    iconKey: 'cursor',
    provider: 'cursor',
  },
  claude: {
    id: 'claude',
    displayName: 'Claude',
    iconKey: 'claude',
    provider: 'anthropic',
  },
  chatgpt: {
    id: 'chatgpt',
    displayName: 'ChatGPT',
    iconKey: 'chatgpt',
    provider: 'openai',
  },
  gemini: {
    id: 'gemini',
    displayName: 'Gemini',
    iconKey: 'gemini',
    provider: 'google',
  },
  perplexity: {
    id: 'perplexity',
    displayName: 'Perplexity',
    iconKey: 'perplexity',
    provider: 'perplexity',
  },
}

/** @param {string} iconKey */
export function getAiIconPath(iconKey) {
  return `/ai-icons/${iconKey}.svg`
}

/** @param {string} systemId */
export function getAiSystem(systemId) {
  return AI_SYSTEMS[systemId] ?? null
}
