# 🔥 Hosting Vue.js with Firebase

A step-by-step guide to deploying your Vue.js project with Firebase Hosting, Authentication, and Firestore.

---

## Prerequisites

Before you begin, make sure you have:

- [Node.js](https://nodejs.org/) installed
- A Firebase project created at [console.firebase.google.com](https://console.firebase.google.com)

---

## Step 1 — Install Firebase CLI

```bash
npm install -g firebase-tools
```

---

## Step 2 — Login to Firebase

```bash
firebase login
```

This opens a browser window to authenticate your Google account.

---

## Step 3 — Build Your Vue Project

```bash
npm run build
```

This generates a `dist/` folder with your production-ready files.

---

## Step 4 — Initialize Firebase in Your Project

In your project root, run:

```bash
firebase init
```

When prompted, select the following options:

| Prompt | Answer |
|---|---|
| Which features? | `Hosting` |
| Select a project | Choose your existing Firebase project |
| Public directory | `dist` |
| Single-page app? | `Yes` |
| Automatic builds with GitHub? | `No` (unless you want CI/CD) |

This creates two files:
- `firebase.json` — hosting configuration
- `.firebaserc` — project alias

---

## Step 5 — Verify `firebase.json`

Make sure your `firebase.json` looks like this:

```json
{
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

> ⚠️ The `rewrites` rule is essential for Vue Router (history mode) to work correctly. Without it, refreshing a page will return a 404.

---

## Step 6 — Configure Firebase SDK in Your App

Your `src/firebase.js` should be set up with Auth and Firestore:

```js
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
```

> 💡 These keys are safe to include in frontend code. Firebase security is enforced via Auth rules and Firestore rules, not by hiding the config.

---

## Step 7 — Set Firestore Security Rules

In the Firebase Console → **Firestore → Rules**, update your rules to restrict access to authenticated users only:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

> ⚠️ Never leave your rules as `allow read, write: if true` in production — this exposes your database to everyone.

---

## Step 8 — Deploy

Deploy everything:

```bash
firebase deploy
```

Or deploy hosting only:

```bash
firebase deploy --only hosting
```

After deploying, Firebase gives you a live URL:

```
https://your-project-id.web.app
```

---

## Step 9 — Whitelist Your Domain in Auth

Go to Firebase Console → **Authentication → Settings → Authorized Domains** and add your `.web.app` domain if it's not already listed.

---

## Useful Commands

| Command | Description |
|---|---|
| `firebase deploy` | Full deploy |
| `firebase deploy --only hosting` | Deploy hosting only |
| `firebase serve` | Test locally before deploying |
| `firebase hosting:channel:deploy preview` | Deploy to a preview URL |

---

## Common Gotchas

- Always run `npm run build` before deploying — Firebase serves the `dist/` folder, not your source files.
- If you use Vue Router in **history mode**, the rewrite rule in `firebase.json` is required.
- Make sure your `.web.app` domain is whitelisted under **Auth → Authorized Domains**.

---

## Checklist

- [ ] Install Firebase CLI
- [ ] Login to Firebase
- [ ] Build Vue project (`npm run build`)
- [ ] Initialize Firebase (`firebase init`)
- [ ] Verify `firebase.json` rewrite rule
- [ ] Configure Firebase SDK in your app
- [ ] Set Firestore security rules
- [ ] Deploy (`firebase deploy`)
- [ ] Whitelist domain in Auth → Authorized Domains