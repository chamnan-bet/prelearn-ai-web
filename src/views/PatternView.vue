<template>
    <!-- Main Content Container -->
    <main class="w-full max-w-[1280px] mx-auto px-4 py-8 flex-grow">
        
        <!-- Page Header with Back Button -->
        <div class="mb-10">
        <RouterLink to="/" class="inline-flex items-center gap-2 text-indigo-600 font-bold hover:text-indigo-800 transition mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            Home
        </RouterLink>
        
        <div class="flex items-center justify-between">
            <div>
            <h1 class="text-3xl font-extrabold text-slate-900 tracking-tight">Math Patterns</h1>
            <p class="text-slate-500 mt-1">30 failure patterns - click a card to practice</p>
            </div>
            <span class="bg-blue-50 text-blue-600 font-bold px-4 py-1.5 rounded-full border border-blue-100">Math</span>
        </div>
        </div>

        <!-- HIGH RISK SECTION -->
        <div class="mb-10">
        <h2 class="text-xs font-black text-amber-600 tracking-widest uppercase mb-4">High Risk — Avoid These First</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Iterate over high-risk patterns -->
            <div 
            v-for="pattern in highRiskPatterns" 
            :key="pattern.id"
            :class="['bg-white rounded-xl shadow-sm hover:shadow-md transition cursor-pointer border-l-4 p-5 flex flex-col', pattern.borderColor]"
            >
            <h3 class="font-bold text-slate-900 text-lg flex items-center gap-2 mb-2">
                <span>⚠️</span> {{ pattern.title }}
            </h3>
            <p class="text-slate-600 text-sm mb-4 flex-grow">{{ pattern.description }}</p>
            
            <div class="flex items-center gap-3 mt-auto">
                <span :class="['text-xs font-bold px-2.5 py-1 rounded-md', pattern.badgeColor]">
                {{ pattern.risk }}
                </span>
                <span class="text-xs font-medium text-slate-400">{{ pattern.marks }}</span>
            </div>
            </div>
        </div>
        </div>

        <!-- MEDIUM RISK SECTION -->
        <div>
        <h2 class="text-xs font-black text-slate-400 tracking-widest uppercase mb-4">Medium Risk</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Iterate over medium-risk patterns -->
            <div 
            v-for="pattern in mediumRiskPatterns" 
            :key="pattern.id"
            :class="['bg-white rounded-xl shadow-sm hover:shadow-md transition cursor-pointer border-l-4 p-5 flex flex-col', pattern.borderColor]"
            >
            <h3 class="font-bold text-slate-900 text-lg flex items-center gap-2 mb-2">
                <span>⚠️</span> {{ pattern.title }}
            </h3>
            <p class="text-slate-600 text-sm mb-4 flex-grow">{{ pattern.description }}</p>
            
            <div class="flex items-center gap-3 mt-auto">
                <span :class="['text-xs font-bold px-2.5 py-1 rounded-md', pattern.badgeColor]">
                {{ pattern.risk }}
                </span>
                <span class="text-xs font-medium text-slate-400">{{ pattern.marks }}</span>
            </div>
            </div>
        </div>
        </div>

    </main>
  
</template>

<script setup>
import { ref } from 'vue'

// Mock Database for High Risk Patterns
const highRiskPatterns = ref([
  { 
    id: 1, 
    title: 'Forgetting the second root', 
    description: 'Taking only +√ and missing -√ in quadratic equations.', 
    risk: 'High risk', 
    marks: '-3 marks avg', 
    borderColor: 'border-amber-400', 
    badgeColor: 'bg-red-50 text-red-600' 
  },
  { 
    id: 2, 
    title: 'Skipping algebra steps', 
    description: 'Jumping steps loses method marks even when the answer is right.', 
    risk: 'High risk', 
    marks: '-2 marks avg', 
    borderColor: 'border-amber-400', 
    badgeColor: 'bg-red-50 text-red-600' 
  },
  { 
    id: 3, 
    title: 'Forgetting +C in integration', 
    description: 'Omitting the constant of integration is an automatic deduction.', 
    risk: 'High risk', 
    marks: '-1 mark avg', 
    borderColor: 'border-rose-400', 
    badgeColor: 'bg-red-50 text-red-600' 
  }
])

// Mock Database for Medium Risk Patterns
const mediumRiskPatterns = ref([
  { 
    id: 4, 
    title: 'Wrong domain for ln(x)', 
    description: 'Not checking x > 0 before applying logarithm rules.', 
    risk: 'Medium risk', 
    marks: '-1.5 marks avg', 
    borderColor: 'border-yellow-400', 
    badgeColor: 'bg-orange-50 text-orange-600' 
  }
])
</script>