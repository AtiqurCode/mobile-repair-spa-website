<script setup lang="ts">
type BadgeTone = 'rose' | 'emerald' | 'slate'

export type PreviewBadge = { label: string; tone?: BadgeTone }
export type PreviewCta = { label: string; to: any }

const props = defineProps<{
  open: boolean
  title: string
  subtitle?: string
  image?: string
  priceText?: string
  badges?: PreviewBadge[]
  description?: string
  bullets?: string[]
  specs?: Record<string, string>
  primaryCta?: PreviewCta
}>()

const emit = defineEmits<{ close: [] }>()

const badgeToneClasses: Record<BadgeTone, string> = {
  rose: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
  emerald: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  slate: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200',
}

function onEscape(e: KeyboardEvent) {
  if (e.key === 'Escape') emit('close')
}

watch(
  () => props.open,
  (open) => {
    if (!import.meta.client) return
    if (open) window.addEventListener('keydown', onEscape)
    else window.removeEventListener('keydown', onEscape)
  },
  { immediate: true },
)

onUnmounted(() => {
  if (!import.meta.client) return
  window.removeEventListener('keydown', onEscape)
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="open"
        class="fixed inset-0 z-[80] flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center sm:p-4"
        @click.self="emit('close')"
      >
        <Transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95"
          enter-to-class="translate-y-0 opacity-100 sm:scale-100"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div
            v-if="open"
            class="relative w-full max-h-[92vh] overflow-y-auto rounded-t-3xl bg-white shadow-2xl dark:bg-slate-900 sm:max-w-2xl sm:rounded-3xl"
          >
            <button
              type="button"
              class="absolute right-4 top-4 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
              aria-label="Close"
              @click="emit('close')"
            >
              <span class="text-base leading-none">×</span>
            </button>

            <div v-if="image" class="relative h-56 overflow-hidden rounded-t-3xl bg-slate-100 dark:bg-slate-800 sm:h-64">
              <img :src="image" :alt="title" class="h-full w-full object-cover" />
            </div>

            <div class="p-5 sm:p-7">
              <p v-if="subtitle" class="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
                {{ subtitle }}
              </p>

              <div class="mt-1 flex flex-wrap items-start justify-between gap-3">
                <h2 class="text-xl font-bold text-slate-900 dark:text-white">{{ title }}</h2>
                <p v-if="priceText" class="text-lg font-extrabold text-rose-600">{{ priceText }}</p>
              </div>

              <div v-if="badges?.length" class="mt-3 flex flex-wrap gap-2">
                <span
                  v-for="b in badges"
                  :key="b.label"
                  class="rounded-full px-2.5 py-0.5 text-xs font-semibold"
                  :class="badgeToneClasses[b.tone ?? 'slate']"
                >
                  {{ b.label }}
                </span>
              </div>

              <p v-if="description" class="mt-4 text-sm text-slate-700 dark:text-slate-300">
                {{ description }}
              </p>

              <div v-if="bullets?.length" class="mt-5">
                <p class="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Highlights</p>
                <ul class="mt-2 space-y-1.5">
                  <li v-for="x in bullets" :key="x" class="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-200">
                    <span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-600" />
                    <span>{{ x }}</span>
                  </li>
                </ul>
              </div>

              <div v-if="specs && Object.keys(specs).length" class="mt-5">
                <p class="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Details</p>
                <div class="mt-2 divide-y divide-slate-100 rounded-xl border border-slate-200 dark:divide-slate-800 dark:border-slate-700">
                  <div
                    v-for="(val, key) in specs"
                    :key="key"
                    class="flex items-center justify-between gap-4 px-4 py-2.5 text-sm"
                  >
                    <span class="text-slate-500 dark:text-slate-400">{{ key }}</span>
                    <span class="font-semibold text-slate-900 dark:text-white">{{ val }}</span>
                  </div>
                </div>
              </div>

              <div v-if="primaryCta" class="mt-6">
                <NuxtLink
                  :to="primaryCta.to"
                  class="inline-flex w-full items-center justify-center rounded-full bg-rose-600 py-3 text-sm font-semibold text-white transition hover:bg-rose-500"
                >
                  {{ primaryCta.label }}
                </NuxtLink>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

