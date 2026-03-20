# 🌱 Bhoomi Care - AI based Soil analysis and Recommendation Platform

> **Tagline:** Smart Soil Intelligence for Indian Farmers — *Apni Mitti, Apna Adhikar*

Website : [https://bhoomi-care.vercel.app/]

## 🎯 Problem Statement
Farmers in India often lack access to personalized, real-time, and actionable agricultural advice concerning soil health, precision nutrient management, crop selection, and government schemes. The result is suboptimal crop yields, overuse of chemical fertilizers, and a failure to utilize beneficial schemes. Existing tools are also difficult to navigate and lack multi-lingual voice accessibility for the broader farming community.

## 💡 Solution
**Bhoomi Care** is an AI-powered, voice-enabled smart agricultural platform. It bridges the information gap by offering:
- Instant analysis of soil health reports to pinpoint specific nutrient deficiencies.
- An intuitive AI assistant capable of processing farming queries and speaking back in 10+ local languages.
- Direct integration with verified government schemes and local agricultural marketplaces.

## ⚙️ Tech Stack
- **Frontend Framework:** React (Vite)
- **Styling:** Tailwind CSS (Custom earth-tone design system) 
- **AI Engine:** Google Gemini 2.0 Flash (`generative-ai` REST implementation)
- **Voice & Accessibility:** Web Speech API (SpeechSynthesis)
- **Icons:** Lucide React

## ✨ Features
1. **Smart Soil Intelligence:** Dynamically analyze your soil health data (e.g. Nitrogen, Phosphorus, Potassium, Zinc levels) and receive step-by-step remediation plans.
2. **Multilingual AI Chatbot:** A 24/7 intelligent farming assistant that answers crop, soil, and scheme queries while supporting Text-to-Speech playback in native tongues.
3. **Graceful Fallback / Demo Mode:** Seamless offline fallback if API quotas are exceeded, ensuring constant availability of core agriculture guidance.
4. **Government Schemes Hub:** Discover and learn about PM-KISAN, KCC, and PMFBY with context-aware AI explanations.
5. **Agro Marketplace UI:** Browse recommended organic and chemical fertilizers based directly on your soil's diagnostic needs.

## 🚀 Demo Steps / Getting Started

Follow these steps to run the application locally for evaluation:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Vineet3458/BhoomiCare.git
   cd bhoomi-care
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure API Key:**
   Get a free Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey). Create a `.env.local` file in the root directory:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```
   *(Note: The app will run in Demo Mode even if the key is skipped or quota is exceeded!)*

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Interact:**
   Open `http://localhost:5173`. You can chat with the AI natively, click the microphone for TTS, or evaluate the sample soil report features!

---
*Built for Hackathon 2025-26* 🌾
