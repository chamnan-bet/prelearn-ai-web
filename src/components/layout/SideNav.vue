<template>
  <aside class="w-52 h-screen bg-white border-r border-slate-200 flex flex-col shrink-0 sticky top-0 overflow-y-auto">
    <!-- Brand -->
    <div class="px-6 py-6 shrink-0">
      <p class="text-xl font-black text-slate-900 leading-tight">PreLearn</p>
      <p class="text-xs text-slate-400 font-medium mt-0.5">Bac II exam preparation</p>
    </div>

    <!-- Nav items -->
    <nav class="flex-grow px-3 space-y-0.5">
      <RouterLink to="/" :class="linkClass('home')">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 shrink-0">
          <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
        <span class="flex-grow">Home</span>
        <span v-if="isRoute('home')" class="w-2 h-2 rounded-full bg-indigo-600 shrink-0"></span>
      </RouterLink>

      <RouterLink to="/patterns" :class="linkClass('patterns')">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 shrink-0">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
        </svg>
        <span class="flex-grow">Patterns</span>
        <span v-if="isRoute('patterns')" class="w-2 h-2 rounded-full bg-indigo-600 shrink-0"></span>
      </RouterLink>

      <RouterLink to="/ai-tutor" :class="linkClass('ai-tutor')">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 shrink-0">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
        </svg>
        <span class="flex-grow">AI Tutor</span>
        <span v-if="isRoute('ai-tutor')" class="w-2 h-2 rounded-full bg-indigo-600 shrink-0"></span>
      </RouterLink>

      <RouterLink to="/progress" :class="linkClass('progress')">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 shrink-0">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
        </svg>
        <span class="flex-grow">Progress</span>
        <span v-if="isRoute('progress')" class="w-2 h-2 rounded-full bg-indigo-600 shrink-0"></span>
      </RouterLink>
    </nav>

    <!-- Sign in -->
    <div class="px-4 py-4 border-t border-slate-100 shrink-0">
      <RouterLink
        to="/login"
        class="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 shrink-0">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
        </svg>
        <span class="flex-grow">Sign in</span>
      </RouterLink>
    </div>
  </aside>
</template>

<script setup>

import { useRoute, RouterLink } from 'vue-router'

const route = useRoute()

const isRoute = (name) => route.name === name

const linkClass = (name) => [
  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors',
  route.name === name
    ? 'bg-indigo-50 text-indigo-600'
    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
]
</script>
