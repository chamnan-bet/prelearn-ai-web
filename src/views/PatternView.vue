<template>
  <main class="w-full max-w-[1280px] mx-auto px-4 py-8 flex-grow">

    <!-- Back + Header -->
    <div class="mb-10">
      <RouterLink
        to="/"
        class="inline-flex items-center gap-2 text-indigo-600 font-semibold hover:text-indigo-800 transition mb-4 text-sm"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>
        Home
      </RouterLink>

      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-extrabold text-slate-900 tracking-tight">
            {{ subjectLabel }} patterns
          </h1>
          <p class="text-slate-500 mt-1 text-sm">
            {{ allPatterns.length }} failure patterns · click a card to practice
          </p>
        </div>
        <span class="bg-blue-50 text-blue-600 font-bold px-4 py-1.5 rounded-full border border-blue-100 text-sm capitalize">
          {{ subject }}
        </span>
      </div>
    </div>

    <!-- High Risk -->
    <section class="mb-10" aria-labelledby="high-risk-heading">
      <h2
        id="high-risk-heading"
        class="text-xs font-black text-amber-600 tracking-widest uppercase mb-4"
      >
        High risk — avoid these first
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <PatternCard
          v-for="pattern in highRiskPatterns"
          :key="pattern.id"
          :pattern="pattern"
          @select="goToPractice"
        />
      </div>
    </section>

    <!-- Medium Risk -->
    <section aria-labelledby="medium-risk-heading">
      <h2
        id="medium-risk-heading"
        class="text-xs font-black text-slate-400 tracking-widest uppercase mb-4"
      >
        Medium risk
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <PatternCard
          v-for="pattern in mediumRiskPatterns"
          :key="pattern.id"
          :pattern="pattern"
          @select="goToPractice"
        />
      </div>
    </section>

  </main>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import PatternCard from '@/components/tutor/PatternCard.vue'

const route = useRoute()
const router = useRouter()

const subject = computed(() => route.params.subject ?? 'math')

const subjectLabel = computed(() => {
  const labels = {
    math: 'Math',
    physics: 'Physics',
    chemistry: 'Chemistry',
    biology: 'Biology',
    khmer: 'Khmer',
    history: 'History',
    english: 'English'
  }
  return labels[subject.value] ?? subject.value
})

// TODO: replace with a Firebase fetch keyed by subject.value
const allPatterns = [
  {
    id: 1,
    title: 'Forgetting the second root',
    description: 'Taking only +√ and missing −√ in quadratic equations.',
    risk: 'High risk',
    riskLevel: 'high',
    marks: '−3 marks avg',
    borderVariant: 'high'
  },
  {
    id: 2,
    title: 'Skipping algebra steps',
    description: 'Jumping steps loses method marks even when the answer is right.',
    risk: 'High risk',
    riskLevel: 'high',
    marks: '−2 marks avg',
    borderVariant: 'high'
  },
  {
    id: 3,
    title: 'Forgetting +C in integration',
    description: 'Omitting the constant of integration is an automatic deduction.',
    risk: 'High risk',
    riskLevel: 'high',
    marks: '−1 mark avg',
    borderVariant: 'high-rose'
  },
  {
    id: 4,
    title: 'Wrong domain for ln(x)',
    description: 'Not checking x > 0 before applying logarithm rules.',
    risk: 'Medium risk',
    riskLevel: 'medium',
    marks: '−1.5 marks avg',
    borderVariant: 'medium'
  }
]

const highRiskPatterns = computed(() => allPatterns.filter(p => p.riskLevel === 'high'))
const mediumRiskPatterns = computed(() => allPatterns.filter(p => p.riskLevel === 'medium'))

function goToPractice(pattern) {
  router.push({
    name: 'practice',
    params: { subject: subject.value },
    query: { patternId: pattern.id }
  })
}
</script>