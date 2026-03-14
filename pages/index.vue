<script setup lang="ts">
import {
  BatteryCharging,
  Camera,
  CheckCircle2,
  Clock3,
  Droplets,
  LocateFixed,
  PhoneCall,
  ShieldCheck,
  Smartphone,
  Wrench,
  Zap
} from 'lucide-vue-next'
</script>

<template>
  <div>
    <section class="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 px-4 py-16 text-white sm:px-6 lg:px-8">
      <div class="absolute -left-20 top-20 h-56 w-56 rounded-full bg-rose-500/20 blur-3xl" />
      <div class="absolute -right-24 bottom-12 h-64 w-64 rounded-full bg-sky-500/20 blur-3xl" />

      <div class="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <p class="mb-4 inline-flex items-center gap-2 rounded-full border border-rose-300/40 bg-rose-500/15 px-3 py-1 text-xs font-semibold tracking-wide text-rose-100">
            <Wrench class="h-3.5 w-3.5" />
            Phone Repair Center • Open 7 Days
          </p>
          <h1 class="text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
            Screen, Battery, Charging, and Water Damage Repair
          </h1>
          <p class="mt-4 max-w-xl text-sm text-slate-200 sm:text-base">
            We repair iPhone, Samsung, and Google Pixel issues fast. From cracked screens to battery drain and charging faults,
            you get same-day service, clear pricing, and warranty-backed repairs.
          </p>

          <div class="mt-5 flex flex-wrap gap-2 text-xs font-semibold">
            <span class="inline-flex items-center gap-1 rounded-full bg-white/12 px-3 py-1.5 text-slate-100">
              <Smartphone class="h-3.5 w-3.5 text-sky-300" /> Cracked Screen
            </span>
            <span class="inline-flex items-center gap-1 rounded-full bg-white/12 px-3 py-1.5 text-slate-100">
              <BatteryCharging class="h-3.5 w-3.5 text-emerald-300" /> Battery Drain
            </span>
            <span class="inline-flex items-center gap-1 rounded-full bg-white/12 px-3 py-1.5 text-slate-100">
              <Zap class="h-3.5 w-3.5 text-amber-300" /> Not Charging
            </span>
            <span class="inline-flex items-center gap-1 rounded-full bg-white/12 px-3 py-1.5 text-slate-100">
              <Droplets class="h-3.5 w-3.5 text-cyan-300" /> Water Damage
            </span>
          </div>

          <div class="mt-7 flex flex-wrap gap-3">
            <NuxtLink
              to="/book"
              class="inline-flex items-center justify-center rounded-full bg-rose-600 px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-rose-500/30 transition hover:bg-rose-500"
            >
              Get My Phone Fixed
            </NuxtLink>
            <a
              href="#pricing"
              class="inline-flex items-center justify-center rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              See Repair Prices
            </a>
          </div>
        </div>

        <div class="rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur">
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
              <p class="mt-2 text-xl font-bold">4.9/5</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <h2 class="text-center text-2xl font-bold text-slate-900 dark:text-white">How It Works</h2>
      <div class="mt-8 grid gap-4 sm:grid-cols-3">
        <article class="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <Smartphone class="h-6 w-6 text-sky-600" />
          <h3 class="mt-3 font-semibold">1. Choose Your Repair</h3>
          <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">Select device type and issue in under a minute.</p>
        </article>
        <article class="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <Clock3 class="h-6 w-6 text-sky-600" />
          <h3 class="mt-3 font-semibold">2. Book a Time Slot</h3>
          <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">Pick the most convenient time and location.</p>
        </article>
        <article class="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <CheckCircle2 class="h-6 w-6 text-sky-600" />
          <h3 class="mt-3 font-semibold">3. Get Back Online</h3>
          <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">Most repairs are completed the same day.</p>
        </article>
      </div>
    </section>

    <section id="home-fix" class="bg-emerald-50 px-4 py-14 dark:bg-emerald-950/20 sm:px-6 lg:px-8">
      <div class="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p class="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300">
            <LocateFixed class="h-3.5 w-3.5" />
            Home Fix Support
          </p>
          <h2 class="mt-4 text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">We Can Repair Your Phone at Home</h2>
          <p class="mt-3 max-w-2xl text-sm text-slate-700 dark:text-slate-300 sm:text-base">
            Cannot visit our shop? Book a home repair and a certified technician will come to your home or office with the required parts and tools.
          </p>

          <div class="mt-6 grid gap-3 sm:grid-cols-3">
            <article class="rounded-2xl border border-emerald-200 bg-white p-4 dark:border-emerald-900/60 dark:bg-slate-900">
              <Clock3 class="h-5 w-5 text-emerald-600" />
              <h3 class="mt-2 text-sm font-semibold text-slate-900 dark:text-white">Fast Arrival</h3>
              <p class="mt-1 text-xs text-slate-600 dark:text-slate-300">Same-day home visit slots in selected areas.</p>
            </article>
            <article class="rounded-2xl border border-emerald-200 bg-white p-4 dark:border-emerald-900/60 dark:bg-slate-900">
              <ShieldCheck class="h-5 w-5 text-emerald-600" />
              <h3 class="mt-2 text-sm font-semibold text-slate-900 dark:text-white">Safe On-Site Repair</h3>
              <p class="mt-1 text-xs text-slate-600 dark:text-slate-300">Professional tools, clean handling, and warranty included.</p>
            </article>
            <article class="rounded-2xl border border-emerald-200 bg-white p-4 dark:border-emerald-900/60 dark:bg-slate-900">
              <CheckCircle2 class="h-5 w-5 text-emerald-600" />
              <h3 class="mt-2 text-sm font-semibold text-slate-900 dark:text-white">Live Update</h3>
              <p class="mt-1 text-xs text-slate-600 dark:text-slate-300">Get technician ETA and repair status in real time.</p>
            </article>
          </div>

          <div class="mt-6 flex flex-wrap gap-3">
            <NuxtLink
              to="/book"
              class="inline-flex items-center justify-center rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-500"
            >
              Book Home Repair
            </NuxtLink>
            <a
              href="tel:+15551234567"
              class="inline-flex items-center justify-center rounded-full border border-emerald-300 px-5 py-2.5 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100 dark:border-emerald-700 dark:text-emerald-300 dark:hover:bg-emerald-900/40"
            >
              Call for Home Support
            </a>
          </div>
        </div>

        <article class="overflow-hidden rounded-3xl border border-emerald-200 bg-white shadow-xl shadow-emerald-200/40 dark:border-emerald-900/50 dark:bg-slate-900 dark:shadow-none">
          <img
            src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1100&q=80"
            alt="Technician providing phone repair support at customer home"
            class="h-52 w-full object-cover"
          >
          <div class="p-5">
            <h3 class="text-base font-bold text-slate-900 dark:text-white">How Home Repair Works</h3>
            <ol class="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
              <li>1. Choose device issue and select Home Fix option.</li>
              <li>2. Share your address and preferred time slot.</li>
              <li>3. Technician arrives, repairs, and tests on-site.</li>
              <li>4. Receive warranty details after completion.</li>
            </ol>
          </div>
        </article>
      </div>
    </section>

    <section class="bg-white px-4 py-14 dark:bg-slate-900 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-6xl">
        <h2 class="text-2xl font-bold text-slate-900 dark:text-white">Popular Repairs</h2>
        <div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <article class="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
            <img
              src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80"
              alt="Smartphone screen repair"
              class="h-36 w-full object-cover"
            >
            <div class="p-5">
            <Smartphone class="h-6 w-6 text-rose-600" />
            <h3 class="mt-3 font-semibold">Screen Repair</h3>
            <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">OLED and LCD replacements with calibrated touch.</p>
            </div>
          </article>
          <article class="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
            <img
              src="https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=900&q=80"
              alt="Phone battery service"
              class="h-36 w-full object-cover"
            >
            <div class="p-5">
            <BatteryCharging class="h-6 w-6 text-rose-600" />
            <h3 class="mt-3 font-semibold">Battery Swap</h3>
            <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">Health-optimized cells for longer daily use.</p>
            </div>
          </article>
          <article class="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
            <img
              src="https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=900&q=80"
              alt="Mobile camera repair close-up"
              class="h-36 w-full object-cover"
            >
            <div class="p-5">
            <Camera class="h-6 w-6 text-rose-600" />
            <h3 class="mt-3 font-semibold">Camera Module</h3>
            <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">Fix blurry or non-focusing front and rear cameras.</p>
            </div>
          </article>
          <article class="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
            <img
              src="https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?auto=format&fit=crop&w=900&q=80"
              alt="Charging port and cable"
              class="h-36 w-full object-cover"
            >
            <div class="p-5">
            <Zap class="h-6 w-6 text-rose-600" />
            <h3 class="mt-3 font-semibold">Charging Port</h3>
            <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">Resolve loose cable fit and intermittent charging.</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section id="pricing" class="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <div class="mb-3 flex items-center gap-2">
        <Wrench class="h-5 w-5 text-slate-700 dark:text-slate-300" />
        <h2 class="text-2xl font-bold text-slate-900 dark:text-white">Transparent Pricing</h2>
      </div>
      <p class="max-w-3xl text-sm text-slate-600 dark:text-slate-300">
        Pick your device and compare repair options instantly. Every estimate includes labor, quality checks, and warranty details so you know exactly what you are paying for.
      </p>

      <div class="mt-6 grid gap-4 lg:grid-cols-3">
        <article class="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">What Is Included</p>
          <p class="mt-2 text-sm text-slate-700 dark:text-slate-200">Parts, technician labor, diagnostics, and post-repair quality assurance.</p>
        </article>
        <article class="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">Turnaround</p>
          <p class="mt-2 text-sm text-slate-700 dark:text-slate-200">Most standard repairs are finished same day, often within 45-90 minutes.</p>
        </article>
        <article class="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">Warranty</p>
          <p class="mt-2 text-sm text-slate-700 dark:text-slate-200">Coverage included on every service with clear terms shown before checkout.</p>
        </article>
      </div>

      <div class="mt-6">
        <PricingCard />
      </div>
    </section>

    <section class="bg-slate-100 px-4 py-14 dark:bg-slate-900/60 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-6xl grid gap-8 lg:grid-cols-2">
        <article class="overflow-hidden rounded-2xl border border-sky-200 bg-white shadow-xl shadow-sky-200/30 dark:border-sky-900/50 dark:bg-slate-900 dark:shadow-none">
          <img
            src="https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&w=1200&q=80"
            alt="Technician fixing smartphone motherboard"
            class="h-44 w-full object-cover"
          >
          <div class="p-6">
            <p class="inline-flex rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-sky-700 dark:bg-sky-900/50 dark:text-sky-300">
              Premium Repair Experience
            </p>
            <h2 class="mt-3 text-xl font-bold text-slate-900 dark:text-white">Your Phone Back to Perfect, Fast</h2>
            <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Diagnostics, component-level repairs, and full post-repair quality checks in one service flow.
            </p>

            <div class="mt-4 grid gap-2 sm:grid-cols-3">
              <p class="rounded-xl bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200">35+ Repair Points Checked</p>
              <p class="rounded-xl bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200">OEM/Premium Grade Parts</p>
              <p class="rounded-xl bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200">Same-Day Completion</p>
            </div>

            <div class="mt-5 flex flex-wrap gap-3">
              <NuxtLink
                to="/book"
                class="inline-flex items-center justify-center rounded-full bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-500"
              >
                Book Instant Repair
              </NuxtLink>
              <a
                href="#pricing"
                class="inline-flex items-center justify-center rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Compare Repair Costs
              </a>
            </div>
          </div>
        </article>

        <div class="rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-900">
          <h2 class="text-xl font-bold">Why Customers Trust RapidFix</h2>
          <div class="mt-4 space-y-3 text-sm text-slate-700 dark:text-slate-200">
            <p class="flex items-center gap-2"><ShieldCheck class="h-4 w-4 text-emerald-600" /> Certified technicians</p>
            <p class="flex items-center gap-2"><CheckCircle2 class="h-4 w-4 text-emerald-600" /> Warranty on every repair</p>
            <p class="flex items-center gap-2"><LocateFixed class="h-4 w-4 text-emerald-600" /> Walk-ins and same-day bookings</p>
          </div>
          <div class="mt-6 grid gap-3 sm:grid-cols-2">
            <blockquote class="rounded-xl bg-slate-100 p-4 text-sm dark:bg-slate-800">
              "Dropped my phone at lunch and got it back before dinner."
            </blockquote>
            <blockquote class="rounded-xl bg-slate-100 p-4 text-sm dark:bg-slate-800">
              "Battery now lasts all day. Pricing was exactly as quoted."
            </blockquote>
          </div>
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <h2 class="text-2xl font-bold text-slate-900 dark:text-white">Frequently Asked Questions</h2>
      <div class="mt-6 space-y-3">
        <details class="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900" open>
          <summary class="cursor-pointer font-semibold">Do you use OEM-grade parts?</summary>
          <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">Yes. We use OEM or premium-grade compatible parts depending on model and availability.</p>
        </details>
        <details class="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <summary class="cursor-pointer font-semibold">How long does screen replacement take?</summary>
          <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">Most screen replacements are completed within 45 to 90 minutes.</p>
        </details>
        <details class="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <summary class="cursor-pointer font-semibold">What if my phone has water damage?</summary>
          <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">Bring it in immediately. Early diagnostics significantly increase recovery success.</p>
        </details>
      </div>
    </section>

    <section id="location" class="bg-slate-900 px-4 py-14 text-white sm:px-6 lg:px-8">
      <div class="mx-auto max-w-6xl flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 class="text-2xl font-bold">Visit Our Repair Hub</h2>
          <p class="mt-2 text-sm text-slate-300">120 Tech Avenue, Downtown. Open 7 days, 9AM-9PM.</p>
        </div>
        <NuxtLink
          to="/book"
          class="inline-flex items-center justify-center rounded-full bg-rose-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-rose-500"
        >
          Book Appointment
        </NuxtLink>
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