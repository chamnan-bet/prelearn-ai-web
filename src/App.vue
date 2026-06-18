<template>
  <div class="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col md:pb-0 pb-20">
    
    <div class="hidden md:block">
      <TopNav />
    </div>

    <RouterView class="flex-grow" />
    
    <BottomNav />

  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import TopNav from '@/components/layout/TopNav.vue'
import BottomNav from '@/components/layout/BottomNav.vue'
</script>