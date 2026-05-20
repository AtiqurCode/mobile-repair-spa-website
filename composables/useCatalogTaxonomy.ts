import {
  accessoryDeviceCatalog,
  accessoryBrandList,
  lineLabel as staticLineLabel,
  versionLabel as staticVersionLabel,
  type AccessoryBrand,
} from '~/composables/useAccessories'

type ApiCategory = {
  id: number
  name: string
  slug: string
  description: string | null
  sort_order: number
}

type ApiVersion = { id: string; label: string }
type ApiLine = { id: string; label: string; versions: ApiVersion[] }
type ApiBrand = {
  id: number
  name: string
  slug: string
  logo_url: string | null
  lines: ApiLine[]
}

type Envelope<T> = { data: T }

export type TaxonomyBrand = {
  id: number
  name: string
  slug: string
  logoUrl: string | null
  lines: ApiLine[]
}

/**
 * Shared taxonomy state (brands+device tree, service & accessory categories).
 * When `NUXT_PUBLIC_RAPIFIX_API_URL` is unset OR the fetch fails, the resolvers
 * gracefully fall back to the bundled static `accessoryDeviceCatalog` and the
 * hard-coded brand list so the UI never renders raw slugs.
 */
export function useCatalogTaxonomy() {
  const brands = useState<TaxonomyBrand[]>('rapidfix:taxonomy-brands', () => [])
  const serviceCategories = useState<ApiCategory[]>('rapidfix:taxonomy-service-cats', () => [])
  const accessoryCategories = useState<ApiCategory[]>('rapidfix:taxonomy-accessory-cats', () => [])
  const loaded = useState('rapidfix:taxonomy-loaded', () => false)

  async function refresh(): Promise<void> {
    try {
      const [brandsRes, svcCatsRes, accCatsRes] = await Promise.all([
        $fetch<Envelope<ApiBrand[]>>('/api/catalog/brands', { query: { include_tree: 1 } }),
        $fetch<Envelope<ApiCategory[]>>('/api/catalog/categories', { query: { type: 'service' } }),
        $fetch<Envelope<ApiCategory[]>>('/api/catalog/categories', { query: { type: 'accessory' } }),
      ])

      brands.value = brandsRes.data.map((b) => ({
        id: b.id,
        name: b.name,
        slug: b.slug,
        logoUrl: b.logo_url,
        lines: b.lines ?? [],
      }))
      serviceCategories.value = svcCatsRes.data
      accessoryCategories.value = accCatsRes.data
    } catch (e) {
      console.warn('[rapidfix] taxonomy refresh failed — using static fallback', e)
    } finally {
      loaded.value = true
    }
  }

  /** Brand names as they appear in the accessory picker / sidebar. */
  const brandNames = computed<string[]>(() => {
    if (brands.value.length) return brands.value.map((b) => b.name)
    return [...accessoryBrandList]
  })

  /** Service category names for the /index + /book service category filter. */
  const serviceCategoryNames = computed<string[]>(() => {
    if (serviceCategories.value.length) return serviceCategories.value.map((c) => c.name)
    return ['iPhone', 'Samsung', 'Google Pixel', 'General']
  })

  /** Device lines for a brand by display name (e.g. 'Apple'). */
  function linesForBrand(brandName: string): ApiLine[] {
    if (brands.value.length) {
      const brand = brands.value.find((b) => b.name === brandName)
      return brand?.lines ?? []
    }
    const fallback = accessoryDeviceCatalog[brandName as AccessoryBrand]
    return fallback ? fallback.map((l) => ({ id: l.id, label: l.label, versions: l.versions })) : []
  }

  function findLine(lineId: string): ApiLine | undefined {
    for (const b of brands.value) {
      const hit = b.lines.find((l) => l.id === lineId)
      if (hit) return hit
    }
    return undefined
  }

  function lineLabel(lineId: string): string {
    if (!lineId) return ''
    return findLine(lineId)?.label ?? staticLineLabel(lineId)
  }

  function versionLabel(lineId: string, versionId: string): string {
    if (!versionId) return ''
    const line = findLine(lineId)
    const hit = line?.versions.find((v) => v.id === versionId)
    return hit?.label ?? staticVersionLabel(lineId, versionId)
  }

  function fitsLabel(deviceLineId: string, versionId: string): string {
    if (versionId === 'all') return 'All models'
    if (versionId === 'all-line') return lineLabel(deviceLineId)
    return versionLabel(deviceLineId, versionId)
  }

  return {
    brands,
    serviceCategories,
    accessoryCategories,
    loaded,
    refresh,
    brandNames,
    serviceCategoryNames,
    linesForBrand,
    lineLabel,
    versionLabel,
    fitsLabel,
  }
}
