<script setup lang="ts">
import { Mail, MapPin, Phone } from 'lucide-vue-next'

</script>

<template>
  <!-- CTA banner -->
  <section id="location" class="bg-rose-600 px-4 py-12 text-white sm:px-6 lg:px-8">
    <div class="mx-auto flex max-w-7xl flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
      <div class="flex-1">
        <h2 class="text-2xl font-bold">Ready to Get Your Device Fixed?</h2>
        <p class="mt-1 text-sm text-rose-100">Same-day service, honest pricing, 12-month warranty. Visit us or book online.</p>
        <p class="mt-1 text-sm text-rose-100">
          <MapPin class="mr-1 inline h-3.5 w-3.5" />120 Tech Avenue, Downtown — Open 7 days, 9AM–9PM
        </p>
      </div>
      <NuxtLink
        to="/book"
        class="inline-flex shrink-0 items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-bold text-rose-600 shadow-lg transition hover:bg-rose-50"
      >
        Book appointment
      </NuxtLink>
    </div>
  </section>

  <!-- Main footer -->
  <footer class="bg-slate-900 px-4 pt-14 pb-8 text-slate-300 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-7xl">
      <div class="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        <!-- Brand -->
        <div class="lg:col-span-1">
          <NuxtLink to="/" class="inline-flex items-center gap-2 text-lg font-extrabold text-white">
            <span class="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-rose-500/20 text-rose-400">
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2" /><line x1="12" y1="18" x2="12" y2="18.01" /></svg>
            </span>
            RapidFix
          </NuxtLink>
          <p class="mt-3 text-sm leading-relaxed text-slate-400">
            RapidFix empowers customers with fast, transparent, and warranty-backed phone repairs. We fix iPhones, Samsung, and more — same day.
          </p>
        </div>

        <!-- Useful Links -->
        <div>
          <h3 class="mb-4 text-sm font-bold uppercase tracking-wider text-white">Useful Links</h3>
          <ul class="space-y-2 text-sm">
            <li><NuxtLink to="/" class="transition hover:text-white">Services</NuxtLink></li>
            <li><NuxtLink to="/about" class="transition hover:text-white">About Us</NuxtLink></li>
            <li><NuxtLink to="/book" class="transition hover:text-white">Book appointment</NuxtLink></li>
            <li><NuxtLink to="/contact" class="transition hover:text-white">Contact Us</NuxtLink></li>
          </ul>
        </div>

        <!-- Contact info -->
        <div>
          <h3 class="mb-4 text-sm font-bold uppercase tracking-wider text-white">Contact</h3>
          <address class="space-y-3 text-sm not-italic">
            <p class="flex items-start gap-2">
              <MapPin class="mt-0.5 h-4 w-4 shrink-0 text-rose-400" />
              120 Tech Avenue, Downtown, New York
            </p>
            <p class="flex items-center gap-2">
              <Phone class="h-4 w-4 shrink-0 text-rose-400" />
              <a href="tel:+15551234567" class="transition hover:text-white">+1 (555) 123-4567</a>
            </p>
            <p class="flex items-center gap-2">
              <Mail class="h-4 w-4 shrink-0 text-rose-400" />
              <a href="mailto:hello@rapidfix.com" class="transition hover:text-white">hello@rapidfix.com</a>
            </p>
          </address>
        </div>
      </div>

      <div class="mt-12 flex flex-col items-center justify-between gap-3 border-t border-slate-800 pt-6 text-xs text-slate-500 sm:flex-row">
        <p>Copyright &copy; {{ new Date().getFullYear() }} RapidFix. All Rights Reserved.</p>
        <p>120 Tech Avenue, Downtown · Open 7 days, 9AM–9PM</p>
      </div>
    </div>
  </footer>
</template>
