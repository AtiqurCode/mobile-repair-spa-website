<script setup lang="ts">
import { CalendarCheck2, Menu, Moon, PhoneCall, Smartphone, Sun, X } from 'lucide-vue-next'

const colorMode = useColorMode()
const appointmentUrl = 'https://samiul.crm.prosaas.org/public/lead'
const mobileMenuOpen = ref(false)

const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]
</script>

<template>
  <div class="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
    <header
      class="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90"
    >
      <nav class="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <NuxtLink to="/" class="inline-flex items-center gap-2 text-base font-extrabold tracking-tight text-slate-900 dark:text-white">
          <span class="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-rose-100 text-rose-600 dark:bg-rose-500/20 dark:text-rose-300">
            <Smartphone class="h-4 w-4" />
          </span>
          <span class="leading-tight">
            RapidFix
            <span class="hidden text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 sm:block">Phone Repair</span>
          </span>
        </NuxtLink>

        <!-- Desktop nav links -->
        <div class="hidden items-center gap-1 lg:flex">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="rounded-full px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            {{ link.label }}
          </NuxtLink>
        </div>

        <div class="flex items-center gap-2 sm:gap-3">
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
            class="hidden items-center gap-2 rounded-full bg-rose-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-rose-500/30 transition hover:bg-rose-500 sm:inline-flex"
          >
            <PhoneCall class="h-4 w-4" />
            <span class="hidden sm:inline">Call Now</span>
          </a>
          <!-- Mobile menu toggle -->
          <button
            type="button"
            class="inline-flex items-center justify-center rounded-full bg-slate-100 p-2 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 lg:hidden"
            aria-label="Open menu"
            @click="mobileMenuOpen = !mobileMenuOpen"
          >
            <X v-if="mobileMenuOpen" class="h-4 w-4" />
            <Menu v-else class="h-4 w-4" />
          </button>
        </div>
      </nav>

      <!-- Mobile drawer -->
      <div v-if="mobileMenuOpen" class="border-t border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-950 lg:hidden">
        <nav class="flex flex-col gap-1">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="rounded-xl px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
            @click="mobileMenuOpen = false"
          >
            {{ link.label }}
          </NuxtLink>
          <a
            href="tel:+15551234567"
            class="mt-2 inline-flex items-center gap-2 rounded-full bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white"
            @click="mobileMenuOpen = false"
          >
            <PhoneCall class="h-4 w-4" /> Call Now
          </a>
        </nav>
      </div>
    </header>

    <main>
      <slot />
    </main>

    <LocationFooter />
  </div>
</template>