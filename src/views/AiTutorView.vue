<template>
  <main class="flex-grow flex flex-col overflow-hidden max-w-[760px] mx-auto w-full px-4">

    <!-- Header -->
    <div class="flex items-center gap-3 py-4 border-b border-slate-200 shrink-0">
      <RouterLink
        :to="subject ? { name: 'patterns', params: { subject } } : { name: 'home' }"
        class="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-3.5 h-3.5" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>
        Patterns
      </RouterLink>

      <div class="ml-auto flex items-center gap-2.5">
        <div class="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shrink-0" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 text-white">
            <path d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
          </svg>
        </div>
        <span class="font-bold text-slate-900 text-sm">AI Tutor</span>
      </div>
    </div>

    <!-- Pattern context strip -->
    <div class="my-4 shrink-0 flex items-center gap-3 bg-indigo-50 border border-indigo-100 rounded-xl px-4 py-3">
      <div class="w-1.5 h-8 rounded-full bg-indigo-400 shrink-0" aria-hidden="true"></div>
      <div class="min-w-0">
        <p class="text-xs font-bold text-indigo-400 uppercase tracking-widest leading-none mb-1">Discussing</p>
        <p class="text-sm font-semibold text-slate-900 truncate">{{ patternTitle }}</p>
      </div>
      <span class="ml-auto shrink-0 bg-red-50 text-red-600 text-xs font-bold px-2.5 py-1 rounded-md border border-red-100">
        High risk
      </span>
    </div>

    <!-- Messages — flex-grow + min-h-0 is required for overflow-y-auto to work inside a flex column -->
    <div
      ref="messagesEl"
      class="flex-grow overflow-y-auto min-h-0 space-y-5 pb-6"
      aria-live="polite"
      aria-label="Conversation"
    >
      <template v-for="msg in messages" :key="msg.id">

        <!-- AI: tutor annotation style (left-border card, not a bubble) -->
        <div v-if="msg.role === 'ai'" class="flex gap-3 items-start">
          <div
            class="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-xs font-black shrink-0 mt-0.5"
            aria-label="AI Tutor"
          >
            AI
          </div>
          <div class="flex-1 min-w-0 bg-white border border-slate-100 border-l-[3px] border-l-indigo-400 rounded-r-xl rounded-bl-xl px-4 py-3 shadow-sm">
            <p class="text-slate-700 text-sm leading-relaxed">{{ msg.text }}</p>
          </div>
        </div>

        <!-- User: classic pill bubble, right-aligned -->
        <div v-else class="flex justify-end">
          <div class="max-w-[72%] bg-indigo-600 text-white text-sm leading-relaxed px-4 py-3 rounded-2xl rounded-tr-sm shadow-sm">
            {{ msg.text }}
          </div>
        </div>

      </template>

      <!-- Typing indicator -->
      <div v-if="isTyping" class="flex gap-3 items-start" aria-label="AI is typing">
        <div class="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-xs font-black shrink-0" aria-hidden="true">AI</div>
        <div class="bg-white border border-slate-100 border-l-[3px] border-l-indigo-400 rounded-r-xl rounded-bl-xl px-4 py-3.5 shadow-sm">
          <div class="flex gap-1 items-center">
            <span class="w-1.5 h-1.5 rounded-full bg-indigo-300 animate-bounce" style="animation-delay: 0ms"></span>
            <span class="w-1.5 h-1.5 rounded-full bg-indigo-300 animate-bounce" style="animation-delay: 150ms"></span>
            <span class="w-1.5 h-1.5 rounded-full bg-indigo-300 animate-bounce" style="animation-delay: 300ms"></span>
          </div>
        </div>
      </div>

    </div>

    <!-- Input bar -->
    <div class="border-t border-slate-200 py-4 shrink-0">
      <form @submit.prevent="sendMessage" class="flex gap-2.5 items-center">
        <input
          v-model="input"
          type="text"
          placeholder="Ask about this pattern…"
          :disabled="isTyping"
          class="flex-grow bg-slate-100 rounded-full px-5 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none focus:ring-2 focus:ring-indigo-400 transition disabled:opacity-60"
          aria-label="Message input"
        />
        <button
          type="submit"
          :disabled="!input.trim() || isTyping"
          class="w-11 h-11 rounded-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center text-white transition-colors shrink-0"
          aria-label="Send message"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </button>
      </form>
    </div>

  </main>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const subject = computed(() => route.query.subject ?? route.params?.subject ?? 'math')
const patternId = computed(() => Number(route.query.patternId ?? 1))

const patternTitles = {
  1: 'Forgetting the second root',
  2: 'Skipping algebra steps',
  3: 'Forgetting +C in integration',
  4: 'Wrong domain for ln(x)'
}
const patternTitle = computed(() => patternTitles[patternId.value] ?? 'Failure pattern')

const input = ref('')
const isTyping = ref(false)
const messagesEl = ref(null)

const messages = ref([
  {
    id: 1,
    role: 'ai',
    text: '⚠️ Before we start: For any equation with x², always expect TWO solutions. This is the most common Bac II mistake in this topic. Keep this in mind as we go.'
  }
])

let nextId = 2

const cannedReplies = [
  'Great question! Most students solve step-by-step and stop the moment they find one answer… But x² always has two cases: the expression inside equals +√ OR −√. Both must be checked.',
  'Think of it this way: √4 gives you both 2 and −2. The square root operation always opens two doors. Students who only open one lose 3 marks on average in the Bac II exam.',
  'Here is a rule to memorise: whenever you take a square root in an equation, write ±√ immediately — not just +√. That one character change will save you marks every time.',
  'Exactly right. The key step is writing x − 3 = ±2 (notice the ± sign). From there: x = 5 or x = 1. Never skip the ± — that is where the marks live.',
  'Good thinking. The exam marker is looking for both values explicitly written. Even if your arithmetic is correct, showing only one root is marked as an incomplete answer.'
]
let replyIndex = 0

async function sendMessage() {
  const text = input.value.trim()
  if (!text || isTyping.value) return

  messages.value.push({ id: nextId++, role: 'user', text })
  input.value = ''
  isTyping.value = true

  await nextTick()
  scrollToBottom()

  setTimeout(async () => {
    messages.value.push({
      id: nextId++,
      role: 'ai',
      text: cannedReplies[replyIndex % cannedReplies.length]
    })
    replyIndex++
    isTyping.value = false
    await nextTick()
    scrollToBottom()
  }, 1400)
}

function scrollToBottom() {
  messagesEl.value?.scrollTo({ top: messagesEl.value.scrollHeight, behavior: 'smooth' })
}
</script>
