<script setup lang="ts">
import {
  BadgeCheck,
  CheckCircle2,
  DollarSign,
  Globe2,
  Recycle,
  ShieldCheck,
  type Component,
  Wrench,
  Zap,
} from 'lucide-vue-next'

useHead({ title: 'About Us — RapidFix Phone Repair' })

// ── Static data ──────────────────────────────────────────────────────────────

const highlights = [
  'Innovating Repair Solutions with OEM-grade parts',
  'Transforming same-day service for walk-ins and bookings',
  'Redefining the repair experience with transparency',
  'Next-level quality assurance — 35-point inspection',
]

const stats = [
  { value: '8+',  label: 'Services Offered' },
  { value: '15k+', label: 'Satisfied Customers' },
  { value: '15k+', label: 'Repairs Completed' },
  { value: '8+',  label: 'Years of Experience' },
]

type FeatureCard = {
  icon: Component
  iconBg: string
  iconColor: string
  title: string
  body: string
}

const features: FeatureCard[] = [
  {
    icon: ShieldCheck,
    iconBg: 'bg-rose-100 dark:bg-rose-900/40',
    iconColor: 'text-rose-600',
    title: 'Certified Technicians',
    body: 'All repairs are performed by fully trained, certified mobile device technicians.',
  },
  {
    icon: BadgeCheck,
    iconBg: 'bg-emerald-100 dark:bg-emerald-900/40',
    iconColor: 'text-emerald-600',
    title: '12-Month Warranty',
    body: 'Every repair comes with a comprehensive 12-month warranty on parts and labor.',
  },
  {
    icon: Zap,
    iconBg: 'bg-sky-100 dark:bg-sky-900/40',
    iconColor: 'text-sky-600',
    title: 'Same-Day Service',
    body: 'Most repairs are completed the same day — often within 45–90 minutes.',
  },
  {
    icon: DollarSign,
    iconBg: 'bg-amber-100 dark:bg-amber-900/40',
    iconColor: 'text-amber-600',
    title: 'Transparent Pricing',
    body: 'Know exactly what you pay. No hidden fees, no surprises at checkout.',
  },
  {
    icon: Recycle,
    iconBg: 'bg-teal-100 dark:bg-teal-900/40',
    iconColor: 'text-teal-600',
    title: 'Eco-Friendly Practices',
    body: 'We responsibly recycle old parts and use eco-conscious repair methods.',
  },
  {
    icon: Globe2,
    iconBg: 'bg-violet-100 dark:bg-violet-900/40',
    iconColor: 'text-violet-600',
    title: '24/7 Support',
    body: 'Round-the-clock phone and email support to address your urgent device issues.',
  },
]

const faqs = [
  {
    question: 'How can I get started with RapidFix?',
    answer: "Getting started is easy! Book an appointment online or give us a call, and we'll guide you through every step of the repair process.",
  },
  {
    question: 'What kind of support does RapidFix offer?',
    answer: 'We offer in-store, walk-in, and home visit repair services Monday through Sunday, 9AM–9PM. You can also reach us by phone or email any time.',
  },
  {
    question: 'What services does RapidFix provide?',
    answer: 'We repair screens, batteries, charging ports, cameras, speakers, microphones, and more for iPhone, Samsung Galaxy, and Google Pixel devices.',
  },
  {
    question: 'How does RapidFix ensure quality repairs?',
    answer: 'Every repair goes through a 35-point quality checklist before handoff. We only use OEM-grade or premium parts, and all repairs are warranty-backed.',
  },
  {
    question: 'Is RapidFix easy to use?',
    answer: 'Absolutely. Book online in under a minute, drop off your device, and get it back the same day in most cases — no technical knowledge needed.',
  },
]

// ── State ────────────────────────────────────────────────────────────────────

const openFaq = ref<number | null>(0)

function toggleFaq(index: number) {
  openFaq.value = openFaq.value === index ? null : index
}
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 px-4 py-14 text-white sm:px-6 lg:px-8">
      <div class="mx-auto max-w-7xl text-center">
        <p class="inline-flex items-center gap-2 rounded-full border border-sky-300/30 bg-sky-500/15 px-3 py-1 text-xs font-semibold tracking-wide text-sky-200">
          <Wrench class="h-3.5 w-3.5" /> About Us
        </p>
        <h1 class="mt-4 text-3xl font-extrabold sm:text-4xl">We Provide the Best Services</h1>
        <p class="mx-auto mt-3 max-w-2xl text-sm text-slate-300 sm:text-base">
          Empowering customers with cutting-edge repair solutions. At RapidFix, we streamline the entire repair experience — from booking to same-day handoff — to make device care effortless.
        </p>
      </div>
    </section>

    <!-- About content -->
    <section class="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div class="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <p class="text-xs font-semibold uppercase tracking-widest text-rose-600 dark:text-rose-400">About Us</p>
          <h2 class="mt-2 text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">We Provide the Best Services</h2>
          <p class="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">
            Empowering customers with cutting-edge repair solutions. At RapidFix, we streamline operations, enhance efficiency, and drive growth through innovative technology. Our dedicated team is committed to transforming device repair into a seamless, high-performance experience for every customer.
          </p>

          <ul class="mt-6 space-y-3 text-sm text-slate-700 dark:text-slate-200">
            <li v-for="h in highlights" :key="h" class="flex items-center gap-2">
              <BadgeCheck class="h-4 w-4 shrink-0 text-emerald-600" />
              {{ h }}
            </li>
          </ul>

          <div class="mt-8 flex flex-wrap gap-3">
            <NuxtLink
              to="/book"
              class="inline-flex items-center justify-center rounded-full bg-rose-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-rose-500"
            >
              Book a Repair
            </NuxtLink>
            <NuxtLink
              to="/"
              class="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Our Services
            </NuxtLink>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4 overflow-hidden rounded-2xl">
          <img
            src="https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&w=900&q=80"
            alt="Technician repairing phone"
            class="rounded-2xl object-cover w-full h-48"
          >
          <img
            src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&w=900&q=80"
            alt="Phone repair workshop"
            class="rounded-2xl object-cover w-full h-48 translate-y-6"
          >
          <img
            src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=900&q=80"
            alt="Team working"
            class="rounded-2xl object-cover w-full h-48 -translate-y-3"
          >
          <img
            src="https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=900&q=80"
            alt="Battery replacement"
            class="rounded-2xl object-cover w-full h-48 translate-y-3"
          >
        </div>
      </div>
    </section>

    <!-- What makes us different -->
    <section class="bg-slate-50 px-4 py-14 dark:bg-slate-900/30 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-7xl">
        <p class="text-center text-xs font-semibold uppercase tracking-widest text-rose-600 dark:text-rose-400">Why Choose Us</p>
        <h2 class="mt-2 text-center text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">The RapidFix Difference</h2>
        <div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="f in features"
            :key="f.title"
            class="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
          >
            <span class="inline-flex h-10 w-10 items-center justify-center rounded-xl" :class="f.iconBg">
              <component :is="f.icon" class="h-5 w-5" :class="f.iconColor" />
            </span>
            <h3 class="mt-3 font-semibold text-slate-900 dark:text-white">{{ f.title }}</h3>
            <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">{{ f.body }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div class="grid gap-12 lg:grid-cols-2 lg:items-start">
        <div>
          <p class="text-xs font-semibold uppercase tracking-widest text-rose-600 dark:text-rose-400">FAQ</p>
          <h2 class="mt-2 text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">People Asked Some Questions About Us</h2>
          <p class="mt-3 text-sm text-slate-500 dark:text-slate-400">
            Have more questions? Feel free to <NuxtLink to="/contact" class="font-semibold text-rose-600 hover:underline">contact us</NuxtLink> or call at <a href="tel:+15551234567" class="font-semibold text-rose-600 hover:underline">+1 (555) 123-4567</a>.
          </p>

          <div class="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-2">
            <div v-for="stat in stats" :key="stat.label" class="rounded-2xl border border-slate-200 bg-white p-4 text-center dark:border-slate-800 dark:bg-slate-900">
              <p class="text-2xl font-extrabold text-rose-600">{{ stat.value }}</p>
              <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">{{ stat.label }}</p>
            </div>
          </div>
        </div>

        <div class="space-y-3">
          <div
            v-for="(faq, index) in faqs"
            :key="faq.question"
            class="rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
          >
            <button
              type="button"
              class="flex w-full items-center justify-between p-4 text-left font-semibold text-slate-900 dark:text-white"
              @click="toggleFaq(index)"
            >
              <span>{{ faq.question }}</span>
              <CheckCircle2
                class="h-4 w-4 shrink-0 transition-transform"
                :class="openFaq === index ? 'text-rose-600 rotate-[180deg]' : 'text-slate-400'"
              />
            </button>
            <div v-if="openFaq === index" class="border-t border-slate-100 px-4 pb-4 pt-2 text-sm text-slate-600 dark:border-slate-800 dark:text-slate-300">
              {{ faq.answer }}
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
