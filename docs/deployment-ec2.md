# Deploying to EC2 + custom domain

This replaces Firebase Hosting and the Firebase Cloud Function (`askAiTutor`) with:
- **Nginx on the EC2 VM** serving the built Vue frontend under your domain
- **A small Express server** (`server/`) on the same VM proxying AI Tutor requests to Claude/Gemini, keeping the API keys off the browser
- **Firebase Auth + Firestore stay untouched** — only hosting and the AI proxy moved

No Firebase Blaze plan is required with this setup.

---

## Architecture

```
Browser (Vue)                 Nginx (EC2)                    Express (EC2, :3000)
─────────────                 ───────────                    ─────────────────────
AiTutorView.vue
  → aiTutor.js
    → fetch('/api/ask-ai-tutor', { Authorization: Bearer <Firebase ID token> })
                          ──→  proxy_pass to 127.0.0.1:3000
                                                        ──→  verify ID token (firebase-admin)
                                                              call Anthropic or Gemini SDK
                          ←──  { reply, provider }
  ← reply rendered in chat
```

Everything else (static assets, `index.html`, `/assets/*`) is served directly by Nginx from `/var/www/prelearn-ai-web/dist`.

---

## Files involved

| File | Purpose |
|---|---|
| `server/index.js` | Express app: `POST /api/ask-ai-tutor`, verifies Firebase ID token, calls Claude or Gemini depending on the `provider` field (defaults to `gemini`) |
| `server/package.json` | Server deps: express, cors, dotenv, firebase-admin, `@anthropic-ai/sdk`, `@google/genai` |
| `server/.env.example` | Template for the real `.env` that lives only on the EC2 VM (never committed) — `GEMINI_API_KEY`, `ANTHROPIC_API_KEY`, `FIREBASE_PROJECT_ID`, `PORT`, `ALLOWED_ORIGIN` |
| `src/services/aiTutor.js` | Frontend wrapper — gets the signed-in user's ID token via `auth.currentUser.getIdToken()`, POSTs to `/api/ask-ai-tutor` |
| `deploy/nginx.conf` | Nginx server block: SPA fallback (`try_files ... /index.html`) for `vue-router`'s history mode, plus a `/api/` reverse-proxy block to the Express server |
| `deploy/prelearn-ai-tutor.service` | systemd unit that keeps the Express server running (auto-restart on crash/reboot) |

**Now unused (not yet removed, pending a decision):**
- `functions/` — the old Firebase Cloud Function implementation
- `firebase.json`'s `"functions"` block and `"hosting"` block

---

## Deployment steps

```sh
# 1. Local — install the server's deps
cd server
npm install
cd ..

# 2. Build the frontend
npm run build

# 3. Copy frontend + server to EC2
scp -i /path/to/key.pem -r dist server ubuntu@YOUR_EC2_IP:/tmp/prelearn-deploy

# 4. On the EC2 VM
ssh -i /path/to/key.pem ubuntu@YOUR_EC2_IP
sudo mkdir -p /var/www/prelearn-ai-web
sudo rm -rf /var/www/prelearn-ai-web/dist /var/www/prelearn-ai-web/server
sudo mv /tmp/prelearn-deploy/dist /var/www/prelearn-ai-web/dist
sudo mv /tmp/prelearn-deploy/server /var/www/prelearn-ai-web/server
cd /var/www/prelearn-ai-web/server
npm install --production
sudo cp .env.example .env
sudo nano .env   # fill in GEMINI_API_KEY, ANTHROPIC_API_KEY, FIREBASE_PROJECT_ID=prelearn-ai

# 5. Nginx
sudo cp deploy/nginx.conf /etc/nginx/sites-available/prelearn
sudo ln -sf /etc/nginx/sites-available/prelearn /etc/nginx/sites-enabled/prelearn
sudo nginx -t && sudo systemctl reload nginx

# 6. systemd service for the AI proxy
sudo cp deploy/prelearn-ai-tutor.service /etc/systemd/system/prelearn-ai-tutor.service
sudo systemctl daemon-reload
sudo systemctl enable --now prelearn-ai-tutor

# 7. DNS
# Add A records: chamnan.online and www.chamnan.online → EC2 public/Elastic IP

# 8. SSL
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d chamnan.online -d www.chamnan.online
```

## Redeploying after a code change

Only the changed half needs repeating:
- Frontend change → repeat steps 2–3 (rebuild, `scp` the new `dist`, `sudo systemctl reload nginx` if you touched `deploy/nginx.conf`)
- Server change (`server/index.js`) → `scp` the updated file, then `sudo systemctl restart prelearn-ai-tutor`

## Verifying it's live

```sh
sudo systemctl status prelearn-ai-tutor   # Express server running?
curl -I https://chamnan.online            # frontend serving?
sudo journalctl -u prelearn-ai-tutor -f   # tail server logs while testing the chat in browser
```
