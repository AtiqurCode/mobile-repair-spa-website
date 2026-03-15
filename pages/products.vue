<script setup lang="ts">
import {
  BadgeCheck,
  ChevronDown,
  ChevronRight,
  Package,
  Search,
  ShieldCheck,
  Star,
  Tag,
  Truck,
  X,
} from 'lucide-vue-next'
import {
  brandLabels,
  categories,
  formatCurrencyProduct,
  products,
  type Product,
  type ProductBrand,
} from '~/composables/useProducts'

useHead({ title: 'Parts & Products — RapidFix' })

const searchQuery = ref('')
const selectedBrand = ref<ProductBrand>('all')
const selectedCategory = ref('All')
const selectedProduct = ref<Product | null>(null)

const brands = Object.keys(brandLabels) as ProductBrand[]

const filtered = computed(() => {
  return products.filter((p) => {
    const matchBrand = selectedBrand.value === 'all' || p.brand === selectedBrand.value
    const matchCategory = selectedCategory.value === 'All' || p.category === selectedCategory.value
    const q = searchQuery.value.toLowerCase().trim()
    const matchSearch =
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.compatibleWith.some((m) => m.toLowerCase().includes(q))
    return matchBrand && matchCategory && matchSearch
  })
})

const PAGE_SIZE = 8
const currentPage = ref(1)

watch([searchQuery, selectedBrand, selectedCategory], () => {
  currentPage.value = 1
})

const totalPages = computed(() => Math.ceil(filtered.value.length / PAGE_SIZE))
const paginated = computed(() =>
  filtered.value.slice((currentPage.value - 1) * PAGE_SIZE, currentPage.value * PAGE_SIZE),
)

const openModal = (product: Product) => {
  selectedProduct.value = product
}
const closeModal = () => {
  selectedProduct.value = null
}

const badgeClasses: Record<string, string> = {
  rose: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
  emerald: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  sky: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300',
  amber: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  violet: 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300',
}
</script>

<template>
  <div>
    <!-- ── Page Hero ─────────────────────────────────────────── -->
    <section class="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 py-10 text-white sm:px-6 lg:px-8">
      <div class="absolute -left-16 top-10 h-48 w-48 rounded-full bg-rose-500/20 blur-3xl" />
      <div class="absolute -right-16 bottom-6 h-56 w-56 rounded-full bg-sky-500/15 blur-3xl" />
      <div class="relative mx-auto max-w-6xl">
        <p class="mb-3 inline-flex items-center gap-2 rounded-full border border-rose-300/30 bg-rose-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-rose-200">
          <Package class="h-3.5 w-3.5" />
          Genuine Parts &amp; Accessories
        </p>
        <h1 class="text-2xl font-extrabold sm:text-3xl">Phone Parts &amp; Accessories</h1>
        <p class="mt-2 max-w-2xl text-sm text-slate-300">
          In-stock screens, batteries, protectors, and cases with warranty-backed quality.
        </p>
      </div>
    </section>

    <!-- ── Filters Bar ────────────────────────────────────────── -->
    <section class="sticky top-[57px] z-30 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95 sm:px-6 lg:px-8">
      <div class="mx-auto flex max-w-6xl flex-wrap items-center gap-3">
        <!-- Search -->
        <div class="relative flex-1 min-w-[180px] max-w-xs">
          <Search class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search parts, model..."
            class="w-full rounded-full border border-slate-300 bg-white py-2 pl-9 pr-4 text-sm text-slate-900 outline-none ring-rose-300 focus:ring-2 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder-slate-500"
          >
        </div>

        <!-- Brand tabs -->
        <!-- Brand select -->
        <div class="relative">
          <select
            v-model="selectedBrand"
            class="appearance-none rounded-full border border-slate-300 bg-white py-2 pl-4 pr-9 text-sm font-semibold text-slate-900 outline-none ring-rose-300 focus:ring-2 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          >
            <option v-for="brand in brands" :key="brand" :value="brand">{{ brandLabels[brand] }}</option>
          </select>
          <ChevronDown class="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        </div>

        <!-- Category pills -->
        <!-- Category select -->
        <div class="relative">
          <select
            v-model="selectedCategory"
            class="appearance-none rounded-full border border-slate-300 bg-white py-2 pl-4 pr-9 text-sm font-semibold text-slate-900 outline-none ring-rose-300 focus:ring-2 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          >
            <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
          </select>
          <ChevronDown class="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        </div>

        <!-- Result count -->
        <p class="ml-auto text-xs text-slate-500 dark:text-slate-400">
          Showing {{ paginated.length }} of {{ filtered.length }} product{{ filtered.length !== 1 ? 's' : '' }}
        </p>
      </div>
    </section>

    <!-- ── Product Grid ───────────────────────────────────────── -->
    <section class="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div v-if="filtered.length" class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <article
          v-for="product in paginated"
          :key="product.id"
          class="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
          @click="openModal(product)"
        >
          <!-- Image -->
          <div class="relative h-44 overflow-hidden bg-slate-100 dark:bg-slate-800">
            <img
              :src="product.image"
              :alt="product.name"
              class="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            >
            <!-- Badge -->
            <span
              v-if="product.badge"
              class="absolute left-2.5 top-2.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide"
              :class="badgeClasses[product.badgeColor ?? 'rose']"
            >
              {{ product.badge }}
            </span>
            <!-- Out of stock overlay -->
            <div
              v-if="!product.inStock"
              class="absolute inset-0 flex items-center justify-center bg-slate-900/50"
            >
              <span class="rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-100">Out of Stock</span>
            </div>
          </div>

          <!-- Body -->
          <div class="flex flex-1 flex-col p-4">
            <p class="text-[10px] font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
              {{ brandLabels[product.brand] }} · {{ product.category }}
            </p>
            <h2 class="mt-1 text-sm font-semibold leading-snug text-slate-900 dark:text-white">
              {{ product.name }}
            </h2>

            <!-- Compatible with chips -->
            <div class="mt-3 flex flex-wrap gap-1">
              <span
                v-for="model in product.compatibleWith.slice(0, 2)"
                :key="model"
                class="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] text-slate-600 dark:bg-slate-800 dark:text-slate-300"
              >{{ model }}</span>
              <span
                v-if="product.compatibleWith.length > 2"
                class="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] text-slate-600 dark:bg-slate-800 dark:text-slate-300"
              >+{{ product.compatibleWith.length - 2 }} more</span>
            </div>

            <!-- Price row -->
            <div class="mt-auto pt-4 flex items-center justify-between">
              <div class="flex items-baseline gap-1.5">
                <span class="text-base font-extrabold text-rose-600">{{ formatCurrencyProduct(product.price) }}</span>
                <span v-if="product.originalPrice" class="text-xs text-slate-400 line-through">{{ formatCurrencyProduct(product.originalPrice) }}</span>
              </div>
              <p class="text-xs text-slate-500 dark:text-slate-400">
                <span v-if="product.inStock" class="text-emerald-600 font-semibold dark:text-emerald-400">{{ product.stockCount }} left</span>
                <span v-else class="text-slate-400">Unavailable</span>
              </p>
            </div>

            <!-- See Details -->
            <button
              type="button"
              class="mt-3 flex w-full items-center justify-center gap-1 rounded-xl bg-slate-100 py-2 text-xs font-semibold text-slate-700 transition hover:bg-rose-50 hover:text-rose-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-rose-900/30 dark:hover:text-rose-300"
            >
              See Full Details <ChevronRight class="h-3.5 w-3.5" />
            </button>
          </div>
        </article>
      </div>

      <!-- Empty state -->
      <div v-else class="flex flex-col items-center justify-center py-24 text-center">
        <Search class="mx-auto h-12 w-12 text-slate-300 dark:text-slate-700" />
        <p class="mt-4 text-lg font-semibold text-slate-600 dark:text-slate-300">No products found</p>
        <p class="mt-1 text-sm text-slate-400">Try a different search term, brand, or category.</p>
        <button
          type="button"
          class="mt-5 rounded-full bg-rose-600 px-5 py-2 text-sm font-semibold text-white hover:bg-rose-500"
          @click="searchQuery = ''; selectedBrand = 'all'; selectedCategory = 'All'"
        >
          Clear Filters
        </button>
      </div>

      <!-- ── Pagination ──────────────────────────────────────── -->
      <div v-if="totalPages > 1" class="mt-10 flex items-center justify-center gap-2">
        <button
          type="button"
          :disabled="currentPage === 1"
          class="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          @click="currentPage--"
        >
          ← Prev
        </button>

        <button
          v-for="page in totalPages"
          :key="page"
          type="button"
          class="h-9 w-9 rounded-full border text-sm font-semibold transition"
          :class="currentPage === page
            ? 'border-rose-500 bg-rose-600 text-white dark:bg-rose-600'
            : 'border-slate-300 text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800'"
          @click="currentPage = page"
        >
          {{ page }}
        </button>

        <button
          type="button"
          :disabled="currentPage === totalPages"
          class="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          @click="currentPage++"
        >
          Next →
        </button>
      </div>
    </section>

    <!-- ── Product Detail Modal ──────────────────────────────── -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="selectedProduct"
          class="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center sm:p-4"
          @click.self="closeModal"
        >
          <Transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95"
            enter-to-class="translate-y-0 opacity-100 sm:scale-100"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <div
              v-if="selectedProduct"
              class="relative w-full max-h-[92vh] overflow-y-auto rounded-t-3xl bg-white shadow-2xl dark:bg-slate-900 sm:max-w-2xl sm:rounded-3xl"
            >
              <!-- Close btn -->
              <button
                type="button"
                class="absolute right-4 top-4 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                aria-label="Close"
                @click="closeModal"
              >
                <X class="h-4 w-4" />
              </button>

              <!-- Product image -->
              <div class="relative h-56 overflow-hidden rounded-t-3xl bg-slate-100 dark:bg-slate-800 sm:h-64">
                <img
                  :src="selectedProduct.image"
                  :alt="selectedProduct.name"
                  class="h-full w-full object-cover"
                >
                <span
                  v-if="selectedProduct.badge"
                  class="absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide shadow-md"
                  :class="badgeClasses[selectedProduct.badgeColor ?? 'rose']"
                >
                  {{ selectedProduct.badge }}
                </span>
                <div
                  v-if="!selectedProduct.inStock"
                  class="absolute inset-0 flex items-center justify-center bg-slate-900/50"
                >
                  <span class="rounded-full bg-slate-800 px-4 py-1.5 text-sm font-semibold text-slate-100">Out of Stock</span>
                </div>
              </div>

              <div class="p-5 sm:p-7">
                <!-- Title & price -->
                <p class="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
                  {{ brandLabels[selectedProduct.brand] }} · {{ selectedProduct.category }}
                </p>
                <h2 class="mt-1 text-xl font-bold text-slate-900 dark:text-white">{{ selectedProduct.name }}</h2>

                <div class="mt-3 flex flex-wrap items-center gap-3">
                  <span class="text-2xl font-extrabold text-rose-600">{{ formatCurrencyProduct(selectedProduct.price) }}</span>
                  <span v-if="selectedProduct.originalPrice" class="text-base text-slate-400 line-through">{{ formatCurrencyProduct(selectedProduct.originalPrice) }}</span>
                  <span
                    class="rounded-full px-2.5 py-0.5 text-xs font-semibold"
                    :class="selectedProduct.inStock ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300' : 'bg-slate-100 text-slate-500'"
                  >
                    {{ selectedProduct.inStock ? `${selectedProduct.stockCount} in stock` : 'Out of Stock' }}
                  </span>
                </div>

                <!-- Star display -->
                <div class="mt-2 flex items-center gap-1">
                  <Star v-for="i in 5" :key="i" class="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span class="ml-1 text-xs text-slate-500 dark:text-slate-400">Verified quality tested</span>
                </div>

                <!-- Description -->
                <p class="mt-4 text-sm text-slate-700 dark:text-slate-300">{{ selectedProduct.description }}</p>

                <!-- Compatible with -->
                <div class="mt-5">
                  <p class="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Compatible With</p>
                  <div class="mt-2 flex flex-wrap gap-1.5">
                    <span
                      v-for="model in selectedProduct.compatibleWith"
                      :key="model"
                      class="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200"
                    >{{ model }}</span>
                  </div>
                </div>

                <!-- Features -->
                <div class="mt-5">
                  <p class="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Key Features</p>
                  <ul class="mt-2 space-y-1.5">
                    <li
                      v-for="feature in selectedProduct.features"
                      :key="feature"
                      class="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-200"
                    >
                      <BadgeCheck class="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                      <span>{{ feature }}</span>
                    </li>
                  </ul>
                </div>

                <!-- Specs table -->
                <div class="mt-5">
                  <p class="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Specifications</p>
                  <div class="mt-2 divide-y divide-slate-100 rounded-xl border border-slate-200 dark:divide-slate-800 dark:border-slate-700">
                    <div
                      v-for="(val, key) in selectedProduct.specs"
                      :key="key"
                      class="flex items-center justify-between px-4 py-2.5 text-sm"
                    >
                      <span class="text-slate-500 dark:text-slate-400">{{ key }}</span>
                      <span class="font-semibold text-slate-900 dark:text-white">{{ val }}</span>
                    </div>
                  </div>
                </div>

                <!-- Trust badges -->
                <div class="mt-5 grid grid-cols-3 gap-2 text-center text-xs">
                  <div class="rounded-xl bg-emerald-50 p-2.5 dark:bg-emerald-950/30">
                    <ShieldCheck class="mx-auto h-5 w-5 text-emerald-600" />
                    <p class="mt-1 font-semibold text-slate-700 dark:text-slate-200">Warranty</p>
                    <p class="text-slate-500 dark:text-slate-400">{{ selectedProduct.specs.Warranty }}</p>
                  </div>
                  <div class="rounded-xl bg-sky-50 p-2.5 dark:bg-sky-950/30">
                    <Tag class="mx-auto h-5 w-5 text-sky-600" />
                    <p class="mt-1 font-semibold text-slate-700 dark:text-slate-200">Grade</p>
                    <p class="text-slate-500 dark:text-slate-400">OEM / Premium</p>
                  </div>
                  <div class="rounded-xl bg-amber-50 p-2.5 dark:bg-amber-950/30">
                    <Truck class="mx-auto h-5 w-5 text-amber-600" />
                    <p class="mt-1 font-semibold text-slate-700 dark:text-slate-200">Pickup</p>
                    <p class="text-slate-500 dark:text-slate-400">Same-Day</p>
                  </div>
                </div>

                <!-- CTA -->
                <div class="mt-6 flex gap-3">
                  <a
                    href="https://samiul.crm.prosaas.org/public/lead"
                    class="flex-1 rounded-full bg-rose-600 py-3 text-center text-sm font-semibold text-white transition hover:bg-rose-500"
                  >
                    Order &amp; Book Fitment
                  </a>
                  <button
                    type="button"
                    class="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                    @click="closeModal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
