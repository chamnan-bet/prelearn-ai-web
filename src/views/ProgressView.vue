<template>
  <div class="flex flex-col min-h-full">

    <!-- Page header -->
    <header class="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-40 shrink-0">
      <div>
        <h1 class="font-black text-slate-900 text-lg leading-tight">My Progress</h1>
        <p class="text-xs text-slate-400 mt-0.5">Bac II readiness score</p>
      </div>
      <div class="flex items-center gap-2">
        <button class="w-10 h-10 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-500 hover:bg-blue-100 transition" aria-label="Profile">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
          </svg>
        </button>
        <button class="w-10 h-10 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-400 hover:bg-amber-100 transition" aria-label="Notifications">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
            <path fill-rule="evenodd" d="M5.25 9a6.75 6.75 0 0 1 13.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 1 1-7.48 0 24.585 24.585 0 0 1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    </header>

    <main class="p-6 flex-grow">

      <!-- Stats row: streak card + 4 stat boxes -->
      <div class="flex flex-col md:flex-row gap-4 mb-7">

        <!-- Streak card -->
        <div class="bg-orange-400 rounded-2xl px-6 py-7 text-white flex flex-col items-center justify-center text-center md:w-48 shrink-0">
          <span class="text-5xl mb-2" aria-hidden="true">🔥</span>
          <p class="text-3xl font-black leading-none mb-1">{{ streakDays }} {{ streakDays === 1 ? 'day' : 'days' }}</p>
          <p class="text-orange-100 text-xs font-semibold">Study streak — keep it up!</p>
        </div>

        <!-- 4 stat boxes -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 flex-grow">
          <div class="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col">
            <div class="text-3xl font-black text-slate-900 mb-1">{{ masteredCount }}</div>
            <p class="text-slate-400 text-xs font-medium mb-3 flex-grow">Patterns mastered</p>
            <p class="text-emerald-500 text-xs font-bold">+{{ masteredThisWeek }} this week</p>
          </div>
          <div class="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col">
            <div class="text-3xl font-black text-emerald-500 mb-1">{{ predictedScore }}%</div>
            <p class="text-slate-400 text-xs font-medium mb-3 flex-grow">Predicted score</p>
            <p class="text-emerald-500 text-xs font-bold">+{{ predictedScoreDiff }}% this week</p>
          </div>
          <div class="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col">
            <div class="text-3xl font-black text-slate-900 mb-1">{{ patternsRemaining }}</div>
            <p class="text-slate-400 text-xs font-medium mb-3 flex-grow">Patterns remaining</p>
            <p class="text-orange-500 text-xs font-bold">Focus on Math</p>
          </div>
          <div class="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col">
            <div class="text-3xl font-black text-slate-900 mb-1">+{{ marksSaved }}</div>
            <p class="text-slate-400 text-xs font-medium mb-3 flex-grow">Marks saved so far</p>
            <p class="text-red-400 text-xs font-bold">vs. before PreLearn</p>
          </div>
        </div>
      </div>

      <!-- Weak areas -->
      <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">
        Weak areas — study these next
      </p>
      <div class="bg-white rounded-2xl border border-slate-200 shadow-sm mb-6">
        <div
          v-for="area in weakAreas"
          :key="area.name"
          class="flex items-center gap-4 px-5 py-4 border-b border-slate-100 last:border-0"
        >
          <span :class="['w-2.5 h-2.5 rounded-full shrink-0', area.dotClass]" aria-hidden="true"></span>
          <span class="text-slate-800 text-sm font-semibold flex-grow">{{ area.name }}</span>
          <span class="text-xs font-bold text-red-400 whitespace-nowrap">{{ area.marks }}</span>
        </div>
      </div>

      <!-- CTA -->
      <RouterLink
        :to="{ name: 'patterns', params: { subject: 'math' } }"
        class="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 active:scale-[0.98] text-white font-bold px-7 py-3.5 rounded-xl transition"
      >
        Study weak areas
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
        </svg>
      </RouterLink>

    </main>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import { useProgress } from '@/composables/useProgress'
import { mathPatterns } from '@/data/mathPatterns'

const { user } = useAuth()
const { masteredIds, progressDates, loadProgress } = useProgress()

watch(user, async (u) => {
  await loadProgress(u?.uid)
}, { immediate: true })

const parseMarks = (str) => {
  const m = str?.match(/(\d+)/)
  return m ? parseInt(m[1]) : 1
}

// 1. Streak Calculation
const streakDays = computed(() => {
  const dates = Array.from(progressDates.value.values())
  if (!dates.length) return 0

  const pad = (n) => String(n).padStart(2, '0')
  const toLocalDateStr = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`

  const uniqueDays = new Set(dates.map(toLocalDateStr))
  const todayStr = toLocalDateStr(new Date())
  const yesterday = new Date(Date.now() - 86400000)
  const yesterdayStr = toLocalDateStr(yesterday)

  if (!uniqueDays.has(todayStr) && !uniqueDays.has(yesterdayStr)) {
    return 0
  }

  let streak = 0
  let currentCheck = uniqueDays.has(todayStr) ? new Date() : yesterday

  while (true) {
    const checkStr = toLocalDateStr(currentCheck)
    if (uniqueDays.has(checkStr)) {
      streak++
      currentCheck.setDate(currentCheck.getDate() - 1)
    } else {
      break
    }
  }
  return streak
})

// 2. Patterns Mastered
const masteredCount = computed(() => masteredIds.value.size)

const masteredThisWeek = computed(() => {
  const sevenDaysAgo = Date.now() - 7 * 86400000
  return Array.from(progressDates.value.values()).filter(d => d.getTime() >= sevenDaysAgo).length
})

// 3. Predicted Score
const predictedScore = computed(() => Math.round(50 + (masteredCount.value / 30) * 50))

const predictedScoreDiff = computed(() => {
  const countBeforeThisWeek = Math.max(0, masteredCount.value - masteredThisWeek.value)
  const scoreBeforeThisWeek = Math.round(50 + (countBeforeThisWeek / 30) * 50)
  return predictedScore.value - scoreBeforeThisWeek
})

// 4. Patterns Remaining
const patternsRemaining = computed(() => Math.max(0, 30 - masteredCount.value))

// 5. Marks Saved
const marksSaved = computed(() => {
  let total = 0
  mathPatterns.forEach(p => {
    if (masteredIds.value.has(p.id)) {
      total += parseMarks(p.marks)
    }
  })
  return total
})

// 6. Weak Areas
const weakAreas = computed(() => {
  const unmastered = mathPatterns.filter(p => !masteredIds.value.has(p.id))
  // Sort descending by marks at risk
  const sorted = [...unmastered].sort((a, b) => parseMarks(b.marks) - parseMarks(a.marks))
  
  const riskColorMap = {
    high: 'bg-red-500',
    medium: 'bg-orange-400',
    low: 'bg-slate-300'
  }

  return sorted.slice(0, 4).map(p => ({
    name: `${p.subject} — ${p.title}`,
    marks: `−${parseMarks(p.marks)} mark risk`,
    dotClass: riskColorMap[p.riskLevel] || 'bg-slate-300'
  }))
})
</script>
