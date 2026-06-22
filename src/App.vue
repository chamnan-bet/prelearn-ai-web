<template>
  <div class="flex min-h-screen bg-slate-100 text-slate-800 font-sans md:pb-0 pb-20">
    <SideNav class="hidden md:flex md:flex-col" />
    <div class="flex flex-col flex-grow min-w-0">
      <RouterView class="flex-grow" />
    </div>
    <BottomNav />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import SideNav from '@/components/layout/SideNav.vue'
import BottomNav from '@/components/layout/BottomNav.vue'
</script>
