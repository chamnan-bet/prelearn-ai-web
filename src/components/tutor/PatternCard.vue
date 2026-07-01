<template>
  <div
    :class="[
      'bg-white rounded-xl border-l-4 border border-slate-100 p-5 flex flex-col cursor-pointer',
      'hover:shadow-md transition-shadow duration-200',
      borderColorClass
    ]"
    tabindex="0"
    role="button"
    :aria-label="`Practice: ${pattern.title}`"
    @click="$emit('select', pattern)"
    @keyup.enter="$emit('select', pattern)"
  >
    <h3 class="font-semibold text-slate-900 text-base flex items-center gap-2 mb-2">
      <span aria-hidden="true">⚠️</span>
      {{ pattern.title }}
    </h3>
    <p class="text-slate-500 text-sm mb-4 flex-grow leading-relaxed">
      {{ pattern.description }}
    </p>
    <div class="flex items-center gap-3 mt-auto">
      <span :class="['text-xs font-semibold px-2.5 py-1 rounded-md', badgeColorClass]">
        {{ pattern.risk }}
      </span>
      <span class="text-xs text-slate-400">{{ pattern.marks }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  pattern: {
    type: Object,
    required: true
  }
})

defineEmits(['select'])

const borderColorClass = computed(() => {
  const map = {
    high: 'border-l-amber-400',
    'high-rose': 'border-l-rose-400',
    medium: 'border-l-yellow-400'
  }
  return map[props.pattern.borderVariant] ?? 'border-l-amber-400'
})

const badgeColorClass = computed(() => {
  return props.pattern.riskLevel === 'high'
    ? 'bg-red-50 text-red-600'
    : 'bg-orange-50 text-orange-600'
})
</script>