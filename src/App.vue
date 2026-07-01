<template>
  <div
    class="flex min-h-screen bg-slate-100 text-slate-800 font-sans"
    :class="{ 'md:pb-0 pb-20': !hideNav }"
  >
    <SideNav v-if="!hideNav" class="hidden md:flex md:flex-col" />
    <div class="flex flex-col flex-grow min-w-0">
      <RouterView class="flex-grow" />
    </div>
    <BottomNav v-if="!hideNav" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import SideNav from '@/components/layout/SideNav.vue'
import BottomNav from '@/components/layout/BottomNav.vue'

const route = useRoute()
const hideNav = computed(() => !!route.meta.hideNav)
</script>
