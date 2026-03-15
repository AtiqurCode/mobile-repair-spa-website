<script setup lang="ts">
import { CalendarCheck2, Moon, PhoneCall, Smartphone, Sun } from 'lucide-vue-next'

const colorMode = useColorMode()
const appointmentUrl = 'https://samiul.crm.prosaas.org/public/lead'

const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <div class="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
    <header
      class="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90"
    >
      <nav class="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <NuxtLink to="/" class="inline-flex items-center gap-2 text-base font-extrabold tracking-tight text-slate-900 dark:text-white">
          <span class="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-rose-100 text-rose-600 dark:bg-rose-500/20 dark:text-rose-300">
            <Smartphone class="h-4 w-4" />
          </span>
          <span class="leading-tight">
            RapidFix
            <span class="hidden text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 sm:block">Phone Repair</span>
          </span>
        </NuxtLink>

        <div class="flex items-center gap-2 sm:gap-3">
          <NuxtLink
            to="/products"
            class="hidden rounded-full px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 sm:inline-flex dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            Parts &amp; Products
          </NuxtLink>
          <a
              href="/#pricing"
              class="hidden rounded-full px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 sm:inline-flex dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
            >
              Pricing
            </a>
          <a
              href="/#location"
              class="hidden rounded-full px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 sm:inline-flex dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
            >
              Location
            </a>
          <button
            type="button"
            class="inline-flex items-center justify-center rounded-full bg-slate-100 p-2 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            aria-label="Toggle theme"
            @click="toggleTheme"
          >
            <Sun v-if="colorMode.value === 'dark'" class="h-4 w-4" />
            <Moon v-else class="h-4 w-4" />
          </button>
          <a
            :href="appointmentUrl"
            class="inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100 dark:border-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300 dark:hover:bg-emerald-900/40"
          >
            <CalendarCheck2 class="h-4 w-4" />
            <span class="hidden sm:inline">Appointment</span>
          </a>
          <a
            href="tel:+15551234567"
            class="inline-flex items-center gap-2 rounded-full bg-rose-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-rose-500/30 transition hover:bg-rose-500"
          >
            <PhoneCall class="h-4 w-4" />
            <span class="hidden sm:inline">Call Now</span>
          </a>
        </div>
      </nav>
    </header>

    <main>
      <slot />
    </main>

    <LocationFooter />
  </div>
</template>