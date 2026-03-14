<script setup lang="ts">
import { BadgeCheck, BadgeDollarSign, Clock3, ShieldCheck, Sparkles } from 'lucide-vue-next'
import { deviceLabels, formatCurrency, pricingTable, type DeviceType } from '~/composables/usePricing'

const selectedDevice = ref<DeviceType>('iphone')

const repairs = computed(() => pricingTable[selectedDevice.value])
const devices = computed(() => Object.keys(deviceLabels) as DeviceType[])
const startPrice = computed(() => Math.min(...repairs.value.map((item) => item.price)))
</script>

<template>
  <section class="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-900 dark:shadow-slate-950/40 sm:p-7">
    <div class="mb-7 rounded-2xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-cyan-50 p-4 dark:border-emerald-800/50 dark:from-emerald-950/40 dark:to-cyan-950/30">
      <p class="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">Quick Estimate</p>
      <div class="mt-2 flex flex-wrap items-center justify-between gap-3">
        <p class="text-sm text-slate-700 dark:text-slate-200">
          Repairs for <span class="font-semibold text-slate-900 dark:text-white">{{ deviceLabels[selectedDevice] }}</span>
          start at
          <span class="text-lg font-extrabold text-emerald-700">{{ formatCurrency(startPrice) }}</span>
        </p>
        <p class="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
          <Sparkles class="h-3.5 w-3.5 text-amber-500" />
          Same-day service available
        </p>
      </div>
    </div>

    <div class="mb-5 flex flex-wrap gap-2">
      <button
        v-for="device in devices"
        :key="device"
        type="button"
        class="rounded-full px-4 py-2 text-sm font-semibold transition"
        :class="
          selectedDevice === device
            ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
            : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700'
        "
        @click="selectedDevice = device"
      >
        {{ deviceLabels[device] }}
      </button>
    </div>

    <div class="grid gap-4 lg:grid-cols-3">
      <div
        v-for="repair in repairs"
        :key="`${selectedDevice}-${repair.name}`"
        class="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900/70"
      >
        <p class="text-sm font-semibold text-slate-900 dark:text-white">{{ repair.name }}</p>
        <p class="mt-1 min-h-[3.5rem] text-sm text-slate-600 dark:text-slate-300">{{ repair.description }}</p>

        <div class="mt-4 grid grid-cols-2 gap-2 text-xs">
          <p class="flex items-center gap-1 rounded-lg bg-slate-100 px-2.5 py-1.5 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
            <Clock3 class="h-3.5 w-3.5 text-slate-500 dark:text-slate-300" /> {{ repair.eta }}
          </p>
          <p class="flex items-center gap-1 rounded-lg bg-slate-100 px-2.5 py-1.5 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
            <ShieldCheck class="h-3.5 w-3.5 text-emerald-600" /> {{ repair.warranty }}
          </p>
        </div>

        <p class="mt-4 flex items-center gap-1 text-lg font-extrabold text-rose-600">
          <BadgeDollarSign class="h-5 w-5" />
          {{ formatCurrency(repair.price) }}
        </p>

        <p class="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Includes</p>
        <ul class="mt-2 min-h-[5.75rem] space-y-1.5 text-sm text-slate-700 dark:text-slate-200">
          <li v-for="feature in repair.includes" :key="feature" class="flex items-start gap-2">
            <BadgeCheck class="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
            <span>{{ feature }}</span>
          </li>
        </ul>

        <p class="mt-4 rounded-xl bg-slate-50 px-3 py-2 text-xs text-slate-600 dark:bg-slate-800/70 dark:text-slate-300">
          <span class="font-semibold text-slate-700 dark:text-slate-200">Best for:</span> {{ repair.idealFor }}
        </p>
      </div>
    </div>

    <p class="mt-6 text-xs text-slate-500 dark:text-slate-400">
      Estimates are transparent and include labor. Final quote may vary by model generation, part availability, and diagnostic findings.
    </p>
  </section>
</template>