# PreLearn.ai

An AI-powered exam preparation web app for Cambodian **Bac II** students. PreLearn.ai identifies the failure patterns students repeat most often — across Mathematics, Physics, Chemistry, Biology, Khmer, History, and English — and trains them to stop making those mistakes before the exam.

---

## Features

- **Subject dashboard** — track progress across all 7 Bac II subjects with mastery scores and a predicted exam score
- **Failure pattern library** — browse high-risk and medium-risk patterns per subject, ranked by average mark loss
- **Step-by-step practice** — each pattern walks through the common mistake, then the correct solution across three guided tabs (Warning → Mistake → Correct)
- **AI Tutor chat** — ask follow-up questions about any pattern and get explanations in plain language
- **Progress tracking** — view study streak, patterns mastered, predicted score, and a prioritised weak-areas list

---

## Tech stack

| Layer | Technology |
|---|---|
| Framework | Vue 3 (Composition API, `<script setup>`) |
| Build tool | Vite 8 |
| Styling | Tailwind CSS 4 |
| Routing | Vue Router 5 |
| Backend | Firebase (Auth · Realtime Database · Analytics) |
| Linting | ESLint + Oxlint + Prettier |
| Deployment | Firebase Hosting |

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
```

You can find these values in your [Firebase Console](https://console.firebase.google.com/) under **Project Settings → Your apps**.

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

## Project structure

```
src/
├── assets/          # Global CSS (Tailwind entry point)
├── components/
│   ├── layout/      # TopNav (desktop) and BottomNav (mobile)
│   ├── shared/      # Reusable components (PrimaryButton)
│   └── tutor/       # Pattern and practice components (PatternCard, QuestionCard, WarningAlert)
├── router/          # Vue Router configuration
├── services/        # Firebase initialisation, Auth, and Database helpers
└── views/           # Page components
    ├── HomeView.vue       # Subject selection and progress overview
    ├── PatternView.vue    # Failure pattern list for a subject
    ├── PracticeView.vue   # Step-by-step pattern practice (Warning → Mistake → Correct)
    ├── AiTutorView.vue    # AI chat interface
    └── ProgressView.vue   # Study streak, stats, and weak areas
```

---

## Recommended IDE setup

[VS Code](https://code.visualstudio.com/) with the [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) extension. Disable Vetur if previously installed.

**Browser devtools:**
- Chrome / Edge / Brave — [Vue.js Devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
- Firefox — [Vue.js Devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
