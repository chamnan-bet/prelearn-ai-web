<template>
  <div class="container mx-auto p-4 max-w-4xl">
    <h1 class="text-2xl font-bold mb-6 text-gray-800">Choose a Subject</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <PrimaryButton @click="goToPractice('Mathematics')">Mathematics</PrimaryButton>
      <PrimaryButton @click="goToPractice('Physics')">Physics</PrimaryButton>
    </div>
  </div>
</template>

<script setup>
import PrimaryButton from '@/components/shared/PrimaryButton.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const goToPractice = (subject) => {
  router.push({ name: 'practice', params: { subject } })
}
</script>