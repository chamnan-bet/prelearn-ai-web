<template>
  <div class="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
    <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ title }}</h3>
    <p class="text-gray-700">{{ question }}</p>
    <slot></slot>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  question: String
})
</script>