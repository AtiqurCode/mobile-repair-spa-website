<script setup lang="ts">
import {
  BadgeCheck,
  BatteryCharging,
  Camera,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Droplets,
  Fingerprint,
  Layers,
  Mic2,
  ShieldCheck,
  SlidersHorizontal,
  Smartphone,
  Speaker,
  Tag,
  Usb,
  Wifi,
  Wrench,
  X,
  Zap
} from 'lucide-vue-next'
import PreviewModal, { type PreviewBadge } from '~/components/PreviewModal.vue'

useHead({ title: 'RapidFix Phone Repair — Expert Repairs & Same-Day Service' })

const categories = ['All Categories', 'iPhone', 'Samsung', 'Google Pixel', 'General']
const activeCategory = ref('All Categories')

const sortOptions = [
  { label: 'Latest Service', value: 'latest' },
  { label: 'Low to High', value: 'low' },
  { label: 'High to Low', value: 'high' },
]
const activeSort = ref('latest')

const popularTags = [
  'Screen Repair',
  'Battery Replacement',
  'Quick Service',
  'Water Damage',
  'Charging Fix',
  'Camera Repair',
  'Speaker Fix',
  'Hardware Fix',
  'Same-Day Service',
  'Warranty Included',
]
const activeTag = ref<string | null>(null)

type Service = {
  id: number
  category: string
  tags: string[]
  name: string
  description: string
  price: number
  eta: string
  warranty: string
  image: string
}
const previewOpen = ref(false)
const previewService = ref<Service | null>(null)

function openServicePreview(svc: Service) {
  previewService.value = svc
  previewOpen.value = true
}

function closeServicePreview() {
  previewOpen.value = false
  previewService.value = null
}

const servicePreviewBadges = computed<PreviewBadge[]>(() => {
  const s = previewService.value
  if (!s) return []
  return [
    { label: s.eta, tone: 'slate' },
    { label: `${s.warranty} warranty`, tone: 'emerald' },
  ]
})

const services = [
  // ── iPhone ────────────────────────────────────────────────
  {
    id: 1,
    category: 'iPhone',
    tags: ['Screen Repair', 'Quick Service', 'Same-Day Service', 'Warranty Included'],
    icon: Wrench,
    name: 'iPhone Screen Replacement',
    description: 'OLED and LCD screen replacements with factory-calibrated touch and True Tone support for all modern iPhone models.',
    price: 79,
    eta: '45–60 min',
    warranty: '12 months',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 2,
    category: 'iPhone',
    tags: ['Battery Replacement', 'Quick Service', 'Same-Day Service', 'Warranty Included'],
    icon: BatteryCharging,
    name: 'iPhone Battery Replacement',
    description: 'Restore all-day battery life with a health-certified replacement cell. Compatible with iPhone 11 through iPhone 15 series.',
    price: 49,
    eta: '30–45 min',
    warranty: '12 months',
    image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 3,
    category: 'iPhone',
    tags: ['Charging Fix', 'Quick Service', 'Same-Day Service', 'Warranty Included'],
    icon: Zap,
    name: 'iPhone Charging Port Fix',
    description: 'Resolve slow charging, loose cable connection, and intermittent charging on Lightning and USB-C iPhones.',
    price: 59,
    eta: '30–45 min',
    warranty: '12 months',
    image: 'https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 4,
    category: 'iPhone',
    tags: ['Camera Repair', 'Same-Day Service', 'Warranty Included'],
    icon: Camera,
    name: 'iPhone Camera Repair',
    description: 'Fix blurry, non-focusing, or black front and rear camera modules. Includes lens glass and OIS calibration.',
    price: 89,
    eta: '45–60 min',
    warranty: '12 months',
    image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 5,
    category: 'iPhone',
    tags: ['Speaker Fix', 'Hardware Fix', 'Quick Service', 'Warranty Included'],
    icon: Speaker,
    name: 'iPhone Speaker / Earpiece Repair',
    description: 'Repair muffled, crackling, or completely silent speakers and earpieces. We also fix microphone issues.',
    price: 55,
    eta: '30–45 min',
    warranty: '12 months',
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 6,
    category: 'iPhone',
    tags: ['Hardware Fix', 'Same-Day Service', 'Warranty Included'],
    icon: Smartphone,
    name: 'iPhone Back Glass Repair',
    description: 'Replace cracked or shattered rear glass on iPhone 8 through iPhone 15 Pro Max with colour-matched OEM glass panels.',
    price: 69,
    eta: '45–75 min',
    warranty: '12 months',
    image: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 7,
    category: 'iPhone',
    tags: ['Hardware Fix', 'Quick Service', 'Warranty Included'],
    icon: Fingerprint,
    name: 'Face ID / Touch ID Repair',
    description: 'Restore broken Face ID sensors or unresponsive Touch ID home buttons. Genuine Apple-compatible components used throughout.',
    price: 95,
    eta: '60–90 min',
    warranty: '12 months',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 8,
    category: 'iPhone',
    tags: ['Hardware Fix', 'Quick Service', 'Warranty Included'],
    icon: Layers,
    name: 'iPhone Screen Protector Fitting',
    description: 'Professional dust-free application of tempered glass or ceramic screen protectors with edge-to-edge alignment.',
    price: 15,
    eta: '10–15 min',
    warranty: '3 months',
    image: 'https://images.unsplash.com/photo-1601972599720-36938d4ecd31?auto=format&fit=crop&w=900&q=80',
  },
  // ── Samsung ───────────────────────────────────────────────
  {
    id: 9,
    category: 'Samsung',
    tags: ['Screen Repair', 'Same-Day Service', 'Warranty Included'],
    icon: Wrench,
    name: 'Samsung Screen Replacement',
    description: 'Genuine AMOLED screen replacements for Galaxy S and A series phones. Maintains fingerprint-on-display functionality.',
    price: 89,
    eta: '60–90 min',
    warranty: '12 months',
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 10,
    category: 'Samsung',
    tags: ['Battery Replacement', 'Quick Service', 'Same-Day Service', 'Warranty Included'],
    icon: BatteryCharging,
    name: 'Samsung Battery Replacement',
    description: 'Replace degraded batteries on Galaxy S, A, and Note series phones to restore full-day performance.',
    price: 45,
    eta: '30–45 min',
    warranty: '12 months',
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 11,
    category: 'Samsung',
    tags: ['Charging Fix', 'Hardware Fix', 'Quick Service', 'Warranty Included'],
    icon: Usb,
    name: 'Samsung Charging Port Repair',
    description: 'Fix USB-C charging port damage, bent pins, and debris blockage on all Samsung Galaxy models.',
    price: 55,
    eta: '30–45 min',
    warranty: '12 months',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 12,
    category: 'Samsung',
    tags: ['Camera Repair', 'Same-Day Service', 'Warranty Included'],
    icon: Camera,
    name: 'Samsung Camera Repair',
    description: 'Fix cracked camera lenses, blurry shots, and autofocus failures on Galaxy S23, S24, and A-series devices.',
    price: 75,
    eta: '45–60 min',
    warranty: '12 months',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 13,
    category: 'Samsung',
    tags: ['Speaker Fix', 'Hardware Fix', 'Quick Service', 'Warranty Included'],
    icon: Speaker,
    name: 'Samsung Speaker Repair',
    description: 'Restore distorted, quiet, or completely silent speakers on Samsung Galaxy phones including foldables.',
    price: 50,
    eta: '30–45 min',
    warranty: '12 months',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 14,
    category: 'Samsung',
    tags: ['Hardware Fix', 'Warranty Included'],
    icon: Smartphone,
    name: 'Samsung Back Cover Replacement',
    description: 'Replace cracked or scratched back covers on Galaxy S and A series with OEM glass or polycarbonate panels.',
    price: 55,
    eta: '45–60 min',
    warranty: '12 months',
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=900&q=80',
  },
  // ── Google Pixel ──────────────────────────────────────────
  {
    id: 15,
    category: 'Google Pixel',
    tags: ['Screen Repair', 'Same-Day Service', 'Warranty Included'],
    icon: Wrench,
    name: 'Pixel Screen Replacement',
    description: 'Factory-grade OLED screen replacements for Google Pixel 6, 7, 8, and 9 series with full touch calibration.',
    price: 95,
    eta: '60–90 min',
    warranty: '12 months',
    image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 16,
    category: 'Google Pixel',
    tags: ['Battery Replacement', 'Quick Service', 'Same-Day Service', 'Warranty Included'],
    icon: BatteryCharging,
    name: 'Pixel Battery Replacement',
    description: 'Restore Pixel battery life with a certified replacement. Fix overheating, rapid drain, and unexpected shutdowns.',
    price: 59,
    eta: '45–60 min',
    warranty: '12 months',
    image: 'https://images.unsplash.com/photo-1621839673705-6617adf9e890?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 17,
    category: 'Google Pixel',
    tags: ['Charging Fix', 'Quick Service', 'Warranty Included'],
    icon: Zap,
    name: 'Pixel Charging Port Repair',
    description: 'Fix USB-C port faults on Pixel 6, 7, 8, and 9 — including slow charging, no charging, and loose connector issues.',
    price: 60,
    eta: '30–45 min',
    warranty: '12 months',
    image: 'https://images.unsplash.com/photo-1562408590-e32931084e23?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 18,
    category: 'Google Pixel',
    tags: ['Camera Repair', 'Warranty Included'],
    icon: Camera,
    name: 'Pixel Camera Repair',
    description: 'Restore full camera functionality on Pixel 6a, 7 Pro, 8 Pro — including Night Sight, astrophotography, and video stabilisation.',
    price: 85,
    eta: '45–60 min',
    warranty: '12 months',
    image: 'https://images.unsplash.com/photo-1587840171670-8b850147754e?auto=format&fit=crop&w=900&q=80',
  },
  // ── General ───────────────────────────────────────────────
  {
    id: 19,
    category: 'General',
    tags: ['Water Damage', 'Hardware Fix'],
    icon: Droplets,
    name: 'Water Damage Treatment',
    description: 'Emergency ultrasonic cleaning and corrosion removal for liquid-damaged phones. Best chance of recovery when treated early.',
    price: 70,
    eta: '1–2 hours',
    warranty: '90 days',
    image: 'https://images.unsplash.com/photo-1517241034903-9a4c3ab12f00?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 20,
    category: 'General',
    tags: ['Hardware Fix', 'Warranty Included'],
    icon: Wifi,
    name: 'Wi-Fi / Bluetooth Antenna Repair',
    description: 'Fix weak or absent Wi-Fi and Bluetooth signal caused by damaged antenna flex cables or logic board connections.',
    price: 65,
    eta: '45–60 min',
    warranty: '12 months',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 21,
    category: 'General',
    tags: ['Speaker Fix', 'Hardware Fix', 'Quick Service', 'Warranty Included'],
    icon: Mic2,
    name: 'Microphone Repair',
    description: 'Fix muffled calls, voice note issues, and voice assistant recognition failures caused by mic damage.',
    price: 50,
    eta: '30–45 min',
    warranty: '12 months',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 22,
    category: 'General',
    tags: ['Hardware Fix', 'Quick Service', 'Warranty Included'],
    icon: Wrench,
    name: 'Power / Volume Button Repair',
    description: 'Fix stuck, unresponsive, or physically broken power and volume buttons on any smartphone model.',
    price: 40,
    eta: '30–45 min',
    warranty: '12 months',
    image: 'https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 23,
    category: 'General',
    tags: ['Hardware Fix', 'Quick Service', 'Warranty Included'],
    icon: Layers,
    name: 'SIM / MicroSD Tray Repair',
    description: 'Replace bent, broken, or missing SIM card and microSD trays to restore reliable connectivity and storage.',
    price: 25,
    eta: '15–20 min',
    warranty: '6 months',
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 24,
    category: 'General',
    tags: ['Screen Repair', 'Quick Service', 'Warranty Included'],
    icon: Layers,
    name: 'Screen Protector Installation',
    description: 'Professional dust-free fitting of tempered glass or privacy screen protectors for all major phone models.',
    price: 12,
    eta: '10–15 min',
    warranty: '3 months',
    image: 'https://images.unsplash.com/photo-1601972599720-36938d4ecd31?auto=format&fit=crop&w=900&q=80',
  },
]

/** Maps catalog category → book page “Phone brand” select value */
function mapCategoryToBookingBrand(category: string) {
  if (category === 'iPhone' || category === 'Samsung' || category === 'Google Pixel') return category
  return 'Other / Mixed'
}

/** Maps catalog service title → book page “Service needed” select value */
function mapServiceNameToBookingService(name: string): string {
  const n = name.toLowerCase()
  if (n.includes('water damage')) return 'Water Damage Treatment'
  if (n.includes('screen protector')) return 'Other'
  if (n.includes('screen') && n.includes('replacement')) return 'Screen Replacement'
  if (n.includes('battery')) return 'Battery Replacement'
  if (n.includes('charging port') || n.includes('charging port fix')) return 'Charging Port Repair'
  if (n.includes('camera')) return 'Camera Repair'
  if (n.includes('microphone')) return 'Speaker / Microphone Repair'
  if (n.includes('speaker') || n.includes('earpiece')) return 'Speaker / Microphone Repair'
  if (n.includes('wi-fi') || n.includes('bluetooth')) return 'Wi-Fi / Bluetooth Repair'
  if (n.includes('back glass') || n.includes('back cover')) return 'Back Glass / Housing'
  if (n.includes('face id') || n.includes('touch id')) return 'Other'
  if (n.includes('power') && n.includes('volume')) return 'Other'
  if (n.includes('sim') || n.includes('microsd')) return 'Other'
  return 'Diagnostic / Not Sure'
}

function bookingQueryForService(service: (typeof services)[number]) {
  return {
    brand: mapCategoryToBookingBrand(service.category),
    service: mapServiceNameToBookingService(service.name),
    detail: service.name,
  }
}

// ── Pagination ─────────────────────────────────────────────
const PAGE_SIZE = 9
const currentPage = ref(1)

const filteredServices = computed(() => {
  let result = activeCategory.value === 'All Categories'
    ? [...services]
    : services.filter((s) => s.category === activeCategory.value)

  if (activeTag.value) {
    const tag = activeTag.value
    result = result.filter((s) => s.tags.includes(tag))
  }

  if (activeSort.value === 'low') {
    result = result.sort((a, b) => a.price - b.price)
  } else if (activeSort.value === 'high') {
    result = result.sort((a, b) => b.price - a.price)
  }

  return result
})

const totalPages = computed(() => Math.ceil(filteredServices.value.length / PAGE_SIZE))

const paginatedServices = computed(() => {
  const start = (currentPage.value - 1) * PAGE_SIZE
  return filteredServices.value.slice(start, start + PAGE_SIZE)
})

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

function goToPage(p: number) {
  if (p < 1 || p > totalPages.value) return
  currentPage.value = p
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// Reset to page 1 whenever filters change
watch([activeCategory, activeSort, activeTag], () => { currentPage.value = 1 })

function formatPrice(p: number) {
  return `$${p.toFixed(0)}`
}

const mobileFiltersOpen = ref(false)

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
  if (import.meta.client) {
    document.documentElement.style.overflow = ''
    window.removeEventListener('keydown', onFiltersEscape)
  }
})

function toggleTag(tag: string) {
  activeTag.value = activeTag.value === tag ? null : tag
}

const activeFilterCount = computed(() => {
  let n = 0
  if (activeCategory.value !== 'All Categories') n++
  if (activeSort.value !== 'latest') n++
  if (activeTag.value) n++
  return n
})

function clearAllFilters() {
  activeCategory.value = 'All Categories'
  activeSort.value = 'latest'
  activeTag.value = null
}

function closeMobileFilters() {
  mobileFiltersOpen.value = false
}
</script>

<template>
  <div>
    <!-- Page header -->
    <section class="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 px-4 py-14 text-white sm:px-6 lg:px-8">
      <div class="mx-auto max-w-7xl text-center">
        <p class="inline-flex items-center gap-2 rounded-full border border-rose-300/30 bg-rose-500/15 px-3 py-1 text-xs font-semibold tracking-wide text-rose-200">
          <Wrench class="h-3.5 w-3.5" /> Our Services
        </p>
        <h1 class="mt-4 text-3xl font-extrabold sm:text-4xl">Expert Phone Repair Services</h1>
        <p class="mx-auto mt-3 max-w-2xl text-sm text-slate-300 sm:text-base">
          From cracked screens to battery swaps and water damage treatment — all repairs backed by certified technicians and a 12-month warranty.
        </p>
        <div class="mt-6 flex flex-wrap justify-center gap-3">
          <NuxtLink
            to="/book"
            class="inline-flex items-center justify-center rounded-full bg-rose-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-rose-500"
          >
            Book a Repair
          </NuxtLink>
          <a
            href="tel:+15551234567"
            class="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Call Us Now
          </a>
        </div>
      </div>
    </section>

    <!-- ── Mobile: category strip + filter sheet trigger (hidden lg+) ── -->
    <div
      class="sticky top-14 z-30 border-b border-slate-200/90 bg-white/95 shadow-sm backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/95 lg:hidden"
    >
      <div class="flex items-stretch gap-2 px-3 py-2.5 sm:px-4">
        <div class="relative min-w-0 flex-1">
          <div
            class="pointer-events-none absolute inset-y-0 left-0 z-10 w-5 bg-gradient-to-r from-white to-transparent dark:from-slate-950"
            aria-hidden="true"
          />
          <div
            class="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-white to-transparent dark:from-slate-950"
            aria-hidden="true"
          />
          <div
            class="-mx-1 flex snap-x snap-mandatory gap-2 overflow-x-auto scroll-pl-3 scroll-pr-3 px-1 py-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <button
              v-for="cat in categories"
              :key="cat"
              type="button"
              class="snap-start scroll-ml-0 whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-semibold transition active:scale-[0.98]"
              :class="
                activeCategory === cat
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-600/25'
                  : 'bg-slate-100 text-slate-800 ring-1 ring-slate-200/80 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-700'
              "
              @click="activeCategory = cat"
            >
              {{ cat === 'All Categories' ? 'All' : cat }}
            </button>
          </div>
        </div>
        <button
          type="button"
          class="relative inline-flex min-h-[44px] min-w-[44px] shrink-0 flex-col items-center justify-center gap-0.5 rounded-2xl border px-3 text-[11px] font-bold uppercase tracking-wide transition active:scale-[0.98]"
          :class="
            mobileFiltersOpen || activeFilterCount > 0
              ? 'border-rose-500 bg-rose-50 text-rose-700 dark:border-rose-500 dark:bg-rose-950/50 dark:text-rose-300'
              : 'border-slate-200 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300'
          "
          aria-haspopup="dialog"
          :aria-expanded="mobileFiltersOpen"
          @click="mobileFiltersOpen = true"
        >
          <SlidersHorizontal class="h-5 w-5" aria-hidden="true" />
          <span class="leading-none">More</span>
          <span
            v-if="activeFilterCount > 0"
            class="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-600 px-1 text-[10px] font-bold text-white shadow-sm"
          >{{ activeFilterCount }}</span>
        </button>
      </div>
    </div>

    <!-- ── Mobile filter bottom sheet (sort + tags) ─────────────────── -->
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
          class="absolute inset-x-0 bottom-0 flex max-h-[min(88dvh,640px)] flex-col rounded-t-[1.25rem] bg-white shadow-[0_-8px_40px_rgba(0,0,0,0.12)] ring-1 ring-slate-200/80 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] dark:bg-slate-900 dark:ring-slate-700"
          :class="mobileFiltersOpen ? 'translate-y-0' : 'translate-y-full'"
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-filters-title"
        >
          <div class="flex shrink-0 flex-col items-center pt-2 pb-1">
            <div class="h-1 w-12 rounded-full bg-slate-300 dark:bg-slate-600" aria-hidden="true" />
          </div>
          <div class="flex shrink-0 items-center justify-between gap-3 border-b border-slate-100 px-4 pb-3 pt-1 dark:border-slate-800">
            <div>
              <h2 id="mobile-filters-title" class="text-lg font-bold text-slate-900 dark:text-white">
                Sort &amp; refine
              </h2>
              <p class="text-xs text-slate-500 dark:text-slate-400">
                {{ filteredServices.length }} service{{ filteredServices.length !== 1 ? 's' : '' }} match
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
            <p class="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">Phone brand</p>
            <p class="mb-3 text-xs text-slate-500 dark:text-slate-400">Choose a brand or show all services.</p>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="cat in categories"
                :key="cat"
                type="button"
                class="rounded-full border px-3.5 py-2.5 text-sm font-semibold transition active:scale-[0.98]"
                :class="
                  activeCategory === cat
                    ? 'border-rose-500 bg-rose-600 text-white shadow-md shadow-rose-600/20'
                    : 'border-slate-200 bg-white text-slate-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200'
                "
                @click="activeCategory = cat"
              >
                {{ cat === 'All Categories' ? 'All brands' : cat }}
              </button>
            </div>

            <p class="mb-2 mt-6 text-xs font-bold uppercase tracking-wider text-slate-400">Sort by price</p>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="opt in sortOptions"
                :key="opt.value"
                type="button"
                class="rounded-full border px-3.5 py-2.5 text-sm font-semibold transition active:scale-[0.98]"
                :class="
                  activeSort === opt.value
                    ? 'border-rose-500 bg-rose-600 text-white shadow-md shadow-rose-600/20'
                    : 'border-slate-200 bg-white text-slate-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200'
                "
                @click="activeSort = opt.value"
              >
                {{ opt.label }}
              </button>
            </div>

            <p class="mb-2 mt-6 text-xs font-bold uppercase tracking-wider text-slate-400">Popular tags</p>
            <p class="mb-3 text-xs text-slate-500 dark:text-slate-400">Tap one tag to narrow results. Tap again to clear.</p>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="tag in popularTags"
                :key="tag"
                type="button"
                class="rounded-full border px-3.5 py-2 text-sm font-medium transition active:scale-[0.98]"
                :class="
                  activeTag === tag
                    ? 'border-rose-500 bg-rose-600 text-white shadow-md shadow-rose-600/20'
                    : 'border-slate-200 bg-white text-slate-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200'
                "
                @click="toggleTag(tag)"
              >
                {{ tag }}
              </button>
            </div>
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
                @click="clearAllFilters"
              >
                Reset
              </button>
              <button
                type="button"
                class="flex min-h-12 min-w-0 items-center justify-center rounded-xl bg-rose-600 text-sm font-bold text-white shadow-lg shadow-rose-600/25 transition hover:bg-rose-500 active:scale-[0.99]"
                :class="activeFilterCount > 0 ? 'flex-[2]' : 'w-full flex-1'"
                @click="closeMobileFilters"
              >
                Show {{ filteredServices.length }} result{{ filteredServices.length !== 1 ? 's' : '' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Sidebar + Grid layout -->
    <section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div class="flex flex-col gap-8 lg:flex-row lg:items-start">

        <!-- ── Sidebar (desktop only) ────────────────────────── -->
        <aside class="hidden w-72 shrink-0 space-y-6 lg:sticky lg:top-24 lg:block">

          <!-- Categories -->
          <div class="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <h3 class="mb-4 text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">Categories</h3>
            <ul class="space-y-1">
              <li v-for="cat in categories" :key="cat">
                <button
                  type="button"
                  class="w-full rounded-xl px-4 py-2.5 text-left text-sm font-medium transition"
                  :class="
                    activeCategory === cat
                      ? 'bg-rose-600 text-white font-semibold'
                      : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                  "
                  @click="activeCategory = cat"
                >
                  {{ cat }}
                </button>
              </li>
            </ul>
          </div>

          <!-- Sort By -->
          <div class="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <h3 class="mb-4 text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">Sort By</h3>
            <ul class="space-y-1">
              <li v-for="opt in sortOptions" :key="opt.value">
                <button
                  type="button"
                  class="w-full rounded-xl px-4 py-2.5 text-left text-sm font-medium transition"
                  :class="
                    activeSort === opt.value
                      ? 'bg-rose-600 text-white font-semibold'
                      : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                  "
                  @click="activeSort = opt.value"
                >
                  {{ opt.label }}
                </button>
              </li>
            </ul>
          </div>

          <!-- Popular Tags -->
          <div class="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <h3 class="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              <Tag class="h-3.5 w-3.5 text-rose-500" /> Popular Tags
            </h3>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="tag in popularTags"
                :key="tag"
                type="button"
                class="rounded-full px-3 py-1.5 text-xs font-semibold transition"
                :class="
                  activeTag === tag
                    ? 'bg-rose-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-rose-100 hover:text-rose-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-rose-900/40 dark:hover:text-rose-300'
                "
                @click="toggleTag(tag)"
              >
                {{ tag }}
              </button>
            </div>
            <button
              v-if="activeTag"
              type="button"
              class="mt-3 text-xs font-semibold text-rose-600 hover:underline dark:text-rose-400"
              @click="activeTag = null"
            >
              Clear tag filter
            </button>
          </div>
        </aside>

        <!-- ── Services Grid ──────────────────────────────────── -->
        <div class="min-w-0 flex-1">
          <div class="mb-5 flex items-center justify-between">
            <p class="text-sm text-slate-500 dark:text-slate-400">
              Showing
              <span class="font-semibold text-slate-900 dark:text-white">
                {{ (currentPage - 1) * PAGE_SIZE + 1 }}–{{ Math.min(currentPage * PAGE_SIZE, filteredServices.length) }}
              </span>
              of
              <span class="font-semibold text-slate-900 dark:text-white">{{ filteredServices.length }}</span>
              service{{ filteredServices.length !== 1 ? 's' : '' }}
            </p>
            <button
              v-if="activeFilterCount > 0"
              type="button"
              class="hidden items-center gap-1 text-xs font-semibold text-rose-600 dark:text-rose-400 lg:inline-flex"
              @click="clearAllFilters"
            >
              <X class="h-3 w-3" /> Clear filters
            </button>
          </div>

          <div class="grid grid-cols-2 gap-3 sm:gap-5 xl:grid-cols-3 xl:gap-6">
            <article
              v-for="service in paginatedServices"
              :key="service.id"
              class="group relative flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 xl:rounded-2xl"
            >
              <button
                type="button"
                class="absolute inset-0 z-10 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500/40 xl:rounded-2xl"
                :aria-label="`Preview ${service.name}`"
                @click="openServicePreview(service)"
              />

              <!-- Image with overlaid category badge -->
              <div class="relative overflow-hidden">
                <img
                  :src="service.image"
                  :alt="service.name"
                  class="h-32 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-40 xl:h-52"
                >
                <span class="absolute left-1.5 top-1.5 max-w-[calc(100%-0.75rem)] truncate rounded-full bg-white/90 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-rose-600 shadow backdrop-blur-sm dark:bg-slate-900/90 dark:text-rose-400 xl:left-3 xl:top-3 xl:max-w-none xl:px-2.5 xl:py-1 xl:text-[11px]">
                  {{ service.category }}
                </span>
              </div>

              <!-- Card body -->
              <div class="flex flex-1 flex-col p-2.5 sm:p-3 xl:p-5">
                <h3 class="line-clamp-2 text-xs font-bold leading-snug text-slate-900 dark:text-white sm:text-sm xl:text-base">
                  {{ service.name }}
                </h3>
                <p class="mt-1 line-clamp-2 text-[10px] text-slate-500 dark:text-slate-400 sm:text-xs xl:mt-1.5 xl:text-sm">
                  {{ service.description }}
                </p>

                <!-- Badges -->
                <div class="mt-2 flex flex-wrap gap-1 xl:mt-3 xl:gap-1.5">
                  <span class="inline-flex items-center gap-0.5 rounded-full bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300 xl:gap-1 xl:px-2.5 xl:py-1 xl:text-xs">
                    <Clock3 class="h-2.5 w-2.5 shrink-0 xl:h-3 xl:w-3" /> {{ service.eta }}
                  </span>
                  <span class="inline-flex items-center gap-0.5 rounded-full bg-emerald-50 px-1.5 py-0.5 text-[10px] font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 xl:gap-1 xl:px-2.5 xl:py-1 xl:text-xs">
                    <ShieldCheck class="h-2.5 w-2.5 shrink-0 xl:h-3 xl:w-3" /> {{ service.warranty }}
                  </span>
                </div>

                <!-- Price + CTA -->
                <div class="mt-auto flex flex-col gap-2 border-t border-slate-100 pt-2.5 dark:border-slate-800 xl:mt-4 xl:flex-row xl:items-center xl:justify-between xl:pt-3.5">
                  <p class="text-[11px] font-bold leading-tight text-slate-900 dark:text-white xl:text-sm">
                    <span class="xl:hidden">From </span>
                    <span class="hidden xl:inline">Starting at </span>
                    <span class="text-rose-600">{{ formatPrice(service.price) }}</span>
                  </p>
                  <NuxtLink
                    :to="{ path: '/book', query: bookingQueryForService(service) }"
                    class="relative z-20 inline-flex w-full items-center justify-center gap-1 rounded-full bg-rose-600 px-2 py-1.5 text-[10px] font-bold text-white transition hover:bg-rose-500 active:scale-95 sm:w-auto sm:gap-1.5 sm:text-xs xl:shrink-0 xl:px-3.5"
                  >
                    <BadgeCheck class="h-3 w-3 shrink-0 xl:h-3.5 xl:w-3.5" />
                    <span>Book</span><span class="hidden sm:inline"> Now</span>
                  </NuxtLink>
                </div>
              </div>
            </article>
          </div>

          <!-- Empty state -->
          <div v-if="filteredServices.length === 0" class="py-20 text-center text-slate-400">
            No services found for the selected filters.
          </div>

          <!-- ── Pagination ──────────────────────────────────── -->
          <div v-if="totalPages > 1" class="mt-10 flex items-center justify-center gap-1.5">
            <!-- Prev -->
            <button
              type="button"
              :disabled="currentPage === 1"
              class="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-rose-500 hover:text-rose-600 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
              @click="goToPage(currentPage - 1)"
            >
              <ChevronLeft class="h-4 w-4" />
            </button>

            <!-- Page numbers -->
            <template v-for="(p, i) in pageNumbers" :key="i">
              <span v-if="p === '…'" class="px-1 text-sm text-slate-400">…</span>
              <button
                v-else
                type="button"
                class="inline-flex h-9 min-w-[2.25rem] items-center justify-center rounded-full border text-sm font-semibold transition"
                :class="
                  currentPage === p
                    ? 'border-rose-600 bg-rose-600 text-white'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-rose-400 hover:text-rose-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300'
                "
                @click="goToPage(p as number)"
              >
                {{ p }}
              </button>
            </template>

            <!-- Next -->
            <button
              type="button"
              :disabled="currentPage === totalPages"
              class="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-rose-500 hover:text-rose-600 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
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
      :title="previewService?.name ?? ''"
      :subtitle="previewService ? `${previewService.category} · Service` : undefined"
      :image="previewService?.image"
      :price-text="previewService ? `Starting at ${formatPrice(previewService.price)}` : undefined"
      :badges="servicePreviewBadges"
      :description="previewService?.description"
      :bullets="previewService?.tags"
      :specs="
        previewService
          ? {
              'Estimated time': previewService.eta,
              Warranty: previewService.warranty,
            }
          : undefined
      "
      :primary-cta="
        previewService
          ? {
              label: 'Book now',
              to: { path: '/book', query: bookingQueryForService(previewService as any) },
            }
          : undefined
      "
      @close="closeServicePreview"
    />
  </div>
</template>
