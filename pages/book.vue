<script setup lang="ts">
import { LoaderCircle } from 'lucide-vue-next'

const config = useRuntimeConfig()
const bookingUrl = config.public.bookingUrl

onMounted(() => {
  setTimeout(() => {
    window.location.href = bookingUrl
  }, 1400)
})
</script>

<template>
  <section class="flex min-h-[70vh] items-center justify-center px-4">
    <div class="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl shadow-slate-200/70 dark:border-slate-800 dark:bg-slate-900 dark:shadow-slate-950/40">
      <LoaderCircle class="mx-auto h-9 w-9 animate-spin text-rose-600" />
      <h1 class="mt-4 text-xl font-bold text-slate-900 dark:text-white">Redirecting to Booking System...</h1>
      <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">
        If the redirect takes too long,
        <a :href="bookingUrl" class="font-semibold text-rose-600 underline">tap here</a>.
      </p>
    </div>
  </section>
</template>