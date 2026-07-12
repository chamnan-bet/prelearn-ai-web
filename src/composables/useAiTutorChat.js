import { reactive } from 'vue'

const STORAGE_PREFIX = 'aiTutorChat:'

// Module-level — shared across every mount/unmount of AiTutorView,
// so navigating away and back doesn't lose the conversation.
const conversations = reactive({})

function loadFromStorage(key) {
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + key)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function saveToStorage(key, messages) {
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(messages))
  } catch {
    // storage unavailable (quota, private mode) — conversation still lives in memory
  }
}

export function useAiTutorChat(key) {
  if (!(key in conversations)) {
    conversations[key] = loadFromStorage(key)
  }

  return {
    getMessages() {
      return conversations[key]
    },
    setMessages(messages) {
      conversations[key] = messages
      saveToStorage(key, messages)
    }
  }
}
