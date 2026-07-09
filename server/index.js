require('dotenv').config()

const express = require('express')
const cors = require('cors')
const admin = require('firebase-admin')
const Anthropic = require('@anthropic-ai/sdk')
const { GoogleGenAI } = require('@google/genai')

admin.initializeApp({ projectId: process.env.FIREBASE_PROJECT_ID })

const MAX_MESSAGE_LENGTH = 800
const MAX_HISTORY_MESSAGES = 8
const PROVIDERS = ['claude', 'gemini']

const SYSTEM_PROMPT = `You are the PreLearn.ai AI Tutor for Cambodian Bac II Mathematics students.

PreLearn currently covers 30 curated Bac II Math failure patterns. If a student asks how many patterns exist, what topics are covered, or other factual questions about the app itself, answer directly and specifically using this number rather than deflecting — then invite them to pick one to explore.

PreLearn's core teaching philosophy is PRE-WARNING: help students avoid a mistake before they make it, not just correct them afterward. When a specific failure pattern is provided as context, ground your answer in it — reference the warning, the common mistake, and the correct approach it describes. Reinforce WHY the mistake costs marks in the real Bac II exam.

If no specific pattern is provided, answer general Bac II Math questions the same way: flag the trap first, then explain the correct method.

Keep answers concise (3-6 sentences), encouraging, and exam-focused. Use plain language suitable for a high school student.`

function truncate(text, max) {
  if (typeof text !== 'string') return ''
  return text.length > max ? text.slice(0, max) : text
}

function buildContextBlock(patternContext) {
  if (!patternContext || typeof patternContext !== 'object') return ''

  const { title, description, warningBody, mistakeExplanation, correctExplanation } = patternContext
  const lines = ['Failure pattern context for this conversation:']
  if (title) lines.push(`Title: ${truncate(title, 200)}`)
  if (description) lines.push(`Description: ${truncate(description, 400)}`)
  if (warningBody) lines.push(`Warning: ${truncate(warningBody, 400)}`)
  if (mistakeExplanation) lines.push(`Common mistake: ${truncate(mistakeExplanation, 400)}`)
  if (correctExplanation) lines.push(`Correct approach: ${truncate(correctExplanation, 400)}`)

  return lines.length > 1 ? lines.join('\n') : ''
}

async function callClaude(apiKey, history, userContent) {
  const anthropic = new Anthropic({ apiKey })

  const priorMessages = history.map((m) => ({
    role: m.role === 'ai' ? 'assistant' : 'user',
    content: truncate(m.text, MAX_MESSAGE_LENGTH)
  }))

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-5',
    max_tokens: 400,
    system: SYSTEM_PROMPT,
    messages: [...priorMessages, { role: 'user', content: userContent }]
  })

  return response.content?.[0]?.type === 'text' ? response.content[0].text : ''
}

async function callGemini(apiKey, history, userContent) {
  const gemini = new GoogleGenAI({ apiKey })

  const priorContents = history.map((m) => ({
    role: m.role === 'ai' ? 'model' : 'user',
    parts: [{ text: truncate(m.text, MAX_MESSAGE_LENGTH) }]
  }))

  const response = await gemini.models.generateContent({
    model: 'gemini-2.5-flash',
    config: { systemInstruction: SYSTEM_PROMPT },
    contents: [...priorContents, { role: 'user', parts: [{ text: userContent }] }]
  })

  return response.text ?? ''
}

const app = express()
app.use(cors({ origin: process.env.ALLOWED_ORIGIN ?? true }))
app.use(express.json())

app.post('/api/ask-ai-tutor', async (req, res) => {
  const authHeader = req.headers.authorization ?? ''
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null
  if (!token) {
    return res.status(401).json({ error: 'Sign in to chat with the AI Tutor.' })
  }

  try {
    await admin.auth().verifyIdToken(token)
  } catch {
    return res.status(401).json({ error: 'Sign in to chat with the AI Tutor.' })
  }

  const { question, patternContext, history, provider } = req.body ?? {}
  const selectedProvider = PROVIDERS.includes(provider) ? provider : 'gemini'

  const cleanQuestion = truncate(question, MAX_MESSAGE_LENGTH).trim()
  if (!cleanQuestion) {
    return res.status(400).json({ error: 'question is required.' })
  }

  const contextBlock = buildContextBlock(patternContext)
  const userContent = contextBlock ? `${contextBlock}\n\nStudent question: ${cleanQuestion}` : cleanQuestion
  const trimmedHistory = Array.isArray(history) ? history.slice(-MAX_HISTORY_MESSAGES) : []

  try {
    const reply = selectedProvider === 'gemini'
      ? await callGemini(process.env.GEMINI_API_KEY, trimmedHistory, userContent)
      : await callClaude(process.env.ANTHROPIC_API_KEY, trimmedHistory, userContent)

    if (!reply) {
      return res.status(502).json({ error: 'The AI Tutor did not return a response.' })
    }

    res.json({ reply, provider: selectedProvider })
  } catch (err) {
    console.error('askAiTutor failed', err)
    res.status(500).json({ error: 'The AI Tutor is unavailable right now. Please try again.' })
  }
})

const port = process.env.PORT ?? 3000
app.listen(port, () => console.log(`AI Tutor server listening on port ${port}`))
