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

          <!-- Error banner -->
          <p v-if="errorText" class="text-sm text-red-600 px-1" role="alert">{{ errorText }}</p>
        </div>

        <!-- Auth still resolving -->
        <div v-if="!authReady" class="border-t border-slate-100 p-5 shrink-0 text-center">
          <p class="text-sm text-slate-400">Loading…</p>
        </div>

        <!-- Sign-in gate -->
        <div v-else-if="!user" class="border-t border-slate-100 p-5 shrink-0 text-center">
          <p class="text-sm text-slate-500 mb-3">Sign in to chat with the AI Tutor.</p>
          <RouterLink
            to="/login"
            class="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold transition-colors"
          >
            Sign in
          </RouterLink>
        </div>

        <!-- Input bar (anchored to card bottom) -->
        <div v-else class="border-t border-slate-100 p-4 shrink-0">
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
import { ref, computed, watch, nextTick, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { fetchPatternById } from '@/services/patterns'
import { askAiTutor } from '@/services/aiTutor'
import { useAuth } from '@/composables/useAuth'

const route = useRoute()
const { user, authReady } = useAuth()

const subject = computed(() => route.query.subject ?? route.params?.subject ?? 'math')
const patternId = computed(() => route.query.patternId ?? null)

const pattern = ref(null)
const patternTitle = computed(() => pattern.value?.title ?? 'General AI Tutor')

const input = ref('')
const isTyping = ref(false)
const errorText = ref('')
const messagesEl = ref(null)

const messages = ref([])
let nextId = 1

function welcomeMessage() {
  if (pattern.value?.preWarning) {
    return `⚠️ ${pattern.value.preWarning}`
  }
  return "Ask me about any Bac II Math failure pattern — I'll flag the common trap before walking through the correct approach."
}

async function loadPattern() {
  if (!patternId.value) return
  try {
    pattern.value = await fetchPatternById(subject.value, patternId.value)
  } catch {
    pattern.value = null
  }
}

function resetConversation() {
  messages.value = [{ id: nextId++, role: 'ai', text: welcomeMessage() }]
}

onMounted(async () => {
  await loadPattern()
  resetConversation()
})

watch(patternId, async () => {
  await loadPattern()
  resetConversation()
})

function buildPatternContext() {
  if (!pattern.value) return null
  const { title, description, warningBody, mistakeExplanation, correctExplanation } = pattern.value
  return { title, description, warningBody, mistakeExplanation, correctExplanation }
}

async function sendMessage() {
  const text = input.value.trim()
  if (!text || isTyping.value || !user.value) return

  messages.value.push({ id: nextId++, role: 'user', text })
  input.value = ''
  errorText.value = ''
  isTyping.value = true

  await nextTick()
  scrollToBottom()

  try {
    const history = messages.value.slice(0, -1).map((m) => ({ role: m.role, text: m.text }))
    const reply = await askAiTutor({ question: text, patternContext: buildPatternContext(), history })
    messages.value.push({ id: nextId++, role: 'ai', text: reply })
  } catch {
    errorText.value = 'The AI Tutor is unavailable right now. Please try again.'
  } finally {
    isTyping.value = false
    await nextTick()
    scrollToBottom()
  }
}

function scrollToBottom() {
  messagesEl.value?.scrollTo({ top: messagesEl.value.scrollHeight, behavior: 'smooth' })
}
</script>
