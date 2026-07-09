import { auth } from './auth'

const AI_TUTOR_ENDPOINT = import.meta.env.VITE_AI_TUTOR_API_URL ?? '/api/ask-ai-tutor'

export async function askAiTutor({ question, patternContext, history, provider }) {
  const user = auth.currentUser
  if (!user) throw new Error('Sign in to chat with the AI Tutor.')
  const token = await user.getIdToken()

  const res = await fetch(AI_TUTOR_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ question, patternContext, history, provider })
  })

  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(data.error ?? 'The AI Tutor is unavailable right now. Please try again.')
  }

  return data.reply
}
