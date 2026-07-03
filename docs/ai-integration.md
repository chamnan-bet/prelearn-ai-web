# AI Tutor integration guide

This note explains how the AI Tutor's live model integration actually works, and how to swap in or add a different provider (e.g. Gemini) later.

---

## 1. Architecture overview

The AI Tutor chat does **not** call an LLM API directly from the browser. It routes through a Firebase Cloud Function, which is the only place that holds the API key.

```
Browser (Vue)                Firebase Cloud Function            Anthropic
─────────────                ──────────────────────             ─────────
AiTutorView.vue
  → aiTutor.js
    → httpsCallable(functions, 'askAiTutor')
                          ──→  functions/index.js: askAiTutor()
                                 - verify request.auth
                                 - build system prompt + context
                                 - call Anthropic SDK  ──────→  claude-sonnet-5
                                                          ←──────  reply text
                          ←──  { reply: "..." }
  ← reply
  → pushed into messages[], rendered as AI bubble
```

**Why a Cloud Function instead of calling the API straight from the browser:** Vite bundles any `VITE_`-prefixed env var into the public JS bundle that ships to every visitor's browser. An API key in that bundle can be read by anyone via devtools. Routing the call through a server-side function keeps the key out of anything the browser ever downloads.

Relevant files:
- `functions/index.js` — the Cloud Function, calls the Anthropic API
- `src/services/aiTutor.js` — thin frontend wrapper around `httpsCallable`
- `src/services/firebase.js` — exports the `functions` client instance
- `src/views/AiTutorView.vue` — chat UI, builds the request payload

---

## 2. Step-by-step request lifecycle

1. **User sends a message** — `AiTutorView.vue` → `sendMessage()`. The message is pushed into the local `messages` array immediately so it appears in the chat, then `isTyping = true` shows the typing indicator.

2. **Building the payload** — two pieces are assembled before the call:
   - `buildPatternContext()` — if the student arrived via "Ask AI Tutor about this pattern" (a link from the Practice page), this extracts `title`, `description`, `warningBody`, `mistakeExplanation`, `correctExplanation` from the loaded pattern. If the student opened the tutor generically, this is `null`.
   - `history` — the last several messages already in the conversation, so the model has short-term memory.

3. **The callable bridge** — `aiTutor.js` calls `httpsCallable(functions, 'askAiTutor')`. This Firebase SDK helper automatically attaches the signed-in user's auth token to the request — no manual header wiring needed.

4. **Inside the Cloud Function** (`functions/index.js`):
   - **Auth check**: `if (!request.auth) throw new HttpsError('unauthenticated', ...)`. This is why the AI Tutor requires sign-in — without this check, anyone who found the deployed URL could spend your API budget without logging in.
   - **Input sanitization**: `truncate()` caps message length; only the last `MAX_HISTORY_MESSAGES` (8) are kept, bounding token usage per request.
   - **Context assembly**: `buildContextBlock()` turns the pattern fields into a labeled text block (`Title: ...`, `Warning: ...`, `Common mistake: ...`, `Correct approach: ...`) and prepends it to the student's question. This is what "grounds" the model's answer in the curated Failure Knowledge Graph instead of just answering from general knowledge.
   - **System prompt**: `SYSTEM_PROMPT` encodes PreLearn's actual pedagogy — warn before explaining — so the model's behavior matches the product's core mechanic, not a generic tutor persona.
   - **The API call**: `anthropic.messages.create({ model: 'claude-sonnet-5', system: SYSTEM_PROMPT, messages })`.
   - **The secret**: `defineSecret('ANTHROPIC_API_KEY')` reads the value stored via `firebase functions:secrets:set ANTHROPIC_API_KEY` — injected into the function's runtime environment by Google, never bundled into browser-facing code.

5. **Response** — the function extracts the text and returns `{ reply }`. Firebase returns this to the browser as `result.data`.

6. **Rendering** — the reply is pushed into `messages` as an `{ role: 'ai', text }` entry; the chat auto-scrolls.

7. **Failure path** — any thrown error (network issue, missing secret, unauthenticated, Anthropic error) is caught in `sendMessage()` and shown as a red error banner rather than crashing the UI.

---

## 3. Swapping in (or adding) another provider — worked example with Gemini

The key insight: **only the inside of `functions/index.js` needs to change.** Everything else (`firebase.json`, `src/services/firebase.js`, `src/services/aiTutor.js`, `AiTutorView.vue`, the auth gate, the pattern-context builder) is provider-agnostic — the frontend only knows "I call a function named `askAiTutor` and get back `{ reply }`."

### Step 1 — Get a Gemini API key
1. Go to https://aistudio.google.com
2. Sign in → **Get API key** → **Create API key**
3. Copy it — never paste it into `.env` or any browser-facing file

### Step 2 — Store it as a secret
```sh
firebase functions:secrets:set GEMINI_API_KEY
```

### Step 3 — Install the SDK
```sh
cd functions
npm install @google/genai
cd ..
```

### Step 4 — Provider-specific code differences

**Import & client setup**
```js
// Claude (current)
const Anthropic = require('@anthropic-ai/sdk')
const anthropic = new Anthropic({ apiKey: anthropicApiKey.value() })

// Gemini
const { GoogleGenAI } = require('@google/genai')
const gemini = new GoogleGenAI({ apiKey: geminiApiKey.value() })
```

**The call itself**
```js
// Claude
const response = await anthropic.messages.create({
  model: 'claude-sonnet-5',
  max_tokens: 400,
  system: SYSTEM_PROMPT,
  messages   // [{ role: 'user'|'assistant', content: '...' }]
})
const reply = response.content?.[0]?.type === 'text' ? response.content[0].text : ''

// Gemini
const response = await gemini.models.generateContent({
  model: 'gemini-2.5-flash',
  config: { systemInstruction: SYSTEM_PROMPT },
  contents: messages   // [{ role: 'user'|'model', parts: [{ text: '...' }] }]
})
const reply = response.text
```

### Step 5 — Four concrete differences to handle

| | Claude | Gemini |
|---|---|---|
| AI turn's role name | `"assistant"` | `"model"` |
| Message content shape | `{ role, content: "text" }` | `{ role, parts: [{ text: "text" }] }` |
| System prompt placement | `system` (sibling of `messages`) | `config.systemInstruction` |
| Reading the reply | `response.content[0].text` (array, supports non-text blocks) | `response.text` (plain shortcut) |

The `history.map(...)` line in `askAiTutor` that currently does `m.role === 'ai' ? 'assistant' : 'user'` would become `m.role === 'ai' ? 'model' : 'user'` for Gemini, and each history entry would need to be wrapped as `{ role, parts: [{ text }] }` instead of `{ role, content }`.

### Step 6 — What doesn't change
`buildContextBlock()`, `truncate()`, the `request.auth` check, `HttpsError` handling, `MAX_HISTORY_MESSAGES`, and the entire frontend are provider-agnostic.

### Step 7 — Deploy and test
```sh
firebase deploy --only functions
```
Sign in, ask a question, confirm the reply now comes from the new provider.

---

## 4. Takeaway for the presentation

Putting the LLM call behind your own Cloud Function means swapping — or even supporting multiple — AI providers is a change confined to one file, not a rewrite of the app. That's a real architectural decision worth naming explicitly in the "challenges and lessons learned" slide.
