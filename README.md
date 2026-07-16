# PreLearn.ai

An AI-powered exam preparation web app for Cambodian **Bac II** students. PreLearn.ai identifies the failure patterns students repeat most often — across Mathematics, Physics, Chemistry, Biology, Khmer, History, and English — and trains them to stop making those mistakes before the exam.

**Team members:** Bet Chamnan · Chhen Vichheka · Yoem SreyYoeur

---

## Live demo & test credentials

- **Deployment link:** [https://chamnan.online](https://chamnan.online)
- **Test account:**
  - Email: `chamnan@gmail.com`
  - Password: `12345678`

Logging in is only required to save personalised progress. All subject dashboards, failure pattern libraries, and practice flows can be browsed without an account.

---

## Features

- **Subject dashboard** — track progress across all 7 Bac II subjects with mastery scores and a predicted exam score
- **Failure pattern library** — browse high-risk and medium-risk patterns per subject, ranked by average mark loss
- **Step-by-step practice** — each pattern walks through the common mistake, then the correct solution across three guided tabs (Warning → Mistake → Correct)
- **AI Tutor chat** — ask follow-up questions about any pattern and get real answers from a live LLM (Gemini or Claude, switchable per chat), grounded in the pattern's warning/mistake/correct context — see [AI functionality status](#ai-functionality-status)
- **Study Path** — Dijkstra's algorithm walks the Math pattern graph to recommend the optimal study order, pulling connected high-risk patterns forward together (see `useDijkstra.js`); a Greedy next-pattern picker and BFS related-pattern lookup (`useGreedy.js`, `useBFS.js`) are also implemented over the same graph (`patternGraph.js`)
- **Progress tracking** — view study streak, patterns mastered, predicted score, and a prioritised weak-areas list

---

## AI functionality status

PreLearn.ai's core design is built around AI-driven failure-pattern warnings. In the current build:

- The 30 Math failure patterns, their warning strategy, and the Warning → Mistake → Correct practice flow are curated content stored in Firestore/`mathPatterns.js`, not generated live by a model.
- The Study Path, related-patterns, and next-pattern-to-study features are real algorithms (Dijkstra, BFS, Greedy) running over a hand-authored pattern relationship graph — not LLM calls.
- The AI Tutor chat is a **live LLM integration**: the frontend calls a standalone Express server (`server/index.js`) over HTTPS, which verifies the user's Firebase ID token, then forwards the question (plus pattern context and short history) to either the Gemini API (`gemini-2.5-flash`, with Google Search grounding, the default) or the Anthropic API (`claude-3-5-sonnet-latest`). The provider is user-selectable in the chat header. See [`docs/ai-integration.md`](docs/ai-integration.md) for the request lifecycle and how to add another provider.
- This proxy runs on the same AWS EC2 instance as the frontend, behind Nginx, managed by systemd — see [`docs/deployment-ec2.md`](docs/deployment-ec2.md) for the full setup (this superseded an earlier Firebase Cloud Functions approach, which has been removed).

---

## Tech stack

| Layer | Technology |
|---|---|
| Framework | Vue 3 (Composition API, `<script setup>`) |
| Build tool | Vite 8 |
| Styling | Tailwind CSS 4 |
| Routing | Vue Router 5 |
| Backend (data/auth) | Firebase (Auth · Cloud Firestore · Analytics) |
| Backend (AI proxy) | Node.js + Express (`server/`) — Anthropic & Google GenAI SDKs |
| Linting | ESLint + Oxlint + Prettier |
| Deployment | AWS EC2 + Nginx (static frontend + `/api` reverse proxy), systemd-managed AI proxy |

---

## Project setup

### Prerequisites

- Node.js `^22.18.0` or `>=24.12.0`
- npm `>=10`

### 1. Clone the repository

```sh
git clone <repository-url>
cd prelearn-ai-web
```

### 2. Install dependencies

```sh
npm install
```

> If you are behind a corporate proxy that blocks the npm registry, run:
> ```sh
> npm config set proxy http://<proxy-host>:<port>
> npm config set https-proxy http://<proxy-host>:<port>
> npm install --no-audit
> ```

### 3. Configure environment variables

Create a `.env` file in the project root and add your Firebase project credentials:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://your_project-default-rtdb.firebaseio.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id

# Points the AI Tutor at the backend server (use http://localhost:3000/api/ask-ai-tutor for local dev, or https://chamnan.online/api/ask-ai-tutor for production)
VITE_AI_TUTOR_API_URL=http://localhost:3000/api/ask-ai-tutor
```

You can find the Firebase values in your [Firebase Console](https://console.firebase.google.com/) under **Project Settings → Your apps**.

To also run the AI Tutor proxy locally:
1. Copy `server/.env.example` to `server/.env`.
2. Fill in `GEMINI_API_KEY` (and `ANTHROPIC_API_KEY` if you have one).
3. Ensure `ALLOWED_ORIGIN` is set to `http://localhost:5173` (the local frontend URL).
4. Run:

```sh
cd server
npm install
npm start
```


### 4. Start the development server

```sh
npm run dev
```

The app will be available at `http://localhost:5173` with hot-reload enabled.

---

## Available scripts

| Command | Description |
|---|---|
| `npm run dev` | Start local development server with hot-reload |
| `npm run build` | Compile and minify for production (output to `dist/`) |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run Oxlint + ESLint with auto-fix |
| `npm run format` | Format all files with Prettier |

---

## Deploying

The app is deployed to an **AWS EC2** instance at [chamnan.online](https://chamnan.online): Nginx serves the built frontend and reverse-proxies `/api/` to the Express AI Tutor proxy (`server/`), which runs as a systemd service. Firebase Auth and Firestore are unchanged — only hosting and the AI proxy moved off Firebase.

Full step-by-step setup (DNS, Nginx config, systemd unit, SSL via certbot) lives in [`docs/deployment-ec2.md`](docs/deployment-ec2.md). Reference config files are in [`deploy/`](deploy/) — `nginx.conf` and `prelearn-ai-tutor.service`.

To redeploy after a frontend change:

```sh
npm run build                   # outputs to dist/
# upload dist/ to /var/www/prelearn-ai-web/dist on the server
```

To redeploy after a `server/` change, upload the updated file(s) and run `sudo systemctl restart prelearn-ai-tutor` on the server.

Firebase Hosting/Cloud Functions are no longer used for this project; `firebase.json`'s `functions` block is stale and can be ignored.

---

## Project structure

```
prelearn-ai-web/
├── server/                  # Standalone Express AI Tutor proxy (deployed separately, see docs/deployment-ec2.md)
│   ├── index.js             # POST /api/ask-ai-tutor — verifies Firebase ID token, calls Gemini or Claude
│   └── .env.example         # PORT, FIREBASE_PROJECT_ID, GEMINI_API_KEY, ANTHROPIC_API_KEY, ALLOWED_ORIGIN
├── deploy/                  # Reference configs for the EC2 deployment
│   ├── nginx.conf           # Serves dist/, proxies /api/ to the Express server
│   └── prelearn-ai-tutor.service  # systemd unit for server/index.js
├── docs/
│   ├── ai-integration.md    # AI Tutor request lifecycle, how to add/swap providers
│   └── deployment-ec2.md    # Full EC2 + Nginx + systemd + SSL deployment guide
└── src/
    ├── assets/
    │   ├── main.css           # Tailwind CSS entry point
    │   └── subject/           # Real Bac II exam PDFs (2019, 2021, 2022, 2023, 2025)
    ├── components/
    │   ├── layout/          # SideNav (desktop), TopNav, BottomNav (mobile)
    │   ├── shared/          # Reusable components (PrimaryButton)
    │   └── tutor/           # PatternCard, QuestionCard, WarningAlert
    ├── composables/
    │   ├── useAuth.js         # Shared reactive auth state (module-level, no Pinia)
    │   ├── useAiTutorChat.js  # Per-pattern chat history, persisted to localStorage
    │   ├── useProgress.js     # Mastery/progress derived state
    │   ├── useDijkstra.js     # Optimal study-order algorithm (Study Path)
    │   ├── useGreedy.js       # Highest-risk-next pattern picker
    │   └── useBFS.js          # Related-patterns lookup over the pattern graph
    ├── data/
    │   ├── mathPatterns.js    # 30 Math failure patterns derived from real exam PDFs
    │   └── patternGraph.js    # Hand-authored adjacency list linking related patterns
    ├── router/
    │   └── index.js           # Routes (login/register optional) plus dev-only /dev/seed
    ├── services/
    │   ├── firebase.js        # Firebase app initialisation
    │   ├── auth.js            # register, login, signOut helpers
    │   ├── db.js              # Cloud Firestore instance
    │   ├── patterns.js        # fetchPatterns, fetchPatternById, seedPatterns
    │   ├── progress.js        # Reads/writes user progress in Firestore
    │   └── aiTutor.js         # Calls the deployed AI Tutor proxy (server/)
    └── views/
        ├── HomeView.vue       # Subject selection and progress overview
        ├── PatternView.vue    # Failure pattern list for a subject (reads from Firestore)
        ├── PracticeView.vue   # Step-by-step practice: Warning → Mistake → Correct
        ├── LoginView.vue      # Firebase email/password login
        ├── RegisterView.vue   # Firebase user registration
        ├── AiTutorView.vue    # Live AI chat, provider switch (Gemini/Claude)
        ├── ProgressView.vue   # Study stats and weak areas
        ├── StudyPathView.vue  # Dijkstra-ordered recommended study path
        └── DevSeedView.vue    # Dev-only: seed Firestore from mathPatterns.js
```

---

## Seeding the database (development only)

After cloning and configuring Firebase, visit `http://localhost:5173/dev/seed` to push all 30 Math patterns to Cloud Firestore. This route is only available in development (`import.meta.env.DEV`).

---

## Recommended IDE setup

[VS Code](https://code.visualstudio.com/) with the [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) extension. Disable Vetur if previously installed.

**Browser devtools:**
- Chrome / Edge / Brave — [Vue.js Devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
- Firefox — [Vue.js Devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
