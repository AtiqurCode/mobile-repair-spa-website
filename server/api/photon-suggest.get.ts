/** Proxy to Komoot Photon (OpenStreetMap) — see https://photon.komoot.io/ — use fairly, don’t hammer. */

interface PhotonFeature {
  properties?: Record<string, string | number | undefined | null>
}

interface PhotonResponse {
  features?: PhotonFeature[]
}

function str(v: unknown): string {
  if (v == null) return ''
  const s = String(v).trim()
  return s
}

function formatPhoton(properties: Record<string, string | number | undefined | null> | undefined): {
  label: string
  address: string
} {
  const p = properties ?? {}
  const name = str(p.name)
  const street = str(p.street)
  const housenumber = str(p.housenumber)
  const lineStreet = [housenumber, street].filter(Boolean).join(' ').trim()
  const locality = str(p.city) || str(p.town) || str(p.village) || str(p.district)
  const state = str(p.state)
  const postcode = str(p.postcode)
  const country = str(p.country)

  const label =
    [lineStreet || name, locality].filter(Boolean).join(', ') ||
    name ||
    street ||
    locality ||
    'Address'

  const addrLine1 = lineStreet || name
  const cityLine = [postcode, locality].filter(Boolean).join(' ').trim()
  const address = [addrLine1, cityLine, state, country].filter(Boolean).join(', ')

  return { label, address: address || label }
}

export default defineEventHandler(async (event) => {
  const qRaw = String(getQuery(event).q ?? '').trim()
  const limitRaw = Number(getQuery(event).limit ?? 8)

  if (qRaw.length < 2) {
    return { suggestions: [] as { label: string; address: string }[] }
  }
  if (qRaw.length > 180) {
    throw createError({ statusCode: 400, statusMessage: 'Query too long' })
  }

  const limit = Math.min(15, Math.max(1, Number.isFinite(limitRaw) ? limitRaw : 8))

  const data = await $fetch<PhotonResponse>('https://photon.komoot.io/api/', {
    query: {
      q: qRaw,
      limit,
      lang: 'en',
    },
    headers: {
      Accept: 'application/json',
      'User-Agent': 'RapidFixBookings/1.0 (Nuxt; address autocomplete)',
    },
  })

  const features = data.features ?? []
  const suggestions = features
    .map((f) => formatPhoton(f.properties))
    .filter((s) => s.address.length > 2)

  const seen = new Set<string>()
  const unique = suggestions.filter((s) => {
    const k = s.address.toLowerCase()
    if (seen.has(k)) return false
    seen.add(k)
    return true
  })

  return { suggestions: unique }
})
              