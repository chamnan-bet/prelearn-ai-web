<template>
  <div class="flex flex-col min-h-full">

    <!-- Page header -->
    <header class="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-40 shrink-0">
      <div class="flex items-center gap-5 min-w-0">
        <RouterLink
          :to="{ name: 'patterns', params: { subject } }"
          class="flex items-center gap-1.5 text-slate-500 hover:text-slate-700 text-sm font-semibold transition shrink-0"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          Back
        </RouterLink>

        <div class="min-w-0">
          <div class="flex items-center gap-2 flex-wrap">
            <h1 class="font-bold text-slate-900 text-lg leading-tight">{{ pattern.subject }}</h1>
            <span class="bg-red-50 text-red-600 border border-red-100 text-xs font-bold px-2.5 py-0.5 rounded-full shrink-0">
              {{ pattern.risk }}
            </span>
          </div>
          <p class="text-xs text-slate-400 mt-0.5">Pattern #{{ pattern.id }} of 30</p>
        </div>
      </div>

      <button class="w-10 h-10 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-400 hover:bg-amber-100 transition shrink-0 ml-4" aria-label="Notifications">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
          <path fill-rule="evenodd" d="M5.25 9a6.75 6.75 0 0 1 13.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 1 1-7.48 0 24.585 24.585 0 0 1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z" clip-rule="evenodd" />
        </svg>
      </button>
    </header>

    <!-- Practice card -->
    <div class="p-6 flex-grow">

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
              'flex items-center gap-2 px-6 py-4 text-sm font-semibold border-b-2 -mb-px transition flex-1 justify-center',
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
        <div v-show="activeTab === 'warning'" class="p-6" role="tabpanel">
          <p class="text-[10px] font-black text-slate-400 tracking-widest uppercase mb-1">
            Pattern #{{ pattern.id }} — before you solve
          </p>
          <h2 class="text-xl font-extrabold text-slate-900 mb-3">{{ pattern.title }}</h2>
          <p class="text-slate-500 text-sm leading-relaxed mb-5">{{ pattern.warningBody }}</p>

          <div class="bg-amber-50 border border-amber-200 rounded-xl px-5 py-4 mb-6 text-sm text-amber-800 leading-relaxed">
            <span class="font-bold">⚠️ Pre-warning:</span> {{ pattern.preWarning }}
          </div>

          <div class="mb-6">
            <p class="text-[10px] font-black text-slate-400 tracking-widest uppercase mb-2">The question</p>
            <p class="text-xl font-bold text-slate-900 mb-1">{{ pattern.question }}</p>
            <p class="text-sm text-slate-400">{{ pattern.questionHint }}</p>
          </div>

          <!-- Step dots -->
          <div class="flex justify-center gap-2 mb-5" aria-hidden="true">
            <span class="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
            <span class="w-2.5 h-2.5 rounded-full bg-slate-200"></span>
            <span class="w-2.5 h-2.5 rounded-full bg-slate-200"></span>
          </div>

          <button
            class="w-full bg-blue-700 hover:bg-blue-800 active:scale-[0.99] text-white font-bold py-3.5 rounded-xl transition flex items-center justify-center gap-2"
            @click="activeTab = 'mistake'"
          >
            I understand — show the mistake
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </button>
        </div>

        <!-- Mistake panel -->
        <div v-show="activeTab === 'mistake'" class="p-6" role="tabpanel">
          <p class="text-[10px] font-black text-slate-400 tracking-widest uppercase mb-1">Step 2 — the mistake</p>
          <h2 class="text-xl font-extrabold text-slate-900 mb-5">What failing students write</h2>

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
            class="w-full bg-blue-700 hover:bg-blue-800 active:scale-[0.99] text-white font-bold py-3.5 rounded-xl transition flex items-center justify-center gap-2"
            @click="activeTab = 'correct'"
          >
            Show the correct answer
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </button>
        </div>

        <!-- Correct panel -->
        <div v-show="activeTab === 'correct'" class="p-6" role="tabpanel">
          <p class="text-[10px] font-black text-slate-400 tracking-widest uppercase mb-1">Step 3 — correct solution</p>
          <h2 class="text-xl font-extrabold text-slate-900 mb-5">Full marks answer</h2>

          <div class="bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 font-mono text-sm leading-8 mb-4">
            <div v-for="(line, i) in pattern.correctLines" :key="i">
              <span :class="line.correct ? 'text-emerald-600 font-semibold' : 'text-slate-700'">{{ line.text }}</span>
            </div>
          </div>

          <div class="bg-emerald-50 border border-emerald-200 rounded-xl px-5 py-3 flex items-center gap-3 text-sm text-emerald-700 mb-6">
            <span class="shrink-0">✅</span>
            {{ pattern.correctExplanation }}
          </div>

          <!-- Step dots -->
          <div class="flex justify-center gap-2 mb-5" aria-hidden="true">
            <span class="w-2.5 h-2.5 rounded-full bg-slate-200"></span>
            <span class="w-2.5 h-2.5 rounded-full bg-slate-200"></span>
            <span class="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
          </div>

          <RouterLink
            :to="{ name: 'ai-tutor', query: { subject: subject, patternId: patternId } }"
            class="w-full bg-blue-700 hover:bg-blue-800 active:scale-[0.99] text-white font-bold py-3.5 rounded-xl transition flex items-center justify-center gap-2"
          >
            Ask AI Tutor
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </RouterLink>
        </div>

      </div>

      </div>
    </div>
</template>

<script setup>
import { ref, computed, h, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { fetchPatternById } from '@/services/patterns'

const route = useRoute()

const subject = computed(() => route.params.subject ?? 'math')
const patternId = computed(() => route.query.patternId ?? 'p001')

const pattern = ref(null)
const loading = ref(true)
const error = ref('')
const activeTab = ref('warning')

onMounted(async () => {
  try {
    pattern.value = await fetchPatternById(subject.value, patternId.value)
    if (!pattern.value) error.value = 'Pattern not found.'
  } catch (e) {
    error.value = 'Could not load this pattern. Please try again.'
  } finally {
    loading.value = false
  }
})

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
