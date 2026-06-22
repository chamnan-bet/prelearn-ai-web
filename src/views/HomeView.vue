<template>
  <div class="flex flex-col min-h-full">

    <!-- Page header -->
    <header class="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-40 shrink-0">
      <div>
        <p class="font-black text-slate-900 text-base leading-tight">PreLearn</p>
        <p class="text-xs text-slate-400">Bac II exam preparation</p>
      </div>
      <div class="flex items-center gap-2">
        <RouterLink
          to="/login"
          class="md:hidden text-xs font-bold text-blue-700 hover:text-blue-800 transition px-3 py-1.5 rounded-xl border border-blue-200 hover:bg-blue-50"
        >
          Sign in
        </RouterLink>
        <button class="w-10 h-10 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-400 hover:bg-amber-100 transition" aria-label="Notifications">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
          <path fill-rule="evenodd" d="M5.25 9a6.75 6.75 0 0 1 13.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 1 1-7.48 0 24.585 24.585 0 0 1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z" clip-rule="evenodd" />
        </svg>
      </button>
      </div>
    </header>

    <main class="p-6 flex-grow">

      <!-- Stats hero card -->
      <div class="mb-7 bg-blue-700 rounded-2xl px-8 py-6 text-white">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-5">
          <div>
            <div class="flex items-baseline gap-1">
              <span class="text-4xl font-black">12</span>
              <span class="text-blue-300 text-xl font-bold">/30</span>
            </div>
            <p class="text-blue-200 text-[10px] font-black uppercase tracking-widest mt-1">Patterns Mastered</p>
          </div>
          <div>
            <div class="text-4xl font-black">84%</div>
            <p class="text-blue-200 text-[10px] font-black uppercase tracking-widest mt-1">Predicted Score</p>
          </div>
          <div>
            <div class="flex items-baseline gap-2">
              <span class="text-4xl font-black">7</span>
              <span class="text-xl">🔥</span>
            </div>
            <p class="text-blue-200 text-[10px] font-black uppercase tracking-widest mt-1">Day Streak</p>
          </div>
          <div>
            <div class="text-4xl font-black">18</div>
            <p class="text-blue-200 text-[10px] font-black uppercase tracking-widest mt-1">Days to Exam</p>
          </div>
        </div>
        <div class="bg-blue-500/40 rounded-full h-2 overflow-hidden mb-2">
          <div class="bg-white rounded-full h-2 transition-all duration-1000" style="width: 40%"></div>
        </div>
        <p class="text-blue-300 text-xs">40% overall progress</p>
      </div>

      <!-- Section label -->
      <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Select Subject</p>

      <!-- Subject cards grid -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-7">
        <div
          v-for="subject in subjects"
          :key="subject.id"
          tabindex="0"
          role="button"
          :aria-label="`Go to ${subject.name} patterns`"
          @click="goToPatterns(subject.id)"
          @keyup.enter="goToPatterns(subject.id)"
          class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
          :class="{ 'border-blue-300 shadow-md': subject.id === 'math' }"
        >
          <div class="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-2xl mb-3">
            {{ subject.icon }}
          </div>
          <p class="font-bold text-slate-900 text-base leading-tight">{{ subject.name }}</p>
          <p class="text-xs text-slate-400 mb-3 mt-0.5">{{ subject.totalPatterns }} patterns</p>
          <div class="h-1 bg-slate-100 rounded-full overflow-hidden">
            <div
              class="h-full bg-blue-600 rounded-full transition-all duration-700"
              :style="{ width: `${subject.progress}%` }"
            ></div>
          </div>
          <p v-if="subject.progress > 0" class="text-xs text-slate-400 mt-1">{{ subject.progress }}% complete</p>
        </div>
      </div>

      <!-- CTA row -->
      <div class="flex flex-wrap items-center gap-4">
        <button
          @click="goToPatterns('math')"
          class="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 active:scale-[0.98] text-white font-bold px-6 py-3 rounded-xl transition"
        >
          View failure patterns
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </button>
        <button class="font-semibold text-slate-600 hover:text-slate-900 transition text-sm">
          View full schedule
        </button>
      </div>

    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'

const router = useRouter()

const goToPatterns = (subjectId) => {
  router.push({ name: 'patterns', params: { subject: subjectId } })
}

const subjects = ref([
  { id: 'math',      name: 'Mathematics', icon: '📐', progress: 40, totalPatterns: 30 },
  { id: 'physics',   name: 'Physics',     icon: '⚛️', progress: 20, totalPatterns: 22 },
  { id: 'chemistry', name: 'Chemistry',   icon: '🧪', progress: 10, totalPatterns: 18 },
  { id: 'biology',   name: 'Biology',     icon: '🧬', progress: 0,  totalPatterns: 15 }
])
</script>
