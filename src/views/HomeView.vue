<template>
  <main class="w-full max-w-[1280px] mx-auto px-4 py-8 flex-grow">

    <!-- Stats hero card -->
    <div class="mb-8 bg-indigo-600 rounded-2xl px-8 py-6 text-white">
      <div class="flex items-center justify-between gap-8">
        <div>
          <div class="flex items-baseline gap-1.5 mb-1">
            <span class="text-4xl font-black">12</span>
            <span class="text-indigo-300 text-xl font-bold">/30</span>
          </div>
          <p class="text-indigo-200 text-xs font-black uppercase tracking-widest">Patterns mastered</p>
        </div>
        <div class="text-right">
          <div class="text-4xl font-black mb-1">84%</div>
          <p class="text-indigo-200 text-xs font-black uppercase tracking-widest">Predicted score</p>
        </div>
      </div>
      <div class="mt-5 bg-indigo-500/60 rounded-full h-2 overflow-hidden">
        <div class="bg-white rounded-full h-2 transition-all duration-1000" style="width: 84%"></div>
      </div>
    </div>

    <!-- Section heading -->
    <div class="mb-6 flex justify-between items-end">
      <div>
        <p class="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Select subject</p>
        <h1 class="text-3xl font-extrabold text-slate-900 tracking-tight">Master the failure patterns</h1>
      </div>
    </div>

    <!-- Subject grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-10">
      <div
        v-for="subject in bacIISubjects"
        :key="subject.id"
        @click="goToPatterns(subject.id)"
        @keyup.enter="goToPatterns(subject.id)"
        tabindex="0"
        class="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col h-full relative overflow-hidden group outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
      >
        <div class="absolute top-0 left-0 w-full h-1 bg-slate-200 group-hover:bg-indigo-500 transition-colors"></div>

        <div class="flex items-start justify-between mb-4">
          <div :class="[subject.bgClass, subject.textClass, 'w-14 h-14 rounded-xl flex items-center justify-center text-3xl font-bold shadow-inner']">
            {{ subject.icon }}
          </div>
          <span v-if="subject.progress > 0" class="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
            {{ subject.progress }}%
          </span>
        </div>

        <h3 class="text-2xl font-bold text-slate-900">{{ subject.name }}</h3>
        <p class="text-base font-medium text-slate-500 mb-8">{{ subject.khmerName }}</p>

        <div class="mt-auto">
          <div class="flex justify-between text-sm font-semibold text-slate-500 mb-2">
            <span>{{ subject.mastered }}/{{ subject.totalPatterns }} Patterns</span>
          </div>
          <div class="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
            <div
              class="h-full rounded-full transition-all duration-1000"
              :class="subject.progress > 0 ? 'bg-indigo-600' : 'bg-slate-300'"
              :style="{ width: `${subject.progress}%` }"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA -->
    <div class="text-center">
      <button
        @click="goToPatterns('math')"
        class="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white font-bold px-10 py-4 rounded-2xl transition"
      >
        View failure patterns
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
        </svg>
      </button>
    </div>

  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const goToPatterns = (subjectId) => {
  router.push({ name: 'patterns', params: { subject: subjectId } })
}

const bacIISubjects = ref([
  {
    id: 'math',
    name: 'Mathematics',
    khmerName: 'គណិតវិទ្យា',
    icon: '📐',
    progress: 84,
    mastered: 12,
    totalPatterns: 30,
    bgClass: 'bg-blue-100',
    textClass: 'text-blue-600'
  },
  {
    id: 'physics',
    name: 'Physics',
    khmerName: 'រូបវិទ្យា',
    icon: '⚛️',
    progress: 45,
    mastered: 10,
    totalPatterns: 22,
    bgClass: 'bg-amber-100',
    textClass: 'text-amber-600'
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    khmerName: 'គីមីវិទ្យា',
    icon: '🧪',
    progress: 20,
    mastered: 4,
    totalPatterns: 18,
    bgClass: 'bg-emerald-100',
    textClass: 'text-emerald-600'
  },
  {
    id: 'biology',
    name: 'Biology',
    khmerName: 'ជីវវិទ្យា',
    icon: '🧬',
    progress: 0,
    mastered: 0,
    totalPatterns: 15,
    bgClass: 'bg-rose-100',
    textClass: 'text-rose-600'
  },
  {
    id: 'khmer',
    name: 'Khmer',
    khmerName: 'អក្សរសាស្ត្រខ្មែរ',
    icon: '🇰🇭',
    progress: 15,
    mastered: 2,
    totalPatterns: 20,
    bgClass: 'bg-cyan-100',
    textClass: 'text-cyan-600'
  },
  {
    id: 'history',
    name: 'History',
    khmerName: 'ប្រវត្តិវិទ្យា',
    icon: '📜',
    progress: 0,
    mastered: 0,
    totalPatterns: 12,
    bgClass: 'bg-stone-100',
    textClass: 'text-stone-600'
  },
  {
    id: 'english',
    name: 'English',
    khmerName: 'ភាសាអង់គ្លេស',
    icon: '🇬🇧',
    progress: 60,
    mastered: 15,
    totalPatterns: 25,
    bgClass: 'bg-teal-100',
    textClass: 'text-teal-600'
  }
])
</script>
