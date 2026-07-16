<template>
  <div class="flex flex-col min-h-full">

    <!-- Page header -->
    <header class="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-40 shrink-0">
      <div class="flex items-center gap-5 min-w-0">
        <RouterLink
          :to="{ name: 'patterns', params: { subject } }"
          class="flex items-center gap-1.5 text-blue-600 hover:text-blue-700 text-sm font-medium font-semibold transition shrink-0"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          Patterns
        </RouterLink>

        <div class="min-w-0">
          <div class="flex items-center gap-2 flex-wrap">
            <h1 class="text-xl font-medium text-slate-800 text-lg leading-tight">{{ pattern?.subject }}</h1>
          </div>
          <p class="text-xs font-medium text-slate-400 mt-0.5">Pattern #{{ pattern?.order }} of 30</p>
        </div>
      </div>
      <span class="bg-red-50 text-red-600 border border-red-100 text-xs font-medium px-2.5 py-0.5 rounded-full shrink-0">
        {{ pattern?.risk }}
      </span>
    </header>

    <!-- Practice card -->
    <div class="p-5 flex-grow">

      <!-- Loading -->
      <div v-if="loading" class="bg-white rounded-2xl border border-slate-200 shadow-sm w-full h-64 animate-pulse"></div>

      <!-- Error -->
      <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-xl px-5 py-4 text-sm text-red-700 font-semibold">
        {{ error }}
      </div>

      <div v-else class="bg-white rounded-2xl border border-slate-200 shadow-sm w-full">

        <!-- Tab bar -->
        <div class="flex border-b border-slate-100" role="tablist">
          <button
            v-for="tab in tabs"
            :key="tab.key"
            role="tab"
            :aria-selected="activeTab === tab.key"
            :class="[
              'flex items-center gap-2 py-4 text-sm font-semibold border-b-2 -mb-px transition flex-1 justify-center',
              activeTab === tab.key
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-400 hover:text-slate-600'
            ]"
            @click="activeTab = tab.key"
          >
            <component :is="tab.icon" class="w-4 h-4" aria-hidden="true" />
            {{ tab.label }}
          </button>
        </div>

        <!-- Warning panel -->
        <div v-show="activeTab === 'warning'" class="p-5" role="tabpanel">
          <p class="text-xs font-medium text-slate-500 tracking-widest uppercase mb-1">
            Pattern #{{ pattern.id }} — before you solve
          </p>
          <h2 class="text-lg font-medium font-extrabold text-slate-900 py-2">{{ pattern.title }}</h2>
          <p class="text-slate-500 text-sm font-medium leading-relaxed mb-4">{{ pattern.warningBody }}</p>

          <div class="bg-amber-50 border border-amber-300 rounded-xl p-3 mb-6 text-sm font-medium text-amber-800 leading-relaxed">
            <span class="text-sm font-medium ">⚠️ Pre-warning:</span> {{ pattern.preWarning }}
          </div>

          <div class="mb-4">
            <p class="text-xs font-medium text-slate-500 tracking-widest uppercase mb-2">The question</p>
            <p class="text-lg font-medium text-slate-900 mb-1">{{ pattern.question }}</p>
            <p class="text-xs font-medium text-slate-500 ">{{ pattern.questionHint }}</p>
          </div>

          <!-- Step dots -->
          <div class="flex justify-center gap-2 mb-5 " aria-hidden="true">
            <span class="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
            <span class="w-2.5 h-2.5 rounded-full bg-slate-200"></span>
            <span class="w-2.5 h-2.5 rounded-full bg-slate-200"></span>
          </div>

          <button
            class="w-full bg-blue-700 text-base font-medium hover:bg-blue-800 active:scale-[0.99] text-white font-bold py-3.5 rounded-xl transition flex items-center justify-center gap-2"
            @click="activeTab = 'mistake'"
          >
            Show the mistake
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </button>
        </div>

        <!-- Mistake panel -->
        <div v-show="activeTab === 'mistake'" class="p-5" role="tabpanel">
          <p class="text-xs font-medium text-slate-500 tracking-widest uppercase mb-1">Step 2 — the mistake</p>
          <h2 class="text-lg font-medium font-extrabold text-slate-900 mb-2">What failing students write</h2>

          <div class="bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 font-mono text-sm leading-8 mb-4">
            <div v-for="(line, i) in pattern.mistakeLines" :key="i" class="flex items-baseline gap-3">
              <span :class="line.wrong ? 'text-red-500' : 'text-slate-700'">{{ line.text }}</span>
              <span v-if="line.annotation" class="text-red-400 font-sans text-xs italic">{{ line.annotation }}</span>
            </div>
          </div>

          <div class="bg-red-50 border border-red-200 rounded-xl px-5 py-3 flex items-center gap-3 text-sm text-red-700 mb-6">
            <span class="font-bold shrink-0">✗</span>
            {{ pattern.mistakeExplanation }}
          </div>

          <!-- Step dots -->
          <div class="flex justify-center gap-2 mb-5" aria-hidden="true">
            <span class="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
            <span class="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
            <span class="w-2.5 h-2.5 rounded-full bg-slate-200"></span>
          </div>

          <button
            class="w-full bg-blue-700 text-base font-medium hover:bg-blue-800 active:scale-[0.99] text-white font-bold py-3.5 rounded-xl transition flex items-center justify-center gap-2"
            @click="activeTab = 'correct'"
          >
            Show the correct answer
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </button>
        </div>

        <!-- Correct panel -->
        <div v-show="activeTab === 'correct'" class="p-5" role="tabpanel">
          <p class="text-xs font-medium text-slate-500 tracking-widest uppercase mb-1">Step 3 — correct solution</p>
          <h2 class="text-lg font-medium font-extrabold text-slate-900 mb-4">Full marks answer</h2>

          <div class="bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 font-mono text-sm leading-8 mb-4">
            <div v-for="(line, i) in pattern.correctLines" :key="i">
              <span :class="line.correct ? 'text-emerald-600 font-semibold' : 'text-slate-700'">{{ line.text }}</span>
            </div>
          </div>

          <div class="bg-emerald-50 border border-emerald-200 rounded-xl px-5 py-3 flex items-center gap-3 text-sm font-medium  text-emerald-700 mb-6">
            <span class="shrink-0">✅</span>
            {{ pattern.correctExplanation }}
          </div>

          <!-- Step dots -->
          <div class="flex justify-center gap-2 mb-5" aria-hidden="true">
            <span class="w-2.5 h-2.5 rounded-full bg-slate-200"></span>
            <span class="w-2.5 h-2.5 rounded-full bg-slate-200"></span>
            <span class="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
          </div>

          <!-- Already mastered -->
          <div v-if="isMasteredNow" class="bg-emerald-50 border border-emerald-200 rounded-xl px-5 py-3 flex items-center justify-center gap-2 text-base font-medium text-emerald-700 mb-3">
            <span>✓</span> Mastered — great work!
          </div>

          <!-- Mark as Mastered (logged in, not yet mastered) -->
          <button
            v-else-if="user"
            :disabled="mastering"
            class="w-full bg-emerald-600 text-white hover:bg-emerald-600 active:scale-[0.99] disabled:opacity-60 text-base font-medium py-3.5 rounded-xl transition flex items-center justify-center gap-2 mb-3"
            @click="handleMastered"
          >
            <span v-if="mastering">Saving…</span>
            <span v-else>Mark as Mastered ✓</span>
          </button>

          <!-- Prompt to sign in (not logged in) -->
          <RouterLink
            v-else
            to="/login"
            class="w-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold py-3.5 rounded-xl transition flex items-center justify-center gap-2 mb-3 text-sm"
          >
            Sign in to track your progress
          </RouterLink>

        <RouterLink
          :to="{
            name: 'ai-tutor',
            query: {
              subject,
              patternId,
              from: 'pattern'
            }
          }"
          class="w-full bg-slate-200 border border-slate-200 hover:bg-emerald-400 hover:text-white text-slate-700 text-base font-medium py-3.5 rounded-xl transition flex items-center justify-center gap-2 text-sm"
        >
          Ask AI tutor about this pattern
        </RouterLink>
        </div>

      </div>

      <!-- Related Patterns (BFS) -->
      <div v-if="!loading && relatedPatterns.length" class="mt-6">
        <p class="text-xs font-medium text-slate-500 uppercase tracking-widest mb-3">Related Patterns</p>
        <div class="flex flex-col gap-3">
          <button
            v-for="p in relatedPatterns"
            :key="p.id"
            @click="goToPattern(p.id)"
            class="bg-white border border-slate-200 rounded-xl px-5 py-4 flex items-center justify-between gap-3 hover:shadow-md hover:-translate-y-0.5 transition-all text-left w-full"
          >
            <div class="min-w-0">
              <div class="flex items-center gap-2 flex-wrap mb-0.5">
                <span
                  class="text-xs font-medium font-bold"
                  :class="p.riskLevel === 'high' ? 'text-red-500' : 'text-amber-500'"
                >{{ p.risk }}</span>
                <span class="text-xs font-medium text-slate-400">{{ p.marks }}</span>
              </div>
              <p class="font-semibold text-slate-900 text-sm leading-tight truncate">{{ p.title }}</p>
              <p class="text-xs font-medium text-slate-400 mt-0.5">{{ p.subject }}</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4 text-slate-400 shrink-0" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </button>
        </div>
      </div>

      </div>
    </div>
</template>

<script setup>
import { ref, computed, h, onMounted, watch } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { fetchPatternById } from '@/services/patterns'
import { useAuth } from '@/composables/useAuth'
import { useProgress } from '@/composables/useProgress'
import { bfsRelatedPatterns } from '@/composables/useBFS'
import { patternGraph } from '@/data/patternGraph'
import { mathPatterns } from '@/data/mathPatterns'

const route = useRoute()
const router = useRouter()
const { user } = useAuth()
const { masteredIds, loadProgress, markMastered } = useProgress()

const subject = computed(() => route.params.subject ?? 'math')
const patternId = computed(() => route.query.patternId ?? 'p001')

const pattern = ref(null)
const loading = ref(true)
const error = ref('')
const activeTab = ref('warning')
const mastering = ref(false)

const isMasteredNow = computed(() => masteredIds.value.has(patternId.value))

// BFS — direct neighbors of the current pattern in the graph
const relatedPatterns = computed(() =>
  bfsRelatedPatterns(patternId.value, patternGraph, mathPatterns)
)

const handleMastered = async () => {
  if (!user.value || mastering.value) return
  mastering.value = true
  await markMastered(user.value.uid, patternId.value)
  mastering.value = false
}

const goToPattern = (id) => {
  router.push({ name: 'practice', params: { subject: subject.value }, query: { patternId: id } })
}

const loadPattern = async (id) => {
  loading.value = true
  error.value = ''
  activeTab.value = 'warning'
  try {
    pattern.value = await fetchPatternById(subject.value, id)
    if (!pattern.value) error.value = 'Pattern not found.'
  } catch {
    error.value = 'Could not load this pattern. Please try again.'
  } finally {
    loading.value = false
  }
}

onMounted(() => loadPattern(patternId.value))

// Reload when user navigates to a related pattern
watch(patternId, (newId) => loadPattern(newId))

watch(user, async (u) => {
  await loadProgress(u?.uid)
}, { immediate: true })

const tabs = [
  {
    key: 'warning',
    label: 'Warning',
    icon: {
      render() {
        return h('svg', { xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24', 'stroke-width': '2', stroke: 'currentColor' },
          [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z' })]
        )
      }
    }
  },
  {
    key: 'mistake',
    label: 'Mistake',
    icon: {
      render() {
        return h('svg', { xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24', 'stroke-width': '2', stroke: 'currentColor' },
          [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M6 18 18 6M6 6l12 12' })]
        )
      }
    }
  },
  {
    key: 'correct',
    label: 'Correct',
    icon: {
      render() {
        return h('svg', { xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24', 'stroke-width': '2', stroke: 'currentColor' },
          [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M4.5 12.75l6 6 9-13.5' })]
        )
      }
    }
  }
]

</script>
