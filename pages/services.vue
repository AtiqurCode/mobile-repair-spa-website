<script setup lang="ts">
import {
  BadgeCheck,
  BatteryCharging,
  Camera,
  CheckCircle2,
  Clock3,
  Droplets,
  Mic2,
  ShieldCheck,
  SlidersHorizontal,
  Speaker,
  Tag,
  Usb,
  Wifi,
  Wrench,
  X,
  Zap
} from 'lucide-vue-next'

useHead({ title: 'Services — RapidFix Phone Repair' })

const appointmentUrl = 'https://samiul.crm.prosaas.org/public/lead'

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

const services = [
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
    id: 7,
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
    id: 8,
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
    id: 9,
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
    id: 10,
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
    id: 11,
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
    id: 12,
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
    id: 13,
    category: 'General',
    tags: ['Speaker Fix', 'Hardware Fix', 'Quick Service', 'Warranty Included'],
    icon: Mic2,
    name: 'Microphone Repair',
    description: 'Fix muffled calls, voice note issues, and Siri/Google Assistant recognition failures caused by mic damage.',
    price: 50,
    eta: '30–45 min',
    warranty: '12 months',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=900&q=80',
  },
]

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

function formatPrice(p: number) {
  return `$${p.toFixed(0)}`
}

const mobileFiltersOpen = ref(false)

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
          <a
            :href="appointmentUrl"
            class="inline-flex items-center justify-center rounded-full bg-rose-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-rose-500"
          >
            Book a Repair
          </a>
          <a
            href="tel:+15551234567"
            class="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Call Us Now
          </a>
        </div>
      </div>
    </section>

    <!-- ── Mobile filter bar (hidden on lg+) ─────────────────── -->
    <div class="sticky top-14 z-30 border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 lg:hidden">
      <!-- Category scroll row + filter toggle -->
      <div class="flex items-center gap-2 px-4 py-2.5">
        <div class="flex min-w-0 flex-1 gap-1.5 overflow-x-auto pb-0.5" style="-ms-overflow-style:none;scrollbar-width:none" @scroll.passive>
          <button
            v-for="cat in categories"
            :key="cat"
            type="button"
            class="shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition"
            :class="
              activeCategory === cat
                ? 'bg-rose-600 text-white'
                : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
            "
            @click="activeCategory = cat"
          >
            {{ cat === 'All Categories' ? 'All' : cat }}
          </button>
        </div>
        <button
          type="button"
          class="relative ml-1 inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition"
          :class="
            mobileFiltersOpen || activeFilterCount > 0
              ? 'border-rose-500 bg-rose-50 text-rose-600 dark:border-rose-500 dark:bg-rose-900/20 dark:text-rose-400'
              : 'border-slate-300 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300'
          "
          @click="mobileFiltersOpen = !mobileFiltersOpen"
        >
          <SlidersHorizontal class="h-3.5 w-3.5" />
          Filters
          <span
            v-if="activeFilterCount > 0"
            class="absolute -right-1 -top-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-rose-600 text-[10px] font-bold text-white"
          >{{ activeFilterCount }}</span>
        </button>
      </div>

      <!-- Expandable sort + tags panel -->
      <div v-if="mobileFiltersOpen" class="border-t border-slate-100 px-4 py-3 dark:border-slate-800">
        <!-- Sort row -->
        <div class="mb-3">
          <p class="mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">Sort By</p>
          <div class="flex gap-1.5">
            <button
              v-for="opt in sortOptions"
              :key="opt.value"
              type="button"
              class="rounded-full px-3 py-1.5 text-xs font-semibold transition"
              :class="
                activeSort === opt.value
                  ? 'bg-rose-600 text-white'
                  : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
              "
              @click="activeSort = opt.value"
            >
              {{ opt.label }}
            </button>
          </div>
        </div>

        <!-- Tags row -->
        <div>
          <p class="mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">Popular Tags</p>
          <div class="flex flex-wrap gap-1.5">
            <button
              v-for="tag in popularTags"
              :key="tag"
              type="button"
              class="rounded-full px-3 py-1.5 text-xs font-semibold transition"
              :class="
                activeTag === tag
                  ? 'bg-rose-600 text-white'
                  : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
              "
              @click="toggleTag(tag)"
            >
              {{ tag }}
            </button>
          </div>
        </div>

        <!-- Clear all -->
        <div v-if="activeFilterCount > 0" class="mt-3 flex justify-end">
          <button
            type="button"
            class="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 dark:text-rose-400"
            @click="clearAllFilters(); mobileFiltersOpen = false"
          >
            <X class="h-3 w-3" /> Clear all filters
          </button>
        </div>
      </div>
    </div>

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
              Showing <span class="font-semibold text-slate-900 dark:text-white">{{ filteredServices.length }}</span> service{{ filteredServices.length !== 1 ? 's' : '' }}
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

          <div class="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            <article
              v-for="service in filteredServices"
              :key="service.id"
              class="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
            >
              <!-- Image with overlaid category badge -->
              <div class="relative overflow-hidden">
                <img
                  :src="service.image"
                  :alt="service.name"
                  class="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
                >
                <span class="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-rose-600 shadow backdrop-blur-sm dark:bg-slate-900/90 dark:text-rose-400">
                  {{ service.category }}
                </span>
              </div>

              <!-- Card body -->
              <div class="flex flex-1 flex-col p-5">
                <h3 class="font-bold text-slate-900 dark:text-white">{{ service.name }}</h3>
                <p class="mt-1.5 line-clamp-2 text-sm text-slate-500 dark:text-slate-400">{{ service.description }}</p>

                <!-- Badges -->
                <div class="mt-3 flex flex-wrap gap-1.5">
                  <span class="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                    <Clock3 class="h-3 w-3 shrink-0" /> {{ service.eta }}
                  </span>
                  <span class="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                    <ShieldCheck class="h-3 w-3 shrink-0" /> {{ service.warranty }} warranty
                  </span>
                </div>

                <!-- Price + CTA -->
                <div class="mt-4 flex items-center justify-between border-t border-slate-100 pt-3.5 dark:border-slate-800">
                  <p class="text-sm font-bold text-slate-900 dark:text-white">
                    Starting at <span class="text-rose-600">{{ formatPrice(service.price) }}</span>
                  </p>
                  <a
                    :href="appointmentUrl"
                    class="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-rose-600 px-3.5 py-1.5 text-xs font-bold text-white transition hover:bg-rose-500 active:scale-95"
                  >
                    <BadgeCheck class="h-3.5 w-3.5" /> Book Now
                  </a>
                </div>
              </div>
            </article>
          </div>

          <!-- Empty state -->
          <div v-if="filteredServices.length === 0" class="py-20 text-center text-slate-400">
            No services found for the selected filters.
          </div>
        </div>
      </div>
    </section>

    <!-- CTA banner -->
    <section class="bg-slate-900 px-4 py-12 text-white sm:px-6 lg:px-8">
      <div class="mx-auto max-w-3xl text-center">
        <CheckCircle2 class="mx-auto h-10 w-10 text-emerald-400" />
        <h2 class="mt-4 text-2xl font-bold">Not Sure Which Service You Need?</h2>
        <p class="mt-2 text-sm text-slate-300">
          Book a free diagnosis visit. Our technicians will assess your device and recommend the right repair with no obligation.
        </p>
        <div class="mt-6 flex flex-wrap justify-center gap-3">
          <a
            :href="appointmentUrl"
            class="inline-flex items-center justify-center rounded-full bg-rose-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-rose-500"
          >
            Book Free Diagnosis
          </a>
          <NuxtLink
            to="/contact"
            class="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Contact Us
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
