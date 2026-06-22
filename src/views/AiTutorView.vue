<template>
  <div class="flex flex-col min-h-full">

    <!-- Page header -->
    <header class="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-40 shrink-0">
      <div class="flex items-center gap-5 min-w-0">
        <RouterLink
          :to="subject ? { name: 'patterns', params: { subject } } : { name: 'home' }"
          class="flex items-center gap-1.5 text-slate-500 hover:text-slate-700 text-sm font-semibold transition shrink-0"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          Back
        </RouterLink>

        <div class="flex items-center gap-3 min-w-0">
          <div class="w-9 h-9 rounded-xl bg-blue-700 flex items-center justify-center shrink-0" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 text-white">
              <path d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
            </svg>
          </div>
          <div class="min-w-0">
            <p class="font-bold text-slate-900 text-base leading-tight">AI Tutor</p>
            <p class="text-xs text-slate-400 truncate">{{ patternTitle }}</p>
          </div>
        </div>
      </div>

      <button class="w-10 h-10 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-400 hover:bg-amber-100 transition shrink-0 ml-4" aria-label="Notifications">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
          <path fill-rule="evenodd" d="M5.25 9a6.75 6.75 0 0 1 13.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 1 1-7.48 0 24.585 24.585 0 0 1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z" clip-rule="evenodd" />
        </svg>
      </button>
    </header>

    <!-- Chat card -->
    <div class="flex-grow overflow-hidden p-6">
      <div class="bg-white rounded-2xl border border-slate-200 shadow-sm h-full flex flex-col overflow-hidden">

        <!-- Messages (scrollable) -->
        <div
          ref="messagesEl"
          class="flex-grow overflow-y-auto p-5 space-y-5 min-h-0"
          aria-live="polite"
          aria-label="Conversation"
        >
          <template v-for="msg in messages" :key="msg.id">

            <!-- AI message — gray bubble -->
            <div v-if="msg.role === 'ai'" class="flex gap-3 items-start">
              <div
                class="w-9 h-9 rounded-full bg-blue-700 flex items-center justify-center text-white text-xs font-black shrink-0 mt-0.5"
                aria-label="AI Tutor"
              >
                AI
              </div>
              <div class="max-w-[78%] bg-slate-100 rounded-2xl rounded-tl-sm px-4 py-3">
                <p class="text-slate-700 text-sm leading-relaxed">{{ msg.text }}</p>
              </div>
            </div>

            <!-- User message — blue bubble, right-aligned -->
            <div v-else class="flex justify-end">
              <div class="max-w-[72%] bg-blue-700 text-white text-sm leading-relaxed px-4 py-3 rounded-2xl rounded-tr-sm shadow-sm">
                {{ msg.text }}
              </div>
            </div>

          </template>

          <!-- Typing indicator -->
          <div v-if="isTyping" class="flex gap-3 items-start" aria-label="AI is typing">
            <div class="w-9 h-9 rounded-full bg-blue-700 flex items-center justify-center text-white text-xs font-black shrink-0" aria-hidden="true">AI</div>
            <div class="bg-slate-100 rounded-2xl rounded-tl-sm px-4 py-3.5">
              <div class="flex gap-1 items-center">
                <span class="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style="animation-delay: 0ms"></span>
                <span class="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style="animation-delay: 150ms"></span>
                <span class="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style="animation-delay: 300ms"></span>
              </div>
            </div>
          </div>
        </div>

        <!-- Input bar (anchored to card bottom) -->
        <div class="border-t border-slate-100 p-4 shrink-0">
          <form @submit.prevent="sendMessage" class="flex gap-3 items-center">
            <input
              v-model="input"
              type="text"
              placeholder="Ask about this pattern..."
              :disabled="isTyping"
              class="flex-grow bg-slate-100 rounded-full px-5 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none focus:ring-2 focus:ring-blue-400 transition disabled:opacity-60"
              aria-label="Message input"
            />
            <button
              type="submit"
              :disabled="!input.trim() || isTyping"
              class="w-11 h-11 rounded-full bg-blue-700 hover:bg-blue-800 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center text-white transition-colors shrink-0"
              aria-label="Send message"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </form>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'
import { useRoute, RouterLink } from 'vue-router'

const route = useRoute()

const subject = computed(() => route.query.subject ?? route.params?.subject ?? 'math')
const patternId = computed(() => Number(route.query.patternId ?? 1))

const patternTitles = {
  1: 'Quadratic equations',
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
