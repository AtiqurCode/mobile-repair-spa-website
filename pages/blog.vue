<script setup lang="ts">
import { ArrowRight, BookOpen } from 'lucide-vue-next'

useHead({ title: 'Blog — RapidFix Phone Repair' })

const blogPosts = [
  {
    id: 1,
    date: '2024-08-29',
    category: 'Repair Tips',
    title: 'Why OEM Parts Make a Difference in Phone Repairs',
    excerpt: 'Using genuine OEM parts vs. aftermarket components can significantly affect your device\'s longevity and performance after repair. We break down why quality parts matter and what to look for.',
    image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&w=900&q=80',
    readTime: '4 min read',
  },
  {
    id: 2,
    date: '2024-08-08',
    category: 'Battery Health',
    title: 'How to Keep Your Phone Battery Healthy for Longer',
    excerpt: 'Simple habits like avoiding extreme temperatures, partial charging cycles, and genuine chargers can extend battery life by years. Our technicians share their top battery health tips.',
    image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=900&q=80',
    readTime: '3 min read',
  },
  {
    id: 3,
    date: '2024-07-31',
    category: 'Water Damage',
    title: 'Water Damage: What to Do in the First 5 Minutes',
    excerpt: 'Quick action matters. Don\'t charge it, don\'t press buttons, and get it to a repair shop as soon as possible. Our guide walks you through every critical step to maximize recovery success.',
    image: 'https://images.unsplash.com/photo-1517241034903-9a4c3ab12f00?auto=format&fit=crop&w=900&q=80',
    readTime: '5 min read',
  },
  {
    id: 4,
    date: '2024-07-23',
    category: 'Industry',
    title: 'How AI is Improving Mobile Device Diagnostics',
    excerpt: 'Modern repair shops are leveraging AI-based diagnostic tools to pinpoint faults faster and more accurately than ever before, leading to better first-fix rates and happier customers.',
    image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&w=900&q=80',
    readTime: '6 min read',
  },
  {
    id: 5,
    date: '2024-06-12',
    category: 'Screen Care',
    title: 'Top 5 Ways to Protect Your Phone Screen',
    excerpt: 'A screen protector is just the start. We share five proven methods to keep your display scratch-free, crack-free, and crystal clear for longer — whether you use a case or not.',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80',
    readTime: '4 min read',
  },
  {
    id: 6,
    date: '2024-05-01',
    category: 'Industry',
    title: 'The Future of Phone Repair: Same-Day Service and Beyond',
    excerpt: 'The phone repair industry is evolving. From automated diagnostics to on-demand home visit repair, find out what the next generation of mobile repair looks like and how RapidFix is leading the way.',
    image: 'https://images.unsplash.com/photo-1562408590-e32931084e23?auto=format&fit=crop&w=900&q=80',
    readTime: '5 min read',
  },
]

const categories = ['All', 'Repair Tips', 'Battery Health', 'Water Damage', 'Screen Care', 'Industry']
const activeCategory = ref('All')

const filteredPosts = computed(() =>
  activeCategory.value === 'All'
    ? blogPosts
    : blogPosts.filter((p) => p.category === activeCategory.value),
)
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 px-4 py-14 text-white sm:px-6 lg:px-8">
      <div class="mx-auto max-w-7xl text-center">
        <p class="inline-flex items-center gap-2 rounded-full border border-amber-300/30 bg-amber-500/15 px-3 py-1 text-xs font-semibold tracking-wide text-amber-200">
          <BookOpen class="h-3.5 w-3.5" /> Blog
        </p>
        <h1 class="mt-4 text-3xl font-extrabold sm:text-4xl">Latest Blog</h1>
        <p class="mx-auto mt-3 max-w-2xl text-sm text-slate-300 sm:text-base">
          Stay informed with the latest repair tips, device care guides, industry trends, and updates from our expert team.
        </p>
      </div>
    </section>

    <!-- Category filter -->
    <section class="border-b border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-950 sm:px-6 lg:px-8">
      <div class="mx-auto flex max-w-7xl flex-wrap gap-2">
        <button
          v-for="cat in categories"
          :key="cat"
          type="button"
          class="rounded-full px-4 py-1.5 text-sm font-semibold transition"
          :class="
            activeCategory === cat
              ? 'bg-rose-600 text-white'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700'
          "
          @click="activeCategory = cat"
        >
          {{ cat }}
        </button>
      </div>
    </section>

    <!-- Blog grid -->
    <section class="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="post in filteredPosts"
          :key="post.id"
          class="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
        >
          <div class="overflow-hidden">
            <img
              :src="post.image"
              :alt="post.title"
              class="h-48 w-full object-cover transition duration-300 group-hover:scale-105"
            >
          </div>
          <div class="flex flex-1 flex-col p-5">
            <div class="mb-2 flex items-center gap-2 text-xs">
              <span class="rounded-full bg-rose-100 px-2.5 py-1 font-semibold text-rose-700 dark:bg-rose-900/40 dark:text-rose-300">
                {{ post.category }}
              </span>
              <span class="text-slate-400">{{ post.date }}</span>
              <span class="text-slate-400">·</span>
              <span class="text-slate-400">{{ post.readTime }}</span>
            </div>
            <h2 class="font-bold leading-snug text-slate-900 dark:text-white">{{ post.title }}</h2>
            <p class="mt-2 flex-1 text-sm text-slate-600 dark:text-slate-300 line-clamp-3">{{ post.excerpt }}</p>
            <div class="mt-5">
              <span class="inline-flex cursor-pointer items-center gap-1 text-xs font-bold uppercase tracking-wide text-rose-600 hover:text-rose-500 dark:text-rose-400">
                Read More <ArrowRight class="h-3.5 w-3.5" />
              </span>
            </div>
          </div>
        </article>
      </div>

      <div v-if="filteredPosts.length === 0" class="py-20 text-center text-slate-400">
        No posts in this category yet.
      </div>
    </section>
  </div>
</template>
