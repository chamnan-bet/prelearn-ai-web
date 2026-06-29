# PreLearn.ai — Project Objectives

## 1. Core Mission

**Pre-warn students about exam failure patterns BEFORE they make the mistake — not after.**

Traditional exam prep shows students what they did wrong after a test. PreLearn.ai flips this: students see the exact mistake, understand why it happens, and learn the correct approach *before* they sit the exam.

---

## 2. Product Objectives

### 2.1 MVP (Current — Math only)

| # | Objective | Status |
|---|---|---|
| 1 | Identify the top 30 Math failure patterns from real Bac II exams (2019–2025) | Done |
| 2 | Build a 3-step teaching flow: Warning → Mistake → Correct | Done |
| 3 | Store patterns in Cloud Firestore for fast, free serving | Done |
| 4 | User registration and login via Firebase Auth | Done |
| 5 | Pattern list page — browse all 30 patterns, filtered by subject | Done |
| 6 | Practice page — step through each pattern with guided explanation | Done |

### 2.2 Near-term (Post-MVP)

| # | Objective |
|---|---|
| 7 | Progress tracking — streak, patterns mastered, predicted exam score |
| 8 | Weak-areas prioritisation — surface the patterns the student struggles with most |
| 9 | Expand to all 7 Bac II subjects (Physics, Chemistry, Biology, Khmer, History, English) |
| 10 | AI Tutor chat — ask follow-up questions about any pattern |

---

## 3. Learning Objectives

This project is built as part of an **AI Concepts** course. Key learning goals:

| # | Concept | How it is demonstrated |
|---|---|---|
| 1 | AI-assisted content extraction | Used Claude to read 5 real exam PDFs and extract recurring failure patterns |
| 2 | Pedagogical AI design | Designed a 3-step pre-warning flow based on how AI can teach, not just inform |
| 3 | Firebase as AI app backend | Cloud Firestore serving structured pattern data at zero cost |
| 4 | AI-assisted development | Used Claude Code throughout to scaffold views, debug, and write pattern data |
| 5 | Responsible AI usage | No API calls at runtime — patterns extracted once, stored in Firestore, served free |

---

## 4. Target Users

- **Primary:** Cambodian Grade 12 students preparing for the Bac II national exam
- **Secondary:** Teachers who want to show students common exam mistakes in class

---

## 5. Success Metrics (MVP)

- Students can view all 30 Math patterns without authentication
- Students can sign up and log in
- Each pattern delivers the Warning → Mistake → Correct flow in under 2 minutes
- App runs without any recurring API cost

---

## 6. Out of Scope (MVP)

- Mobile native app
- Offline mode
- Student analytics dashboard
- Teacher admin panel
- Khmer language UI (English only for MVP)
