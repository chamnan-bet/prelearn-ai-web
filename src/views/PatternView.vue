<template>
  <div class="flex flex-col min-h-full">

   <header class="bg-white border-b border-slate-200 px-4 py-3 sticky top-0 z-40">
  <div class="flex items-center justify-between">
    <!-- Left side -->
    <div class="flex items-center gap-4">
      <!-- <RouterLink
        to="/"
        class="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
      >
        <svg xmlns="http://www.w3.org/2000/svg"
             fill="none"
             viewBox="0 0 24 24"
             stroke-width="2.5"
             stroke="currentColor"
             class="w-4 h-4">
          <path stroke-linecap="round"
                stroke-linejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>
        Home
      </RouterLink> -->
      <div></div>
      <div class="flex flex-col">
        <h1 class="text-xl font-medium text-slate-800">
          Patterns
        </h1>

        <p class="text-xs text-blue-500 mt-1">
          {{ allPatterns.length }} failure patterns
        </p>
      </div>
    </div>
<span
  class="text-xs font-semibold px-3 py-1 rounded-full bg-blue-100 text-blue-600 capitalize"
>
  {{ $route.query.from === 'subject' ? subject : 'All' }}
</span>
  </div>


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
      <section v-else class="mb-6" aria-labelledby="high-risk-heading">
        <h2 id="high-risk-heading" class="text-xs font-medium text-amber-600 tracking-widest uppercase mb-4">
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
            <div class="flex-grow p-4 min-w-0">
              <h3 class="font-bold text-slate-900 text-sm font-medium flex items-center gap-1.5 mb-1">
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
        <h2 id="medium-risk-heading" class="text-xs font-medium text-slate-400 tracking-widest uppercase mb-3">
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
              <h3 class="font-bold text-slate-900 text-sm font-medium flex items-center gap-1.5 mb-1">
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
