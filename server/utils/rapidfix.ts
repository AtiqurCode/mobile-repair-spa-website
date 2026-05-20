import type { H3Event } from 'h3'

/**
 * Forward a GET request to the configured RapidFix Laravel API,
 * preserving query params. Used by /api/catalog/* proxy routes so
 * the browser stays same-origin (no CORS, no cert trust issues).
 */
export async function forwardCatalogGet<T>(event: H3Event, path: string): Promise<T> {
  const config = useRuntimeConfig()
  const base = String(config.public.rapidfixApiUrl ?? '')
    .trim()
    .replace(/\/$/, '')

  if (!base) {
    throw createError({ statusCode: 503, statusMessage: 'RapidFix API base URL is not configured' })
  }

  const query = getQuery(event)

  return await $fetch<T>(`${base}${path}`, { query })
}
