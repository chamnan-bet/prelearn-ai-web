# Deploying to AWS EC2 + Custom Domain (chamnan.online)

This replaces Firebase Hosting and the Firebase Cloud Function (`askAiTutor`) with:

- **Nginx on an AWS EC2 VM** serving the built Vue frontend over a secure HTTPS connection.
- **A production Express server** (`/var/www/prelearn-backend`) running on the same VM managed by **PM2**, proxying AI Tutor requests to Claude/Gemini and keeping sensitive API keys securely off the browser.
- **Firebase Auth + Firestore stay untouched** — only hosting and the AI proxy moved.

No Firebase Blaze plan is required with this setup.

---

## Architecture

```
Browser (Vue)                  Nginx (EC2:443 SSL)             Express (EC2, :3000)
─────────────                  ───────────────────             ────────────────────
AiTutorView.vue
→ aiTutor.js (.env configured)
→ fetch('https://chamnan.online/api/ask-ai-tutor', { Authorization: Bearer <Firebase ID token> })
                               ──→  proxy_pass to 127.0.0.1:3000
                                                             ──→  verify ID token (firebase-admin)
                                                                   call Anthropic or Gemini SDK
                               ←──  { reply, provider }
← reply rendered in chat
```

Everything else (static assets, `index.html`, `/assets/*`) is served directly by Nginx from the dedicated web directory: `/var/www/prelearn-web`.

---

## Files Involved

| File / Folder Path                          | Purpose                                                                                                                                                                                       |
| ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/var/www/prelearn-backend/index.js`        | Express app: `POST /api/ask-ai-tutor`, verifies Firebase ID token, calls Claude or Gemini depending on the `provider` field (defaults to `gemini`).                                           |
| `/var/www/prelearn-backend/package.json`    | Server dependencies: `express`, `cors`, `dotenv`, `firebase-admin`, `@anthropic-ai/sdk`, `@google/genai`.                                                                                     |
| `/var/www/prelearn-backend/.env`            | Server-side environment variables (never committed to git) containing `GEMINI_API_KEY`, `ANTHROPIC_API_KEY`, `FIREBASE_PROJECT_ID`, `PORT=3000`, and `ALLOWED_ORIGIN=https://chamnan.online`. |
| `/var/www/prelearn-web/`                    | Contains the static production build files compiled from your local Vue project's `dist/` folder (including dynamic index page title/favicon route guards).                                   |
| `/etc/nginx/sites-available/chamnan.online` | Active Nginx configuration mapping traffic requests to `/var/www/prelearn-web` along with an integrated reverse-proxy lane routing `/api/` over to local port `3000`.                         |

**Now unused:**

- `functions/` — the old Firebase Cloud Function implementation.
- `firebase.json`'s `"functions"` block and `"hosting"` block.

---

## Deployment Steps

### 1. Domain & DNS Setup

- Purchase the domain via **Namecheap**.
- Map **A Records** for `@` and `www` pointing directly to your AWS EC2 instance's public IP address.

### 2. Frontend Configuration & Build (Local Machine)

- Update your local project `.env` file to point directly to your secure production API:

  ```env
  VITE_AI_TUTOR_API_URL=https://chamnan.online/api/ask-ai-tutor
  ```

- Compile the distribution package:
  ```bash
  npm run build
  ```

### 3. Server Provisioning & Upload (Via MobaXTerm)

- SSH into your Ubuntu instance and create the target production directory structures:

  ```bash
  sudo mkdir -p /var/www/prelearn-web /var/www/prelearn-backend
  sudo chown -R ubuntu:ubuntu /var/www/prelearn-web /var/www/prelearn-backend
  sudo chmod +x /var/www /var/www/prelearn-web
  ```

- Use the MobaXTerm visual SFTP side-panel to upload your folders:
  - Drag the contents inside your local `dist/` directory into `/var/www/prelearn-web`.
  - Drag your server files (`index.js`, `package.json`) into `/var/www/prelearn-backend`.

### 4. Backend Dependencies & Environment Initialization

- Change to your backend folder and install production dependencies:

  ```bash
  cd /var/www/prelearn-backend
  npm install
  ```

- Create your server environment configuration file:
  ```bash
  nano .env
  # Add PORT=3000, FIREBASE_PROJECT_ID, ALLOWED_ORIGIN, and your AI API keys.
  ```

### 5. Process Management Setup (PM2)

- Install Node.js runtime layers and PM2 globally to keep the backend API process alive continuously:
  ```bash
  sudo npm install pm2 -g
  pm2 start index.js --name "prelearn-api"
  pm2 startup
  pm2 save
  ```

### 6. Nginx Routing & Let's Encrypt SSL Security

- Configure Nginx server blocks to distribute production traffic lanes safely:

  ```bash
  sudo nano /etc/nginx/sites-available/chamnan.online
  # (Configure root to point to /var/www/prelearn-web, include try_files $uri $uri/ /index.html;, and attach a proxy link rule passing /api/ to http://127.0.0.1:3000).
  ```

- Link the active profile and issue a secure SSL certificate setup automatically:
  ```bash
  sudo ln -s /etc/nginx/sites-available/chamnan.online /etc/nginx/sites-enabled/
  sudo apt install certbot python3-certbot-nginx -y
  sudo certbot --nginx -d chamnan.online -d www.chamnan.online
  sudo systemctl restart nginx
  ```

### 7. Firebase Integration

- Add `https://chamnan.online` to the Authorized Domains section under Authentication > Settings inside the Firebase console.

---

## Redeploying After a Code Change

### Frontend Layout Changes

1. Run `npm run build` locally.
2. Drop the updated `dist/` folder elements right back into `/var/www/prelearn-web` using MobaXTerm SFTP.
3. Perform a browser hard refresh (Ctrl + F5) to break local caching structures.

### Backend Server Changes (`index.js`)

1. Overwrite the file inside `/var/www/prelearn-backend/index.js` using MobaXTerm.
2. Reload the process engine instance to inject code changes live:

```bash
pm2 restart prelearn-api
```

---

## Verifying Server Status

```bash
pm2 status              # Verify the Express process cluster is active and online
pm2 logs prelearn-api   # Tail runtime API logs and track real-time AI generation pipelines
sudo nginx -t           # Check Nginx configuration health status profiles
```
