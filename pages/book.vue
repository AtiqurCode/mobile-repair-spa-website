<script setup lang="ts">
import { CalendarCheck2, CheckCircle2, ClipboardCopy, Phone, Search, X } from 'lucide-vue-next'
import {
  accessories,
  accessoryFitsLabel,
  formatAccessoryPrice,
  type AccessoryBrand,
} from '~/composables/useAccessories'

useHead({ title: 'Book an Appointment — RapidFix Phone Repair' })

const config = useRuntimeConfig()
const contactEmail = config.public.contactEmail as string

const services = [
  'Screen Replacement',
  'Battery Replacement',
  'Charging Port Repair',
  'Camera Repair',
  'Water Damage Treatment',
  'Speaker / Microphone Repair',
  'Wi-Fi / Bluetooth Repair',
  'Back Glass / Housing',
  'Diagnostic / Not Sure',
  'Other',
]

const deviceBrands = ['iPhone', 'Samsung', 'Google Pixel', 'Other / Mixed', 'Not sure']

const timeSlots = [
  { value: 'morning', label: 'Morning (9AM – 12PM)' },
  { value: 'afternoon', label: 'Afternoon (12PM – 5PM)' },
  { value: 'evening', label: 'Evening (5PM – 9PM)' },
  { value: 'flexible', label: 'Any time / flexible' },
]

const route = useRoute()
const router = useRouter()

const selectedAccessoryUuids = ref<string[]>([])

const accessoryPickerOpen = ref(false)
const accessorySearch = ref('')
const accessoryBrandFilter = ref<'all' | AccessoryBrand>('all')
const accessoryCategoryFilter = ref<'all' | string>('all')

function closeAccessoryPicker() {
  accessoryPickerOpen.value = false
}

function onAccessoryPickerEscape(e: KeyboardEvent) {
  if (e.key === 'Escape') closeAccessoryPicker()
}

watch(accessoryPickerOpen, (open) => {
  if (!import.meta.client) return
  document.documentElement.style.overflow = open ? 'hidden' : ''
  if (open) window.addEventListener('keydown', onAccessoryPickerEscape)
  else window.removeEventListener('keydown', onAccessoryPickerEscape)
})

onUnmounted(() => {
  if (!import.meta.client) return
  document.documentElement.style.overflow = ''
  window.removeEventListener('keydown', onAccessoryPickerEscape)
})

const accessoryCategories = computed(() => {
  const s = new Set<string>()
  for (const a of accessories) s.add(a.category)
  return [...s].sort()
})

const brandThumb = computed<Record<string, string>>(() => {
  const out: Record<string, string> = {}
  for (const a of accessories) {
    if (!out[a.brand]) out[a.brand] = a.image
  }
  return out
})

const filteredAccessoryPickerList = computed(() => {
  const q = accessorySearch.value.toLowerCase().trim()
  return accessories.filter((a) => {
    if (accessoryBrandFilter.value !== 'all' && a.brand !== accessoryBrandFilter.value) return false
    if (accessoryCategoryFilter.value !== 'all' && a.category !== accessoryCategoryFilter.value) return false
    if (!q) return true
    return (
      a.name.toLowerCase().includes(q) ||
      a.brand.toLowerCase().includes(q) ||
      a.category.toLowerCase().includes(q) ||
      a.blurb.toLowerCase().includes(q)
    )
  })
})

function parseCsv(val: string): string[] {
  return [...new Set(val.split(',').map((s) => s.trim()).filter(Boolean))]
}

const selectedAccessories = computed(() => {
  const map = new Map(accessories.map((a) => [a.uuid, a] as const))
  return selectedAccessoryUuids.value
    .map((uuid) => map.get(uuid))
    .filter(Boolean) as (typeof accessories)[number][]
})

function syncAccQuery(next: string[]) {
  const uuids = [...new Set(next.map((s) => s.trim()).filter(Boolean))]
  selectedAccessoryUuids.value = uuids
  const query = { ...(route.query as Record<string, any>) }
  if (uuids.length) query.acc = uuids.join(',')
  else delete query.acc
  router.replace({ path: '/book', query })
}

type BookingForm = {
  name: string
  phone: string
  address: string
  deviceBrand: string
  deviceModel: string
  service: string
  preferredDate: string
  preferredTime: string
  notes: string
}

type BookingSnapshot = BookingForm & { reference: string; accessories: string[] }

const EMPTY_FORM: BookingForm = {
  name: '',
  phone: '',
  address: '',
  deviceBrand: '',
  deviceModel: '',
  service: '',
  preferredDate: '',
  preferredTime: '',
  notes: '',
}

const form = reactive<BookingForm>({ ...EMPTY_FORM })

const submitting = ref(false)
const errorMessage = ref('')
const submitted = ref(false)
const reference = ref('')

/** Snapshot kept after submit so the success state can display/copy full details */
const lastBooking = ref<BookingSnapshot | null>(null)

const minDate = computed(() => new Date().toISOString().slice(0, 10))

/** OpenStreetMap suggestions via Photon — https://photon.komoot.io/ */
const photonSuggestions = ref<{ label: string; address: string }[]>([])
const photonOpen = ref(false)
const photonLoading = ref(false)
const photonHighlight = ref(-1)
let photonDebounce: ReturnType<typeof setTimeout> | null = null
let photonBlurClose: ReturnType<typeof setTimeout> | null = null

async function fetchPhotonSuggestions() {
  const q = form.address.trim()
  if (q.length < 2) {
    photonSuggestions.value = []
    photonOpen.value = false
    return
  }
  photonLoading.value = true
  try {
    const res = await $fetch<{ suggestions: { label: string; address: string }[] }>('/api/photon-suggest', {
      query: { q, limit: 8 },
    })
    photonSuggestions.value = res.suggestions
    photonOpen.value = photonSuggestions.value.length > 0
    photonHighlight.value = -1
  } catch {
    photonSuggestions.value = []
    photonOpen.value = false
  } finally {
    photonLoading.value = false
  }
}

function onAddressSuggestInput() {
  if (photonDebounce) clearTimeout(photonDebounce)
  photonDebounce = setTimeout(() => {
    void fetchPhotonSuggestions()
  }, 280)
}

function pickPhotonSuggestion(s: { label: string; address: string }) {
  form.address = s.address
  photonOpen.value = false
  photonSuggestions.value = []
  photonHighlight.value = -1
}

function onAddressSuggestKeydown(e: KeyboardEvent) {
  if (!photonOpen.value || photonSuggestions.value.length === 0) return
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    photonHighlight.value = Math.min(photonHighlight.value + 1, photonSuggestions.value.length - 1)
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    photonHighlight.value = Math.max(photonHighlight.value - 1, -1)
  } else if (e.key === 'Enter' && photonHighlight.value >= 0) {
    e.preventDefault()
    const s = photonSuggestions.value[photonHighlight.value]
    if (s) pickPhotonSuggestion(s)
  } else if (e.key === 'Escape') {
    photonOpen.value = false
  }
}

function onAddressSuggestBlur() {
  photonBlurClose = setTimeout(() => {
    photonOpen.value = false
  }, 180)
}

function onAddressSuggestFocus() {
  if (photonBlurClose) {
    clearTimeout(photonBlurClose)
    photonBlurClose = null
  }
  if (form.address.trim().length >= 2 && photonSuggestions.value.length > 0) {
    photonOpen.value = true
  }
}

onUnmounted(() => {
  if (photonDebounce) clearTimeout(photonDebounce)
  if (photonBlurClose) clearTimeout(photonBlurClose)
})

function safeDecode(s: string) {
  try {
    return decodeURIComponent(s)
  } catch {
    return s
  }
}

function firstQueryString(val: unknown): string {
  if (typeof val === 'string') return val.trim()
  if (Array.isArray(val) && typeof val[0] === 'string') return val[0].trim()
  return ''
}

function applyBookingQuery() {
  if (submitted.value) return
  const q = route.query
  const brandRaw = firstQueryString(q.brand)
  const serviceRaw = firstQueryString(q.service)
  const detailRaw = safeDecode(firstQueryString(q.detail)).trim()
  const accRaw = safeDecode(firstQueryString(q.acc)).trim()

  if (brandRaw && deviceBrands.includes(brandRaw)) {
    form.deviceBrand = brandRaw
  }
  if (serviceRaw && services.includes(serviceRaw)) {
    form.service = serviceRaw
  }

  if (accRaw) {
    selectedAccessoryUuids.value = parseCsv(accRaw)
  } else {
    selectedAccessoryUuids.value = []
  }

  const noteLines: string[] = []
  if (detailRaw && !/^accessory\s*:/i.test(detailRaw)) {
    noteLines.push(`Requested service (from listing): ${detailRaw}`)
  }
  if (noteLines.length) {
    form.notes = `${noteLines.join('\n')}\n`
  }
}

onMounted(() => {
  applyBookingQuery()
})

watch(
  () => route.query,
  () => {
    applyBookingQuery()
  },
  { deep: true },
)

function buildSummary() {
  const b = lastBooking.value
  if (!b) return ''
  const lines = [
    `Reference: ${b.reference}`,
    `Name: ${b.name}`,
    `Phone: ${b.phone}`,
    `Service: ${b.service}`,
    b.address ? `Address: ${b.address}` : '',
    b.deviceBrand ? `Device brand: ${b.deviceBrand}` : '',
    b.deviceModel ? `Device model: ${b.deviceModel}` : '',
    b.preferredDate ? `Preferred date: ${b.preferredDate}` : '',
    b.preferredTime ? `Preferred time: ${timeSlots.find((t) => t.value === b.preferredTime)?.label ?? b.preferredTime}` : '',
    b.accessories?.length ? `Accessories: ${b.accessories.join(', ')}` : '',
    b.notes ? `Problem description: ${b.notes}` : '',
  ].filter(Boolean)
  return lines.join('\n')
}

async function copySummary() {
  try {
    await navigator.clipboard.writeText(buildSummary())
  } catch {
    /* ignore */
  }
}

async function handleSubmit() {
  errorMessage.value = ''
  if (!form.name.trim() || !form.phone.trim() || !form.service) {
    errorMessage.value = 'Please fill in your name, phone, and the service you need.'
    return
  }
  if (!form.address.trim()) {
    errorMessage.value = 'Please enter your appointment / service address.'
    return
  }

  submitting.value = true
  try {
    const res = await $fetch<{ ok: boolean; reference: string }>('/api/booking', {
      method: 'POST',
      body: {
        name: form.name.trim(),
        phone: form.phone.trim(),
        service: form.service,
        deviceBrand: form.deviceBrand,
        deviceModel: form.deviceModel.trim(),
        address: form.address.trim(),
        preferredDate: form.preferredDate,
        preferredTime: form.preferredTime,
        notes: form.notes.trim(),
        accessories: selectedAccessories.value.map((a) => a.name),
      },
    })
    reference.value = res.reference
    lastBooking.value = {
      reference: res.reference,
      name: form.name.trim(),
      phone: form.phone.trim(),
      address: form.address.trim(),
      service: form.service,
      deviceBrand: form.deviceBrand,
      deviceModel: form.deviceModel.trim(),
      preferredDate: form.preferredDate,
      preferredTime: form.preferredTime,
      notes: form.notes.trim(),
      accessories: selectedAccessories.value.map((a) => a.name),
    }
    submitted.value = true
    Object.assign(form, EMPTY_FORM)
  } catch (e: unknown) {
    const err = e as { data?: { statusMessage?: string }; message?: string }
    errorMessage.value = err.data?.statusMessage || err.message || 'Something went wrong. Please try again or call us.'
  } finally {
    submitting.value = false
  }
}

function bookAnother() {
  submitted.value = false
  reference.value = ''
  lastBooking.value = null
  nextTick(() => applyBookingQuery())
}
</script>

<template>
  <div>
    <section class="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 px-4 py-14 text-white sm:px-6 lg:px-8">
      <div class="mx-auto max-w-7xl text-center">
        <p class="inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-emerald-500/15 px-3 py-1 text-xs font-semibold tracking-wide text-emerald-200">
          <CalendarCheck2 class="h-3.5 w-3.5" /> Book an appointment
        </p>
        <h1 class="mt-4 text-3xl font-extrabold sm:text-4xl">Schedule Your Repair</h1>
        <p class="mx-auto mt-3 max-w-2xl text-sm text-slate-300 sm:text-base">
          Tell us how to reach you and what you need. We’ll confirm your slot by phone — usually within a few hours during business hours.
        </p>
      </div>
    </section>

    <section class="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
        <div v-if="!submitted">
          <h2 class="text-xl font-bold text-slate-900 dark:text-white">Your details</h2>
          <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Fields marked with <span class="text-rose-500">*</span> are required so our team can contact you.
          </p>

          <form class="mt-6 space-y-4" @submit.prevent="handleSubmit">
            <div class="grid gap-4 sm:grid-cols-2">
              <div>
                <label for="b-name" class="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-200">Full name <span class="text-rose-500">*</span></label>
                <input
                  id="b-name"
                  v-model="form.name"
                  type="text"
                  autocomplete="name"
                  required
                  placeholder="Your name"
                  class="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                >
              </div>
              <div>
                <label for="b-phone" class="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-200">Phone <span class="text-rose-500">*</span></label>
                <input
                  id="b-phone"
                  v-model="form.phone"
                  type="tel"
                  autocomplete="tel"
                  required
                  placeholder="+1 (555) 000-0000"
                  class="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                >
              </div>
              <div class="sm:col-span-2">
                <label for="b-address" class="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                  Appointment / service address <span class="text-rose-500">*</span>
                </label>
                <div class="relative">
                  <textarea
                    id="b-address"
                    v-model="form.address"
                    autocomplete="street-address"
                    required
                    rows="2"
                    placeholder="Start typing — pick a suggestion or write the full address"
                    class="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    aria-autocomplete="list"
                    :aria-expanded="photonOpen"
                    aria-controls="photon-address-list"
                    @input="onAddressSuggestInput"
                    @keydown="onAddressSuggestKeydown"
                    @focus="onAddressSuggestFocus"
                    @blur="onAddressSuggestBlur"
                  />
                  <p
                    v-if="photonLoading"
                    class="pointer-events-none absolute right-3 top-3 text-[10px] font-medium text-slate-400"
                  >
                    …
                  </p>
                  <ul
                    v-show="photonOpen && photonSuggestions.length > 0"
                    id="photon-address-list"
                    role="listbox"
                    class="absolute z-30 mt-1 max-h-52 w-full overflow-auto rounded-xl border border-slate-200 bg-white py-1 text-sm shadow-lg dark:border-slate-600 dark:bg-slate-900"
                  >
                    <li
                      v-for="(s, i) in photonSuggestions"
                      :key="i"
                      role="option"
                      :aria-selected="i === photonHighlight"
                      class="cursor-pointer px-3 py-2 text-left text-slate-800 hover:bg-rose-50 dark:text-slate-100 dark:hover:bg-slate-800"
                      :class="i === photonHighlight ? 'bg-rose-50 dark:bg-slate-800' : ''"
                      @mousedown.prevent="pickPhotonSuggestion(s)"
                    >
                      <span class="block font-medium leading-snug">{{ s.label }}</span>
                      <span v-if="s.address !== s.label" class="mt-0.5 block text-xs text-slate-500 dark:text-slate-400">{{
                        s.address
                      }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="grid gap-4 sm:grid-cols-2">
              <div>
                <label for="b-brand" class="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-200">Phone brand</label>
                <select
                  id="b-brand"
                  v-model="form.deviceBrand"
                  class="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                >
                  <option value="">Select…</option>
                  <option v-for="b in deviceBrands" :key="b" :value="b">{{ b }}</option>
                </select>
              </div>
              <div>
                <label for="b-model" class="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-200">Model (optional)</label>
                <input
                  id="b-model"
                  v-model="form.deviceModel"
                  type="text"
                  placeholder="e.g. iPhone 15 Pro"
                  class="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                >
              </div>
            </div>

            <div>
              <label for="b-service" class="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-200">Service needed <span class="text-rose-500">*</span></label>
              <select
                id="b-service"
                v-model="form.service"
                required
                class="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              >
                <option disabled value="">Choose a service…</option>
                <option v-for="s in services" :key="s" :value="s">{{ s }}</option>
              </select>
            </div>

            <div class="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/40">
              <div class="flex items-start justify-between gap-3">
                <div>
                  <p class="text-sm font-bold text-slate-900 dark:text-white">Accessories</p>
                  <p class="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                    Add anything you want with this repair — your choices stay in this box only; we don’t copy them into the problem description below.
                  </p>
                </div>
                <span
                  v-if="selectedAccessoryUuids.length"
                  class="inline-flex shrink-0 items-center rounded-full bg-rose-600 px-2 py-0.5 text-[11px] font-bold text-white"
                >
                  {{ selectedAccessoryUuids.length }} selected
                </span>
              </div>

              <div v-if="selectedAccessories.length" class="mt-3 space-y-2">
                <div
                  v-for="a in selectedAccessories"
                  :key="a.uuid"
                  class="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-950"
                >
                  <img :src="a.image" :alt="a.name" class="h-12 w-12 rounded-lg object-cover" />
                  <div class="min-w-0 flex-1">
                    <p class="truncate text-sm font-semibold text-slate-900 dark:text-white">{{ a.name }}</p>
                    <p class="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                      {{ a.brand }} · {{ a.category }} · {{ accessoryFitsLabel(a) }} · {{ formatAccessoryPrice(a.price) }}
                    </p>
                  </div>
                  <button
                    type="button"
                    class="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 active:scale-95 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
                    aria-label="Remove accessory"
                    @click="syncAccQuery(selectedAccessoryUuids.filter((u) => u !== a.uuid))"
                  >
                    <X class="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div class="mt-3 flex flex-col gap-2 sm:flex-row">
                <button
                  type="button"
                  class="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 active:scale-95 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 sm:w-auto"
                  @click="accessoryPickerOpen = true"
                >
                  Add / change accessories
                </button>
                <button
                  v-if="selectedAccessoryUuids.length"
                  type="button"
                  class="inline-flex w-full items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 active:scale-95 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 sm:w-auto"
                  @click="syncAccQuery([])"
                >
                  Clear accessories
                </button>
              </div>
            </div>

            <div class="grid gap-4 sm:grid-cols-2">
              <div>
                <label for="b-date" class="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-200">Preferred date</label>
                <input
                  id="b-date"
                  v-model="form.preferredDate"
                  type="date"
                  :min="minDate"
                  class="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                >
              </div>
              <div>
                <label for="b-time" class="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-200">Preferred time</label>
                <select
                  id="b-time"
                  v-model="form.preferredTime"
                  class="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                >
                  <option value="">No preference</option>
                  <option v-for="t in timeSlots" :key="t.value" :value="t.value">{{ t.label }}</option>
                </select>
              </div>
            </div>

            <div>
              <label for="b-notes" class="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                What’s wrong with your phone?
              </label>
              <!-- <p class="mb-1.5 text-xs text-slate-500 dark:text-slate-400">
                Tell us the problem (e.g. cracked screen, won’t charge, no sound, after a drop or water). Our team reads this to prepare for your visit — not your accessory picks above.
              </p> -->
              <textarea
                id="b-notes"
                v-model="form.notes"
                rows="4"
                placeholder="Example: Screen cracked top-right after a drop; touch still works. Battery also drains in ~3 hours."
                class="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <p v-if="errorMessage" class="rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-800 dark:bg-rose-950/40 dark:text-rose-200">
              {{ errorMessage }}
            </p>

            <button
              type="submit"
              :disabled="submitting"
              class="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-rose-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-rose-500 disabled:opacity-60"
            >
              <CalendarCheck2 class="h-4 w-4" />
              {{ submitting ? 'Submitting…' : 'Submit booking request' }}
            </button>

            <p class="text-center text-xs text-slate-500 dark:text-slate-400">
              Prefer to talk?
              <a href="tel:+15551234567" class="font-semibold text-rose-600 hover:underline dark:text-rose-400">Call +1 (555) 123-4567</a>
              ·
              <NuxtLink to="/contact" class="font-semibold text-rose-600 hover:underline dark:text-rose-400">Contact form</NuxtLink>
            </p>
          </form>
        </div>

        <div v-else class="text-center">
          <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40">
            <CheckCircle2 class="h-8 w-8" />
          </div>
          <h2 class="mt-4 text-xl font-bold text-slate-900 dark:text-white">Request received</h2>
          <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Save your reference number — our team will use it with your phone to reach you.
          </p>
          <p class="mt-4 inline-block rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-mono text-lg font-bold tracking-wide text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white">
            {{ reference }}
          </p>
          <div class="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              class="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
              @click="copySummary"
            >
              <ClipboardCopy class="h-4 w-4" /> Copy details
            </button>
            <a
              href="tel:+15551234567"
              class="inline-flex items-center gap-2 rounded-full bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-500"
            >
              <Phone class="h-4 w-4" /> Call the shop
            </a>
          </div>
          <p class="mt-6 text-xs text-slate-500 dark:text-slate-400">
            Questions? Email
            <a :href="`mailto:${contactEmail}`" class="font-semibold text-rose-600 hover:underline dark:text-rose-400">{{ contactEmail }}</a>
          </p>
          <button
            type="button"
            class="mt-6 text-sm font-semibold text-rose-600 hover:underline dark:text-rose-400"
            @click="bookAnother"
          >
            Submit another request
          </button>
        </div>
      </div>
    </section>

    <!-- Accessory picker modal -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-if="accessoryPickerOpen" class="fixed inset-0 z-[80]" role="presentation">
          <div
            class="absolute inset-0 bg-slate-900/50 backdrop-blur-[3px]"
            aria-hidden="true"
            @click="closeAccessoryPicker"
          />

          <div
            class="absolute inset-x-0 bottom-0 flex max-h-[min(90dvh,760px)] flex-col rounded-t-[1.25rem] bg-white shadow-[0_-8px_40px_rgba(0,0,0,0.12)] ring-1 ring-slate-200/80 dark:bg-slate-900 dark:ring-slate-700 sm:bottom-8 sm:left-1/2 sm:w-[min(960px,calc(100vw-3rem))] sm:-translate-x-1/2 sm:rounded-2xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="accessory-picker-title"
          >
          <div class="flex shrink-0 items-center justify-between gap-3 border-b border-slate-100 px-4 py-3 dark:border-slate-800 sm:px-5">
            <div>
              <h2 id="accessory-picker-title" class="text-lg font-bold text-slate-900 dark:text-white">
                Add accessories
              </h2>
              <p class="text-xs text-slate-500 dark:text-slate-400">
                {{ filteredAccessoryPickerList.length }} item{{ filteredAccessoryPickerList.length !== 1 ? 's' : '' }}
              </p>
            </div>
            <button
              type="button"
              class="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
              aria-label="Close accessories"
              @click="closeAccessoryPicker"
            >
              <X class="h-5 w-5" />
            </button>
          </div>

          <div class="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 sm:px-5">
            <div class="relative">
              <Search class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                v-model="accessorySearch"
                type="text"
                placeholder="Search accessories…"
                class="w-full rounded-full border border-slate-300 bg-slate-50 py-2.5 pl-9 pr-3 text-sm text-slate-900 outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <!-- Brand filter with images -->
            <div class="mt-4">
              <p class="text-xs font-bold uppercase tracking-wider text-slate-400">Brand</p>
              <div class="mt-2 flex gap-2 overflow-x-auto pb-1">
                <button
                  type="button"
                  class="flex min-w-[6.5rem] items-center gap-2 rounded-xl border bg-white px-2.5 py-2 text-left transition active:scale-[0.99] dark:bg-slate-950"
                  :class="
                    accessoryBrandFilter === 'all'
                      ? 'border-rose-500 ring-1 ring-rose-500/20'
                      : 'border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-900'
                  "
                  @click="accessoryBrandFilter = 'all'"
                >
                  <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-xs font-extrabold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                    All
                  </div>
                  <div class="min-w-0">
                    <p class="truncate text-xs font-bold text-slate-900 dark:text-white">All</p>
                    <p class="truncate text-[11px] text-slate-500 dark:text-slate-400">Any brand</p>
                  </div>
                </button>

                <button
                  v-for="b in (['Apple','Samsung','Google','Universal'] as const)"
                  :key="b"
                  type="button"
                  class="flex min-w-[7.5rem] items-center gap-2 rounded-xl border bg-white px-2.5 py-2 text-left transition active:scale-[0.99] dark:bg-slate-950"
                  :class="
                    accessoryBrandFilter === b
                      ? 'border-rose-500 ring-1 ring-rose-500/20'
                      : 'border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-900'
                  "
                  @click="accessoryBrandFilter = b"
                >
                  <div class="h-10 w-10 overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
                    <img v-if="brandThumb[b]" :src="brandThumb[b]" :alt="b" class="h-full w-full object-cover" />
                  </div>
                  <div class="min-w-0">
                    <p class="truncate text-xs font-bold text-slate-900 dark:text-white">{{ b }}</p>
                    <p class="truncate text-[11px] text-slate-500 dark:text-slate-400">Filter</p>
                  </div>
                </button>
              </div>
            </div>

            <!-- Category filter -->
            <div class="mt-4">
              <p class="text-xs font-bold uppercase tracking-wider text-slate-400">Category</p>
              <div class="mt-2 flex flex-wrap gap-2">
                <button
                  type="button"
                  class="rounded-full border px-3 py-1.5 text-xs font-semibold transition"
                  :class="
                    accessoryCategoryFilter === 'all'
                      ? 'border-rose-500 bg-rose-600 text-white'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900'
                  "
                  @click="accessoryCategoryFilter = 'all'"
                >
                  All
                </button>
                <button
                  v-for="c in accessoryCategories"
                  :key="c"
                  type="button"
                  class="rounded-full border px-3 py-1.5 text-xs font-semibold transition"
                  :class="
                    accessoryCategoryFilter === c
                      ? 'border-rose-500 bg-rose-600 text-white'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900'
                  "
                  @click="accessoryCategoryFilter = c"
                >
                  {{ c }}
                </button>
              </div>
            </div>

            <!-- Results -->
            <div v-if="filteredAccessoryPickerList.length === 0" class="mt-6 rounded-2xl border border-dashed border-slate-200 py-10 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-300">
              No accessories match these filters.
            </div>

            <div v-else class="mt-5 grid gap-3 sm:grid-cols-2">
              <div
                v-for="a in filteredAccessoryPickerList"
                :key="a.uuid"
                class="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-950"
              >
                <img :src="a.image" :alt="a.name" class="h-14 w-14 rounded-xl object-cover" />
                <div class="min-w-0 flex-1">
                  <p class="truncate text-sm font-semibold text-slate-900 dark:text-white">{{ a.name }}</p>
                  <p class="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                    {{ a.brand }} · {{ a.category }} · {{ accessoryFitsLabel(a) }}
                  </p>
                  <p class="mt-1 text-sm font-bold text-slate-900 dark:text-white">{{ formatAccessoryPrice(a.price) }}</p>
                </div>

                <button
                  type="button"
                  class="shrink-0 rounded-full px-3 py-2 text-xs font-bold transition active:scale-95"
                  :class="
                    selectedAccessoryUuids.includes(a.uuid)
                      ? 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700'
                      : 'bg-rose-600 text-white hover:bg-rose-500'
                  "
                  @click="
                    selectedAccessoryUuids.includes(a.uuid)
                      ? syncAccQuery(selectedAccessoryUuids.filter((u) => u !== a.uuid))
                      : syncAccQuery([...selectedAccessoryUuids, a.uuid])
                  "
                >
                  {{ selectedAccessoryUuids.includes(a.uuid) ? 'Remove' : 'Add' }}
                </button>
              </div>
            </div>
          </div>

          <div class="flex shrink-0 items-center justify-between gap-3 border-t border-slate-100 px-4 py-3 dark:border-slate-800 sm:px-5">
            <p class="text-xs text-slate-500 dark:text-slate-400">
              {{ selectedAccessoryUuids.length }} selected
            </p>
            <div class="flex items-center gap-2">
              <button
                type="button"
                class="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-50 active:scale-95 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                @click="syncAccQuery([])"
              >
                Clear
              </button>
              <button
                type="button"
                class="rounded-full bg-rose-600 px-4 py-2 text-xs font-bold text-white transition hover:bg-rose-500 active:scale-95"
                @click="closeAccessoryPicker"
              >
                Done
              </button>
            </div>
          </div>
        </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
