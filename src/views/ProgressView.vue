<template>
  <main class="w-full max-w-[900px] mx-auto px-4 py-8 flex-grow">

    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-3xl font-extrabold text-slate-900 tracking-tight">My Progress</h1>
        <p class="text-slate-500 mt-1 text-sm">Bac II readiness score</p>
      </div>
      <div class="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm" aria-hidden="true">
        S
      </div>
    </div>

    <!-- Streak card -->
    <div class="mb-6 bg-amber-500 rounded-2xl px-8 py-6 text-white flex items-center gap-5">
      <span class="text-5xl shrink-0" aria-hidden="true">🔥</span>
      <div>
        <div class="text-4xl font-black leading-none mb-1">7 days</div>
        <p class="text-amber-100 font-semibold text-sm">Study streak — keep it up!</p>
      </div>
    </div>

    <!-- Stats grid -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div class="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col">
        <div class="text-3xl font-black text-slate-900 mb-1">12</div>
        <p class="text-slate-500 text-xs font-semibold mb-3 flex-grow">Patterns mastered</p>
        <p class="text-emerald-500 text-xs font-bold">+3 this week</p>
      </div>
      <div class="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col">
        <div class="text-3xl font-black text-slate-900 mb-1">84%</div>
        <p class="text-slate-500 text-xs font-semibold mb-3 flex-grow">Predicted score</p>
        <p class="text-emerald-500 text-xs font-bold">+5% this week</p>
      </div>
      <div class="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col">
        <div class="text-3xl font-black text-slate-900 mb-1">18</div>
        <p class="text-slate-500 text-xs font-semibold mb-3 flex-grow">Patterns remaining</p>
        <p class="text-slate-400 text-xs font-bold">Focus on Math</p>
      </div>
      <div class="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col">
        <div class="text-3xl font-black text-slate-900 mb-1">−9</div>
        <p class="text-slate-500 text-xs font-semibold mb-3 flex-grow">Marks saved so far</p>
        <p class="text-red-400 text-xs font-bold">vs. before PreLearn</p>
      </div>
    </div>

    <!-- Weak areas -->
    <div class="bg-white border border-slate-200 rounded-2xl p-6 mb-8">
      <h2 class="text-xs font-black text-slate-400 uppercase tracking-widest mb-5">
        Weak areas — study these next
      </h2>
      <div class="space-y-1">
        <div
          v-for="area in weakAreas"
          :key="area.name"
          class="flex items-center gap-4 py-3 border-b border-slate-100 last:border-0"
        >
          <span :class="['w-2.5 h-2.5 rounded-full shrink-0', area.dotClass]" aria-hidden="true"></span>
          <span class="text-slate-800 text-sm font-semibold flex-grow">{{ area.name }}</span>
          <span :class="['text-xs font-bold px-2.5 py-1 rounded-md whitespace-nowrap', area.badgeClass]">
            {{ area.marks }}
          </span>
        </div>
      </div>
    </div>

    <!-- CTA -->
    <RouterLink
      :to="{ name: 'patterns', params: { subject: 'math' } }"
      class="w-full bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white font-bold py-4 rounded-2xl transition flex items-center justify-center gap-2"
    >
      Practice weak areas
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
      </svg>
    </RouterLink>

  </main>
</template>

<script setup>
const weakAreas = [
  {
    name: 'Integration — missing +C',
    marks: '−1 mark risk',
    dotClass: 'bg-amber-400',
    badgeClass: 'bg-amber-50 text-amber-700'
  },
  {
    name: 'Logarithm domain check',
    marks: '−2 mark risk',
    dotClass: 'bg-orange-400',
    badgeClass: 'bg-orange-50 text-orange-700'
  },
  {
    name: 'Chain vs product rule',
    marks: '−3 mark risk',
    dotClass: 'bg-red-500',
    badgeClass: 'bg-red-50 text-red-700'
  },
  {
    name: 'Inequality sign flip',
    marks: '−2 mark risk',
    dotClass: 'bg-orange-400',
    badgeClass: 'bg-orange-50 text-orange-700'
  }
]
</script>
