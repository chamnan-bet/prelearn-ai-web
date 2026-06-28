<template>
  <div class="flex flex-col min-h-full">

    <!-- Page header -->
    <header class="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-40 shrink-0">
      <div class="flex items-center gap-5 min-w-0">
        <RouterLink
          to="/"
          class="flex items-center gap-1.5 text-slate-500 hover:text-slate-700 text-sm font-semibold transition shrink-0"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          Back
        </RouterLink>

        <div class="min-w-0">
          <div class="flex items-center gap-2 flex-wrap">
            <h1 class="font-bold text-slate-900 text-lg leading-tight">{{ subjectLabel }} Patterns</h1>
            <span class="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-500 capitalize shrink-0">
              {{ subject }}
            </span>
          </div>
          <p class="text-xs text-slate-400 mt-0.5">{{ allPatterns.length }} failure patterns · tap to learn</p>
        </div>
      </div>

      <button class="w-10 h-10 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-400 hover:bg-amber-100 transition shrink-0 ml-4" aria-label="Notifications">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
          <path fill-rule="evenodd" d="M5.25 9a6.75 6.75 0 0 1 13.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 1 1-7.48 0 24.585 24.585 0 0 1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z" clip-rule="evenodd" />
        </svg>
      </button>
    </header>

    <!-- Pattern list -->
    <div class="p-6 flex-grow">

      <!-- Loading -->
      <div v-if="loading" class="space-y-3">
        <div v-for="n in 4" :key="n" class="bg-white rounded-xl border border-slate-100 h-24 animate-pulse"></div>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-xl px-5 py-4 text-sm text-red-700 font-semibold">
        {{ error }}
      </div>

      <!-- High Risk -->
      <section v-else class="mb-8" aria-labelledby="high-risk-heading">
        <h2 id="high-risk-heading" class="text-[10px] font-black text-amber-600 tracking-widest uppercase mb-3">
          High risk — avoid these first
        </h2>
        <div class="space-y-3">
          <div
            v-for="pattern in highRiskPatterns"
            :key="pattern.id"
            tabindex="0"
            role="button"
            :aria-label="`Study: ${pattern.title}`"
            @click="goToPractice(pattern)"
            @keyup.enter="goToPractice(pattern)"
            :class="['bg-white rounded-xl border border-slate-100 border-l-4 flex items-center hover:shadow-md transition-shadow cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-blue-400', borderClass(pattern)]"
          >
            <div class="flex-grow p-5 min-w-0">
              <h3 class="font-bold text-slate-900 text-sm flex items-center gap-1.5 mb-1">
                <span aria-hidden="true">⚠️</span>
                {{ pattern.title }}
              </h3>
              <p class="text-slate-500 text-xs mb-3 leading-relaxed">{{ pattern.description }}</p>
              <div class="flex items-center gap-2">
                <span :class="['text-xs font-semibold px-2 py-0.5 rounded-md', badgeClass(pattern)]">{{ pattern.risk }}</span>
                <span class="text-xs text-slate-400">{{ pattern.marks }}</span>
              </div>
            </div>
            <div class="shrink-0 pr-5">
              <span class="inline-flex items-center gap-1 bg-blue-50 hover:bg-blue-100 text-blue-600 font-semibold text-xs px-3 py-1.5 rounded-lg transition">
                Study
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-3 h-3">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </section>

      <!-- Medium Risk -->
      <section v-if="!loading && !error" aria-labelledby="medium-risk-heading">
        <h2 id="medium-risk-heading" class="text-[10px] font-black text-slate-400 tracking-widest uppercase mb-3">
          Medium risk
        </h2>
        <div class="space-y-3">
          <div
            v-for="pattern in lowerRiskPatterns"
            :key="pattern.id"
            tabindex="0"
            role="button"
            :aria-label="`Study: ${pattern.title}`"
            @click="goToPractice(pattern)"
            @keyup.enter="goToPractice(pattern)"
            :class="['bg-white rounded-xl border border-slate-100 border-l-4 flex items-center hover:shadow-md transition-shadow cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-blue-400', borderClass(pattern)]"
          >
            <div class="flex-grow p-5 min-w-0">
              <h3 class="font-bold text-slate-900 text-sm flex items-center gap-1.5 mb-1">
                <span aria-hidden="true">⚠️</span>
                {{ pattern.title }}
              </h3>
              <p class="text-slate-500 text-xs mb-3 leading-relaxed">{{ pattern.description }}</p>
              <div class="flex items-center gap-2">
                <span :class="['text-xs font-semibold px-2 py-0.5 rounded-md', badgeClass(pattern)]">{{ pattern.risk }}</span>
                <span class="text-xs text-slate-400">{{ pattern.marks }}</span>
              </div>
            </div>
            <div class="shrink-0 pr-5">
              <span class="inline-flex items-center gap-1 bg-blue-50 hover:bg-blue-100 text-blue-600 font-semibold text-xs px-3 py-1.5 rounded-lg transition">
                Study
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-3 h-3">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { fetchPatterns } from '@/services/patterns'

const route = useRoute()
const router = useRouter()

const subject = computed(() => route.params.subject ?? 'math')
const allPatterns = ref([])
const loading = ref(true)
const error = ref('')

const subjectLabel = computed(() => {
  const labels = {
    math: 'Math', physics: 'Physics', chemistry: 'Chemistry',
    biology: 'Biology', khmer: 'Khmer', history: 'History', english: 'English'
  }
  return labels[subject.value] ?? subject.value
})

onMounted(async () => {
  try {
    allPatterns.value = await fetchPatterns(subject.value)
  } catch {
    error.value = 'Could not load patterns. Please try again.'
  } finally {
    loading.value = false
  }
})

const highRiskPatterns = computed(() => allPatterns.value.filter(p => p.riskLevel === 'high'))
const lowerRiskPatterns = computed(() => allPatterns.value.filter(p => p.riskLevel !== 'high'))

const borderClass = (pattern) => {
  const map = {
    'high':      'border-l-amber-400',
    'high-rose': 'border-l-rose-500',
    'medium':    'border-l-yellow-400',
    'low':       'border-l-sky-300'
  }
  return map[pattern.borderVariant] ?? 'border-l-amber-400'
}

const badgeClass = (pattern) => {
  const map = {
    high:   'bg-red-50 text-red-600',
    medium: 'bg-orange-50 text-orange-600',
    low:    'bg-slate-100 text-slate-500'
  }
  return map[pattern.riskLevel] ?? 'bg-red-50 text-red-600'
}

function goToPractice(pattern) {
  router.push({
    name: 'practice',
    params: { subject: subject.value },
    query: { patternId: pattern.id }
  })
}
</script>
