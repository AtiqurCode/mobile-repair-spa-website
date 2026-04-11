<script setup lang="ts">
import { Check, ChevronLeft, ChevronRight, ChevronDown, Headphones, Search, SlidersHorizontal, Sparkles, X } from 'lucide-vue-next'
import {
  accessoryBrandList,
  accessoryDeviceCatalog,
  accessories,
  accessoryFitsLabel,
  filterAccessories,
  formatAccessoryPrice,
  lineLabel,
  versionLabel,
  type AccessoryBrand,
} from '~/composables/useAccessories'
import PreviewModal, { type PreviewBadge } from '~/components/PreviewModal.vue'

useHead({ title: 'Accessories — RapidFix Phone Repair' })

const route = useRoute()
const router = useRouter()

const brandFilter = ref<string>('all')
const lineFilter = ref('')
const versionFilter = ref('')
const categoryFilters = ref<string[]>([])
const searchQuery = ref('')
const mobileFiltersOpen = ref(false)
const expandedLineId = ref<string>('')
const openBrandId = ref<string>('')
const previewOpen = ref(false)
const previewAccessory = ref<(typeof accessories)[number] | null>(null)
const selectedAccessoryUuids = ref<string[]>([])

function isSelected(uuid: string) {
  return selectedAccessoryUuids.value.includes(uuid)
}

function toggleSelected(uuid: string) {
  const idx = selectedAccessoryUuids.value.indexOf(uuid)
  if (idx >= 0) selectedAccessoryUuids.value.splice(idx, 1)
  else selectedAccessoryUuids.value.push(uuid)
}

function clearSelected() {
  selectedAccessoryUuids.value = []
}

function closeMobileFilters() {
  mobileFiltersOpen.value = false
}

function onFiltersEscape(e: KeyboardEvent) {
  if (e.key === 'Escape') closeMobileFilters()
}

watch(mobileFiltersOpen, (open) => {
  if (!import.meta.client) return
  document.documentElement.style.overflow = open ? 'hidden' : ''
  if (open) window.addEventListener('keydown', onFiltersEscape)
  else window.removeEventListener('keydown', onFiltersEscape)
})

onUnmounted(() => {
  if (!import.meta.client) return
  document.documentElement.style.overflow = ''
  window.removeEventListener('keydown', onFiltersEscape)
})

const categories = computed(() => {
  const s = new Set<string>()
  for (const a of accessories) s.add(a.category)
  return ['All', ...[...s].sort()]
})

const linesForBrand = computed(() => {
  if (brandFilter.value === 'all') return []
  const b = brandFilter.value as AccessoryBrand
  return accessoryDeviceCatalog[b] ?? []
})

const versionsForLine = computed(() => {
  const line = linesForBrand.value.find((l) => l.id === lineFilter.value)
  return line?.versions ?? []
})

function firstStr(val: unknown): string {
  if (typeof val === 'string') return val
  if (Array.isArray(val) && typeof val[0] === 'string') return val[0]
  return ''
}

function applyRouteQuery() {
  const b = firstStr(route.query.brand)
  if (!b || b === 'all') {
    brandFilter.value = 'all'
  } else if (accessoryBrandList.includes(b as AccessoryBrand)) {
    brandFilter.value = b
  } else {
    brandFilter.value = 'all'
  }
  lineFilter.value = firstStr(route.query.line)
  versionFilter.value = firstStr(route.query.version)
  const cats = firstStr(route.query.categories) || firstStr(route.query.category)
  categoryFilters.value = cats ? cats.split(',').map((c) => c.trim()).filter(Boolean) : []
  searchQuery.value = firstStr(route.query.q)
  expandedLineId.value = lineFilter.value || ''
  openBrandId.value = brandFilter.value !== 'all' ? brandFilter.value : ''
}

function pushQuery() {
  const q: Record<string, string> = {}
  if (brandFilter.value && brandFilter.value !== 'all') q.brand = brandFilter.value
  if (lineFilter.value) q.line = lineFilter.value
  if (versionFilter.value) q.version = versionFilter.value
  if (categoryFilters.value.length) q.categories = categoryFilters.value.join(',')
  if (searchQuery.value.trim()) q.q = searchQuery.value.trim()
  const fromSvc = firstStr(route.query.fromService)
  if (fromSvc) q.fromService = fromSvc
  router.replace({ path: '/accessories', query: q })
}

watch(
  () => route.query,
  () => {
    applyRouteQuery()
  },
  { deep: true },
)

onMounted(() => {
  applyRouteQuery()
})

watch([brandFilter, lineFilter, versionFilter, categoryFilters, searchQuery], () => {
  if (brandFilter.value === 'all') {
    lineFilter.value = ''
    versionFilter.value = ''
    expandedLineId.value = ''
  }
  const validLine = linesForBrand.value.some((l) => l.id === lineFilter.value)
  if (!validLine) lineFilter.value = ''
  const validVer = versionsForLine.value.some((v) => v.id === versionFilter.value)
  if (!validVer) versionFilter.value = ''
  pushQuery()
})

const fromServiceLabel = computed(() => firstStr(route.query.fromService))
const serviceBookingFromRoute = computed(() => {
  const brand = firstStr(route.query.svcBrand)
  const service = firstStr(route.query.svcService)
  const detail = firstStr(route.query.svcDetail)
  return { brand, service, detail }
})

const selectedAccessories = computed(() => {
  const map = new Map(accessories.map((a) => [a.uuid, a] as const))
  return selectedAccessoryUuids.value
    .map((uuid) => map.get(uuid))
    .filter(Boolean) as (typeof accessories)[number][]
})

const bookingTo = computed(() => {
  const { brand, service, detail } = serviceBookingFromRoute.value
  const uuids = selectedAccessories.value.map((a) => a.uuid)
  const q: Record<string, string> = {}
  if (brand) q.brand = brand
  if (service) q.service = service
  if (detail) q.detail = detail
  if (uuids.length) q.acc = uuids.join(',')
  return { path: '/book', query: q }
})

const filteredList = computed(() => {
  const b = brandFilter.value === 'all' ? '' : brandFilter.value
  const list = filterAccessories(accessories, {
    brand: b || 'all',
    line: lineFilter.value,
    version: versionFilter.value,
  })
  const byCats =
    categoryFilters.value.length === 0 ? list : list.filter((a) => categoryFilters.value.includes(a.category))

  const q = searchQuery.value.toLowerCase().trim()
  if (!q) return byCats
  return byCats.filter((a) => {
    return (
      a.name.toLowerCase().includes(q) ||
      a.category.toLowerCase().includes(q) ||
      a.blurb.toLowerCase().includes(q) ||
      a.brand.toLowerCase().includes(q)
    )
  })
})

const PAGE_SIZE = 9
const currentPage = ref(1)
watch([brandFilter, lineFilter, versionFilter, categoryFilters, searchQuery, filteredList], () => {
  currentPage.value = 1
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredList.value.length / PAGE_SIZE)))
const paginated = computed(() => {
  const start = (currentPage.value - 1) * PAGE_SIZE
  return filteredList.value.slice(start, start + PAGE_SIZE)
})

function goToPage(p: number) {
  if (p < 1 || p > totalPages.value) return
  currentPage.value = p
  if (import.meta.client) window.scrollTo({ top: 0, behavior: 'smooth' })
}

const pageNumbers = computed(() => {
  const total = totalPages.value
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  const cur = currentPage.value
  const pages: (number | '…')[] = [1]
  if (cur > 3) pages.push('…')
  for (let i = Math.max(2, cur - 1); i <= Math.min(total - 1, cur + 1); i++) pages.push(i)
  if (cur < total - 2) pages.push('…')
  pages.push(total)
  return pages
})

function clearFilters() {
  brandFilter.value = 'all'
  lineFilter.value = ''
  versionFilter.value = ''
  categoryFilters.value = []
  searchQuery.value = ''
  expandedLineId.value = ''
  openBrandId.value = ''
  router.replace({ path: '/accessories', query: {} })
}

const activeFilterCount = computed(() => {
  let n = 0
  if (brandFilter.value !== 'all') n++
  if (lineFilter.value) n++
  if (versionFilter.value) n++
  if (categoryFilters.value.length) n++
  if (searchQuery.value.trim()) n++
  return n
})

function toggleCategory(cat: string) {
  const idx = categoryFilters.value.indexOf(cat)
  if (idx >= 0) categoryFilters.value.splice(idx, 1)
  else categoryFilters.value.push(cat)
}

function chooseBrand(br: string) {
  brandFilter.value = br
  lineFilter.value = ''
  versionFilter.value = ''
  expandedLineId.value = ''
  openBrandId.value = br !== 'all' ? br : ''
}

function chooseLine(lineId: string) {
  lineFilter.value = lineId
  versionFilter.value = ''
  expandedLineId.value = expandedLineId.value === lineId ? '' : lineId
}

function chooseVersion(lineId: string, versionId: string) {
  lineFilter.value = lineId
  versionFilter.value = versionId
  expandedLineId.value = lineId
}

function linesFor(br: string) {
  if (!br || br === 'all') return []
  return accessoryDeviceCatalog[br as AccessoryBrand] ?? []
}


function openAccessoryPreview(a: (typeof accessories)[number]) {
  previewAccessory.value = a
  previewOpen.value = true
}

function closeAccessoryPreview() {
  previewOpen.value = false
  previewAccessory.value = null
}

const accessoryPreviewBadges = computed<PreviewBadge[]>(() => {
  const a = previewAccessory.value
  if (!a) return []
  return [
    { label: a.category, tone: 'slate' },
    { label: accessoryFitsLabel(a), tone: 'emerald' },
  ]
})
</script>

<template>
  <div>
    <section class="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 px-4 py-12 text-white sm:px-6 lg:px-8">
      <div class="mx-auto max-w-7xl text-center">
        <nav aria-label="Browse catalog" class="mb-8 flex justify-center">
          <div class="inline-flex rounded-full border border-white/20 bg-white/5 p-1 shadow-sm backdrop-blur-sm">
            <NuxtLink
              to="/"
              class="rounded-full px-5 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              :class="
                route.path === '/' || route.name === 'index'
                  ? 'bg-white text-slate-900 shadow'
                  : 'text-slate-300 hover:bg-white/10 hover:text-white'
              "
            >
              Services
            </NuxtLink>
            <NuxtLink
              to="/accessories"
              class="rounded-full px-5 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              :class="
                route.path.startsWith('/accessories')
                  ? 'bg-white text-slate-900 shadow'
                  : 'text-slate-300 hover:bg-white/10 hover:text-white'
              "
            >
              Accessories
            </NuxtLink>
          </div>
        </nav>
        <p class="inline-flex items-center gap-2 rounded-full border border-rose-300/30 bg-rose-500/15 px-3 py-1 text-xs font-semibold tracking-wide text-rose-200">
          <Headphones class="h-3.5 w-3.5" /> Accessories
        </p>
        <h1 class="mt-4 text-3xl font-extrabold sm:text-4xl">Cases, protectors &amp; essentials</h1>
        <p class="mx-auto mt-3 max-w-2xl text-sm text-slate-300 sm:text-base">
          Filter by brand, device family, and exact model. Pair accessories with your repair — open from any service card with filters prefilled.
        </p>
      </div>
    </section>

    <div
      v-if="fromServiceLabel"
      class="border-b border-emerald-200/80 bg-emerald-50 px-4 py-3 text-center text-sm text-emerald-900 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-200 sm:px-6"
    >
      <Sparkles class="mr-1 inline h-4 w-4 shrink-0" />
      Showing accessories relevant to:
      <span class="font-semibold">{{ fromServiceLabel }}</span>
      — adjust filters below to explore more.
    </div>

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="serviceBookingFromRoute.brand || serviceBookingFromRoute.service"
        class="border-b border-slate-200 bg-white/90 px-4 py-2 text-center text-xs text-slate-600 backdrop-blur dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-300 sm:px-6"
      >
        Will add to booking:
        <span v-if="serviceBookingFromRoute.brand" class="font-semibold text-slate-900 dark:text-white">{{ serviceBookingFromRoute.brand }}</span>
        <span v-if="serviceBookingFromRoute.brand && serviceBookingFromRoute.service"> · </span>
        <span v-if="serviceBookingFromRoute.service" class="font-semibold text-slate-900 dark:text-white">{{ serviceBookingFromRoute.service }}</span>
      </div>
    </Transition>

    <!-- Mobile: search + filter toggle -->
    <div class="sticky top-14 z-30 border-b border-slate-200 bg-white/95 px-4 py-2.5 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95 lg:hidden">
      <div class="flex items-center gap-2">
        <div class="relative min-w-0 flex-1">
          <Search class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search accessories…"
            class="w-full rounded-full border border-slate-300 bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-900 outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          >
        </div>
        <button
          type="button"
          class="relative inline-flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center gap-2 rounded-2xl border border-slate-300 px-3 text-xs font-bold uppercase tracking-wide dark:border-slate-600"
          aria-haspopup="dialog"
          :aria-expanded="mobileFiltersOpen"
          @click="mobileFiltersOpen = true"
        >
          <SlidersHorizontal class="h-4 w-4" />
          <span class="hidden sm:inline">Filters</span>
          <span
            v-if="activeFilterCount > 0"
            class="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-600 px-1 text-[10px] font-bold text-white shadow-sm"
          >{{ activeFilterCount }}</span>
        </button>
      </div>
    </div>

    <!-- Mobile filter bottom sheet (index-style) -->
    <Teleport to="body">
      <div
        class="fixed inset-0 z-[60] lg:hidden"
        :class="mobileFiltersOpen ? 'pointer-events-auto' : 'pointer-events-none'"
        role="presentation"
      >
        <div
          class="absolute inset-0 bg-slate-900/50 backdrop-blur-[3px] transition-opacity duration-300"
          :class="mobileFiltersOpen ? 'opacity-100' : 'opacity-0'"
          aria-hidden="true"
          @click="closeMobileFilters"
        />

        <div
          class="absolute inset-x-0 bottom-0 flex max-h-[min(88dvh,680px)] flex-col rounded-t-[1.25rem] bg-white shadow-[0_-8px_40px_rgba(0,0,0,0.12)] ring-1 ring-slate-200/80 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] dark:bg-slate-900 dark:ring-slate-700"
          :class="mobileFiltersOpen ? 'translate-y-0' : 'translate-y-full'"
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-accessories-filters-title"
        >
          <div class="flex shrink-0 flex-col items-center pt-2 pb-1">
            <div class="h-1 w-12 rounded-full bg-slate-300 dark:bg-slate-600" aria-hidden="true" />
          </div>

          <div class="flex shrink-0 items-center justify-between gap-3 border-b border-slate-100 px-4 pb-3 pt-1 dark:border-slate-800">
            <div>
              <h2 id="mobile-accessories-filters-title" class="text-lg font-bold text-slate-900 dark:text-white">
                Filters
              </h2>
              <p class="text-xs text-slate-500 dark:text-slate-400">
                {{ filteredList.length }} item{{ filteredList.length !== 1 ? 's' : '' }} match
              </p>
            </div>
            <button
              type="button"
              class="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
              aria-label="Close filters"
              @click="closeMobileFilters"
            >
              <X class="h-5 w-5" />
            </button>
          </div>

          <div class="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4">
            <!-- Brand -->
            <details open class="group rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/40">
              <summary class="flex cursor-pointer list-none items-center justify-between">
                <div>
                  <p class="text-xs font-bold uppercase tracking-wider text-slate-400">Brand</p>
                  <p class="mt-1 text-sm font-semibold text-slate-900 dark:text-white">
                    {{ brandFilter === 'all' ? 'All brands' : brandFilter }}
                  </p>
                </div>
                <ChevronDown class="h-5 w-5 text-slate-400 transition group-open:rotate-180" />
              </summary>

              <!-- Nested collapse tree -->
              <div class="mt-4 space-y-2">
                <button
                  type="button"
                  class="flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left text-sm font-semibold transition dark:border-slate-700"
                  :class="brandFilter === 'all' ? 'border-rose-500 bg-rose-50 text-rose-800 dark:bg-rose-950/40 dark:text-rose-200' : 'border-slate-200 bg-white text-slate-800 dark:bg-slate-900 dark:text-slate-200'"
                  @click="chooseBrand('all')"
                >
                  All brands
                  <span v-if="brandFilter === 'all'" class="text-xs font-bold text-rose-600 dark:text-rose-300">Selected</span>
                </button>

                <div
                  v-for="br in accessoryBrandList"
                  :key="br"
                  class="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950"
                >
                  <button
                    type="button"
                    class="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold transition"
                    :class="openBrandId === br ? 'bg-rose-50 text-rose-900 dark:bg-rose-950/40 dark:text-rose-200' : 'bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-200'"
                    @click="openBrandId = openBrandId === br ? '' : br; chooseBrand(br)"
                  >
                    <span>{{ br }}</span>
                    <span class="inline-flex items-center gap-2">
                      <span v-if="brandFilter === br" class="text-xs font-bold text-rose-600 dark:text-rose-300">Selected</span>
                      <ChevronDown class="h-4 w-4 text-slate-400 transition" :class="openBrandId === br ? 'rotate-180' : ''" />
                    </span>
                  </button>

                  <div v-if="openBrandId === br" class="border-t border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900/30">
                    <p class="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                      {{ br === 'Apple' ? 'iPhone releases' : 'Device releases' }}
                    </p>
                    <div class="space-y-2">
                      <div
                        v-for="ln in linesFor(br)"
                        :key="ln.id"
                        class="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800"
                      >
                        <button
                          type="button"
                          class="flex w-full items-center justify-between bg-white px-3 py-2.5 text-left text-sm font-semibold text-slate-900 dark:bg-slate-950 dark:text-slate-200"
                          @click="chooseLine(ln.id)"
                        >
                          <span class="truncate">{{ ln.label }}</span>
                          <ChevronDown class="h-4 w-4 text-slate-400 transition" :class="expandedLineId === ln.id ? 'rotate-180' : ''" />
                        </button>

                        <div v-if="expandedLineId === ln.id" class="bg-slate-50 p-3 dark:bg-slate-900/30">
                          <div class="flex flex-col gap-2">
                            <button
                              v-for="v in ln.versions"
                              :key="v.id"
                              type="button"
                              class="flex w-full items-center justify-between rounded-lg border px-3 py-2 text-left text-sm font-semibold transition"
                              :class="versionFilter === v.id ? 'border-rose-500 bg-rose-600 text-white' : 'border-slate-200 bg-white text-slate-800 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200'"
                              @click="chooseVersion(ln.id, v.id)"
                            >
                              <span>{{ v.label }}</span>
                              <span v-if="versionFilter === v.id" class="text-xs font-bold">Selected</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </details>

            <!-- Category (multi checkbox) -->
            <details open class="mt-3 group rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/40">
              <summary class="flex cursor-pointer list-none items-center justify-between">
                <div>
                  <p class="text-xs font-bold uppercase tracking-wider text-slate-400">Category</p>
                  <p class="mt-1 text-sm font-semibold text-slate-900 dark:text-white">
                    <template v-if="categoryFilters.length === 0">All categories</template>
                    <template v-else>{{ categoryFilters.length }} selected</template>
                  </p>
                </div>
                <ChevronDown class="h-5 w-5 text-slate-400 transition group-open:rotate-180" />
              </summary>

              <div class="mt-4 space-y-2">
                <label
                  v-for="c in categories.filter((x) => x !== 'All')"
                  :key="c"
                  class="flex cursor-pointer items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                >
                  <span>{{ c }}</span>
                  <input
                    type="checkbox"
                    class="h-5 w-5 accent-rose-600"
                    :checked="categoryFilters.includes(c)"
                    @change="toggleCategory(c)"
                  >
                </label>
              </div>
            </details>
          </div>

          <div
            class="shrink-0 border-t border-slate-100 bg-white px-4 pt-3 dark:border-slate-800 dark:bg-slate-900"
            style="padding-bottom: max(0.75rem, env(safe-area-inset-bottom))"
          >
            <div class="flex gap-3">
              <button
                v-if="activeFilterCount > 0"
                type="button"
                class="flex min-h-12 flex-1 items-center justify-center rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 active:scale-[0.99] dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
                @click="clearFilters"
              >
                Reset
              </button>
              <button
                type="button"
                class="flex min-h-12 min-w-0 items-center justify-center rounded-xl bg-rose-600 text-sm font-bold text-white shadow-lg shadow-rose-600/25 transition hover:bg-rose-500 active:scale-[0.99]"
                :class="activeFilterCount > 0 ? 'flex-[2]' : 'w-full flex-1'"
                @click="closeMobileFilters"
              >
                Show {{ filteredList.length }} result{{ filteredList.length !== 1 ? 's' : '' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>

    <section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div class="flex flex-col gap-8 lg:flex-row lg:items-start">
        <!-- Desktop sidebar (restores column divider) -->
        <aside class="hidden w-80 shrink-0 lg:sticky lg:top-24 lg:block">
          <div class="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <div class="relative">
              <Search class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search accessories…"
                class="w-full rounded-full border border-slate-300 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-900 outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              >
            </div>
          </div>

          <div class="mt-4 border-r border-slate-200 pr-6 dark:border-slate-800">
            <details open class="group rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/40">
              <summary class="flex cursor-pointer list-none items-center justify-between">
                <div>
                  <p class="text-xs font-bold uppercase tracking-wider text-slate-400">Brand</p>
                  <p class="mt-1 text-sm font-semibold text-slate-900 dark:text-white">
                    {{ brandFilter === 'all' ? 'All brands' : brandFilter }}
                  </p>
                </div>
                <ChevronDown class="h-5 w-5 text-slate-400 transition group-open:rotate-180" />
              </summary>

              <!-- Nested collapse tree -->
              <div class="mt-4 space-y-2">
                <button
                  type="button"
                  class="flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left text-sm font-semibold transition dark:border-slate-700"
                  :class="brandFilter === 'all' ? 'border-rose-500 bg-rose-50 text-rose-800 dark:bg-rose-950/40 dark:text-rose-200' : 'border-slate-200 bg-white text-slate-800 dark:bg-slate-900 dark:text-slate-200'"
                  @click="chooseBrand('all')"
                >
                  All brands
                  <span v-if="brandFilter === 'all'" class="text-xs font-bold text-rose-600 dark:text-rose-300">Selected</span>
                </button>

                <div
                  v-for="br in accessoryBrandList"
                  :key="br"
                  class="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950"
                >
                  <button
                    type="button"
                    class="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold transition"
                    :class="openBrandId === br ? 'bg-rose-50 text-rose-900 dark:bg-rose-950/40 dark:text-rose-200' : 'bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-200'"
                    @click="openBrandId = openBrandId === br ? '' : br; chooseBrand(br)"
                  >
                    <span>{{ br }}</span>
                    <span class="inline-flex items-center gap-2">
                      <span v-if="brandFilter === br" class="text-xs font-bold text-rose-600 dark:text-rose-300">Selected</span>
                      <ChevronDown class="h-4 w-4 text-slate-400 transition" :class="openBrandId === br ? 'rotate-180' : ''" />
                    </span>
                  </button>

                  <div v-if="openBrandId === br" class="border-t border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900/30">
                    <p class="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                      {{ br === 'Apple' ? 'iPhone releases' : 'Device releases' }}
                    </p>
                    <div class="space-y-2">
                      <div
                        v-for="ln in linesFor(br)"
                        :key="ln.id"
                        class="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800"
                      >
                        <button
                          type="button"
                          class="flex w-full items-center justify-between bg-white px-3 py-2.5 text-left text-sm font-semibold text-slate-900 dark:bg-slate-950 dark:text-slate-200"
                          @click="chooseLine(ln.id)"
                        >
                          <span class="truncate">{{ ln.label }}</span>
                          <ChevronDown class="h-4 w-4 text-slate-400 transition" :class="expandedLineId === ln.id ? 'rotate-180' : ''" />
                        </button>

                        <div v-if="expandedLineId === ln.id" class="bg-slate-50 p-3 dark:bg-slate-900/30">
                          <div class="flex flex-col gap-2">
                            <button
                              v-for="v in ln.versions"
                              :key="v.id"
                              type="button"
                              class="flex w-full items-center justify-between rounded-lg border px-3 py-2 text-left text-sm font-semibold transition"
                              :class="versionFilter === v.id ? 'border-rose-500 bg-rose-600 text-white' : 'border-slate-200 bg-white text-slate-800 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200'"
                              @click="chooseVersion(ln.id, v.id)"
                            >
                              <span>{{ v.label }}</span>
                              <span v-if="versionFilter === v.id" class="text-xs font-bold">Selected</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </details>

            <details open class="mt-3 group rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/40">
              <summary class="flex cursor-pointer list-none items-center justify-between">
                <div>
                  <p class="text-xs font-bold uppercase tracking-wider text-slate-400">Category</p>
                  <p class="mt-1 text-sm font-semibold text-slate-900 dark:text-white">
                    <template v-if="categoryFilters.length === 0">All categories</template>
                    <template v-else>{{ categoryFilters.length }} selected</template>
                  </p>
                </div>
                <ChevronDown class="h-5 w-5 text-slate-400 transition group-open:rotate-180" />
              </summary>

              <div class="mt-4 space-y-2">
                <label
                  v-for="c in categories.filter((x) => x !== 'All')"
                  :key="c"
                  class="flex cursor-pointer items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                >
                  <span>{{ c }}</span>
                  <input
                    type="checkbox"
                    class="h-5 w-5 accent-rose-600"
                    :checked="categoryFilters.includes(c)"
                    @change="toggleCategory(c)"
                  >
                </label>
              </div>
            </details>

            <button
              v-if="activeFilterCount > 0"
              type="button"
              class="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-900"
              @click="clearFilters"
            >
              <X class="h-4 w-4" /> Clear all
            </button>
          </div>
        </aside>

        <div class="min-w-0 flex-1 lg:pl-6">
          <div class="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p class="text-sm text-slate-500 dark:text-slate-400">
                Showing
                <span class="font-semibold text-slate-900 dark:text-white">{{ filteredList.length }}</span>
                accessories
              </p>
              <p v-if="brandFilter !== 'all'" class="mt-1 text-xs text-slate-500 dark:text-slate-400">
                <span class="font-medium text-slate-700 dark:text-slate-300">{{ brandFilter }}</span>
                <template v-if="lineFilter"> · {{ lineLabel(lineFilter) }}</template>
                <template v-if="versionFilter"> · {{ versionLabel(lineFilter, versionFilter) }}</template>
              </p>
            </div>
          </div>

          <div v-if="filteredList.length === 0" class="rounded-2xl border border-dashed border-slate-200 py-16 text-center text-slate-500 dark:border-slate-700">
            No accessories match these filters. Try another brand or device.
          </div>

          <div v-else class="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3 xl:gap-6">
            <article
              v-for="item in paginated"
              :key="item.id"
              class="group relative flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 xl:rounded-2xl"
            >
              <button
                type="button"
                class="absolute inset-0 z-10 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500/40 xl:rounded-2xl"
                :aria-label="`Preview ${item.name}`"
                @click="openAccessoryPreview(item)"
              />

              <button
                type="button"
                class="absolute right-2 top-2 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full border shadow-sm transition active:scale-95"
                :class="
                  isSelected(item.uuid)
                    ? 'border-rose-600 bg-rose-600 text-white'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900'
                "
                :aria-pressed="isSelected(item.uuid)"
                :aria-label="isSelected(item.uuid) ? `Remove ${item.name}` : `Select ${item.name}`"
                @click.stop="toggleSelected(item.uuid)"
              >
                <Check v-if="isSelected(item.uuid)" class="h-4 w-4" />
                <span v-else class="text-[11px] font-extrabold leading-none">+</span>
              </button>

              <div class="relative aspect-[4/3] overflow-hidden">
                <img
                  :src="item.image"
                  :alt="item.name"
                  class="h-full w-full object-cover"
                >
                <span class="absolute left-2 top-2 rounded-full bg-rose-600/90 px-2 py-0.5 text-[10px] font-bold uppercase text-white">
                  {{ item.brand }}
                </span>
              </div>
              <div class="flex flex-1 flex-col gap-2 p-3 sm:gap-2.5 sm:p-4">
                <p class="text-[10px] font-semibold uppercase tracking-wide text-rose-600 dark:text-rose-400">
                  {{ item.category }}
                </p>
                <h3 class="line-clamp-2 text-sm font-bold text-slate-900 dark:text-white sm:text-base">
                  {{ item.name }}
                </h3>
                <p class="line-clamp-2 text-xs text-slate-500 dark:text-slate-400">
                  {{ item.blurb }}
                </p>
                <p class="pt-1 text-base font-bold text-slate-900 dark:text-white">
                  {{ formatAccessoryPrice(item.price) }}
                </p>
                <NuxtLink
                  :to="{ path: '/book', query: { detail: `Accessory: ${item.name}`, acc: item.uuid } }"
                  class="relative z-20 mt-auto inline-flex w-full items-center justify-center rounded-full border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-bold text-rose-800 transition hover:bg-rose-100 active:scale-95 dark:border-rose-800 dark:bg-rose-950/50 dark:text-rose-200 sm:w-auto"
                >
                  Buy Now
                </NuxtLink>
              </div>
            </article>
          </div>

          <div v-if="totalPages > 1" class="mt-10 flex items-center justify-center gap-1.5">
            <button
              type="button"
              :disabled="currentPage === 1"
              class="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white disabled:opacity-40 dark:border-slate-700 dark:bg-slate-900"
              @click="goToPage(currentPage - 1)"
            >
              <ChevronLeft class="h-4 w-4" />
            </button>
            <template v-for="(p, i) in pageNumbers" :key="i">
              <span v-if="p === '…'" class="px-1 text-slate-400">…</span>
              <button
                v-else
                type="button"
                class="inline-flex h-9 min-w-[2.25rem] items-center justify-center rounded-full border text-sm font-semibold transition"
                :class="
                  currentPage === p
                    ? 'border-rose-600 bg-rose-600 text-white'
                    : 'border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900'
                "
                @click="goToPage(p as number)"
              >
                {{ p }}
              </button>
            </template>
            <button
              type="button"
              :disabled="currentPage === totalPages"
              class="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white disabled:opacity-40 dark:border-slate-700 dark:bg-slate-900"
              @click="goToPage(currentPage + 1)"
            >
              <ChevronRight class="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>

    <PreviewModal
      :open="previewOpen"
      :title="previewAccessory?.name ?? ''"
      :subtitle="previewAccessory ? `${previewAccessory.brand} · Accessory` : undefined"
      :image="previewAccessory?.image"
      :price-text="previewAccessory ? formatAccessoryPrice(previewAccessory.price) : undefined"
      :badges="accessoryPreviewBadges"
      :description="previewAccessory?.blurb"
      :specs="
        previewAccessory
          ? {
              Category: previewAccessory.category,
              Fits: accessoryFitsLabel(previewAccessory),
            }
          : undefined
      "
      :primary-cta="
        previewAccessory
          ? {
              label: 'Buy now',
              to: { path: '/book', query: { detail: `Accessory: ${previewAccessory.name}` } },
            }
          : undefined
      "
      @close="closeAccessoryPreview"
    />
  </div>

  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-250 ease-[cubic-bezier(0.32,0.72,0,1)]"
      enter-from-class="opacity-0 translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-[cubic-bezier(0.32,0.72,0,1)]"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-4"
    >
      <div
        v-if="selectedAccessoryUuids.length"
        class="fixed inset-x-0 bottom-0 z-[70] border-t border-slate-200 bg-white/95 px-4 py-3 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95 lg:bottom-4 lg:inset-x-auto lg:left-1/2 lg:w-[min(680px,calc(100vw-2rem))] lg:-translate-x-1/2 lg:rounded-2xl lg:border lg:shadow-lg"
      >
        <div class="mx-auto flex max-w-7xl items-center gap-3">
          <p class="min-w-0 flex-1 text-sm font-semibold text-slate-900 dark:text-white">
            {{ selectedAccessoryUuids.length }} selected
            <span v-if="selectedAccessoryUuids.length <= 3" class="text-slate-500 dark:text-slate-400">
              — {{ selectedAccessories.map((a) => a.name).join(', ') }}
            </span>
          </p>

          <button
            type="button"
            class="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-50 active:scale-95 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            @click="clearSelected"
          >
            Clear
          </button>

          <NuxtLink
            :to="bookingTo"
            class="inline-flex items-center justify-center rounded-full bg-rose-600 px-4 py-2 text-xs font-bold text-white transition hover:bg-rose-500 active:scale-95"
          >
            Add to booking
          </NuxtLink>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
