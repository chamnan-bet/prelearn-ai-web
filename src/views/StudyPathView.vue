<template>
  <div class="flex flex-col min-h-full">

    <!-- Header -->
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
          <h1 class="font-bold text-slate-900 text-lg leading-tight">Study Path</h1>
          <p class="text-xs text-slate-400 mt-0.5">Dijkstra-optimised order · {{ remaining }} patterns remaining</p>
        </div>
      </div>
    </header>

    <main class="p-6 flex-grow">

      <!-- Loading -->
      <div v-if="loading" class="flex flex-col gap-3">
        <div v-for="i in 5" :key="i" class="bg-white rounded-2xl border border-slate-200 h-20 animate-pulse"></div>
      </div>

      <!-- All mastered -->
      <div v-else-if="studyPath.length === 0" class="bg-emerald-50 border border-emerald-200 rounded-2xl px-6 py-8 text-center">
        <p class="text-2xl mb-2">🎉</p>
        <p class="font-bold text-emerald-700">All patterns mastered — you are exam ready!</p>
      </div>

      <!-- Dijkstra path -->
      <div v-else class="flex flex-col gap-3">

        <!-- Algorithm label -->
        <div class="flex items-center gap-3 mb-2">
          <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Dijkstra Optimal Path</p>
          <div class="flex-1 h-px bg-slate-200"></div>
          <p class="text-[10px] text-slate-400">{{ masteredCount }}/30 mastered</p>
        </div>

        <div
          v-for="(pattern, index) in studyPath"
          :key="pattern.id"
          class="flex items-center gap-4 bg-white border rounded-2xl px-5 py-4 cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all"
          :class="[
            index === 0 ? 'border-blue-300 shadow-sm' : 'border-slate-200',
            masteredIds.has(pattern.id) ? 'opacity-50' : ''
          ]"
          @click="goToPractice(pattern.id)"
        >
          <!-- Step number -->
          <div
            class="w-9 h-9 rounded-full flex items-center justify-center text-sm font-black shrink-0"
            :class="index === 0 ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-500'"
          >
            {{ masteredIds.has(pattern.id) ? '✓' : index + 1 }}
          </div>

          <!-- Pattern info -->
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 flex-wrap mb-0.5">
              <span
                class="text-[10px] font-bold px-2 py-0.5 rounded-full border"
                :class="pattern.riskLevel === 'high'
                  ? 'bg-red-50 text-red-600 border-red-100'
                  : 'bg-amber-50 text-amber-600 border-amber-100'"
              >{{ pattern.risk }}</span>
              <span class="text-[10px] text-slate-400 font-semibold">{{ pattern.marks }}</span>
              <span v-if="index === 0" class="text-[10px] font-black text-blue-600 uppercase tracking-wide">Start here</span>
            </div>
            <p class="font-semibold text-slate-900 text-sm leading-tight truncate">{{ pattern.title }}</p>
            <p class="text-xs text-slate-400 mt-0.5">{{ pattern.subject }}</p>
          </div>

          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4 text-slate-400 shrink-0" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </div>

      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { fetchPatterns } from '@/services/patterns'
import { useAuth } from '@/composables/useAuth'
import { useProgress } from '@/composables/useProgress'
import { dijkstraStudyPath } from '@/composables/useDijkstra'
import { patternGraph } from '@/data/patternGraph'
import { mathPatterns } from '@/data/mathPatterns'

const router = useRouter()
const { user } = useAuth()
const { masteredIds, loadProgress } = useProgress()

const firestorePatterns = ref([])
const loading = ref(true)

onMounted(async () => {
  firestorePatterns.value = await fetchPatterns('math')
  loading.value = false
})

watch(user, async (u) => {
  await loadProgress(u?.uid)
}, { immediate: true })

// Use Firestore patterns when available (has live masteredCount), fallback to static
const patterns = computed(() =>
  firestorePatterns.value.length ? firestorePatterns.value : mathPatterns
)

// Dijkstra computes the full study path in optimal order
const studyPath = computed(() =>
  dijkstraStudyPath(patterns.value, masteredIds.value, patternGraph)
)

const masteredCount = computed(() => masteredIds.value.size)
const remaining = computed(() => studyPath.value.filter(p => !masteredIds.value.has(p.id)).length)

const goToPractice = (patternId) => {
  router.push({ name: 'practice', params: { subject: 'math' }, query: { patternId } })
}
</script>
