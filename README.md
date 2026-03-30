# 🌱 Bhoomi Care — Apni Mitti, Apna Adhikar

India's smart soil intelligence platform for farmers — AI soil analysis, government schemes, marketplace, weather, and community, all in one place.

---

## 📁 Project Structure

```
bhoomicare/
├── api/                  ← Vercel serverless entry
│   └── index.js          ← Exports Express app for Vercel
├── client/               ← React + Vite frontend
│   ├── src/              ← UI components & pages
│   ├── vite.config.js    ← Client config (API proxy)
│   └── .env.example      ← Frontend environment template
├── server/               ← Express backend (MVC structure)
│   ├── config/           ← MongoDB connection info
│   ├── controllers/      ← Request handler logic
│   ├── middleware/       ← Auth & security tools
│   ├── models/           ← Mongoose schemas (User, Product, Order)
│   ├── routes/           ← Express routers
│   └── server.js         ← Main Express entry point
├── package.json          ← Root dependencies for Vercel deployment
├── vercel.json           ← Vercel routing configuration
└── .gitignore
```

---

## 🚀 Deploy to Vercel (One-Click)

### 1. Push to GitHub

```bash
cd bhoomicare
git add .
git commit -m "Initial Commit"
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
| `GEMINI_API_KEY` | Your Gemini API key from [aistudio.google.com](https://aistudio.google.com/app/apikey) |
| `MONGODB_URI` | Your MongoDB Connection String |
| `JWT_SECRET` | Secret key for JWT Authentication |
| `RAZORPAY_KEY_ID` | Your Razorpay key ID (optional — mock used if absent) |
| `RAZORPAY_KEY_SECRET` | Your Razorpay key secret (optional) |

> **Important:** The `GEMINI_API_KEY` is securely stored and used exclusively on the backend avoiding frontend browser exposure. Razorpay secrets are also only used in `/api/` node environments.

---

## 💻 Local Development

### Prerequisites
- Node.js 18+
- npm 9+

### Frontend

```bash
cd client
npm install
npm run dev
# → http://localhost:5173
```

### Backend

```bash
cd server
npm install
# Create server/.env with MONGODB_URI, JWT_SECRET, GEMINI_API_KEY, and Razorpay keys
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
| AI | Google Gemini (Intelligent limit-fallback: `2.0-flash` → `1.5-pro` → `1.5-flash-8b` → `2.5-flash`) |
| Payments | Razorpay |
| Weather | Open-Meteo API (free, no key needed) |
| Hosting | Vercel (frontend + serverless API) |
