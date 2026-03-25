<script setup lang="ts">
import { Clock3, Mail, MapPin, MessageSquare, Phone, Send } from 'lucide-vue-next'

useHead({ title: 'Contact Us — RapidFix Phone Repair' })

const form = reactive({
  name: '',
  email: '',
  phone: '',
  service: '',
  message: '',
})

const submitted = ref(false)
const submitting = ref(false)

const services = [
  'Screen Replacement',
  'Battery Replacement',
  'Charging Port Repair',
  'Camera Repair',
  'Water Damage Treatment',
  'Speaker / Microphone Repair',
  'Wi-Fi / Bluetooth Repair',
  'Home Repair Visit',
  'Other',
]

function handleSubmit() {
  if (!form.name || !form.email || !form.message) return
  submitting.value = true
  // Simulate async form submission
  setTimeout(() => {
    submitting.value = false
    submitted.value = true
    Object.assign(form, { name: '', email: '', phone: '', service: '', message: '' })
  }, 1200)
}
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 px-4 py-14 text-white sm:px-6 lg:px-8">
      <div class="mx-auto max-w-7xl text-center">
        <p class="inline-flex items-center gap-2 rounded-full border border-sky-300/30 bg-sky-500/15 px-3 py-1 text-xs font-semibold tracking-wide text-sky-200">
          <MessageSquare class="h-3.5 w-3.5" /> Contact Us
        </p>
        <h1 class="mt-4 text-3xl font-extrabold sm:text-4xl">Get In Touch</h1>
        <p class="mx-auto mt-3 max-w-2xl text-sm text-slate-300 sm:text-base">
          Have a question about your repair, need a quote, or want to book a home visit? We're here to help — reach out any time.
        </p>
      </div>
    </section>

    <!-- Contact grid -->
    <section class="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div class="grid gap-10 md:grid-cols-[1fr_1.5fr]">

        <!-- Info panel -->
        <div class="space-y-6">
          <div>
            <h2 class="text-xl font-bold text-slate-900 dark:text-white">Contact Information</h2>
            <p class="mt-2 text-sm text-slate-500 dark:text-slate-400">Visit us in store, call, or send a message and we'll get back to you same day.</p>
          </div>

          <div class="space-y-4">
            <div class="flex items-start gap-4">
              <span class="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-100 text-rose-600 dark:bg-rose-900/40">
                <MapPin class="h-5 w-5" />
              </span>
              <div>
                <p class="text-sm font-semibold text-slate-900 dark:text-white">Address</p>
                <p class="text-sm text-slate-600 dark:text-slate-300">120 Tech Avenue, Downtown, New York</p>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <span class="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40">
                <Phone class="h-5 w-5" />
              </span>
              <div>
                <p class="text-sm font-semibold text-slate-900 dark:text-white">Phone Number</p>
                <a href="tel:+15551234567" class="text-sm text-rose-600 hover:underline dark:text-rose-400">+1 (555) 123-4567</a>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <span class="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-600 dark:bg-sky-900/40">
                <Mail class="h-5 w-5" />
              </span>
              <div>
                <p class="text-sm font-semibold text-slate-900 dark:text-white">Email Address</p>
                <a href="mailto:hello@rapidfix.com" class="text-sm text-rose-600 hover:underline dark:text-rose-400">hello@rapidfix.com</a>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <span class="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-900/40">
                <Clock3 class="h-5 w-5" />
              </span>
              <div>
                <p class="text-sm font-semibold text-slate-900 dark:text-white">Opening Hours</p>
                <p class="text-sm text-slate-600 dark:text-slate-300">Monday – Sunday: 9AM – 9PM</p>
              </div>
            </div>
          </div>

          <!-- Map embed -->
          <div class="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.11976397304903!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1700000000000"
              width="100%"
              height="220"
              style="border:0;"
              allowfullscreen
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              title="RapidFix location map"
            />
          </div>
        </div>

        <!-- Contact form -->
        <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
          <div v-if="!submitted">
            <h2 class="text-xl font-bold text-slate-900 dark:text-white">Send Us a Message</h2>
            <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">We'll respond within a few hours during business hours.</p>

            <form class="mt-6 space-y-4" @submit.prevent="handleSubmit">
              <div class="grid gap-4 sm:grid-cols-2">
                <div>
                  <label for="name" class="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-200">Full Name <span class="text-rose-500">*</span></label>
                  <input
                    id="name"
                    v-model="form.name"
                    type="text"
                    placeholder="John Smith"
                    required
                    class="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500"
                  >
                </div>
                <div>
                  <label for="email" class="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-200">Email Address <span class="text-rose-500">*</span></label>
                  <input
                    id="email"
                    v-model="form.email"
                    type="email"
                    placeholder="john@example.com"
                    required
                    class="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500"
                  >
                </div>
              </div>

              <div class="grid gap-4 sm:grid-cols-2">
                <div>
                  <label for="phone" class="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-200">Phone Number</label>
                  <input
                    id="phone"
                    v-model="form.phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    class="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500"
                  >
                </div>
                <div>
                  <label for="service" class="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-200">Service Needed</label>
                  <select
                    id="service"
                    v-model="form.service"
                    class="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  >
                    <option value="">Select a service…</option>
                    <option v-for="s in services" :key="s" :value="s">{{ s }}</option>
                  </select>
                </div>
              </div>

              <div>
                <label for="message" class="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-200">Message <span class="text-rose-500">*</span></label>
                <textarea
                  id="message"
                  v-model="form.message"
                  rows="5"
                  placeholder="Describe your device issue or ask us a question…"
                  required
                  class="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500"
                />
              </div>

              <button
                type="submit"
                :disabled="submitting"
                class="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-rose-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-rose-500 disabled:opacity-60"
              >
                <Send class="h-4 w-4" />
                {{ submitting ? 'Sending…' : 'Send Message' }}
              </button>
            </form>
          </div>

          <!-- Success state -->
          <div v-else class="flex flex-col items-center justify-center py-16 text-center">
            <div class="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40">
              <Send class="h-7 w-7" />
            </div>
            <h3 class="mt-4 text-lg font-bold text-slate-900 dark:text-white">Message Sent!</h3>
            <p class="mt-2 text-sm text-slate-500 dark:text-slate-400">Thanks for reaching out. We'll get back to you within a few hours.</p>
            <button
              type="button"
              class="mt-6 rounded-full border border-slate-300 px-6 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
              @click="submitted = false"
            >
              Send Another Message
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
