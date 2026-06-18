<template>
  <div class="container mx-auto p-4 max-w-4xl">
    <h1 class="text-2xl font-bold mb-6 text-gray-800">Practice: {{ $route.params.subject }}</h1>
    
    <WarningAlert>
      <strong>AI Note:</strong> Many students confuse integration and derivation here. Double-check your formula!
    </WarningAlert>

    <QuestionCard 
      title="Problem 1" 
      question="Calculate the derivative of x² with respect to x."
    >
      <div class="mt-4">
        <input type="text" class="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Type your answer here..." />
      </div>
    </QuestionCard>
  </div>
</template>

<script setup>
import WarningAlert from '@/components/tutor/WarningAlert.vue'
import QuestionCard from '@/components/tutor/QuestionCard.vue'
import { useRoute } from 'vue-router'
</script>