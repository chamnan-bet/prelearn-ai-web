<template>
  <header class="bg-white border-b border-slate-200 sticky top-0 z-50">
    <div class="w-full max-w-[1280px] mx-auto px-4 h-16 flex items-center justify-between">
      
      <RouterLink to="/" class="flex items-center gap-2 transition transform hover:scale-105 active:scale-95">
        <span class="text-2xl font-black tracking-tight text-indigo-600">PreLearn<span class="text-amber-500">.ai</span></span>
        <span class="bg-indigo-50 text-indigo-700 text-xs font-semibold px-2 py-0.5 rounded-full border border-indigo-100">Bac II</span>
      </RouterLink>

      <nav class="hidden md:flex items-center gap-8 font-bold text-sm text-slate-500">
        <RouterLink to="/" active-class="text-indigo-600" class="hover:text-indigo-600 transition">
          Home
        </RouterLink>
        <RouterLink to="/patterns" active-class="text-indigo-600" class="hover:text-indigo-600 transition">
          Patterns
        </RouterLink>
        <RouterLink to="/ai-tutor" active-class="text-indigo-600" class="hover:text-indigo-600 transition">
          AI Tutor
        </RouterLink>
        <RouterLink to="/progress" active-class="text-indigo-600" class="hover:text-indigo-600 transition">
          Progress
        </RouterLink>
      </nav>

      <div class="flex items-center gap-6">
        <div class="flex items-center gap-1.5 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-full text-amber-700 font-bold text-sm hidden sm:flex">
          <span>🔥</span>
          <span>5 Day Streak</span>
        </div>

        <div class="flex items-center gap-3 border-l border-slate-200 pl-4">
          <div class="w-9 h-9 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm">
            S
          </div>
          <span class="font-medium text-sm text-slate-700 hidden lg:inline">Sayonara</span>
        </div>
      </div>
      
    </div>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>