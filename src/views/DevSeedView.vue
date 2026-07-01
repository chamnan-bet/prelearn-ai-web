<template>
  <div class="min-h-screen bg-slate-100 flex flex-col items-center justify-center px-5 py-10">

    <div class="w-full max-w-sm bg-white rounded-2xl border border-slate-200 shadow-sm p-8">

      <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Dev only</p>
      <h1 class="font-black text-slate-900 text-xl mb-2">Firestore Seeder</h1>
      <p class="text-sm text-slate-500 mb-6">Pushes the 5 Math failure patterns to Firestore. Safe to run multiple times.</p>

      <button
        @click="runSeed"
        :disabled="status === 'loading'"
        class="w-full inline-flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 active:scale-[0.98] disabled:opacity-60 text-white font-bold px-6 py-3 rounded-xl transition mb-4"
      >
        <svg v-if="status === 'loading'" class="w-4 h-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
        </svg>
        {{ status === 'loading' ? 'Seeding…' : 'Seed Math Patterns' }}
      </button>

      <div v-if="status === 'done'" class="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 text-sm text-emerald-700 font-semibold">
        ✅ {{ count }} patterns written to Firestore successfully.
      </div>
      <div v-if="status === 'error'" class="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700 font-semibold">
        ✗ {{ errorMsg }}
      </div>

    </div>

    <RouterLink to="/" class="mt-6 text-xs text-slate-400 hover:text-slate-600 transition">
      ← Back to home
    </RouterLink>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { seedPatterns } from '@/services/patterns'
import { mathPatterns } from '@/data/mathPatterns'

const status = ref('idle')
const count = ref(0)
const errorMsg = ref('')

async function runSeed() {
  status.value = 'loading'
  errorMsg.value = ''
  try {
    await seedPatterns('math', mathPatterns)
    count.value = mathPatterns.length
    status.value = 'done'
  } catch (e) {
    errorMsg.value = e.message || 'Seed failed.'
    status.value = 'error'
  }
}
</script>
