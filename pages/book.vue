<script setup lang="ts">
import { CalendarCheck2, CheckCircle2, ClipboardCopy, Phone } from 'lucide-vue-next'

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

const form = reactive({
  name: '',
  phone: '',
  email: '',
  deviceBrand: '',
  deviceModel: '',
  service: '',
  preferredDate: '',
  preferredTime: '',
  notes: '',
})

const submitting = ref(false)
const errorMessage = ref('')
const submitted = ref(false)
const reference = ref('')

/** Snapshot after successful submit (form is cleared) — used for copy + display */
const lastBooking = ref<{
  reference: string
  name: string
  phone: string
  email: string
  service: string
  deviceBrand: string
  deviceModel: string
  preferredDate: string
  preferredTime: string
  notes: string
} | null>(null)

const minDate = computed(() => new Date().toISOString().slice(0, 10))

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

  if (brandRaw && deviceBrands.includes(brandRaw)) {
    form.deviceBrand = brandRaw
  }
  if (serviceRaw && services.includes(serviceRaw)) {
    form.service = serviceRaw
  }
  if (detailRaw) {
    const isAccessory = /^accessory\s*:/i.test(detailRaw)
    form.notes = isAccessory
      ? `${detailRaw}\n`
      : `Requested service (from listing): ${detailRaw}\n`
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
    `Email: ${b.email}`,
    `Service: ${b.service}`,
    b.deviceBrand ? `Device brand: ${b.deviceBrand}` : '',
    b.deviceModel ? `Device model: ${b.deviceModel}` : '',
    b.preferredDate ? `Preferred date: ${b.preferredDate}` : '',
    b.preferredTime ? `Preferred time: ${timeSlots.find((t) => t.value === b.preferredTime)?.label ?? b.preferredTime}` : '',
    b.notes ? `Notes: ${b.notes}` : '',
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
  if (!form.name.trim() || !form.phone.trim() || !form.email.trim() || !form.service) {
    errorMessage.value = 'Please fill in your name, phone, email, and the service you need.'
    return
  }

  submitting.value = true
  try {
    const res = await $fetch<{ ok: boolean; reference: string }>('/api/booking', {
      method: 'POST',
      body: {
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        service: form.service,
        deviceBrand: form.deviceBrand,
        deviceModel: form.deviceModel.trim(),
        preferredDate: form.preferredDate,
        preferredTime: form.preferredTime,
        notes: form.notes.trim(),
      },
    })
    reference.value = res.reference
    lastBooking.value = {
      reference: res.reference,
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      service: form.service,
      deviceBrand: form.deviceBrand,
      deviceModel: form.deviceModel.trim(),
      preferredDate: form.preferredDate,
      preferredTime: form.preferredTime,
      notes: form.notes.trim(),
    }
    submitted.value = true
    Object.assign(form, {
      name: '',
      phone: '',
      email: '',
      deviceBrand: '',
      deviceModel: '',
      service: '',
      preferredDate: '',
      preferredTime: '',
      notes: '',
    })
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
          Tell us how to reach you and what you need. We’ll confirm your slot by phone or email — usually within a few hours during business hours.
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
              <div class="sm:col-span-2">
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
              <div>
                <label for="b-email" class="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-200">Email <span class="text-rose-500">*</span></label>
                <input
                  id="b-email"
                  v-model="form.email"
                  type="email"
                  autocomplete="email"
                  required
                  placeholder="you@example.com"
                  class="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                >
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
              <label for="b-notes" class="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-200">Notes for our team</label>
              <textarea
                id="b-notes"
                v-model="form.notes"
                rows="4"
                placeholder="Describe the issue, prior repair attempts, or anything else we should know…"
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
            Save your reference number — our team will use it together with your phone and email to reach you.
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
  </div>
</template>
