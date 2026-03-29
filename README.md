# 🌱 Bhoomi Care — Apni Mitti, Apna Adhikar

India's smart soil intelligence platform for farmers — AI soil analysis, government schemes, marketplace, weather, and community, all in one place.

---

## 📁 Project Structure

```
bhoomicare/
├── api/                  ← Vercel Serverless Functions (Node.js)
│   ├── orders.js         ← POST /api/orders  (Razorpay order creation)
│   ├── verify.js         ← POST /api/verify  (payment verification)
│   └── package.json
├── client/               ← React + Vite frontend
│   ├── src/
│   ├── index.html
│   ├── vite.config.js
│   ├── .env.example      ← copy → .env.local and fill in keys
│   └── package.json
├── server/               ← Legacy Express server (local dev only)
│   └── server.js
├── vercel.json           ← Vercel deployment config
└── .gitignore
```

---

## 🚀 Deploy to Vercel (One-Click)

### 1. Push to GitHub

```bash
cd bhoomicare
git add .
git commit -m "chore: prepare for Vercel deployment"
git push
```

### 2. Import on Vercel

1. Go to **[vercel.com/new](https://vercel.com/new)**
2. Click **"Add New Project"** → import your GitHub repo
3. Vercel auto-detects the `vercel.json` config — no extra settings needed
4. Set **Environment Variables** (see below)
5. Click **Deploy** 🚀

### 3. Environment Variables on Vercel

In **Project → Settings → Environment Variables**, add:

| Variable | Value |
|---|---|
| `VITE_GEMINI_API_KEY` | Your Gemini API key from [aistudio.google.com](https://aistudio.google.com/app/apikey) |
| `MONGODB_URI` | Your MongoDB Connection String |
| `JWT_SECRET` | Secret key for JWT Authentication |
| `RAZORPAY_KEY_ID` | Your Razorpay key ID (optional — mock used if absent) |
| `RAZORPAY_KEY_SECRET` | Your Razorpay key secret (optional) |

> **Important:** `VITE_*` variables are exposed to the browser. Never put secrets as `VITE_` prefixed vars. Razorpay secrets are only used in `/api/` serverless functions and are safe.

---

## 💻 Local Development

### Prerequisites
- Node.js 18+
- npm 9+

### Frontend

```bash
cd client
cp .env.example .env.local
# Edit .env.local and add your VITE_GEMINI_API_KEY
npm install
npm run dev
# → http://localhost:5173
```

### Backend (optional — for Razorpay testing locally)

```bash
cd server
npm install
# Create server/.env with RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET
node server.js
# → http://localhost:5000
```

> The Vite dev server proxies `/api/*` → `http://localhost:5000` automatically.

---

## ✨ Features

- 🌍 **Dashboard** — soil health overview with AI-powered analysis
- 🧪 **Nutrient Viz** — upload soil reports, get NPK/pH charts + fertilizer tips
- 🛒 **Marketplace** — buy/sell fertilizers, seeds, tools with Razorpay payments
- 🤖 **AI Assistant** — Gemini-powered crop & soil advisor
- ☁️ **Weather** — real-time open-meteo forecasts by location
- 🏛️ **Govt Schemes** — filterable India farming welfare schemes
- 👥 **Community** — AI-enriched farmer forum & discussions
- 🌐 **Multilingual** — English, Hindi, Telugu, Kannada, Tamil, Marathi

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite 5, Tailwind CSS 3 |
| AI | Google Gemini 2.0 Flash |
| Payments | Razorpay |
| Weather | Open-Meteo API (free, no key needed) |
| Hosting | Vercel (frontend + serverless API) |
