const { onCall, HttpsError } = require('firebase-functions/v2/https')
const { defineSecret } = require('firebase-functions/params')
const Anthropic = require('@anthropic-ai/sdk')

const anthropicApiKey = defineSecret('ANTHROPIC_API_KEY')

const MAX_MESSAGE_LENGTH = 800
const MAX_HISTORY_MESSAGES = 8

const SYSTEM_PROMPT = `You are the PreLearn.ai AI Tutor for Cambodian Bac II Mathematics students.

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

exports.askAiTutor = onCall(
  { secrets: [anthropicApiKey], cors: true },
  async (request) => {
    if (!request.auth) {
      throw new HttpsError('unauthenticated', 'Sign in to chat with the AI Tutor.')
    }

    const { question, patternContext, history } = request.data ?? {}
    const cleanQuestion = truncate(question, MAX_MESSAGE_LENGTH).trim()
    if (!cleanQuestion) {
      throw new HttpsError('invalid-argument', 'question is required.')
    }

    const contextBlock = buildContextBlock(patternContext)

    const priorMessages = Array.isArray(history)
      ? history.slice(-MAX_HISTORY_MESSAGES).map((m) => ({
          role: m.role === 'ai' ? 'assistant' : 'user',
          content: truncate(m.text, MAX_MESSAGE_LENGTH)
        }))
      : []

    const messages = [
      ...priorMessages,
      {
        role: 'user',
        content: contextBlock ? `${contextBlock}\n\nStudent question: ${cleanQuestion}` : cleanQuestion
      }
    ]

    const anthropic = new Anthropic({ apiKey: anthropicApiKey.value() })

    try {
      const response = await anthropic.messages.create({
        model: 'claude-sonnet-5',
        max_tokens: 400,
        system: SYSTEM_PROMPT,
        messages
      })

      const reply = response.content?.[0]?.type === 'text' ? response.content[0].text : ''
      if (!reply) {
        throw new HttpsError('internal', 'The AI Tutor did not return a response.')
      }

      return { reply }
    } catch (err) {
      if (err instanceof HttpsError) throw err
      console.error('askAiTutor failed', err)
      throw new HttpsError('internal', 'The AI Tutor is unavailable right now. Please try again.')
    }
  }
)
