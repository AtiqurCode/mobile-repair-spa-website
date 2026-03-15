<script setup lang="ts">
const appointmentUrl = 'https://samiul.crm.prosaas.org/public/lead'
</script>

<template>
  <section id="location" class="bg-slate-900 px-4 py-14 text-white sm:px-6 lg:px-8">
    <div class="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 class="text-2xl font-bold">Visit Our Repair Hub</h2>
        <p class="mt-2 text-sm text-slate-300">120 Tech Avenue, Downtown. Open 7 days, 9AM-9PM.</p>
      </div>
      <a
        :href="appointmentUrl"
        class="inline-flex items-center justify-center rounded-full bg-rose-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-rose-500"
      >
        Book Appointment
      </a>
    </div>
  </section>
</template>
