<template>

  <main class="w-full max-w-[1280px] mx-auto px-4 py-8 flex-grow">
    
    <div class="mb-8 flex justify-between items-end">
      <div>
        <h1 class="text-3xl font-extrabold text-slate-900 tracking-tight">Select Subject</h1>
        <p class="text-slate-500 mt-1">Master the failure patterns before your Bac II exam.</p>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
      
      <div 
        v-for="subject in bacIISubjects" 
        :key="subject.id"
        @click="goToPractice(subject.id)"
        @keyup.enter="goToPractice(subject.id)"
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

  </main>
  
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const goToPractice = (subjectId) => {
  router.push({ name: 'practice', params: { subject: subjectId } })
}

// This array acts as our temporary database until we hook up Firebase
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