<script setup lang="ts">
import {
  BadgeCheck,
  CheckCircle2,
  DollarSign,
  Globe2,
  Recycle,
  ShieldCheck,
  Star,
  Wrench,
  Zap
} from 'lucide-vue-next'

useHead({ title: 'About Us — RapidFix Phone Repair' })

const appointmentUrl = 'https://samiul.crm.prosaas.org/public/lead'

const faqs = [
  {
    question: 'How can I get started with RapidFix?',
    answer: 'Getting started is easy! Book an appointment online or give us a call, and we\'ll guide you through every step of the repair process.',
    open: true,
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

const openFaq = ref<number | null>(0)

function toggleFaq(index: number) {
  openFaq.value = openFaq.value === index ? null : index
}

const team = [
  { name: 'Alex Carter', role: 'Network & Connectivity Specialist', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80' },
  { name: 'Sarah Thompson', role: 'Screen Repair Specialist', image: 'https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?auto=format&fit=crop&w=400&q=80' },
  { name: 'Mark Davis', role: 'Smart Device Technician', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80' },
  { name: 'Grace Robinson', role: 'Computer Hardware Engineer', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80' },
  { name: 'Daniel Park', role: 'Water Damage Expert', image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=80' },
  { name: 'Lisa Chen', role: 'Quality Assurance Lead', image: 'https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?auto=format&fit=crop&w=400&q=80' },
]

const stats = [
  { value: '8+', label: 'Services Offered (types)' },
  { value: '15k+', label: 'Satisfied Customers' },
  { value: '15k+', label: 'Repairs Completed' },
  { value: '8+', label: 'Years of Experience' },
]
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
            <li class="flex items-center gap-2">
              <BadgeCheck class="h-4 w-4 shrink-0 text-emerald-600" />
              Innovating Repair Solutions with OEM-grade parts
            </li>
            <li class="flex items-center gap-2">
              <BadgeCheck class="h-4 w-4 shrink-0 text-emerald-600" />
              Transforming same-day service for walk-ins and bookings
            </li>
            <li class="flex items-center gap-2">
              <BadgeCheck class="h-4 w-4 shrink-0 text-emerald-600" />
              Redefining the repair experience with transparency
            </li>
            <li class="flex items-center gap-2">
              <BadgeCheck class="h-4 w-4 shrink-0 text-emerald-600" />
              Next-level quality assurance — 35-point inspection
            </li>
          </ul>

          <div class="mt-8 flex flex-wrap gap-3">
            <a
              :href="appointmentUrl"
              class="inline-flex items-center justify-center rounded-full bg-rose-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-rose-500"
            >
              Book a Repair
            </a>
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
          <div class="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <span class="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-rose-100 dark:bg-rose-900/40">
              <ShieldCheck class="h-5 w-5 text-rose-600" />
            </span>
            <h3 class="mt-3 font-semibold text-slate-900 dark:text-white">Certified Technicians</h3>
            <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">All repairs are performed by fully trained, certified mobile device technicians.</p>
          </div>
          <div class="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <span class="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-900/40">
              <BadgeCheck class="h-5 w-5 text-emerald-600" />
            </span>
            <h3 class="mt-3 font-semibold text-slate-900 dark:text-white">12-Month Warranty</h3>
            <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">Every repair comes with a comprehensive 12-month warranty on parts and labor.</p>
          </div>
          <div class="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <span class="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 dark:bg-sky-900/40">
              <Zap class="h-5 w-5 text-sky-600" />
            </span>
            <h3 class="mt-3 font-semibold text-slate-900 dark:text-white">Same-Day Service</h3>
            <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">Most repairs are completed the same day — often within 45–90 minutes.</p>
          </div>
          <div class="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <span class="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 dark:bg-amber-900/40">
              <DollarSign class="h-5 w-5 text-amber-600" />
            </span>
            <h3 class="mt-3 font-semibold text-slate-900 dark:text-white">Transparent Pricing</h3>
            <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">Know exactly what you pay. No hidden fees, no surprises at checkout.</p>
          </div>
          <div class="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <span class="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 dark:bg-teal-900/40">
              <Recycle class="h-5 w-5 text-teal-600" />
            </span>
            <h3 class="mt-3 font-semibold text-slate-900 dark:text-white">Eco-Friendly Practices</h3>
            <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">We responsibly recycle old parts and use eco-conscious repair methods.</p>
          </div>
          <div class="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <span class="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 dark:bg-violet-900/40">
              <Globe2 class="h-5 w-5 text-violet-600" />
            </span>
            <h3 class="mt-3 font-semibold text-slate-900 dark:text-white">24/7 Support</h3>
            <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">Round-the-clock phone and email support to address your urgent device issues.</p>
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

    <!-- Team -->
    <section class="bg-slate-50 px-4 py-14 dark:bg-slate-900/30 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-7xl">
        <p class="text-center text-xs font-semibold uppercase tracking-widest text-rose-600 dark:text-rose-400">Team</p>
        <h2 class="mt-2 text-center text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">Meet Our Expert Team</h2>
        <p class="mx-auto mt-2 max-w-2xl text-center text-sm text-slate-500 dark:text-slate-400">
          Get to know the skilled professionals dedicated to providing exceptional service and ensuring complete satisfaction.
        </p>

        <div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <article
            v-for="member in team"
            :key="member.name"
            class="group overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
          >
            <div class="overflow-hidden">
              <img
                :src="member.image"
                :alt="member.name"
                class="h-56 w-full object-cover object-top transition duration-300 group-hover:scale-105"
              >
            </div>
            <div class="p-5 text-center">
              <h3 class="font-bold text-slate-900 dark:text-white">{{ member.name }}</h3>
              <p class="mt-0.5 text-sm text-slate-500 dark:text-slate-400">{{ member.role }}</p>
              <div class="mt-3 flex justify-center gap-1">
                <Star v-for="i in 5" :key="i" class="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>
