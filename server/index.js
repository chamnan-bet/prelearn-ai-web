const express = require('express')
const cors = require('cors')
require('dotenv').config()
const admin = require('firebase-admin')
const Anthropic = require('@anthropic-ai/sdk')
const { GoogleGenAI } = require('@google/genai')

admin.initializeApp({ projectId: process.env.FIREBASE_PROJECT_ID })

const MAX_MESSAGE_LENGTH = 800
const MAX_HISTORY_MESSAGES = 8
const PROVIDERS = ['claude', 'gemini']

const SYSTEM_PROMPT = `Your job:
1. Explains common mistake patterns clearly and briefly, usually in 1–2 sentences unless the student requests more detail.
2. Shows why the mistake loses marks by using verified explanations based on official solutions and common exam marking criteria.
3. Provides step-by-step guidance using example questions and solutions to help students understand the correct method.
4. Encourages students while giving precise feedback so they can avoid repeating the same mistakes in the real exam.
5. Uses simple and easy-to-understand language suitable for Cambodian high school students preparing for the Bac II examination.
6. Supports explanations in both English and Khmer, allowing students to learn in the language they are most comfortable with.
7. Predicts common mistakes before students submit an answer, helping them correct their thinking early.
8. Offers personalized learning guidance based on each student's weaknesses and recurring mistake patterns.
9. Improves exam confidence and accuracy by helping students develop better problem-solving habits.
10. Focuses on understanding rather than memorization, enabling students to apply concepts correctly during exams.
Stay focused on this specific pattern unless the student explicitly asks about something else.`

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
    content: truncate(m.text, MAX_MESSAGE_LENGTH),
  }))

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-5',
    max_tokens: 400,
    system: SYSTEM_PROMPT,
    messages: [...priorMessages, { role: 'user', content: userContent }],
  })

  return response.content?.[0]?.type === 'text' ? response.content[0].text : ''
}

// 🌐 UPDATED: callGemini now uses Google Search Grounding for Real-Time data!
async function callGemini(apiKey, history, userContent) {
  const gemini = new GoogleGenAI({ apiKey })

  const priorContents = history.map((m) => ({
    role: m.role === 'ai' ? 'model' : 'user',
    parts: [{ text: truncate(m.text, MAX_MESSAGE_LENGTH) }],
  }))

  const response = await gemini.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: [...priorContents, { role: 'user', parts: [{ text: userContent }] }],
    config: {
      systemInstruction: SYSTEM_PROMPT,
      // 👇 THIS TURNS ON LIVE GOOGLE SEARCH GROUNDING 👇
      tools: [{ googleSearch: {} }],
    },
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
  const userContent = contextBlock
    ? `${contextBlock}\n\nStudent question: ${cleanQuestion}`
    : cleanQuestion
  const trimmedHistory = Array.isArray(history) ? history.slice(-MAX_HISTORY_MESSAGES) : []

  try {
    const reply =
      selectedProvider === 'gemini'
        ? await callGemini(process.env.GEMINI_API_KEY, trimmedHistory, userContent)
        : await callClaude(process.env.ANTHROPIC_API_KEY, trimmedHistory, userContent)

    if (!reply) {
      return res.status(502).json({ error: 'The AI Tutor did not return a response.' })
    }

    res.json({ reply, provider: selectedProvider })
  } catch (err) {
    console.error('askAiTutor failed', err)
    // res.status(500).json({ error: 'The AI Tutor is unavailable right now. Please try again.' })
    res.status(500).json({ error: `DEBUG ERROR: ${err.message}` })
  }
})

const port = process.env.PORT ?? 3000
app.listen(port, () => {
  console.log(`AI Tutor server listening on port ${port}`)
  console.log(
    `- Gemini API Key: ${process.env.GEMINI_API_KEY ? 'DETECTED' : 'NOT FOUND (Check server/.env)'}`,
  )
  console.log(
    `- Claude API Key: ${process.env.ANTHROPIC_API_KEY ? 'DETECTED' : 'NOT FOUND (Check server/.env)'}`,
  )
})
