<template>
  <main class="w-full max-w-[800px] mx-auto px-4 py-8 flex-grow">

    <!-- Back + Header -->
    <div class="mb-8">
      <RouterLink
        :to="{ name: 'patterns', params: { subject } }"
        class="inline-flex items-center gap-2 text-indigo-600 font-semibold hover:text-indigo-800 transition mb-4 text-sm"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>
        Patterns
      </RouterLink>

      <div class="flex items-start justify-between gap-4">
        <div>
          <h1 class="text-2xl font-extrabold text-slate-900 tracking-tight">
            {{ pattern.subject }}
          </h1>
          <p class="text-slate-400 text-sm mt-0.5">Pattern #{{ pattern.id }} of 30</p>
        </div>
        <span class="bg-red-50 text-red-600 font-bold px-3 py-1 rounded-full text-xs border border-red-100 whitespace-nowrap mt-1">
          {{ pattern.risk }}
        </span>
      </div>
    </div>

    <!-- Tabs -->
    <div class="flex border-b border-slate-200 mb-8" role="tablist">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        role="tab"
        :aria-selected="activeTab === tab.key"
        :aria-controls="`panel-${tab.key}`"
        :id="`tab-${tab.key}`"
        :class="[
          'flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-2 -mb-px transition',
          activeTab === tab.key
            ? 'border-indigo-600 text-indigo-600'
            : 'border-transparent text-slate-400 hover:text-slate-700'
        ]"
        @click="activeTab = tab.key"
      >
        <component :is="tab.icon" class="w-4 h-4" aria-hidden="true" />
        {{ tab.label }}
      </button>
    </div>

    <!-- Warning Panel -->
    <div
      v-show="activeTab === 'warning'"
      id="panel-warning"
      role="tabpanel"
      aria-labelledby="tab-warning"
    >
      <p class="text-xs font-black text-slate-400 tracking-widest uppercase mb-1">
        Pattern #{{ pattern.id }} — before you solve
      </p>
      <h2 class="text-xl font-extrabold text-slate-900 mb-4">{{ pattern.title }}</h2>
      <p class="text-slate-600 text-sm leading-relaxed mb-6">{{ pattern.warningBody }}</p>

      <div class="bg-amber-50 border border-amber-200 rounded-xl px-5 py-4 mb-8 text-sm text-amber-800 leading-relaxed">
        <span class="font-bold">⚠️ Pre-warning:</span> {{ pattern.preWarning }}
      </div>

      <div class="mb-8">
        <p class="text-xs font-black text-slate-400 tracking-widest uppercase mb-3">The question</p>
        <p class="text-xl font-bold text-slate-900 mb-2">{{ pattern.question }}</p>
        <p class="text-sm text-slate-500">{{ pattern.questionHint }}</p>
      </div>

      <button
        class="w-full bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white font-bold py-4 rounded-2xl transition flex items-center justify-center gap-2"
        @click="activeTab = 'mistake'"
      >
        See the common mistake
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
        </svg>
      </button>
    </div>

    <!-- Mistake Panel -->
    <div
      v-show="activeTab === 'mistake'"
      id="panel-mistake"
      role="tabpanel"
      aria-labelledby="tab-mistake"
    >
      <p class="text-xs font-black text-slate-400 tracking-widest uppercase mb-1">Step 2 — the mistake</p>
      <h2 class="text-xl font-extrabold text-slate-900 mb-6">What failing students write</h2>

      <div class="bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 font-mono text-sm leading-8 mb-4">
        <div v-for="(line, i) in pattern.mistakeLines" :key="i">
          <span :class="line.wrong ? 'text-red-500' : 'text-slate-700'">{{ line.text }}</span>
          <span v-if="line.annotation" class="text-slate-400 ml-2 font-sans text-xs">{{ line.annotation }}</span>
        </div>
      </div>

      <div class="bg-red-50 border border-red-200 rounded-xl px-5 py-3 flex items-start gap-3 text-sm text-red-700 mb-8">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 flex-shrink-0 mt-0.5" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
        </svg>
        {{ pattern.mistakeExplanation }}
      </div>

      <!-- Step dots -->
      <div class="flex justify-center gap-2 mb-6" aria-hidden="true">
        <span class="w-2 h-2 rounded-full bg-indigo-600"></span>
        <span class="w-2 h-2 rounded-full bg-indigo-600"></span>
        <span class="w-2 h-2 rounded-full bg-slate-200"></span>
      </div>

      <button
        class="w-full bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white font-bold py-4 rounded-2xl transition flex items-center justify-center gap-2"
        @click="activeTab = 'correct'"
      >
        Show the correct answer
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
        </svg>
      </button>
    </div>

    <!-- Correct Panel -->
    <div
      v-show="activeTab === 'correct'"
      id="panel-correct"
      role="tabpanel"
      aria-labelledby="tab-correct"
    >
      <p class="text-xs font-black text-slate-400 tracking-widest uppercase mb-1">Step 3 — correct solution</p>
      <h2 class="text-xl font-extrabold text-slate-900 mb-6">{{ pattern.correctTitle }}</h2>

      <div class="bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 font-mono text-sm leading-8 mb-4">
        <div v-for="(line, i) in pattern.correctLines" :key="i">
          <span :class="line.correct ? 'text-emerald-600 font-semibold' : 'text-slate-700'">{{ line.text }}</span>
        </div>
      </div>

      <div class="border-l-4 border-emerald-400 bg-emerald-50 rounded-r-xl px-4 py-3 text-sm text-emerald-800 leading-relaxed mb-8">
        ✅ {{ pattern.correctExplanation }}
      </div>

      <!-- Step dots -->
      <div class="flex justify-center gap-2 mb-6" aria-hidden="true">
        <span class="w-2 h-2 rounded-full bg-slate-300"></span>
        <span class="w-2 h-2 rounded-full bg-slate-300"></span>
        <span class="w-2 h-2 rounded-full bg-indigo-600"></span>
      </div>

      <RouterLink
        :to="{ name: 'ai-tutor', query: { subject: subject, patternId: patternId } }"
        class="w-full bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white font-bold py-4 rounded-2xl transition flex items-center justify-center gap-2 mb-3"
      >
        Ask AI Tutor
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
        </svg>
      </RouterLink>

      <button
        class="w-full bg-slate-100 hover:bg-slate-200 active:scale-[0.99] text-slate-700 font-semibold py-4 rounded-2xl transition text-sm"
        @click="activeTab = 'mistake'"
      >
        Back to Mistake
      </button>
    </div>

  </main>
</template>

<script setup>
import { ref, computed, h } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const subject = computed(() => route.params.subject ?? 'math')
const patternId = computed(() => Number(route.query.patternId ?? 1))

const activeTab = ref('warning')

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

// TODO: replace with a Firebase fetch using subject.value + patternId.value
const patternDatabase = {
  1: {
    id: 1,
    subject: 'Quadratic equations',
    risk: 'High risk',
    title: 'Forgetting the second root',
    warningBody: 'Every quadratic equation with x² has exactly two solutions. Many students solve for only the positive root and miss the negative one completely.',
    preWarning: 'When an equation has x², there are always TWO solutions — one positive (+√) and one negative (−√). Many students find only one and lose 3 marks.',
    question: 'Solve: 2(x − 3)² = 8',
    questionHint: 'You have been warned. Think carefully before solving. How many solutions should this have?',
    mistakeLines: [
      { text: '2(x−3)² = 8', wrong: false },
      { text: '(x−3)² = 4', wrong: false },
      { text: 'x−3 = 2', wrong: true, annotation: '← only +root' },
      { text: 'x = 5', wrong: true, annotation: '← WRONG (incomplete)' }
    ],
    mistakeExplanation: 'This loses 3 marks. Only one root was found.',
    correctTitle: 'Both roots required',
    correctLines: [
      { text: '2(x−3)² = 8', correct: false },
      { text: '(x−3)² = 4', correct: false },
      { text: 'x−3 = ±2', correct: false },
      { text: 'x = 5   or   x = 1   ✓', correct: true }
    ],
    correctExplanation: 'Marks saved! Both solutions found. Never miss this again.'
  }
}

const pattern = computed(() => patternDatabase[patternId.value] ?? patternDatabase[1])
</script>