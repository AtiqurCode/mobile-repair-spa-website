<script setup lang="ts">
import {
  BadgeCheck,
  BatteryCharging,
  CalendarCheck2,
  CheckCircle2,
  Clock3,
  Cpu,
  DollarSign,
  Droplets,
  Globe2,
  LocateFixed,
  PhoneCall,
  Recycle,
  ShieldCheck,
  Smartphone,
  Star,
  Wrench,
  Zap
} from 'lucide-vue-next'

const appointmentUrl = 'https://samiul.crm.prosaas.org/public/lead'

const featuredServices = [
  {
    id: 1,
    name: 'iPhone Screen Replacement',
    category: 'iPhone',
    price: 79,
    eta: '45–60 min',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80',
    excerpt: 'OLED & LCD replacements with factory-calibrated touch and True Tone support for all modern iPhones.',
  },
  {
    id: 2,
    name: 'Samsung Screen Replacement',
    category: 'Samsung',
    price: 89,
    eta: '60–90 min',
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=900&q=80',
    excerpt: 'Genuine AMOLED replacements for Galaxy S and A series with full fingerprint-on-display support.',
  },
  {
    id: 3,
    name: 'Battery Replacement',
    category: 'All Brands',
    price: 45,
    eta: '30–45 min',
    image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=900&q=80',
    excerpt: 'Health-certified battery cells for iPhone, Samsung & Pixel — restore all-day battery life.',
  },
  {
    id: 4,
    name: 'Water Damage Treatment',
    category: 'General',
    price: 70,
    eta: '1–2 hours',
    image: 'https://images.unsplash.com/photo-1517241034903-9a4c3ab12f00?auto=format&fit=crop&w=900&q=80',
    excerpt: 'Emergency ultrasonic cleaning and corrosion removal — best chance of recovery when treated early.',
  },
]

const features = [
  { icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-100 dark:bg-emerald-900/40', title: 'Affordable Rates', desc: 'Competitive pricing with transparent costs, no hidden fees.' },
  { icon: CheckCircle2, color: 'text-sky-600', bg: 'bg-sky-100 dark:bg-sky-900/40', title: 'Satisfaction Guarantee', desc: 'Ensuring complete satisfaction on every repair or service.' },
  { icon: Recycle, color: 'text-teal-600', bg: 'bg-teal-100 dark:bg-teal-900/40', title: 'Eco-Friendly Practices', desc: 'Committed to environmentally responsible repair solutions.' },
  { icon: CalendarCheck2, color: 'text-violet-600', bg: 'bg-violet-100 dark:bg-violet-900/40', title: 'Flexible Scheduling', desc: 'Book appointments that fit seamlessly into your busy schedule.' },
  { icon: ShieldCheck, color: 'text-rose-600', bg: 'bg-rose-100 dark:bg-rose-900/40', title: 'Warranty Coverage', desc: 'Enjoy peace of mind with our comprehensive 12-month warranty.' },
  { icon: Cpu, color: 'text-amber-600', bg: 'bg-amber-100 dark:bg-amber-900/40', title: 'Genuine Parts', desc: 'Using only authentic OEM-grade parts for best device performance.' },
  { icon: Clock3, color: 'text-orange-600', bg: 'bg-orange-100 dark:bg-orange-900/40', title: 'Same-Day Service', desc: 'Swift repairs with options for same-day service on most devices.' },
  { icon: Globe2, color: 'text-blue-600', bg: 'bg-blue-100 dark:bg-blue-900/40', title: '24/7 Support', desc: 'Round-the-clock assistance to address your urgent repair needs.' },
]

const team = [
  { name: 'Alex Carter', role: 'Network Configuration Specialist', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80' },
  { name: 'Mark Davis', role: 'Smart Home System Specialist', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80' },
  { name: 'Grace Robinson', role: 'Computer Hardware Engineer', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80' },
]

const testimonials = [
  {
    name: 'James Collins',
    role: 'Service Director',
    text: 'Dropped my phone at lunch and got it back before dinner. Incredible same-day turnaround — couldn\'t believe how fast it was.',
    rating: 5,
  },
  {
    name: 'David Wright',
    role: 'General Manager',
    text: 'The screen replacement was absolutely perfect. Pricing was exactly as quoted — no hidden fees. A game-changer for us.',
    rating: 5,
  },
  {
    name: 'Emily Rogers',
    role: 'Head of Service Operations',
    text: 'Fixed my water-damaged Samsung when I thought it was gone for good. The team was professional and the warranty gives real peace of mind.',
    rating: 5,
  },
  {
    name: 'Sarah Thompson',
    role: 'Operations Manager',
    text: 'Battery now lasts all day again. RapidFix was transparent from start to finish — no surprises at checkout. Highly recommended.',
    rating: 5,
  },
  {
    name: 'Maria Lopez',
    role: 'Customer Support Lead',
    text: 'Booked online, dropped off, picked up same day. The whole process was seamless and the technicians clearly knew what they were doing.',
    rating: 5,
  },
]

const achievements = [
  { value: '8+', label: 'Years of Excellence' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '15k+', label: 'Repairs Completed' },
  { value: '12', label: 'Expert Technicians' },
]

const blogPosts = [
  {
    id: 1,
    date: '2024-08-29',
    title: 'Why OEM Parts Make a Difference in Phone Repairs',
    excerpt: 'Using genuine OEM parts vs. aftermarket components can significantly affect your device\'s longevity and performance after repair.',
    image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 2,
    date: '2024-07-31',
    title: 'How to Keep Your Phone Battery Healthy for Longer',
    excerpt: 'Simple habits like avoiding extreme temperatures, partial charging cycles, and genuine chargers can extend battery life by years.',
    image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 3,
    date: '2024-06-12',
    title: 'Water Damage: What to Do in the First 5 Minutes',
    excerpt: 'Quick action matters. Don\'t charge it, don\'t press buttons, and get it to a repair shop as soon as possible for the best recovery chance.',
    image: 'https://images.unsplash.com/photo-1517241034903-9a4c3ab12f00?auto=format&fit=crop&w=900&q=80',
  },
]

const faqs = [
  { q: 'Do you use OEM-grade parts?', a: 'Yes. We use OEM or premium-grade compatible parts depending on model and availability.' },
  { q: 'How long does screen replacement take?', a: 'Most screen replacements are completed within 45 to 90 minutes.' },
  { q: 'What if my phone has water damage?', a: 'Bring it in immediately. Early diagnostics significantly increase recovery success.' },
  { q: 'Do you offer a warranty on repairs?', a: 'Yes. All our repairs come with a 12-month warranty covering parts and workmanship.' },
  { q: 'Can I book a home repair visit?', a: 'Yes, we offer home repair visits in selected areas. Book online or call us to check availability.' },
]

const openFaq = ref<number | null>(null)
</script>

<template>
  <div>
    <!-- ── Hero ─────────────────────────────────────────────── -->
    <section class="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 px-4 py-16 text-white sm:px-6 lg:px-8">
      <div class="absolute -left-20 top-20 h-56 w-56 rounded-full bg-rose-500/20 blur-3xl" />
      <div class="absolute -right-24 bottom-12 h-64 w-64 rounded-full bg-sky-500/20 blur-3xl" />

      <div class="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <p class="mb-4 inline-flex items-center gap-2 rounded-full border border-rose-300/40 bg-rose-500/15 px-3 py-1 text-xs font-semibold tracking-wide text-rose-100">
            <Wrench class="h-3.5 w-3.5" />
            Phone Repair Center • Open 7 Days
          </p>
          <h1 class="text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
            One Stop Solution for Reliable Repairs
          </h1>
          <p class="mt-4 max-w-xl text-sm text-slate-200 sm:text-base">
            We bring expert services right to your doorstep. Hassle-free, affordable, and professional phone repairs — same-day service with a 12-month warranty.
          </p>

          <div class="mt-5 flex flex-wrap gap-2 text-xs font-semibold">
            <span class="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1.5 text-slate-100">
              <Smartphone class="h-3.5 w-3.5 text-sky-300" /> Cracked Screen
            </span>
            <span class="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1.5 text-slate-100">
              <BatteryCharging class="h-3.5 w-3.5 text-emerald-300" /> Battery Drain
            </span>
            <span class="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1.5 text-slate-100">
              <Zap class="h-3.5 w-3.5 text-amber-300" /> Not Charging
            </span>
            <span class="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1.5 text-slate-100">
              <Droplets class="h-3.5 w-3.5 text-cyan-300" /> Water Damage
            </span>
          </div>

          <div class="mt-7 flex flex-wrap gap-3">
            <a
              :href="appointmentUrl"
              class="inline-flex items-center justify-center rounded-full bg-rose-600 px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-rose-500/30 transition hover:bg-rose-500"
            >
              Get Started
            </a>
            <NuxtLink
              to="/services"
              class="inline-flex items-center justify-center rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              View Services
            </NuxtLink>
          </div>
        </div>

        <div class="rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur">
          <div class="grid grid-cols-2 gap-4">
            <div class="rounded-2xl bg-slate-950/40 p-4">
              <p class="text-xs text-slate-300">Average Turnaround</p>
              <p class="mt-2 text-xl font-bold">45 min</p>
            </div>
            <div class="rounded-2xl bg-slate-950/40 p-4">
              <p class="text-xs text-slate-300">12-Month Warranty</p>
              <p class="mt-2 text-xl font-bold">Included</p>
            </div>
            <div class="rounded-2xl bg-slate-950/40 p-4">
              <p class="text-xs text-slate-300">Devices Repaired</p>
              <p class="mt-2 text-xl font-bold">15k+</p>
            </div>
            <div class="rounded-2xl bg-slate-950/40 p-4">
              <p class="text-xs text-slate-300">Customer Rating</p>
              <p class="mt-2 text-xl font-bold">4.9 / 5</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Core Features ─────────────────────────────────────── -->
    <section class="border-b border-slate-100 bg-white px-4 py-12 dark:border-slate-800 dark:bg-slate-950 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-7xl">
        <p class="text-center text-xs font-semibold uppercase tracking-widest text-rose-600 dark:text-rose-400">Core Features</p>
        <h2 class="mt-2 text-center text-2xl font-bold text-slate-900 dark:text-white">Fast, Transparent and Trusted</h2>
        <p class="mx-auto mt-2 max-w-2xl text-center text-sm text-slate-500 dark:text-slate-400">
          Discover key features that make your repair experience seamless, transparent, and trustworthy.
        </p>
        <div class="mt-8 grid gap-4 sm:grid-cols-3">
          <div class="flex items-start gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900">
            <span class="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-100 dark:bg-rose-900/40">
              <CalendarCheck2 class="h-5 w-5 text-rose-600" />
            </span>
            <div>
              <h3 class="font-semibold text-slate-900 dark:text-white">Service Booking</h3>
              <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">Choose your preferred time and we'll be there to fix it, hassle-free.</p>
            </div>
          </div>
          <div class="flex items-start gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900">
            <span class="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-900/40">
              <DollarSign class="h-5 w-5 text-emerald-600" />
            </span>
            <div>
              <h3 class="font-semibold text-slate-900 dark:text-white">Transparent Pricing</h3>
              <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">Know exactly what you'll pay. No hidden fees, just honest and fair service charges.</p>
            </div>
          </div>
          <div class="flex items-start gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900">
            <span class="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-100 dark:bg-sky-900/40">
              <BadgeCheck class="h-5 w-5 text-sky-600" />
            </span>
            <div>
              <h3 class="font-semibold text-slate-900 dark:text-white">Certified Technicians</h3>
              <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">Highly trained and certified — your devices are always in safe, expert hands.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Latest Services ──────────────────────────────────── -->
    <section class="bg-slate-50 px-4 py-14 dark:bg-slate-900/30 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-7xl">
        <p class="text-center text-xs font-semibold uppercase tracking-widest text-rose-600 dark:text-rose-400">Services</p>
        <h2 class="mt-2 text-center text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">Latest Services</h2>
        <p class="mx-auto mt-2 max-w-2xl text-center text-sm text-slate-500 dark:text-slate-400">
          Stay updated with our latest offerings, designed to meet all your repair needs efficiently and affordably.
        </p>

        <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <article
            v-for="service in featuredServices"
            :key="service.id"
            class="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
          >
            <div class="relative overflow-hidden">
              <img
                :src="service.image"
                :alt="service.name"
                class="h-48 w-full object-cover transition duration-500 group-hover:scale-105"
              >
              <span class="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-rose-600 shadow backdrop-blur-sm dark:bg-slate-900/90 dark:text-rose-400">
                {{ service.category }}
              </span>
            </div>
            <div class="flex flex-1 flex-col p-4">
              <h3 class="font-bold leading-snug text-slate-900 dark:text-white">{{ service.name }}</h3>
              <p class="mt-1.5 flex-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">{{ service.excerpt }}</p>
              <div class="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 dark:border-slate-800">
                <div>
                  <p class="text-[11px] text-slate-400">Starting at</p>
                  <p class="text-sm font-extrabold text-rose-600">${{ service.price }}.00 USD</p>
                </div>
                <NuxtLink
                  to="/services"
                  class="rounded-full bg-rose-600 px-3.5 py-1.5 text-[11px] font-bold text-white transition hover:bg-rose-500"
                >
                  View Detail
                </NuxtLink>
              </div>
            </div>
          </article>
        </div>

        <div class="mt-8 flex justify-center">
          <NuxtLink
            to="/services"
            class="rounded-full border border-slate-300 px-7 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            View All Services
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- ── About ─────────────────────────────────────────────── -->
    <section class="bg-white px-4 py-14 dark:bg-slate-950 sm:px-6 lg:px-8">
      <div class="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <p class="text-xs font-semibold uppercase tracking-widest text-rose-600 dark:text-rose-400">About Us</p>
          <h2 class="mt-2 text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">We Provide the Best Services</h2>
          <p class="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">
            Empowering customers with cutting-edge repair solutions. At RapidFix, we streamline operations, enhance efficiency, and drive growth through innovative technology. Our dedicated team is committed to transforming device repair into a seamless, high-performance experience.
          </p>
          <ul class="mt-5 space-y-2.5">
            <li v-for="item in ['Innovating repair solutions with OEM-grade parts', 'Transforming same-day service for walk-ins & bookings', 'Redefining the repair experience with full transparency', 'Next-level quality assurance — 35-point inspection']" :key="item" class="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
              <CheckCircle2 class="h-4 w-4 shrink-0 text-emerald-600" />
              {{ item }}
            </li>
          </ul>
          <div class="mt-7 flex flex-wrap gap-3">
            <a
              :href="appointmentUrl"
              class="inline-flex items-center justify-center rounded-full bg-rose-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-rose-500"
            >
              Book a Repair
            </a>
            <NuxtLink
              to="/services"
              class="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Our Services
            </NuxtLink>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <img src="https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&w=900&q=80" alt="Technician repairing phone" class="h-48 w-full rounded-2xl object-cover">
          <img src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&w=900&q=80" alt="Phone repair workshop" class="h-48 w-full translate-y-6 rounded-2xl object-cover">
          <img src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=900&q=80" alt="Team working" class="h-48 w-full -translate-y-3 rounded-2xl object-cover">
          <img src="https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=900&q=80" alt="Battery replacement" class="h-48 w-full translate-y-3 rounded-2xl object-cover">
        </div>
      </div>
    </section>

    <!-- ── How It Works ──────────────────────────────────────── -->
    <section class="bg-slate-50 px-4 py-14 dark:bg-slate-900/30 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-7xl">
        <p class="text-center text-xs font-semibold uppercase tracking-widest text-rose-600 dark:text-rose-400">Work Process</p>
        <h2 class="mt-2 text-center text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">How We Work</h2>
        <p class="mx-auto mt-2 max-w-2xl text-center text-sm text-slate-500 dark:text-slate-400">
          Streamline every step with our efficient processes for superior service center management.
        </p>
        <div class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <article v-for="(step, i) in [
            { icon: CalendarCheck2, title: 'Easy Online Booking', desc: 'Schedule your repair easily with our online system — takes under a minute.', highlight: false },
            { icon: LocateFixed, title: 'Home Fix Available', desc: 'After booking, choose in-home repair — our technician comes to you with all tools and parts ready.', highlight: true },
            { icon: Wrench, title: 'Fast & Reliable Repair', desc: 'Swift and dependable repairs using genuine OEM-grade parts.', highlight: false },
            { icon: CheckCircle2, title: 'Quality Assurance', desc: 'Every repair is tested against 35+ checkpoints before handoff.', highlight: false },
          ]" :key="i" class="rounded-2xl border p-5 transition"
            :class="step.highlight
              ? 'border-emerald-200 bg-emerald-50 dark:border-emerald-800/60 dark:bg-emerald-950/30'
              : 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900'"
          >
            <span class="inline-flex h-10 w-10 items-center justify-center rounded-xl"
              :class="step.highlight ? 'bg-emerald-100 dark:bg-emerald-900/50' : 'bg-rose-100 dark:bg-rose-900/40'"
            >
              <component :is="step.icon" class="h-5 w-5"
                :class="step.highlight ? 'text-emerald-600' : 'text-rose-600'"
              />
            </span>
            <h3 class="mt-3 font-semibold text-slate-900 dark:text-white">{{ i + 1 }}. {{ step.title }}</h3>
            <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">{{ step.desc }}</p>
            <a
              v-if="step.highlight"
              :href="appointmentUrl"
              class="mt-3 inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:underline dark:text-emerald-400"
            >
              Book Home Repair →
            </a>
          </article>
        </div>
      </div>
    </section>

    <!-- ── Premier Features ──────────────────────────────────── -->
    <section class="bg-white px-4 py-14 dark:bg-slate-950 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-7xl">
        <p class="text-center text-xs font-semibold uppercase tracking-widest text-rose-600 dark:text-rose-400">Features</p>
        <h2 class="mt-2 text-center text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">Discover Our Premier Features</h2>
        <p class="mx-auto mt-2 max-w-2xl text-center text-sm text-slate-500 dark:text-slate-400">
          Explore the exceptional services and benefits we offer to ensure top-quality repairs and an unmatched customer experience.
        </p>
        <div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <article
            v-for="feature in features"
            :key="feature.title"
            class="rounded-2xl border border-slate-100 bg-slate-50 p-5 transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
          >
            <span :class="[feature.bg, 'inline-flex h-10 w-10 items-center justify-center rounded-xl']">
              <component :is="feature.icon" :class="[feature.color, 'h-5 w-5']" />
            </span>
            <h3 class="mt-3 font-semibold text-slate-900 dark:text-white">{{ feature.title }}</h3>
            <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">{{ feature.desc }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- ── Testimonials ─────────────────────────────────────── -->
    <section class="bg-slate-50 px-4 py-14 dark:bg-slate-900/30 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-7xl">
        <p class="text-center text-xs font-semibold uppercase tracking-widest text-rose-600 dark:text-rose-400">Feedback</p>
        <h2 class="mt-2 text-center text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">What People Say About Us</h2>
        <p class="mx-auto mt-2 max-w-2xl text-center text-sm text-slate-500 dark:text-slate-400">
          Your feedback helps us improve and ensures better experiences for every customer.
        </p>
        <div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <blockquote
            v-for="(t, i) in testimonials.slice(0, 3)"
            :key="i"
            class="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
          >
            <div class="mb-3 flex gap-0.5">
              <Star v-for="s in t.rating" :key="s" class="h-4 w-4 fill-amber-400 text-amber-400" />
            </div>
            <p class="flex-1 text-sm leading-relaxed text-slate-700 dark:text-slate-300">"{{ t.text }}"</p>
            <footer class="mt-5 border-t border-slate-100 pt-4 dark:border-slate-800">
              <p class="font-bold text-slate-900 dark:text-white">{{ t.name }}</p>
              <p class="text-xs text-slate-500 dark:text-slate-400">{{ t.role }}</p>
            </footer>
          </blockquote>
        </div>
        <div class="mt-5 grid gap-5 sm:grid-cols-2">
          <blockquote
            v-for="(t, i) in testimonials.slice(3)"
            :key="i"
            class="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
          >
            <div class="mb-3 flex gap-0.5">
              <Star v-for="s in t.rating" :key="s" class="h-4 w-4 fill-amber-400 text-amber-400" />
            </div>
            <p class="flex-1 text-sm leading-relaxed text-slate-700 dark:text-slate-300">"{{ t.text }}"</p>
            <footer class="mt-5 border-t border-slate-100 pt-4 dark:border-slate-800">
              <p class="font-bold text-slate-900 dark:text-white">{{ t.name }}</p>
              <p class="text-xs text-slate-500 dark:text-slate-400">{{ t.role }}</p>
            </footer>
          </blockquote>
        </div>
      </div>
    </section>

    <!-- ── Achievement Stats ─────────────────────────────────── -->
    <section class="relative overflow-hidden bg-gradient-to-r from-rose-600 to-rose-500 px-4 py-14 text-white sm:px-6 lg:px-8">
      <div class="absolute inset-0" style="background-image: repeating-linear-gradient(45deg, rgba(255,255,255,0.04) 0, rgba(255,255,255,0.04) 1px, transparent 0, transparent 50%); background-size: 12px 12px;" />
      <div class="relative mx-auto max-w-7xl">
        <p class="text-center text-xs font-semibold uppercase tracking-widest text-rose-200">Achievement</p>
        <h2 class="mt-2 text-center text-2xl font-bold sm:text-3xl">Our Awesome Achievement</h2>
        <p class="mx-auto mt-2 max-w-2xl text-center text-sm text-rose-100">
          Showcasing milestones and success that reflect our commitment to excellence and client satisfaction.
        </p>
        <div class="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
          <div v-for="stat in achievements" :key="stat.label" class="rounded-2xl bg-white/15 p-6 text-center backdrop-blur">
            <p class="text-3xl font-extrabold sm:text-4xl">{{ stat.value }}</p>
            <p class="mt-2 text-sm font-semibold text-rose-100">{{ stat.label }}</p>
          </div>
        </div>
        <div class="mt-8 flex justify-center">
          <NuxtLink
            to="/about"
            class="inline-flex items-center justify-center rounded-full border border-white/50 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
          >
            Want to learn more about us? Click here
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- ── Team ──────────────────────────────────────────────── -->
    <section class="bg-white px-4 py-14 dark:bg-slate-950 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-7xl">
        <p class="text-center text-xs font-semibold uppercase tracking-widest text-rose-600 dark:text-rose-400">Team</p>
        <h2 class="mt-2 text-center text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">Meet Our Expert Team</h2>
        <p class="mx-auto mt-2 max-w-2xl text-center text-sm text-slate-500 dark:text-slate-400">
          Get to know the skilled professionals dedicated to providing exceptional service and ensuring your satisfaction.
        </p>
        <div class="mt-10 grid gap-5 sm:grid-cols-3">
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
              <div class="mt-3 flex justify-center gap-0.5">
                <Star v-for="i in 5" :key="i" class="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- ── FAQ ───────────────────────────────────────────────── -->
    <section class="bg-slate-50 px-4 py-14 dark:bg-slate-900/30 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-7xl">
        <p class="text-center text-xs font-semibold uppercase tracking-widest text-rose-600 dark:text-rose-400">FAQ</p>
        <h2 class="mt-2 text-center text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">People Asked Some Questions</h2>
        <div class="mx-auto mt-8 max-w-3xl space-y-3">
          <div
            v-for="(faq, i) in faqs"
            :key="i"
            class="rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
          >
            <button
              type="button"
              class="flex w-full items-center justify-between p-4 text-left font-semibold text-slate-900 dark:text-white"
              @click="openFaq = openFaq === i ? null : i"
            >
              <span>{{ faq.q }}</span>
              <span class="ml-4 shrink-0 text-slate-400 transition-transform" :class="openFaq === i ? 'rotate-45' : ''">+</span>
            </button>
            <div v-if="openFaq === i" class="border-t border-slate-100 px-4 pb-4 pt-2 text-sm text-slate-600 dark:border-slate-800 dark:text-slate-300">
              {{ faq.a }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Blog Teaser ────────────────────────────────────────── -->
    <section class="bg-white px-4 py-14 dark:bg-slate-950 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-7xl">
        <p class="text-center text-xs font-semibold uppercase tracking-widest text-rose-600 dark:text-rose-400">Blog</p>
        <h2 class="mt-2 text-center text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">Latest Blog</h2>
        <p class="mx-auto mt-2 max-w-2xl text-center text-sm text-slate-500 dark:text-slate-400">
          Stay informed with the latest industry trends, tips, and updates from our knowledgeable team.
        </p>
        <div class="mt-10 grid gap-5 sm:grid-cols-3">
          <article
            v-for="post in blogPosts"
            :key="post.id"
            class="group overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
          >
            <div class="overflow-hidden">
              <img :src="post.image" :alt="post.title" class="h-48 w-full object-cover transition duration-300 group-hover:scale-105">
            </div>
            <div class="p-5">
              <p class="text-xs text-slate-400">{{ post.date }}</p>
              <h3 class="mt-2 font-bold leading-snug text-slate-900 dark:text-white">{{ post.title }}</h3>
              <p class="mt-2 line-clamp-3 text-sm text-slate-600 dark:text-slate-300">{{ post.excerpt }}</p>
              <NuxtLink to="/blog" class="mt-4 inline-flex items-center text-xs font-bold uppercase tracking-wide text-rose-600 hover:text-rose-500 dark:text-rose-400">
                Read More →
              </NuxtLink>
            </div>
          </article>
        </div>
        <div class="mt-8 flex justify-center">
          <NuxtLink to="/blog" class="rounded-full border border-slate-300 px-7 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800">
            View All Posts
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- ── Bottom Stats ──────────────────────────────────────── -->
    <section class="bg-slate-900 px-4 py-10 text-white sm:px-6 lg:px-8">
      <div class="mx-auto grid max-w-7xl grid-cols-2 gap-6 sm:grid-cols-4">
        <div v-for="stat in [
          { value: '50+', label: 'Services Offered' },
          { value: '15k+', label: 'Satisfied Customers' },
          { value: '15k+', label: 'Repairs Completed' },
          { value: '8+', label: 'Years of Experience' },
        ]" :key="stat.label" class="text-center">
          <p class="text-2xl font-extrabold text-rose-400 sm:text-3xl">{{ stat.value }}</p>
          <p class="mt-1 text-xs font-semibold text-slate-400">{{ stat.label }}</p>
        </div>
      </div>
    </section>

    <a
      href="tel:+15551234567"
      class="fixed bottom-4 right-4 z-50 inline-flex items-center gap-2 rounded-full bg-rose-600 px-4 py-3 text-sm font-semibold text-white shadow-xl shadow-rose-500/30 sm:hidden"
    >
      <PhoneCall class="h-4 w-4" />
      Call
    </a>
  </div>
</template>
